# Demo Verification Guide — M&A Valuation Use Case

## Quick Access

**Dev Server**: http://localhost:5175/
**Target Path**: Project "DataSense Due Diligence" → Scope "1.1 Market & Dynamics" → Node "Valuation Analysis & Deal Terms"

## Step-by-Step Verification

### 1. Navigate to the Demo Node

1. Open browser: http://localhost:5175/
2. Click on project **"DataSense — Nordic Capital Acquisition"**
3. In the workstream tree (left sidebar), locate **"1.1 Market & Dynamics"**
4. Expand it and click on **"Valuation Analysis & Deal Terms"**

### 2. Verify Node Properties

**Expected Node Title**: "Valuation Analysis & Deal Terms"

**Expected Description**: "Target valuation using comparable multiples, DCF, and market benchmarks for M&A transaction."

**Expected Metrics**:
- Status: In Progress (orange dot)
- Coverage Score: 75%
- Source Count: 4 sources
- Hypothesis Count: 1
- Validated: 0
- Deadline: 2026-03-20

### 3. Verify Sources Panel

Click on **"Sources"** tab (or "4 sources" badge in the UI).

**Expected Sources** (in order):

1. **DataSense — Data Room — Financial Model & Unit Economics FY2025**
   - Category: Data Room
   - Reliability: 95%
   - Excerpt: "ARR €14.2M (+41% YoY), NRR 118%..."

2. **CapitalIQ — SaaS Retail Analytics Comparable Multiples Q1 2026**
   - Category: API
   - Reliability: 93%
   - Excerpt: "Revenue multiples for retail analytics SaaS: median 7.2x ARR..."

3. **Nordic Capital — DCF Valuation Model for DataSense**
   - Category: Data Room
   - Reliability: 90%
   - Excerpt: "Base case valuation €125M (8.9x ARR, 15% WACC, 5-year projection)..."

4. **Pitchbook — M&A Precedents: SaaS Analytics Transactions 2024-2025**
   - Category: Premium Report
   - Reliability: 88%
   - Excerpt: "SaaS analytics M&A (n=14 deals): median multiple 6.8x ARR..."

### 4. Verify Chat/Research Tab

Click on **"Chat"** or **"Research"** tab.

#### Expected User Message

**Content**: "Based on all available data, what is the fair valuation range for DataSense? Please provide a detailed breakdown with comparable multiples, DCF scenarios, and precedent transactions."

**Timestamp**: 2026-03-14 10:30 AM

#### Expected AI Synthesis Response

**Type Badge**: Should show "SYNTHESIS" badge or similar indicator

**Content Structure**:
- Introduction paragraph mentioning €105-140M range
- Key Valuation Drivers section (4 bullet points)
- Comparable Multiples Approach
- DCF Approach
- Precedent Transactions
- Conclusion about 8.9x base case

**Citations**: Should have [1], [2], [3], [4] citations throughout text

**Source Attribution**: Should show "4 sources" at bottom

### 5. Verify Visual Block 1: KPI Row

**Block Title**: (none, it's a KPI row)

**Expected Cards** (4 cards in a row):

1. **Base Case Valuation**
   - Value: €125M
   - Delta: 8.9x ARR (positive/blue)

2. **Valuation Range**
   - Value: €105–140M
   - Delta: 7.5x–9.9x ARR (blue)

3. **Premium vs Market**
   - Value: +23%
   - Delta: vs median 7.2x (positive/green)

4. **NRR Multiple Impact**
   - Value: +0.55x
   - Delta: 118% NRR (positive/violet)

**Source Attribution**: Should show 2 sources (s18, s17)

### 6. Verify Visual Block 2: Chart Bar

**Block Title**: "Valuation Range — Scenario Analysis"

**Chart Type**: Horizontal bar chart

**Unit**: €M

**Benchmark Line**: Should show "Base Case" at 125M

**Expected Data** (4 bars):

1. Conservative (18% WACC): 105 (below benchmark)
2. Base Case (15% WACC): 125 (at benchmark)
3. Optimistic (12% WACC): 140 (above benchmark)
4. Comp Multiples (8.15x): 116 (below benchmark)

**Color**: Blue (#3b82f6)

**Source Attribution**: Should show 2 sources (s18, s17)

### 7. Verify Visual Block 3: Table

**Block Title**: "Revenue Multiple Comparables — SaaS Retail Analytics"

**Headers**: Company | EV/ARR | NRR | Growth | Key Note

**Expected Rows** (6 rows):

1. **DataSense (target)** — HIGHLIGHTED
   - 8.9x | 118% | 35% | ✓ Superior retention + growth

2. **Contentsquare**
   - 8.2x | 118% | 35% | ✓ Closest comparable

3. **Yotpo Analytics**
   - 8.1x | 115% | 32% | High NRR peer

4. **Amplitude (retail)**
   - 7.1x | 107% | 25% | Market median proxy

5. **G2 (vertical B2B)**
   - 7.1x | 110% | 28% | Vertical SaaS comp

6. **Median Market** — HIGHLIGHTED POSITIVE
   - 7.2x | 107% | 25% | Benchmark reference

**Caption**: "Sources: CapitalIQ, Pitchbook. Multiples on LTM ARR as of Q1 2026."

**Source Attribution**: Should show 2 sources (s17, s19)

### 8. Verify Visual Block 4: Chart Area

**Block Title**: "Multiple Sensitivity — Impact of NRR on Valuation"

**Chart Type**: Area/line chart with gradient fill

**Unit**: EV/ARR Multiple

**Expected Data** (7 points):

1. NRR 95%: 6.2
2. NRR 100%: 6.7
3. NRR 107% (median): 7.2
4. NRR 110%: 7.5
5. NRR 115%: 8.0
6. NRR 118% (DataSense): 8.75 — MARKED/HIGHLIGHTED
7. NRR 120%+: 9.2 (forecast/dashed)

**Source Attribution**: Should show 2 sources (s17, s18)

### 9. Verify Interactivity

#### Citation Popovers
- Click on any [1], [2], [3], [4] citation in the text
- Should open a popover showing:
  - Source title
  - Reliability score
  - Relevant excerpt
  - Link to full source

#### Source Attribution Bars
- Hover over source attribution bar below each block
- Should show tooltip with source details
- Click should navigate to source detail

#### Source Panel Navigation
- Click "4 sources selected" or similar link
- Should open Sources panel with 4 sources listed
- Each source should be clickable to view full content

### 10. Verify Layout & Responsiveness

**Desktop View** (>1024px):
- All 4 blocks should be visible without horizontal scroll
- KPI cards should be in a single row
- Table should fit comfortably with all columns visible
- Charts should be legible without zoom

**Mobile View** (<768px):
- KPI cards may stack vertically (2x2 grid)
- Table may have horizontal scroll or stacked view
- Charts should scale down but remain readable

### 11. Verify Data Consistency

Cross-check values across blocks:

**Base Case Valuation**:
- KPI Card 1: €125M
- Chart Bar (Base Case): 125
- Text: "base case of €125M"
- All should match ✓

**NRR Premium**:
- KPI Card 4: +0.55x
- Text: "+0.55x" in Comparable Multiples section
- Chart Area: Point at NRR 118% → 8.75x
- Formula: 7.2x + 0.55x + 0.40x = 8.15x ✓

**Valuation Range**:
- KPI Card 2: €105–140M
- Chart Bar: 105 (Conservative) to 140 (Optimistic)
- Text: "€105-140M (7.5x-9.9x ARR)"
- All should match ✓

## Expected Issues (If Any)

### Minor Expected Differences

1. **Source array indexing**: SOURCES[15-18] in mockData.ts corresponds to s16-s19 (0-indexed array)
2. **Timestamp format**: Display may vary based on locale settings
3. **Color variations**: Exact shades may differ slightly across browsers

### Known Limitations

1. **Static data**: All data is mocked, not dynamic from real APIs
2. **No real-time updates**: Changes require page refresh
3. **Citations**: Reference numbers [1-4] are display-only, not interactive hyperlinks (except as popovers)

## Success Criteria

✅ **All 4 visual blocks render correctly**
✅ **No console errors in browser**
✅ **All source attributions display properly**
✅ **Text content matches expected valuation analysis**
✅ **Numeric values are consistent across blocks**
✅ **DataSense is highlighted in comparison table**
✅ **Charts display with correct scales and labels**
✅ **Interactive elements (citations, sources) work**

## Troubleshooting

### Block not showing
- Check browser console for errors
- Verify source IDs (s16-s19) exist in SOURCES array
- Check SOURCES array indexes (should be [15-18] in 0-indexed array)

### Wrong data displayed
- Clear browser cache and hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)
- Verify mockData.ts was saved correctly
- Check NODE_SOURCES mapping includes ['s16', 's17', 's18', 's19']

### Layout issues
- Check responsive breakpoints in CSS
- Verify no conflicting styles
- Test in different browsers (Chrome, Firefox, Safari)

## Performance Checks

### Load Time
- Initial page load: <2 seconds
- Node switching: <500ms
- Chart rendering: <200ms

### Memory Usage
- Should not exceed 150MB in browser
- No memory leaks on navigation

### Bundle Size
- Total: ~2.8MB (acceptable for demo)
- Individual chunks: Check for unnecessary duplicates

## Demo Presentation Checklist

Before presenting:
- [ ] Server is running on stable port
- [ ] Browser is in fullscreen/presentation mode
- [ ] Zoom level is appropriate for audience visibility
- [ ] Browser dev tools are closed (or hidden)
- [ ] Network tab shows all assets loaded successfully
- [ ] No browser extensions interfering with display
- [ ] Backup screenshots prepared in case of technical issues

During presentation:
- [ ] Navigate smoothly without explaining navigation
- [ ] Highlight key numbers (€125M, 8.9x, 118% NRR)
- [ ] Demonstrate source popover for credibility
- [ ] Show comparables table with DataSense positioning
- [ ] Explain NRR sensitivity curve significance

After presentation:
- [ ] Be ready to answer questions about methodology
- [ ] Have source excerpts ready for detailed questions
- [ ] Prepared to explain DCF vs Comps vs Precedents

---

**Last Updated**: 2026-03-14
**Dev Server**: http://localhost:5175/
**Build Status**: ✅ Production Ready
