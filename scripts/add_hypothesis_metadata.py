#!/usr/bin/env python3
"""
Script to add metadata field to all hypotheses in mockData.ts
"""

import re

# Read the file
with open('/Users/knguyen/work/cdd-platform-2/src/data/mockData.ts', 'r') as f:
    content = f.read()

# Pattern to match hypotheses without metadata (before the closing brace)
# We look for confidenceHistory followed by closing brace, but NOT followed by metadata
pattern = r'(confidenceHistory: \[[^\]]+\],)\n(\s+)\},\n(\s+\{[\s\S]*?id: \'h\d+\')'

def add_metadata(match):
    confidence_history = match.group(1)
    indent = match.group(2)
    next_hypothesis = match.group(3)

    # Add metadata field
    return f'''{confidence_history}
{indent}metadata: {{
{indent}  source: 'manual',
{indent}  author: 'Sophie Leclerc',
{indent}}},
{indent}}},
{next_hypothesis}'''

# Apply the pattern multiple times (for all hypotheses)
previous = None
current = content
while current != previous:
    previous = current
    current = re.sub(pattern, add_metadata, current)

# Handle the last hypothesis (which doesn't have a next hypothesis)
last_pattern = r'(confidenceHistory: \[[^\]]+\],)\n(\s+)\}\n];'

def add_metadata_last(match):
    confidence_history = match.group(1)
    indent = match.group(2)

    return f'''{confidence_history}
{indent}metadata: {{
{indent}  source: 'manual',
{indent}  author: 'Sophie Leclerc',
{indent}}},
{indent}}}
];'''

current = re.sub(last_pattern, add_metadata_last, current)

# Write back
with open('/Users/knguyen/work/cdd-platform-2/src/data/mockData.ts', 'w') as f:
    f.write(current)

print("✅ Successfully added metadata to all hypotheses")
