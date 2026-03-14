import { Project, WorkstreamNode, Source, ResearchSynthesis, Hypothesis, HypothesisSource, Alert, ActivityLog, ConnectorConfig, MatrixColumn, MatrixCell } from '@/types';

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'DataSense — Nordic Capital Acquisition',
    client: 'DataSense SAS',
    acquirer: 'Nordic Capital Partners',
    status: 'in_progress',
    template: 'saas_b2b',
    deadline: '2026-03-28',
    createdAt: '2026-02-10',
    updatedAt: '2026-03-03',
    members: ['u1', 'u2', 'u3', 'u4'],
    managerId: 'u1',
    description: 'Commercial due diligence on DataSense, B2B SaaS retail analytics platform. Nordic Capital considering acquisition at 8x ARR.',
    sector: 'B2B SaaS / Retail Analytics',
    dealSize: '€120M',
  },
];

// ─── SOURCES ─────────────────────────────────────────────────────────────────

export const SOURCES: Source[] = [
  {
    id: 's1',
    title: 'DataSense — Data Room — Financial Model FY2025',
    category: 'data_room',
    fileType: 'xlsx',
    fileName: 'DataSense_Financial_Model_FY2025.xlsx',
    publishedAt: '2026-01-15',
    author: 'DataSense CFO',
    excerpt: 'Detailed financial model with ARR of €14.2M, NRR 118%, net negative churn since Q3 2024.',
    reliabilityScore: 95,
    content: `DATASENSE FINANCIAL MODEL - FISCAL YEAR 2025\n\nEXECUTIVE SUMMARY\n\nAnnual Recurring Revenue (ARR): €14,2M\nNet Revenue Retention (NRR): 118%\nGross Churn: 5.8%\nNet Churn: -3.2% (negative since Q3 2024)\n\nKEY METRICS BY QUARTER:\n\nQ1 2025:\n- ARR: €13,1M\n- New ARR: €1,2M\n- Expansion: €0,8M\n- Churn: €0,4M\n\nQ2 2025:\n- ARR: €13,6M\n- New ARR: €0,9M\n- Expansion: €0,9M\n- Churn: €0,3M\n\nQ3 2025:\n- ARR: €14,0M\n- New ARR: €0,7M\n- Expansion: €1,1M\n- Churn: €0,3M\n\nQ4 2025:\n- ARR: €14,2M\n- New ARR: €0,5M\n- Expansion: €0,9M\n- Churn: €0,2M\n\nCUSTOMER CONCENTRATION:\n- Top 10 customers: 38% of ARR (vs 46% in 2023)\n- Average contract value: €127K\n- Contract length: 36 months average`,
  },
  {
    id: 's2',
    title: 'Gartner — Retail Analytics Platforms Market Guide 2025',
    category: 'premium_report',
    publishedAt: '2025-11-10',
    author: 'Gartner Research',
    excerpt: 'The retail analytics platform market will reach $8.4B in 2028 (19% CAGR). Verticalized solutions capture 34% of the market.',
    reliabilityScore: 88,
    content: `GARTNER MARKET GUIDE: RETAIL ANALYTICS PLATFORMS 2025

MARKET DEFINITION

Retail analytics platforms provide comprehensive data analysis and visualization capabilities specifically designed for retail operations, including inventory management, customer behavior analysis, pricing optimization, and supply chain visibility.

MARKET SIZE & GROWTH

The retail analytics platform market will reach $8.4B in 2028 (19% CAGR). Verticalized solutions capture 34% of the market.

Total Addressable Market (TAM):
- 2024: $4.2B
- 2025: $5.0B
- 2026: $6.0B
- 2027: $7.2B
- 2028: $8.4B (forecast)

Compound Annual Growth Rate (CAGR): 19% (2024-2028)

SEGMENTATION BY SOLUTION TYPE:

1. Generalist Analytics (66% of market):
   - Tableau, Power BI, Looker
   - Require significant customization
   - CAGR: 15%

2. Verticalized Retail Solutions (34% of market):
   - Purpose-built for retail use cases
   - Pre-configured retail KPIs
   - Faster implementation
   - CAGR: 23%

REGIONAL BREAKDOWN:
- North America: 42%
- Europe: 31%
- Asia-Pacific: 22%
- Rest of world: 5%

KEY TRENDS:
- Shift toward real-time analytics
- AI/ML integration becoming standard
- Cloud-native architecture preferred
- API-first platforms gaining market share`,
  },
  {
    id: 's3',
    title: 'CapitalIQ — Comparable Transactions SaaS Retail 2024-2025',
    category: 'api',
    fileType: 'csv',
    fileName: 'CapIQ_Retail_SaaS_Comps_Q1_2026.csv',
    publishedAt: '2026-02-01',
    author: 'CapitalIQ',
    excerpt: 'Median valuation multiples: 7.2x ARR for retail analytics SaaS (n=14 transactions, 2024-2025).',
    reliabilityScore: 92,
  },
  {
    id: 's4',
    title: 'TechCrunch — "Retail analytics: the new SaaS battleground"',
    category: 'web',
    publishedAt: '2026-01-28',
    author: 'Sarah Thompson',
    excerpt: 'Major retail groups are investing heavily in analytics solutions. DataSense cited among European leaders.',
    reliabilityScore: 62,
  },
  {
    id: 's5',
    title: 'DataSense — Data Room — Customer List & NPS Survey Q4 2025',
    category: 'data_room',
    fileType: 'xlsx',
    fileName: 'Customer_NPS_Survey_Q4_2025.xlsx',
    publishedAt: '2026-01-15',
    author: 'DataSense Customer Success',
    excerpt: 'Average NPS of 67. Top 10 clients represent 38% of ARR. Average contracts: 36 months. Renewal rate 94%.',
    reliabilityScore: 95,
  },
  {
    id: 's6',
    title: 'IDC — European Retail Technology Spending 2025',
    category: 'premium_report',
    publishedAt: '2025-09-15',
    author: 'IDC Europe',
    excerpt: 'Retail tech spending in Europe is growing 16% YoY. Analytics and AI represent 28% of the digital budget.',
    reliabilityScore: 85,
  },
  {
    id: 's7',
    title: 'Interview — CDO Groupe Carrefour (confidentielle)',
    category: 'interview',
    publishedAt: '2026-02-14',
    author: 'StratCap Team',
    excerpt: 'DataSense perceived as best-in-class solution for automated planogram. Migration costs estimated at >€2M, barrier to switching.',
    reliabilityScore: 90,
  },
  {
    id: 's8',
    title: 'DataSense — Data Room — Competitive Intelligence Report',
    category: 'data_room',
    fileType: 'xlsx',
    fileName: 'Competitive_Intelligence_Report.xlsx',
    publishedAt: '2026-01-15',
    author: 'DataSense Strategy Team',
    excerpt: 'Positioning vs. Tableau (too generic), Dunnhumby (UK/groceries focused), Symphony RetailAI (US-centric). DataSense is the only verticalized French-speaking player.',
    reliabilityScore: 80,
  },
  {
    id: 's9',
    title: 'Bloomberg — SaaS Valuation Multiples Q1 2026',
    category: 'api',
    publishedAt: '2026-02-28',
    author: 'Bloomberg Intelligence',
    excerpt: 'SaaS mid-market multiples compression: median NTM EV/Revenue at 6.1x in Feb 2026 vs 7.8x in H1 2025.',
    reliabilityScore: 93,
    isDeprecated: false,
  },
  {
    id: 's10',
    title: 'DataSense — Data Room — Product Roadmap 2026-2027',
    category: 'data_room',
    publishedAt: '2026-01-15',
    author: 'DataSense CTO',
    excerpt: 'Generative AI module (Q2 2026), EU expansion (DE, ES, IT — Q3 2026), native Salesforce Commerce Cloud integration (Q4 2026).',
    reliabilityScore: 88,
  },
  {
    id: 's11',
    title: 'Forrester — B2B SaaS Churn Benchmarks 2025',
    category: 'premium_report',
    fileType: 'csv',
    fileName: 'Forrester_B2B_SaaS_Benchmarks_2025.csv',
    publishedAt: '2025-10-01',
    author: 'Forrester Research',
    excerpt: 'Median gross churn SaaS B2B mid-market: 8-12% annual. Median NRR: 105-110%. DataSense outperforms with 118% NRR.',
    reliabilityScore: 86,
  },
  {
    id: 's12',
    title: 'Trustpilot / G2 — DataSense Reviews Aggregation',
    category: 'web',
    publishedAt: '2026-03-01',
    author: 'StratCap Analysis',
    excerpt: 'G2 rating: 4.4/5 (187 reviews). Main positive points: ease of integration, responsive support. Negative points: too rigid reporting, opaque pricing.',
    reliabilityScore: 55,
  },
  {
    id: 's16',
    title: 'DataSense — Data Room — Financial Model & Unit Economics FY2025',
    category: 'data_room',
    fileType: 'xlsx',
    fileName: 'DataSense_Financial_Model_FY2025.xlsx',
    publishedAt: '2026-01-15',
    author: 'DataSense CFO',
    excerpt: 'ARR €14.2M (+41% YoY), NRR 118% (vs industry median 107%), Rule of 40: 53% (growth 35% + EBITDA margin 18%), CAC payback 9 months, gross margin 82%.',
    reliabilityScore: 95,
    content: `# Financial Model FY2025 - DataSense

## Key Metrics Summary
- **ARR**: €14.2M (Dec 2025)
- **YoY Growth**: +41%
- **Net Revenue Retention (NRR)**: 118%
- **Gross Revenue Retention (GRR)**: 94.2%
- **Gross Margin**: 82%
- **EBITDA Margin**: 18%
- **CAC Payback**: 9 months
- **Rule of 40**: 53% (35% growth + 18% EBITDA)

## ARR Breakdown by Segment
- Retail Analytics Platform: €8.9M (63%)
- Verticalized Solutions: €3.8M (27%)
- Professional Services: €1.5M (10%)

## Customer Cohorts
- Gross churn rate: 5.8% (vs industry 8-12%)
- Expansion revenue: +18% net
- Average contract value: €127K
- Enterprise (>€500K ACV): 12 customers, €4.1M ARR`,
  },
  {
    id: 's17',
    title: 'CapitalIQ — SaaS Retail Analytics Comparable Multiples Q1 2026',
    category: 'api',
    fileType: 'xlsx',
    fileName: 'CapIQ_Retail_SaaS_Comps_Q1_2026.xlsx',
    publishedAt: '2026-02-28',
    author: 'CapitalIQ / S&P Global',
    excerpt: 'Revenue multiples for retail analytics SaaS: median 7.2x ARR (n=8 public comps), range 5.8x-10.1x. NRR premium: +0.5x multiple per 10% NRR above median. Growth-adjusted: 0.4x multiple per 10% growth.',
    reliabilityScore: 93,
    content: `# Comparable Multiples Analysis - SaaS Retail Analytics

## Public Comps Summary (Q1 2026)
**Median EV/ARR Multiple**: 7.2x
**Range**: 5.8x - 10.1x
**Sample Size**: 8 public companies

## Detailed Comps
1. **Shopify Plus Analytics**: 9.8x (high growth 45%, NRR 125%)
2. **Yotpo Analytics**: 8.1x (NRR 115%, growth 32%)
3. **Klaviyo (retail segment)**: 7.5x (NRR 110%, growth 28%)
4. **Lexer**: 6.9x (NRR 105%, growth 22%)
5. **Contentsquare**: 8.2x (NRR 118%, growth 35%) — CLOSE COMP
6. **Heap Analytics**: 6.5x (NRR 98%, growth 18%)
7. **Amplitude (retail)**: 7.1x (NRR 107%, growth 25%)
8. **Mixpanel**: 5.8x (NRR 95%, growth 15%)

## Multiple Drivers
- **NRR Premium**: +0.5x per 10% NRR above median 107%
- **Growth Premium**: +0.4x per 10% growth above median 25%
- **Rule of 40 Premium**: +0.3x per 10 points above 40%
- **Gross Margin Impact**: +0.2x per 5% above 75%

## DataSense Positioning
- NRR 118% → Premium +0.55x (vs median 107%)
- Growth 35% → Premium +0.40x (vs median 25%)
- **Adjusted Multiple**: 7.2x + 0.55x + 0.40x = **8.15x**`,
  },
  {
    id: 's18',
    title: 'Nordic Capital — DCF Valuation Model for DataSense',
    category: 'data_room',
    fileType: 'xlsx',
    fileName: 'DataSense_DCF_Valuation_Nordic_Capital.xlsx',
    publishedAt: '2026-03-05',
    author: 'Nordic Capital Investment Team',
    excerpt: 'Base case valuation €125M (8.9x ARR, 15% WACC, 5-year projection). Scenario range: €105M (conservative, 18% WACC) to €140M (optimistic, 12% WACC). Exit multiple 2029: 6.5x (mature SaaS).',
    reliabilityScore: 90,
    content: `# DCF Valuation Model - DataSense Acquisition

## Assumptions Summary

### Base Case (P50)
- **WACC**: 15.0%
- **Projection Period**: 5 years (2026-2030)
- **Terminal Growth**: 3.0%
- **Exit Multiple 2029**: 6.5x ARR (mature SaaS)

### Revenue Projections
- 2026: €19.5M (+37% growth)
- 2027: €26.1M (+34%)
- 2028: €34.0M (+30%)
- 2029: €43.4M (+28%)
- 2030: €54.2M (+25%)

### Margin Assumptions
- Gross Margin: stable 82%
- EBITDA Margin: 18% → 25% by 2029 (operating leverage)
- Capex: 5% of revenue
- NWC: 10% of revenue change

## Valuation Results

### Base Case (15% WACC)
- **Enterprise Value**: €125.3M
- **Implied Multiple**: 8.9x current ARR (€14.2M)
- **Per Share**: €35.80 (3.5M shares outstanding)

### Scenario Analysis
1. **Conservative** (18% WACC, 20% growth): €104.8M (7.5x ARR)
2. **Base Case** (15% WACC, 35% growth): €125.3M (8.9x ARR)
3. **Optimistic** (12% WACC, 45% growth): €139.7M (9.9x ARR)

### Sensitivity Table
| WACC \\ Growth | 20% | 30% | 35% | 40% | 50% |
|----------------|-----|-----|-----|-----|-----|
| 12% | 118M | 135M | 140M | 145M | 156M |
| 15% | 98M | 115M | 125M | 132M | 145M |
| 18% | 82M | 98M | 105M | 112M | 125M |`,
  },
  {
    id: 's19',
    title: 'Pitchbook — M&A Precedents: SaaS Analytics Transactions 2024-2025',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Pitchbook_SaaS_Analytics_MA_2024_2025.pdf',
    publishedAt: '2026-02-15',
    author: 'Pitchbook Data + Dealroom',
    excerpt: 'SaaS analytics M&A (n=14 deals): median multiple 6.8x ARR, range 5.2x-9.1x. All-cash structures command +8% premium vs stock/mixed. Vertical SaaS (retail focus) trades at +0.6x premium vs horizontal.',
    reliabilityScore: 88,
    content: `# M&A Precedent Transactions - SaaS Analytics (2024-2025)

## Market Overview
**Total Transactions**: 14 deals
**Median Multiple**: 6.8x ARR
**Range**: 5.2x - 9.1x
**Median Deal Size**: €95M

## Notable Transactions

### Premium Deals (>8x)
1. **Contentsquare** (Feb 2022, Permira): **8.2x** ARR
   - NRR: 118%, Growth: 35%, Retention focus
   - Deal size: €500M+

2. **Heap Analytics** (Apr 2023, Contentsquare): **8.5x** ARR
   - Product analytics, NRR 112%, Growth 42%

3. **Statsig** (Est. Jul 2023): **9.1x** ARR
   - Experimentation platform, NRR 128%, Growth 58%

### Mid-Market Deals (6-8x)
4. **G2 (estimated)** (Jun 2022, Stripes): **7.1x** ARR
   - Vertical B2B, NRR 110%, Growth 28%

5. **Amplitude (retail vertical)** (Est.): **7.3x** ARR
   - Product analytics, NRR 108%, Growth 26%

### Value Plays (<6.5x)
6. **Bazaarvoice** (Jan 2022, Permira): **6.5x** ARR
   - Mature asset, lower growth 15%, NRR 98%

7. **Mixpanel (est.)**: **5.2x** ARR
   - Competitive pressure, churn issues

## Key Pricing Factors
- **All-cash structure**: +8% premium vs mixed/stock
- **Vertical SaaS focus**: +0.6x multiple (retail, healthcare)
- **Strategic buyer**: +0.4x vs financial sponsor
- **Competitive auction**: +0.7x vs bilateral negotiation
- **High NRR (>115%)**: +0.8-1.2x multiple premium

## DataSense Positioning
Given:
- NRR 118% (top quartile)
- Retail vertical focus
- Financial sponsor buyer (Nordic Capital)
- Likely competitive process

**Estimated range**: 7.5x - 9.0x ARR`,
  },
];

// ─── NODE → SOURCES MAPPING ──────────────────────────────────────────────────

export const NODE_SOURCES: Record<string, string[]> = {
  // Level 1 — for Analysis Matrix
  n1: ['s2', 's6', 's4'],            // Market & Dynamics
  n2: ['s3', 's7', 's8'],            // Competition & Positioning
  n3: ['s1', 's5', 's11'],           // Clients & Retention
  n4: ['s1', 's3', 's12'],           // Pricing & Unit Economics
  n5: ['s4', 's7', 's10'],           // Go-to-Market & Expansion
  // Level 2 — legacy mappings
  n1a: ['s2', 's6', 's4'],           // Market Size & Growth
  n1b: ['s6', 's9'],                 // Drivers & Macro Risks
  n2a: ['s3', 's7', 's8'],           // Competitive Mapping
  n2b: ['s3', 's8'],                 // Barriers to Entry
  n3a: ['s16', 's17', 's18', 's19'],  // Valuation Analysis & Deal Terms
  n3b: ['s1', 's5', 's10'],          // Concentration & Customer Base Quality
  n4a: ['s1', 's3', 's12'],          // Pricing & Unit Economics
  n5a: ['s4', 's7', 's10'],          // Go-to-Market & Expansion
};

// ─── WORKSTREAM NODES ─────────────────────────────────────────────────────────

export const WORKSTREAM_NODES: WorkstreamNode[] = [
  // Level 0 — Main thesis
  {
    id: 'n0',
    projectId: 'p1',
    parentId: null,
    title: 'DataSense Investment Thesis',
    description: 'DataSense is a well-positioned B2B SaaS player in a structurally growing market, with customer retention metrics superior to industry benchmarks.',
    level: 0,
    order: 0,
    status: 'in_progress',
    assigneeId: 'u1',
    deadline: '2026-03-25',
    deadlineStatus: 'ok',
    coverageScore: 74,
    sourceCount: 12,
    hypothesisCount: 8,
    validatedCount: 5,
    updatedAt: '2026-03-11T09:15:00Z',
    updatedBy: 'u1',
  },
  // Level 1 — Main blocks
  {
    id: 'n1',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Market & Dynamics',
    description: 'Size, growth and dynamics of the retail analytics SaaS market in Europe.',
    level: 1,
    order: 1,
    status: 'in_progress',
    assigneeId: 'u2',
    deadline: '2026-03-18',
    deadlineStatus: 'ok',
    coverageScore: 82,
    sourceCount: 4,
    hypothesisCount: 3,
    validatedCount: 2,
    updatedAt: '2026-03-11T08:42:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n2',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Competition & Positioning',
    description: 'Analysis of market players, barriers to entry and DataSense differentiation.',
    level: 1,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u3',
    deadline: '2026-03-20',
    deadlineStatus: 'warning',
    coverageScore: 65,
    sourceCount: 3,
    hypothesisCount: 2,
    validatedCount: 1,
    updatedAt: '2026-03-10T16:30:00Z',
    updatedBy: 'u3',
  },
  {
    id: 'n3',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Clients & Retention',
    description: 'Customer base quality, retention metrics and satisfaction.',
    level: 1,
    order: 3,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-15',
    deadlineStatus: 'ok',
    coverageScore: 91,
    sourceCount: 5,
    hypothesisCount: 4,
    validatedCount: 4,
    updatedAt: '2026-03-09T14:20:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n4',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Pricing & Unit Economics',
    description: 'Pricing structure, pricing power and unit economics.',
    level: 1,
    order: 4,
    status: 'in_progress',
    assigneeId: 'u4',
    deadline: '2026-03-22',
    deadlineStatus: 'ok',
    coverageScore: 58,
    sourceCount: 2,
    hypothesisCount: 2,
    validatedCount: 0,
    updatedAt: '2026-03-10T11:05:00Z',
    updatedBy: 'u4',
  },
  {
    id: 'n5',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Go-to-Market & Expansion',
    description: 'Commercial strategy, pipeline and geographic expansion potential.',
    level: 1,
    order: 5,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-24',
    deadlineStatus: 'ok',
    coverageScore: 22,
    sourceCount: 1,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-08T10:00:00Z',
    updatedBy: 'u1',
  },
  // Level 2 — Market sub-nodes
  {
    id: 'n1a',
    projectId: 'p1',
    parentId: 'n1',
    title: 'Market Size & Growth',
    description: 'TAM/SAM retail analytics Europe. Verification of announced CAGR.',
    level: 2,
    order: 1,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-14',
    deadlineStatus: 'ok',
    coverageScore: 90,
    sourceCount: 3,
    hypothesisCount: 2,
    validatedCount: 2,
    updatedAt: '2026-03-11T08:10:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n1b',
    projectId: 'p1',
    parentId: 'n1',
    title: 'Drivers & Macro Risks',
    description: 'Identification of structural drivers (retail digitization, ESG) and risks (recession, IT budget compression).',
    level: 2,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u2',
    deadline: '2026-03-18',
    deadlineStatus: 'warning',
    coverageScore: 68,
    sourceCount: 2,
    hypothesisCount: 1,
    validatedCount: 0,
    updatedAt: '2026-03-10T17:00:00Z',
    updatedBy: 'u2',
  },
  // Level 2 — Competition sub-nodes
  {
    id: 'n2a',
    projectId: 'p1',
    parentId: 'n2',
    title: 'Competitive Mapping',
    description: 'Mapping of direct and indirect competitors, market shares.',
    level: 2,
    order: 1,
    status: 'in_progress',
    assigneeId: 'u3',
    deadline: '2026-03-20',
    deadlineStatus: 'warning',
    coverageScore: 70,
    sourceCount: 2,
    hypothesisCount: 1,
    validatedCount: 0,
    updatedAt: '2026-03-10T14:30:00Z',
    updatedBy: 'u3',
  },
  {
    id: 'n2b',
    projectId: 'p1',
    parentId: 'n2',
    title: 'Barriers to Entry',
    description: 'Analysis of migration costs, network effects and intellectual property.',
    level: 2,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u3',
    deadline: '2026-03-21',
    deadlineStatus: 'ok',
    coverageScore: 60,
    sourceCount: 2,
    hypothesisCount: 1,
    validatedCount: 1,
    updatedAt: '2026-03-10T15:45:00Z',
    updatedBy: 'u3',
  },
  // Level 2 — Client sub-nodes
  {
    id: 'n3a',
    projectId: 'p1',
    parentId: 'n3',
    title: 'Valuation Analysis & Deal Terms',
    description: 'Target valuation using comparable multiples, DCF, and market benchmarks for M&A transaction.',
    level: 2,
    order: 1,
    status: 'in_progress',
    assigneeId: 'u1',
    deadline: '2026-03-20',
    deadlineStatus: 'ok',
    coverageScore: 75,
    sourceCount: 4,
    hypothesisCount: 1,
    validatedCount: 0,
    updatedAt: '2026-03-14T10:35:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n3b',
    projectId: 'p1',
    parentId: 'n3',
    title: 'Concentration & Customer Base Quality',
    description: 'Revenue concentration, top client profiles, churn risks.',
    level: 2,
    order: 2,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-14',
    deadlineStatus: 'ok',
    coverageScore: 88,
    sourceCount: 2,
    hypothesisCount: 2,
    validatedCount: 2,
    updatedAt: '2026-03-09T11:30:00Z',
    updatedBy: 'u2',
  },
  // Level 2 — Pricing sub-nodes
  {
    id: 'n4a',
    projectId: 'p1',
    parentId: 'n4',
    title: 'Pricing & Unit Economics',
    description: 'Pricing structure, ARR by segment, CAC payback and LTV/CAC.',
    level: 2,
    order: 1,
    status: 'in_progress',
    assigneeId: 'u4',
    deadline: '2026-04-01',
    deadlineStatus: 'ok',
    coverageScore: 58,
    sourceCount: 2,
    hypothesisCount: 2,
    validatedCount: 0,
    updatedAt: '2026-03-10T11:05:00Z',
    updatedBy: 'u4',
  },
  // Level 2 — Go-to-Market sub-nodes
  {
    id: 'n5a',
    projectId: 'p1',
    parentId: 'n5',
    title: 'Go-to-Market & Expansion',
    description: 'Acquisition strategy, sales pipeline and geographic potential.',
    level: 2,
    order: 1,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-24',
    deadlineStatus: 'ok',
    coverageScore: 22,
    sourceCount: 1,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-08T10:00:00Z',
    updatedBy: 'u1',
  },
];

// ─── RESEARCH SYNTHESES ───────────────────────────────────────────────────────

export const RESEARCH_SYNTHESES: ResearchSynthesis[] = [
  {
    nodeId: 'n1',
    summary: 'The European retail analytics market shows solid structural growth, driven by accelerated post-Covid digitalization and competitive pressure on retailers. Analyses converge toward a 17-19% CAGR by 2028, with notable acceleration in the verticalized analytics segment (vs. generic solutions). DataSense operates in the most dynamic segment.',
    keyPoints: [
      'Retail analytics TAM Europe: ~$2.1B in 2025, estimated at $4.2B in 2030 (15% CAGR)',
      'Verticalized SaaS segment: 19% CAGR growth according to Gartner 2025',
      'The top 5 markets (FR, DE, UK, ES, IT) represent 78% of European TAM',
      'Retail IT budget acceleration: +16% YoY in Europe (IDC 2025)',
      'Shift toward multi-year contracts: 68% of deals >24 months in the mid-market segment',
    ],
    sources: [SOURCES[1], SOURCES[5], SOURCES[3]],
    lastUpdated: '2026-03-01T14:22:00Z',
    coverageScore: 90,
  },
  {
    nodeId: 'n3a',
    summary: 'Based on comprehensive analysis across 4 valuation methodologies, DataSense fair value is estimated at €105-140M (7.5x-9.9x ARR), with a base case of €125M (8.9x ARR). The 8.9x base case multiple reflects a justified premium over market median (7.2x) due to exceptional retention economics (118% NRR) and vertical positioning.',
    keyPoints: [
      'Base case valuation: €125M (8.9x ARR) based on DCF model with 15% WACC',
      'Valuation range: €105-140M across conservative to optimistic scenarios',
      'NRR premium: +0.55x multiple justified by 118% NRR vs industry median 107%',
      'Comparable multiples approach: €116M (8.15x ARR) based on public comps',
      'M&A precedents: 6.8x median, with closest comp (Contentsquare) at 8.2x ARR',
      'Top quartile positioning driven by Rule of 40 score of 53%',
    ],
    sources: [SOURCES[15], SOURCES[16], SOURCES[17], SOURCES[18]],
    lastUpdated: '2026-03-14T10:32:00Z',
    coverageScore: 75,
  },
  {
    nodeId: 'n2b',
    summary: 'DataSense benefits from high exit barriers structurally linked to the integration depth of its solution (ERP, WMS, PoS connectors) and migration costs estimated at a minimum of €2M for large accounts. Client interviews confirm a strong operational lock-in effect, although some clients report a dependency that creates renegotiation tensions.',
    keyPoints: [
      'Estimated migration costs: >€2M for large accounts (source: CDO Carrefour interview)',
      '34 native connectors (ERP, WMS, e-commerce) create strong operational dependency',
      'No competitor has more than 15 native connectors in this segment',
      'Intellectual property: 3 patents filed on automated planogram algorithms',
      'Risk: 3 clients (6% ARR) initiated RFPs in 2025 — to monitor',
    ],
    sources: [SOURCES[6], SOURCES[7]],
    lastUpdated: '2026-03-01T16:45:00Z',
    coverageScore: 60,
  },
];

// ─── HYPOTHESES ───────────────────────────────────────────────────────────────

export const HYPOTHESES: Hypothesis[] = [
  {
    id: 'h1',
    projectId: 'p1',
    nodeId: 'n1a', // Changed from 'n1' - only leaf nodes can have hypotheses
    title: '15-19% CAGR through 2028',
    body: 'Three independent sources (Gartner, IDC, StratCap analysis) converge toward structural growth of the European retail analytics market between 15% and 19% CAGR by 2028. This convergence is notably driven by accelerated retail digitalization, the rise of omnichannel formats, and ESG regulatory requirements that necessitate better traceability of sales data.',
    status: 'validated',
    createdBy: 'u2',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-28T14:30:00Z',
    updatedBy: 'u2',
    validatedBy: 'u1',
    validatedAt: '2026-02-28T16:00:00Z',
    confidence: {
      sourceQuality: 85,
      crossVerification: 88,
      dataFreshness: 90,
      internalConsistency: 82,
      overall: 86,
    },
    sourceIds: ['s2', 's6', 's4'],
    sources: [
      { sourceId: 's2', excerpt: 'The retail analytics platform market will reach $8.4B in 2028 (19% CAGR). Verticalized solutions capture 34% of the market.', addedBy: 'u2', addedAt: '2026-02-20T10:00:00Z', note: 'Primary source for CAGR range — Gartner is the reference in this segment.' },
      { sourceId: 's2', excerpt: 'Verticalized Retail Solutions (34% of market): Purpose-built for retail use cases, Pre-configured retail KPIs, Faster implementation, CAGR: 23%', addedBy: 'u2', addedAt: '2026-02-20T10:15:00Z', note: 'Segmentation data showing verticalized solutions growing faster than market average.' },
      { sourceId: 's2', excerpt: 'Compound Annual Growth Rate (CAGR): 19% (2024-2028)', addedBy: 'u2', addedAt: '2026-02-20T10:30:00Z' },
      { sourceId: 's6', excerpt: 'Technology spending in European retail is growing 16% YoY. Analytics and AI now represent 28% of the digital budget for retailers >€500M revenue.', addedBy: 'u2', addedAt: '2026-02-22T11:00:00Z' },
      { sourceId: 's4', excerpt: 'DataSense cited among the top 5 vendors to watch in B2B retail analytics. Growth estimated at +40% in 2025 according to industry sources.', addedBy: 'u2', addedAt: '2026-02-24T09:00:00Z', note: 'Press source — lower reliability (62%), to be used for illustration only.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h2', type: 'supports' },
      { hypothesisId: 'h5', type: 'supports' },
      { hypothesisId: 'h3', type: 'nuances' },
    ],
    tags: ['market', 'growth', 'structural'],
    comments: [
      {
        id: 'c1',
        authorId: 'u1',
        content: 'Excellent. The convergence of sources is a strong point. Can we refine the figure for the mid-market segment specifically?',
        createdAt: '2026-02-25T09:00:00Z',
        resolved: true,
      }
    ],
    versions: [
      {
        version: 1,
        content: 'The retail analytics market supports a ~15% CAGR through 2028.',
        changedBy: 'u2',
        changedAt: '2026-02-20T10:00:00Z',
        changeNote: 'Initial version',
      },
      {
        version: 2,
        content: 'The retail analytics market supports a 15-19% CAGR through 2028. Addition of IDC source and clarification on the verticalized segment.',
        changedBy: 'u2',
        changedAt: '2026-02-28T14:30:00Z',
        changeNote: 'Enriched with IDC Europe, range expanded to 15-19%',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-20', score: 65, event: 'Created' },
      { date: '2026-02-22', score: 70, event: 'IDC source added' },
      { date: '2026-02-25', score: 78, event: 'Gartner cross-reference' },
      { date: '2026-02-28', score: 86, event: 'Validated — Manager' },
    ],
    metadata: {
      source: 'manual',
      author: 'Sophie Leclerc',
    },
  },
  {
    id: 'h2',
    projectId: 'p1',
    nodeId: 'n1a', // Changed from 'n1' - only leaf nodes can have hypotheses
    title: 'Most dynamic segment (verticalized)',
    body: 'The verticalized retail analytics SaaS solutions segment is growing at 19% CAGR, approximately 4 points above the overall market. DataSense is positioned in this premium segment with an estimated market share of 12% in France and 3% in Europe. This verticalization is a vector for pricing power and sustainable differentiation against generic solutions.',
    status: 'validated',
    createdBy: 'u2',
    createdAt: '2026-02-21T11:00:00Z',
    updatedAt: '2026-02-26T15:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u1',
    validatedAt: '2026-03-01T10:00:00Z',
    confidence: {
      sourceQuality: 80,
      crossVerification: 72,
      dataFreshness: 88,
      internalConsistency: 78,
      overall: 79,
    },
    sourceIds: ['s2', 's8'],
    sources: [
      { sourceId: 's2', excerpt: 'Verticalized retail analytics solutions (34% of the market) show a 23% CAGR, +4 points vs. the overall market. These platforms capture 15-20% higher pricing power vs. generic solutions.', addedBy: 'u2', addedAt: '2026-02-21T11:00:00Z', note: 'Gartner confirms the outperformance of the verticalized segment.' },
      { sourceId: 's8', excerpt: 'DataSense is positioned as a leader in the French-speaking verticalized retail analytics segment with an estimated market share of 12% in France.', addedBy: 'u2', addedAt: '2026-02-23T14:00:00Z' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h1', type: 'supports' },
      { hypothesisId: 'h4', type: 'contradicts' },
    ],
    tags: ['market', 'positioning', 'vertical'],
    comments: [],
    versions: [
      {
        version: 1,
        content: 'DataSense operates in the most dynamic market segment (verticalized solutions).',
        changedBy: 'u2',
        changedAt: '2026-02-21T11:00:00Z',
        changeNote: 'Initial version',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-21', score: 60, event: 'Created' },
      { date: '2026-02-24', score: 72, event: 'DataSense source added' },
      { date: '2026-03-01', score: 79, event: 'Validated — Manager' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h3',
    projectId: 'p1',
    nodeId: 'n3a',
    title: 'NRR 118%',
    body: 'DataSense\'s 118% Net Revenue Retention positions the company in the best quartile of B2B SaaS mid-market comparables (Forrester median: 105-110%). This NRR level reflects strong upsell capability (new modules, license expansions) and indicates that the existing customer base constitutes an autonomous growth engine, independent of new acquisitions.',
    status: 'validated',
    createdBy: 'u2',
    createdAt: '2026-02-22T09:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u1',
    validatedAt: '2026-03-02T11:00:00Z',
    confidence: {
      sourceQuality: 92,
      crossVerification: 85,
      dataFreshness: 95,
      internalConsistency: 90,
      overall: 90,
    },
    sourceIds: ['s1', 's5', 's11'],
    sources: [
      { sourceId: 's1', excerpt: 'Net Revenue Retention (NRR): 118%. Negative net churn since Q3 2024 (-3.2%). Q4 2025 expansion ARR: €0.9M on €14.2M ARR base.', addedBy: 'u2', addedAt: '2026-02-22T09:00:00Z', note: 'DataSense data room — official figure, maximum reliability.' },
      { sourceId: 's5', excerpt: 'Median NRR Europe B2B SaaS mid-market: 105-110% (Forrester 2025). Segment leaders (top quartile) show NRR > 115%.', addedBy: 'u2', addedAt: '2026-02-25T11:00:00Z', note: 'Industry benchmark confirming DataSense\'s best-in-class position.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h4', type: 'supports' },
      { hypothesisId: 'h1', type: 'supports' },
      { hypothesisId: 'h6', type: 'supports' },
    ],
    tags: ['retention', 'NRR', 'growth'],
    comments: [
      {
        id: 'c2',
        authorId: 'u1',
        content: 'Key figure for the report. Let\'s make sure to source directly from the data room for the final report.',
        createdAt: '2026-03-02T11:30:00Z',
        resolved: false,
      }
    ],
    versions: [
      {
        version: 1,
        content: 'The 118% NRR confirms strong expansion power in the customer base.',
        changedBy: 'u2',
        changedAt: '2026-02-22T09:00:00Z',
        changeNote: 'Initial version',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-22', score: 78, event: 'Created' },
      { date: '2026-02-25', score: 85, event: 'Forrester benchmark' },
      { date: '2026-03-02', score: 90, event: 'Validated — Manager' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h4',
    projectId: 'p1',
    nodeId: 'n3a',
    title: '6% gross churn (best quartile)',
    body: 'DataSense\'s 6% annual gross churn is significantly lower than the industry median (8-12% according to Forrester 2025). Combined with 118% NRR, this means DataSense not only retains its clients but actively grows them. Multi-year contracts (average duration 36 months) reinforce revenue visibility.',
    status: 'validated',
    createdBy: 'u2',
    createdAt: '2026-02-23T14:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u1',
    validatedAt: '2026-03-01T10:00:00Z',
    confidence: {
      sourceQuality: 90,
      crossVerification: 82,
      dataFreshness: 92,
      internalConsistency: 88,
      overall: 88,
    },
    sourceIds: ['s1', 's11'],
    sources: [
      { sourceId: 's1', excerpt: 'Gross Churn: 5.8%. Contract length: 36 months average. Top 10 customers: 38% of ARR (vs 46% in 2023).', addedBy: 'u2', addedAt: '2026-02-23T14:00:00Z', note: 'Primary data room source — auditable figures.' },
      { sourceId: 's11', excerpt: 'Median gross churn B2B SaaS mid-market 2025: 8-12% according to Forrester. Verticalized solutions with multi-year contracts show structurally lower churn.', addedBy: 'u2', addedAt: '2026-02-28T10:00:00Z', note: 'Industry benchmark — confirms DataSense\'s best quartile position at 5.8%.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h3', type: 'supports' },
      { hypothesisId: 'h2', type: 'nuances' },
      { hypothesisId: 'h5', type: 'contradicts' },
    ],
    tags: ['churn', 'retention', 'benchmark'],
    comments: [],
    versions: [],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-23', score: 75, event: 'Created' },
      { date: '2026-02-28', score: 88, event: 'Forrester benchmark confirmed' },
      { date: '2026-03-01', score: 88, event: 'Validated — Manager' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h5',
    projectId: 'p1',
    nodeId: 'n3b',
    title: 'Top 10 = 38% ARR',
    body: 'DataSense\'s top 10 clients represent 38% of ARR, which constitutes a moderate concentration level for a mid-market SaaS. This figure is improving vs. 2023 (46%). The risk of a large account departure exists but is mitigated by high migration costs and contract duration.',
    status: 'validated',
    createdBy: 'u2',
    createdAt: '2026-02-24T10:00:00Z',
    updatedAt: '2026-03-01T14:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u1',
    validatedAt: '2026-03-01T15:00:00Z',
    confidence: {
      sourceQuality: 88,
      crossVerification: 70,
      dataFreshness: 90,
      internalConsistency: 80,
      overall: 82,
    },
    sourceIds: ['s1', 's5'],
    sources: [
      { sourceId: 's1', excerpt: 'Top 10 customers: 38% of ARR (vs 46% in 2023). Average contract value: €127K. Contract length: 36 months average.', addedBy: 'u2', addedAt: '2026-02-24T10:00:00Z', note: 'Official data room figure — deconcentration trend is positive.' },
      { sourceId: 's5', excerpt: 'Median customer concentration B2B SaaS mid-market: top 10 = 35-45% ARR. A ratio > 50% is considered high risk by PE acquirers.', addedBy: 'u2', addedAt: '2026-02-27T09:00:00Z', note: 'Forrester benchmark confirms DataSense is within the norm.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h6', type: 'nuances' },
    ],
    tags: ['concentration', 'risk', 'clients'],
    comments: [],
    versions: [],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-24', score: 70, event: 'Created' },
      { date: '2026-03-01', score: 82, event: 'Validated — Manager' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h6',
    projectId: 'p1',
    nodeId: 'n3b',
    title: 'High switching costs (€2M+)',
    body: 'Migration costs estimated at over €2M for large accounts (source: Carrefour CDO interview) constitute a significant exit barrier. DataSense\'s 34 native connectors create operational dependency that limits the risk of massive churn, even in cases of partial dissatisfaction.',
    status: 'validated',
    createdBy: 'u3',
    createdAt: '2026-02-26T11:00:00Z',
    updatedAt: '2026-03-02T09:00:00Z',
    updatedBy: 'u3',
    validatedBy: 'u1',
    validatedAt: '2026-03-02T10:00:00Z',
    confidence: {
      sourceQuality: 88,
      crossVerification: 68,
      dataFreshness: 85,
      internalConsistency: 82,
      overall: 81,
    },
    sourceIds: ['s7', 's8'],
    sources: [
      { sourceId: 's7', excerpt: '"Migration costs are colossal. We\'re talking about 18 to 24 months of project and minimum €2M for an entity of our size. It\'s not realistic to change solutions." — CDO, Carrefour France (field interview, 02/28/2026)', addedBy: 'u3', addedAt: '2026-02-28T16:00:00Z', note: 'Key client interview — direct verbatim. Very strong for the report.' },
      { sourceId: 's8', excerpt: 'DataSense offers 34 native connectors (ERP, WMS, e-commerce, PoS). No direct competitor exceeds 15 connectors in this segment.', addedBy: 'u3', addedAt: '2026-03-01T09:00:00Z' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h5', type: 'supports' },
    ],
    tags: ['switching-costs', 'lock-in', 'risk'],
    comments: [],
    versions: [],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-26', score: 65, event: 'Created' },
      { date: '2026-03-01', score: 81, event: 'Carrefour interview integrated' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h7',
    projectId: 'p1',
    nodeId: 'n2a',
    title: 'Only French-speaking player',
    body: 'Competitive analysis reveals that DataSense holds a leadership position with no direct competitor in the French-language verticalized retail analytics SaaS solutions segment. Tableau and Power BI are too generic, Dunnhumby is focused on UK groceries, Symphony RetailAI is US-centric. This absence of direct competition is a strong differentiation factor.',
    status: 'draft',
    createdBy: 'u3',
    createdAt: '2026-02-28T15:00:00Z',
    updatedAt: '2026-03-01T11:00:00Z',
    updatedBy: 'u3',
    confidence: {
      sourceQuality: 75,
      crossVerification: 55,
      dataFreshness: 80,
      internalConsistency: 72,
      overall: 70,
    },
    sourceIds: ['s8'],
    sources: [
      { sourceId: 's8', excerpt: 'Q1 2026 market scan: no French-speaking pure-play SaaS player identified in the B2B mid-market retail analytics segment (<€50M ARR). Tableau and Power BI positioned as generic, non-verticalized.', addedBy: 'u3', addedAt: '2026-02-28T15:00:00Z', note: 'Internal source (data room) — must be validated with an independent external source.' },
    ] as HypothesisSource[],
    relations: [],
    tags: ['competition', 'positioning', 'moat'],
    comments: [
      {
        id: 'c3',
        authorId: 'u1',
        content: 'To be validated with an independent external source. The data room is potentially biased on this point.',
        createdAt: '2026-03-01T12:00:00Z',
        resolved: false,
      }
    ],
    versions: [],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-02-28', score: 60, event: 'Created' },
      { date: '2026-03-01', score: 70, event: 'Data room source enriched' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h8',
    projectId: 'p1',
    nodeId: 'n1b',
    title: 'SaaS multiples compression 2025-2026',
    body: 'Bloomberg Intelligence signals a compression of SaaS mid-market multiples: median NTM EV/Revenue at 6.1x in February 2026, versus 7.8x in H1 2025. This trend questions the 8x ARR multiple envisioned by Nordic Capital. It is necessary to analyze whether DataSense can justify a premium over its comparables given its operational outperformance.',
    status: 'on_hold',
    createdBy: 'u4',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-03T09:00:00Z',
    updatedBy: 'u4',
    confidence: {
      sourceQuality: 85,
      crossVerification: 58,
      dataFreshness: 92,
      internalConsistency: 60,
      overall: 73,
    },
    sourceIds: ['s9'],
    sources: [
      { sourceId: 's9', excerpt: 'Bloomberg Intelligence SaaS Valuation Monitor — February 2026: median NTM EV/Revenue SaaS mid-market = 6.1x (vs 7.8x in H1 2025). Significant compression linked to rising rates.', addedBy: 'u4', addedAt: '2026-03-01T10:00:00Z', note: 'Awaiting updated CapitalIQ data to validate this trend on retail analytics comparables.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h1', type: 'nuances' },
    ],
    tags: ['valuation', 'multiples', 'risque-macro'],
    comments: [
      {
        id: 'c4',
        authorId: 'u1',
        content: 'Awaiting updated CapitalIQ data to validate or refute this hypothesis. On hold until received.',
        createdAt: '2026-03-03T09:30:00Z',
        resolved: false,
      }
    ],
    versions: [],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-03-01', score: 68, event: 'Created' },
      { date: '2026-03-03', score: 73, event: 'Bloomberg data integrated — On Hold' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h9',
    projectId: 'p1',
    nodeId: 'n4a', // Changed from 'n4' - only leaf nodes can have hypotheses
    title: 'Premium pricing (+15%)',
    body: 'DataSense\'s average price per seat (€1,200/year) is positioned 15% above the industry median. This gap is justified by solution verticalization and integration level (34 connectors). Client interviews indicate a value perception superior to price: 7 out of 8 interviewed clients estimate positive ROI in less than 12 months. However, renegotiation pressure is increasing among mid-market (<100 seats) since H2 2025.',
    status: 'draft',
    createdBy: 'u3',
    createdAt: '2026-03-04T09:00:00Z',
    updatedAt: '2026-03-04T15:00:00Z',
    updatedBy: 'u3',
    confidence: {
      sourceQuality: 78,
      crossVerification: 65,
      dataFreshness: 88,
      internalConsistency: 72,
      overall: 75,
    },
    sourceIds: ['s1', 's7'],
    sources: [
      { sourceId: 's1', excerpt: 'Average contract value: €127K (≈ €1,200/seat/year based on an average license of 106 seats). Revenue mix: 78% recurring licenses, 22% services.', addedBy: 'u3', addedAt: '2026-03-04T09:00:00Z', note: 'Pricing confirmed in data room.' },
      { sourceId: 's7', excerpt: '"We renegotiate every 3 years. The price is high but we can\'t leave easily. If the ROI stays there, we renew." — Purchasing Director, Fnac-Darty (interview 03/01/2026)', addedBy: 'u3', addedAt: '2026-03-04T14:00:00Z', note: 'Visible pricing tension — to be integrated into the reasoning.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h6', type: 'nuances' },
    ],
    tags: ['pricing', 'unit-economics', 'benchmark'],
    comments: [],
    versions: [
      {
        version: 1,
        content: 'DataSense pricing is premium but remains within industry norms.',
        changedBy: 'u3',
        changedAt: '2026-03-04T09:00:00Z',
        changeNote: 'Initial version',
      },
    ],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-03-04', score: 68, event: 'Created' },
      { date: '2026-03-04', score: 75, event: 'Interviews integrated' },
    ],
  metadata: {
    source: 'manual',
    author: 'Sophie Leclerc',
  },
  },
  {
    id: 'h10',
    projectId: 'p1',
    nodeId: 'n5a', // Changed from 'n5' - only leaf nodes can have hypotheses
    title: 'Management ready for EU expansion',
    body: 'The CEO (Nicolas Bertrand, ex-Dassault Systèmes) and the CPO (Sarah Chen, ex-Salesforce EMEA) both have significant international experience. The organization has 12 people who have already worked in a European scale-up context. The presented expansion plan is realistic: 3 target markets (Spain, Belgium, Netherlands) within an 18-month horizon, with a go-to-market strategy based on local partners. Point of vigilance: the CFO has been in position for only 4 months.',
    status: 'draft',
    createdBy: 'u2',
    createdAt: '2026-03-05T10:00:00Z',
    updatedAt: '2026-03-05T16:00:00Z',
    updatedBy: 'u2',
    confidence: {
      sourceQuality: 70,
      crossVerification: 60,
      dataFreshness: 85,
      internalConsistency: 75,
      overall: 72,
    },
    sourceIds: ['s8', 's10'],
    sources: [
      { sourceId: 's8', excerpt: 'DataSense management team: CEO Nicolas Bertrand (15 years B2B SaaS experience, ex-VP Sales Dassault Systèmes EMEA). CPO Sarah Chen (ex-Head of Product Salesforce EMEA). CFO Pierre Dumont (in position since November 2025).', addedBy: 'u2', addedAt: '2026-03-05T10:00:00Z', note: 'CVs confirm international experience.' },
      { sourceId: 's10', excerpt: '"The team clearly has the capability to expand to Europe. The playbook is solid. What I\'m monitoring is the execution capability with a new CFO." — Expert call opinion, ex-CEO Axway (02/28/2026)', addedBy: 'u2', addedAt: '2026-03-05T14:00:00Z', note: 'Expert call — important nuance on the CFO to mention in the report.' },
    ] as HypothesisSource[],
    relations: [],
    tags: ['management', 'internationalization', 'execution'],
    comments: [],
    versions: [
      {
        version: 1,
        content: 'The management team has the capabilities to execute the internationalization phase.',
        changedBy: 'u2',
        changedAt: '2026-03-05T10:00:00Z',
        changeNote: 'Initial version',
      },
    ],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-03-05', score: 65, event: 'Created' },
      { date: '2026-03-05', score: 72, event: 'Expert call integrated' },
    ],
    metadata: {
      source: 'manual',
      author: 'Sophie Leclerc',
    },
  },
];

// ─── ALERTS ──────────────────────────────────────────────────────────────────

export const ALERTS: Alert[] = [
  {
    id: 'a1',
    projectId: 'p1',
    type: 'on_hold',
    severity: 'medium',
    title: 'H8 — Awaiting cross-verification',
    description: 'The hypothesis on SaaS multiples compression is awaiting an updated Bloomberg source. Nordic Capital needs this analysis to finalize the valuation.',
    nodeId: 'n1b',
    hypothesisId: 'h8',
    createdAt: '2026-03-03T09:30:00Z',
    isRead: false,
  },
  {
    id: 'a2',
    projectId: 'p1',
    type: 'deprecated',
    severity: 'high',
    title: 'Bloomberg H1 2025 Source — Obsolete Data',
    description: 'Bloomberg data on SaaS multiples (H1 2025) has now been replaced by Feb 2026 data. Hypothesis H8 must be updated.',
    nodeId: 'n1b',
    hypothesisId: 'h8',
    createdAt: '2026-03-02T16:00:00Z',
    isRead: false,
  },
  {
    id: 'a3',
    projectId: 'p1',
    type: 'contradiction',
    severity: 'high',
    title: 'Contradiction — Pricing power vs. negative customer reviews',
    description: 'H7 (unique positioning) relies on the data room, but G2 reviews mention "opaque pricing" likely to generate dissatisfaction. These two elements require reconciliation.',
    nodeId: 'n2a',
    hypothesisId: 'h7',
    createdAt: '2026-03-03T10:00:00Z',
    isRead: false,
  },
  {
    id: 'a4',
    projectId: 'p1',
    type: 'reinforced',
    severity: 'low',
    title: 'H3 — NRR confirmed by Forrester benchmark',
    description: 'The 118% NRR is reinforced by the Forrester 2025 benchmark. Hypothesis H3 can be considered highly reliable.',
    nodeId: 'n3a',
    hypothesisId: 'h3',
    createdAt: '2026-03-02T09:00:00Z',
    isRead: true,
  },
];

// ─── ACTIVITY LOG ─────────────────────────────────────────────────────────────

export const ACTIVITY_LOG: ActivityLog[] = [
  {
    id: 'log1',
    projectId: 'p1',
    action: 'Project creation',
    actor: 'Alex Morgan',
    actorId: 'u1',
    targetType: 'project',
    targetId: 'p1',
    targetName: 'DataSense — Nordic Capital Acquisition',
    timestamp: '2026-02-10T09:00:00Z',
  },
  {
    id: 'log2',
    projectId: 'p1',
    action: 'Hypothesis added',
    actor: 'Sophie Leclerc',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1 — Market CAGR 15-19%',
    timestamp: '2026-02-20T10:00:00Z',
  },
  {
    id: 'log3',
    projectId: 'p1',
    action: 'Hypothesis validated',
    actor: 'Alex Morgan',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1 — Market CAGR 15-19%',
    timestamp: '2026-02-28T16:00:00Z',
    detail: 'Statut → Validated',
  },
  {
    id: 'log4',
    projectId: 'p1',
    action: 'Hypothesis modified',
    actor: 'Sophie Leclerc',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1 — Market CAGR 15-19%',
    timestamp: '2026-02-28T14:30:00Z',
    detail: 'Body modified — IDC source added',
  },
  {
    id: 'log5',
    projectId: 'p1',
    action: 'Hypothesis added',
    actor: 'Sophie Leclerc',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h3',
    targetName: 'H3 — NRR 118%',
    timestamp: '2026-02-22T09:00:00Z',
  },
  {
    id: 'log6',
    projectId: 'p1',
    action: 'Hypothesis validated',
    actor: 'Alex Morgan',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h3',
    targetName: 'H3 — NRR 118%',
    timestamp: '2026-03-02T11:00:00Z',
    detail: 'Statut → Validated',
  },
  {
    id: 'log7',
    projectId: 'p1',
    action: 'Source deprecated',
    actor: 'System',
    actorId: 'system',
    targetType: 'hypothesis',
    targetId: 'h8',
    targetName: 'H8 — Compression multiples',
    timestamp: '2026-03-02T16:00:00Z',
    detail: 'Bloomberg H1 2025 source → replaced by Feb 2026 data',
  },
  {
    id: 'log8',
    projectId: 'p1',
    action: 'Hypothesis added',
    actor: 'Camille Durand',
    actorId: 'u4',
    targetType: 'hypothesis',
    targetId: 'h8',
    targetName: 'H8 — Compression multiples SaaS',
    timestamp: '2026-03-01T10:00:00Z',
  },
  {
    id: 'log9',
    projectId: 'p1',
    action: 'Statut → On Hold',
    actor: 'Camille Durand',
    actorId: 'u4',
    targetType: 'hypothesis',
    targetId: 'h8',
    targetName: 'H8 — Compression multiples SaaS',
    timestamp: '2026-03-03T09:00:00Z',
    detail: 'Awaiting updated Bloomberg source',
  },
  {
    id: 'log10',
    projectId: 'p1',
    action: 'Hypothesis added',
    actor: 'Thomas Blanc',
    actorId: 'u3',
    targetType: 'hypothesis',
    targetId: 'h6',
    targetName: 'H6 — High switching costs',
    timestamp: '2026-02-26T11:00:00Z',
  },
  {
    id: 'log11',
    projectId: 'p1',
    action: 'Hypothesis validated',
    actor: 'Alex Morgan',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h6',
    targetName: 'H6 — High switching costs',
    timestamp: '2026-03-02T10:00:00Z',
    detail: 'Statut → Validated',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export const getHypothesesByNode = (nodeId: string) =>
  HYPOTHESES.filter(h => h.nodeId === nodeId);

export const getHypothesesByProject = (projectId: string) =>
  HYPOTHESES.filter(h => h.projectId === projectId);

export const getNodesByProject = (projectId: string) =>
  WORKSTREAM_NODES.filter(n => n.projectId === projectId);

export const getResearchByNode = (nodeId: string) =>
  RESEARCH_SYNTHESES.find(r => r.nodeId === nodeId);

export const getAlertsByProject = (projectId: string) =>
  ALERTS.filter(a => a.projectId === projectId);

export const getActivityByProject = (projectId: string) =>
  ACTIVITY_LOG.filter(a => a.projectId === projectId).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

export const getSourceById = (id: string) => SOURCES.find(s => s.id === id);

// ─── CONNECTORS (Intégrations Apps M&A) ─────────────────────────────────────

export const CONNECTORS: ConnectorConfig[] = [
  // Cloud Storage
  {
    id: 'google_drive',
    name: 'Google Drive',
    provider: 'google_drive',
    category: 'cloud',
    icon: 'HardDrive',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
    scopes: ['drive.readonly'],
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    provider: 'dropbox',
    category: 'cloud',
    icon: 'Cloud',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg',
    scopes: ['files.metadata.read', 'files.content.read'],
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    provider: 'sharepoint',
    category: 'cloud',
    icon: 'Building2',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg',
    scopes: ['Sites.Read.All', 'Files.Read.All'],
  },
  {
    id: 'box',
    name: 'Box',
    provider: 'box',
    category: 'cloud',
    icon: 'Package',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Box%2C_Inc._logo.svg',
    scopes: ['root_readonly', 'item_read'],
  },
  // Financial APIs / M&A Data
  {
    id: 'capitaliq',
    name: 'Capital IQ',
    provider: 'capitaliq',
    category: 'financial_api',
    icon: 'BarChart3',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/S%26P_Global.svg',
    scopes: ['data:read'],
  },
  {
    id: 'pitchbook',
    name: 'PitchBook',
    provider: 'pitchbook',
    category: 'financial_api',
    icon: 'TrendingUp',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/PitchBook_logo.png',
    scopes: ['data:read'],
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg',
    provider: 'bloomberg',
    category: 'financial_api',
    icon: 'Terminal',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Bloomberg_Logo.svg',
    scopes: ['data:read'],
  },
  // Virtual Data Rooms
  {
    id: 'intralinks',
    name: 'Intralinks',
    provider: 'intralinks',
    category: 'data_room',
    icon: 'Shield',
    logoUrl: 'https://www.intralinks.com/sites/default/files/2023-07/intralinks-logo.svg',
    scopes: ['workspace:read', 'document:read'],
  },
  {
    id: 'datasite',
    name: 'Datasite',
    provider: 'datasite',
    category: 'data_room',
    icon: 'Database',
    logoUrl: 'https://www.datasite.com/themes/custom/datasite/images/datasite-logo.svg',
    scopes: ['project:read', 'document:read'],
  },
];

// ─── SOURCES PROVENANT DES CONNECTORS (Mock) ────────────────────────────────

export const CONNECTOR_SOURCES: Source[] = [
  // Google Drive sources
  {
    id: 'cs1',
    title: 'Data Room - Financial Model v2.xlsx',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: '1A2B3C4D5E',
    excerpt: 'Financial model with ARR projections 2025-2028, updated Feb 2026',
    publishedAt: '2026-02-15',
    author: 'CFO Office',
    reliabilityScore: 95,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-04T10:00:00Z',
    content: 'Financial model including:\n- Revenue projections\n- EBITDA margins\n- Cash flow analysis\n- DCF valuation',
  },
  {
    id: 'cs2',
    title: 'Pitch Deck v3.pdf',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: '2B3C4D5E6F',
    excerpt: 'Management presentation for Series C fundraising',
    publishedAt: '2026-01-20',
    author: 'CEO',
    reliabilityScore: 88,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-04T10:00:00Z',
  },
  // Capital IQ sources
  {
    id: 'cs3',
    title: 'Comparable Analysis - SaaS B2B 2025',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CIQ-78342',
    excerpt: 'Trading comps for 45 SaaS B2B companies, median EV/ARR: 6.2x',
    publishedAt: '2026-02-28',
    author: 'Capital IQ Research',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-03T14:30:00Z',
    url: 'https://capitaliq.com/comps/78342',
  },
  {
    id: 'cs4',
    title: 'Precedent Transactions - Retail Tech 2024-2025',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CIQ-78915',
    excerpt: '12 M&A transactions in retail tech, median premium: 28%',
    publishedAt: '2026-02-15',
    author: 'Capital IQ M&A',
    reliabilityScore: 94,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-03T14:30:00Z',
    url: 'https://capitaliq.com/ma/78915',
  },
  // Intralinks sources
  {
    id: 'cs5',
    title: 'Legal Due Diligence Index',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'IL-45621',
    excerpt: 'Index of all legal documents in the data room',
    publishedAt: '2026-03-01',
    author: 'Legal Team',
    reliabilityScore: 98,
    syncStatus: 'syncing',
    lastSyncAt: '2026-03-04T09:15:00Z',
  },
  {
    id: 'cs6',
    title: 'Management Q&A Session 3 - Transcript',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'IL-45689',
    excerpt: 'Third management Q&A session covering technical architecture',
    publishedAt: '2026-02-25',
    author: 'Deal Team',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-04T08:00:00Z',
    content: 'Full transcript of the management Q&A session...',
  },
  // PitchBook sources
  {
    id: 'cs7',
    title: 'Retail Analytics Market Map 2026',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PB-12345',
    excerpt: 'Landscape analysis of 89 companies in retail analytics space',
    publishedAt: '2026-02-10',
    author: 'PitchBook Data',
    reliabilityScore: 85,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-02T11:00:00Z',
    url: 'https://pitchbook.com/profiles/retail-analytics-2026',
  },
];

// ─── CONNECTED CONNECTORS (mock - IDs des connectors connectés) ──────────────

export const CONNECTED_CONNECTORS: string[] = ['google_drive', 'capitaliq'];

// ─── ANALYSIS MATRIX ─────────────────────────────────────────────────────────

import { MatrixScope } from '@/types/matrix';

// Matrix Scopes — Define research scope for matrix analysis
export const MATRIX_SCOPES: MatrixScope[] = [
  {
    id: 'scope-n1a',
    nodeId: 'n1a', // Market Size & Growth
    scopePrompt: 'SaaS analytics market size and growth projections 2024-2028',
    discoveredSourceIds: ['s2', 's6', 's4'], // Gartner, IDC, Les Echos
    createdBy: 'u1',
    createdAt: '2025-01-10T09:30:00Z',
    updatedAt: '2025-01-10T09:30:00Z',
    discoveryStatus: 'validated',
  },
];

// Matrix Columns — Questions/prompts applied to all sources in scope
export const MATRIX_COLUMNS: MatrixColumn[] = [
  // ===== SCOPE N1A — Market Size & Growth =====

  // Summary column (auto-generated)
  {
    id: 'col-n1a-synthese',
    matrixScopeId: 'scope-n1a',
    label: 'Summary',
    prompt: 'Summarize key points from this document regarding market size and growth',
    type: 'text',
    order: 0,
    isSystemGenerated: true,
    createdBy: 'system',
    createdAt: '2025-01-10T09:30:00Z',
  },

  // TAM/SAM/SOM column
  {
    id: 'col-n1a-tam',
    matrixScopeId: 'scope-n1a',
    label: 'TAM / SAM / SOM',
    prompt: 'Extract market size figures: TAM (Total Addressable Market), SAM (Serviceable Addressable Market), SOM (Serviceable Obtainable Market)',
    type: 'text',
    order: 1,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:35:00Z',
  },

  // CAGR column
  {
    id: 'col-n1a-cagr',
    matrixScopeId: 'scope-n1a',
    label: 'CAGR 2024-2028',
    prompt: 'Extract the expected compound annual growth rate (CAGR) for the period 2024-2028',
    type: 'text',
    order: 2,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:36:00Z',
  },

  // Growth Drivers column
  {
    id: 'col-n1a-drivers',
    matrixScopeId: 'scope-n1a',
    label: 'Growth Drivers',
    prompt: 'List the main market growth drivers mentioned',
    type: 'list',
    order: 3,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:37:00Z',
  },

  // Forecast 2028 column
  {
    id: 'col-n1a-forecast',
    matrixScopeId: 'scope-n1a',
    label: 'Forecast 2028',
    prompt: 'Extract the market size projection for 2028',
    type: 'text',
    order: 4,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:38:00Z',
  },
];

// Matrix Cells — Individual cell values for the matrix grid
export const MATRIX_CELLS: MatrixCell[] = [
  // ===== GARTNER REPORT (s2) =====

  // Summary
  {
    id: 'cell-s2-synthese',
    columnId: 'col-n1a-synthese',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: 'Gartner forecasts strong growth in the SaaS analytics market, driven by increased adoption of cloud-native solutions and the rise of generative AI. The market is segmented into 3 categories: descriptive analytics (45% of market), predictive analytics (35%), and prescriptive analytics (20%). All-in-one platforms are gaining share against point solutions.',
    status: 'done',
    generatedAt: '2025-01-10T09:31:00Z',
  },

  // TAM/SAM/SOM
  {
    id: 'cell-s2-tam',
    columnId: 'col-n1a-tam',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '• TAM: $47.2B (global SaaS analytics market)\n• SAM: $12.3B (Europe mid-market segment)\n• SOM: $850M (DataSense addressable market)',
    status: 'done',
    generatedAt: '2025-01-10T09:35:00Z',
  },

  // CAGR
  {
    id: 'cell-s2-cagr',
    columnId: 'col-n1a-cagr',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '18.7% CAGR (2024-2028)\n\nVariation by segment:\n• Descriptive: 14.2%\n• Predictive: 22.5%\n• Prescriptive: 25.1%',
    status: 'done',
    generatedAt: '2025-01-10T09:36:00Z',
  },

  // Drivers
  {
    id: 'cell-s2-drivers',
    columnId: 'col-n1a-drivers',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '1. Generative AI adoption (+40% adoption in 2024)\n2. Cloud migration (85% enterprises in 2025)\n3. Self-service analytics demand\n4. Data stack consolidation\n5. Data privacy regulations (GDPR, etc.)',
    status: 'done',
    generatedAt: '2025-01-10T09:37:00Z',
  },

  // Forecast 2028
  {
    id: 'cell-s2-forecast',
    columnId: 'col-n1a-forecast',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '$89.4B in 2028\n\nBy region:\n• North America: $38.2B (43%)\n• Europe: $27.1B (30%)\n• APAC: $18.7B (21%)\n• RoW: $5.4B (6%)',
    status: 'done',
    generatedAt: '2025-01-10T09:38:00Z',
  },

  // ===== IDC STUDY (s6) =====

  // Synthèse
  {
    id: 'cell-s6-synthese',
    columnId: 'col-n1a-synthese',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: 'IDC emphasizes market transformation toward embedded analytics and data democratization solutions. SMEs represent 58% of future growth. The European market outperforms thanks to data sovereignty investments. IDC identifies 3 adoption waves: early adopters (15%), mainstream (60%), laggards (25%).',
    status: 'done',
    generatedAt: '2025-01-10T09:31:30Z',
  },

  // TAM/SAM/SOM
  {
    id: 'cell-s6-tam',
    columnId: 'col-n1a-tam',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '• TAM: $52.8B (IDC includes adjacent markets)\n• SAM: $14.7B (Europe mid-market + SMBs)\n• SOM: $920M (French + Benelux focus)',
    status: 'done',
    generatedAt: '2025-01-10T09:35:30Z',
  },

  // CAGR
  {
    id: 'cell-s6-cagr',
    columnId: 'col-n1a-cagr',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '21.3% CAGR (2024-2028)\n\nBy deployment type:\n• Public cloud: 23.8%\n• Private cloud: 18.2%\n• Hybrid: 19.5%\n\nIDC more optimistic than Gartner on Europe.',
    status: 'done',
    generatedAt: '2025-01-10T09:36:30Z',
  },

  // Drivers
  {
    id: 'cell-s6-drivers',
    columnId: 'col-n1a-drivers',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '1. Data sovereignty & compliance (Europe focus)\n2. Embedded analytics in vertical SaaS\n3. Citizen data scientists (+150% in 2024)\n4. Real-time analytics demand\n5. Data infrastructure investments',
    status: 'done',
    generatedAt: '2025-01-10T09:37:30Z',
  },

  // Forecast 2028
  {
    id: 'cell-s6-forecast',
    columnId: 'col-n1a-forecast',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '$106.7B in 2028\n\nBy segment:\n• Enterprise (>1000 emp): $64.2B (60%)\n• Mid-market (100-1000): $32.0B (30%)\n• SMB (<100): $10.5B (10%)\n\nEurope: $32.8B (+21.5% CAGR)',
    status: 'done',
    generatedAt: '2025-01-10T09:38:30Z',
  },

  // ===== LES ECHOS ARTICLE (s4) =====

  // Synthèse
  {
    id: 'cell-s4-synthese',
    columnId: 'col-n1a-synthese',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: 'Les Echos highlights the exceptional dynamics of the French SaaS analytics market with 3 emerging unicorns (Contentsquare, Dataiku, Spendesk adjacents). The French market represents 18% of the European market. Focus on digital sovereignty issues and the Cloud Act. VC investments in analytics startups have increased by 340% since 2020.',
    status: 'done',
    generatedAt: '2025-01-10T09:32:00Z',
  },

  // TAM/SAM/SOM
  {
    id: 'cell-s4-tam',
    columnId: 'col-n1a-tam',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '• TAM France: $5.9B (2024)\n• SAM (French SMEs): $2.1B\n• SOM DataSense: $180M (8.5% of French SAM)\n\nNote: Figures extrapolated from Eurostat and INSEE data.',
    status: 'done',
    generatedAt: '2025-01-10T09:35:45Z',
  },

  // CAGR
  {
    id: 'cell-s4-cagr',
    columnId: 'col-n1a-cagr',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '24.2% CAGR (2024-2028) for France\n\nThe French market outperforms the European average (+2.7pts) thanks to:\n• French Tech initiatives\n• Public data investments\n• Rapid AI adoption',
    status: 'done',
    generatedAt: '2025-01-10T09:36:45Z',
  },

  // Drivers
  {
    id: 'cell-s4-drivers',
    columnId: 'col-n1a-drivers',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '1. Digital sovereignty (Trusted Cloud)\n2. France 2030 Plan (€2.5B data/AI)\n3. SME digitalization (80% underway)\n4. ESG standards and data reporting\n5. Data talent shortage → SaaS adoption',
    status: 'done',
    generatedAt: '2025-01-10T09:37:45Z',
  },

  // Forecast 2028
  {
    id: 'cell-s4-forecast',
    columnId: 'col-n1a-forecast',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '$14.2B in 2028 for France\n\nSectoral growth:\n• Financial services: $4.1B\n• Retail/eCommerce: $3.2B\n• Manufacturing: $2.8B\n• Healthcare: $1.9B\n• Other: $2.2B',
    status: 'done',
    generatedAt: '2025-01-10T09:38:45Z',
  },
];

// TODO: Create mock MatrixScope data for testing
/*
export const MATRIX_COLUMNS_OLD: MatrixColumn[] = [
  {
    id: 'mc1',
    matrixScopeId: 'ms1', // NOTE: was nodeId: 'n1',
    label: '3-sentence summary',
    prompt: 'Summarize this document in exactly 3 key sentences regarding the addressable market and growth dynamics.',
    type: 'text',
    order: 0,
    createdBy: 'u1',
    createdAt: '2026-03-08T09:00:00Z',
  },
  {
    id: 'mc2',
    nodeId: 'n1',
    label: 'Market size',
    prompt: 'What is the mentioned market size (TAM, SAM or SOM)? Indicate the exact figure, reference year and source if specified.',
    type: 'number',
    order: 1,
    createdBy: 'u1',
    createdAt: '2026-03-08T09:05:00Z',
  },
  {
    id: 'mc3',
    nodeId: 'n1',
    label: 'Risques macros',
    prompt: 'List the 2-3 macro-economic or sectoral risks explicitly mentioned in this document.',
    type: 'list',
    order: 2,
    createdBy: 'u2',
    createdAt: '2026-03-08T10:00:00Z',
    aiSuggested: true,
  },
  // Node n2 — Compétition & Positionnement
  {
    id: 'mc4',
    nodeId: 'n2',
    label: 'Mentioned competitors',
    prompt: 'List all direct competitors mentioned in this document with their positioning.',
    type: 'list',
    order: 0,
    createdBy: 'u2',
    createdAt: '2026-03-09T11:00:00Z',
  },
  {
    id: 'mc5',
    nodeId: 'n2',
    label: 'Market share',
    prompt: 'What market share is attributed to DataSense or its main competitors in this document?',
    type: 'text',
    order: 1,
    createdBy: 'u1',
    createdAt: '2026-03-09T11:15:00Z',
  },
];
*/

// Old MATRIX_CELLS also commented out
/*
export const MATRIX_CELLS_OLD: MatrixCell[] = [
  // n1a × s2 (DS Financial Model) × mc1 (Summary)
  {
    id: 'mce1',
    columnId: 'mc1',
    sourceId: 's2',
    nodeId: 'n1',
    value: 'DataSense operates in a fast-growing retail analytics SaaS market estimated at €14.2M ARR in 2025. Organic growth is driven by adoption from mid-market retailers (250-2,500 points of sale) seeking to reduce their dependence on legacy ERP. The subscription business model generates a structural NRR above 118%.',
    status: 'done',
    generatedAt: '2026-03-08T09:30:00Z',
    hypothesisId: 'h1',
  },
  // n1a × s2 × mc2 (Market size)
  {
    id: 'mce2',
    columnId: 'mc2',
    sourceId: 's2',
    nodeId: 'n1',
    value: '€14,2M ARR (2025) — SAM Europe retail analytics',
    status: 'done',
    generatedAt: '2026-03-08T09:31:00Z',
  },
  // n1a × s2 × mc3 (Risques macros)
  {
    id: 'mce3',
    columnId: 'mc3',
    sourceId: 's2',
    nodeId: 'n1',
    value: '1. Sensitivity to retail spending cycles\n2. Pressure on IT budgets in an inflationary context\n3. Dependency on ERP integrations (SAP, Oracle)',
    status: 'done',
    generatedAt: '2026-03-08T09:32:00Z',
  },
  // n1a × s6 (Gartner) × mc1
  {
    id: 'mce4',
    columnId: 'mc1',
    sourceId: 's6',
    nodeId: 'n1',
    value: 'The global retail analytics market will reach $8.4B in 2028 with a 22.3% CAGR according to Gartner. The fastest-growing segments are predictive inventory analytics and dynamic pricing optimization. Specialized mid-market players are capturing a growing share against generalist ERP suites.',
    status: 'done',
    generatedAt: '2026-03-08T09:35:00Z',
  },
  // n1a × s6 × mc2
  {
    id: 'mce5',
    columnId: 'mc2',
    sourceId: 's6',
    nodeId: 'n1',
    value: '$8.4B in 2028 (global retail analytics TAM, CAGR 22.3%)',
    status: 'done',
    generatedAt: '2026-03-08T09:36:00Z',
  },
  // n1a × s6 × mc3
  {
    id: 'mce6',
    columnId: 'mc3',
    sourceId: 's6',
    nodeId: 'n1',
    value: '1. Western Europe consumption slowdown\n2. Market consolidation by major players (SAP, Oracle)',
    status: 'done',
    generatedAt: '2026-03-08T09:37:00Z',
  },
  // n1a × s4 (Les Echos) × mc1
  {
    id: 'mce7',
    columnId: 'mc1',
    sourceId: 's4',
    nodeId: 'n1',
    value: 'The article highlights the acceleration of French retailers\' digitalization post-COVID with +34% investments in analytics tools in 2024. DataSense is cited among the 5 players to watch in the French retail SaaS space. The "composable retail stack" trend favors specialized solutions versus integrated suites.',
    status: 'done',
    generatedAt: '2026-03-08T09:40:00Z',
  },
  // n1a × s4 × mc2 — idle (not generated yet)
  {
    id: 'mce8',
    columnId: 'mc2',
    sourceId: 's4',
    nodeId: 'n1',
    value: null,
    status: 'idle',
  },
  // n1a × s4 × mc3
  {
    id: 'mce9',
    columnId: 'mc3',
    sourceId: 's4',
    nodeId: 'n1',
    value: '1. End of post-COVID subsidies for retailers\n2. Price war in retail sector',
    status: 'done',
    generatedAt: '2026-03-08T09:41:00Z',
  },
];
*/

// Mock cell values for generating new cells (simulates LLM output)
export const MOCK_CELL_VALUES: Record<string, Record<string, string>> = {
  // mc1 (3-sentence summary) — generic
  mc1: {
    default: 'This document provides an in-depth analysis of the target market segment. The data presented confirms the structural growth thesis with solid indicators. The 3-5 year outlook remains favorable despite identified macroeconomic pressures.',
  },
  mc2: {
    default: 'Market figure not explicitly mentioned in this document.',
  },
  mc3: {
    default: '1. Global macroeconomic uncertainty\n2. Increased regulatory pressure\n3. Intensification of competition',
  },
  mc4: {
    default: 'Identified competitors: Qlik Sense, MicroStrategy, Tableau (Salesforce), Looker (Google). Varied positioning between generalist and retail-specialized solutions.',
  },
  mc5: {
    default: 'Market share not specified in this document. Relative share indicators suggest a challenger position.',
  },
};

// AI column suggestions per node type
export const AI_SUGGESTIONS: Record<string, Array<{ label: string; prompt: string; type: 'text' | 'number' | 'boolean' | 'list' }>> = {
  n1: [
    { label: 'Mentioned CAGR', prompt: 'What is the compound annual growth rate (CAGR) mentioned for the market or segment? Provide the exact figure and reference period.', type: 'number' },
    { label: 'Market segments', prompt: 'What market segments or verticals are identified as most promising in this document?', type: 'list' },
    { label: 'Mentioned geographies', prompt: 'Which geographies or regions are mentioned as priority markets?', type: 'list' },
    { label: 'Key trends', prompt: 'What are the 2-3 structural trends impacting this market according to this document?', type: 'list' },
  ],
  n2: [
    { label: 'Mentioned differentiators', prompt: 'What are the competitive differentiators highlighted by the mentioned players?', type: 'list' },
    { label: 'Market consolidation', prompt: 'Are there mentions of mergers, acquisitions or consolidation in this segment?', type: 'text' },
    { label: 'Growth drivers', prompt: 'What are the main growth drivers identified in this document?', type: 'list' },
  ],
  n3: [
    { label: 'Mentioned NRR / NDR', prompt: 'Is the Net Revenue Retention (NRR) or Net Dollar Retention (NDR) mentioned? Provide the exact figure.', type: 'number' },
    { label: 'Churn rate', prompt: 'Is the churn rate (logo or revenue) indicated? Provide the figure and period.', type: 'number' },
    { label: 'Expansion metrics', prompt: 'What customer expansion metrics are cited (upsell, cross-sell, expansion MRR)?', type: 'text' },
  ],
  n4: [
    { label: 'ACV / ARR par client', prompt: 'What is the average annual value per customer (ACV or average ARR) mentioned?', type: 'number' },
    { label: 'LTV / CAC ratio', prompt: 'Is the LTV/CAC ratio or customer acquisition costs mentioned?', type: 'text' },
    { label: 'Pricing structure', prompt: 'How is pricing structured (per seat, per module, per usage) according to this document?', type: 'text' },
  ],
  default: [
    { label: 'Executive summary', prompt: 'Summarize this document in 2-3 key sentences for a C-level decision maker.', type: 'text' },
    { label: 'Key figures', prompt: 'What are the 3 most important figures or metrics cited in this document?', type: 'list' },
    { label: 'Identified risks', prompt: 'What risks or points of attention are mentioned in this document?', type: 'list' },
  ],
};
