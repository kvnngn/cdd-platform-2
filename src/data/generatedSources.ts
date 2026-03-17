/**
 * TIER 3: PROGRAMMATICALLY GENERATED DATA ROOM DOCUMENTS (s752-s1351)
 *
 * This file contains 600 realistic data room documents generated using templates
 * with variable substitution. Documents cover all major categories with realistic
 * titles, excerpts, and metadata to simulate a comprehensive M&A data room.
 *
 * Generation strategy: Template-based with seeded randomization for consistency.
 */

import { Source } from '@/types';

// ============================================================================
// CONFIGURATION & TEMPLATES
// ============================================================================

const REGIONS = ['UK', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Nordic', 'BeNeLux', 'Poland', 'Czech', 'Ireland', 'Portugal', 'Austria', 'Switzerland'];
const SEGMENTS = ['SMB', 'Mid-Market', 'Enterprise', 'Micro', 'Freelancer', 'Startup'];
const QUARTERS = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'];
const METRICS = ['TAM', 'SAM', 'SOM', 'CAGR', 'Market Share', 'Growth Rate', 'Penetration Rate'];
const FILE_TYPES: Array<'xlsx' | 'pdf' | 'csv'> = ['xlsx', 'pdf', 'xlsx', 'pdf', 'csv']; // Weighted distribution

// Document categories with proportions
const CATEGORIES = {
  market: 102,      // 17%
  financial: 150,   // 25%
  customer: 102,    // 17%
  competitive: 78,  // 13%
  product: 60,      // 10%
  legal: 60,        // 10%
  operations: 42,   // 7%
  other: 6,         // 1%
};

// Connector distribution
const CONNECTORS = [
  { id: 'sharepoint', weight: 45 },
  { id: 'datasite', weight: 45 },
  { id: 'intralinks', weight: 5 },
  { id: 'mergermarket', weight: 3 },
  { id: 'capitalglobal_logo', weight: 2 },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Seeded random number generator for consistent results
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Get random item from array using seeded random
 */
function getRandomItem<T>(arr: T[], seed: number): T {
  const index = Math.floor(seededRandom(seed) * arr.length);
  return arr[index];
}

/**
 * Get connector based on weighted distribution
 */
function getConnector(seed: number): string {
  const rand = seededRandom(seed) * 100;
  let cumulative = 0;
  for (const connector of CONNECTORS) {
    cumulative += connector.weight;
    if (rand < cumulative) {
      return connector.id;
    }
  }
  return 'sharepoint';
}

/**
 * Generate realistic date within range
 */
function generateDate(seed: number): string {
  const start = new Date('2025-09-01').getTime();
  const end = new Date('2026-02-28').getTime();
  const timestamp = start + seededRandom(seed) * (end - start);
  return new Date(timestamp).toISOString().split('T')[0];
}

/**
 * Generate reliability score (85-98 range)
 */
function generateReliability(seed: number): number {
  return Math.floor(85 + seededRandom(seed) * 13);
}

// ============================================================================
// TEMPLATE GENERATORS
// ============================================================================

/**
 * Market sizing document templates
 */
function generateMarketDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const region = getRandomItem(REGIONS, seed);
  const segment = getRandomItem(SEGMENTS, seed + 1);
  const metric = getRandomItem(METRICS, seed + 2);
  const quarter = getRandomItem(QUARTERS, seed + 3);
  const fileType = getRandomItem(FILE_TYPES, seed + 4);
  const connector = getConnector(seed + 5);

  const tamValue = Math.floor(20 + seededRandom(seed + 6) * 500);
  const cagr = Math.floor(8 + seededRandom(seed + 7) * 25);

  const templates = [
    {
      title: `${region} ${segment} Payment Market ${metric} Analysis ${quarter}`,
      excerpt: `${region} ${segment.toLowerCase()} payment market €${tamValue}B with ${cagr}% CAGR. Digital payment adoption accelerating, addressable market €${Math.floor(tamValue * 0.5)}B for fintech platforms. Strong growth drivers identified.`,
      author: 'Market Research',
    },
    {
      title: `${quarter} ${region} Digital Banking ${segment} Segment Forecast`,
      excerpt: `${region} digital banking ${segment.toLowerCase()} segment projected €${tamValue}B (${quarter}), growing at ${cagr}% CAGR through 2028. Neobank penetration ${Math.floor(5 + seededRandom(seed) * 15)}%, significant headroom for growth.`,
      author: 'Market Intelligence',
    },
    {
      title: `${region} Cross-Border ${segment} Payment Volume Study ${quarter}`,
      excerpt: `Cross-border ${segment.toLowerCase()} payments ${region} region: €${tamValue}B annual volume. FX complexity and fees create €${Math.floor(tamValue * 0.4)}B opportunity. Multi-currency solutions gaining traction (${Math.floor(20 + seededRandom(seed) * 30)}% adoption).`,
      author: 'International Markets',
    },
  ];

  const template = templates[seed % templates.length];

  return {
    id,
    title: template.title,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-MARKET-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${template.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60)}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: template.author,
    excerpt: template.excerpt,
    reliabilityScore: generateReliability(seed + 11),
  };
}

/**
 * Financial performance document templates
 */
function generateFinancialDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const quarter = getRandomItem(QUARTERS, seed);
  const fileType = getRandomItem(FILE_TYPES, seed + 1);
  const connector = getConnector(seed + 2);

  const revenue = Math.floor(50 + seededRandom(seed + 3) * 400);
  const growth = Math.floor(15 + seededRandom(seed + 4) * 45);
  const margin = Math.floor(8 + seededRandom(seed + 5) * 15);

  const templates = [
    {
      title: `${quarter} Revenue Analysis - Segment Performance Breakdown`,
      excerpt: `${quarter} revenue €${revenue}M (+${growth}% YoY). EBITDA margin ${margin}%. Geographic mix: UK ${Math.floor(30 + seededRandom(seed) * 10)}%, EU ${Math.floor(45 + seededRandom(seed + 1) * 15)}%, ROW ${Math.floor(10 + seededRandom(seed + 2) * 10)}%. Strong momentum across all segments.`,
      author: 'CFO Office',
    },
    {
      title: `Financial KPI Dashboard ${quarter} - Performance Metrics`,
      excerpt: `Key metrics ${quarter}: Transaction volume +${growth}%, customers +${Math.floor(growth * 0.8)}%, ARPU €${Math.floor(18 + seededRandom(seed) * 15)}/month. Cost/income ratio ${Math.floor(78 + seededRandom(seed) * 15)}%. Operating leverage improving.`,
      author: 'Financial Planning',
    },
    {
      title: `${quarter} Unit Economics Analysis - Cohort Performance`,
      excerpt: `Unit economics ${quarter}: CAC €${Math.floor(15 + seededRandom(seed) * 25)}, LTV €${Math.floor(350 + seededRandom(seed) * 400)}, payback ${Math.floor(6 + seededRandom(seed) * 8)} months. LTV/CAC ratio ${Math.floor(15 + seededRandom(seed) * 15)}x. Improving efficiency trends.`,
      author: 'Finance Team',
    },
  ];

  const template = templates[seed % templates.length];

  return {
    id,
    title: template.title,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-FIN-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${template.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60)}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: template.author,
    excerpt: template.excerpt,
    reliabilityScore: generateReliability(seed + 11),
  };
}

/**
 * Customer analytics document templates
 */
function generateCustomerDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const quarter = getRandomItem(QUARTERS, seed);
  const segment = getRandomItem(SEGMENTS, seed + 1);
  const fileType = getRandomItem(FILE_TYPES, seed + 2);
  const connector = getConnector(seed + 3);

  const retention = Math.floor(72 + seededRandom(seed + 4) * 20);
  const products = (2 + seededRandom(seed + 5) * 2.5).toFixed(1);

  const templates = [
    {
      title: `${quarter} Customer Behavior Analysis - ${segment} Segment`,
      excerpt: `${segment} customer behavior ${quarter}: retention ${retention}%, avg products ${products}, monthly transactions ${Math.floor(15 + seededRandom(seed) * 35)}. Engagement drivers: multi-product adoption, international usage, premium features.`,
      author: 'Customer Analytics',
    },
    {
      title: `${quarter} Retention Metrics - Cohort Analysis ${segment}`,
      excerpt: `${segment} retention analysis: 90-day ${retention}%, 12-month ${Math.floor(retention - 8)}%. Churn drivers: low engagement ${Math.floor(30 + seededRandom(seed) * 20)}%, pricing ${Math.floor(15 + seededRandom(seed) * 15)}%, competition ${Math.floor(10 + seededRandom(seed) * 15)}%.`,
      author: 'Retention Analytics',
    },
    {
      title: `Product Adoption Patterns ${quarter} - ${segment} Users`,
      excerpt: `${segment} product adoption: cards ${Math.floor(85 + seededRandom(seed) * 12)}%, FX ${Math.floor(35 + seededRandom(seed) * 25)}%, premium ${Math.floor(8 + seededRandom(seed) * 15)}%, crypto ${Math.floor(12 + seededRandom(seed) * 20)}%. Cross-sell opportunity significant.`,
      author: 'Product Analytics',
    },
  ];

  const template = templates[seed % templates.length];

  return {
    id,
    title: template.title,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-CUST-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${template.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60)}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: template.author,
    excerpt: template.excerpt,
    reliabilityScore: generateReliability(seed + 11),
  };
}

/**
 * Competitive intelligence document templates
 */
function generateCompetitiveDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const competitors = ['N26', 'Monzo', 'Starling', 'Wise', 'Stripe', 'PayPal', 'Traditional Banks'];
  const competitor = getRandomItem(competitors, seed);
  const quarter = getRandomItem(QUARTERS, seed + 1);
  const fileType = getRandomItem(FILE_TYPES, seed + 2);
  const connector = getConnector(seed + 3);

  const marketShare = Math.floor(3 + seededRandom(seed + 4) * 15);
  const growth = Math.floor(10 + seededRandom(seed + 5) * 40);

  const templates = [
    {
      title: `${competitor} Competitive Analysis ${quarter} - Market Position`,
      excerpt: `${competitor} market share ${marketShare}%, growing ${growth}% YoY. Strengths: ${['brand trust', 'product depth', 'pricing', 'UX', 'scale'][seed % 5]}. Weaknesses: ${['international limited', 'feature gaps', 'cost structure', 'regulation'][seed % 4]}. Threat level: ${['low', 'moderate', 'moderate', 'high'][seed % 4]}.`,
      author: 'Competitive Intelligence',
    },
    {
      title: `${quarter} ${competitor} Product Comparison - Feature Benchmarking`,
      excerpt: `${competitor} vs Revolut feature comparison: payment processing ${['competitive', 'lagging', 'leading'][seed % 3]}, international ${['strong', 'weak', 'moderate'][seed % 3]}, pricing ${['premium', 'competitive', 'aggressive'][seed % 3]}. Win rate Revolut: ${Math.floor(45 + seededRandom(seed) * 30)}%.`,
      author: 'Product Strategy',
    },
  ];

  const template = templates[seed % templates.length];

  return {
    id,
    title: template.title,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-COMP-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${template.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60)}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: template.author,
    excerpt: template.excerpt,
    reliabilityScore: generateReliability(seed + 11),
  };
}

/**
 * Product & technology document templates
 */
function generateProductDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const features = ['API Platform', 'Mobile App', 'Cards', 'Crypto', 'Business Banking', 'Lending', 'Savings', 'Investment'];
  const feature = getRandomItem(features, seed);
  const quarter = getRandomItem(QUARTERS, seed + 1);
  const fileType = getRandomItem(FILE_TYPES, seed + 2);
  const connector = getConnector(seed + 3);

  const adoption = Math.floor(15 + seededRandom(seed + 4) * 65);
  const satisfaction = (3.8 + seededRandom(seed + 5) * 1.1).toFixed(1);

  const templates = [
    {
      title: `${feature} Product Performance ${quarter} - Adoption Metrics`,
      excerpt: `${feature} adoption ${adoption}% of user base, satisfaction ${satisfaction}/5. Usage frequency ${Math.floor(5 + seededRandom(seed) * 20)} times/month. Revenue contribution €${Math.floor(5 + seededRandom(seed) * 40)}M. Key driver of engagement and retention.`,
      author: 'Product Team',
    },
    {
      title: `${quarter} ${feature} Roadmap - Feature Development Plan`,
      excerpt: `${feature} development priorities: user requests ${Math.floor(200 + seededRandom(seed) * 800)}, enhancement backlog, competitive parity. Investment €${Math.floor(2 + seededRandom(seed) * 15)}M. Expected ROI ${(2.5 + seededRandom(seed) * 5).toFixed(1)}x over 18 months.`,
      author: 'Product Strategy',
    },
  ];

  const template = templates[seed % templates.length];

  return {
    id,
    title: template.title,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-PRODUCT-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${template.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60)}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: template.author,
    excerpt: template.excerpt,
    reliabilityScore: generateReliability(seed + 11),
  };
}

/**
 * Legal & compliance document templates
 */
function generateLegalDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const topics = ['GDPR Compliance', 'AML Controls', 'Licensing', 'Regulatory Reporting', 'Data Privacy', 'Consumer Protection'];
  const topic = getRandomItem(topics, seed);
  const quarter = getRandomItem(QUARTERS, seed + 1);
  const fileType = getRandomItem(FILE_TYPES, seed + 2);
  const connector = getConnector(seed + 3);

  const compliance = Math.floor(92 + seededRandom(seed + 4) * 7);

  const templates = [
    {
      title: `${topic} Assessment ${quarter} - Compliance Status`,
      excerpt: `${topic} compliance score ${compliance}%. ${Math.floor(0 + seededRandom(seed) * 5)} material findings, ${Math.floor(0 + seededRandom(seed) * 12)} minor recommendations. Regulatory relationship ${['strong', 'good', 'satisfactory'][seed % 3]}. Next audit ${getRandomItem(QUARTERS, seed + 5)}.`,
      author: 'Compliance',
    },
    {
      title: `${quarter} ${topic} Report - Regulatory Update`,
      excerpt: `${topic} update ${quarter}: regulatory changes impact ${['low', 'moderate', 'high'][seed % 3]}, implementation timeline ${Math.floor(3 + seededRandom(seed) * 9)} months, budget €${Math.floor(1 + seededRandom(seed) * 8)}M. Compliance maintained across all jurisdictions.`,
      author: 'Legal Team',
    },
  ];

  const template = templates[seed % templates.length];

  return {
    id,
    title: template.title,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-LEGAL-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${template.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60)}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: template.author,
    excerpt: template.excerpt,
    reliabilityScore: generateReliability(seed + 11),
  };
}

/**
 * Operations document templates
 */
function generateOperationsDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const areas = ['Customer Support', 'Fraud Prevention', 'Infrastructure', 'Payment Processing', 'Card Operations'];
  const area = getRandomItem(areas, seed);
  const quarter = getRandomItem(QUARTERS, seed + 1);
  const fileType = getRandomItem(FILE_TYPES, seed + 2);
  const connector = getConnector(seed + 3);

  const efficiency = Math.floor(82 + seededRandom(seed + 4) * 15);
  const cost = Math.floor(5 + seededRandom(seed + 5) * 35);

  const templates = [
    {
      title: `${area} Operations ${quarter} - Performance Metrics`,
      excerpt: `${area} efficiency ${efficiency}%, cost €${cost}M. Volume processed ${Math.floor(20 + seededRandom(seed) * 180)}M transactions. SLA achievement ${Math.floor(92 + seededRandom(seed) * 7)}%. Process improvements identified: automation opportunities, cost reduction initiatives.`,
      author: 'Operations',
    },
    {
      title: `${quarter} ${area} Optimization - Process Improvement`,
      excerpt: `${area} optimization program: efficiency gain +${Math.floor(5 + seededRandom(seed) * 15)}%, cost saving €${(cost * 0.15).toFixed(1)}M annually. Automation initiatives, vendor renegotiation, process redesign. Payback period ${Math.floor(6 + seededRandom(seed) * 12)} months.`,
      author: 'Operations Excellence',
    },
  ];

  const template = templates[seed % templates.length];

  return {
    id,
    title: template.title,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-OPS-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${template.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60)}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: template.author,
    excerpt: template.excerpt,
    reliabilityScore: generateReliability(seed + 11),
  };
}

/**
 * Miscellaneous document templates
 */
function generateOtherDoc(id: string, index: number): Source {
  const seed = parseInt(id.substring(1));
  const topics = ['ESG Report', 'Board Minutes', 'Partnership Agreement', 'Press Release', 'Industry Report', 'Consultant Report'];
  const topic = getRandomItem(topics, seed);
  const quarter = getRandomItem(QUARTERS, seed + 1);
  const fileType = getRandomItem(FILE_TYPES, seed + 2);
  const connector = getConnector(seed + 3);

  return {
    id,
    title: `${topic} ${quarter} - Strategic Documentation`,
    category: 'connector',
    connectorId: connector,
    externalId: `${connector.toUpperCase()}-OTHER-${String(index).padStart(4, '0')}`,
    fileType,
    fileName: `${topic.replace(/[^a-zA-Z0-9]/g, '_')}_${quarter.replace(/[^a-zA-Z0-9]/g, '_')}.${fileType}`,
    publishedAt: generateDate(seed + 10),
    author: getRandomItem(['Corporate Development', 'Strategy Team', 'External Advisors', 'Management'], seed + 4),
    excerpt: `${topic} covering ${quarter} period. Strategic initiatives, performance overview, market developments. Comprehensive analysis for stakeholders. Classification: ${['Public', 'Internal', 'Confidential'][seed % 3]}.`,
    reliabilityScore: generateReliability(seed + 11),
  };
}

// ============================================================================
// GENERATE ALL DOCUMENTS
// ============================================================================

export const GENERATED_SOURCES: Source[] = [];

let currentId = 752;
let docIndex = 0;

// Generate market sizing documents (102)
for (let i = 0; i < CATEGORIES.market; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateMarketDoc(id, docIndex++));
}

// Generate financial documents (150)
for (let i = 0; i < CATEGORIES.financial; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateFinancialDoc(id, docIndex++));
}

// Generate customer analytics documents (102)
for (let i = 0; i < CATEGORIES.customer; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateCustomerDoc(id, docIndex++));
}

// Generate competitive intelligence documents (78)
for (let i = 0; i < CATEGORIES.competitive; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateCompetitiveDoc(id, docIndex++));
}

// Generate product & technology documents (60)
for (let i = 0; i < CATEGORIES.product; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateProductDoc(id, docIndex++));
}

// Generate legal & compliance documents (60)
for (let i = 0; i < CATEGORIES.legal; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateLegalDoc(id, docIndex++));
}

// Generate operations documents (42)
for (let i = 0; i < CATEGORIES.operations; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateOperationsDoc(id, docIndex++));
}

// Generate miscellaneous documents (6)
for (let i = 0; i < CATEGORIES.other; i++) {
  const id = `s${currentId++}`;
  GENERATED_SOURCES.push(generateOtherDoc(id, docIndex++));
}

// Verify we generated exactly 600 documents
if (GENERATED_SOURCES.length !== 600) {
  throw new Error(`Expected 600 generated sources, got ${GENERATED_SOURCES.length}`);
}

console.log(`✅ Generated ${GENERATED_SOURCES.length} data room documents (s752-s1351)`);
