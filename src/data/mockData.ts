import { Project, WorkstreamNode, Source, ResearchSynthesis, Hypothesis, HypothesisSource, Alert, ActivityLog, ConnectorConfig, MatrixColumn, MatrixCell } from '@/types';
import { GENERATED_SOURCES } from './generatedSources';

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Revolut — Tiger Global Market Segmentation Analysis',
    client: 'Revolut Ltd',
    acquirer: 'Tiger Global / Softbank',
    status: 'in_progress',
    template: 'saas_b2b',
    deadline: '2026-03-28',
    createdAt: '2026-02-10',
    updatedAt: '2026-03-03',
    members: ['u1', 'u2', 'u3'],
    managerId: 'u1',
    description: 'Strategic commercial due diligence on Revolut payment processing market segmentation. Analyzing SMB, Mid-market, and Enterprise segment dynamics for Tiger Global / Softbank growth investment.',
    sector: 'Fintech / Payment Processing',
    dealSize: '€28B-€35B',
  },
];

// ─── SOURCES ─────────────────────────────────────────────────────────────────

export const SOURCES: Source[] = [
  {
    id: 's1',
    title: 'Bloomberg — European Fintech Payment Volumes by Segment 2025',
    category: 'api',
    fileType: 'csv',
    fileName: 'Bloomberg_European_Fintech_Payment_Volumes_2025.csv',
    publishedAt: '2026-01-20',
    author: 'Bloomberg Intelligence',
    excerpt: 'European payment processing volumes by business segment: SMB €850B (18% CAGR), Mid-market €850B (14% CAGR), Enterprise €1.1T (9% CAGR). Total addressable market €2.8T.',
    reliabilityScore: 95,
    content: `BLOOMBERG INTELLIGENCE - EUROPEAN FINTECH PAYMENT VOLUMES 2025

EXECUTIVE SUMMARY

Total European Payment Processing Market: €2.8T (2025)
Projected 2028: €3.9T (12% CAGR 2025-2028)

MARKET SEGMENTATION BY BUSINESS SIZE

SMB Segment (businesses <50 employees):
- Payment Volume 2025: €850B
- Merchant Count: 8.2M businesses
- CAGR 2025-2028: 18%
- Take Rate Average: 2.1%
- Revenue Opportunity: €17.9B

Mid-Market Segment (50-500 employees):
- Payment Volume 2025: €850B
- Merchant Count: 450K businesses
- CAGR 2025-2028: 14%
- Take Rate Average: 1.8%
- Revenue Opportunity: €15.3B

Enterprise Segment (>500 employees):
- Payment Volume 2025: €1.1T
- Merchant Count: 12K businesses
- CAGR 2025-2028: 9%
- Take Rate Average: 0.9%
- Revenue Opportunity: €9.9B

REGIONAL BREAKDOWN

Western Europe (UK, FR, DE, NL, BE): €1.8T (64%)
Southern Europe (ES, IT, PT, GR): €520B (19%)
Northern Europe (SE, NO, DK, FI): €340B (12%)
Eastern Europe (PL, CZ, RO): €140B (5%)

KEY PAYMENT TRENDS

Digital Payment Penetration:
- SMB: 67% of volume (vs 54% in 2023)
- Mid-market: 78% of volume (vs 69% in 2023)
- Enterprise: 82% of volume (vs 76% in 2023)

Payment Methods Mix:
- Card payments: 52%
- Bank transfers: 28%
- Digital wallets: 15%
- Other methods: 5%`,
  },
  {
    id: 's2',
    title: 'CapitalIQ — Fintech Payment Processor Valuations Q1 2026',
    category: 'api',
    fileType: 'xlsx',
    fileName: 'CapitalIQ_Fintech_Valuations_Q1_2026.xlsx',
    publishedAt: '2026-02-15',
    author: 'CapitalIQ / S&P Global',
    excerpt: 'Fintech payment processor valuation multiples: Stripe 8.2x revenue, Adyen 11.5x, Square 6.8x, FIS 4.8x. Multi-segment players command 1.8x premium vs single-segment focus. Revolut estimated blended multiple 9.5x.',
    reliabilityScore: 93,
    content: `CAPITALIQ FINTECH PAYMENT PROCESSOR VALUATIONS - Q1 2026

MARKET OVERVIEW

Public Fintech Payment Processors - Valuation Multiples
(EV / LTM Revenue as of Feb 2026)

TOP-TIER MULTI-SEGMENT PLAYERS

Stripe (Private, est.):
- Revenue Multiple: 8.2x
- Segment Mix: 45% SMB, 35% Mid-market, 20% Enterprise
- NRR: 115%
- Growth Rate: 32% YoY

Adyen NV (AMS: ADYEN):
- Revenue Multiple: 11.5x
- Segment Mix: 25% SMB, 40% Mid-market, 35% Enterprise
- NRR: 122%
- Growth Rate: 28% YoY
- Geographic: Global reach, strong in Europe

Square (NYSE: SQ):
- Revenue Multiple: 6.8x
- Segment Focus: 85% SMB, 15% Mid-market
- NRR: 108%
- Growth Rate: 18% YoY

MID-TIER SPECIALISTS

Wise (LON: WISE):
- Revenue Multiple: 7.3x
- Segment Focus: 70% SMB, 25% Mid-market, 5% Consumer
- NRR: 112%
- Cross-border specialist

PayPal Holdings (NASDAQ: PYPL):
- Revenue Multiple: 5.2x
- Declining growth (8% YoY), consumer focus

LEGACY PAYMENT PROCESSORS

FIS (NYSE: FIS):
- Revenue Multiple: 4.8x
- Enterprise-focused, slower growth (6%)
- Legacy technology stack

Worldpay (Private):
- Revenue Multiple: 5.5x
- Enterprise-heavy, traditional processor

KEY VALUATION DRIVERS

Multi-Segment Premium:
- Players serving 2+ segments: +1.8x multiple
- Rationale: Diversified revenue, cross-sell opportunities
- Example: Stripe vs Square (+1.4x difference)

NRR Impact:
- +0.6x multiple per 10% NRR above 105% median

Growth Rate Premium:
- +0.5x multiple per 10% growth above 15% median

Geographic Diversification:
- +0.4x for true pan-European presence

REVOLUT POSITIONING ANALYSIS

Estimated Metrics:
- Segment Mix: 30% SMB, 40% Mid-market, 30% Enterprise
- NRR (estimated): 118%
- Growth Rate: 35% YoY
- Geographic: Strong UK/EU, expanding globally

Blended Valuation Multiple: 9.5x
- Base multiple: 7.5x (median fintech)
- Multi-segment premium: +1.8x
- NRR premium: +0.8x
- Growth premium: +1.0x
- Minus: Regulatory uncertainty (-0.6x)

Comparable Range: 8.2x - 11.5x (Stripe to Adyen)`,
  },
  {
    id: 's3',
    title: 'Revolut — Data Room — Financial Model & Unit Economics FY2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-FIN-2025',
    fileType: 'xlsx',
    fileName: 'Revolut_Financial_Model_FY2025.xlsx',
    publishedAt: '2026-01-25',
    author: 'Revolut CFO',
    excerpt: 'Total payment volume €450B across 948K merchants. Segment breakdown: SMB 30% volume (850K merchants, LTV/CAC 8.2x), Mid-market 40% (95K merchants, LTV/CAC 6.1x), Enterprise 30% (2.4K merchants, LTV/CAC 3.8x).',
    reliabilityScore: 95,
    content: `REVOLUT FINANCIAL MODEL - FISCAL YEAR 2025

EXECUTIVE SUMMARY

Total Payment Volume: €450B (FY2025)
Total Merchants: 948,400
YoY Growth: 42%
Revenue: €4.2B (+38% YoY)

SEGMENT BREAKDOWN - PAYMENT VOLUME

SMB Segment (<50 employees):
- Payment Volume: €135B (30% of total)
- Merchant Count: 850,000 (89.6% of total)
- Average Volume per Merchant: €159K/year
- Take Rate: 2.1%
- Segment Revenue: €2.84B

Mid-Market Segment (50-500 employees):
- Payment Volume: €180B (40% of total)
- Merchant Count: 95,000 (10.0% of total)
- Average Volume per Merchant: €1.89M/year
- Take Rate: 1.8%
- Segment Revenue: €3.24B

Enterprise Segment (>500 employees):
- Payment Volume: €135B (30% of total)
- Merchant Count: 2,400 (0.3% of total)
- Average Volume per Merchant: €56.3M/year
- Take Rate: 0.9%
- Segment Revenue: €1.22B

UNIT ECONOMICS BY SEGMENT

SMB Segment:
- Customer Acquisition Cost (CAC): €185
- Lifetime Value (LTV): €1,520
- LTV/CAC Ratio: 8.2x
- Gross Margin: 78%
- Payback Period: 4.5 months
- Annual Churn: 12%
- Net Revenue Retention (NRR): 124%

Mid-Market Segment:
- Customer Acquisition Cost (CAC): €2,850
- Lifetime Value (LTV): €17,400
- LTV/CAC Ratio: 6.1x
- Gross Margin: 74%
- Payback Period: 7.2 months
- Annual Churn: 8%
- Net Revenue Retention (NRR): 128%

Enterprise Segment:
- Customer Acquisition Cost (CAC): €48,500
- Lifetime Value (LTV): €184,300
- LTV/CAC Ratio: 3.8x
- Gross Margin: 68%
- Payback Period: 14.8 months
- Annual Churn: 5%
- Net Revenue Retention (NRR): 118%

COHORT PERFORMANCE

2022 Cohort (3-year):
- SMB: 124% NRR, 36% churn (cumulative)
- Mid-market: 145% NRR, 18% churn
- Enterprise: 132% NRR, 12% churn

2023 Cohort (2-year):
- SMB: 118% NRR, 22% churn
- Mid-market: 135% NRR, 14% churn
- Enterprise: 125% NRR, 9% churn

2024 Cohort (1-year):
- SMB: 112% NRR, 12% churn
- Mid-market: 122% NRR, 8% churn
- Enterprise: 118% NRR, 5% churn

SEGMENT MIGRATION PATTERNS

SMB → Mid-Market:
- Annual migration rate: 2.8%
- Migration volume: 23,800 merchants (2025)
- Successful migrations show 41% higher LTV

Mid-Market → Enterprise:
- Annual migration rate: 1.2%
- Migration volume: 1,140 merchants (2025)
- Revenue expansion: average 3.2x within 18 months

KEY STRATEGIC INSIGHTS

1. SMB segment has highest volume growth (48% YoY) but highest churn
2. Mid-market shows best balanced economics (volume growth 38%, strong NRR)
3. Enterprise growth slower (18%) but most stable retention
4. Cross-segment migration creates 35% higher customer lifetime value`,
  },
  {
    id: 's4',
    title: 'Pitchbook — European Fintech M&A Precedent Transactions 2024-2025',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Pitchbook_European_Fintech_MA_Precedents_2025.pdf',
    publishedAt: '2026-02-10',
    author: 'Pitchbook Data',
    excerpt: 'Multi-segment fintech M&A analysis (n=18 deals): median EV/Revenue 7.2x. Multi-segment players (serving 2+ business sizes) command 1.8x premium vs single-segment specialists. Revolut comparable range 8.5x-10.2x.',
    reliabilityScore: 90,
    content: `PITCHBOOK - EUROPEAN FINTECH M&A PRECEDENT TRANSACTIONS

MARKET OVERVIEW (2024-2025)

Total Transactions: 18 deals
Median Multiple: 7.2x LTM Revenue
Range: 4.5x - 11.8x
Total Deal Value: €42B

MULTI-SEGMENT PREMIUM ANALYSIS

Single-Segment Focused Players:
- Median Multiple: 6.1x
- Examples: SMB-only, Enterprise-only specialists
- Lower revenue diversification
- Higher customer concentration risk

Multi-Segment Players (2+ segments):
- Median Multiple: 10.9x (+1.8x vs single-segment)
- Examples: Stripe, Adyen, Wise
- Revenue diversification benefit
- Cross-sell opportunities valued at +65% premium

NOTABLE TRANSACTIONS

Stripe (Series I, Est. 2024):
- Valuation: $70B (€65B)
- Multiple: 8.2x LTM revenue
- Segment Mix: 45% SMB, 35% Mid, 20% Enterprise
- Strategic Rationale: Multi-segment dominance

Adyen (Secondary Market, 2025):
- Multiple: 11.5x revenue
- Segment Mix: 25% SMB, 40% Mid, 35% Enterprise
- Premium drivers: Global reach, enterprise strength

Sumup (PE Buyout, 2024):
- Multiple: 5.8x revenue
- Segment: 95% SMB only
- Discount: Single-segment concentration

Mollie (Strategic Sale, 2024):
- Multiple: 9.2x revenue
- Segment Mix: 60% SMB, 35% Mid, 5% Enterprise
- Premium: Strong SMB + Mid migration

REVOLUT COMPARABLE ANALYSIS

Estimated Positioning:
- Segment Mix: 30% SMB, 40% Mid-market, 30% Enterprise
- Multi-segment premium applies: Yes
- Geographic diversification: Strong (UK, EU, expanding)
- Growth rate: 35% YoY (vs 22% median)

Comparable Range: 8.5x - 10.2x
- Base case: 9.2x (75th percentile multi-segment)
- Bull case: 10.2x (growth + geographic premium)
- Bear case: 8.5x (regulatory discount)

KEY VALUATION DRIVERS

Multi-Segment Mix: +1.8x multiple
NRR >115%: +0.8x
Growth >30%: +1.0x
Geographic reach: +0.5x
Regulatory clarity: -0.3x to -0.6x

IMPLIED REVOLUT VALUATION

At 9.2x multiple on €4.2B revenue: €38.6B
Range: €35.7B (bear) to €42.8B (bull)`,
  },
  {
    id: 's5',
    title: 'McKinsey — European Payment Market Segmentation Analysis 2025',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'McKinsey_European_Payments_Segmentation_2025.pdf',
    publishedAt: '2025-11-15',
    author: 'McKinsey Digital Payments Practice',
    excerpt: 'European payment market TAM €2.8T segmented by business size. SMB segment growing 16% CAGR (highest), Mid-market 12% (best margins), Enterprise 8% (consolidating). Multi-segment players capture 34% market share despite being 8% of providers.',
    reliabilityScore: 88,
    content: `MCKINSEY & COMPANY - EUROPEAN PAYMENT MARKET SEGMENTATION

EXECUTIVE SUMMARY

The European payment processing market is undergoing structural transformation driven by digitalization, regulatory change (PSD2, PSD3), and merchant sophistication. Market segmentation by business size reveals distinct growth trajectories, margin profiles, and competitive dynamics.

TAM BY SEGMENT (2025)

Total Addressable Market: €2.8T
- SMB (<50 employees): €850B (30% of market)
- Mid-Market (50-500): €850B (30%)
- Enterprise (>500): €1.1T (39%)

SAM BY SEGMENT (Serviceable Addressable Market)

SMB Segment:
- Total merchants: 8.2M
- Addressable (digital-ready): 5.5M (67%)
- SAM: €567B
- Penetration opportunity: High (fragmented)

Mid-Market Segment:
- Total merchants: 450K
- Addressable (digital-ready): 360K (80%)
- SAM: €680B
- Penetration opportunity: Medium (consolidating)

Enterprise Segment:
- Total merchants: 12K
- Addressable (digital-native): 9.8K (82%)
- SAM: €902B
- Penetration opportunity: Low (mature)

GROWTH RATES (CAGR 2025-2028)

SMB: 16% CAGR
- Drivers: Digital adoption, e-commerce growth, gig economy
- Headwinds: High churn, price sensitivity

Mid-Market: 12% CAGR
- Drivers: Omnichannel expansion, international growth
- Headwinds: Competitive intensity

Enterprise: 8% CAGR
- Drivers: Volume growth, new payment methods
- Headwinds: Take rate compression, commoditization

MARGIN ANALYSIS

Average Gross Margins:
- SMB: 76% (highest, but higher servicing cost)
- Mid-Market: 72% (optimal balance)
- Enterprise: 65% (volume play, lower take rates)

Operating Margins at Scale:
- SMB: 22% (CAC amortization challenge)
- Mid-Market: 28% (best unit economics)
- Enterprise: 18% (customization overhead)

MULTI-SEGMENT STRATEGY ADVANTAGE

Market Share Analysis:
- Single-segment providers: 66% of market, 92% of providers
- Multi-segment providers: 34% of market, 8% of providers

Value Creation:
- Cross-sell rate: 35% higher for multi-segment
- Customer lifetime value: +65% (segment migration)
- Valuation multiple: +1.8x premium

STRATEGIC IMPLICATIONS

1. SMB: Volume play, requires operational excellence
2. Mid-Market: Sweet spot for margin and growth balance
3. Enterprise: Requires dedicated sales and customization
4. Multi-segment: Highest value creation, but execution complexity`,
  },
  {
    id: 's6',
    title: 'BCG — Multi-Segment Fintech Strategy Playbook 2025',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'BCG_MultiSegment_Fintech_Strategies_2025.pdf',
    publishedAt: '2025-12-10',
    author: 'BCG Corporate Finance & Strategy',
    excerpt: 'Multi-segment fintech strategies deliver 35% higher customer LTV through cross-selling and segment migration. SMB-to-Mid-market migration rate of 41% observed at best-in-class players (Revolut, Stripe). Enterprise requires dedicated approach.',
    reliabilityScore: 87,
    content: `BCG - MULTI-SEGMENT FINTECH STRATEGY PLAYBOOK 2025

STRATEGY OVERVIEW

Multi-segment fintech strategy involves serving multiple business size segments with tailored value propositions while enabling seamless customer migration across segments as businesses grow.

SEGMENT MIGRATION ECONOMICS

SMB → Mid-Market Migration:
- Industry average migration rate: 18% annually
- Best-in-class (Revolut, Stripe): 41% annually
- Revenue impact: 3.2x increase in payment volume per merchant
- LTV increase: 65% higher than SMB-only retention

Mid-Market → Enterprise Migration:
- Industry average migration rate: 8% annually
- Best-in-class: 12% annually
- Revenue impact: 8.5x volume increase
- Requires: Dedicated account management, customization

Migration Failure Modes:
- Poor product-market fit in new segment: 45% churn
- Pricing discontinuity: 32% churn
- Feature gaps: 28% churn

CROSS-SELL ECONOMICS

Single-Segment Players:
- Product attach rate: 1.8 products/customer
- Annual revenue per customer: €2,400

Multi-Segment Players:
- Product attach rate: 3.2 products/customer (+78%)
- Annual revenue per customer: €4,200 (+75%)
- LTV increase: 35% higher

Cross-Sell Patterns:
- Payments → Business accounts: 62% attach
- Business accounts → Corporate cards: 45% attach
- Corporate cards → Treasury management: 28% attach (Mid/Enterprise only)

SEGMENT-SPECIFIC REQUIREMENTS

SMB Segment:
- Go-to-market: Digital self-service, low-touch
- Product: Standardized, fast onboarding (<10 min)
- Pricing: Transparent, percentage-based
- Support: Automated, community-driven

Mid-Market Segment:
- Go-to-market: Inside sales + self-service hybrid
- Product: Configurable workflows, API access
- Pricing: Volume-based tiers, negotiable
- Support: Dedicated account manager (1:150 ratio)

Enterprise Segment:
- Go-to-market: Field sales, RFP process
- Product: Customizable, white-label options
- Pricing: Bespoke contracts, multi-year commitments
- Support: Strategic account team (1:25 ratio)

BEST PRACTICE: REVOLUT CASE STUDY

Segment Mix (2025):
- SMB: 30% of volume (89.6% of merchants)
- Mid-market: 40% of volume (10% of merchants)
- Enterprise: 30% of volume (0.4% of merchants)

Migration Performance:
- SMB → Mid: 41% annual migration (industry-leading)
- Merchant lifetime: 6.2 years (vs 3.8 industry avg)
- Cross-sell rate: 3.4 products/merchant

Success Factors:
1. Unified platform (no segment silos)
2. Proactive migration triggers (volume thresholds)
3. Graduated pricing that incentivizes growth
4. Feature unlocks as merchants grow

STRATEGIC IMPLICATIONS

1. Multi-segment = higher valuation (1.8x premium)
2. Migration infrastructure critical (not just acquisition)
3. Balanced portfolio prevents over-concentration risk
4. Requires operational complexity management`,
  },
  {
    id: 's7',
    title: 'Gartner — Payment Processing Magic Quadrant 2025',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Gartner_Payment_Processing_Magic_Quadrant_2025.pdf',
    publishedAt: '2025-10-20',
    author: 'Gartner Financial Services Research',
    excerpt: 'European payment processor competitive landscape. Revolut positioned as Visionary with strong SMB/Mid-market execution (win rate 67-81% vs incumbents) but limited Enterprise penetration (23% win rate vs Adyen, FIS).',
    reliabilityScore: 86,
    content: `GARTNER MAGIC QUADRANT - PAYMENT PROCESSING 2025

MARKET DEFINITION

Payment processing platforms enable merchants to accept, process, and manage digital payments across channels (online, in-store, mobile). Evaluation based on: completeness of vision and ability to execute.

QUADRANT POSITIONING

LEADERS:
- Adyen: Strong enterprise execution, global reach
- Stripe: Developer-first, SMB/Mid-market dominance
- Square: SMB specialist, integrated ecosystem

CHALLENGERS:
- FIS/Worldpay: Enterprise legacy, slow innovation
- PayPal: Scale but declining relevance

VISIONARIES:
- Revolut: Multi-segment strategy, rapid innovation, regulatory challenges
- Wise: Cross-border specialist, SMB focus

NICHE PLAYERS:
- Mollie, Sumup, PayU: Regional/segment specialists

REVOLUT DETAILED ASSESSMENT

Strengths:
1. Multi-segment platform (SMB, Mid, Enterprise)
2. Rapid feature velocity (28 releases in 2025)
3. Strong SMB/Mid-market win rates
4. Integrated financial services (payments + banking)
5. Consumer-to-business network effects

Weaknesses:
1. Limited Enterprise traction (23% win rate)
2. Regulatory uncertainty (UK, EU banking licenses)
3. Feature complexity creating UX challenges
4. Limited legacy system integration (vs FIS, Worldpay)

WIN/LOSS ANALYSIS BY SEGMENT

SMB Segment (<50 employees):
- Win rate vs Square: 67%
- Win rate vs Stripe: 45%
- Win rate vs PayPal: 81%
- Primary win factors: Price, ease of use, integrated banking

Mid-Market Segment (50-500 employees):
- Win rate vs Stripe: 52%
- Win rate vs Adyen: 38%
- Win rate vs Traditional processors: 74%
- Primary win factors: Multi-currency, API flexibility

Enterprise Segment (>500 employees):
- Win rate vs Adyen: 23%
- Win rate vs FIS: 28%
- Win rate vs Stripe: 34%
- Primary loss factors: Limited enterprise support, customization constraints

CUSTOMER SATISFACTION (2025 SURVEY)

SMB Merchants (n=2,400):
- Overall satisfaction: 4.2/5
- NPS: 68
- Top-rated: Pricing transparency, onboarding speed
- Pain points: Limited phone support

Mid-Market Merchants (n=850):
- Overall satisfaction: 3.9/5
- NPS: 58
- Top-rated: API documentation, multi-currency
- Pain points: Account manager inconsistency

Enterprise Merchants (n=120):
- Overall satisfaction: 3.4/5
- NPS: 42
- Top-rated: Innovation velocity
- Pain points: Limited customization, SLA concerns

STRATEGIC RECOMMENDATIONS FOR REVOLUT

1. Enterprise Investment: Dedicated sales team, customization capabilities
2. Regulatory Clarity: Accelerate licensing, compliance infrastructure
3. Support Scaling: Multi-tier support matching segment needs
4. Integration Ecosystem: Partner network for enterprise systems`,
  },
  {
    id: 's8',
    title: 'Revolut — Data Room — Customer Segmentation & Cohort Analysis',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-COHORT-2025',
    fileType: 'xlsx',
    fileName: 'Revolut_Customer_Segmentation_Cohort_Analysis.xlsx',
    publishedAt: '2026-01-25',
    author: 'Revolut Data Analytics Team',
    excerpt: 'Merchant base: 850K SMB (12% annual churn, NRR 124%), 95K mid-market (8% churn, NRR 128%), 2,400 enterprise (5% churn, NRR 118%). Segment migration creates 41% uplift in LTV vs single-segment retention.',
    reliabilityScore: 94,
    content: `REVOLUT - CUSTOMER SEGMENTATION & COHORT ANALYSIS 2025

MERCHANT BASE OVERVIEW

Total Active Merchants: 947,400
- SMB: 850,000 (89.7%)
- Mid-Market: 95,000 (10.0%)
- Enterprise: 2,400 (0.3%)

Annual Growth by Segment:
- SMB: +48% YoY (new merchant acquisition)
- Mid-Market: +32% YoY (SMB migration + new acquisition)
- Enterprise: +18% YoY (Mid migration + direct sales)

SEGMENT CHARACTERISTICS

SMB SEGMENT (850K merchants)

Size Definition: <50 employees, <€10M annual revenue
Average Payment Volume: €159K/year
Average Revenue per Merchant: €3,340/year
Take Rate: 2.1%

Merchant Profile:
- E-commerce: 42%
- Professional services: 28%
- Retail (physical): 18%
- Food & hospitality: 12%

Churn Characteristics:
- Annual churn rate: 12%
- Primary churn reasons: Business closure (48%), competitor switch (32%), price (20%)
- Churn by cohort: Year 1: 18%, Year 2: 10%, Year 3: 7%

Retention Metrics:
- Net Revenue Retention: 124%
- Expansion revenue: +36% from volume growth
- Product attach rate: 2.8 products/merchant
- Average customer lifetime: 4.2 years

MID-MARKET SEGMENT (95K merchants)

Size Definition: 50-500 employees, €10M-€500M revenue
Average Payment Volume: €1.89M/year
Average Revenue per Merchant: €34,020/year
Take Rate: 1.8%

Merchant Profile:
- E-commerce & omnichannel: 52%
- B2B services: 28%
- Retail chains: 15%
- Manufacturing: 5%

Churn Characteristics:
- Annual churn rate: 8%
- Primary churn reasons: Competitor (52%), feature gaps (28%), pricing (20%)
- Churn by cohort: Year 1: 12%, Year 2: 7%, Year 3: 5%

Retention Metrics:
- Net Revenue Retention: 128%
- Expansion revenue: +42% from volume + product attach
- Product attach rate: 3.8 products/merchant
- Average customer lifetime: 5.8 years

ENTERPRISE SEGMENT (2,400 merchants)

Size Definition: >500 employees, >€500M revenue
Average Payment Volume: €56.3M/year
Average Revenue per Merchant: €506,700/year
Take Rate: 0.9%

Merchant Profile:
- Retail & e-commerce: 38%
- Marketplaces & platforms: 32%
- Travel & hospitality: 18%
- Financial services: 12%

Churn Characteristics:
- Annual churn rate: 5%
- Primary churn reasons: Strategic migration (45%), M&A (35%), feature gaps (20%)
- Churn by cohort: Year 1: 8%, Year 2: 4%, Year 3: 3%

Retention Metrics:
- Net Revenue Retention: 118%
- Expansion revenue: +28% from volume growth
- Product attach rate: 4.2 products/merchant
- Average customer lifetime: 7.2 years

SEGMENT MIGRATION ANALYSIS

SMB → Mid-Market Migration:
- Annual migration rate: 2.8% (23,800 merchants in 2025)
- Success rate: 94% (remain after migration)
- Revenue impact: 3.4x increase in annual revenue
- Migration triggers: €1M payment volume threshold, API usage

Mid-Market → Enterprise Migration:
- Annual migration rate: 1.2% (1,140 merchants in 2025)
- Success rate: 88% (12% churn during transition)
- Revenue impact: 8.2x increase in annual revenue
- Migration requirements: Dedicated account manager, SLA upgrade

Migration LTV Impact:
- SMB-only retention: €14,200 LTV
- SMB → Mid migration: €58,400 LTV (+311%)
- Mid → Enterprise migration: €3.2M LTV (+5,500% vs SMB baseline)

COHORT PERFORMANCE SUMMARY

2022 Cohort (3-year maturity):
- SMB: 64% retention, 145% cumulative revenue expansion
- Mid: 82% retention, 168% cumulative revenue expansion
- Enterprise: 88% retention, 152% cumulative revenue expansion

2024 Cohort (1-year):
- SMB: 82% retention, 112% NRR
- Mid: 88% retention, 122% NRR
- Enterprise: 92% retention, 118% NRR

STRATEGIC INSIGHTS

1. Mid-market segment shows optimal balance: growth (32%), NRR (128%), churn (8%)
2. SMB migration to Mid-market creates highest value (311% LTV increase)
3. Enterprise churn lowest (5%) but acquisition most expensive
4. Multi-segment strategy drives 35% higher overall portfolio LTV`,
  },
  {
    id: 's9',
    title: 'Revolut — Data Room — Product-Market Fit Analysis by Segment',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-PMF-2025',
    fileType: 'xlsx',
    fileName: 'Revolut_Product_Market_Fit_Analysis_Segments.xlsx',
    publishedAt: '2026-01-28',
    author: 'Revolut Product Team',
    excerpt: 'Product-market fit assessment by segment: SMB shows strong fit (NPS 68, 94% feature satisfaction), Mid-market good fit (NPS 58, 88% satisfaction), Enterprise requires investment (NPS 42, 72% satisfaction, gaps in customization and SLAs).',
    reliabilityScore: 92,
    content: `REVOLUT - PRODUCT-MARKET FIT ANALYSIS BY SEGMENT

METHODOLOGY

Assessment based on:
- Net Promoter Score (NPS) surveys
- Feature satisfaction surveys (n=12,500 merchants)
- Win/loss interviews (n=850 competitive evaluations)
- Product usage analytics
- Churn analysis and exit interviews

SMB SEGMENT - STRONG PRODUCT-MARKET FIT

Net Promoter Score: 68 (Industry benchmark: 52)
Overall Satisfaction: 4.2/5
Feature Satisfaction: 94%

Top-Rated Features:
1. Onboarding speed (<10 minutes): 96% satisfaction
2. Transparent pricing: 94% satisfaction
3. Mobile app: 93% satisfaction
4. Multi-currency support: 91% satisfaction
5. Integrated business account: 89% satisfaction

Feature Gaps (Low Priority):
- Phone support: 45% satisfaction (not critical for segment)
- Advanced reporting: 62% satisfaction
- Custom integrations: 58% satisfaction

Competitive Positioning:
- Win rate vs Square: 67% (price and integration advantage)
- Win rate vs Stripe: 45% (Stripe stronger developer tools)
- Win rate vs PayPal: 81% (modern UX, better pricing)

Customer Quotes:
"Set up in 8 minutes, saved 40% vs previous provider" (E-commerce, UK)
"Finally understand my fees - no hidden surprises" (Services, DE)

MID-MARKET SEGMENT - GOOD PRODUCT-MARKET FIT

Net Promoter Score: 58 (Industry benchmark: 48)
Overall Satisfaction: 3.9/5
Feature Satisfaction: 88%

Top-Rated Features:
1. API flexibility: 92% satisfaction
2. Multi-currency & FX rates: 91% satisfaction
3. Payment methods coverage: 89% satisfaction
4. Real-time reporting: 87% satisfaction
5. Developer documentation: 85% satisfaction

Feature Gaps (Medium Priority):
- Account manager consistency: 64% satisfaction
- Custom workflows: 68% satisfaction
- Advanced fraud tools: 71% satisfaction
- Reconciliation automation: 73% satisfaction

Competitive Positioning:
- Win rate vs Stripe: 52% (competitive on features)
- Win rate vs Adyen: 38% (Adyen stronger enterprise tools)
- Win rate vs Traditional processors: 74% (modern platform)

Customer Quotes:
"API is excellent, but need better account support" (E-commerce, FR)
"40% fee reduction vs previous processor" (Food delivery, ES)

ENTERPRISE SEGMENT - REQUIRES INVESTMENT

Net Promoter Score: 42 (Industry benchmark: 55) [BELOW BENCHMARK]
Overall Satisfaction: 3.4/5
Feature Satisfaction: 72%

Top-Rated Features:
1. Innovation velocity: 84% satisfaction
2. Global payment methods: 81% satisfaction
3. API performance: 79% satisfaction
4. Multi-currency: 78% satisfaction

Critical Feature Gaps (High Priority):
- Customization capability: 52% satisfaction ⚠️
- SLA commitments: 48% satisfaction ⚠️
- Dedicated support: 55% satisfaction ⚠️
- Legacy system integration: 42% satisfaction ⚠️
- White-label options: 38% satisfaction ⚠️
- Enterprise reporting: 61% satisfaction

Competitive Positioning:
- Win rate vs Adyen: 23% (Adyen dominates enterprise)
- Win rate vs FIS/Worldpay: 28% (legacy integration advantage)
- Win rate vs Stripe: 34% (Stripe stronger customization)

Customer Quotes:
"Great platform, but needs enterprise-grade SLAs" (Retail chain, UK)
"Limited customization vs Adyen" (Marketplace, NL)
"Fast innovation but inconsistent enterprise support" (Travel, DE)

PRODUCT INVESTMENT PRIORITIES

Immediate (Q1-Q2 2026):
1. Enterprise SLA framework (99.95% uptime commitment)
2. Dedicated enterprise support tier (1:25 account ratio)
3. Advanced reconciliation automation
4. Custom workflow builder (Mid-market + Enterprise)

Near-term (Q3-Q4 2026):
5. Legacy ERP integration package (SAP, Oracle)
6. White-label payment gateway option
7. Enhanced fraud detection (ML-based)
8. Enterprise reporting suite

Long-term (2027):
9. Industry-specific solutions (retail, travel, marketplace)
10. Advanced treasury management
11. Embedded finance platform

SEGMENT ALIGNMENT SUMMARY

✅ SMB: Strong product-market fit, maintain leadership
✅ Mid-Market: Good fit, optimize account management
⚠️ Enterprise: Investment required to achieve fit`,
  },
  {
    id: 's10',
    title: 'Revolut — Data Room — Competitive Win/Loss Analysis 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-WINLOSS-2025',
    fileType: 'xlsx',
    fileName: 'Revolut_Competitive_WinLoss_Analysis_2025.xlsx',
    publishedAt: '2026-02-05',
    author: 'Revolut Sales Operations',
    excerpt: 'Competitive win/loss analysis across 1,850 evaluations. SMB: 67-81% win rates (strong vs PayPal, Square; competitive vs Stripe). Mid-market: 38-74% (strong vs legacy). Enterprise: 23-34% (weak vs Adyen, FIS, limited customization cited in 68% of losses).',
    reliabilityScore: 91,
    content: `REVOLUT - COMPETITIVE WIN/LOSS ANALYSIS 2025

METHODOLOGY

Sample: 1,850 competitive evaluations (2025)
- SMB: 1,280 evaluations
- Mid-Market: 480 evaluations
- Enterprise: 90 evaluations

Data sources:
- Sales CRM win/loss tracking
- Post-decision customer interviews (n=425)
- Competitive intelligence platform
- Churned customer surveys (n=280)

SMB SEGMENT WIN/LOSS ANALYSIS

Overall Win Rate: 72%

vs Square:
- Win Rate: 67%
- Primary win factors: Integrated banking (82%), Better FX rates (78%), Modern UX (74%)
- Primary loss factors: Square's ecosystem lock-in (45%), POS integration (32%)
- Deal cycle: 8 days average

vs Stripe:
- Win Rate: 45%
- Primary win factors: Price (88%), Ease of use (76%), Banking integration (72%)
- Primary loss factors: Developer tools (68%), API documentation (52%), Brand preference (45%)
- Deal cycle: 12 days average

vs PayPal:
- Win Rate: 81%
- Primary win factors: Lower fees (92%), Modern platform (84%), Multi-currency (76%)
- Primary loss factors: PayPal brand trust (35%), Buyer-side network (28%)
- Deal cycle: 6 days average

vs Sumup:
- Win Rate: 74%
- Primary win factors: Feature richness (86%), Global reach (72%)
- Primary loss factors: Local market presence (42%), Hardware bundling (35%)

SMB Loss Reasons Summary:
1. Stripe developer ecosystem: 28%
2. Square POS integration: 18%
3. Incumbent inertia: 15%
4. PayPal buyer trust: 12%
5. Price (rarely, 8%)

MID-MARKET SEGMENT WIN/LOSS ANALYSIS

Overall Win Rate: 58%

vs Stripe:
- Win Rate: 52%
- Primary win factors: Pricing (85%), FX rates (82%), Account management (68%)
- Primary loss factors: Customization (72%), Integration ecosystem (65%), Brand

 preference (48%)
- Deal cycle: 28 days average

vs Adyen:
- Win Rate: 38%
- Primary win factors: Price (88%), Onboarding speed (75%)
- Primary loss factors: Enterprise features (82%), Customization (76%), Brand reputation (68%)
- Deal cycle: 45 days average

vs Traditional Processors (FIS, Worldpay):
- Win Rate: 74%
- Primary win factors: Modern platform (94%), Better UX (89%), Transparent pricing (86%)
- Primary loss factors: Legacy integration (52%), Risk aversion (42%)
- Deal cycle: 35 days average

Mid-Market Loss Reasons Summary:
1. Customization limitations: 32%
2. Integration ecosystem: 24%
3. Brand/trust concerns: 18%
4. Feature gaps: 14%
5. Enterprise features: 12%

ENTERPRISE SEGMENT WIN/LOSS ANALYSIS

Overall Win Rate: 28% [BELOW TARGET]

vs Adyen:
- Win Rate: 23%
- Primary win factors: Innovation (78%), Price (65%)
- Primary loss factors: Customization (92%), Enterprise SLAs (88%), Support model (82%)
- Deal cycle: 90 days average

vs FIS/Worldpay:
- Win Rate: 28%
- Primary win factors: Modern platform (86%), API quality (78%)
- Primary loss factors: Legacy integration (78%), Migration risk (72%), Contract flexibility (65%)
- Deal cycle: 120 days average

vs Stripe:
- Win Rate: 34%
- Primary win factors: Pricing (72%), FX rates (68%)
- Primary loss factors: Customization (76%), Developer ecosystem (68%), Enterprise features (64%)
- Deal cycle: 75 days average

Enterprise Loss Reasons Summary:
1. Customization limitations: 38%
2. SLA/support concerns: 30%
3. Legacy integration: 18%
4. Risk/brand concerns: 10%
5. Feature gaps: 4%

COMPETITIVE INTELLIGENCE INSIGHTS

Revolut Strengths (Across Segments):
1. Pricing transparency and competitiveness (mentioned in 86% of wins)
2. Multi-currency and FX rates (82%)
3. Modern, intuitive UX (78%)
4. Integrated banking features (76%)
5. Fast onboarding (72%)

Revolut Weaknesses (Across Segments):
1. Enterprise customization (mentioned in 68% of Enterprise losses)
2. Integration ecosystem breadth (52% Mid/Enterprise losses)
3. Enterprise-grade SLAs (48% Enterprise losses)
4. Account management consistency (38% Mid-market losses)
5. Brand trust vs incumbents (32% across segments)

STRATEGIC RECOMMENDATIONS

SMB: Maintain leadership
- Continue pricing advantage
- Enhance Stripe developer experience comparison
- Expand payment method coverage

Mid-Market: Close the gap
- Improve customization options
- Strengthen account management (hire 45 AMs)
- Build integration marketplace

Enterprise: Major investment required
- Develop enterprise SLA framework (99.95%+ uptime)
- Build customization platform
- Create dedicated enterprise sales team (25+ reps)
- Develop white-label capabilities
- Enhance legacy system integrations`,
  },
  {
    id: 's11',
    title: 'Revolut — Data Room — Geographic Expansion Roadmap 2026-2028',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-GEO-2025',
    fileType: 'xlsx',
    fileName: 'Revolut_Geographic_Expansion_Roadmap.xlsx',
    publishedAt: '2026-01-30',
    author: 'Revolut Strategy & Expansion Team',
    excerpt: 'Geographic expansion plan prioritizes DACH region for SMB penetration (2.1M addressable merchants), France/Spain for mid-market growth (85K addressable), and UK/Nordics for enterprise consolidation. Incremental TAM: €12B across priority markets.',
    reliabilityScore: 88,
    content: `REVOLUT - GEOGRAPHIC EXPANSION ROADMAP 2026-2028

MARKET PRIORITIZATION FRAMEWORK

Scoring Criteria:
- Market size (30%)
- Segment alignment (25%)
- Regulatory environment (20%)
- Competitive intensity (15%)
- Go-to-market efficiency (10%)

PRIORITY TIER 1: DACH REGION (DE, AT, CH)

Target Segment: SMB
Addressable Market:
- Total SMBs: 2.1M businesses
- Current penetration: 4%
- Addressable merchants: 1.8M
- Payment volume TAM: €185B
- Revenue opportunity: €3.9B (at 2.1% take rate)

Market Characteristics:
- High digital payment adoption (72%)
- Fragmented SMB processor market
- Strong preference for local providers (challenge)
- Regulatory: EU passporting available (advantage)

Entry Strategy:
- Phase 1 (Q2 2026): Germany launch, Berlin hub
- Phase 2 (Q4 2026): Austria expansion
- Phase 3 (Q2 2027): Switzerland (requires separate license)

Key Success Factors:
- German language support (critical)
- SEPA optimization
- Local payment methods (Giropay, Sofort)
- Partnership with German business associations

Investment: €15M (2026-2027)
Payback: 18 months
Projected Penetration (2028): 8% market share

PRIORITY TIER 1: FRANCE + SPAIN

Target Segment: Mid-Market
Addressable Market:
- Total Mid-Market: 85K businesses (FR: 55K, ES: 30K)
- Current penetration: 6%
- Addressable merchants: 72K
- Payment volume TAM: €142B
- Revenue opportunity: €2.6B (at 1.8% take rate)

Market Characteristics:
- Growing e-commerce adoption
- Mid-market segment underserved
- Strong incumbent presence (Worldline, Santander)
- Regulatory: EU passporting applies

Entry Strategy:
- Phase 1 (Q3 2026): France expansion (Paris office)
- Phase 2 (Q1 2027): Spain launch (Barcelona/Madrid)

Key Success Factors:
- French/Spanish language support
- Local acquiring licenses (France complete, Spain in progress)
- Mid-market sales team (hire 25 account executives)
- Local payment methods (Cartes Bancaires, Bizum)

Investment: €22M (2026-2027)
Payback: 22 months
Projected Penetration (2028): 12% Mid-market share

PRIORITY TIER 2: NORDICS (SE, NO, DK, FI)

Target Segment: Enterprise + Mid-Market
Addressable Market:
- Total Enterprise: 1,200 businesses
- Total Mid-Market: 18K businesses
- Payment volume TAM: €95B
- Revenue opportunity: €1.2B

Market Characteristics:
- Highest digital adoption globally (88%)
- Sophisticated enterprise buyers
- Strong local champions (Nets, Bambora)
- Regulatory: EEA passporting

Entry Strategy:
- Phase 1 (Q4 2026): Sweden launch (Stockholm office)
- Phase 2 (Q2 2027): Norway, Denmark
- Phase 3 (Q4 2027): Finland

Investment: €18M
Projected Penetration (2028): 15% Mid-market, 8% Enterprise

PRIORITY TIER 3: SOUTHERN EUROPE (IT, PT, GR)

Target Segment: SMB
Addressable Market:
- Payment volume TAM: €88B
- Revenue opportunity: €1.8B

Entry Timeline: 2028+
Current Priority: Low (focus resources on Tier 1/2)

CONSOLIDATION MARKETS: UK + IRELAND

Current Position: Market leader in SMB (18% share)
Strategy: Enterprise penetration
Addressable Enterprise: 3,500 businesses
Revenue opportunity: €2.4B (incremental)

Investment: €12M (dedicated enterprise sales, 2026-2027)

TOTAL INCREMENTAL OPPORTUNITY (2026-2028)

Priority Markets Revenue Potential:
- DACH (SMB): €3.9B
- FR/ES (Mid-market): €2.6B
- Nordics (Mid+Enterprise): €1.2B
- UK Enterprise: €2.4B
- Total: €12.1B incremental revenue opportunity

RESOURCE ALLOCATION

Total Investment: €67M (2026-2027)
- Go-to-market: €42M (sales, marketing)
- Product localization: €15M
- Regulatory & compliance: €10M

Expected Returns:
- 2027: €1.8B revenue (+43% from expansion)
- 2028: €3.2B revenue (+76% from expansion)
- ROI: 4.8x (2028)

KEY RISKS

1. Regulatory delays (Switzerland, post-Brexit UK challenges)
2. Local incumbent resistance
3. Currency volatility (non-EUR markets)
4. Talent acquisition in local markets`,
  },
  {
    id: 's12',
    title: 'Expert Interview — CFO Deliveroo (Mid-Market User)',
    category: 'interview',
    publishedAt: '2026-02-12',
    author: 'Tiger Global Due Diligence Team',
    excerpt: 'Deliveroo CFO interview on Revolut Business usage. Migrated from PayPal in 2024, processing €45M annually across 8 markets. Highlights: 40% fee reduction, excellent multi-currency handling, fast onboarding. Concerns: occasional account manager turnover, need for better API rate limits.',
    reliabilityScore: 75,
    content: `EXPERT INTERVIEW - DELIVEROO CFO
Date: February 12, 2026
Interviewee: Jane Mitchell, CFO Deliveroo
Company Profile: Food delivery platform, 12K merchants, €450M GMV
Segment: Mid-Market
Interview Duration: 45 minutes

COMPANY BACKGROUND

Deliveroo Payment Processing Needs:
- Annual payment volume: €45M (2025)
- Geographic presence: 8 European markets
- Payment complexity: Multi-currency, high transaction volume
- Previous provider: PayPal Business (2019-2024)

MIGRATION TO REVOLUT (Q2 2024)

Decision Drivers:
1. Cost reduction (primary): 40% fee savings vs PayPal
   - PayPal: 2.9% + €0.30 per transaction
   - Revolut: 1.8% flat (negotiated volume-based pricing)
   - Annual savings: €580K

2. Multi-currency optimization:
   - Operating in 8 currencies (GBP, EUR, SEK, DKK, NOK, PLN, CHF, AED)
   - PayPal FX spreads: 3.5-4.5%
   - Revolut FX spreads: 0.5-1.2%
   - FX savings: €180K annually

3. Banking integration:
   - Unified platform for payments + business banking
   - Real-time settlement to Revolut business account
   - Eliminated reconciliation complexity

Migration Experience:
- Timeline: 6 weeks (evaluation to full migration)
- Onboarding: "Surprisingly smooth, 2 weeks vs 8 weeks with PayPal"
- API integration: "Well-documented, our devs liked it"
- Data migration: Handled by Revolut team
- Downtime: Zero (parallel run for 1 week)

USAGE EXPERIENCE (18 months)

Positive Aspects:

1. Cost Performance (Rating: 5/5):
   "40% reduction materialized exactly as projected. No hidden fees, very transparent."

2. Multi-Currency (Rating: 5/5):
   "Game-changer for us. Managing 8 currencies seamlessly. Real-time FX rates, transparent spreads."

3. API Quality (Rating: 4/5):
   "API is solid. Documentation clear. Webhook reliability good. Rate limits occasionally tight during peak hours."

4. Reporting (Rating: 4/5):
   "Real-time dashboards helpful. Export functionality good. Would like more custom report builders."

5. Settlement Speed (Rating: 5/5):
   "T+1 settlement vs T+3 with PayPal. Cash flow improvement significant."

Negative Aspects:

1. Account Management (Rating: 3/5):
   "Had 3 different account managers in 18 months. Relationship resets frustrating. Current AM is good, but consistency would help."

2. Support Response Time (Rating: 3/5):
   "Email support can be slow (12-24 hours). For mid-market, would prefer phone support option for urgent issues."

3. API Rate Limits (Rating: 3/5):
   "Occasional issues during peak lunch/dinner hours. Had to optimize our polling frequency. Would pay for higher tier."

4. Customization (Rating: 3/5):
   "Platform works well out-of-box, but limited customization vs PayPal's enterprise options. Not critical for us yet."

COMPETITIVE COMPARISON

Revolut vs PayPal:
- Cost: Revolut wins decisively (40% cheaper)
- Multi-currency: Revolut superior
- Brand trust: PayPal still ahead with merchants
- Features: Comparable for our needs
- Support: PayPal slightly better (phone support)

Revolut vs Stripe (considered but didn't choose):
- Pricing: Revolut 15% cheaper for our volume
- Developer tools: Stripe perceived as better
- Banking integration: Revolut unique advantage
- Decision: Cost and banking integration won

FUTURE OUTLOOK

Expansion Plans:
- Currently: €45M annual volume
- 2026 projection: €62M (+38%)
- Would likely stay with Revolut unless major issues

Wish List:
1. Dedicated account manager (guaranteed, not rotated)
2. Phone support tier for mid-market
3. Higher API rate limits
4. More advanced fraud detection tools
5. Better invoice reconciliation automation

Recommendation:
"Would recommend Revolut to other mid-market companies, especially those with multi-currency needs. The cost savings alone justified the switch. Just be aware you won't get white-glove enterprise support."

NPS Score: 8/10 (Promoter)

INTERVIEWER OBSERVATIONS

Jane was transparent and balanced. Company is happy overall but has realistic expectations. The 40% cost reduction is substantial and verifiable. Multi-currency handling is clearly a differentiator. Account manager churn seems to be a pattern (corroborates other feedback). Company is in growth phase and likely to expand volume, creating expansion revenue for Revolut.`,
  },
  {
    id: 's13',
    title: 'Expert Interview — VP Payments Auto1 Group (Enterprise Evaluation)',
    category: 'interview',
    publishedAt: '2026-02-18',
    author: 'Tiger Global Due Diligence Team',
    excerpt: 'Auto1 Group VP Payments interview on Revolut enterprise evaluation. Considered Revolut for €180M annual payment processing but selected Adyen. Decision factors: Adyen customization superior, enterprise SLAs critical, white-label requirements. Revolut pricing 25% better but feature gaps decisive.',
    reliabilityScore: 72,
    content: `EXPERT INTERVIEW - AUTO1 GROUP VP PAYMENTS
Date: February 18, 2026
Interviewee: Thomas Weber, VP Payments & Treasury
Company Profile: Used car marketplace, €2.8B GMV, 14 countries
Segment: Enterprise
Interview Duration: 50 minutes

COMPANY BACKGROUND

Auto1 Payment Processing Needs:
- Annual payment volume: €180M (B2B and B2C)
- Geographic presence: 14 European countries
- Transaction complexity: High-value (avg €18K), cross-border
- Current provider: Worldpay (since 2018, contract expiring Q3 2026)

RFP PROCESS (Q4 2025 - Q1 2026)

Vendors Evaluated:
1. Adyen (selected)
2. Revolut Business
3. Stripe
4. FIS/Worldpay (incumbent, considered for renewal)

Evaluation Criteria:
- Customization capability: 25%
- Enterprise SLA & support: 20%
- Pricing: 20%
- Multi-currency & cross-border: 15%
- Integration complexity: 10%
- White-label capability: 10%

REVOLUT EVALUATION

Initial Impression:
"Revolut reached out proactively in November 2025. We were intrigued by their pricing and multi-currency strength. Took the evaluation seriously."

Pricing Proposal:
- Revolut: 1.1% take rate (volume-discounted)
- Adyen: 1.45% take rate
- Pricing advantage: 24% cheaper (€630K annual savings)

Strengths Identified:

1. Pricing (Rating: 5/5):
   "Significantly cheaper than alternatives. 24% below Adyen, 32% below Worldpay renewal offer."

2. Multi-Currency (Rating: 5/5):
   "Operating in 14 countries, FX management critical. Revolut's FX spreads (0.8-1.4%) better than Adyen (1.2-2.1%)."

3. API Quality (Rating: 4/5):
   "API documentation good. Technically sound. Integration would have been straightforward."

4. Innovation Velocity (Rating: 4/5):
   "Impressed by product releases. Felt more innovative than Adyen or Worldpay."

Weaknesses Identified:

1. Customization (Rating: 2/5) [CRITICAL]:
   "This was the deal-breaker. We need custom payment flows for B2B auctions (escrow, delayed settlement, multi-party splits). Revolut platform too rigid. Adyen offers extensive customization through their platform."

2. Enterprise SLAs (Rating: 2/5) [CRITICAL]:
   "Revolut offered 99.9% uptime SLA. We require 99.95% minimum with financial penalties. Adyen committed to 99.98% with per-hour penalties. For €180M volume, downtime risk unacceptable."

3. White-Label (Rating: 1/5) [CRITICAL]:
   "We need white-label payment page for brand consistency. Revolut doesn't offer this. Adyen and Stripe do. Non-negotiable for enterprise."

4. Support Model (Rating: 3/5):
   "Offered dedicated account manager, but no 24/7 phone support. We need round-the-clock support for 14 markets. Adyen provides dedicated enterprise support team."

5. Legacy Integration (Rating: 3/5):
   "We use SAP for ERP. Revolut has no pre-built SAP connector. Would require custom development. Adyen has certified SAP integration."

DECISION RATIONALE

Why Adyen Won:
1. Customization capability (critical differentiator)
2. Enterprise SLAs with penalties (risk mitigation)
3. White-label payment pages (brand requirement)
4. Proven enterprise track record (reference customers)
5. SAP integration (reduced implementation risk)

Why Not Revolut:
"Despite 24% cost advantage, couldn't accept the feature gaps. Revolut is excellent for SMB and mid-market, but not enterprise-ready for our complexity. If they had customization platform and white-label, we'd seriously consider them despite slightly higher risk."

Why Not Stripe:
"Stripe was close second. Better customization than Revolut, but Adyen stronger on multi-currency and European presence. Pricing between Adyen and Revolut."

Why Not Worldpay (incumbent):
"Legacy platform, poor innovation, pricing not competitive. Time to modernize."

ADVICE TO REVOLUT

What Would Change Decision:
1. Enterprise customization platform (workflow builder, custom logic)
2. 99.95%+ SLA with financial penalties
3. White-label capabilities (payment pages, checkout)
4. Dedicated enterprise support (24/7, phone + email)
5. Pre-built ERP integrations (SAP, Oracle, Microsoft Dynamics)

Market Positioning:
"Revolut is crushing it in SMB and doing well in mid-market. But enterprise is different game. Need to decide: chase enterprise or dominate SMB/mid? Can't be everything to everyone."

Future Consideration:
"If Revolut builds enterprise capabilities over next 2-3 years, we'd reconsider at next RFP cycle (2028). The pricing advantage is real and meaningful."

NPS Score: 6/10 (Passive - would consider but didn't choose)

INTERVIEWER OBSERVATIONS

Thomas was professional and analytical. Decision was data-driven, not emotional. The 24% cost difference (€630K savings) was significant but not enough to overcome feature gaps. This validates the pattern: Revolut strong in SMB/mid-market, but enterprise requires substantial product investment. Customization, SLAs, and white-label repeatedly mentioned as "table stakes" for enterprise.`,
  },
  {
    id: 's14',
    title: 'Expert Interview — SMB E-commerce Founder (Strong Advocate)',
    category: 'interview',
    publishedAt: '2026-02-08',
    author: 'Tiger Global Due Diligence Team',
    excerpt: 'E-commerce founder interview (€2.4M annual GMV, apparel). Switched from PayPal to Revolut in 2025. Onboarding 45 minutes, 38% fee reduction, integrated business banking. Strong recommendation (9/10 NPS). Highlights: transparent pricing, modern UX, multi-currency for EU expansion.',
    reliabilityScore: 68,
    content: `EXPERT INTERVIEW - SMB E-COMMERCE FOUNDER
Date: February 8, 2026
Interviewee: Maria Santos, Founder & CEO
Company: Verde Apparel (online sustainable fashion)
Company Profile: €2.4M GMV (2025), 2 employees, operating in UK + expanding EU
Segment: SMB
Interview Duration: 35 minutes

COMPANY BACKGROUND

Verde Apparel Payment History:
- Founded: 2022
- Initial provider: PayPal (2022-2025)
- Current provider: Revolut Business (since June 2025)
- Annual payment volume: €2.4M (2025)
- Transaction count: ~18,500 transactions/year
- Average order value: €130

MIGRATION TO REVOLUT (June 2025)

Discovery Process:
"I saw Revolut ad on Instagram in May 2025. Was frustrated with PayPal fees eating into thin margins (fashion is low-margin). Clicked through, intrigued by pricing. Set up demo call."

Onboarding Experience:
- Demo call: 30 minutes (sales rep explained platform)
- Decision time: 3 days (no-brainer on pricing alone)
- Account setup: 45 minutes total (!!!)
- Integration with Shopify: 20 minutes (plugin install)
- Testing: 1 day (small transaction volumes)
- Full migration: 1 week total

"Honestly couldn't believe how fast it was. PayPal took 2 weeks just for verification. Revolut was same day."

COST COMPARISON

PayPal Pricing (2022-2025):
- Standard rate: 2.9% + €0.30 per transaction
- Monthly cost (€2.4M volume): ~€5,850/month
- Annual cost: €70,200

Revolut Pricing (2025):
- Rate: 1.8% flat (no per-transaction fee)
- Monthly cost: €3,600/month
- Annual cost: €43,200
- **Savings: €27,000/year (38% reduction)**

"€27K is massive for a small business. That's hiring a part-time employee or entire marketing budget for 6 months."

USAGE EXPERIENCE (8 months)

Positive Aspects:

1. Pricing Transparency (Rating: 5/5):
   "With PayPal, fees were confusing. International transactions had hidden FX spreads. Revolut: one clear rate, real FX rates. Know exactly what I'm paying."

2. Integrated Business Banking (Rating: 5/5):
   "Game-changer. Payments settle directly to Revolut business account. Don't need separate bank. Can pay suppliers same day from revenue. Cash flow huge improvement."

3. Multi-Currency (Rating: 5/5):
   "Expanding to France, Germany, Spain this year. Revolut makes multi-currency seamless. Customers pay in EUR, I hold EUR, pay suppliers in EUR. No constant conversions."

4. User Experience (Rating: 5/5):
   "Mobile app is beautiful. Real-time notifications. Dashboard makes sense. PayPal felt from 2010. Revolut feels modern."

5. Shopify Integration (Rating: 4/5):
   "Plugin works perfectly. Automatic reconciliation. Rare issues resolved quickly."

Negative Aspects:

1. Customer Support (Rating: 3/5):
   "Email-only support. Usually respond within 6-8 hours, but sometimes want immediate help. For SMB it's okay, but phone support would be nice for urgent issues (rare)."

2. Chargeback Process (Rating: 3/5):
   "Had 2 chargebacks (fraudulent). Process was okay but felt less merchant-protective than PayPal. Could be clearer."

3. Some Customers Don't Recognize Brand (Rating: 3/5):
   "Small number of customers (mostly 50+) nervous about 'Revolut' on checkout. More familiar with PayPal. Not big issue, maybe 2-3% of inquiries."

COMPETITIVE COMPARISON

Revolut vs PayPal:
- Cost: Revolut massively better (38% cheaper)
- UX: Revolut much better
- Brand trust: PayPal slightly ahead (older customers)
- Banking integration: Revolut unique
- Support: PayPal better (phone support)

Decision: "No-brainer. Saving €27K/year alone worth it. Everything else is bonus."

Revolut vs Stripe (considered):
- Pricing: Revolut slightly cheaper
- Developer focus: Stripe better (not relevant for me)
- Banking integration: Revolut advantage
- Decision: Revolut won on banking integration + price

FUTURE OUTLOOK

Business Growth:
- 2026 projection: €3.8M GMV (+58%)
- Will stay with Revolut unless major issues
- Expansion to 3 more EU countries (Revolut multi-currency perfect fit)

Product Wish List:
- Phone support option (even paid tier)
- Better fraud/chargeback tools
- More Shopify features (one-click upsells, etc.)

Recommendation to Other SMBs:
"Absolutely recommend. If you're small business processing payments, especially multi-currency, Revolut is no-brainer. The savings alone pay for themselves immediately. Modern platform, easy to use, integrated banking is huge."

NPS Score: 9/10 (Strong Promoter)

Word-of-Mouth:
"I've recommended Revolut to 5 other small business owners in my network. 3 have switched already. The 38% savings resonates with everyone."

INTERVIEWER OBSERVATIONS

Maria is enthusiastic advocate. €27K savings is significant for €2.4M business (1.1% of GMV). The 45-minute onboarding story is powerful (vs weeks for incumbents). Multi-currency capabilities align perfectly with European expansion plans. Support concerns are real but not deal-breakers for SMB segment. This profile represents Revolut's sweet spot: digitally-savvy SMB owner, European reach needs, price-sensitive, values modern UX.`,
  },
  {
    id: 's15',
    title: 'TechCrunch — Revolut Business SMB Strategy Accelerating in Europe',
    category: 'web',
    publishedAt: '2026-01-22',
    author: 'Mike Butcher, TechCrunch Europe',
    excerpt: 'Revolut capturing 18% market share of new SMB merchant accounts in UK, accelerating mid-market push with 95K businesses. Multi-segment strategy creating network effects, consumer-to-business flywheel cited as competitive moat vs Stripe, Wise.',
    reliabilityScore: 62,
    content: `TECHCRUNCH - Revolut Business SMB Strategy Accelerating

Published: January 22, 2026
Author: Mike Butcher, Editor-at-Large TechCrunch Europe

Revolut Business, the payment processing arm of UK fintech giant Revolut, is rapidly gaining market share in the European SMB segment while simultaneously pushing upmarket into mid-market and enterprise accounts. The multi-segment strategy is creating unique network effects that traditional payment processors struggle to replicate.

SMB DOMINANCE IN UK

According to industry data, Revolut now captures approximately 18% market share of new SMB merchant account signups in the UK, second only to Square's 22%. This represents dramatic growth from just 8% share in 2023.

"Revolut has absolutely nailed the SMB value proposition," says Sarah Jenkins, fintech analyst at GP Bullhound. "Transparent pricing, integrated business banking, and multi-currency capabilities resonate with modern European SMBs, especially those operating cross-border."

The company's integrated approach - combining payment processing with business banking, corporate cards, and expense management - creates natural cross-sell opportunities that pure-play payment processors like Stripe cannot easily replicate.

MID-MARKET ACCELERATION

While SMB remains the volume driver (850K merchants), Revolut is aggressively expanding in mid-market with 95,000 businesses now using the platform, up from 62,000 in 2024 (+54% growth).

"The mid-market is where Revolut can achieve optimal unit economics," notes James Morrison, partner at Index Ventures. "These businesses have higher payment volumes than SMBs but don't require the custom enterprise features that are expensive to build. It's the sweet spot."

Revolut's mid-market win rate against Stripe has reportedly improved to 52%, up from 38% in 2024, driven primarily by pricing advantages and stronger multi-currency handling.

ENTERPRISE CHALLENGES

Enterprise remains Revolut's Achilles heel. While the company has signed 2,400 enterprise merchants, win rates against incumbents like Adyen and FIS remain below 30%.

"Enterprise is a different game," says Thomas Weber, VP Payments at Auto1 Group, who recently selected Adyen over Revolut despite a 24% price advantage. "Customization, SLAs, and white-label capabilities are table stakes. Revolut isn't there yet, though their pricing is compelling."

Industry observers suggest Revolut must invest significantly in enterprise capabilities or risk being relegated to SMB/mid-market specialist status.

CONSUMER-TO-BUSINESS FLYWHEEL

Revolut's unique advantage is its consumer user base of 38 million users across Europe. This creates a "consumer-to-business flywheel" where Revolut consumer users become Revolut Business merchants.

"About 35% of new Revolut Business SMB signups are existing Revolut consumer users," says a source familiar with the matter. "This lowers acquisition costs dramatically and creates instant familiarity with the platform."

This network effect is difficult for competitors to replicate. Stripe and Wise don't have significant consumer bases, while Square/Block's consumer app (Cash App) has limited European penetration.

VALUATION IMPLICATIONS

Revolut's multi-segment payment strategy is reportedly driving a valuation premium in ongoing fundraising discussions with Tiger Global and SoftBank. Sources suggest the company is being valued at 9-10x revenue, above typical fintech payment processor multiples of 6-8x.

"Multi-segment fintech players command premiums because they've cracked segment migration and cross-sell," explains Morrison. "Revolut's ability to upgrade SMBs to mid-market and cross-sell banking products creates significantly higher customer lifetime values than single-segment competitors."

LOOKING AHEAD

Revolut is reportedly planning geographic expansion into DACH region (Germany, Austria, Switzerland) targeting SMB segment in 2026, with France and Spain focused on mid-market growth.

The company declined to comment for this article beyond stating: "Revolut Business is experiencing strong momentum across all segments and geographies. We remain focused on delivering the best possible experience for businesses of all sizes."

Whether Revolut can successfully navigate the enterprise market while maintaining SMB dominance remains the key strategic question for 2026 and beyond.`,
  },
  {
    id: 's16',
    title: 'G2 + Trustpilot — Revolut Business Reviews Aggregation',
    category: 'web',
    publishedAt: '2026-02-20',
    author: 'Tiger Global Analysis Team',
    excerpt: 'Review aggregation across G2 (n=1,240 reviews) and Trustpilot (n=3,850 reviews). Ratings by segment: SMB 4.6/5 (price, ease of use praised), Mid-market 4.2/5 (API quality positive, account management mixed), Enterprise 3.8/5 (innovation noted, customization and support concerns).',
    reliabilityScore: 58,
    content: `REVOLUT BUSINESS - USER REVIEWS AGGREGATION ANALYSIS

Data Sources:
- G2.com: 1,240 verified reviews (Jan 2024 - Feb 2026)
- Trustpilot.com: 3,850 reviews (Jan 2024 - Feb 2026)
- Total reviews analyzed: 5,090

OVERALL RATINGS

G2 Overall Rating: 4.3/5 (1,240 reviews)
Trustpilot Overall Rating: 4.2/5 (3,850 reviews)

Segment Breakdown (G2 data):
- SMB (<50 employees): 4.6/5 (820 reviews, 66% of sample)
- Mid-Market (50-500 employees): 4.2/5 (320 reviews, 26%)
- Enterprise (>500 employees): 3.8/5 (100 reviews, 8%)

SENTIMENT ANALYSIS

Positive Themes (mentioned in >40% of reviews):

1. Pricing & Value (mentioned in 78% of reviews):
   - "Transparent pricing" (SMB reviews)
   - "Significant cost savings vs PayPal/Stripe" (all segments)
   - "No hidden fees" (SMB, Mid-market)

2. Ease of Use (mentioned in 72%):
   - "Fast onboarding" (SMB: 88% mention)
   - "Intuitive interface" (all segments)
   - "Modern mobile app" (SMB, Mid-market)

3. Multi-Currency (mentioned in 68%):
   - "Best FX rates" (all segments)
   - "Essential for European business" (SMB, Mid-market)
   - "Seamless multi-currency management" (Mid-market, Enterprise)

4. Banking Integration (mentioned in 65%):
   - "Unified platform" (SMB: 82% positive)
   - "Eliminates need for separate bank account" (SMB)
   - "Real-time settlement" (Mid-market)

5. API Quality (mentioned in 52%, primarily Mid-market):
   - "Well-documented API" (Mid-market, Enterprise)
   - "Reliable webhooks" (Mid-market)

Negative Themes (mentioned in >25% of critical reviews):

1. Customer Support (mentioned in 68% of negative reviews):
   - "Email-only support frustrating" (all segments)
   - "Response times slow (12-24 hours)" (SMB, Mid-market)
   - "Need phone support for urgent issues" (Mid-market: 72%, Enterprise: 88%)

2. Account Manager Turnover (mentioned in 54%, primarily Mid-market):
   - "Went through 3 AMs in 18 months" (Mid-market)
   - "Relationship resets frustrating" (Mid-market, Enterprise)

3. Enterprise Feature Gaps (mentioned in 82% of Enterprise reviews):
   - "Limited customization" (Enterprise: 78%)
   - "No white-label options" (Enterprise: 65%)
   - "SLA concerns" (Enterprise: 58%)

4. Occasional Platform Issues (mentioned in 32%):
   - "Rare API downtime" (Mid-market, Enterprise)
   - "Mobile app bugs occasional" (SMB)

SEGMENT-SPECIFIC INSIGHTS

SMB SEGMENT (4.6/5 average)

Most Common Positive Reviews:
- "Switched from PayPal, saving €1,200/month. Onboarding took 30 minutes!" (4.9/5)
- "Perfect for small e-commerce. Multi-currency is game-changer." (4.8/5)
- "Integrated banking means I don't need separate business account. Love it." (4.7/5)

Most Common Criticisms:
- "Wish they had phone support for when issues arise" (3.8/5)
- "Occasional confusion about fees for certain transaction types" (3.5/5)

Recommendation Rate: 87%

MID-MARKET SEGMENT (4.2/5 average)

Most Common Positive Reviews:
- "API is excellent. Saved 40% vs previous processor." (4.6/5)
- "Multi-currency handling superior to Stripe. FX rates transparent." (4.5/5)
- "Modern platform, good documentation, responsive product team." (4.4/5)

Most Common Criticisms:
- "Account manager changed 3 times. Frustrating for relationship." (3.2/5)
- "Need better reporting tools and custom dashboards." (3.5/5)
- "Support response times too slow for mid-market needs." (3.4/5)

Recommendation Rate: 74%

ENTERPRISE SEGMENT (3.8/5 average)

Most Common Positive Reviews:
- "Innovation velocity impressive. Regular feature releases." (4.2/5)
- "Pricing significantly better than Adyen, but missing some features." (4.0/5)
- "Multi-currency and API quality good." (4.1/5)

Most Common Criticisms:
- "Lacks customization we need for complex workflows. Went with Adyen." (2.8/5)
- "No white-label checkout pages. Deal-breaker for our brand." (2.5/5)
- "SLA only 99.9%. Need 99.95%+ with penalties for enterprise." (3.0/5)
- "Support model not enterprise-ready. Need 24/7 phone support." (3.2/5)

Recommendation Rate: 52%

COMPETITIVE MENTIONS

Revolut vs Stripe (mentioned in 420 reviews):
- Price advantage: Revolut favored (78% mention)
- Developer tools: Stripe favored (65%)
- Banking integration: Revolut unique (88%)

Revolut vs PayPal (mentioned in 650 reviews):
- Cost: Revolut decisively better (92% mention savings)
- Modern platform: Revolut strongly favored (85%)
- Brand trust: PayPal edges (35% mention familiarity)

Revolut vs Adyen (mentioned in 85 reviews, primarily Enterprise):
- Price: Revolut better (all mention)
- Customization: Adyen strongly favored (82%)
- Enterprise features: Adyen favored (76%)

TREND ANALYSIS (2024 vs 2025 vs 2026)

Improving:
- Overall rating: 4.0/5 (2024) → 4.2/5 (2025) → 4.3/5 (2026)
- API quality mentions: Up 28%
- Multi-currency satisfaction: Up 18%

Declining:
- Support satisfaction: Down 12% (volume overwhelming support team)
- Account manager satisfaction: Down 8% (rapid hiring causing turnover)

SUMMARY

Revolut Business shows strong product-market fit in SMB (4.6/5) with pricing, ease of use, and banking integration as key differentiators. Mid-market sentiment is positive (4.2/5) but account management inconsistency is emerging concern. Enterprise sentiment is weakest (3.8/5) with customization, SLAs, and support model cited as gaps versus Adyen and FIS.`,
  },
  {
    id: 's17',
    title: 'Euromonitor — Payment Preferences by Business Size Europe 2025',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Euromonitor_Payment_Preferences_Business_Size_2025.pdf',
    publishedAt: '2025-12-05',
    author: 'Euromonitor International',
    excerpt: 'European business payment preferences by segment. SMB prioritizes price (82% weight) and ease of use (76%), Mid-market values features (72%) and multi-currency (68%), Enterprise demands customization (85%) and SLAs (82%). Payment method preferences vary significantly by segment.',
    reliabilityScore: 82,
  },
  {
    id: 's18',
    title: 'Datasite — M&A Deal Room Analytics for Fintech Transactions 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-2025-FINTECH-Analytics',
    publishedAt: '2026-01-18',
    author: 'Datasite Global Intelligence',
    excerpt: 'Fintech M&A deal room analytics: avg 28 bidders for multi-segment platforms vs 12 for single-segment. Due diligence duration 85 days (multi-segment) vs 62 days (single-segment). Purchase price adjustments average 8% for fintech vs 12% for SaaS generally.',
    reliabilityScore: 85,
  },
  {
    id: 's19',
    title: 'Pitchbook — European Fintech M&A Precedent Transactions 2024-2025',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Pitchbook_European_Fintech_MA_Precedents_2025.pdf',
    publishedAt: '2026-02-10',
    author: 'Pitchbook Data',
    excerpt: 'Multi-segment fintech M&A analysis (n=18 deals): median EV/Revenue 7.2x. Multi-segment players (serving 2+ business sizes) command 1.8x premium vs single-segment specialists. Revolut comparable range 8.5x-10.2x.',
    reliabilityScore: 88,
  },
  // Generated sources s20-s351
  {
    id: 's20',
    title: 'Strategic Plan 2026-2027',
    category: 'data_room',
    publishedAt: '2026-02-02',
    author: 'Investment Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 85,
  },
  {
    id: 's21',
    title: 'Strategic Plan 2024-2025',
    category: 'data_room',
    publishedAt: '2025-10-15',
    author: 'Forrester',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's22',
    title: 'Revenue Breakdown by Region April 2025',
    category: 'data_room',
    publishedAt: '2026-02-03',
    author: 'Moodys Analytics',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 87,
  },
  {
    id: 's23',
    title: 'Customer Analytics Report October 2024',
    category: 'data_room',
    publishedAt: '2026-03-08',
    author: 'Data Analytics Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 90,
  },
  {
    id: 's24',
    title: 'Executive Summary Q2 2025',
    category: 'data_room',
    publishedAt: '2025-06-24',
    author: 'Investment Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 89,
  },
  {
    id: 's25',
    title: 'Revenue Breakdown by Region September 2024',
    category: 'data_room',
    publishedAt: '2026-03-18',
    author: 'Research Department',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 95,
  },
  {
    id: 's26',
    title: 'Revenue Breakdown by Region May 2026',
    category: 'data_room',
    publishedAt: '2025-10-11',
    author: 'Business Development',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 91,
  },
  {
    id: 's27',
    title: 'Revenue Breakdown by Region December 2024',
    category: 'data_room',
    publishedAt: '2025-07-04',
    author: 'Gartner Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 95,
  },
  {
    id: 's28',
    title: 'Customer Churn Analysis September 2024',
    category: 'data_room',
    publishedAt: '2025-10-11',
    author: 'Corporate Strategy',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 87,
  },
  {
    id: 's29',
    title: 'Customer Churn Analysis February 2026',
    category: 'data_room',
    publishedAt: '2025-04-15',
    author: 'SP Global',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 89,
  },
  {
    id: 's30',
    title: 'Due Diligence Package March 2024',
    category: 'data_room',
    publishedAt: '2025-11-15',
    author: 'Investment Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's31',
    title: 'Customer Churn Analysis August 2026',
    category: 'data_room',
    publishedAt: '2025-04-26',
    author: 'Research Department',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 97,
  },
  {
    id: 's32',
    title: 'Customer Churn Analysis April 2025',
    category: 'data_room',
    publishedAt: '2025-07-09',
    author: 'Forrester',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 86,
  },
  {
    id: 's33',
    title: 'Strategic Plan 2025-2026',
    category: 'data_room',
    publishedAt: '2025-10-01',
    author: 'Data Analytics Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 97,
  },
  {
    id: 's34',
    title: 'Financial Statements Q4 2026',
    category: 'data_room',
    publishedAt: '2026-01-22',
    author: 'Data Analytics Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 93,
  },
  {
    id: 's35',
    title: 'Due Diligence Package February 2024',
    category: 'data_room',
    publishedAt: '2025-09-12',
    author: 'McKinsey and Company',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 92,
  },
  {
    id: 's36',
    title: 'Board Meeting Minutes September 2025',
    category: 'data_room',
    publishedAt: '2026-01-23',
    author: 'Industry Analyst',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 97,
  },
  {
    id: 's37',
    title: 'Customer Analytics Report July 2026',
    category: 'data_room',
    publishedAt: '2026-03-22',
    author: 'Gartner Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 85,
  },
  {
    id: 's38',
    title: 'Strategic Plan 2025-2026',
    category: 'data_room',
    publishedAt: '2026-03-25',
    author: 'Due Diligence Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 89,
  },
  {
    id: 's39',
    title: 'Financial Statements Q1 2024',
    category: 'data_room',
    publishedAt: '2025-03-20',
    author: 'Strategic Insights Group',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 85,
  },
  {
    id: 's40',
    title: 'Customer Churn Analysis December 2024',
    category: 'data_room',
    publishedAt: '2026-02-07',
    author: 'Corporate Strategy',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 87,
  },
  {
    id: 's41',
    title: 'Board Meeting Minutes September 2025',
    category: 'data_room',
    publishedAt: '2025-04-09',
    author: 'Gartner Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 93,
  },
  {
    id: 's42',
    title: 'Sales Pipeline Analysis Q4 2025',
    category: 'data_room',
    publishedAt: '2026-02-06',
    author: 'Gartner Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's43',
    title: 'Revenue Breakdown by Region November 2025',
    category: 'data_room',
    publishedAt: '2025-03-10',
    author: 'External Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's44',
    title: 'Financial Statements Q1 2025',
    category: 'data_room',
    publishedAt: '2026-03-10',
    author: 'Moodys Analytics',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 94,
  },
  {
    id: 's45',
    title: 'Executive Summary Q4 2025',
    category: 'data_room',
    publishedAt: '2026-02-16',
    author: 'Market Research Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 89,
  },
  {
    id: 's46',
    title: 'Executive Summary Q1 2025',
    category: 'data_room',
    publishedAt: '2025-10-17',
    author: 'BCG',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 85,
  },
  {
    id: 's47',
    title: 'Due Diligence Package August 2026',
    category: 'data_room',
    publishedAt: '2026-02-18',
    author: 'External Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 89,
  },
  {
    id: 's48',
    title: 'Revenue Breakdown by Region June 2024',
    category: 'data_room',
    publishedAt: '2025-07-04',
    author: 'Financial Analyst',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's49',
    title: 'Product Roadmap 2026-2027',
    category: 'data_room',
    publishedAt: '2026-01-15',
    author: 'SP Global',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 98,
  },
  {
    id: 's50',
    title: 'Strategic Plan 2026-2027',
    category: 'data_room',
    publishedAt: '2025-07-11',
    author: 'Due Diligence Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 87,
  },
  {
    id: 's51',
    title: 'Customer Churn Analysis November 2026',
    category: 'data_room',
    publishedAt: '2026-03-09',
    author: 'Business Development',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 87,
  },
  {
    id: 's52',
    title: 'Strategic Plan 2026-2027',
    category: 'data_room',
    publishedAt: '2025-05-01',
    author: 'Market Research Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's53',
    title: 'Customer Churn Analysis December 2026',
    category: 'data_room',
    publishedAt: '2025-01-02',
    author: 'Research Department',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's54',
    title: 'Financial Statements Q1 2026',
    category: 'data_room',
    publishedAt: '2026-03-25',
    author: 'Strategic Insights Group',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 98,
  },
  {
    id: 's55',
    title: 'Executive Summary Q4 2024',
    category: 'data_room',
    publishedAt: '2026-01-21',
    author: 'Data Analytics Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 95,
  },
  {
    id: 's56',
    title: 'Due Diligence Package November 2025',
    category: 'data_room',
    publishedAt: '2026-02-23',
    author: 'Investment Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 87,
  },
  {
    id: 's57',
    title: 'Product Roadmap 2024-2025',
    category: 'data_room',
    publishedAt: '2026-02-03',
    author: 'Forrester',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 92,
  },
  {
    id: 's58',
    title: 'Sales Pipeline Analysis Q3 2026',
    category: 'data_room',
    publishedAt: '2025-02-07',
    author: 'Financial Analyst',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 91,
  },
  {
    id: 's59',
    title: 'Strategic Plan 2025-2026',
    category: 'data_room',
    publishedAt: '2025-10-06',
    author: 'Financial Analyst',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 98,
  },
  {
    id: 's60',
    title: 'Financial Statements Q3 2026',
    category: 'data_room',
    publishedAt: '2026-02-04',
    author: 'SP Global',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's61',
    title: 'Due Diligence Package March 2026',
    category: 'data_room',
    publishedAt: '2026-02-22',
    author: 'Forrester',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 90,
  },
  {
    id: 's62',
    title: 'Sales Pipeline Analysis Q4 2025',
    category: 'data_room',
    publishedAt: '2025-12-07',
    author: 'Gartner Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 86,
  },
  {
    id: 's63',
    title: 'Customer Analytics Report May 2026',
    category: 'data_room',
    publishedAt: '2026-03-28',
    author: 'Investment Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 95,
  },
  {
    id: 's64',
    title: 'Customer Analytics Report October 2026',
    category: 'data_room',
    publishedAt: '2025-08-08',
    author: 'Gartner Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 90,
  },
  {
    id: 's65',
    title: 'Product Roadmap 2025-2026',
    category: 'data_room',
    publishedAt: '2025-03-14',
    author: 'Market Research Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's66',
    title: 'Executive Summary Q3 2024',
    category: 'data_room',
    publishedAt: '2026-01-15',
    author: 'Financial Analyst',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 93,
  },
  {
    id: 's67',
    title: 'Sales Pipeline Analysis Q2 2026',
    category: 'data_room',
    publishedAt: '2026-02-12',
    author: 'Data Analytics Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 95,
  },
  {
    id: 's68',
    title: 'Board Meeting Minutes March 2026',
    category: 'data_room',
    publishedAt: '2026-01-22',
    author: 'Forrester',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's69',
    title: 'Customer Churn Analysis March 2025',
    category: 'data_room',
    publishedAt: '2026-01-25',
    author: 'Bloomberg Intelligence',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 90,
  },
  {
    id: 's70',
    title: 'Customer Churn Analysis April 2025',
    category: 'data_room',
    publishedAt: '2025-12-17',
    author: 'Market Intelligence',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 90,
  },
  {
    id: 's71',
    title: 'Product Roadmap 2026-2027',
    category: 'data_room',
    publishedAt: '2025-04-18',
    author: 'Due Diligence Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 91,
  },
  {
    id: 's72',
    title: 'Sales Pipeline Analysis Q3 2026',
    category: 'data_room',
    publishedAt: '2025-11-04',
    author: 'Market Intelligence',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's73',
    title: 'Sales Pipeline Analysis Q3 2024',
    category: 'data_room',
    publishedAt: '2026-03-08',
    author: 'Bain and Company',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 86,
  },
  {
    id: 's74',
    title: 'Due Diligence Package November 2025',
    category: 'data_room',
    publishedAt: '2025-07-25',
    author: 'SP Global',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's75',
    title: 'Product Roadmap 2026-2027',
    category: 'data_room',
    publishedAt: '2025-02-24',
    author: 'SP Global',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 95,
  },
  {
    id: 's76',
    title: 'Product Roadmap 2024-2025',
    category: 'data_room',
    publishedAt: '2025-11-10',
    author: 'Bloomberg Intelligence',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's77',
    title: 'Customer Analytics Report July 2024',
    category: 'data_room',
    publishedAt: '2026-02-18',
    author: 'SP Global',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 94,
  },
  {
    id: 's78',
    title: 'Revenue Breakdown by Region August 2026',
    category: 'data_room',
    publishedAt: '2025-12-11',
    author: 'Data Analytics Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's79',
    title: 'Financial Statements Q4 2026',
    category: 'data_room',
    publishedAt: '2026-01-21',
    author: 'Market Research Team',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 94,
  },
  {
    id: 's80',
    title: 'Financial Statements Q3 2025',
    category: 'data_room',
    publishedAt: '2026-03-25',
    author: 'Strategic Insights Group',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 92,
  },
  {
    id: 's81',
    title: 'Board Meeting Minutes June 2025',
    category: 'data_room',
    publishedAt: '2026-03-27',
    author: 'Industry Analyst',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 92,
  },
  {
    id: 's82',
    title: 'Product Roadmap 2024-2025',
    category: 'data_room',
    publishedAt: '2026-03-15',
    author: 'Bloomberg Intelligence',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 87,
  },
  {
    id: 's83',
    title: 'Customer Churn Analysis May 2024',
    category: 'data_room',
    publishedAt: '2026-02-24',
    author: 'Bain and Company',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's84',
    title: 'Executive Summary Q3 2026',
    category: 'data_room',
    publishedAt: '2025-08-17',
    author: 'External Research',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 97,
  },
  {
    id: 's85',
    title: 'Strategic Plan 2026-2027',
    category: 'data_room',
    publishedAt: '2026-01-06',
    author: 'Research Department',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 96,
  },
  {
    id: 's86',
    title: 'Product Roadmap 2024-2025',
    category: 'data_room',
    publishedAt: '2026-01-05',
    author: 'Bloomberg Intelligence',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 86,
  },
  {
    id: 's87',
    title: 'Customer Churn Analysis July 2025',
    category: 'data_room',
    publishedAt: '2025-07-10',
    author: 'Market Intelligence',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's88',
    title: 'Executive Summary Q4 2024',
    category: 'data_room',
    publishedAt: '2026-03-19',
    author: 'Moodys Analytics',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 85,
  },
  {
    id: 's89',
    title: 'Financial Statements Q3 2026',
    category: 'data_room',
    publishedAt: '2026-02-04',
    author: 'SP Global',
    excerpt: 'Comprehensive analysis with detailed metrics and performance indicators.',
    reliabilityScore: 88,
  },
  {
    id: 's90',
    title: 'M&A Activity Report Retail Analytics 2025',
    category: 'premium_report',
    publishedAt: '2026-03-13',
    author: 'Mergermarket Intelligence',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's91',
    title: 'Industry Trends Enterprise Tech Q2 2024',
    category: 'premium_report',
    publishedAt: '2025-08-23',
    author: 'Euromonitor International',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's92',
    title: 'Benchmark Study SaaS 2024',
    category: 'premium_report',
    publishedAt: '2026-02-11',
    author: 'SP Global',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 93,
  },
  {
    id: 's93',
    title: 'M&A Activity Report Cloud Services 2026',
    category: 'premium_report',
    publishedAt: '2025-08-21',
    author: 'Due Diligence Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 86,
  },
  {
    id: 's94',
    title: 'Investment Thesis DataSense 2024',
    category: 'premium_report',
    publishedAt: '2025-09-10',
    author: 'Market Research Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 92,
  },
  {
    id: 's95',
    title: 'Investment Thesis DataSense 2026',
    category: 'premium_report',
    publishedAt: '2025-05-20',
    author: 'Industry Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's96',
    title: 'Valuation Multiples B2B Software Q3 2026',
    category: 'premium_report',
    publishedAt: '2025-01-19',
    author: 'Research Department',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 91,
  },
  {
    id: 's97',
    title: 'Growth Forecast EMEA 2025-2026',
    category: 'premium_report',
    publishedAt: '2025-08-06',
    author: 'Market Research Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's98',
    title: 'Valuation Multiples Enterprise Tech Q4 2026',
    category: 'premium_report',
    publishedAt: '2026-03-06',
    author: 'Due Diligence Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's99',
    title: 'Market Analysis Report APAC 2026',
    category: 'premium_report',
    publishedAt: '2026-03-05',
    author: 'Moodys Analytics',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's100',
    title: 'Technology Assessment Analytics Platform 2026',
    category: 'premium_report',
    publishedAt: '2025-04-13',
    author: 'Bloomberg Intelligence',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's101',
    title: 'Growth Forecast Global 2025-2026',
    category: 'premium_report',
    publishedAt: '2026-01-13',
    author: 'Corporate Strategy',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 86,
  },
  {
    id: 's102',
    title: 'Customer Survey Results Q3 2024',
    category: 'premium_report',
    publishedAt: '2025-10-03',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 84,
  },
  {
    id: 's103',
    title: 'Customer Survey Results Q4 2026',
    category: 'premium_report',
    publishedAt: '2026-03-07',
    author: 'Moodys Analytics',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's104',
    title: 'Competitive Landscape SaaS 2024',
    category: 'premium_report',
    publishedAt: '2026-01-21',
    author: 'Forrester',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's105',
    title: 'Growth Forecast Global 2024-2025',
    category: 'premium_report',
    publishedAt: '2026-01-10',
    author: 'Research Department',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's106',
    title: 'Technology Assessment Analytics Platform 2024',
    category: 'premium_report',
    publishedAt: '2025-07-04',
    author: 'Research Department',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's107',
    title: 'M&A Activity Report Enterprise Tech 2024',
    category: 'premium_report',
    publishedAt: '2026-03-03',
    author: 'SP Global',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 84,
  },
  {
    id: 's108',
    title: 'Customer Survey Results Q4 2025',
    category: 'premium_report',
    publishedAt: '2025-12-26',
    author: 'Bloomberg Intelligence',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's109',
    title: 'Competitive Landscape Cloud Services 2024',
    category: 'premium_report',
    publishedAt: '2026-03-08',
    author: 'Data Analytics Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's110',
    title: 'Competitive Landscape Retail Analytics 2026',
    category: 'premium_report',
    publishedAt: '2025-03-22',
    author: 'Bloomberg Intelligence',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's111',
    title: 'Industry Trends Retail Analytics Q1 2025',
    category: 'premium_report',
    publishedAt: '2026-03-20',
    author: 'Financial Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's112',
    title: 'Customer Survey Results Q2 2026',
    category: 'premium_report',
    publishedAt: '2025-08-19',
    author: 'Market Intelligence',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's113',
    title: 'Customer Survey Results Q1 2025',
    category: 'premium_report',
    publishedAt: '2026-02-14',
    author: 'BCG',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 88,
  },
  {
    id: 's114',
    title: 'Benchmark Study Retail Analytics 2026',
    category: 'premium_report',
    publishedAt: '2025-02-01',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 88,
  },
  {
    id: 's115',
    title: 'Growth Forecast Europe 2025-2026',
    category: 'premium_report',
    publishedAt: '2025-08-25',
    author: 'SP Global',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 94,
  },
  {
    id: 's116',
    title: 'Investment Thesis DataSense 2024',
    category: 'premium_report',
    publishedAt: '2025-05-18',
    author: 'External Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's117',
    title: 'Valuation Multiples Retail Analytics Q4 2025',
    category: 'premium_report',
    publishedAt: '2025-11-26',
    author: 'Moodys Analytics',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's118',
    title: 'Technology Assessment Analytics Platform 2025',
    category: 'premium_report',
    publishedAt: '2025-07-06',
    author: 'Gartner Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's119',
    title: 'Technology Assessment Analytics Platform 2024',
    category: 'premium_report',
    publishedAt: '2025-08-11',
    author: 'Gartner Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 94,
  },
  {
    id: 's120',
    title: 'Competitive Landscape Retail Analytics 2026',
    category: 'premium_report',
    publishedAt: '2026-03-12',
    author: 'Market Research Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 95,
  },
  {
    id: 's121',
    title: 'Benchmark Study Enterprise Tech 2024',
    category: 'premium_report',
    publishedAt: '2025-04-12',
    author: 'Industry Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 93,
  },
  {
    id: 's122',
    title: 'Investment Thesis DataSense 2025',
    category: 'premium_report',
    publishedAt: '2026-01-20',
    author: 'Market Research Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's123',
    title: 'Investment Thesis DataSense 2025',
    category: 'premium_report',
    publishedAt: '2026-01-01',
    author: 'Moodys Analytics',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 86,
  },
  {
    id: 's124',
    title: 'Growth Forecast North America 2026-2027',
    category: 'premium_report',
    publishedAt: '2026-01-10',
    author: 'Financial Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 87,
  },
  {
    id: 's125',
    title: 'Industry Trends B2B Software Q4 2026',
    category: 'premium_report',
    publishedAt: '2025-07-27',
    author: 'Data Analytics Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's126',
    title: 'Growth Forecast Europe 2024-2025',
    category: 'premium_report',
    publishedAt: '2025-06-27',
    author: 'Due Diligence Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 92,
  },
  {
    id: 's127',
    title: 'Customer Survey Results Q4 2025',
    category: 'premium_report',
    publishedAt: '2026-01-27',
    author: 'BCG',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's128',
    title: 'Industry Trends Enterprise Tech Q1 2024',
    category: 'premium_report',
    publishedAt: '2026-02-26',
    author: 'Moodys Analytics',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 91,
  },
  {
    id: 's129',
    title: 'Growth Forecast Europe 2024-2025',
    category: 'premium_report',
    publishedAt: '2025-04-14',
    author: 'Investment Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's130',
    title: 'Growth Forecast Global 2025-2026',
    category: 'premium_report',
    publishedAt: '2025-11-13',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's131',
    title: 'Growth Forecast Europe 2025-2026',
    category: 'premium_report',
    publishedAt: '2026-01-15',
    author: 'Business Development',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's132',
    title: 'Investment Thesis DataSense 2026',
    category: 'premium_report',
    publishedAt: '2026-01-02',
    author: 'Corporate Strategy',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's133',
    title: 'Market Analysis Report APAC 2024',
    category: 'premium_report',
    publishedAt: '2025-01-10',
    author: 'Bloomberg Intelligence',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 88,
  },
  {
    id: 's134',
    title: 'Market Analysis Report North America 2025',
    category: 'premium_report',
    publishedAt: '2025-05-17',
    author: 'BCG',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 85,
  },
  {
    id: 's135',
    title: 'Benchmark Study SaaS 2026',
    category: 'premium_report',
    publishedAt: '2025-03-22',
    author: 'Forrester',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's136',
    title: 'Benchmark Study Cloud Services 2024',
    category: 'premium_report',
    publishedAt: '2025-11-05',
    author: 'BCG',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's137',
    title: 'Industry Trends Enterprise Tech Q2 2026',
    category: 'premium_report',
    publishedAt: '2026-02-04',
    author: 'Forrester',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's138',
    title: 'Competitive Landscape Enterprise Tech 2026',
    category: 'premium_report',
    publishedAt: '2025-06-25',
    author: 'Bloomberg Intelligence',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 94,
  },
  {
    id: 's139',
    title: 'Valuation Multiples B2B Software Q2 2026',
    category: 'premium_report',
    publishedAt: '2025-06-27',
    author: 'Research Department',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's140',
    title: 'Growth Forecast APAC 2025-2026',
    category: 'premium_report',
    publishedAt: '2025-08-13',
    author: 'Market Research Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 93,
  },
  {
    id: 's141',
    title: 'Growth Forecast North America 2024-2025',
    category: 'premium_report',
    publishedAt: '2026-01-16',
    author: 'External Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's142',
    title: 'Competitive Landscape Cloud Services 2026',
    category: 'premium_report',
    publishedAt: '2025-11-18',
    author: 'Due Diligence Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's143',
    title: 'Customer Survey Results Q3 2024',
    category: 'premium_report',
    publishedAt: '2026-02-24',
    author: 'External Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's144',
    title: 'Technology Assessment Analytics Platform 2024',
    category: 'premium_report',
    publishedAt: '2025-03-24',
    author: 'Industry Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 94,
  },
  {
    id: 's145',
    title: 'Technology Assessment Analytics Platform 2026',
    category: 'premium_report',
    publishedAt: '2025-01-17',
    author: 'Industry Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 91,
  },
  {
    id: 's146',
    title: 'Technology Assessment Analytics Platform 2026',
    category: 'premium_report',
    publishedAt: '2025-12-10',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 88,
  },
  {
    id: 's147',
    title: 'Valuation Multiples Cloud Services Q4 2024',
    category: 'premium_report',
    publishedAt: '2025-08-07',
    author: 'Moodys Analytics',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 93,
  },
  {
    id: 's148',
    title: 'Competitive Landscape Retail Analytics 2024',
    category: 'premium_report',
    publishedAt: '2025-10-25',
    author: 'Gartner Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 92,
  },
  {
    id: 's149',
    title: 'Investment Thesis DataSense 2025',
    category: 'premium_report',
    publishedAt: '2025-10-06',
    author: 'Business Development',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's150',
    title: 'Technology Assessment Analytics Platform 2025',
    category: 'premium_report',
    publishedAt: '2026-02-18',
    author: 'Business Development',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 95,
  },
  {
    id: 's151',
    title: 'Growth Forecast North America 2024-2025',
    category: 'premium_report',
    publishedAt: '2025-11-21',
    author: 'Forrester',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's152',
    title: 'Benchmark Study Retail Analytics 2024',
    category: 'premium_report',
    publishedAt: '2025-01-24',
    author: 'McKinsey and Company',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 91,
  },
  {
    id: 's153',
    title: 'Benchmark Study B2B Software 2025',
    category: 'premium_report',
    publishedAt: '2025-07-10',
    author: 'Business Development',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 95,
  },
  {
    id: 's154',
    title: 'Growth Forecast EMEA 2026-2027',
    category: 'premium_report',
    publishedAt: '2025-05-16',
    author: 'McKinsey and Company',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 88,
  },
  {
    id: 's155',
    title: 'M&A Activity Report B2B Software 2025',
    category: 'premium_report',
    publishedAt: '2026-01-23',
    author: 'Investment Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 82,
  },
  {
    id: 's156',
    title: 'Investment Thesis DataSense 2026',
    category: 'premium_report',
    publishedAt: '2025-03-09',
    author: 'Due Diligence Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 86,
  },
  {
    id: 's157',
    title: 'Benchmark Study SaaS 2026',
    category: 'premium_report',
    publishedAt: '2026-02-18',
    author: 'McKinsey and Company',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's158',
    title: 'Market Analysis Report North America 2025',
    category: 'premium_report',
    publishedAt: '2025-03-25',
    author: 'McKinsey and Company',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 87,
  },
  {
    id: 's159',
    title: 'Competitive Landscape Cloud Services 2025',
    category: 'premium_report',
    publishedAt: '2025-05-16',
    author: 'Gartner Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's160',
    title: 'Growth Forecast EMEA 2024-2025',
    category: 'premium_report',
    publishedAt: '2026-01-20',
    author: 'SP Global',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 84,
  },
  {
    id: 's161',
    title: 'Customer Survey Results Q2 2025',
    category: 'premium_report',
    publishedAt: '2025-10-06',
    author: 'Industry Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's162',
    title: 'M&A Activity Report Cloud Services 2025',
    category: 'premium_report',
    publishedAt: '2025-07-12',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's163',
    title: 'Investment Thesis DataSense 2025',
    category: 'premium_report',
    publishedAt: '2026-03-14',
    author: 'Investment Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 91,
  },
  {
    id: 's164',
    title: 'Market Analysis Report Europe 2026',
    category: 'premium_report',
    publishedAt: '2026-01-12',
    author: 'BCG',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's165',
    title: 'Investment Thesis DataSense 2024',
    category: 'premium_report',
    publishedAt: '2026-01-27',
    author: 'Financial Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 94,
  },
  {
    id: 's166',
    title: 'Industry Trends Enterprise Tech Q4 2024',
    category: 'premium_report',
    publishedAt: '2026-02-18',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 88,
  },
  {
    id: 's167',
    title: 'Benchmark Study Cloud Services 2025',
    category: 'premium_report',
    publishedAt: '2026-02-06',
    author: 'Financial Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's168',
    title: 'Competitive Landscape Enterprise Tech 2026',
    category: 'premium_report',
    publishedAt: '2026-03-10',
    author: 'Due Diligence Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 84,
  },
  {
    id: 's169',
    title: 'Investment Thesis DataSense 2026',
    category: 'premium_report',
    publishedAt: '2025-01-14',
    author: 'Investment Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's170',
    title: 'Market Analysis Report Europe 2026',
    category: 'premium_report',
    publishedAt: '2025-01-17',
    author: 'BCG',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 95,
  },
  {
    id: 's171',
    title: 'M&A Activity Report B2B Software 2026',
    category: 'premium_report',
    publishedAt: '2026-01-21',
    author: 'Gartner Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 91,
  },
  {
    id: 's172',
    title: 'Growth Forecast Global 2026-2027',
    category: 'premium_report',
    publishedAt: '2025-03-27',
    author: 'Data Analytics Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 87,
  },
  {
    id: 's173',
    title: 'Industry Trends B2B Software Q4 2025',
    category: 'premium_report',
    publishedAt: '2026-03-16',
    author: 'Business Development',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's174',
    title: 'Benchmark Study Enterprise Tech 2024',
    category: 'premium_report',
    publishedAt: '2026-02-02',
    author: 'Due Diligence Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's175',
    title: 'Valuation Multiples Cloud Services Q1 2026',
    category: 'premium_report',
    publishedAt: '2026-01-04',
    author: 'Research Department',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 94,
  },
  {
    id: 's176',
    title: 'Investment Thesis DataSense 2025',
    category: 'premium_report',
    publishedAt: '2025-06-28',
    author: 'Industry Analyst',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 92,
  },
  {
    id: 's177',
    title: 'Growth Forecast Europe 2026-2027',
    category: 'premium_report',
    publishedAt: '2025-06-16',
    author: 'Research Department',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's178',
    title: 'Customer Survey Results Q1 2026',
    category: 'premium_report',
    publishedAt: '2025-05-11',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 95,
  },
  {
    id: 's179',
    title: 'M&A Activity Report Retail Analytics 2024',
    category: 'premium_report',
    publishedAt: '2025-11-07',
    author: 'Corporate Strategy',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 87,
  },
  {
    id: 's180',
    title: 'Investment Thesis DataSense 2024',
    category: 'premium_report',
    publishedAt: '2026-03-24',
    author: 'Market Research Team',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 87,
  },
  {
    id: 's181',
    title: 'Valuation Multiples B2B Software Q1 2026',
    category: 'premium_report',
    publishedAt: '2026-02-27',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 95,
  },
  {
    id: 's182',
    title: 'Investment Thesis DataSense 2026',
    category: 'premium_report',
    publishedAt: '2026-01-24',
    author: 'Business Development',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 88,
  },
  {
    id: 's183',
    title: 'Benchmark Study Retail Analytics 2025',
    category: 'premium_report',
    publishedAt: '2025-01-14',
    author: 'Strategic Insights Group',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's184',
    title: 'Investment Thesis DataSense 2024',
    category: 'premium_report',
    publishedAt: '2026-01-16',
    author: 'Forrester',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 83,
  },
  {
    id: 's185',
    title: 'Customer Survey Results Q1 2026',
    category: 'premium_report',
    publishedAt: '2025-03-23',
    author: 'McKinsey and Company',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 86,
  },
  {
    id: 's186',
    title: 'Technology Assessment Analytics Platform 2024',
    category: 'premium_report',
    publishedAt: '2025-04-10',
    author: 'McKinsey and Company',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 89,
  },
  {
    id: 's187',
    title: 'Valuation Multiples SaaS Q4 2025',
    category: 'premium_report',
    publishedAt: '2025-11-25',
    author: 'Investment Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 90,
  },
  {
    id: 's188',
    title: 'Industry Trends B2B Software Q4 2024',
    category: 'premium_report',
    publishedAt: '2025-03-13',
    author: 'Research Department',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 94,
  },
  {
    id: 's189',
    title: 'Industry Trends Cloud Services Q3 2025',
    category: 'premium_report',
    publishedAt: '2025-10-07',
    author: 'Gartner Research',
    excerpt: 'Market insights and competitive analysis with industry benchmarks.',
    reliabilityScore: 86,
  },
  {
    id: 's190',
    title: 'Comparable Companies Analysis 2026-02-25',
    category: 'api',
    publishedAt: '2026-02-20',
    author: 'Moodys Analytics',
    excerpt: 'Structured data extract with financial and operational metrics.',
    reliabilityScore: 89,
  },
                                                                                                                                            {
    id: 's260',
    title: 'Case Study: DataSense Success Story',
    category: 'web',
    publishedAt: '2026-01-26',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 60,
  },
  {
    id: 's261',
    title: 'Article: SaaS Performance in SaaS',
    category: 'web',
    publishedAt: '2026-02-13',
    author: 'Moodys Analytics',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 64,
  },
  {
    id: 's262',
    title: 'Case Study: DataSense Success Story',
    category: 'web',
    publishedAt: '2025-09-13',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 65,
  },
  {
    id: 's263',
    title: 'Research: Cloud Services Performance in 2024',
    category: 'web',
    publishedAt: '2025-11-14',
    author: 'Bloomberg Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 68,
  },
  {
    id: 's264',
    title: 'Forbes — "Analysis of SaaS Trends" 2025-11-17',
    category: 'web',
    publishedAt: '2026-01-08',
    author: 'Strategic Insights Group',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 65,
  },
  {
    id: 's265',
    title: 'Whitepaper: Enterprise Tech Performance Best Practices',
    category: 'web',
    publishedAt: '2025-01-06',
    author: 'Industry Analyst',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 67,
  },
  {
    id: 's266',
    title: 'Case Study: DataSense Success Story',
    category: 'web',
    publishedAt: '2025-07-20',
    author: 'Data Analytics Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 69,
  },
  {
    id: 's267',
    title: 'FT — "Analysis of B2B Software Trends" 2025-07-11',
    category: 'web',
    publishedAt: '2025-11-20',
    author: 'Strategic Insights Group',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 71,
  },
  {
    id: 's268',
    title: 'Interview: CEO Insights October 2025',
    category: 'web',
    publishedAt: '2025-10-04',
    author: 'Bain and Company',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 68,
  },
  {
    id: 's269',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2025-04-15',
    author: 'Bloomberg Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 78,
  },
  {
    id: 's270',
    title: 'Research: Cloud Services Performance in 2024',
    category: 'web',
    publishedAt: '2025-11-17',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's271',
    title: 'Commentary: Retail Analytics Outlook 2026',
    category: 'web',
    publishedAt: '2025-08-12',
    author: 'Industry Analyst',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 63,
  },
  {
    id: 's272',
    title: 'Commentary: Enterprise Tech Outlook 2024',
    category: 'web',
    publishedAt: '2026-02-15',
    author: 'Corporate Strategy',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 61,
  },
  {
    id: 's273',
    title: 'Article: SaaS Performance in SaaS',
    category: 'web',
    publishedAt: '2026-03-05',
    author: 'BCG',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 64,
  },
  {
    id: 's274',
    title: 'Blog Post: Retail Analytics Performance Analysis',
    category: 'web',
    publishedAt: '2026-02-01',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 80,
  },
  {
    id: 's275',
    title: 'Interview: CEO Insights April 2025',
    category: 'web',
    publishedAt: '2026-03-11',
    author: 'Bloomberg Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 72,
  },
  {
    id: 's276',
    title: 'Whitepaper: B2B Software Performance Best Practices',
    category: 'web',
    publishedAt: '2026-02-08',
    author: 'Market Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 77,
  },
  {
    id: 's277',
    title: 'Commentary: B2B Software Outlook 2024',
    category: 'web',
    publishedAt: '2025-03-27',
    author: 'Bain and Company',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 71,
  },
  {
    id: 's278',
    title: 'Research: SaaS Performance in 2025',
    category: 'web',
    publishedAt: '2026-03-08',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's279',
    title: 'Blog Post: B2B Software Performance Analysis',
    category: 'web',
    publishedAt: '2025-12-01',
    author: 'Bloomberg Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 80,
  },
  {
    id: 's280',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2026-02-13',
    author: 'Business Development',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 71,
  },
  {
    id: 's281',
    title: 'WSJ — "Analysis of Retail Analytics Trends" 2025-04-07',
    category: 'web',
    publishedAt: '2025-11-26',
    author: 'Research Department',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 79,
  },
  {
    id: 's282',
    title: 'News: SaaS Market Update November 2024',
    category: 'web',
    publishedAt: '2025-09-18',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 72,
  },
  {
    id: 's283',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2026-03-09',
    author: 'Bloomberg Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 71,
  },
  {
    id: 's284',
    title: 'Blog Post: SaaS Performance Analysis',
    category: 'web',
    publishedAt: '2025-05-14',
    author: 'Data Analytics Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 67,
  },
  {
    id: 's285',
    title: 'Interview: CEO Insights June 2024',
    category: 'web',
    publishedAt: '2026-03-12',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 68,
  },
  {
    id: 's286',
    title: 'Bloomberg — "Analysis of SaaS Trends" 2026-03-22',
    category: 'web',
    publishedAt: '2025-07-23',
    author: 'Moodys Analytics',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 65,
  },
  {
    id: 's287',
    title: 'News: SaaS Market Update March 2025',
    category: 'web',
    publishedAt: '2026-03-11',
    author: 'Data Analytics Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 72,
  },
  {
    id: 's288',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2025-03-25',
    author: 'Market Research Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's289',
    title: 'Article: Enterprise Tech Performance in Enterprise Tech',
    category: 'web',
    publishedAt: '2025-06-01',
    author: 'BCG',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 71,
  },
  {
    id: 's290',
    title: 'Whitepaper: Retail Analytics Performance Best Practices',
    category: 'web',
    publishedAt: '2026-03-04',
    author: 'Moodys Analytics',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 79,
  },
  {
    id: 's291',
    title: 'Interview: CEO Insights September 2025',
    category: 'web',
    publishedAt: '2026-02-10',
    author: 'Industry Analyst',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 63,
  },
  {
    id: 's292',
    title: 'News: SaaS Market Update May 2025',
    category: 'web',
    publishedAt: '2026-01-28',
    author: 'Corporate Strategy',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 69,
  },
  {
    id: 's293',
    title: 'Bloomberg — "Analysis of B2B Software Trends" 2026-01-12',
    category: 'web',
    publishedAt: '2025-02-20',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 67,
  },
  {
    id: 's294',
    title: 'Blog Post: Cloud Services Performance Analysis',
    category: 'web',
    publishedAt: '2025-03-06',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's295',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2026-02-24',
    author: 'Bain and Company',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 68,
  },
  {
    id: 's296',
    title: 'Commentary: Enterprise Tech Outlook 2024',
    category: 'web',
    publishedAt: '2025-02-28',
    author: 'Financial Analyst',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 61,
  },
  {
    id: 's297',
    title: 'News: SaaS Market Update February 2026',
    category: 'web',
    publishedAt: '2025-10-11',
    author: 'Strategic Insights Group',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 65,
  },
  {
    id: 's298',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2026-02-18',
    author: 'Data Analytics Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 61,
  },
  {
    id: 's299',
    title: 'Commentary: Enterprise Tech Outlook 2024',
    category: 'web',
    publishedAt: '2026-01-01',
    author: 'Financial Analyst',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 70,
  },
  {
    id: 's300',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2026-03-14',
    author: 'Moodys Analytics',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 63,
  },
  {
    id: 's301',
    title: 'Whitepaper: SaaS Performance Best Practices',
    category: 'web',
    publishedAt: '2025-09-13',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 78,
  },
  {
    id: 's302',
    title: 'Interview: CEO Insights October 2025',
    category: 'web',
    publishedAt: '2025-02-04',
    author: 'Industry Analyst',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 65,
  },
  {
    id: 's303',
    title: 'Blog Post: Cloud Services Performance Analysis',
    category: 'web',
    publishedAt: '2025-09-09',
    author: 'Moodys Analytics',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 73,
  },
  {
    id: 's304',
    title: 'Article: Cloud Services Performance in Cloud Services',
    category: 'web',
    publishedAt: '2025-03-23',
    author: 'Bloomberg Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 70,
  },
  {
    id: 's305',
    title: 'Research: Cloud Services Performance in 2026',
    category: 'web',
    publishedAt: '2026-01-19',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 73,
  },
  {
    id: 's306',
    title: 'Research: Cloud Services Performance in 2025',
    category: 'web',
    publishedAt: '2025-02-22',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's307',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2026-02-10',
    author: 'Investment Research',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's308',
    title: 'Commentary: B2B Software Outlook 2026',
    category: 'web',
    publishedAt: '2026-03-16',
    author: 'Business Development',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 68,
  },
  {
    id: 's309',
    title: 'Case Study: DataSense Success Story',
    category: 'web',
    publishedAt: '2025-09-09',
    author: 'Investment Research',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 81,
  },
  {
    id: 's310',
    title: 'News: Retail Analytics Market Update July 2026',
    category: 'web',
    publishedAt: '2025-10-15',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's311',
    title: 'Blog Post: Enterprise Tech Performance Analysis',
    category: 'web',
    publishedAt: '2026-03-28',
    author: 'Gartner Research',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 66,
  },
  {
    id: 's312',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2026-01-12',
    author: 'Market Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 61,
  },
  {
    id: 's313',
    title: 'Research: Cloud Services Performance in 2026',
    category: 'web',
    publishedAt: '2025-03-15',
    author: 'Market Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 71,
  },
  {
    id: 's314',
    title: 'Article: Retail Analytics Performance in Retail Analytics',
    category: 'web',
    publishedAt: '2025-12-13',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 65,
  },
  {
    id: 's315',
    title: 'News: SaaS Market Update July 2026',
    category: 'web',
    publishedAt: '2025-01-06',
    author: 'SP Global',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 82,
  },
  {
    id: 's316',
    title: 'News: SaaS Market Update October 2026',
    category: 'web',
    publishedAt: '2025-08-13',
    author: 'Research Department',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 63,
  },
  {
    id: 's317',
    title: 'FT — "Analysis of B2B Software Trends" 2026-01-13',
    category: 'web',
    publishedAt: '2026-03-13',
    author: 'Investment Research',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 77,
  },
  {
    id: 's318',
    title: 'Blog Post: B2B Software Performance Analysis',
    category: 'web',
    publishedAt: '2026-02-25',
    author: 'SP Global',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 78,
  },
  {
    id: 's319',
    title: 'Press Release: DataSense Growth Milestone',
    category: 'web',
    publishedAt: '2025-11-14',
    author: 'Business Development',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 71,
  },
  {
    id: 's320',
    title: 'Article: SaaS Performance in SaaS',
    category: 'web',
    publishedAt: '2025-10-12',
    author: 'Bloomberg Intelligence',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 81,
  },
  {
    id: 's321',
    title: 'Interview: CEO Insights February 2026',
    category: 'web',
    publishedAt: '2025-12-21',
    author: 'Business Development',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 73,
  },
  {
    id: 's322',
    title: 'Forbes — "Analysis of Cloud Services Trends" 2025-10-21',
    category: 'web',
    publishedAt: '2026-02-04',
    author: 'Gartner Research',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 60,
  },
  {
    id: 's323',
    title: 'Interview: CEO Insights July 2025',
    category: 'web',
    publishedAt: '2026-01-18',
    author: 'Due Diligence Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 67,
  },
  {
    id: 's324',
    title: 'Commentary: B2B Software Outlook 2026',
    category: 'web',
    publishedAt: '2025-08-20',
    author: 'Data Analytics Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 63,
  },
  {
    id: 's325',
    title: 'Case Study: DataSense Success Story',
    category: 'web',
    publishedAt: '2026-01-09',
    author: 'Research Department',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 73,
  },
  {
    id: 's326',
    title: 'Research: Retail Analytics Performance in 2024',
    category: 'web',
    publishedAt: '2026-03-08',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 68,
  },
  {
    id: 's327',
    title: 'Case Study: DataSense Success Story',
    category: 'web',
    publishedAt: '2026-02-14',
    author: 'Moodys Analytics',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 60,
  },
  {
    id: 's328',
    title: 'Blog Post: Cloud Services Performance Analysis',
    category: 'web',
    publishedAt: '2026-02-09',
    author: 'Data Analytics Team',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 68,
  },
  {
    id: 's329',
    title: 'Blog Post: SaaS Performance Analysis',
    category: 'web',
    publishedAt: '2025-03-02',
    author: 'Forrester',
    excerpt: 'Industry commentary and market perspective from external sources.',
    reliabilityScore: 76,
  },
  {
    id: 's330',
    title: 'Stakeholder Interview — B2B Software Performance',
    category: 'interview',
    publishedAt: '2025-12-22',
    author: 'SP Global',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 77,
  },
  {
    id: 's331',
    title: 'Expert Call — Cloud Services Performance 2025-02-03',
    category: 'interview',
    publishedAt: '2025-09-11',
    author: 'Market Intelligence',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 76,
  },
  {
    id: 's332',
    title: 'Customer Interview #3 — DataSense',
    category: 'interview',
    publishedAt: '2026-02-10',
    author: 'Financial Analyst',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 86,
  },
  {
    id: 's333',
    title: 'Expert Call — Enterprise Tech Performance 2025-04-15',
    category: 'interview',
    publishedAt: '2025-07-25',
    author: 'Business Development',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 87,
  },
  {
    id: 's334',
    title: 'Management Interview — Retail Analytics Performance June 2026',
    category: 'interview',
    publishedAt: '2025-06-10',
    author: 'Market Intelligence',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 78,
  },
  {
    id: 's335',
    title: 'Industry Expert Discussion — Retail Analytics Performance',
    category: 'interview',
    publishedAt: '2026-03-04',
    author: 'Bain and Company',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 87,
  },
  {
    id: 's336',
    title: 'Reference Check — CFO DataSense',
    category: 'interview',
    publishedAt: '2025-08-12',
    author: 'Data Analytics Team',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 85,
  },
  {
    id: 's337',
    title: 'Reference Check — CFO DataSense',
    category: 'interview',
    publishedAt: '2026-01-10',
    author: 'Bain and Company',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 86,
  },
  {
    id: 's338',
    title: 'Industry Expert Discussion — Enterprise Tech Performance',
    category: 'interview',
    publishedAt: '2025-10-13',
    author: 'Investment Research',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 81,
  },
  {
    id: 's339',
    title: 'Management Interview — Cloud Services Performance November 2024',
    category: 'interview',
    publishedAt: '2026-02-27',
    author: 'Bloomberg Intelligence',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 75,
  },
  {
    id: 's340',
    title: 'Industry Expert Discussion — Enterprise Tech Performance',
    category: 'interview',
    publishedAt: '2025-07-27',
    author: 'BCG',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 89,
  },
  {
    id: 's341',
    title: 'Industry Expert Discussion — Cloud Services Performance',
    category: 'interview',
    publishedAt: '2025-05-25',
    author: 'Industry Analyst',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 79,
  },
  {
    id: 's342',
    title: 'Management Interview — Enterprise Tech Performance February 2024',
    category: 'interview',
    publishedAt: '2026-02-13',
    author: 'Gartner Research',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 92,
  },
  {
    id: 's343',
    title: 'Stakeholder Interview — B2B Software Performance',
    category: 'interview',
    publishedAt: '2025-01-08',
    author: 'External Research',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 91,
  },
  {
    id: 's344',
    title: 'Customer Interview #15 — DataSense',
    category: 'interview',
    publishedAt: '2025-05-09',
    author: 'Moodys Analytics',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 82,
  },
  {
    id: 's345',
    title: 'Stakeholder Interview — Cloud Services Performance',
    category: 'interview',
    publishedAt: '2026-03-10',
    author: 'Bloomberg Intelligence',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 87,
  },
  {
    id: 's346',
    title: 'Expert Call — B2B Software Performance 2026-01-14',
    category: 'interview',
    publishedAt: '2026-02-18',
    author: 'Bloomberg Intelligence',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 75,
  },
  {
    id: 's347',
    title: 'Management Interview — Retail Analytics Performance April 2024',
    category: 'interview',
    publishedAt: '2026-02-23',
    author: 'McKinsey and Company',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 87,
  },
  {
    id: 's348',
    title: 'Management Interview — Retail Analytics Performance February 2025',
    category: 'interview',
    publishedAt: '2025-02-10',
    author: 'Bain and Company',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 82,
  },
  {
    id: 's349',
    title: 'Customer Interview #20 — DataSense',
    category: 'interview',
    publishedAt: '2026-01-16',
    author: 'Corporate Strategy',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 90,
  },
  {
    id: 's350',
    title: 'Industry Expert Discussion — Cloud Services Performance',
    category: 'interview',
    publishedAt: '2026-03-20',
    author: 'Strategic Insights Group',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 92,
  },
  {
    id: 's351',
    title: 'Stakeholder Interview — B2B Software Performance',
    category: 'interview',
    publishedAt: '2025-05-18',
    author: 'Corporate Strategy',
    excerpt: 'Direct insights from management and industry stakeholders.',
    reliabilityScore: 92,
  },

  // ─── TIER 1: HIGH-FIDELITY MARKET SIZING DOCUMENTS (s352-s451) ───────────────

  // Market Sizing & TAM Analysis (30 documents)
  {
    id: 's352',
    title: 'Revolut — UK SMB Payment Processing TAM Analysis 2025-2028',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-MARKET-0001',
    fileType: 'xlsx',
    fileName: 'Revolut_UK_SMB_TAM_Analysis_2025_2028.xlsx',
    publishedAt: '2026-01-15',
    author: 'Commercial Strategy Team',
    excerpt: 'UK SMB payment processing TAM €285B (2025), growing at 16% CAGR to €425B (2028). Addressable market for Revolut: €142B (50% penetration target). Key growth drivers: digital adoption, cross-border expansion.',
    reliabilityScore: 94,
    content: `REVOLUT - UK SMB PAYMENT PROCESSING TAM ANALYSIS 2025-2028

EXECUTIVE SUMMARY
Total UK SMB Market: €285B (2025)
Projected 2028 TAM: €425B
CAGR 2025-2028: 16%
Revolut Addressable Market: €142B (50% penetration scenario)

MARKET SEGMENTATION
Micro SMB (<10 employees): €95B (33%)
- 2.1M businesses
- Average payment volume: €45K annually
- Digital penetration: 62%
- CAGR: 18%

Small SMB (10-49 employees): €190B (67%)
- 850K businesses
- Average payment volume: €223K annually
- Digital penetration: 71%
- CAGR: 15%

PAYMENT METHODS BREAKDOWN
Card payments: €148B (52%)
Bank transfers: €80B (28%)
Digital wallets: €43B (15%)
Alternative methods: €14B (5%)

REGIONAL DISTRIBUTION
London & Southeast: €125B (44%)
Midlands: €57B (20%)
North England: €51B (18%)
Scotland: €31B (11%)
Wales & NI: €21B (7%)

GROWTH DRIVERS
1. Post-Brexit cross-border complexity → +€45B opportunity
2. Digital-first SMB formation → +28% YoY new business accounts
3. E-commerce penetration → 38% of SMB revenue now online
4. Open Banking adoption → 24% SMBs using multi-bank solutions

COMPETITIVE LANDSCAPE
Revolut market share: 8.2% (2025)
Stripe: 14.5%
Square: 11.2%
Traditional banks: 52.1%
Others: 14.0%

PENETRATION SCENARIOS
Conservative (30%): €85B addressable
Base case (50%): €142B addressable
Aggressive (70%): €199B addressable

KEY ASSUMPTIONS
- Digital payment penetration reaches 85% by 2028
- Average take rate: 1.8%
- Customer acquisition cost: €180/SMB
- Lifetime value: €2,400/SMB (conservative)

RISKS & CONSTRAINTS
- Regulatory changes (FCA oversight)
- Competitive pressure from neobanks
- Economic downturn impact on SMB formation
- Technology infrastructure investments required`,
  },
  {
    id: 's353',
    title: 'France Mid-Market Segment TAM & Growth Forecast 2025-2027',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-MARKET-0002',
    fileType: 'pdf',
    fileName: 'France_MidMarket_TAM_Growth_2025_2027.pdf',
    publishedAt: '2025-11-20',
    author: 'Market Intelligence',
    excerpt: 'France mid-market segment €95B TAM with 14% projected CAGR through 2027. Payment volume growth driven by B2B expansion and digital invoice adoption. Addressable segment: €47B for Revolut Business positioning.',
    reliabilityScore: 91,
    content: `FRANCE MID-MARKET PAYMENT PROCESSING - TAM ANALYSIS

MARKET OVERVIEW
Total France Mid-Market: €95B (2025)
Projected 2027: €124B
CAGR 2025-2027: 14%

SEGMENT DEFINITION
Mid-Market: 50-500 employees
Business count: 68,000 companies
Average payment volume: €1.4M annually
Average employee count: 185

VERTICAL BREAKDOWN
Professional Services: €28B (30%)
Retail & E-commerce: €24B (25%)
Manufacturing: €19B (20%)
Technology: €14B (15%)
Other sectors: €10B (10%)

PAYMENT INFRASTRUCTURE
Domestic payments: €57B (60%)
SEPA transfers: €28B (30%)
International: €10B (10%)

DIGITAL ADOPTION METRICS
Multi-bank platforms: 42% adoption
API-first solutions: 31% adoption
Real-time payments: 58% adoption
Automated reconciliation: 67% adoption

GROWTH CATALYSTS
1. B2B e-commerce growth → +22% YoY
2. SEPA Instant adoption → €38B volume by 2027
3. Corporate card programs → €12B opportunity
4. Cross-border EU trade → +16% annually

COMPETITIVE POSITIONING
Traditional banks: 61% market share
Fintech challengers: 24%
Embedded finance: 15%

REVOLUT OPPORTUNITY
Current penetration: 3.2%
Target penetration: 12% by 2027
Addressable market: €47B
Revenue opportunity: €850M (1.8% take rate)

KEY SUCCESS FACTORS
- Multi-currency capabilities
- Integrated expense management
- API connectivity for ERP systems
- Dedicated relationship managers
- Compliance with French regulations

BARRIERS TO ENTRY
- Strong banking relationships
- Integration complexity
- Regulatory requirements
- Sales cycle length (6-9 months)`,
  },
  {
    id: 's354',
    title: 'Germany Enterprise Payment TAM - Regional Breakdown 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-MARKET-0003',
    fileType: 'xlsx',
    fileName: 'Germany_Enterprise_TAM_Regional_2026.xlsx',
    publishedAt: '2026-02-10',
    author: 'Market Research',
    excerpt: 'Germany enterprise segment €178B total addressable market. Regional concentration: Bavaria 28%, North Rhine-Westphalia 24%. CAGR 11% driven by supply chain digitization and treasury automation.',
    reliabilityScore: 93,
    content: `GERMANY ENTERPRISE PAYMENT PROCESSING - TAM ANALYSIS 2026

MARKET SIZE
Total Enterprise TAM: €178B
Enterprise definition: >500 employees
Company count: 4,200 enterprises
Average payment volume: €42M annually

REGIONAL CONCENTRATION
Bavaria: €50B (28%)
- Munich metropolitan: €32B
- Nuremberg region: €11B
- Other Bavaria: €7B

North Rhine-Westphalia: €43B (24%)
- Rhine-Ruhr area: €28B
- Cologne/Bonn: €10B
- Other NRW: €5B

Baden-Württemberg: €35B (20%)
Hesse: €25B (14%)
Other regions: €25B (14%)

INDUSTRY VERTICALS
Automotive & Manufacturing: €62B (35%)
Financial Services: €39B (22%)
Retail & Consumer: €28B (16%)
Technology & Telecom: €25B (14%)
Other: €24B (13%)

PAYMENT TYPES
SEPA Credit Transfer: €89B (50%)
International wire: €53B (30%)
Corporate cards: €21B (12%)
Other instruments: €15B (8%)

GROWTH DRIVERS (11% CAGR)
1. Supply chain finance digitization
2. Treasury automation platforms
3. Real-time payment adoption
4. Cross-border EU harmonization

TECHNOLOGY ADOPTION
Treasury Management Systems: 78%
Payment hubs: 52%
API banking: 41%
Real-time reporting: 67%

COMPETITIVE LANDSCAPE
Deutsche Bank: 18%
Commerzbank: 14%
International banks: 32%
Fintechs: 7%
Others: 29%

REVOLUT ENTERPRISE OPPORTUNITY
Addressable segment: €35B (20%)
Target segments:
- Mid-sized multinational: €18B
- Tech-forward enterprises: €12B
- Export-oriented businesses: €5B

REVENUE MODEL
Transaction fees: 0.4-0.8%
Platform fees: €50K-€500K annually
FX markup: 0.3-0.5%
Total revenue opportunity: €280M

CRITICAL SUCCESS FACTORS
- Dedicated enterprise sales team
- Banking license credibility
- Multi-entity support
- Advanced treasury features
- German language support
- Local compliance expertise`,
  },
  {
    id: 's355',
    title: 'Spain Retail SMB Market Sizing - E-commerce Focus 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-MARKET-0004',
    fileType: 'pdf',
    fileName: 'Spain_Retail_SMB_Ecommerce_TAM_2025.pdf',
    publishedAt: '2025-10-18',
    author: 'Sector Analysis Team',
    excerpt: 'Spain retail SMB e-commerce payment volume €42B with 19% CAGR. Digital wallet penetration 47%, fastest growing in Southern Europe. Market fragmentation creates €21B opportunity for integrated payment solutions.',
    reliabilityScore: 90,
    content: `SPAIN RETAIL SMB E-COMMERCE - MARKET ANALYSIS 2025

TOTAL ADDRESSABLE MARKET
Spain Retail SMB E-commerce: €42B (2025)
Projected 2028: €71B
CAGR 2025-2028: 19%

SEGMENT BREAKDOWN
Pure e-commerce players: €18B (43%)
Omnichannel retailers: €16B (38%)
Marketplace sellers: €8B (19%)

SMB SIZE DISTRIBUTION
Micro (1-9 employees): €14B (33%)
Small (10-49 employees): €28B (67%)

PAYMENT METHOD MIX
Credit/Debit cards: €21B (50%)
Digital wallets: €20B (47%)
- PayPal: €9B
- Bizum: €7B
- Other wallets: €4B
Bank transfer: €1B (3%)

REGIONAL DISTRIBUTION
Catalonia: €12B (29%)
Madrid: €11B (26%)
Andalusia: €8B (19%)
Valencia: €6B (14%)
Other regions: €5B (12%)

E-COMMERCE CATEGORIES
Fashion & accessories: €13B (31%)
Electronics: €10B (24%)
Home & garden: €8B (19%)
Food & beverage: €6B (14%)
Other: €5B (12%)

GROWTH DRIVERS
1. Mobile commerce → 68% of transactions
2. Social commerce → +35% YoY
3. Cross-border sales → €8B opportunity
4. Subscription models → €3B market

DIGITAL WALLET ADOPTION
Consumer preference: 72% favor digital wallets
SMB acceptance: 89% support wallets
Growth rate: +24% YoY
Market leaders: PayPal (44%), Bizum (35%)

PAYMENT CHALLENGES FOR SMBS
- High payment processing fees (2.5-3.2%)
- Multi-channel complexity
- International payment friction
- Cash flow timing issues
- Fraud prevention costs

REVOLUT OPPORTUNITY
Target market: €21B (50% of TAM)
Unique value proposition:
- Lower fees (1.4-1.8%)
- Multi-currency support
- Instant settlements
- Integrated working capital

COMPETITIVE LANDSCAPE
Stripe: 12% market share
Square: 8%
Redsys (local): 38%
Banks: 28%
Others: 14%

REVENUE PROJECTION
Market penetration: 8% by 2028
Transaction volume: €1.7B
Revenue (1.5% take rate): €25M
Additional services: €8M
Total: €33M annual revenue

KEY SUCCESS FACTORS
- Spanish language & support
- Bizum integration
- Local payment methods
- SMB-friendly pricing
- Fast onboarding (<24h)`,
  },
  {
    id: 's356',
    title: 'Nordic Cross-Border Payment Market - TAM Assessment 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-MARKET-0005',
    fileType: 'xlsx',
    fileName: 'Nordic_CrossBorder_TAM_2026.xlsx',
    publishedAt: '2026-01-08',
    author: 'International Markets',
    excerpt: 'Nordic cross-border B2B payment volume €67B with strong intra-regional trade. Sweden leads at €28B (42%), followed by Denmark €18B (27%). Multi-currency management presents €34B addressable opportunity.',
    reliabilityScore: 92,
    content: `NORDIC CROSS-BORDER B2B PAYMENTS - TAM ANALYSIS 2026

REGIONAL OVERVIEW
Total Nordic Cross-Border: €67B (2026)
CAGR 2026-2028: 13%
Projected 2028: €85B

COUNTRY BREAKDOWN
Sweden: €28B (42%)
Denmark: €18B (27%)
Norway: €13B (19%)
Finland: €8B (12%)

PAYMENT CORRIDORS
Intra-Nordic: €34B (51%)
Nordic ↔ EU: €25B (37%)
Nordic ↔ UK: €5B (7%)
Nordic ↔ Other: €3B (5%)

BUSINESS SIZE SEGMENTS
Enterprise (>500 emp): €40B (60%)
Mid-market (50-500): €20B (30%)
SMB (<50): €7B (10%)

INDUSTRY VERTICALS
Manufacturing & exports: €23B (34%)
Technology & services: €17B (25%)
Retail & e-commerce: €13B (19%)
Energy & resources: €10B (15%)
Other: €4B (7%)

PAYMENT INFRASTRUCTURE
SWIFT payments: €37B (55%)
SEPA (EU corridor): €15B (22%)
Domestic rails: €10B (15%)
Fintech platforms: €5B (8%)

CURRENCY PAIRS
EUR/SEK: €18B (27%)
EUR/DKK: €12B (18%)
EUR/NOK: €9B (13%)
SEK/NOK: €7B (10%)
Other pairs: €21B (32%)

FX COST ANALYSIS
Average FX markup: 1.2%
Annual FX costs: €804M
Opportunity for savings: 50-70%

CROSS-BORDER CHALLENGES
- Currency volatility management
- Payment timing (2-3 days typical)
- High FX margins
- Reconciliation complexity
- Compliance requirements

DIGITAL ADOPTION
API-based platforms: 38%
Multi-currency accounts: 52%
Real-time FX: 29%
Automated hedging: 18%

GROWTH DRIVERS
1. E-commerce exports → +21% YoY
2. SaaS internationalization
3. Supply chain optimization
4. Remote work payments
5. Sustainable trade growth

COMPETITIVE LANDSCAPE
Traditional banks: 58%
- SEB: 15%
- Nordea: 14%
- Danske Bank: 12%
- Others: 17%

Fintech platforms: 22%
- Wise: 9%
- Revolut: 4%
- Currencies Direct: 3%
- Others: 6%

Payment services: 20%

REVOLUT OPPORTUNITY
Addressable market: €34B (50%)
Target segments:
- Tech exporters: €12B
- E-commerce businesses: €8B
- Service exporters: €10B
- Mid-market manufacturing: €4B

VALUE PROPOSITION
- 70% lower FX costs
- Same-day settlement
- 30+ currency support
- Automated hedging tools
- API integration

REVENUE MODEL
FX margin: 0.4-0.6%
Platform fees: €200-€2K monthly
Transaction fees: €2-€15
Total revenue opportunity: €95M

MARKET ENTRY STRATEGY
Phase 1: Sweden & Denmark (€46B)
Phase 2: Norway (€13B)
Phase 3: Finland (€8B)

SUCCESS METRICS
Year 1: 2% market share → €1.3B volume
Year 2: 5% market share → €3.4B volume
Year 3: 8% market share → €5.4B volume`,
  },

  // Financial Performance Documents (20 documents)
  {
    id: 's357',
    title: 'Revolut — Q4 2025 Financial Results & KPIs',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-FIN-0001',
    fileType: 'xlsx',
    fileName: 'Revolut_Q4_2025_Financial_Results.xlsx',
    publishedAt: '2026-01-25',
    author: 'CFO Office',
    excerpt: 'Q4 2025 revenue €892M (+48% YoY), EBITDA €124M (14% margin). Transaction volume €185B (+52%). Customer base 38M (+12M YoY). UK market revenue €312M, EU €445M, ROW €135M.',
    reliabilityScore: 96,
    content: `REVOLUT Q4 2025 FINANCIAL RESULTS

REVENUE PERFORMANCE
Total Revenue: €892M (+48% YoY)
Q3 2025: €758M
Q4 2024: €602M

Revenue by Geography:
UK: €312M (35%)
EU: €445M (50%)
Rest of World: €135M (15%)

Revenue by Stream:
Interchange & fees: €535M (60%)
FX & trading: €223M (25%)
Subscriptions: €89M (10%)
Interest income: €45M (5%)

PROFITABILITY
EBITDA: €124M (14% margin)
Q3 2025: €91M (12% margin)
Q4 2024: €54M (9% margin)

Operating Income: €67M
Net Income: €52M
Path to profitability achieved

TRANSACTION METRICS
Payment volume: €185B (+52% YoY)
- Card payments: €128B
- Transfers: €42B
- FX trades: €15B

Transaction count: 2.8B (+61%)
Average transaction: €66

CUSTOMER METRICS
Total customers: 38M (+12M YoY)
Monthly active: 22M (58%)
Paying subscribers: 4.2M (11%)

Customer acquisition:
Q4 new customers: 3.1M
CAC: €22
LTV: €420 (19x ratio)

SEGMENT PERFORMANCE

Retail Banking:
Revenue: €445M (50%)
Customers: 36M
Avg revenue/customer: €12.4/month

Business Banking:
Revenue: €312M (35%)
Business accounts: 1.8M
Avg revenue/account: €173/month

Premium & Metal:
Revenue: €89M (10%)
Subscribers: 4.2M
ARPU: €21/month

Trading & Crypto:
Revenue: €46M (5%)
Active traders: 3.4M
Avg revenue/trader: €13.5/month

REGIONAL DEEP DIVE

United Kingdom:
Revenue: €312M
Customers: 12M
Market penetration: 18%
YoY growth: 38%

France:
Revenue: €134M
Customers: 6.2M
Market penetration: 9%
YoY growth: 56%

Germany:
Revenue: €98M
Customers: 4.8M
Market penetration: 6%
YoY growth: 62%

Spain:
Revenue: €76M
Customers: 4.1M
Market penetration: 9%
YoY growth: 48%

BALANCE SHEET HIGHLIGHTS
Total assets: €18.2B
Customer deposits: €14.8B
Shareholders equity: €2.1B
Debt: €850M

CASH FLOW
Operating cash flow: €156M
Capex: €78M
Free cash flow: €78M

OPERATIONAL EFFICIENCY
Cost/income ratio: 86%
Tech spending: €124M (14% of revenue)
Headcount: 8,200 (+1,800 YoY)

KEY PERFORMANCE INDICATORS
Revenue per employee: €109K
EBITDA per employee: €15K
Customers per employee: 4,634

FORWARD GUIDANCE (2026)
Revenue: €3.8-€4.2B
EBITDA margin: 16-18%
Customer growth: 15-20M
Transaction volume: €850-€900B`,
  },
  {
    id: 's358',
    title: 'European Neobank Financial Benchmarking Q1 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-FIN-0002',
    fileType: 'pdf',
    fileName: 'European_Neobank_Benchmarking_Q1_2026.pdf',
    publishedAt: '2026-02-20',
    author: 'Financial Planning',
    excerpt: 'Comparative financial analysis: Revolut ARPU €23/month vs N26 €18, Monzo €16. Cost-to-serve: Revolut €8.2/customer vs N26 €11.4. Revenue growth: Revolut 48%, N26 32%, Monzo 28%. Profitability: Revolut achieved breakeven Q2 2025.',
    reliabilityScore: 94,
    content: `EUROPEAN NEOBANK FINANCIAL BENCHMARKING - Q1 2026

REVENUE COMPARISON
Revolut: €892M (Q4 2025)
N26: €385M (Q4 2025)
Monzo: €312M (Q4 2025)
Starling: €245M (Q4 2025)

ARPU ANALYSIS (Monthly)
Revolut: €23.4
N26: €17.8
Monzo: €15.6
Starling: €19.2
Trade Republic: €14.5

CUSTOMER ACQUISITION
Revolut:
- CAC: €22
- Payback period: 9 months
- LTV: €420
- LTV/CAC: 19x

N26:
- CAC: €28
- Payback period: 14 months
- LTV: €315
- LTV/CAC: 11x

Monzo:
- CAC: €18
- Payback period: 11 months
- LTV: €280
- LTV/CAC: 16x

COST-TO-SERVE (per customer/month)
Revolut: €8.20
N26: €11.40
Monzo: €9.80
Starling: €10.20

PROFITABILITY METRICS
Revolut:
- EBITDA margin: 14%
- Operating margin: 7.5%
- Breakeven: Q2 2025
- Net income: €52M (Q4)

N26:
- EBITDA margin: 4%
- Operating margin: -3%
- Path to profitability: H2 2026
- Net loss: €12M (Q4)

Monzo:
- EBITDA margin: 8%
- Operating margin: 2%
- Breakeven: Q3 2025
- Net income: €6M (Q4)

GROWTH RATES (YoY)
Revenue:
- Revolut: 48%
- N26: 32%
- Monzo: 28%
- Starling: 24%

Customers:
- Revolut: 46%
- N26: 38%
- Monzo: 31%
- Starling: 22%

REVENUE MIX
Revolut:
- Interchange: 60%
- FX: 25%
- Subscriptions: 10%
- Interest: 5%

N26:
- Interchange: 52%
- Subscriptions: 28%
- FX: 15%
- Other: 5%

Monzo:
- Interchange: 48%
- Lending: 32%
- Subscriptions: 14%
- Other: 6%

UNIT ECONOMICS
Transaction volume per customer (annual):
- Revolut: €4,868
- N26: €3,245
- Monzo: €2,890

Active usage rates:
- Revolut: 58%
- N26: 48%
- Monzo: 52%

MARKET SHARE (EU Payment Volume)
Revolut: 4.2%
N26: 1.8%
Monzo: 0.9% (UK only)
Starling: 1.1% (UK only)
Traditional banks: 87%

CAPITAL EFFICIENCY
Revenue per €1M funding:
- Revolut: €126K
- N26: €68K
- Monzo: €72K

Burn rate (monthly):
- Revolut: Cash positive
- N26: €8M
- Monzo: €2M

PRODUCT PENETRATION
Multi-product users:
- Revolut: 3.2 products/customer
- N26: 2.1 products/customer
- Monzo: 2.4 products/customer

Premium subscribers (%):
- Revolut: 11%
- N26: 8%
- Monzo: 6%

OPERATIONAL METRICS
Employees:
- Revolut: 8,200
- N26: 1,850
- Monzo: 2,400

Revenue per employee:
- Revolut: €109K
- N26: €208K
- Monzo: €130K

Tech spend (% revenue):
- Revolut: 14%
- N26: 22%
- Monzo: 18%`,
  },

  // Customer Analytics Documents (20 documents)
  {
    id: 's359',
    title: 'Revolut Business Customer Segmentation Analysis 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-CUST-0001',
    fileType: 'pdf',
    fileName: 'Revolut_Business_Customer_Segmentation_2026.pdf',
    publishedAt: '2026-02-05',
    author: 'Data Analytics Team',
    excerpt: 'Business customer base: 1.8M accounts across 4 segments. High-value SMBs (12% of base) generate 58% of revenue. Retention rates: Micro 76%, Small 84%, Mid-market 91%, Enterprise 94%. NRR: 118% overall.',
    reliabilityScore: 93,
    content: `REVOLUT BUSINESS - CUSTOMER SEGMENTATION ANALYSIS 2026

CUSTOMER BASE OVERVIEW
Total Business Accounts: 1.8M
Active accounts (>1 txn/month): 1.24M (69%)
Annual growth rate: 52%

SEGMENT BREAKDOWN

Micro Businesses (<€100K annual volume):
Accounts: 1.26M (70%)
Avg monthly revenue: €12
Retention rate: 76%
CAC: €18
LTV: €180

Small Businesses (€100K-€1M):
Accounts: 378K (21%)
Avg monthly revenue: €78
Retention rate: 84%
CAC: €145
LTV: €1,240

Mid-Market (€1M-€10M):
Accounts: 144K (8%)
Avg monthly revenue: €420
Retention rate: 91%
CAC: €850
LTV: €8,200

Enterprise (>€10M):
Accounts: 18K (1%)
Avg monthly revenue: €2,850
Retention rate: 94%
CAC: €12,500
LTV: €92,000

REVENUE CONTRIBUTION
Micro: €181M (15%)
Small: €354M (29%)
Mid-Market: €726M (58%)
Enterprise: €616M (50%)
Total Business Revenue: €1.24B (annualized)

HIGH-VALUE SEGMENT ANALYSIS
Definition: €500K+ annual volume
Size: 216K accounts (12%)
Revenue contribution: €720M (58%)
Product adoption: 4.8 products/account

Characteristics:
- 3+ years in business: 82%
- International transactions: 68%
- Multi-currency usage: 74%
- API integration: 42%
- Team cards: 88%

RETENTION METRICS
Overall retention (12-month): 82%
Cohort analysis:
- Year 1: 76%
- Year 2: 87%
- Year 3+: 92%

Churn reasons:
- Business closure: 38%
- Moved to bank: 24%
- Price sensitivity: 18%
- Service issues: 12%
- Other: 8%

NET REVENUE RETENTION
Overall NRR: 118%
By segment:
- Micro: 98%
- Small: 112%
- Mid-Market: 128%
- Enterprise: 142%

PRODUCT ADOPTION
Average products per account: 2.8

By product:
- Business account: 100%
- Corporate cards: 62%
- Multi-currency: 48%
- Expense management: 34%
- Accounting integration: 28%
- Invoicing: 18%
- Lending: 12%

GEOGRAPHIC DISTRIBUTION
UK: 540K accounts (30%)
France: 324K (18%)
Germany: 252K (14%)
Spain: 198K (11%)
Italy: 162K (9%)
Netherlands: 108K (6%)
Other EU: 216K (12%)

INDUSTRY VERTICALS
E-commerce: 396K (22%)
Professional services: 342K (19%)
Technology: 288K (16%)
Retail: 234K (13%)
Hospitality: 180K (10%)
Other: 360K (20%)

TRANSACTION BEHAVIOR
Monthly transactions per account:
- Micro: 38
- Small: 124
- Mid-Market: 486
- Enterprise: 2,240

Payment types:
- Domestic: 58%
- SEPA: 28%
- International: 14%

CUSTOMER LIFETIME VALUE
Total LTV pool: €12.4B
Average LTV: €6,889
LTV by acquisition channel:
- Organic: €8,450
- Paid marketing: €5,240
- Referral: €9,680
- Partnerships: €7,120

ENGAGEMENT METRICS
Daily active: 18%
Weekly active: 42%
Monthly active: 69%

Feature usage:
- Mobile app: 88%
- Web dashboard: 52%
- API: 12%

GROWTH OPPORTUNITIES
Upsell potential:
- Expense management: €145M
- Lending: €220M
- Premium tiers: €95M
- International expansion: €180M

Total expansion revenue: €640M`,
  },
  {
    id: 's360',
    title: 'SMB Customer Journey & Activation Metrics Q4 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-CUST-0002',
    fileType: 'xlsx',
    fileName: 'SMB_Customer_Journey_Activation_Q4_2025.xlsx',
    publishedAt: '2026-01-10',
    author: 'Customer Insights',
    excerpt: 'Onboarding funnel: 68% completion rate, 3.2 days average. First transaction within 7 days: 82%. Product activation: cards 91%, international payments 34%, team features 28%. 90-day retention strongly correlated with 3+ product usage.',
    reliabilityScore: 92,
    content: `SMB CUSTOMER JOURNEY & ACTIVATION ANALYSIS - Q4 2025

ACQUISITION FUNNEL
Landing page visitors: 2.4M
Sign-up initiated: 840K (35%)
KYB submitted: 588K (70%)
Account approved: 504K (86%)
First deposit: 420K (83%)
First transaction: 378K (90%)

Overall conversion: 15.8%

ONBOARDING METRICS
Average completion time: 3.2 days
Median: 1.8 days

Approval rates:
- Instant approval: 62%
- Manual review: 32%
- Rejected: 6%

Rejection reasons:
- Incomplete docs: 48%
- Regulatory flags: 32%
- Business type: 20%

FIRST TRANSACTION ANALYSIS
Within 24 hours: 28%
Within 7 days: 82%
Within 30 days: 94%

First transaction type:
- Domestic payment: 52%
- Card payment: 28%
- Currency exchange: 12%
- International transfer: 8%

PRODUCT ACTIVATION (90 days)
Business account: 100%
Corporate cards: 91%
Multi-currency wallets: 48%
International payments: 34%
Expense management: 28%
Team accounts: 28%
Accounting sync: 18%
Invoicing: 12%

ACTIVATION COHORTS
1-product users: 18%
2-product users: 32%
3-product users: 28%
4+ product users: 22%

RETENTION BY ACTIVATION
1 product:
- 30-day: 68%
- 90-day: 52%
- 180-day: 38%

2 products:
- 30-day: 84%
- 90-day: 76%
- 180-day: 68%

3+ products:
- 30-day: 94%
- 90-day: 88%
- 180-day: 84%

USAGE PATTERNS (First 90 days)
Average transactions: 142
Average volume: €12,450
Average revenue: €112

High-engagement (top 20%):
- Transactions: 420+
- Volume: €45K+
- Revenue: €380+
- Retention: 96%

BEHAVIORAL TRIGGERS
Team cards activated → +32% retention
International payment → +28% retention
Accounting integration → +42% retention
3+ monthly logins → +38% retention

TIME TO VALUE
First successful payment: 1.2 hours avg
First card transaction: 2.8 days avg
First FX trade: 4.2 days avg
First team member added: 8.4 days avg

ENGAGEMENT MILESTONES
Week 1: Account setup + first payment
Week 2: Team setup + card orders
Week 4: Multi-currency activation
Week 8: Accounting integration
Week 12: Advanced features

SUPPORT INTERACTIONS
First 30 days contacts: 42%
Issue resolution time: 4.2 hours
CSAT score: 4.2/5

Common questions:
- Card activation: 28%
- Payment limits: 22%
- FX rates: 18%
- Team setup: 16%
- Integrations: 16%

CONVERSION OPTIMIZATION
Onboarding optimizations:
- Simplified KYB: +12% completion
- Instant verification: +18% conversion
- In-app guidance: +24% activation

A/B test results:
- Personalized onboarding: +15% retention
- Product recommendations: +22% cross-sell
- Early engagement emails: +18% usage

PREDICTIVE METRICS
Churn risk indicators:
- <10 txns in month 2: 68% churn risk
- No team setup by week 8: 54% risk
- Single product after 90 days: 62% risk

Success indicators:
- 50+ txns/month: 92% retention
- Team cards active: 88% retention
- Accounting sync: 94% retention`,
  },

  // Competitive Intelligence (15 documents)
  {
    id: 's361',
    title: 'Stripe vs Revolut Business - Feature Comparison 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-STRIPE-0001',
    fileType: 'pdf',
    fileName: 'Stripe_Revolut_Feature_Comparison_2026.pdf',
    publishedAt: '2026-02-15',
    author: 'Competitive Intelligence',
    excerpt: 'Head-to-head comparison: Stripe payment processing coverage 46 countries vs Revolut 38. API maturity: Stripe leader (95 score), Revolut strong (82). Pricing: Revolut 30% lower for FX, Stripe competitive for pure payment processing.',
    reliabilityScore: 91,
    content: `STRIPE VS REVOLUT BUSINESS - COMPETITIVE ANALYSIS 2026

MARKET POSITIONING
Stripe: Payment infrastructure platform
Revolut: Business banking + payments

Target customers:
Stripe: Online businesses, platforms, SaaS
Revolut: SMBs, cross-border businesses, fintechs

GEOGRAPHIC COVERAGE
Stripe: 46 countries
Revolut: 38 countries (EU focus)

Overlap markets: 32
Stripe exclusive: 14 (APAC, LATAM)
Revolut exclusive: 6 (EEA expansion)

PAYMENT PROCESSING
Stripe:
- Card processing: 135+ currencies
- Payment methods: 100+
- Success rate: 96%
- Processing fee: 1.4% + €0.25
- International: +1.5%

Revolut:
- Card processing: 28 currencies
- Payment methods: 45+
- Success rate: 94%
- Processing fee: 1.2% + €0.20
- International: +0.5%

API & DEVELOPER TOOLS
Stripe:
- API maturity: 95/100
- Documentation: Excellent
- SDKs: 12 languages
- Webhooks: Advanced
- Testing: Comprehensive
- Community: 500K+ developers

Revolut:
- API maturity: 82/100
- Documentation: Good
- SDKs: 8 languages
- Webhooks: Standard
- Testing: Good
- Community: 45K+ developers

BANKING FEATURES
Revolut advantages:
- Multi-currency accounts
- Corporate cards
- Expense management
- Team budgets
- Accounting integrations
- Real-time FX

Stripe advantages:
- Treasury (beta)
- Issuing (cards)
- Payment links
- Checkout optimization
- Subscription billing

FX & INTERNATIONAL
Revolut:
- FX spread: 0.4-0.6%
- Same-day settlement
- 28 currencies held
- Auto-convert options
- Hedging tools

Stripe:
- FX spread: 1.5-2%
- Standard settlement
- Auto-convert only
- Limited hedging

PRICING COMPARISON (€1M monthly)
Stripe:
- Card processing: €14,250
- International: +€3,500
- FX costs: €12,000
- Total: €29,750/month

Revolut:
- Card processing: €12,200
- International: +€1,000
- FX costs: €4,500
- Total: €17,700/month

Savings: €12,050/month (41%)

INTEGRATION COMPLEXITY
Stripe:
- Setup time: 2-4 hours
- Developer resources: 1 eng
- Maintenance: Low
- Migration: Easy

Revolut:
- Setup time: 4-8 hours
- Developer resources: 1-2 eng
- Maintenance: Medium
- Migration: Moderate

CUSTOMER SUPPORT
Stripe:
- 24/7 chat: Yes
- Phone: Priority only
- Response time: 4 hours
- Account manager: $100K+ spend

Revolut:
- 24/7 chat: Yes
- Phone: Business plans
- Response time: 6 hours
- Account manager: €50K+ spend

COMPLIANCE & SECURITY
Both:
- PCI DSS Level 1
- Strong authentication
- Fraud detection
- Data encryption

Stripe advantages:
- Global compliance team
- Radar (fraud ML)
- Mature risk tools

Revolut advantages:
- Banking license
- Regulatory experience
- EU-first approach

FEATURE SCORECARD (0-100)
Payment processing:
- Stripe: 95
- Revolut: 85

Developer experience:
- Stripe: 98
- Revolut: 78

Banking features:
- Stripe: 45
- Revolut: 92

FX & international:
- Stripe: 65
- Revolut: 94

Pricing value:
- Stripe: 75
- Revolut: 88

Support:
- Stripe: 88
- Revolut: 82

IDEAL CUSTOMER PROFILE
Stripe best for:
- E-commerce platforms
- SaaS with subscriptions
- Marketplaces
- Complex payment flows
- Developer-first teams

Revolut best for:
- Cross-border businesses
- Multi-currency operations
- SMBs with banking needs
- Cost-conscious companies
- EU-focused businesses

MARKET SHARE (EU SMB)
Stripe: 12%
Revolut Business: 8%
Traditional banks: 68%
Others: 12%

GROWTH RATES (YoY)
Stripe: 28%
Revolut Business: 52%`,
  },
  {
    id: 's362',
    title: 'Italy Digital Payment Market TAM - Regional Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-MARKET-0006',
    fileType: 'xlsx',
    fileName: 'Italy_Digital_Payment_TAM_Regional_2026.xlsx',
    publishedAt: '2025-12-15',
    author: 'Market Research',
    excerpt: 'Italy digital payment TAM €89B with 17% CAGR. Northern regions dominate: Lombardy €28B, Veneto €14B. Cash-to-digital transition accelerating, addressable market €45B for neobanks. SMB segment €34B opportunity.',
    reliabilityScore: 90,
  },
  {
    id: 's363',
    title: 'BeNeLux Cross-Border SMB Market Assessment 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-MARKET-0007',
    fileType: 'pdf',
    fileName: 'BeNeLux_CrossBorder_SMB_Assessment_2025.pdf',
    publishedAt: '2025-11-05',
    author: 'International Markets',
    excerpt: 'BeNeLux cross-border SMB payment volume €38B. High intra-regional trade: 62% of transactions. Netherlands leads at €18B (47%), Belgium €13B, Luxembourg €7B. CAGR 15% driven by e-commerce exports.',
    reliabilityScore: 91,
  },
  {
    id: 's364',
    title: 'Poland Emerging Market TAM - Growth Forecast 2026-2028',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-MARKET-0008',
    fileType: 'xlsx',
    fileName: 'Poland_Emerging_TAM_Forecast_2026_2028.xlsx',
    publishedAt: '2026-01-20',
    author: 'Emerging Markets Team',
    excerpt: 'Poland payment market €52B (2026) growing at 21% CAGR to €91B (2028). Digital penetration 54%, significant upside. Warsaw metro €18B, increasing urbanization drives fintech adoption. Young demographic favors neobanks.',
    reliabilityScore: 89,
  },
  {
    id: 's365',
    title: 'European Subscription Economy - Payment Volume Analysis 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-MARKET-0009',
    fileType: 'pdf',
    fileName: 'European_Subscription_Economy_Payment_2026.pdf',
    publishedAt: '2026-02-01',
    author: 'Sector Analysis Team',
    excerpt: 'European subscription businesses payment volume €125B with 23% CAGR. SaaS leads at €58B, media €32B, e-commerce €35B. Recurring billing complexity creates €62B addressable market for specialized payment platforms.',
    reliabilityScore: 92,
  },
  {
    id: 's366',
    title: 'UK Freelance & Gig Economy Payment TAM 2025-2027',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-MARKET-0010',
    fileType: 'xlsx',
    fileName: 'UK_Freelance_GigEconomy_TAM_2025_2027.xlsx',
    publishedAt: '2025-10-10',
    author: 'Market Intelligence',
    excerpt: 'UK freelance payment flows €67B growing at 18% CAGR. 5.1M freelancers, 42% cross-border income. Pain points: high FX fees, slow payments, poor accounting integration. Addressable opportunity €34B for business banking solutions.',
    reliabilityScore: 88,
  },
  {
    id: 's367',
    title: 'Germany B2B E-commerce Payment Volume Study 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-MARKET-0011',
    fileType: 'pdf',
    fileName: 'Germany_B2B_Ecommerce_Payment_2026.pdf',
    publishedAt: '2026-01-28',
    author: 'Commercial Strategy Team',
    excerpt: 'Germany B2B e-commerce payments €145B, CAGR 16%. Industrial segments lead: manufacturing €52B, wholesale €38B, logistics €28B. Digital transformation lags B2C but accelerating. Invoice-to-cash optimization €72B opportunity.',
    reliabilityScore: 93,
  },
  {
    id: 's368',
    title: 'France Retail Banking Disruption - Market Size 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-SIZE-0012',
    fileType: 'xlsx',
    fileName: 'France_Retail_Banking_Disruption_TAM_2026.xlsx',
    publishedAt: '2025-12-20',
    author: 'Market Research',
    excerpt: 'France retail banking revenue pool €142B. Neobank penetration 12% (€17B), traditional banks 88%. Payment services €45B, lending €62B, wealth €35B. Neobank growth 35% YoY vs traditional 3%. Market share opportunity: 25% by 2028.',
    reliabilityScore: 91,
  },
  {
    id: 's369',
    title: 'European SMB Lending Market - Embedded Finance TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-MARKET-0013',
    fileType: 'pdf',
    fileName: 'European_SMB_Lending_Embedded_TAM_2026.pdf',
    publishedAt: '2026-02-10',
    author: 'Product Strategy',
    excerpt: 'European embedded SMB lending TAM €285B. Fintech penetration 8%, traditional lenders 92%. Working capital loans €142B, invoice financing €89B, equipment €54B. Embedded in payment platforms: €23B but growing 42% CAGR.',
    reliabilityScore: 90,
  },
  {
    id: 's370',
    title: 'Spain & Portugal Iberian Market Opportunity Assessment 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-MARKET-0014',
    fileType: 'xlsx',
    fileName: 'Spain_Portugal_Iberian_Opportunity_2025.xlsx',
    publishedAt: '2025-11-15',
    author: 'Regional Strategy',
    excerpt: 'Iberian Peninsula combined payment market €156B. Spain €112B (72%), Portugal €44B (28%). Digital penetration: Spain 68%, Portugal 62%. Cross-border trade €28B. Addressable neobank opportunity €78B with localization.',
    reliabilityScore: 89,
  },
  {
    id: 's371',
    title: 'European Crypto Trading Volume - Market Analysis Q4 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-CRYPTO-0015',
    fileType: 'pdf',
    fileName: 'European_Crypto_Trading_Volume_Q4_2025.pdf',
    publishedAt: '2026-01-05',
    author: 'Digital Assets Team',
    excerpt: 'European retail crypto trading volume €94B (Q4 2025), annualized €376B. UK leads €142B, Germany €89B, France €78B. Neobank-integrated trading: €38B (10%) growing at 68% CAGR. Revenue opportunity €1.5B in trading fees.',
    reliabilityScore: 87,
  },
  {
    id: 's372',
    title: 'UK Mid-Market Treasury Management TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-MARKET-0016',
    fileType: 'xlsx',
    fileName: 'UK_MidMarket_Treasury_TAM_2026.xlsx',
    publishedAt: '2026-02-08',
    author: 'Enterprise Solutions',
    excerpt: 'UK mid-market treasury payment volume €118B. Cash management €67B, FX hedging €34B, liquidity optimization €17B. Software-as-a-Service treasury platforms: €12B market growing 28% annually. Neobank opportunity €35B.',
    reliabilityScore: 92,
  },
  {
    id: 's373',
    title: 'European Platform Economy - Payment Infrastructure TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-PLATFORM-0017',
    fileType: 'pdf',
    fileName: 'European_Platform_Economy_Payment_TAM_2026.pdf',
    publishedAt: '2026-01-18',
    author: 'Platform Strategy',
    excerpt: 'European marketplace payment volume €445B with split payments, escrow, multi-party flows. Gig platforms €125B, e-commerce marketplaces €218B, service platforms €102B. Complex payment routing creates €89B specialized infrastructure opportunity.',
    reliabilityScore: 91,
  },
  {
    id: 's374',
    title: 'Germany Wealth Management Digitization - Market Size 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-WEALTH-0018',
    fileType: 'xlsx',
    fileName: 'Germany_Wealth_Management_Digital_2026.xlsx',
    publishedAt: '2025-12-10',
    author: 'Wealth Solutions',
    excerpt: 'Germany digital wealth management AUM €385B growing at 19% CAGR. Robo-advisors €52B, hybrid models €142B, self-directed €191B. Millennial wealth transfer drives digitization. Neobank wealth integration: €78B opportunity.',
    reliabilityScore: 88,
  },
  {
    id: 's375',
    title: 'France Insurance Distribution - Embedded Fintech TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-INSURANCE-0019',
    fileType: 'pdf',
    fileName: 'France_Insurance_Embedded_TAM_2026.pdf',
    publishedAt: '2026-02-05',
    author: 'Insurance Partnerships',
    excerpt: 'France embedded insurance premium €28B. Business insurance €12B, travel €8B, device €5B, other €3B. Neobank distribution channel growing 52% YoY. Penetration rate 8%, target 25%. Revenue opportunity €420M in commissions.',
    reliabilityScore: 87,
  },
  {
    id: 's376',
    title: 'Eastern Europe Digital Banking Market - Growth Forecast 2025-2028',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-EE-0020',
    fileType: 'xlsx',
    fileName: 'Eastern_Europe_Digital_Banking_Forecast_2025_2028.xlsx',
    publishedAt: '2025-11-28',
    author: 'Emerging Markets',
    excerpt: 'Eastern Europe (Poland, Czech, Romania, Hungary) digital banking TAM €78B growing at 24% CAGR. Young populations, smartphone-first, low legacy. Poland €34B, Czech €18B, Romania €16B, Hungary €10B. Neobank opportunity €39B.',
    reliabilityScore: 89,
  },
  {
    id: 's377',
    title: 'UK Open Banking Payment Volumes - Regulatory Impact 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-OPENBANKING-0021',
    fileType: 'pdf',
    fileName: 'UK_Open_Banking_Payment_Volumes_2026.pdf',
    publishedAt: '2026-01-22',
    author: 'Regulatory Affairs',
    excerpt: 'UK Open Banking payment volume €45B (2026), projected €128B by 2028 (35% CAGR). Account-to-account payments bypassing cards. E-commerce adoption 18%, bill payments 24%. Variable Recurring Payments: €12B opportunity.',
    reliabilityScore: 93,
  },
  {
    id: 's378',
    title: 'European SaaS Companies - Payment Infrastructure TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-SAAS-0022',
    fileType: 'xlsx',
    fileName: 'European_SaaS_Payment_Infrastructure_2026.xlsx',
    publishedAt: '2026-02-12',
    author: 'Vertical Strategy',
    excerpt: 'European B2B SaaS subscription payments €78B. Recurring billing €58B, usage-based €14B, hybrid €6B. Payment infrastructure challenges: dunning, localization, tax compliance. Specialized platforms addressable market €39B.',
    reliabilityScore: 90,
  },
  {
    id: 's379',
    title: 'Nordic Sustainability Finance - Green Payment TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-SUSTAINABILITY-0023',
    fileType: 'pdf',
    fileName: 'Nordic_Sustainability_Finance_Green_TAM_2026.pdf',
    publishedAt: '2025-12-05',
    author: 'Sustainability Team',
    excerpt: 'Nordic green finance payment flows €52B. Carbon offset payments €8B, sustainable procurement €28B, green bonds €16B. ESG reporting integration drives 31% CAGR. Neobank sustainability features: €26B addressable market.',
    reliabilityScore: 86,
  },
  {
    id: 's380',
    title: 'Netherlands Corporate Card Market - Segment Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-CARDS-0024',
    fileType: 'xlsx',
    fileName: 'Netherlands_Corporate_Card_Market_2026.xlsx',
    publishedAt: '2026-01-30',
    author: 'Cards Strategy',
    excerpt: 'Netherlands corporate card spend €24B. Virtual cards growing 48% YoY to €8B. SMB segment €12B, mid-market €9B, enterprise €3B. Expense management integration drives adoption. Fintech card programs: €7B opportunity.',
    reliabilityScore: 91,
  },
  {
    id: 's381',
    title: 'European Remittance Corridor - P2P Payment TAM 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-REMITTANCE-0025',
    fileType: 'pdf',
    fileName: 'European_Remittance_P2P_TAM_2025.pdf',
    publishedAt: '2025-10-25',
    author: 'Consumer Payments',
    excerpt: 'European inbound remittance flows €156B annually. Top corridors: UK-India €28B, Germany-Turkey €18B, France-Morocco €14B. Traditional providers 68% share, digital 32%. Neobank remittance opportunity €50B with lower fees.',
    reliabilityScore: 88,
  },

  // Additional Financial Performance (s382-s391)
  {
    id: 's382',
    title: 'Revolut — Regional P&L Breakdown FY2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-FIN-0003',
    fileType: 'xlsx',
    fileName: 'Revolut_Regional_PnL_FY2025.xlsx',
    publishedAt: '2026-01-31',
    author: 'CFO Office',
    excerpt: 'FY2025 regional profitability: UK €145M EBITDA (18% margin), EU €98M (12%), ROW -€24M (-9%). UK market mature, EU scaling efficiently, ROW investment phase. Consolidated EBITDA €219M (13% margin).',
    reliabilityScore: 95,
  },
  {
    id: 's383',
    title: 'Business Banking Unit Economics - Cohort Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-FIN-0004',
    fileType: 'pdf',
    fileName: 'Business_Banking_Unit_Economics_2026.pdf',
    publishedAt: '2026-02-18',
    author: 'Finance Team',
    excerpt: 'Business banking unit economics by cohort: 2023 LTV €6,240, 2024 €7,180, 2025 €8,450. CAC improvement: 2023 €210, 2024 €165, 2025 €145. Payback period compressed from 14 months to 9 months. NRR steady at 118%.',
    reliabilityScore: 94,
  },
  {
    id: 's384',
    title: 'Revolut Premium Tier Performance - Subscription Metrics Q4 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-FIN-0005',
    fileType: 'xlsx',
    fileName: 'Revolut_Premium_Subscription_Q4_2025.xlsx',
    publishedAt: '2026-01-12',
    author: 'Product Finance',
    excerpt: 'Premium subscription revenue €89M (Q4). Subscriber base: Plus 2.8M (€6.99/mo), Premium 1.2M (€13.99/mo), Metal 210K (€45/mo). Churn rates: Plus 4.2%, Premium 2.8%, Metal 1.8%. Upsell conversion: 8.4% quarterly.',
    reliabilityScore: 93,
  },
  {
    id: 's385',
    title: 'Operating Expense Analysis - Cost Structure Breakdown FY2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-FIN-0006',
    fileType: 'pdf',
    fileName: 'Operating_Expense_Structure_FY2025.pdf',
    publishedAt: '2026-02-02',
    author: 'Financial Planning',
    excerpt: 'FY2025 OpEx €1.82B: Personnel €895M (49%), Technology €312M (17%), Marketing €285M (16%), Operations €228M (12%), Other €100M (6%). Cost/income ratio improved from 94% to 86%. Target 80% by 2027.',
    reliabilityScore: 95,
  },
  {
    id: 's386',
    title: 'Customer Acquisition Cost Trends - Channel Analysis 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-FIN-0007',
    fileType: 'xlsx',
    fileName: 'CAC_Trends_Channel_Analysis_2025.xlsx',
    publishedAt: '2026-01-20',
    author: 'Growth Team',
    excerpt: 'Blended CAC €22 (2025) down from €28 (2024). By channel: Organic €8, Referral €12, Paid social €32, SEM €45, Partnerships €18. Organic share increased 42% to 58%. Referral program ROI 8.2x.',
    reliabilityScore: 92,
  },
  {
    id: 's387',
    title: 'Transaction Economics - Revenue Per Transaction Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-FIN-0008',
    fileType: 'pdf',
    fileName: 'Transaction_Economics_RPT_2026.pdf',
    publishedAt: '2026-02-14',
    author: 'Analytics Team',
    excerpt: 'Average revenue per transaction: Card €0.42, FX €2.85, International transfer €8.20, Crypto trade €4.50. Volume-weighted RPT €0.68. High-value transactions (>€1K) generate 62% of revenue from 18% of volume.',
    reliabilityScore: 91,
  },
  {
    id: 's388',
    title: 'Revolut Valuation Benchmarking - Peer Comparison Q1 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-FIN-0009',
    fileType: 'xlsx',
    fileName: 'Revolut_Valuation_Benchmarking_Q1_2026.xlsx',
    publishedAt: '2026-02-25',
    author: 'Corporate Development',
    excerpt: 'Revolut implied valuation multiples: 9.5x revenue (vs Stripe 8.2x, N26 5.4x), 68x EBITDA (vs Monzo 52x, Starling 45x). Public comps: SoFi 4.2x, Nu 6.8x. Premium justified by growth (48%) and profitability.',
    reliabilityScore: 94,
  },
  {
    id: 's389',
    title: 'Working Capital Management - Cash Conversion Analysis 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-FIN-0010',
    fileType: 'pdf',
    fileName: 'Working_Capital_Cash_Conversion_2025.pdf',
    publishedAt: '2026-01-28',
    author: 'Treasury',
    excerpt: 'Cash conversion cycle: -12 days (negative working capital advantage). Float income €45M from customer deposits. Regulatory capital requirements €420M. Liquidity ratio 145%. Operating cash flow €624M (FY2025).',
    reliabilityScore: 93,
  },
  {
    id: 's390',
    title: 'Technology Infrastructure Costs - Cloud & Platform Spend 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-FIN-0011',
    fileType: 'xlsx',
    fileName: 'Technology_Infrastructure_Costs_2025.xlsx',
    publishedAt: '2026-02-08',
    author: 'Engineering Finance',
    excerpt: 'Technology spend €312M (FY2025): Cloud infrastructure €145M (AWS 62%, GCP 28%, Azure 10%), data storage €52M, security €38M, tooling €42M, other €35M. Cost per transaction €0.11, improving 18% YoY.',
    reliabilityScore: 92,
  },
  {
    id: 's391',
    title: 'Regulatory Capital Requirements - Basel III Impact Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-FIN-0012',
    fileType: 'pdf',
    fileName: 'Regulatory_Capital_Basel_Impact_2026.pdf',
    publishedAt: '2026-02-16',
    author: 'Risk & Compliance',
    excerpt: 'Minimum regulatory capital: €420M (CET1 ratio 14.2%). Risk-weighted assets €2.95B. Capital buffer €185M above minimum. Lending portfolio capital charge €68M. Projected requirement 2027: €580M with business growth.',
    reliabilityScore: 94,
  },

  // Additional Customer Analytics (s392-s401)
  {
    id: 's392',
    title: 'Customer Lifetime Value Analysis - Cohort Deep Dive 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-CUST-0003',
    fileType: 'xlsx',
    fileName: 'Customer_LTV_Cohort_Analysis_2026.xlsx',
    publishedAt: '2026-02-10',
    author: 'Customer Analytics',
    excerpt: 'LTV by acquisition year: 2020 cohort €485, 2021 €520, 2022 €580, 2023 €640, 2024 €720, 2025 €810. Improvement driven by multi-product adoption (+3.2 products avg), premium tier migration (+18% conversion), engagement (+42%).',
    reliabilityScore: 93,
  },
  {
    id: 's393',
    title: 'Product Cross-Sell Patterns - Attachment Rate Analysis 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-CUST-0004',
    fileType: 'pdf',
    fileName: 'Product_CrossSell_Attachment_2025.pdf',
    publishedAt: '2026-01-15',
    author: 'Product Analytics',
    excerpt: 'Cross-sell attachment rates: Account holders → Cards 91%, → FX 48%, → Premium 11%, → Crypto 18%, → Savings 34%. Bundles: Cards+FX 44%, Premium+Crypto 28%. Tri-product users retention 88% vs single-product 54%.',
    reliabilityScore: 92,
  },
  {
    id: 's394',
    title: 'Customer Satisfaction & NPS Benchmarking Q4 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-CUST-0005',
    fileType: 'xlsx',
    fileName: 'Customer_Satisfaction_NPS_Q4_2025.xlsx',
    publishedAt: '2026-01-08',
    author: 'Customer Experience',
    excerpt: 'NPS score 52 (Q4 2025), up from 48 (Q3). Promoters 62%, Passives 28%, Detractors 10%. By segment: Premium 68, Standard 48, Business 58. Top drivers: ease of use (87%), FX rates (82%), customer support improved to 74%.',
    reliabilityScore: 91,
  },
  {
    id: 's395',
    title: 'User Engagement Patterns - Activity Segmentation 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-CUST-0006',
    fileType: 'pdf',
    fileName: 'User_Engagement_Activity_Segmentation_2026.pdf',
    publishedAt: '2026-02-12',
    author: 'Behavioral Analytics',
    excerpt: 'Engagement tiers: Power users 12% (>20 txns/month), Active 46% (5-20 txns), Casual 28% (<5 txns), Dormant 14%. Power users contribute 58% revenue. Activation triggers: international payment (+42% engagement), team setup (+38%).',
    reliabilityScore: 90,
  },
  {
    id: 's396',
    title: 'Churn Analysis & Retention Drivers - Predictive Model 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-CUST-0007',
    fileType: 'xlsx',
    fileName: 'Churn_Analysis_Retention_Drivers_2026.xlsx',
    publishedAt: '2026-01-25',
    author: 'Data Science Team',
    excerpt: 'Churn predictors: <3 txns in 30 days (78% churn risk), single product user (64%), no mobile app login 60 days (82%). Retention drivers: 3+ products (-68% churn), premium tier (-52%), monthly direct deposit (-71%).',
    reliabilityScore: 92,
  },
  {
    id: 's397',
    title: 'Geographic Customer Concentration - Market Penetration 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-CUST-0008',
    fileType: 'pdf',
    fileName: 'Geographic_Customer_Concentration_2025.pdf',
    publishedAt: '2025-12-20',
    author: 'Market Intelligence',
    excerpt: 'Customer concentration: UK 31.6% (12M users, 18% penetration), France 16.3%, Germany 12.6%, Spain 10.8%, Italy 8.5%. London metro 22% of UK users. Urban centers drive 68% of customer base. Rural penetration 8%.',
    reliabilityScore: 91,
  },
  {
    id: 's398',
    title: 'Premium Tier Migration & Upgrade Patterns Q4 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-CUST-0009',
    fileType: 'xlsx',
    fileName: 'Premium_Migration_Upgrade_Patterns_Q4_2025.xlsx',
    publishedAt: '2026-01-18',
    author: 'Monetization Team',
    excerpt: 'Upgrade funnel: Standard → Plus 8.2%, Plus → Premium 12.4%, Premium → Metal 4.8%. Downgrade rate: 2.1% quarterly. Triggers: international travel (+42%), FX usage >€500/mo (+38%), business account (+28%). Retention post-upgrade: 94%.',
    reliabilityScore: 93,
  },
  {
    id: 's399',
    title: 'Business Customer Concentration Risk - Top 100 Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-CUST-0010',
    fileType: 'pdf',
    fileName: 'Business_Customer_Concentration_Risk_2026.pdf',
    publishedAt: '2026-02-05',
    author: 'Risk Management',
    excerpt: 'Top 100 business accounts: €142M annual revenue (11% of business revenue). Largest account €4.2M, top 10 avg €8.5M. Industry concentration: Tech 28%, E-commerce 24%, Professional services 18%. Churn risk mitigation: dedicated support.',
    reliabilityScore: 92,
  },
  {
    id: 's400',
    title: 'Referral Program Economics & Viral Coefficient 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-CUST-0011',
    fileType: 'xlsx',
    fileName: 'Referral_Program_Economics_2025.xlsx',
    publishedAt: '2026-01-22',
    author: 'Growth Analytics',
    excerpt: 'Referral metrics: viral coefficient 1.42, 34% of new users from referrals. Referrer incentive €10-€50, referee €10. CAC referred users €12 vs paid €45. Referred user LTV €680 vs organic €420. 6-month retention 82% vs 68%.',
    reliabilityScore: 91,
  },
  {
    id: 's401',
    title: 'Customer Support Ticket Analysis - Issue Categories 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-CUST-0012',
    fileType: 'pdf',
    fileName: 'Support_Ticket_Issue_Categories_2026.pdf',
    publishedAt: '2026-02-15',
    author: 'Customer Operations',
    excerpt: 'Monthly tickets: 385K avg. Categories: Card issues 28%, FX questions 22%, Account access 18%, Payment failures 14%, Feature requests 10%, Other 8%. Resolution time: 4.2 hours avg. Self-service resolution: 58%. CSAT 4.2/5.',
    reliabilityScore: 90,
  },

  // Additional Competitive Intelligence (s402-s416)
  {
    id: 's402',
    title: 'N26 vs Revolut - Market Position Comparison Germany 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-N26-0001',
    fileType: 'pdf',
    fileName: 'N26_Revolut_Germany_Comparison_2026.pdf',
    publishedAt: '2026-02-20',
    author: 'Competitive Intelligence',
    excerpt: 'Germany market share: N26 6.2% (4.8M users), Revolut 4.8% (3.7M users). N26 home market advantage, local brand. Revolut feature breadth: 4.2 products/user vs N26 2.8. Pricing: N26 premium focus, Revolut volume strategy.',
    reliabilityScore: 91,
  },
  {
    id: 's403',
    title: 'Wise Transfer Volume & Pricing Benchmarking 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-COMP-WISE-0002',
    fileType: 'xlsx',
    fileName: 'Wise_Transfer_Volume_Pricing_2026.xlsx',
    publishedAt: '2026-01-28',
    author: 'Competitive Analysis',
    excerpt: 'Wise international transfer volume €89B annually vs Revolut €24B. Wise FX spread 0.35-0.45% vs Revolut 0.4-0.6%. Wise transparency advantage but Revolut broader product suite drives stickiness. Overlap customer segment: 18%.',
    reliabilityScore: 90,
  },
  {
    id: 's404',
    title: 'Monzo UK Market Leadership - Competitive Dynamics 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-MONZO-0003',
    fileType: 'pdf',
    fileName: 'Monzo_UK_Market_Leadership_2026.pdf',
    publishedAt: '2026-02-08',
    author: 'UK Market Strategy',
    excerpt: 'UK neobank market: Revolut 12M users (18% penetration), Monzo 8.2M (12%), Starling 4.1M (6%). Monzo community strength, current account primary usage 72%. Revolut multi-product: 3.8 avg vs Monzo 2.1. Revenue: Revolut €312M, Monzo €185M.',
    reliabilityScore: 92,
  },
  {
    id: 's405',
    title: 'Traditional Banks Digital Transformation - Competitive Threat 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-COMP-BANKS-0004',
    fileType: 'xlsx',
    fileName: 'Traditional_Banks_Digital_Threat_2026.xlsx',
    publishedAt: '2026-01-15',
    author: 'Market Research',
    excerpt: 'Traditional bank digital investments €45B (2025). HSBC, Barclays, BNP digital user growth 22% YoY. App parity improving but legacy tech burden. Neobank advantages: speed (4x faster), fees (60% lower), UX (NPS +24 points).',
    reliabilityScore: 89,
  },
  {
    id: 's406',
    title: 'Embedded Finance Competition - Banking-as-a-Service Threat 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-EMBEDDED-0005',
    fileType: 'pdf',
    fileName: 'Embedded_Finance_BaaS_Threat_2026.pdf',
    publishedAt: '2026-02-18',
    author: 'Strategic Planning',
    excerpt: 'BaaS providers (Stripe, Adyen, Railsr) enable fintech features in non-financial apps. Market €12B growing 68% CAGR. Threat: commoditization of banking. Revolut response: API platform, partnership model, white-label offerings.',
    reliabilityScore: 88,
  },
  {
    id: 's407',
    title: 'Crypto Exchange Competition - Coinbase vs Revolut 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-COMP-CRYPTO-0006',
    fileType: 'xlsx',
    fileName: 'Crypto_Exchange_Competition_2026.xlsx',
    publishedAt: '2026-02-10',
    author: 'Digital Assets',
    excerpt: 'European crypto trading: Coinbase €142B volume, Binance €98B (regulatory challenges), Revolut €38B. Revolut advantage: integrated banking, 3.4M crypto users. Coinbase: depth, advanced trading. Revolut crypto revenue €46M vs Coinbase €285M.',
    reliabilityScore: 87,
  },
  {
    id: 's408',
    title: 'PayPal Business Services - Competitive Overlap Analysis 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-PAYPAL-0007',
    fileType: 'pdf',
    fileName: 'PayPal_Business_Services_Competition_2026.pdf',
    publishedAt: '2026-01-20',
    author: 'Payments Strategy',
    excerpt: 'PayPal Business 28M accounts vs Revolut 1.8M. PayPal: e-commerce strength, checkout trust. Revolut: lower fees, banking integration, multi-currency. Overlap: cross-border e-commerce SMBs. Switching rate: 8% PayPal → Revolut annually.',
    reliabilityScore: 90,
  },
  {
    id: 's409',
    title: 'Square Banking Expansion - US Neobank Entering Europe 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-COMP-SQUARE-0008',
    fileType: 'xlsx',
    fileName: 'Square_Banking_Europe_Entry_2026.xlsx',
    publishedAt: '2026-02-22',
    author: 'Competitive Intelligence',
    excerpt: 'Square (Block) European entry: UK launch Q2 2026, €1.2B marketing commitment. SMB focus, POS integration strength. Threat level: Moderate. Revolut advantages: established base, regulatory licenses, product breadth. Share impact: -1.2% projected.',
    reliabilityScore: 88,
  },
  {
    id: 's410',
    title: 'Starling Bank SMB Market Share - UK Competitive Analysis 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-STARLING-0009',
    fileType: 'pdf',
    fileName: 'Starling_Bank_SMB_UK_Analysis_2026.pdf',
    publishedAt: '2026-01-30',
    author: 'UK Competition',
    excerpt: 'Starling SMB accounts: 580K vs Revolut 540K (UK only). Starling strengths: full banking license, lending (£2.8B portfolio), relationship banking. Revolut: international, multi-currency, lower fees. Win rate Revolut: 58% in head-to-head.',
    reliabilityScore: 91,
  },
  {
    id: 's411',
    title: 'Klarna BNPL Competition - Payment Method Fragmentation 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-COMP-KLARNA-0010',
    fileType: 'xlsx',
    fileName: 'Klarna_BNPL_Competition_2026.xlsx',
    publishedAt: '2026-02-12',
    author: 'Product Strategy',
    excerpt: 'Klarna BNPL volume €78B (Europe). Indirect competition: checkout alternative to cards. Revolut response: installment features, shopping integration. BNPL regulation tightening creates opportunity for regulated banking alternative.',
    reliabilityScore: 86,
  },
  {
    id: 's412',
    title: 'Nubank Global Expansion - Latam Neobank Enters Europe 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-NUBANK-0011',
    fileType: 'pdf',
    fileName: 'Nubank_Global_Expansion_Europe_2026.pdf',
    publishedAt: '2026-02-05',
    author: 'International Strategy',
    excerpt: 'Nubank 95M customers (Latam), exploring European entry targeting Spanish/Portuguese markets. Playbook: underserved customers, mobile-first, credit products. Timeline: 2027 earliest. Threat level: Low near-term, strategic watch long-term.',
    reliabilityScore: 85,
  },
  {
    id: 's413',
    title: 'Chime US Neobank - Transatlantic Competitive Comparison 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-COMP-CHIME-0012',
    fileType: 'xlsx',
    fileName: 'Chime_US_Neobank_Comparison_2026.xlsx',
    publishedAt: '2026-01-25',
    author: 'Market Research',
    excerpt: 'Chime US: 14M users, $3.1B revenue (2025). Fee-free model vs Revolut multi-revenue. Chime no international expansion plans. Learnings: overdraft features popular, paycheck early access, savings automation. Revolut tests in UK market.',
    reliabilityScore: 87,
  },
  {
    id: 's414',
    title: 'Trade Republic Investment Platform - Wealth Competition 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-TRADEREPUBLIC-0013',
    fileType: 'pdf',
    fileName: 'Trade_Republic_Wealth_Competition_2026.pdf',
    publishedAt: '2026-02-15',
    author: 'Wealth Strategy',
    excerpt: 'Trade Republic: 4M users, €68B AUM. Investment-first vs Revolut payments-first. Overlap: crypto, stocks, savings. Trade Republic fee €1/trade vs Revolut commission-free stocks. Cross-holding: 18% of Trade users also Revolut.',
    reliabilityScore: 89,
  },
  {
    id: 's415',
    title: 'Vivid Money Germany Launch - Local Neobank Competition 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-COMP-VIVID-0014',
    fileType: 'xlsx',
    fileName: 'Vivid_Money_Germany_Competition_2026.xlsx',
    publishedAt: '2026-01-18',
    author: 'Germany Strategy',
    excerpt: 'Vivid Money: 500K users (Germany), investment-focused neobank. Cashback program aggressive, stocks/crypto integrated. Funding €100M vs Revolut €850M. Market share: 0.6% vs Revolut 4.8%. Threat: niche, affluent segment overlap.',
    reliabilityScore: 86,
  },
  {
    id: 's416',
    title: 'Bunq Netherlands Market - Sustainable Banking Positioning 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-COMP-BUNQ-0015',
    fileType: 'pdf',
    fileName: 'Bunq_Netherlands_Sustainable_Banking_2026.pdf',
    publishedAt: '2026-02-08',
    author: 'Sustainability Team',
    excerpt: 'Bunq: 9M users (Europe), sustainability-focused. Premium pricing (€8.99-€17.99/mo) vs Revolut (€0-€13.99). Environmental positioning differentiator. Overlap: conscious consumers, travelers. Revolut response: green features, offsetting program.',
    reliabilityScore: 87,
  },

  // Product & Technology (s417-s421)
  {
    id: 's417',
    title: 'Revolut Technology Stack - Architecture Overview 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-TECH-0001',
    fileType: 'pdf',
    fileName: 'Revolut_Technology_Stack_Architecture_2026.pdf',
    publishedAt: '2026-01-12',
    author: 'Engineering',
    excerpt: 'Microservices architecture: 1,200+ services, Kubernetes orchestration. Backend: Kotlin/Java, Python for ML. Frontend: React Native (mobile), React (web). Database: PostgreSQL, Cassandra, Redis. Real-time processing: Kafka, 500K events/sec.',
    reliabilityScore: 93,
  },
  {
    id: 's418',
    title: 'API Platform Adoption - Developer Metrics Q4 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-TECH-0002',
    fileType: 'xlsx',
    fileName: 'API_Platform_Developer_Metrics_Q4_2025.xlsx',
    publishedAt: '2026-01-20',
    author: 'Platform Team',
    excerpt: 'API developers: 45K registered, 12K active monthly. API transaction volume: €18B (Q4). Top use cases: payment processing 48%, account management 28%, FX 16%, data retrieval 8%. Uptime 99.95%, latency p95 <200ms.',
    reliabilityScore: 92,
  },
  {
    id: 's419',
    title: 'Mobile App Performance & Engagement Metrics 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-TECH-0003',
    fileType: 'pdf',
    fileName: 'Mobile_App_Performance_Engagement_2026.pdf',
    publishedAt: '2026-02-05',
    author: 'Mobile Team',
    excerpt: 'App store ratings: iOS 4.7/5 (680K reviews), Android 4.6/5 (1.2M reviews). Monthly app opens: 385M, sessions 2.8B. Crash rate 0.12%, load time p50 1.2s. Features: biometric auth 94%, notifications 88%, widgets 42%.',
    reliabilityScore: 91,
  },
  {
    id: 's420',
    title: 'Machine Learning Models - Fraud Detection Performance 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-TECH-0004',
    fileType: 'xlsx',
    fileName: 'ML_Fraud_Detection_Performance_2026.xlsx',
    publishedAt: '2026-01-28',
    author: 'Data Science',
    excerpt: 'Fraud detection accuracy 98.2%, false positive rate 0.8%. Models: transaction risk scoring, behavior anomaly, identity verification. Monthly fraud attempts blocked: 2.4M. Fraud loss rate 0.04% (industry avg 0.12%). Real-time processing <50ms.',
    reliabilityScore: 94,
  },
  {
    id: 's421',
    title: 'Infrastructure Scalability - Peak Load Performance 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-TECH-0005',
    fileType: 'pdf',
    fileName: 'Infrastructure_Scalability_Peak_Load_2025.pdf',
    publishedAt: '2026-02-10',
    author: 'Platform Engineering',
    excerpt: 'Peak transaction processing: 85K/second (Black Friday 2025). Auto-scaling: 0-100% capacity in 90 seconds. Database sharding: 240 shards, read replicas 8x. CDN: Cloudflare, 99.99% availability. Disaster recovery RTO <15min, RPO <5min.',
    reliabilityScore: 93,
  },

  // Legal & Compliance (s422-s431)
  {
    id: 's422',
    title: 'FCA Regulatory Compliance Status - UK Banking License 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-LEGAL-0001',
    fileType: 'pdf',
    fileName: 'FCA_Regulatory_Compliance_UK_2026.pdf',
    publishedAt: '2026-01-15',
    author: 'Legal Team',
    excerpt: 'UK banking license granted July 2021, full compliance achieved. Capital adequacy ratio 14.2% (minimum 10.5%). FCA supervision: enhanced monitoring status removed Q3 2025. Audit findings: 2 minor, 0 major. Regulatory capital €420M.',
    reliabilityScore: 95,
  },
  {
    id: 's423',
    title: 'GDPR Data Protection Compliance Assessment 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-LEGAL-0002',
    fileType: 'xlsx',
    fileName: 'GDPR_Data_Protection_Compliance_2026.xlsx',
    publishedAt: '2026-02-02',
    author: 'Privacy Office',
    excerpt: 'GDPR compliance: 98% score. Data processing agreements: 1,240 vendors. Subject access requests: 12K annually, avg response 18 days. Data breaches 2025: 0 reportable incidents. Privacy by design implementation: all new features.',
    reliabilityScore: 94,
  },
  {
    id: 's424',
    title: 'Anti-Money Laundering Controls - AML/CTF Program 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-LEGAL-0003',
    fileType: 'pdf',
    fileName: 'AML_CTF_Controls_Program_2026.pdf',
    publishedAt: '2026-01-25',
    author: 'Compliance',
    excerpt: 'AML program: transaction monitoring 100% automated, manual review 3.2% flagged. Suspicious Activity Reports filed: 1,845 (2025). False positive rate: 2.1% (industry 5-10%). KYC refresh cycle: 24 months. Sanctions screening: real-time.',
    reliabilityScore: 95,
  },
  {
    id: 's425',
    title: 'EU Banking Licenses - Multi-Jurisdiction Regulatory Status 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-LEGAL-0004',
    fileType: 'xlsx',
    fileName: 'EU_Banking_Licenses_MultiJurisdiction_2026.xlsx',
    publishedAt: '2026-02-08',
    author: 'Regulatory Affairs',
    excerpt: 'EU banking license (Lithuania): passporting to 30 EEA countries. Subsidiary licenses: Ireland (2023), France (planned 2027). Regulatory capital requirements: €580M consolidated. Local regulators: Bank of Lithuania (primary), ECB oversight.',
    reliabilityScore: 94,
  },
  {
    id: 's426',
    title: 'Crypto Asset Regulation - MiCA Compliance Roadmap 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-LEGAL-0005',
    fileType: 'pdf',
    fileName: 'Crypto_Asset_MiCA_Compliance_2026.pdf',
    publishedAt: '2026-01-30',
    author: 'Digital Assets Legal',
    excerpt: 'MiCA regulation effective June 2024. Compliance: CASP license obtained (Lithuania), safeguarding requirements met, disclosure standards implemented. Crypto reserve backing: 100% segregated. Regulatory capital for crypto: €45M.',
    reliabilityScore: 93,
  },
  {
    id: 's427',
    title: 'Consumer Protection Regulations - Complaint Handling 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-LEGAL-0006',
    fileType: 'xlsx',
    fileName: 'Consumer_Protection_Complaints_2026.xlsx',
    publishedAt: '2026-02-15',
    author: 'Consumer Affairs',
    excerpt: 'Consumer complaints: 28K (2025), 0.07% of customer base. FOS referrals: 245 (upheld 18%, industry avg 32%). Resolution time: 21 days avg (regulatory max 56 days). Compensation paid: €420K total. Proactive remediation: €1.2M.',
    reliabilityScore: 92,
  },
  {
    id: 's428',
    title: 'PSD2 Strong Customer Authentication - Compliance Status 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-LEGAL-0007',
    fileType: 'pdf',
    fileName: 'PSD2_SCA_Compliance_Status_2026.pdf',
    publishedAt: '2026-01-18',
    author: 'Payments Compliance',
    excerpt: 'PSD2 SCA implementation: biometric auth 94% adoption, SMS fallback 6%. Transaction exemptions: low-value (€30), trusted beneficiaries, recurring. Decline rate post-SCA: 2.1% (down from 8.4% at launch). Frictionless rate: 87%.',
    reliabilityScore: 94,
  },
  {
    id: 's429',
    title: 'Data Localization Requirements - Cross-Border Data Flow 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-LEGAL-0008',
    fileType: 'xlsx',
    fileName: 'Data_Localization_CrossBorder_Flow_2026.xlsx',
    publishedAt: '2026-02-12',
    author: 'Data Governance',
    excerpt: 'EU data residency: 100% customer data stored EU data centers. UK data post-Brexit: adequacy decision allows free flow. Schrems II compliance: SCCs implemented for non-EU vendors (28 contracts). Data sovereignty audit: 0 violations.',
    reliabilityScore: 93,
  },
  {
    id: 's430',
    title: 'Tax Compliance & Reporting - Multi-Jurisdiction Tax 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-LEGAL-0009',
    fileType: 'pdf',
    fileName: 'Tax_Compliance_MultiJurisdiction_2025.pdf',
    publishedAt: '2026-01-22',
    author: 'Tax Department',
    excerpt: 'Corporate tax jurisdictions: 38 countries. Effective tax rate: 18.5% (FY2025). Transfer pricing: arms-length documentation, 240 intercompany agreements. DAC6 reporting: 12 arrangements disclosed. Tax audits: 4 active, 0 material findings.',
    reliabilityScore: 92,
  },
  {
    id: 's431',
    title: 'Intellectual Property Portfolio - Patent & Trademark 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-LEGAL-0010',
    fileType: 'xlsx',
    fileName: 'IP_Portfolio_Patent_Trademark_2026.xlsx',
    publishedAt: '2026-02-05',
    author: 'IP Legal',
    excerpt: 'Patent portfolio: 42 granted, 78 pending. Key areas: fraud detection ML, instant settlement, multi-currency routing. Trademarks: 185 registrations (38 jurisdictions). Trade secrets: proprietary algos, risk models. IP litigation: 2 defensive.',
    reliabilityScore: 91,
  },

  // Operations & Other (s432-s451)
  {
    id: 's432',
    title: 'Customer Onboarding Operations - KYC Process Efficiency 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-OPS-0001',
    fileType: 'pdf',
    fileName: 'Onboarding_KYC_Process_Efficiency_2026.pdf',
    publishedAt: '2026-01-10',
    author: 'Operations',
    excerpt: 'Onboarding: 62% instant approval (AI verification), 32% manual review, 6% rejection. Review time: 4.2 hours avg (manual). Document types: 145 accepted. Verification partners: Onfido, Jumio, Trulioo. Abandonment rate: 18% (industry 30%).',
    reliabilityScore: 92,
  },
  {
    id: 's433',
    title: 'Card Production & Logistics - Supply Chain Operations 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-OPS-0002',
    fileType: 'xlsx',
    fileName: 'Card_Production_Logistics_SupplyChain_2025.xlsx',
    publishedAt: '2026-01-20',
    author: 'Card Operations',
    excerpt: 'Cards issued: 24M (2025), 8.2M new. Production partners: 3 global manufacturers. Delivery SLA: 5-7 business days (EU), 7-10 (UK). Digital card: instant issuance, 48% adoption. Cost per card: €2.80 (physical), €0 (digital).',
    reliabilityScore: 91,
  },
  {
    id: 's434',
    title: 'Transaction Processing Infrastructure - Payment Rails 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-OPS-0003',
    fileType: 'pdf',
    fileName: 'Transaction_Processing_Payment_Rails_2026.pdf',
    publishedAt: '2026-02-02',
    author: 'Payments Operations',
    excerpt: 'Payment rails: Visa (68%), Mastercard (32%), SEPA (direct participant), SWIFT (correspondent banking), Faster Payments (UK direct), CHAPS. Processing volume: 2.8B txns annually. Authorization rate: 96.2%, settlement success: 99.7%.',
    reliabilityScore: 93,
  },
  {
    id: 's435',
    title: 'Customer Support Operations - Global Support Centers 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-OPS-0004',
    fileType: 'xlsx',
    fileName: 'Support_Operations_Global_Centers_2026.xlsx',
    publishedAt: '2026-01-28',
    author: 'Customer Operations',
    excerpt: 'Support centers: Krakow (Poland), Porto (Portugal), Vilnius (Lithuania). Agents: 2,400 FTE. Languages: 28 supported. Channels: in-app chat 78%, email 18%, phone 4%. Automation: chatbot handles 42% tier-1 queries. CSAT 4.2/5.',
    reliabilityScore: 90,
  },
  {
    id: 's436',
    title: 'Vendor Management Program - Third-Party Risk 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-OPS-0005',
    fileType: 'pdf',
    fileName: 'Vendor_Management_ThirdParty_Risk_2026.pdf',
    publishedAt: '2026-02-10',
    author: 'Procurement',
    excerpt: 'Active vendors: 1,240. Critical vendors: 85 (financial, tech, operational). Vendor assessment: annual reviews, continuous monitoring. Spend: €485M (2025). Top categories: cloud 30%, payments 22%, compliance 15%, professional services 12%.',
    reliabilityScore: 91,
  },
  {
    id: 's437',
    title: 'Fraud Prevention Operations - Dispute Resolution 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-OPS-0006',
    fileType: 'xlsx',
    fileName: 'Fraud_Prevention_Dispute_Resolution_2026.xlsx',
    publishedAt: '2026-01-15',
    author: 'Fraud Operations',
    excerpt: 'Disputes processed: 145K annually. Chargeback rate: 0.18% (industry 0.6-0.9%). Resolution time: 28 days avg. Win rate: 58% (evidence, documentation). False decline rate: 0.8%. Fraud loss ratio: 0.04% of transaction volume.',
    reliabilityScore: 92,
  },
  {
    id: 's438',
    title: 'Treasury Operations - Liquidity Management & FX 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-OPS-0007',
    fileType: 'pdf',
    fileName: 'Treasury_Operations_Liquidity_FX_2026.pdf',
    publishedAt: '2026-02-08',
    author: 'Treasury',
    excerpt: 'Customer deposits: €14.8B across 28 currencies. Liquidity coverage ratio: 145% (regulatory min 100%). FX trading: €4.2B daily volume. Hedging: 78% of FX exposure covered. Banking partners: 45 correspondent banks, 12 nostro accounts.',
    reliabilityScore: 94,
  },
  {
    id: 's439',
    title: 'HR & Talent Operations - Workforce Analytics 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-OPS-0008',
    fileType: 'xlsx',
    fileName: 'HR_Talent_Workforce_Analytics_2026.xlsx',
    publishedAt: '2026-01-25',
    author: 'People Operations',
    excerpt: 'Headcount: 8,200 FTE. Growth: +28% YoY. Engineering: 42%, Operations: 28%, Commercial: 18%, Other: 12%. Locations: 25 countries, 38 offices. Attrition: 18% (tech industry avg 23%). Employee satisfaction: 4.1/5.',
    reliabilityScore: 90,
  },
  {
    id: 's440',
    title: 'Office & Facilities Operations - Global Real Estate 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-REVOLUT-OPS-0009',
    fileType: 'pdf',
    fileName: 'Office_Facilities_Global_RealEstate_2026.pdf',
    publishedAt: '2026-02-12',
    author: 'Facilities',
    excerpt: 'Office locations: 38 global. HQ: London (1,200 employees). Major hubs: Krakow 2,400, Vilnius 1,200, Porto 850, Dublin 450. Real estate costs: €95M annually. Remote work: 45% hybrid, 35% office, 20% fully remote.',
    reliabilityScore: 89,
  },
  {
    id: 's441',
    title: 'Business Continuity & Disaster Recovery - Resilience Plan 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-OPS-0010',
    fileType: 'xlsx',
    fileName: 'Business_Continuity_Disaster_Recovery_2026.xlsx',
    publishedAt: '2026-01-18',
    author: 'Risk Management',
    excerpt: 'BC/DR plan: RTO 15 minutes (critical systems), RPO 5 minutes. Failover testing: quarterly. Geo-redundancy: 3 AWS regions active-active. Incident response: 24/7 team. Last major incident: 0 service disruptions >1hr (2025). Uptime: 99.97%.',
    reliabilityScore: 93,
  },
  {
    id: 's442',
    title: 'Revolut Data Room - Document Index & Catalog 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-DATAROOM-INDEX-0001',
    fileType: 'xlsx',
    fileName: 'Revolut_DataRoom_Document_Index_2026.xlsx',
    publishedAt: '2026-03-01',
    author: 'Corporate Development',
    excerpt: 'Data room contains 1,350+ documents across categories: Market (182), Financial (240), Customer (172), Competitive (133), Product (95), Legal (100), Operations (62). Last updated: weekly. Access: secure portal, NDA required.',
    reliabilityScore: 95,
  },
  {
    id: 's443',
    title: 'M&A Process Timeline - Due Diligence Roadmap Q1 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MA-PROCESS-0001',
    fileType: 'pdf',
    fileName: 'MA_Process_Timeline_DD_Roadmap_Q1_2026.pdf',
    publishedAt: '2026-01-05',
    author: 'Deal Team',
    excerpt: 'Due diligence timeline: Phase 1 (4 weeks) market & financials, Phase 2 (3 weeks) operations & legal, Phase 3 (2 weeks) integration planning. Data room access: unlimited for approved parties. Management presentations: weeks 2, 5, 8.',
    reliabilityScore: 94,
  },
  {
    id: 's444',
    title: 'Tiger Global Investment Thesis - Strategic Rationale 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-TIGER-THESIS-0001',
    fileType: 'pdf',
    fileName: 'Tiger_Global_Investment_Thesis_2026.pdf',
    publishedAt: '2026-01-08',
    author: 'Tiger Global',
    excerpt: 'Investment rationale: European fintech leader, profitable growth, 48% revenue CAGR, path to €5B+ revenue by 2028. TAM expansion: SMB banking €285B, cross-border €445B. Valuation: 9.5x revenue justified by growth + profitability combination.',
    reliabilityScore: 92,
  },
  {
    id: 's445',
    title: 'SoftBank Vision Fund - Fintech Portfolio Strategy 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-SOFTBANK-STRATEGY-0001',
    fileType: 'xlsx',
    fileName: 'SoftBank_VisionFund_Fintech_Strategy_2026.xlsx',
    publishedAt: '2026-01-12',
    author: 'SoftBank Vision Fund',
    excerpt: 'Fintech portfolio: Revolut target investment €2.5-€3.5B for 12-15% stake. Strategic thesis: embedded finance, AI-driven banking, global expansion. Synergies: portfolio companies (Uber, DoorDash, Didi) payment integration potential.',
    reliabilityScore: 91,
  },
  {
    id: 's446',
    title: 'Management Interviews - Executive Leadership Assessment 2026',
    category: 'interview',
    publishedAt: '2026-02-01',
    author: 'Deal Advisory',
    excerpt: 'Management interviews conducted: CEO (strategy, vision), CFO (financials, unit economics), CTO (technology roadmap), CCO (customer growth), CRO (risk management). Key insights: strong execution culture, data-driven, international ambition.',
    reliabilityScore: 88,
  },
  {
    id: 's447',
    title: 'Industry Expert Interviews - Fintech Market Dynamics 2026',
    category: 'interview',
    publishedAt: '2026-01-28',
    author: 'Third-Party Consultants',
    excerpt: 'Expert interviews: 12 industry specialists (ex-bankers, fintech founders, regulators, analysts). Consensus: neobank consolidation phase, Revolut positioned as category leader, regulatory environment stabilizing, profitability inflection point reached.',
    reliabilityScore: 86,
  },
  {
    id: 's448',
    title: 'Customer Reference Calls - Enterprise Client Satisfaction 2026',
    category: 'interview',
    publishedAt: '2026-02-05',
    author: 'Customer Success',
    excerpt: 'Customer references: 24 enterprise clients interviewed. NPS 68 (sample), key strengths: multi-currency (92% satisfaction), API integration (88%), cost savings (avg 42% vs traditional banks). Pain points: support response time, feature requests.',
    reliabilityScore: 87,
  },
  {
    id: 's449',
    title: 'Regulatory Consultation - FCA & ECB Perspectives 2026',
    category: 'interview',
    publishedAt: '2026-01-20',
    author: 'Regulatory Affairs',
    excerpt: 'Regulatory consultations: FCA (UK), Bank of Lithuania, ECB. Feedback: compliance culture improving, risk management robust, capital adequacy strong. Areas of focus: AML continuous improvement, crypto asset supervision, cross-border coordination.',
    reliabilityScore: 90,
  },
  {
    id: 's450',
    title: 'Board Meeting Minutes - Strategic Planning FY2026-2028',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-BOARD-MINUTES-0001',
    fileType: 'pdf',
    fileName: 'Board_Minutes_Strategic_Planning_2026_2028.pdf',
    publishedAt: '2026-01-30',
    author: 'Board of Directors',
    excerpt: 'Board approved 3-year plan: Revenue target €8-€10B (2028), EBITDA margin 22-25%, customer base 75-90M, geographic expansion (US, APAC exploratory), product innovation (lending scale-up, wealth management), M&A budget €500M.',
    reliabilityScore: 93,
  },
  {
    id: 's451',
    title: 'Shareholder Communications - Investor Update Q4 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-INVESTOR-UPDATE-0001',
    fileType: 'pdf',
    fileName: 'Shareholder_Communications_Investor_Q4_2025.pdf',
    publishedAt: '2026-02-01',
    author: 'Investor Relations',
    excerpt: 'Investor update: Q4 results beat guidance, FY2026 outlook raised, profitability sustained, international expansion on track. Shareholder questions: US entry timeline (2027), crypto strategy (selective growth), M&A pipeline (3-5 targets identified).',
    reliabilityScore: 92,
  },

  // ─── TIER 2: MID-FIDELITY DOCUMENTS (s452-s751) - NO CONTENT FIELD ───────────

  // Market Sizing & Growth (s452-s501) - 50 documents
  {
    id: 's452',
    title: 'Ireland SMB Digital Payment TAM - Market Assessment 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-IE-0001',
    fileType: 'xlsx',
    fileName: 'Ireland_SMB_Digital_Payment_TAM_2026.xlsx',
    publishedAt: '2026-02-18',
    author: 'Market Research',
    excerpt: 'Ireland SMB payment market €28B with 15% CAGR. Dublin metro accounts for 62% (€17B). Strong tech startup ecosystem drives digital-first adoption. Addressable neobank opportunity €14B.',
    reliabilityScore: 89,
  },
  {
    id: 's453',
    title: 'Austria Premium Banking Segment - Market Size Analysis 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-AT-0002',
    fileType: 'pdf',
    fileName: 'Austria_Premium_Banking_Segment_2025.pdf',
    publishedAt: '2025-12-10',
    author: 'Wealth Markets',
    excerpt: 'Austria premium banking market €34B AUM, concentrated in Vienna (€21B). Conservative investment culture but shifting toward digital wealth platforms. Neobank penetration 4%, significant growth potential.',
    reliabilityScore: 87,
  },
  {
    id: 's454',
    title: 'UK Cryptocurrency Trading Market - Volume Forecast 2026-2028',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-CRYPTO-0026',
    fileType: 'xlsx',
    fileName: 'UK_Crypto_Trading_Volume_Forecast_2026_2028.xlsx',
    publishedAt: '2026-01-22',
    author: 'Digital Assets',
    excerpt: 'UK retail crypto trading projected €145B (2026) to €210B (2028), 20% CAGR. Regulatory clarity post-FCA framework drives institutional interest. Integrated banking-crypto platforms capture 24% market share.',
    reliabilityScore: 86,
  },
  {
    id: 's455',
    title: 'Switzerland Cross-Border Wealth Transfer TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-CH-0003',
    fileType: 'pdf',
    fileName: 'Switzerland_CrossBorder_Wealth_TAM_2026.pdf',
    publishedAt: '2026-02-08',
    author: 'International Markets',
    excerpt: 'Swiss cross-border wealth management flows €92B annually. High net worth individuals seek multi-currency solutions. Traditional private banks 82% share, fintech challengers growing at 32% CAGR.',
    reliabilityScore: 88,
  },
  {
    id: 's456',
    title: 'Greece Digital Banking Transformation - Market Opportunity 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-GR-0004',
    fileType: 'xlsx',
    fileName: 'Greece_Digital_Banking_Opportunity_2026.xlsx',
    publishedAt: '2025-11-28',
    author: 'Emerging Markets',
    excerpt: 'Greece digital banking TAM €18B, growing from low base (32% penetration). Tourism sector drives seasonal FX demand. Young population adoption accelerating, neobank opportunity €9B.',
    reliabilityScore: 85,
  },
  {
    id: 's457',
    title: 'Portugal Expatriate Banking Market - Segment Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-PT-0005',
    fileType: 'pdf',
    fileName: 'Portugal_Expatriate_Banking_Market_2026.pdf',
    publishedAt: '2026-01-15',
    author: 'Segment Strategy',
    excerpt: 'Portugal expat market: 850K foreign residents, payment flows €12B. Brazilian, French, UK nationals dominant. Multi-currency needs, remittance volume €3.2B. Digital-first banking preference 78%.',
    reliabilityScore: 88,
  },
  {
    id: 's458',
    title: 'European Travel Payment Volume - Tourism Sector TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-TRAVEL-0006',
    fileType: 'xlsx',
    fileName: 'European_Travel_Payment_Volume_TAM_2026.xlsx',
    publishedAt: '2026-02-12',
    author: 'Vertical Markets',
    excerpt: 'European travel payments €385B annually. FX transactions €78B, high margin opportunity. Summer months 42% of volume. Digital wallets replacing cash and cards, neobank travel features drive adoption.',
    reliabilityScore: 89,
  },
  {
    id: 's459',
    title: 'Romania Digital Payments Growth - Emerging Market Forecast 2025-2027',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-RO-0007',
    fileType: 'pdf',
    fileName: 'Romania_Digital_Payments_Growth_2025_2027.pdf',
    publishedAt: '2025-10-20',
    author: 'CEE Markets',
    excerpt: 'Romania payment market €24B growing at 26% CAGR. Bucharest tech hub drives fintech adoption. Cash usage declining from 68% to 42%. E-commerce boom creates €12B digital payment opportunity.',
    reliabilityScore: 86,
  },
  {
    id: 's460',
    title: 'Belgium Corporate Treasury Market - Mid-Market TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-BE-0008',
    fileType: 'xlsx',
    fileName: 'Belgium_Corporate_Treasury_MidMarket_2026.xlsx',
    publishedAt: '2026-01-30',
    author: 'Treasury Solutions',
    excerpt: 'Belgium mid-market treasury flows €45B. Brussels EU headquarters concentration. Multi-currency complexity high. Traditional banks 74% share, opportunity for specialized fintech platforms €20B.',
    reliabilityScore: 87,
  },
  {
    id: 's461',
    title: 'Czech Republic SMB Market - Payment Processing TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-CZ-0009',
    fileType: 'pdf',
    fileName: 'Czech_SMB_Payment_Processing_TAM_2026.pdf',
    publishedAt: '2026-02-05',
    author: 'Market Intelligence',
    excerpt: 'Czech SMB payment volume €32B with 18% CAGR. Prague startup ecosystem expanding. Cross-border trade with Germany and Austria significant. Digital adoption 64%, neobank penetration 6%.',
    reliabilityScore: 88,
  },
  {
    id: 's462',
    title: 'Hungary B2B Payment Digitization - Market Assessment 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-HU-0010',
    fileType: 'xlsx',
    fileName: 'Hungary_B2B_Payment_Digitization_2026.xlsx',
    publishedAt: '2025-12-15',
    author: 'CEE Strategy',
    excerpt: 'Hungary B2B payments €18B, digital penetration 48%. Budapest central location for regional operations. Government digitization initiatives accelerate adoption. Fintech opportunity €9B.',
    reliabilityScore: 85,
  },
  {
    id: 's463',
    title: 'Scandinavia Sustainable Finance - Green Payment TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-SCANDI-0011',
    fileType: 'pdf',
    fileName: 'Scandinavia_Sustainable_Finance_Green_TAM_2026.pdf',
    publishedAt: '2026-01-18',
    author: 'Sustainability Markets',
    excerpt: 'Nordic green finance payments €78B driven by ESG mandates. Carbon offset transactions, sustainable procurement. Regulatory pressure from EU taxonomy. Banking integration of sustainability metrics growing market.',
    reliabilityScore: 87,
  },
  {
    id: 's464',
    title: 'Luxembourg International Banking Hub - Market Size 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-LU-0012',
    fileType: 'xlsx',
    fileName: 'Luxembourg_International_Banking_Hub_2026.xlsx',
    publishedAt: '2026-02-10',
    author: 'Private Banking',
    excerpt: 'Luxembourg financial services €485B AUM, international hub for wealth management. Cross-border flows €142B. Fintech penetration low (8%) but high-value opportunity for compliant neobanks.',
    reliabilityScore: 89,
  },
  {
    id: 's465',
    title: 'UK Buy Now Pay Later Market - BNPL Volume Analysis 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-BNPL-0013',
    fileType: 'pdf',
    fileName: 'UK_BNPL_Volume_Analysis_2026.pdf',
    publishedAt: '2026-01-25',
    author: 'Credit Products',
    excerpt: 'UK BNPL transaction volume €42B growing at 28% CAGR. Regulatory scrutiny increasing. Opportunity for regulated banks to offer compliant installment products. Youth demographic preference strong.',
    reliabilityScore: 86,
  },
  {
    id: 's466',
    title: 'France Merchant Acquiring Market - POS Payment TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-ACQUIRING-0014',
    fileType: 'xlsx',
    fileName: 'France_Merchant_Acquiring_POS_TAM_2026.xlsx',
    publishedAt: '2026-02-15',
    author: 'Merchant Services',
    excerpt: 'France merchant acquiring €245B card volume. Interchange fees €3.4B revenue pool. Integrated payment solutions growing vs traditional acquirers. Software-led acquiring models capture 18% market.',
    reliabilityScore: 88,
  },
  {
    id: 's467',
    title: 'Germany Pension Fund Digitization - Institutional TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-PENSION-0015',
    fileType: 'pdf',
    fileName: 'Germany_Pension_Fund_Digital_TAM_2026.pdf',
    publishedAt: '2025-11-30',
    author: 'Institutional Markets',
    excerpt: 'German pension funds €2.1T AUM beginning digital transformation. Payment operations €340B annually. Custody, settlement, FX needs. Fintech infrastructure opportunities in reporting, compliance automation.',
    reliabilityScore: 87,
  },
  {
    id: 's468',
    title: 'Spain Invoice Financing Market - Working Capital TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-INVOICE-0016',
    fileType: 'xlsx',
    fileName: 'Spain_Invoice_Financing_WorkingCapital_2026.xlsx',
    publishedAt: '2026-01-08',
    author: 'Lending Solutions',
    excerpt: 'Spain invoice financing market €38B, SMB working capital constraints drive demand. Traditional factors 68% share, fintech platforms growing 42% YoY. Embedded in payment platforms opportunity €19B.',
    reliabilityScore: 86,
  },
  {
    id: 's469',
    title: 'Italy Family Office Wealth Management - HNW TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-FAMILYOFFICE-0017',
    fileType: 'pdf',
    fileName: 'Italy_Family_Office_Wealth_TAM_2026.pdf',
    publishedAt: '2026-02-20',
    author: 'Wealth Strategy',
    excerpt: 'Italian family offices manage €285B, concentrated in Milan, Florence, Rome. Multi-generational wealth transfer accelerating. Digital platform adoption 24%, traditional private banking still dominant.',
    reliabilityScore: 88,
  },
  {
    id: 's470',
    title: 'Netherlands Fintech Ecosystem - Innovation Hub Market 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-NL-FINTECH-0018',
    fileType: 'xlsx',
    fileName: 'Netherlands_Fintech_Ecosystem_Market_2026.xlsx',
    publishedAt: '2026-01-12',
    author: 'Innovation Research',
    excerpt: 'Dutch fintech market €52B payment volume, Amsterdam innovation hub. 385 fintech companies, strong VC ecosystem. API-first banking adoption 38%. Collaborative regulatory environment favors innovation.',
    reliabilityScore: 89,
  },
  {
    id: 's471',
    title: 'UK Student Banking Market - Youth Segment TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-STUDENT-0019',
    fileType: 'pdf',
    fileName: 'UK_Student_Banking_Youth_TAM_2026.pdf',
    publishedAt: '2026-02-01',
    author: 'Youth Markets',
    excerpt: 'UK student market: 2.8M students, banking flows €18B. Digital-native generation, 84% smartphone-primary banking. Overdraft usage declining post-regulation. Neobank penetration 42% vs traditional 58%.',
    reliabilityScore: 87,
  },
  {
    id: 's472',
    title: 'European Real Estate Transaction Payment TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-REALESTATE-0020',
    fileType: 'xlsx',
    fileName: 'European_RealEstate_Transaction_TAM_2026.xlsx',
    publishedAt: '2025-12-20',
    author: 'Property Finance',
    excerpt: 'European real estate payments €890B (deposits, transfers, fees). Cross-border property investment €142B. Escrow services, multi-currency, compliance complexity. Fintech platforms 12% penetration.',
    reliabilityScore: 86,
  },
  {
    id: 's473',
    title: 'France Gig Economy Payment Flows - Freelancer TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-GIG-0021',
    fileType: 'pdf',
    fileName: 'France_Gig_Economy_Freelancer_TAM_2026.pdf',
    publishedAt: '2026-01-28',
    author: 'Platform Economy',
    excerpt: 'French freelance payment flows €52B, 2.8M freelancers. Platform payments, cross-border income. Tax compliance complexity drives demand for integrated solutions. Neobank adoption 34%.',
    reliabilityScore: 85,
  },
  {
    id: 's474',
    title: 'Germany SaaS Billing Infrastructure - Subscription TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-SAAS-BILLING-0022',
    fileType: 'xlsx',
    fileName: 'Germany_SaaS_Billing_Infrastructure_2026.xlsx',
    publishedAt: '2026-02-10',
    author: 'SaaS Markets',
    excerpt: 'German B2B SaaS subscription payments €28B. Recurring billing complexity, multiple currencies, tax compliance. Specialized billing platforms vs general payment processors. Infrastructure opportunity €14B.',
    reliabilityScore: 87,
  },
  {
    id: 's475',
    title: 'Nordic Electric Vehicle Payment Ecosystem - EV TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-EV-0023',
    fileType: 'pdf',
    fileName: 'Nordic_EV_Payment_Ecosystem_TAM_2026.pdf',
    publishedAt: '2026-01-15',
    author: 'Mobility Payments',
    excerpt: 'Nordic EV charging payments €8B growing at 52% CAGR. Roaming complexity across networks. Integrated payment solutions in car and app. Subscription models emerging, opportunity for fintech platforms.',
    reliabilityScore: 84,
  },
  {
    id: 's476',
    title: 'UK Small Business Lending Market - Alternative Finance 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-SMB-LENDING-0024',
    fileType: 'xlsx',
    fileName: 'UK_SMB_Lending_Alternative_Finance_2026.xlsx',
    publishedAt: '2026-02-18',
    author: 'Lending Markets',
    excerpt: 'UK SMB lending market €185B, alternative lenders 22% share (€41B). Embedded lending in payment platforms growing 38% YoY. Revenue-based financing, invoice discounting. Traditional bank lending declining.',
    reliabilityScore: 88,
  },
  {
    id: 's477',
    title: 'Spain Tourism Payment Seasonality - Hospitality TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-TOURISM-0025',
    fileType: 'pdf',
    fileName: 'Spain_Tourism_Payment_Seasonality_2026.pdf',
    publishedAt: '2025-11-22',
    author: 'Hospitality Payments',
    excerpt: 'Spain tourism payments €142B, seasonal concentration (June-September 58%). International card transactions dominate. Dynamic currency conversion revenue opportunity. Hotel and restaurant merchant acquiring €45B.',
    reliabilityScore: 86,
  },
  {
    id: 's478',
    title: 'European Hedge Fund Payment Infrastructure TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-HEDGEFUND-0026',
    fileType: 'xlsx',
    fileName: 'European_HedgeFund_Payment_Infrastructure_2026.xlsx',
    publishedAt: '2026-01-05',
    author: 'Institutional Banking',
    excerpt: 'European hedge fund payment operations €680B AUM driving transaction flows. Prime brokerage, custody, FX, collateral management. Specialized banking services, high margin but complex compliance.',
    reliabilityScore: 87,
  },
  {
    id: 's479',
    title: 'Italy E-commerce Payment Methods - Digital Commerce TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-ECOM-IT-0027',
    fileType: 'pdf',
    fileName: 'Italy_Ecommerce_Payment_Methods_TAM_2026.pdf',
    publishedAt: '2026-02-12',
    author: 'E-commerce Strategy',
    excerpt: 'Italian e-commerce payments €68B growing at 16% CAGR. Payment method fragmentation: cards 52%, digital wallets 32%, BNPL 10%, bank transfer 6%. Localization critical for conversion optimization.',
    reliabilityScore: 88,
  },
  {
    id: 's480',
    title: 'UK Charity & Non-Profit Payment Processing TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-CHARITY-0028',
    fileType: 'xlsx',
    fileName: 'UK_Charity_NonProfit_Payment_TAM_2026.xlsx',
    publishedAt: '2026-01-20',
    author: 'Social Impact',
    excerpt: 'UK charity sector payment flows €32B (donations, grants, operations). Digital giving growing 28% YoY. Specialized needs: Gift Aid, donor management, transparency. Fintech platforms 18% penetration.',
    reliabilityScore: 85,
  },
  {
    id: 's481',
    title: 'France Insurance Premium Payment Flows - InsurTech TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-INSURANCE-PAY-0029',
    fileType: 'pdf',
    fileName: 'France_Insurance_Premium_Payment_TAM_2026.pdf',
    publishedAt: '2026-02-05',
    author: 'InsurTech Research',
    excerpt: 'French insurance premium payments €185B annually. Direct debit dominant (72%), but digital payment methods growing. Embedded insurance distribution through neobanks creates €28B opportunity.',
    reliabilityScore: 86,
  },
  {
    id: 's482',
    title: 'Germany Healthcare Payment Digitization - MedTech TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-HEALTHCARE-0030',
    fileType: 'xlsx',
    fileName: 'Germany_Healthcare_Payment_Digital_TAM_2026.xlsx',
    publishedAt: '2025-12-08',
    author: 'Healthcare Payments',
    excerpt: 'German healthcare payments €95B, digitization lagging other sectors (38% penetration). Regulatory complexity, privacy requirements. Fintech opportunity in patient payments, insurance claims, provider solutions.',
    reliabilityScore: 84,
  },
  {
    id: 's483',
    title: 'Netherlands Business Account Switching - Market Dynamics 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-SWITCHING-0031',
    fileType: 'pdf',
    fileName: 'Netherlands_Business_Account_Switching_2026.pdf',
    publishedAt: '2026-01-30',
    author: 'Market Dynamics',
    excerpt: 'Dutch business account switching rate 12% annually, highest in EU. Regulatory switching service facilitates migration. Primary bank loyalty declining, multi-banking increasing. Neobank net gain: 8.5% switching inflow.',
    reliabilityScore: 87,
  },
  {
    id: 's484',
    title: 'Spain Remittance Corridors - International Money Transfer TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-REMITTANCE-ES-0032',
    fileType: 'xlsx',
    fileName: 'Spain_Remittance_Corridors_TAM_2026.xlsx',
    publishedAt: '2026-02-15',
    author: 'Remittance Markets',
    excerpt: 'Spain remittance outflows €18B (Morocco, LatAm destinations). Traditional providers 58% share, digital challengers 42%. Average FX spread 3.2% creates arbitrage opportunity for low-cost platforms.',
    reliabilityScore: 88,
  },
  {
    id: 's485',
    title: 'UK Professional Services Payment Automation TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-PROFSERVICES-0033',
    fileType: 'pdf',
    fileName: 'UK_Professional_Services_Payment_Automation_2026.pdf',
    publishedAt: '2026-01-10',
    author: 'Vertical Strategy',
    excerpt: 'UK professional services (legal, accounting, consulting) payment flows €95B. Invoicing, expense management, client billing complexity. Automation opportunity €47B, integrated platforms capture 24% market.',
    reliabilityScore: 86,
  },
  {
    id: 's486',
    title: 'France Corporate Card Expense Management - T&E TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-EXPENSE-FR-0034',
    fileType: 'xlsx',
    fileName: 'France_Corporate_Card_Expense_TAM_2026.xlsx',
    publishedAt: '2026-02-20',
    author: 'Corporate Payments',
    excerpt: 'French T&E spend €42B, corporate card penetration 48%. Integrated expense management platforms growing vs standalone cards. Real-time visibility, policy enforcement, accounting sync drive adoption.',
    reliabilityScore: 87,
  },
  {
    id: 's487',
    title: 'Germany Export Finance Payment Flows - Trade Finance TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-EXPORT-0035',
    fileType: 'pdf',
    fileName: 'Germany_Export_Finance_TradeFinance_TAM_2026.pdf',
    publishedAt: '2025-11-18',
    author: 'Trade Finance',
    excerpt: 'German export finance payments €385B, complex documentation and compliance. Letters of credit €142B, documentary collections €85B. Fintech platforms digitizing 18% of flows, opportunity €310B.',
    reliabilityScore: 85,
  },
  {
    id: 's488',
    title: 'Nordic Carbon Credit Trading - Environmental Finance TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-CARBON-0036',
    fileType: 'xlsx',
    fileName: 'Nordic_Carbon_Credit_Trading_TAM_2026.xlsx',
    publishedAt: '2026-01-25',
    author: 'Sustainability Finance',
    excerpt: 'Nordic carbon credit market €12B transaction volume growing at 42% CAGR. Corporate buyers, compliance trading. Payment infrastructure requirements: escrow, verification, settlement. Blockchain integration emerging.',
    reliabilityScore: 83,
  },
  {
    id: 's489',
    title: 'Italy SME Digital Transformation - Technology Adoption TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-SME-IT-0037',
    fileType: 'pdf',
    fileName: 'Italy_SME_Digital_Transformation_TAM_2026.pdf',
    publishedAt: '2026-02-08',
    author: 'SME Markets',
    excerpt: 'Italian SME digital transformation investment €28B, payment systems modernization 32% of spend. Cloud accounting adoption drives integrated banking needs. Government incentives accelerate digitization.',
    reliabilityScore: 86,
  },
  {
    id: 's490',
    title: 'UK Marketplace Payment Infrastructure - Platform Economy 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-MARKETPLACE-0038',
    fileType: 'xlsx',
    fileName: 'UK_Marketplace_Payment_Infrastructure_2026.xlsx',
    publishedAt: '2026-01-15',
    author: 'Platform Payments',
    excerpt: 'UK marketplace payment volume €85B, complex multi-party splits. Escrow, delayed disbursement, fee collection. Specialized payment infrastructure required, traditional PSPs limited. Opportunity €43B.',
    reliabilityScore: 88,
  },
  {
    id: 's491',
    title: 'France AgriTech Payment Solutions - Agriculture Finance TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-AGRI-0039',
    fileType: 'pdf',
    fileName: 'France_AgriTech_Payment_Agriculture_TAM_2026.pdf',
    publishedAt: '2025-12-12',
    author: 'Sector Finance',
    excerpt: 'French agricultural payments €68B, seasonal cash flow challenges. Equipment financing, commodity trading, subsidy disbursements. Fintech penetration 8%, opportunity for specialized working capital solutions.',
    reliabilityScore: 84,
  },
  {
    id: 's492',
    title: 'Germany Automotive Industry Payment Flows - Manufacturing TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-AUTO-0040',
    fileType: 'xlsx',
    fileName: 'Germany_Automotive_Payment_Manufacturing_2026.xlsx',
    publishedAt: '2026-02-10',
    author: 'Industrial Payments',
    excerpt: 'German automotive sector payment flows €445B (supply chain, invoicing, FX). Just-in-time payments critical. Multi-currency complexity, thousands of suppliers. Payment optimization opportunity €89B.',
    reliabilityScore: 87,
  },
  {
    id: 's493',
    title: 'Spain Construction Payment Automation - Project Finance TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-CONSTRUCTION-0041',
    fileType: 'pdf',
    fileName: 'Spain_Construction_Payment_Automation_2026.pdf',
    publishedAt: '2026-01-20',
    author: 'Construction Finance',
    excerpt: 'Spanish construction payment flows €52B, payment terms extended (avg 78 days). Progress billing, retention, subcontractor cascade. Fintech automation platforms address cash flow, opportunity €26B.',
    reliabilityScore: 85,
  },
  {
    id: 's494',
    title: 'Netherlands PropTech Payment Ecosystem - Real Estate Tech 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-PROPTECH-0042',
    fileType: 'xlsx',
    fileName: 'Netherlands_PropTech_Payment_Ecosystem_2026.xlsx',
    publishedAt: '2026-02-15',
    author: 'PropTech Research',
    excerpt: 'Dutch PropTech payments €34B (rental, deposits, maintenance). Subscription management for landlords, tenant payment automation. Integrated property management platforms with embedded finance opportunity.',
    reliabilityScore: 86,
  },
  {
    id: 's495',
    title: 'UK EdTech Payment Processing - Education Technology TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-EDTECH-0043',
    fileType: 'pdf',
    fileName: 'UK_EdTech_Payment_Processing_TAM_2026.pdf',
    publishedAt: '2025-11-25',
    author: 'EdTech Markets',
    excerpt: 'UK education technology payments €18B (course fees, subscriptions, institutional). International student payments €8B with high FX needs. Installment plans growing, embedded lending opportunity €4B.',
    reliabilityScore: 84,
  },
  {
    id: 's496',
    title: 'France Media & Entertainment Payment Flows - Content Economy 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-MEDIA-0044',
    fileType: 'xlsx',
    fileName: 'France_Media_Entertainment_Payment_TAM_2026.xlsx',
    publishedAt: '2026-01-08',
    author: 'Media Payments',
    excerpt: 'French media payments €42B (subscriptions, advertising, licensing). Creator economy payments €8B. Multi-currency, rights management complexity. Platform payment infrastructure opportunity €21B.',
    reliabilityScore: 85,
  },
  {
    id: 's497',
    title: 'Germany Logistics Payment Automation - Supply Chain TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-LOGISTICS-0045',
    fileType: 'pdf',
    fileName: 'Germany_Logistics_Payment_Automation_TAM_2026.pdf',
    publishedAt: '2026-02-18',
    author: 'Logistics Finance',
    excerpt: 'German logistics payments €285B, freight forwarding and last-mile delivery. Real-time tracking and payment automation. Cross-border complexity. Fintech embedded solutions capture 14% market.',
    reliabilityScore: 87,
  },
  {
    id: 's498',
    title: 'Nordic Gaming & Esports Payment Infrastructure TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-GAMING-0046',
    fileType: 'xlsx',
    fileName: 'Nordic_Gaming_Esports_Payment_TAM_2026.xlsx',
    publishedAt: '2026-01-12',
    author: 'Gaming Payments',
    excerpt: 'Nordic gaming payment volume €24B (in-game purchases, tournaments, subscriptions). Youth demographic, digital-native. Crypto integration emerging. Fast payment rails critical, opportunity €12B.',
    reliabilityScore: 83,
  },
  {
    id: 's499',
    title: 'Italy Fashion & Luxury Payment Processing - Vertical TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-FASHION-0047',
    fileType: 'pdf',
    fileName: 'Italy_Fashion_Luxury_Payment_Processing_2026.pdf',
    publishedAt: '2025-12-05',
    author: 'Luxury Markets',
    excerpt: 'Italian fashion payment flows €95B (wholesale, retail, e-commerce). Milan fashion capital, international transactions 62%. High-value payments, FX complexity. Specialized merchant services opportunity €48B.',
    reliabilityScore: 86,
  },
  {
    id: 's500',
    title: 'UK Renewable Energy Project Finance - Green Infrastructure TAM 2026',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-MARKET-RENEWABLE-0048',
    fileType: 'xlsx',
    fileName: 'UK_Renewable_Energy_Project_Finance_TAM_2026.xlsx',
    publishedAt: '2026-02-01',
    author: 'Energy Finance',
    excerpt: 'UK renewable energy project payments €68B (development, construction, operations). Long-term contracts, complex financing structures. Specialized treasury and payment infrastructure needed.',
    reliabilityScore: 85,
  },
  {
    id: 's501',
    title: 'European Venture Capital Payment Flows - Startup Ecosystem TAM 2026',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MARKET-VC-0049',
    fileType: 'pdf',
    fileName: 'European_VC_Payment_Startup_Ecosystem_2026.pdf',
    publishedAt: '2026-01-18',
    author: 'Startup Banking',
    excerpt: 'European startup banking flows €125B (funding rounds, operational). Multi-currency burn, international hiring. Specialized startup banking services growing at 38% CAGR. Neobank penetration 32%.',
    reliabilityScore: 87,
  },

  // Financial Performance (s502-s571) - 70 documents
  {
    id: 's502',
    title: 'Revolut Monthly Recurring Revenue Analysis - MRR Breakdown Q4 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-FIN-MRR-0001',
    fileType: 'xlsx',
    fileName: 'Revolut_MRR_Analysis_Q4_2025.xlsx',
    publishedAt: '2026-01-15',
    author: 'Revenue Operations',
    excerpt: 'Monthly recurring revenue €285M (Q4 avg), subscriptions €89M, business accounts €124M, premium services €72M. MRR growth 42% YoY. Churn rate 2.8%, expansion revenue 18% of MRR.',
    reliabilityScore: 94,
  },
  {
    id: 's503',
    title: 'Transaction Fee Revenue Trends - Payment Processing Economics 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-FIN-TXNFEE-0002',
    fileType: 'pdf',
    fileName: 'Transaction_Fee_Revenue_Trends_2025.pdf',
    publishedAt: '2026-01-22',
    author: 'Finance Team',
    excerpt: 'Transaction fee revenue €535M (Q4 annualized). Interchange €312M, FX spreads €178M, other fees €45M. Average take rate 0.62%, improving from 0.58% (2024). Volume leverage driving margin expansion.',
    reliabilityScore: 93,
  },
  {
    id: 's504',
    title: 'Gross Margin Analysis by Product Line - Contribution Margin 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-FIN-MARGIN-0003',
    fileType: 'xlsx',
    fileName: 'Gross_Margin_Product_Line_2025.xlsx',
    publishedAt: '2026-02-05',
    author: 'Product Finance',
    excerpt: 'Gross margins by product: Cards 74%, FX 82%, Subscriptions 92%, Crypto 68%, Lending 58%. Blended gross margin 76%, improving 4pp YoY. Fixed cost leverage from scale.',
    reliabilityScore: 92,
  },
  {
    id: 's505',
    title: 'Customer Deposit Growth Trends - Balance Sheet Expansion 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-FIN-DEPOSITS-0004',
    fileType: 'pdf',
    fileName: 'Customer_Deposit_Growth_Trends_2025.pdf',
    publishedAt: '2026-01-28',
    author: 'Treasury',
    excerpt: 'Customer deposits reached €14.8B (+52% YoY). Retail €10.2B, business €4.6B. Average deposit per customer €389. Deposit beta 0.28 (interest sensitivity). Net interest income €45M quarterly.',
    reliabilityScore: 94,
  },
  {
    id: 's506',
    title: 'Sales & Marketing Efficiency - CAC Payback Period 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-FIN-MARKETING-0005',
    fileType: 'xlsx',
    fileName: 'Sales_Marketing_Efficiency_CAC_2025.xlsx',
    publishedAt: '2026-02-10',
    author: 'Growth Finance',
    excerpt: 'Marketing spend €285M (FY2025), customer acquisition 12.9M. Blended CAC €22 (down from €28). Payback period 9 months (improving from 12). LTV/CAC ratio 19x, industry-leading efficiency.',
    reliabilityScore: 93,
  },
  {
    id: 's507',
    title: 'Operating Leverage Analysis - Scale Economics 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-FIN-OPEX-0006',
    fileType: 'pdf',
    fileName: 'Operating_Leverage_Scale_Economics_2025.pdf',
    publishedAt: '2026-01-18',
    author: 'CFO Office',
    excerpt: 'Cost/income ratio improved to 86% from 94% (2024). Revenue per employee €109K (+18% YoY). Technology cost per transaction €0.11 (-18% YoY). Operating leverage target: 80% cost/income by 2027.',
    reliabilityScore: 94,
  },
  {
    id: 's508',
    title: 'FX Trading Revenue Analysis - Currency Exchange Economics 2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-FIN-FX-0007',
    fileType: 'xlsx',
    fileName: 'FX_Trading_Revenue_Analysis_2025.xlsx',
    publishedAt: '2026-02-15',
    author: 'FX Trading',
    excerpt: 'FX revenue €223M (Q4 annualized), €52B exchange volume. Average spread 0.43% (retail), 0.25% (premium), 0.18% (metal). Weekend markup +1%. Competitive vs banks (1.5-3% spreads).',
    reliabilityScore: 92,
  },
  {
    id: 's509',
    title: 'Cash Flow Statement Analysis - Operating Cash Generation 2025',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-FIN-CASHFLOW-0008',
    fileType: 'pdf',
    fileName: 'Cash_Flow_Statement_Analysis_2025.pdf',
    publishedAt: '2026-01-25',
    author: 'Financial Planning',
    excerpt: 'Operating cash flow €624M (FY2025), FCF €546M after capex. Cash conversion 120% (working capital benefit). Capex €78M (12% of revenue), primarily technology. Cash balance €2.1B, no debt.',
    reliabilityScore: 95,
  },
  {
    id: 's510',
    title: 'Revenue Mix Evolution - Product Revenue Contribution 2020-2025',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SP-FIN-REVMIX-0009',
    fileType: 'xlsx',
    fileName: 'Revenue_Mix_Evolution_2020_2025.xlsx',
    publishedAt: '2026-02-08',
    author: 'Strategic Finance',
    excerpt: 'Revenue diversification: Interchange declining from 75% (2020) to 60% (2025), FX stable 25%, subscriptions growing 6% to 10%, new products (crypto, lending) 5%. Diversification reducing concentration risk.',
    reliabilityScore: 93,
  },

  // (Continuing with more financial docs s511-s571...)
  { id: 's511', title: 'Interest Income Forecast - Deposit Monetization 2026-2027', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-INTEREST-0010', fileType: 'pdf', fileName: 'Interest_Income_Forecast_2026_2027.pdf', publishedAt: '2026-01-10', author: 'Treasury', excerpt: 'Interest income projected €240M (2026) from deposit base. Interest rate sensitivity analysis: +100bps scenario €95M incremental. Deposit pricing strategy: 40% pass-through to customers.', reliabilityScore: 91 },
  { id: 's512', title: 'Lending Portfolio Performance - Credit Quality Metrics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-LENDING-0011', fileType: 'xlsx', fileName: 'Lending_Portfolio_Credit_Quality_2025.xlsx', publishedAt: '2026-02-12', author: 'Credit Risk', excerpt: 'Lending portfolio €450M (consumer €280M, business €170M). NPL ratio 2.1%, provision coverage 180%. Average APR 12.5%, net interest margin 8.2%. Credit losses 0.9% of portfolio.', reliabilityScore: 92 },
  { id: 's513', title: 'Premium Subscription ARPU Trends - Pricing Power Analysis 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-ARPU-0012', fileType: 'pdf', fileName: 'Premium_Subscription_ARPU_Trends_2025.pdf', publishedAt: '2026-01-20', author: 'Monetization', excerpt: 'Premium ARPU €13.99/month, up from €12.99 (2024). Price elasticity testing shows -0.4 coefficient. Metal tier €45/month, limited price sensitivity. Tiered pricing optimization ongoing.', reliabilityScore: 90 },
  { id: 's514', title: 'Business Banking Revenue per Account - SMB Economics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-BIZ-0013', fileType: 'xlsx', fileName: 'Business_Banking_Revenue_Account_2025.xlsx', publishedAt: '2026-02-18', author: 'Business Finance', excerpt: 'Business account revenue: Micro €144/year, Small €936/year, Mid-market €5,040/year, Enterprise €34,200/year. Cross-sell ratio 2.8 products/account. Expansion revenue 28% of total business revenue.', reliabilityScore: 93 },
  { id: 's515', title: 'Chargeback & Fraud Loss Ratios - Risk Economics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-FRAUD-0014', fileType: 'pdf', fileName: 'Chargeback_Fraud_Loss_Ratios_2025.pdf', publishedAt: '2026-01-15', author: 'Risk Finance', excerpt: 'Fraud losses €42M (0.04% of volume), industry avg 0.12%. Chargeback rate 0.18% vs industry 0.6%. ML fraud prevention saves estimated €280M annually. False positive cost €12M.', reliabilityScore: 94 },
  { id: 's516', title: 'Transaction Volume Growth Drivers - Volume Decomposition 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-VOLUME-0015', fileType: 'xlsx', fileName: 'Transaction_Volume_Growth_Drivers_2025.xlsx', publishedAt: '2026-02-05', author: 'Analytics', excerpt: 'Transaction volume growth +52% YoY: customer growth +46%, frequency +4%, avg transaction +2%. Power users (12%) contribute 58% of volume. International transaction growth +68% YoY.', reliabilityScore: 92 },
  { id: 's517', title: 'Regulatory Capital Allocation - RWA Optimization 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-CAPITAL-0016', fileType: 'pdf', fileName: 'Regulatory_Capital_Allocation_RWA_2025.pdf', publishedAt: '2026-01-28', author: 'Capital Management', excerpt: 'Risk-weighted assets €2.95B, CET1 ratio 14.2%. Capital allocation: lending 48%, operational risk 32%, market risk 12%, other 8%. ROE on deployed capital 28%, target >25%.', reliabilityScore: 93 },
  { id: 's518', title: 'Revenue Per User Cohort Analysis - ARPU Evolution 2020-2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-COHORT-0017', fileType: 'xlsx', fileName: 'Revenue_Per_User_Cohort_2020_2025.xlsx', publishedAt: '2026-02-10', author: 'Growth Analytics', excerpt: 'ARPU by cohort: 2020 €18/mo, 2021 €19/mo, 2022 €21/mo, 2023 €22/mo, 2024 €23/mo, 2025 €25/mo. Mature cohorts show ARPU growth +12-15% annually driven by cross-sell.', reliabilityScore: 91 },
  { id: 's519', title: 'Technology Development Capitalization - R&D Investment 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-RND-0018', fileType: 'pdf', fileName: 'Technology_Development_Capitalization_RnD_2025.pdf', publishedAt: '2026-01-18', author: 'Engineering Finance', excerpt: 'R&D spend €124M (FY2025), capitalized €38M (31%). Platform investments, ML models, API infrastructure. Amortization period 3-5 years. Innovation pipeline €85M committed (2026-2027).', reliabilityScore: 90 },
  { id: 's520', title: 'Payment Processing Cost Structure - Variable vs Fixed 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-COST-0019', fileType: 'xlsx', fileName: 'Payment_Processing_Cost_Structure_2025.xlsx', publishedAt: '2026-02-15', author: 'Operations Finance', excerpt: 'Payment processing costs: interchange fees 58%, scheme fees 18%, gateway 12%, fraud prevention 8%, other 4%. Variable costs 76%, fixed 24%. Economies of scale improving unit economics.', reliabilityScore: 92 },

  // (Additional financial docs s521-s571 abbreviated for brevity)
  { id: 's521', title: 'Q1 2026 Revenue Guidance - Forward Outlook', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-GUIDANCE-0020', fileType: 'pdf', fileName: 'Q1_2026_Revenue_Guidance_Outlook.pdf', publishedAt: '2026-02-01', author: 'CFO Office', excerpt: 'Q1 2026 revenue guidance €950-€990M (+42-48% YoY). EBITDA margin 15-16%. Transaction volume €195-€205B. Customer additions 3.2-3.5M. Conservative guidance philosophy.', reliabilityScore: 94 },
  { id: 's522', title: 'Geographic Revenue Contribution - Regional Performance 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-GEO-0021', fileType: 'xlsx', fileName: 'Geographic_Revenue_Regional_Performance_2025.xlsx', publishedAt: '2026-01-25', author: 'Regional Finance', excerpt: 'Revenue by region: UK 35% (€1.2B), France 15%, Germany 11%, Spain 9%, Italy 7%, Other EU 18%, ROW 5%. UK mature, EU high growth (+58% avg), ROW investment phase.', reliabilityScore: 93 },
  { id: 's523', title: 'Crypto Trading Revenue Economics - Digital Assets 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-CRYPTO-0022', fileType: 'pdf', fileName: 'Crypto_Trading_Revenue_Economics_2025.pdf', publishedAt: '2026-02-08', author: 'Crypto Finance', excerpt: 'Crypto revenue €46M (Q4 annualized), 3.4M active traders. Average spread 0.68%, trading volume €38B. Volatile quarterly performance correlates with crypto market sentiment. Margin business.', reliabilityScore: 89 },
  { id: 's524', title: 'Working Capital Efficiency - Cash Conversion Cycle 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-WC-0023', fileType: 'xlsx', fileName: 'Working_Capital_Efficiency_CCC_2025.xlsx', publishedAt: '2026-01-12', author: 'Treasury', excerpt: 'Negative working capital cycle -12 days (customer float advantage). DSO 2 days, DPO 14 days. Efficient capital deployment. Float income €45M annually from payment timing.', reliabilityScore: 92 },
  { id: 's525', title: 'Subscription Churn Analysis - Retention Economics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-CHURN-0024', fileType: 'pdf', fileName: 'Subscription_Churn_Retention_Economics_2025.pdf', publishedAt: '2026-02-12', author: 'Retention Finance', excerpt: 'Monthly subscription churn: Plus 4.2%, Premium 2.8%, Metal 1.8%. Annual churn 38%, 29%, 20% respectively. Retention initiatives reduced churn by 1.2pp YoY. LTV impact significant.', reliabilityScore: 91 },
  { id: 's526', title: 'API Revenue Stream - Developer Platform Economics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-API-0025', fileType: 'xlsx', fileName: 'API_Revenue_Developer_Platform_2025.xlsx', publishedAt: '2026-01-20', author: 'Platform Finance', excerpt: 'API platform revenue €42M (FY2025), 12K active developers. Transaction fees, platform subscriptions, premium features. High-margin business (85% gross margin). Growing 68% YoY.', reliabilityScore: 90 },
  { id: 's527', title: 'Tax Expense & Effective Rate - Multi-Jurisdiction Tax 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-TAX-0026', fileType: 'pdf', fileName: 'Tax_Expense_Effective_Rate_2025.pdf', publishedAt: '2026-02-05', author: 'Tax', excerpt: 'Effective tax rate 18.5% (FY2025), below statutory due to R&D credits, loss carryforwards. Tax expense €67M. Deferred tax assets €145M. Tax optimization compliant, no aggressive structures.', reliabilityScore: 93 },
  { id: 's528', title: 'Balance Sheet Leverage Analysis - Debt & Equity Structure 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-LEVERAGE-0027', fileType: 'xlsx', fileName: 'Balance_Sheet_Leverage_Debt_Equity_2025.xlsx', publishedAt: '2026-01-28', author: 'Capital Markets', excerpt: 'Debt/equity ratio 0.40, conservative leverage. Term debt €850M (5-year maturity), covenant light. Equity €2.1B. No immediate refinancing needs. Capacity for €500M additional debt.', reliabilityScore: 94 },
  { id: 's529', title: 'Expense Management Product Revenue - Corporate T&E 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-EXPENSE-0028', fileType: 'pdf', fileName: 'Expense_Management_Product_Revenue_2025.pdf', publishedAt: '2026-02-10', author: 'Product Finance', excerpt: 'Expense management revenue €32M (FY2025), 240K business accounts using feature. Subscription fees, interchange lift. Attachment rate 28% of business accounts. High satisfaction (NPS 62).', reliabilityScore: 91 },
  { id: 's530', title: 'Card Interchange Revenue Optimization - Merchant Category 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-INTERCHANGE-0029', fileType: 'xlsx', fileName: 'Card_Interchange_Revenue_Optimization_2025.xlsx', publishedAt: '2026-01-15', author: 'Card Economics', excerpt: 'Interchange income €312M, blended rate 1.12%. Merchant category mix: retail 28%, travel 18%, restaurants 14%, online 32%, other 8%. Premium cards higher interchange (+42bps avg).', reliabilityScore: 92 },

  // (s531-s571 continuing financial documents)
  { id: 's531', title: 'Revenue Per Transaction by Channel - Distribution Economics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-CHANNEL-0030', fileType: 'pdf', fileName: 'Revenue_Per_Transaction_Channel_2025.pdf', publishedAt: '2026-02-15', author: 'Channel Finance', excerpt: 'RPT by channel: Card POS €0.38, Card online €0.44, FX €2.85, Transfer €1.20, Crypto €4.50. High-value transactions drive revenue concentration. Channel mix optimization ongoing.', reliabilityScore: 90 },
  { id: 's532', title: 'Customer Acquisition by Channel - Marketing ROI 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-ACQUISITION-0031', fileType: 'xlsx', fileName: 'Customer_Acquisition_Channel_ROI_2025.xlsx', publishedAt: '2026-01-22', author: 'Marketing Finance', excerpt: 'CAC by channel: Organic €8, Referral €12, Partnerships €18, Paid social €32, SEM €45, TV €62. Channel shift toward lower-cost acquisition. Blended CAC improving -€6 YoY.', reliabilityScore: 91 },
  { id: 's533', title: 'Premium Tier Conversion Funnel - Upgrade Economics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-PREMIUM-0032', fileType: 'pdf', fileName: 'Premium_Tier_Conversion_Funnel_2025.pdf', publishedAt: '2026-02-08', author: 'Conversion Finance', excerpt: 'Free → Plus conversion 8.2%, Plus → Premium 12.4%, Premium → Metal 4.8%. Trigger events: international travel, high FX usage. Conversion optimization tests show +1.8pp potential uplift.', reliabilityScore: 89 },
  { id: 's534', title: 'Merchant Services Revenue - Business Payment Processing 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-MERCHANT-0033', fileType: 'xlsx', fileName: 'Merchant_Services_Revenue_2025.xlsx', publishedAt: '2026-01-18', author: 'Merchant Finance', excerpt: 'Merchant processing revenue €85M (FY2025), 45K merchants. Average fees 1.4% + €0.20. Competitive vs Stripe, Square. Integration with business banking drives acquisition. Growing 58% YoY.', reliabilityScore: 90 },
  { id: 's535', title: 'Insurance & Protection Product Revenue - Ancillary Income 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-INSURANCE-0034', fileType: 'pdf', fileName: 'Insurance_Protection_Product_Revenue_2025.pdf', publishedAt: '2026-02-12', author: 'Partnerships Finance', excerpt: 'Insurance commission revenue €28M (travel, device, life). Attachment rates: travel 18%, device 12%, life 4%. High-margin partnerships (60% commission share). Customer satisfaction strong.', reliabilityScore: 88 },
  { id: 's536', title: 'International Expansion Investment - Market Entry Costs 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-EXPANSION-0035', fileType: 'xlsx', fileName: 'International_Expansion_Investment_2025.xlsx', publishedAt: '2026-01-25', author: 'Expansion Finance', excerpt: 'Geographic expansion spend €95M (FY2025): regulatory €32M, marketing €38M, operations €25M. Payback period 18-24 months per market. EU expansion mature, ROW investment phase.', reliabilityScore: 91 },
  { id: 's537', title: 'Customer Support Cost Per Ticket - Service Economics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-SUPPORT-0036', fileType: 'pdf', fileName: 'Customer_Support_Cost_Ticket_2025.pdf', publishedAt: '2026-02-05', author: 'Operations Finance', excerpt: 'Support cost per ticket €4.20 (down from €5.80). Automation reducing human intervention 42% → 58% of tickets. Total support cost €228M. Cost per active customer €18 annually.', reliabilityScore: 89 },
  { id: 's538', title: 'Referral Program Economics - Viral Growth Cost 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-REFERRAL-0037', fileType: 'xlsx', fileName: 'Referral_Program_Economics_Viral_2025.xlsx', publishedAt: '2026-01-12', author: 'Growth Finance', excerpt: 'Referral program cost €145M, 12.1M referred customers. CAC €12 vs paid €45. Viral coefficient 1.42. ROI 8.2x accounting for LTV. Best performing acquisition channel by economics.', reliabilityScore: 92 },
  { id: 's539', title: 'Stock Compensation Expense - Equity Incentives 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-STOCKCOMP-0038', fileType: 'pdf', fileName: 'Stock_Compensation_Expense_Equity_2025.pdf', publishedAt: '2026-02-10', author: 'Compensation Finance', excerpt: 'Stock-based compensation €142M (FY2025), 16% of personnel costs. Employee ownership 8.5% of shares. Retention-focused vesting (4-year). Aligns incentives with long-term value creation.', reliabilityScore: 90 },
  { id: 's540', title: 'Payment Processing Infrastructure Cost - Technology Efficiency 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-INFRASTRUCTURE-0039', fileType: 'xlsx', fileName: 'Payment_Processing_Infrastructure_Cost_2025.xlsx', publishedAt: '2026-01-20', author: 'Technology Finance', excerpt: 'Infrastructure cost €145M: AWS €90M, GCP €41M, Azure €14M. Cost per transaction €0.11 (declining -18% YoY). Auto-scaling optimization saving €28M annually. Multi-cloud redundancy.', reliabilityScore: 91 },

  // (s541-s571 final financial documents)
  { id: 's541', title: 'Accounts Receivable & Collections - Credit Management 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-AR-0040', fileType: 'pdf', fileName: 'Accounts_Receivable_Collections_2025.pdf', publishedAt: '2026-02-15', author: 'Credit Management', excerpt: 'AR balance €12M (primarily merchant settlements). DSO 2 days. Collection efficiency 99.2%. Bad debt expense 0.08% of revenue. Automated dunning process. Minimal credit risk.', reliabilityScore: 90 },
  { id: 's542', title: 'Treasury Yield on Customer Deposits - Investment Return 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-TREASURY-0041', fileType: 'xlsx', fileName: 'Treasury_Yield_Customer_Deposits_2025.xlsx', publishedAt: '2026-01-28', author: 'Treasury Management', excerpt: 'Treasury portfolio yield 3.2% on €14.8B deposits. Conservative investment policy: sovereign bonds 68%, deposits 32%. Duration 1.8 years. Net interest margin 2.4% after customer interest.', reliabilityScore: 92 },
  { id: 's543', title: 'Business Account Pricing Strategy - Fee Schedule Optimization 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-PRICING-0042', fileType: 'pdf', fileName: 'Business_Account_Pricing_Strategy_2026.pdf', publishedAt: '2026-02-08', author: 'Pricing Strategy', excerpt: 'Business pricing: Free tier (74% of accounts), Standard €25/mo (18%), Premium €100/mo (6%), Enterprise custom (2%). Transaction fees, FX spreads additional. Freemium conversion 26%.', reliabilityScore: 89 },
  { id: 's544', title: 'Customer Lifetime Value Forecast - Long-term Economics 2026-2030', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-LTV-0043', fileType: 'xlsx', fileName: 'Customer_LTV_Forecast_2026_2030.xlsx', publishedAt: '2026-01-15', author: 'Strategic Finance', excerpt: 'LTV projection: 2026 cohort €850 (base case). Assumptions: 82% retention, 3.4 products, €25 ARPU, 7-year average tenure. Sensitivity analysis: ±20% on retention impacts LTV by ±€240.', reliabilityScore: 91 },
  { id: 's545', title: 'Compliance & Regulatory Cost Structure - Legal Spend 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-COMPLIANCE-0044', fileType: 'pdf', fileName: 'Compliance_Regulatory_Cost_Structure_2025.pdf', publishedAt: '2026-02-12', author: 'Legal Finance', excerpt: 'Compliance costs €85M (FY2025): AML/KYC €32M, legal €24M, regulatory reporting €15M, licenses €14M. Growing with scale but leveraging technology. 4.7% of revenue (declining from 6.2%).', reliabilityScore: 90 },
  { id: 's546', title: 'Product Development ROI - Feature Investment Return 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-PRODUCT-0045', fileType: 'xlsx', fileName: 'Product_Development_ROI_Feature_Investment_2025.xlsx', publishedAt: '2026-01-22', author: 'Product Finance', excerpt: 'Product investment €124M. Top ROI features: expense management (4.2x), crypto (3.8x), business accounts (5.1x), API platform (6.8x). Portfolio approach balances quick wins and long-term bets.', reliabilityScore: 88 },
  { id: 's547', title: 'Card Production & Shipping Economics - Physical Card Costs 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-CARD-0046', fileType: 'pdf', fileName: 'Card_Production_Shipping_Economics_2025.pdf', publishedAt: '2026-02-05', author: 'Card Operations Finance', excerpt: 'Card costs: production €2.80, shipping €1.20, total €4.00 per physical card. Digital cards €0. 8.2M cards issued (2025). Digital adoption 48%, saving €16M annually. Premium cards higher cost.', reliabilityScore: 89 },
  { id: 's548', title: 'Cross-Sell Revenue Attribution - Multi-Product Economics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-CROSSSELL-0047', fileType: 'xlsx', fileName: 'CrossSell_Revenue_Attribution_MultiProduct_2025.xlsx', publishedAt: '2026-01-18', author: 'Growth Finance', excerpt: 'Cross-sell revenue €285M (FY2025). Average products per user 3.2, revenue per product €7.80/mo. Bundling drives retention (+38%) and LTV (+62%). Product recommendation engine ROI 12x.', reliabilityScore: 91 },
  { id: 's549', title: 'Geographic Expansion Payback Analysis - Market Entry ROI 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-GEO-PAYBACK-0048', fileType: 'pdf', fileName: 'Geographic_Expansion_Payback_ROI_2025.pdf', publishedAt: '2026-02-10', author: 'Expansion Finance', excerpt: 'Market entry payback: France 14 months, Germany 16 months, Spain 18 months, Italy 22 months. Mature markets cash positive. New market investment €15-€25M per country. EU regulation streamlines entry.', reliabilityScore: 90 },
  { id: 's550', title: 'Customer Segmentation Revenue Analysis - Cohort Economics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-SEGMENT-0049', fileType: 'xlsx', fileName: 'Customer_Segmentation_Revenue_Cohort_2025.xlsx', publishedAt: '2026-01-25', author: 'Analytics Finance', excerpt: 'Revenue by segment: Power users (12%) contribute 58%, Active (46%) contribute 34%, Casual (28%) 8%. Focus on activating casual users, expanding power user revenue. Segment-specific strategies.', reliabilityScore: 92 },

  // (s551-s571 continue - abbreviated)
  { id: 's551', title: 'Savings Product Economics - Deposit Account Revenue 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-SAVINGS-0050', fileType: 'pdf', fileName: 'Savings_Product_Economics_Deposit_2025.pdf', publishedAt: '2026-02-15', author: 'Deposit Products', excerpt: 'Savings accounts: €4.2B deposits, 8.2M users. Customer rate 1.5% (tier-dependent), treasury yield 3.2%, NIM 1.7%. Engagement driver, LTV impact +€180. Competitive rates drive acquisition.', reliabilityScore: 91 },
  { id: 's552', title: 'Merchant Churn & Retention - B2B Customer Economics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-MERCHANT-CHURN-0051', fileType: 'xlsx', fileName: 'Merchant_Churn_Retention_B2B_2025.xlsx', publishedAt: '2026-01-12', author: 'Merchant Finance', excerpt: 'Merchant churn 18% annually vs industry 25%. Retention drivers: competitive pricing, integrated banking, API quality. Churn reasons: business closure 42%, moved to bank 28%, pricing 18%, other 12%.', reliabilityScore: 89 },
  { id: 's553', title: 'Brand Marketing Investment - Awareness Spend ROI 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-BRAND-0052', fileType: 'pdf', fileName: 'Brand_Marketing_Investment_Awareness_2025.pdf', publishedAt: '2026-02-08', author: 'Marketing Finance', excerpt: 'Brand spend €82M (FY2025): sponsorships €35M, content €24M, PR €12M, events €11M. Aided awareness 68% (UK), 42% (EU avg). Attribution challenging but organic acquisition correlates with awareness.', reliabilityScore: 87 },
  { id: 's554', title: 'Technology Debt Remediation - Platform Modernization Cost 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-TECHDEBT-0053', fileType: 'xlsx', fileName: 'Technology_Debt_Remediation_Platform_2025.xlsx', publishedAt: '2026-01-20', author: 'Engineering Finance', excerpt: 'Tech debt remediation €28M (2025), microservices migration, legacy system retirement. Investment reduces maintenance costs by €12M annually. Platform modernization critical for scaling.', reliabilityScore: 88 },
  { id: 's555', title: 'Contractor vs FTE Economics - Workforce Cost Optimization 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-WORKFORCE-0054', fileType: 'pdf', fileName: 'Contractor_FTE_Economics_Workforce_2025.pdf', publishedAt: '2026-02-12', author: 'People Finance', excerpt: 'Workforce mix: 8,200 FTE, 1,200 contractors (15%). Contractor cost €95/hour avg vs FTE €65 fully loaded. Contractors provide flexibility for peaks, specialized skills. Optimal mix 10-15%.', reliabilityScore: 89 },
  { id: 's556', title: 'Real Estate Portfolio Optimization - Office Space ROI 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-REALESTATE-0055', fileType: 'xlsx', fileName: 'Real_Estate_Portfolio_Optimization_2025.xlsx', publishedAt: '2026-01-28', author: 'Facilities Finance', excerpt: 'Office costs €95M (38 locations). Cost per employee €11.6K annually. Hybrid work enables 30% space reduction. Lease optimization saving €18M over 3 years. HQ London €38M, hubs €57M.', reliabilityScore: 88 },
  { id: 's557', title: 'Sales Commission Structure - Revenue Team Incentives 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-COMMISSION-0056', fileType: 'pdf', fileName: 'Sales_Commission_Structure_Revenue_Incentives_2025.pdf', publishedAt: '2026-02-05', author: 'Sales Finance', excerpt: 'Sales compensation €45M: base €28M, commission €12M, bonuses €5M. Commission rates 8-12% on new business, 3-5% on expansion. Quota attainment 78% avg. Incentive structure aligned with retention.', reliabilityScore: 90 },
  { id: 's558', title: 'Partnership Revenue Share Economics - Co-Sell Agreements 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-PARTNERSHIP-0057', fileType: 'xlsx', fileName: 'Partnership_Revenue_Share_CoSell_2025.xlsx', publishedAt: '2026-01-15', author: 'Partnership Finance', excerpt: 'Partnership channel revenue €32M. Revenue share 15-30% to partners. Accounting software integrations, payroll providers, e-commerce platforms. CAC €18 via partners vs €32 direct. Growing 52% YoY.', reliabilityScore: 89 },
  { id: 's559', title: 'Customer Reactivation Economics - Dormant User Recovery 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-REACTIVATION-0058', fileType: 'pdf', fileName: 'Customer_Reactivation_Dormant_Recovery_2025.pdf', publishedAt: '2026-02-10', author: 'Retention Finance', excerpt: 'Dormant user reactivation: 14% of base, 5.2M users. Win-back campaigns reactivate 8.4% annually. Reactivation cost €8 vs CAC €22. Reactivated user LTV €240 (lower than new due to churn risk).', reliabilityScore: 87 },
  { id: 's560', title: 'Cloud Cost Optimization - Infrastructure Efficiency 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-CLOUD-0059', fileType: 'xlsx', fileName: 'Cloud_Cost_Optimization_Infrastructure_2025.xlsx', publishedAt: '2026-01-22', author: 'Cloud Finance', excerpt: 'Cloud optimization initiatives saved €42M (2025): reserved instances €18M, autoscaling €12M, right-sizing €8M, caching €4M. FinOps team ROI 18x. Continuous optimization culture.', reliabilityScore: 90 },

  // (s561-s571 final financial documents)
  { id: 's561', title: 'Revenue Recognition Policy - Accounting Treatment 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-REVREC-0060', fileType: 'pdf', fileName: 'Revenue_Recognition_Policy_Accounting_2025.pdf', publishedAt: '2026-02-15', author: 'Accounting Policy', excerpt: 'Revenue recognition: transaction fees at point-of-sale, subscriptions ratable over period, FX at trade execution. IFRS 15 compliance. Deferred revenue €28M (prepaid subscriptions). Conservative policy.', reliabilityScore: 93 },
  { id: 's562', title: 'Financial Audit Findings - External Auditor Report 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-AUDIT-0061', fileType: 'xlsx', fileName: 'Financial_Audit_Findings_External_2025.xlsx', publishedAt: '2026-01-18', author: 'External Auditors', excerpt: 'Annual audit findings: unqualified opinion, 0 material weaknesses, 2 control recommendations (both addressed). Clean audit for 3rd consecutive year. Revenue recognition, customer deposits key focus areas.', reliabilityScore: 94 },
  { id: 's563', title: 'Budget vs Actual Variance Analysis - Financial Performance 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-VARIANCE-0062', fileType: 'pdf', fileName: 'Budget_Actual_Variance_Analysis_2025.pdf', publishedAt: '2026-02-08', author: 'FP&A', excerpt: 'FY2025 actuals vs budget: revenue +8% (strong volume), OpEx +3% (controlled), EBITDA +24%. Transaction volume beat by 12%, customer growth beat by 7%. Conservative budgeting philosophy.', reliabilityScore: 92 },
  { id: 's564', title: 'Scenario Planning & Stress Testing - Financial Resilience 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-SCENARIO-0063', fileType: 'xlsx', fileName: 'Scenario_Planning_Stress_Testing_2026.xlsx', publishedAt: '2026-01-25', author: 'Strategic Finance', excerpt: 'Stress scenarios: recession (-30% volume) maintains profitability, competitive pressure (-200bps margin) acceptable, regulatory shock (€50M cost) manageable. Liquidity adequate all scenarios.', reliabilityScore: 91 },
  { id: 's565', title: 'Dividend Policy & Capital Returns - Shareholder Distribution 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-DIVIDEND-0064', fileType: 'pdf', fileName: 'Dividend_Policy_Capital_Returns_2026.pdf', publishedAt: '2026-02-12', author: 'Corporate Finance', excerpt: 'Dividend policy: retain earnings for growth, no dividend planned 2026-2027. Share buyback €0 (growth investment priority). Capital allocation: organic growth 80%, M&A 15%, buffer 5%.', reliabilityScore: 90 },
  { id: 's566', title: 'Depreciation & Amortization Schedule - Asset Lifecycle 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-DA-0065', fileType: 'xlsx', fileName: 'Depreciation_Amortization_Schedule_2025.xlsx', publishedAt: '2026-01-12', author: 'Accounting', excerpt: 'D&A €57M (FY2025): capitalized software €38M (3-5 year amortization), equipment €12M (3-5 years), leasehold improvements €7M (lease term). Non-cash expense, low capital intensity model.', reliabilityScore: 91 },
  { id: 's567', title: 'Foreign Exchange Risk Management - Treasury Hedging 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-FXRISK-0066', fileType: 'pdf', fileName: 'FX_Risk_Management_Treasury_Hedging_2025.pdf', publishedAt: '2026-02-05', author: 'Treasury Risk', excerpt: 'FX exposure: €445M EUR-denominated revenue from non-EUR markets. Hedging policy: 70% operational exposure hedged 6-12 months forward. Translation exposure unhedged. FX impact €12M (2025).', reliabilityScore: 92 },
  { id: 's568', title: 'Revenue Per Employee Benchmarking - Productivity Metrics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-RPE-0067', fileType: 'xlsx', fileName: 'Revenue_Per_Employee_Benchmarking_2025.xlsx', publishedAt: '2026-01-20', author: 'Productivity Analytics', excerpt: 'Revenue per employee €109K vs fintech peers: Stripe €215K, N26 €208K, Monzo €130K. Lower due to operations headcount. Target €150K+ by 2027 through automation. EBITDA/employee €15K.', reliabilityScore: 90 },
  { id: 's569', title: 'Long-Term Incentive Plan - Executive Compensation 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-LTIP-0068', fileType: 'pdf', fileName: 'Long_Term_Incentive_Plan_Executive_2025.pdf', publishedAt: '2026-02-10', author: 'Compensation Committee', excerpt: 'LTIP program: 4-year vesting, performance-based (70%), time-based (30%). Metrics: revenue growth, profitability, customer growth, relative TSR. Executive ownership alignment, retention focus.', reliabilityScore: 89 },
  { id: 's570', title: 'Monthly Financial Dashboard - KPI Tracking December 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-FIN-DASHBOARD-0069', fileType: 'xlsx', fileName: 'Monthly_Financial_Dashboard_KPI_Dec_2025.xlsx', publishedAt: '2026-01-05', author: 'FP&A', excerpt: 'December KPIs: revenue €301M (+4% MoM, +48% YoY), EBITDA €45M (15% margin), customers 38M (+2.1% MoM), transactions 240M (+3% MoM), volume €62B (+5% MoM). Strong finish to year.', reliabilityScore: 94 },
  { id: 's571', title: 'Investor Relations Metrics Package - Public Comparables 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-FIN-IR-0070', fileType: 'pdf', fileName: 'Investor_Relations_Metrics_Package_2025.pdf', publishedAt: '2026-02-15', author: 'Investor Relations', excerpt: 'Comparable metrics: Revenue growth Revolut 48% vs SoFi 24%, Nu 38%. EBITDA margin Revolut 13% vs SoFi 8%, Nu 18%. Customer growth Revolut 46% vs peers 20-30%. Premium valuation justified.', reliabilityScore: 92 },

  // Customer Analytics (s572-s621) - Continuing Tier 2
  { id: 's572', title: 'Mobile App Engagement Metrics - User Behavior Analysis Q4 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-MOBILE-0001', fileType: 'xlsx', fileName: 'Mobile_App_Engagement_Behavior_Q4_2025.xlsx', publishedAt: '2026-01-18', author: 'Product Analytics', excerpt: 'Daily active users 22% of base, weekly 42%, monthly 69%. Average session duration 4.2 minutes, 8.5 sessions/week. Feature usage: payments 92%, balance check 78%, FX 34%, savings 28%, crypto 18%.', reliabilityScore: 92 },
  { id: 's573', title: 'Customer Demographic Breakdown - Age & Income Segmentation 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-DEMO-0002', fileType: 'pdf', fileName: 'Customer_Demographic_Age_Income_2025.pdf', publishedAt: '2026-02-08', author: 'Market Research', excerpt: 'Age distribution: 18-24 (18%), 25-34 (42%), 35-44 (24%), 45-54 (11%), 55+ (5%). Income: <€30K (28%), €30-60K (45%), €60-100K (18%), >€100K (9%). Young, urban, tech-savvy demographic.', reliabilityScore: 90 },
  { id: 's574', title: 'International Transaction Patterns - Cross-Border Behavior 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-INTL-0003', fileType: 'xlsx', fileName: 'International_Transaction_Patterns_CrossBorder_2025.xlsx', publishedAt: '2026-01-25', author: 'Transaction Analytics', excerpt: 'Cross-border users 34% of base (12.9M). Average 6.8 international transactions/month, €485 avg value. Top corridors: UK-EU, intra-EU. Travel spending peaks Jun-Sep. FX revenue €178 per international user annually.', reliabilityScore: 91 },
  { id: 's575', title: 'Premium Feature Adoption Rates - Tier Analysis 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-PREMIUM-0004', fileType: 'pdf', fileName: 'Premium_Feature_Adoption_Tier_2025.pdf', publishedAt: '2026-02-12', author: 'Premium Analytics', excerpt: 'Premium tier usage: travel insurance 68%, airport lounge 42%, concierge 18%, enhanced limits 94%. Metal tier: exclusive events 52%, crypto cashback 72%, custom card 88%. Feature utilization correlates with retention.', reliabilityScore: 89 },
  { id: 's576', title: 'Customer Feedback Analysis - NPS Driver Identification 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-NPS-0005', fileType: 'xlsx', fileName: 'Customer_Feedback_NPS_Drivers_2025.xlsx', publishedAt: '2026-01-12', author: 'Customer Experience', excerpt: 'NPS drivers: FX rates (impact +12 points), app usability (+10), customer service (+8), features (+7), reliability (+6). Detractor reasons: support delays (42%), feature requests (28%), fees (18%), bugs (12%).', reliabilityScore: 88 },
  { id: 's577', title: 'Account Dormancy Patterns - Inactivity Analysis 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-DORMANCY-0006', fileType: 'pdf', fileName: 'Account_Dormancy_Inactivity_Analysis_2025.pdf', publishedAt: '2026-02-05', author: 'Retention Analytics', excerpt: 'Dormant accounts (>90 days no txn): 14% of base. Reactivation triggers: travel season, marketing campaigns, product updates. Dormancy predictors: single product usage, low initial engagement, no app login 60 days.', reliabilityScore: 87 },
  { id: 's578', title: 'Transaction Frequency Distribution - Usage Segmentation 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-FREQUENCY-0007', fileType: 'xlsx', fileName: 'Transaction_Frequency_Usage_Segmentation_2025.xlsx', publishedAt: '2026-01-20', author: 'Behavioral Analytics', excerpt: 'Transaction frequency: <1/month 22%, 1-5 28%, 5-20 38%, >20 12%. High-frequency users (>20 txns) generate 58% revenue. Frequency correlates with multi-product adoption, premium tiers, retention.', reliabilityScore: 90 },
  { id: 's579', title: 'Customer Acquisition Source Analysis - Channel Attribution 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-ACQUISITION-0008', fileType: 'pdf', fileName: 'Customer_Acquisition_Source_Channel_2025.pdf', publishedAt: '2026-02-10', author: 'Growth Analytics', excerpt: 'Acquisition sources: organic 42%, referral 34%, paid social 12%, SEM 8%, partnerships 4%. Organic quality highest (LTV €680), referral strong (€580). Paid acquisition improving with targeting optimization.', reliabilityScore: 91 },
  { id: 's580', title: 'Social Media Engagement & Brand Sentiment - Digital Presence 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-SOCIAL-0009', fileType: 'xlsx', fileName: 'Social_Media_Engagement_Brand_Sentiment_2025.xlsx', publishedAt: '2026-01-28', author: 'Brand Analytics', excerpt: 'Social followers: Twitter 2.4M, Instagram 3.2M, LinkedIn 850K, TikTok 1.8M. Sentiment 72% positive, 18% neutral, 10% negative. Community engagement drives organic acquisition (+28% correlation).', reliabilityScore: 86 },

  // Remaining customer analytics docs (s581-s621) - abbreviated
  { id: 's581', title: 'Device & Platform Usage - Technology Preferences 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-DEVICE-0010', fileType: 'pdf', fileName: 'Device_Platform_Usage_Technology_2025.pdf', publishedAt: '2026-02-15', author: 'Product Analytics', excerpt: 'Platform usage: iOS 52%, Android 46%, Web 2%. Mobile-first optimization critical. iOS users higher ARPU (+€4/month) and retention (+6pp).', reliabilityScore: 89 },
  { id: 's582', title: 'Customer Journey Mapping - Onboarding to Activation 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-JOURNEY-0011', fileType: 'xlsx', fileName: 'Customer_Journey_Onboarding_Activation_2025.xlsx', publishedAt: '2026-01-15', author: 'UX Research', excerpt: 'Journey stages: awareness → signup (35%), signup → verification (86%), verification → funding (83%), funding → first txn (90%). Drop-off points identified.', reliabilityScore: 88 },
  { id: 's583', title: 'Multi-Product Holding Analysis - Product Combinations 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-MULTIPRODUCT-0012', fileType: 'pdf', fileName: 'Multi_Product_Holding_Combinations_2025.pdf', publishedAt: '2026-02-08', author: 'Product Strategy', excerpt: 'Product combinations: Account+Card 91%, Account+Card+FX 44%, Account+Card+FX+Savings 28%. Bundle LTV analysis.', reliabilityScore: 90 },
  { id: 's584', title: 'Payment Card Usage Patterns - Merchant Category Analysis 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-MERCHANT-0013', fileType: 'xlsx', fileName: 'Payment_Card_Merchant_Category_2025.xlsx', publishedAt: '2026-01-22', author: 'Card Analytics', excerpt: 'Merchant categories: retail 28%, travel 18%, restaurants 14%, online 32%, other 8%. Contactless adoption 82%.', reliabilityScore: 89 },
  { id: 's585', title: 'Customer Education & Financial Literacy - User Knowledge 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-EDUCATION-0014', fileType: 'pdf', fileName: 'Customer_Education_Financial_Literacy_2025.pdf', publishedAt: '2026-02-12', author: 'Education Team', excerpt: 'Financial literacy program engagement: 2.8M users. Educational content correlates with product adoption (+24%) and retention (+18%).', reliabilityScore: 85 },
  { id: 's586', title: 'In-App Notification Effectiveness - Engagement Channels 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-NOTIFICATION-0015', fileType: 'xlsx', fileName: 'InApp_Notification_Effectiveness_2025.xlsx', publishedAt: '2026-01-18', author: 'Growth Product', excerpt: 'Push notification open rate 28%, in-app message CTR 12%, email open 22%. Personalized notifications +42% engagement.', reliabilityScore: 87 },
  { id: 's587', title: 'Business vs Personal Account Usage - Dual Account Holders 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-DUAL-0016', fileType: 'pdf', fileName: 'Business_Personal_Account_Dual_Holders_2025.pdf', publishedAt: '2026-02-05', author: 'Segment Analytics', excerpt: 'Dual account holders: 540K. Combined LTV €1,450 vs personal-only €420. Cross-sell opportunity significant.', reliabilityScore: 90 },
  { id: 's588', title: 'Customer Complaints Root Cause Analysis - Issue Categories 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-COMPLAINTS-0017', fileType: 'xlsx', fileName: 'Customer_Complaints_RootCause_Categories_2025.xlsx', publishedAt: '2026-01-25', author: 'Customer Operations', excerpt: 'Complaint categories: card issues 28%, support response time 22%, account access 18%. Resolution time 4.2 hours avg.', reliabilityScore: 88 },
  { id: 's589', title: 'Crypto User Behavior - Digital Asset Engagement 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-CRYPTO-0018', fileType: 'pdf', fileName: 'Crypto_User_Behavior_Digital_Asset_2025.pdf', publishedAt: '2026-02-10', author: 'Crypto Analytics', excerpt: 'Crypto users: 3.4M (9% of base). Average holdings €1,240. Top assets: BTC 48%, ETH 32%, other 20%.', reliabilityScore: 87 },
  { id: 's590', title: 'Geographical User Concentration - Urban vs Rural 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-GEO-0019', fileType: 'xlsx', fileName: 'Geographical_User_Urban_Rural_2025.xlsx', publishedAt: '2026-01-12', author: 'Market Analytics', excerpt: 'Urban concentration 68% of users, rural 32%. London 22% of UK users, Paris 18% of France, Berlin 24% of Germany.', reliabilityScore: 89 },

  // (s591-s621 continuing - abbreviated for file size)
  { id: 's591', title: 'Savings Account Holder Analysis - Deposit Behavior 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-SAVINGS-0020', fileType: 'pdf', fileName: 'Savings_Account_Holder_Deposit_Behavior_2025.pdf', publishedAt: '2026-02-15', author: 'Deposit Analytics', excerpt: 'Savings users: 8.2M (22% of base). Average balance €512. Goal-based savings adoption 38%. Savings users retention 88%.', reliabilityScore: 90 },
  { id: 's592', title: 'Customer Service Channel Preferences - Support Contact 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-SUPPORT-0021', fileType: 'xlsx', fileName: 'Customer_Service_Channel_Preferences_2025.xlsx', publishedAt: '2026-01-20', author: 'CX Analytics', excerpt: 'Support channel preference: in-app chat 78%, email 18%, phone 4%. Self-service resolution 58%. CSAT by channel analyzed.', reliabilityScore: 88 },
  { id: 's593', title: 'Referral Program Participant Behavior - Viral Mechanics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-REFERRAL-0022', fileType: 'pdf', fileName: 'Referral_Program_Participant_Viral_2025.pdf', publishedAt: '2026-02-08', author: 'Growth Analytics', excerpt: 'Referral participants: 18M users sent invite (47%). Average referrals sent 2.8, conversion rate 24%. Viral coefficient 1.42.', reliabilityScore: 91 },
  { id: 's594', title: 'Account Funding Methods - Deposit Channel Analysis 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-FUNDING-0023', fileType: 'xlsx', fileName: 'Account_Funding_Methods_Deposit_Channel_2025.xlsx', publishedAt: '2026-01-28', author: 'Payments Analytics', excerpt: 'Funding methods: bank transfer 68%, card top-up 24%, direct deposit 6%, cash 2%. Average funding €285.', reliabilityScore: 89 },
  { id: 's595', title: 'App Rating & Review Sentiment Analysis - User Feedback 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-REVIEWS-0024', fileType: 'pdf', fileName: 'App_Rating_Review_Sentiment_2025.pdf', publishedAt: '2026-02-12', author: 'Product Analytics', excerpt: 'App store ratings: iOS 4.7/5, Android 4.6/5. Sentiment themes: positive (ease of use, FX rates), negative (support, verification).', reliabilityScore: 87 },
  { id: 's596', title: 'Weekend vs Weekday Transaction Patterns - Temporal Behavior 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-TEMPORAL-0025', fileType: 'xlsx', fileName: 'Weekend_Weekday_Transaction_Patterns_2025.xlsx', publishedAt: '2026-01-15', author: 'Behavioral Analytics', excerpt: 'Transaction patterns: weekday 72%, weekend 28%. Weekend higher leisure spending. Peak hours: 12-2pm, 7-9pm.', reliabilityScore: 88 },
  { id: 's597', title: 'Customer Age Cohort Retention - Generational Analysis 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-COHORT-0026', fileType: 'pdf', fileName: 'Customer_Age_Cohort_Retention_Generational_2025.pdf', publishedAt: '2026-02-05', author: 'Demographic Analytics', excerpt: 'Retention by age: 18-24 (76%), 25-34 (82%), 35-44 (86%), 45+ (88%). Product preferences vary by generation.', reliabilityScore: 89 },
  { id: 's598', title: 'Business Customer Vertical Analysis - Industry Segmentation 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-VERTICAL-0027', fileType: 'xlsx', fileName: 'Business_Customer_Vertical_Industry_2025.xlsx', publishedAt: '2026-01-22', author: 'Business Analytics', excerpt: 'Business account industries: e-commerce 22%, professional services 19%, tech 16%, retail 13%, hospitality 10%.', reliabilityScore: 90 },
  { id: 's599', title: 'Feature Request Prioritization - User Demand Analysis 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-FEATURES-0028', fileType: 'pdf', fileName: 'Feature_Request_Prioritization_Demand_2025.pdf', publishedAt: '2026-02-10', author: 'Product Management', excerpt: 'Top feature requests: joint accounts (12K requests), budgeting tools (8K), improved search (6K), recurring payments (5K).', reliabilityScore: 86 },
  { id: 's600', title: 'Customer Tenure Analysis - Longevity Segmentation 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-TENURE-0029', fileType: 'xlsx', fileName: 'Customer_Tenure_Longevity_Segmentation_2025.xlsx', publishedAt: '2026-01-18', author: 'Retention Analytics', excerpt: 'Tenure distribution: <6mo 24%, 6-12mo 18%, 1-2yr 22%, 2-3yr 16%, 3+yr 20%. Tenure correlates with LTV exponentially.', reliabilityScore: 91 },

  // (s601-s621 final customer docs - abbreviated)
  { id: 's601', title: 'Payment Decline Analysis - Transaction Failure Patterns 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-DECLINE-0030', fileType: 'pdf', fileName: 'Payment_Decline_Transaction_Failure_2025.pdf', publishedAt: '2026-02-15', author: 'Fraud & Payments', excerpt: 'Decline reasons: insufficient funds 42%, fraud suspicion 28%, technical issues 18%. False positive rate 0.8%.', reliabilityScore: 88 },
  { id: 's602', title: 'Cross-Platform User Behavior - Multi-Device Usage 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-PLATFORM-0031', fileType: 'xlsx', fileName: 'Cross_Platform_MultiDevice_Usage_2025.xlsx', publishedAt: '2026-01-25', author: 'Product Analytics', excerpt: 'Multi-device users: 34% use 2+ platforms. Primary: mobile 94%, secondary: web 42%. Multi-device users higher engagement (+38%).', reliabilityScore: 87 },
  { id: 's603', title: 'Spending Category Analysis - User Financial Behavior 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-SPENDING-0032', fileType: 'pdf', fileName: 'Spending_Category_Financial_Behavior_2025.pdf', publishedAt: '2026-02-08', author: 'Financial Analytics', excerpt: 'Spending categories: retail 28%, food & dining 18%, travel 14%, bills 12%, entertainment 10%, other 18%.', reliabilityScore: 89 },
  { id: 's604', title: 'Customer Acquisition Time Series - Seasonality Patterns 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-SEASONALITY-0033', fileType: 'xlsx', fileName: 'Customer_Acquisition_Time_Series_Seasonality_2025.xlsx', publishedAt: '2026-01-12', author: 'Growth Analytics', excerpt: 'Seasonal acquisition: peaks Jan (+28%), Sep (+18%), Nov (+22%). Summer months -12% vs avg.', reliabilityScore: 90 },
  { id: 's605', title: 'Direct Deposit Holder Characteristics - Salary Account Usage 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-DIRECTDEPOSIT-0034', fileType: 'pdf', fileName: 'Direct_Deposit_Holder_Salary_Account_2025.pdf', publishedAt: '2026-02-12', author: 'Account Analytics', excerpt: 'Direct deposit users: 2.8M (7%). Average monthly deposit €2,450. Retention 94%, ARPU €42. Primary account indicator.', reliabilityScore: 91 },
  { id: 's606', title: 'Payment Method Preferences - Consumer Choice Patterns 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-PAYMETHOD-0035', fileType: 'xlsx', fileName: 'Payment_Method_Preferences_Consumer_Choice_2025.xlsx', publishedAt: '2026-01-20', author: 'Payments Research', excerpt: 'Preferred payment methods: physical card 52%, digital card/wallet 38%, bank transfer 8%, cash 2%. Generational differences.', reliabilityScore: 88 },
  { id: 's607', title: 'Account Sharing & Household Usage - Multi-User Patterns 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-HOUSEHOLD-0036', fileType: 'pdf', fileName: 'Account_Sharing_Household_MultiUser_2025.pdf', publishedAt: '2026-02-05', author: 'User Research', excerpt: 'Household usage insights: joint account requests high. Shared cards: 18% users add additional users. Product opportunity identified.', reliabilityScore: 85 },
  { id: 's608', title: 'Customer Privacy Concerns - Data Security Perception 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-PRIVACY-0037', fileType: 'xlsx', fileName: 'Customer_Privacy_Data_Security_Perception_2025.xlsx', publishedAt: '2026-01-28', author: 'Trust & Safety', excerpt: 'Privacy sentiment: 78% trust data handling, 82% value security features. Transparency builds trust.', reliabilityScore: 87 },
  { id: 's609', title: 'Customer Reactivation Success Metrics - Win-Back Campaign 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-WINBACK-0038', fileType: 'pdf', fileName: 'Customer_Reactivation_WinBack_Campaign_2025.pdf', publishedAt: '2026-02-10', author: 'Retention Marketing', excerpt: 'Win-back programs: 8.4% reactivation rate. Successful triggers: new features (12%), travel season (14%), premium trials (18%).', reliabilityScore: 86 },
  { id: 's610', title: 'Business Owner Demographic Profile - SMB Characteristics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-SMBBUSINESS-0039', fileType: 'xlsx', fileName: 'Business_Owner_Demographic_SMB_Profile_2025.xlsx', publishedAt: '2026-01-15', author: 'Business Research', excerpt: 'Business owner demographics: age 35-44 (38%), first-time founders 62%, tech/digital sectors 48%. International operations 34%.', reliabilityScore: 89 },
  { id: 's611', title: 'Onboarding Drop-off Analysis - Conversion Funnel Optimization 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-DROPOFF-0040', fileType: 'pdf', fileName: 'Onboarding_Dropoff_Conversion_Funnel_2025.pdf', publishedAt: '2026-02-15', author: 'Conversion Analytics', excerpt: 'Drop-off points: document upload 22%, selfie verification 12%, address proof 8%. OCR automation improvements.', reliabilityScore: 87 },
  { id: 's612', title: 'Premium Tier Downgrade Analysis - Churn Patterns 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-DOWNGRADE-0041', fileType: 'xlsx', fileName: 'Premium_Tier_Downgrade_Churn_Patterns_2025.xlsx', publishedAt: '2026-01-22', author: 'Subscription Analytics', excerpt: 'Downgrade rate: Plus 4.8%, Premium 3.2%, Metal 2.1% quarterly. Retention offers prevent 28% of downgrades.', reliabilityScore: 88 },
  { id: 's613', title: 'Mobile Wallet vs Physical Card Preference - Payment Instrument 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-WALLET-0042', fileType: 'pdf', fileName: 'Mobile_Wallet_Physical_Card_Preference_2025.pdf', publishedAt: '2026-02-08', author: 'Payments Behavior', excerpt: 'Digital wallet adoption 48%, physical card 52%. Wallet users: younger, higher engagement (+24%). Trend toward digital.', reliabilityScore: 89 },
  { id: 's614', title: 'Customer Financial Health Indicators - Balance & Activity Trends 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-HEALTH-0043', fileType: 'xlsx', fileName: 'Customer_Financial_Health_Balance_Activity_2025.xlsx', publishedAt: '2026-01-18', author: 'Financial Wellness', excerpt: 'Financial health metrics: avg balance €389, monthly inflow €1,840, outflow €1,720. Savings rate 6.5%.', reliabilityScore: 86 },
  { id: 's615', title: 'Account Recovery & Security Incident Response - User Impact 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-SECURITY-0044', fileType: 'pdf', fileName: 'Account_Recovery_Security_Incident_Response_2025.pdf', publishedAt: '2026-02-12', author: 'Security Operations', excerpt: 'Security incidents: account lockouts 0.8% monthly, password resets 12%. Recovery time 18 minutes avg. Proactive monitoring.', reliabilityScore: 90 },
  { id: 's616', title: 'Subscription Trial Conversion - Freemium to Paid 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-TRIAL-0045', fileType: 'xlsx', fileName: 'Subscription_Trial_Conversion_Freemium_2025.xlsx', publishedAt: '2026-01-25', author: 'Monetization Analytics', excerpt: 'Trial-to-paid conversion: Plus 18%, Premium 24%, Metal 32%. Trial length 30 days optimal.', reliabilityScore: 88 },
  { id: 's617', title: 'Customer Lifetime Revenue Curve - Monetization Trajectory 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-REVENUE-0046', fileType: 'pdf', fileName: 'Customer_Lifetime_Revenue_Curve_Trajectory_2025.pdf', publishedAt: '2026-02-05', author: 'Revenue Analytics', excerpt: 'Revenue curve: Month 1 €8, Month 6 €18, Month 12 €24, Month 24 €32, Month 36+ €38. Product adoption drives curve steepness.', reliabilityScore: 91 },
  { id: 's618', title: 'Account Verification Challenges - KYC Friction Analysis 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-KYC-0047', fileType: 'xlsx', fileName: 'Account_Verification_KYC_Friction_Analysis_2025.xlsx', publishedAt: '2026-01-12', author: 'Compliance UX', excerpt: 'KYC completion: instant 62%, manual review 32%, rejected 6%. AI improvements +12pp instant approval rate.', reliabilityScore: 89 },
  { id: 's619', title: 'Customer Support Ticket Resolution - First Contact Resolution 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-RESOLUTION-0048', fileType: 'pdf', fileName: 'Support_Ticket_Resolution_FirstContact_2025.pdf', publishedAt: '2026-02-10', author: 'Support Quality', excerpt: 'First contact resolution: 72% (target 80%). Resolution by channel: chat 68%, email 74%, phone 86%.', reliabilityScore: 87 },
  { id: 's620', title: 'Merchant Feedback from Business Customers - B2B Satisfaction 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-CUST-MERCHANT-0049', fileType: 'xlsx', fileName: 'Merchant_Feedback_Business_Satisfaction_2025.xlsx', publishedAt: '2026-01-20', author: 'Business CX', excerpt: 'Business customer NPS 58. Satisfaction drivers: competitive pricing (92%), ease of integration (88%), settlement speed (84%).', reliabilityScore: 88 },
  { id: 's621', title: 'User Complaints Sentiment & Trends - Voice of Customer 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-CUST-VOC-0050', fileType: 'pdf', fileName: 'User_Complaints_Sentiment_Trends_VOC_2025.pdf', publishedAt: '2026-02-15', author: 'Customer Insights', excerpt: 'Complaint themes (NLP analysis): support wait times 28%, verification delays 18%, feature requests 22%, app bugs 14%.', reliabilityScore: 86 },

  // Competitive Intelligence (s622-s661) - 40 docs abbreviated
  { id: 's622', title: 'Monzo Product Roadmap Analysis - UK Competitor Strategy 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-MONZO-ROADMAP-0001', fileType: 'pdf', fileName: 'Monzo_Product_Roadmap_UK_Competitor_2026.pdf', publishedAt: '2026-02-12', author: 'Competitive Intelligence', excerpt: 'Monzo 2026 focus: lending scale-up, premium tier relaunch, business banking expansion. Threat level: moderate UK, low EU.', reliabilityScore: 89 },
  { id: 's623', title: 'Adyen Payment Processing Competitive Positioning 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-ADYEN-0002', fileType: 'xlsx', fileName: 'Adyen_Payment_Processing_Positioning_2026.xlsx', publishedAt: '2026-01-18', author: 'Payments Strategy', excerpt: 'Adyen: enterprise focus, 38 global markets. Limited direct competition with Revolut SMB focus.', reliabilityScore: 90 },
  { id: 's624', title: 'Klarna Banking Services Expansion - BNPL to Banking 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-KLARNA-BANK-0003', fileType: 'pdf', fileName: 'Klarna_Banking_Services_Expansion_2026.pdf', publishedAt: '2026-02-08', author: 'Strategic Intelligence', excerpt: 'Klarna banking license (Sweden), expanding beyond BNPL. Savings accounts, cards planned. Monitor closely.', reliabilityScore: 87 },
  { id: 's625', title: 'Curve Aggregation Model - Competitive Dynamics 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-CURVE-0004', fileType: 'xlsx', fileName: 'Curve_Aggregation_Model_Competitive_2026.xlsx', publishedAt: '2026-01-25', author: 'Product Strategy', excerpt: 'Curve: card aggregation model, 3.5M users. Potential partnership opportunity vs competition.', reliabilityScore: 85 },
  { id: 's626', title: 'Apple Pay & Google Pay - Tech Giant Threat Assessment 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-TECHGIANTS-0005', fileType: 'pdf', fileName: 'Apple_Google_Pay_TechGiant_Threat_2026.pdf', publishedAt: '2026-02-15', author: 'Competitive Analysis', excerpt: 'Apple/Google Pay: payment methods not banking. Complementary to Revolut. Monitor Apple savings expansion.', reliabilityScore: 86 },
  { id: 's627', title: 'Coinbase European Expansion - Crypto Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-COINBASE-EU-0006', fileType: 'xlsx', fileName: 'Coinbase_European_Expansion_Crypto_2026.xlsx', publishedAt: '2026-01-12', author: 'Digital Assets', excerpt: 'Coinbase EU focus: MiCA licenses, institutional services. Limited retail banking overlap. Coexistence likely.', reliabilityScore: 88 },
  { id: 's628', title: 'Starling Bank Business Model - UK SMB Comparison 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-STARLING-MODEL-0007', fileType: 'pdf', fileName: 'Starling_Bank_Business_Model_SMB_2026.pdf', publishedAt: '2026-02-10', author: 'Business Banking Intel', excerpt: 'Starling: SMB focus, lending-driven, relationship banking. UK-only. Head-to-head win rate Revolut 58%.', reliabilityScore: 91 },
  { id: 's629', title: 'Payoneer Cross-Border Business Payments - B2B Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-PAYONEER-0008', fileType: 'xlsx', fileName: 'Payoneer_CrossBorder_B2B_Competition_2026.xlsx', publishedAt: '2026-01-20', author: 'International Payments', excerpt: 'Payoneer: freelancer focus, marketplace integrations. Overlap: international payments. Potential partnership.', reliabilityScore: 86 },
  { id: 's630', title: 'TransferWise (Wise) Pricing Strategy Evolution 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-WISE-PRICING-0009', fileType: 'pdf', fileName: 'Wise_Pricing_Strategy_Evolution_2026.pdf', publishedAt: '2026-02-05', author: 'Pricing Intelligence', excerpt: 'Wise transparent pricing model. Revolut price-competitive within 10bps. Pricing gap narrowing.', reliabilityScore: 89 },

  // (s631-s661 abbreviated competitive docs)
  { id: 's631', title: 'Robinhood European Entry Speculation - Investment App Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-ROBINHOOD-0010', fileType: 'xlsx', fileName: 'Robinhood_European_Entry_Speculation_2026.xlsx', publishedAt: '2026-01-28', author: 'Trading Competition', excerpt: 'Robinhood European entry rumored. UK crypto license acquired. Threat level: low near-term.', reliabilityScore: 83 },
  { id: 's632', title: 'Banking-as-a-Service Providers - Infrastructure Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-BAAS-0011', fileType: 'pdf', fileName: 'BaaS_Providers_Infrastructure_Competition_2026.pdf', publishedAt: '2026-02-12', author: 'Platform Strategy', excerpt: 'BaaS providers enable embedded banking. Revolut response: white-label offering, API platform.', reliabilityScore: 85 },
  { id: 's633', title: 'Crypto.com Expansion Strategy - Digital Asset Banking 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-CRYPTOCOM-0012', fileType: 'xlsx', fileName: 'Crypto.com_Expansion_Digital_Asset_2026.xlsx', publishedAt: '2026-01-15', author: 'Crypto Intel', excerpt: 'Crypto.com: card program, crypto-first banking. Market segmentation natural.', reliabilityScore: 84 },
  { id: 's634', title: 'Lloyds Bank Digital Transformation - Incumbent Response 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-LLOYDS-DIGITAL-0013', fileType: 'pdf', fileName: 'Lloyds_Bank_Digital_Transformation_2026.pdf', publishedAt: '2026-02-08', author: 'UK Market Intel', excerpt: 'Lloyds digital investment £3B (2024-2026). Legacy burden limits agility. Revolut advantages: speed, innovation.', reliabilityScore: 88 },
  { id: 's635', title: 'Varo Bank US Neobank Model - Learnings for Europe 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-VARO-0014', fileType: 'xlsx', fileName: 'Varo_Bank_US_Neobank_Learnings_2026.xlsx', publishedAt: '2026-01-22', author: 'Market Research', excerpt: 'Varo: US national bank charter. No direct EU overlap. Insights applicable to US expansion strategy.', reliabilityScore: 82 },
  { id: 's636', title: 'Deutsche Bank Digital Neobank Launch - Incumbent Neobank 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-DB-NEO-0015', fileType: 'pdf', fileName: 'Deutsche_Bank_Digital_Neobank_Launch_2026.pdf', publishedAt: '2026-02-15', author: 'Germany Strategy', excerpt: 'Deutsche Bank digital sub-brand planned (2027). Youth targeting, standalone app. Monitor closely.', reliabilityScore: 86 },
  { id: 's637', title: 'Affirm European BNPL Entry - Credit Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-AFFIRM-0016', fileType: 'xlsx', fileName: 'Affirm_European_BNPL_Entry_2026.xlsx', publishedAt: '2026-01-18', author: 'Credit Strategy', excerpt: 'Affirm: US BNPL leader exploring EU. Revolut installment feature competitive.', reliabilityScore: 85 },
  { id: 's638', title: 'Plaid Open Banking Data - Infrastructure Landscape 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-PLAID-0017', fileType: 'pdf', fileName: 'Plaid_Open_Banking_Data_Infrastructure_2026.pdf', publishedAt: '2026-02-10', author: 'Open Banking', excerpt: 'Plaid: account aggregation. Neutral infrastructure. Revolut uses Plaid for some markets.', reliabilityScore: 84 },
  { id: 's639', title: 'Tink European Open Banking - Data Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-TINK-0018', fileType: 'xlsx', fileName: 'Tink_European_Open_Banking_Data_2026.xlsx', publishedAt: '2026-02-05', author: 'Data Strategy', excerpt: 'Tink (Visa-owned): EU open banking infrastructure. Partnership opportunity for PFM features.', reliabilityScore: 83 },
  { id: 's640', title: 'Marcus by Goldman Sachs - Premium Banking Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-MARCUS-0019', fileType: 'pdf', fileName: 'Marcus_Goldman_Sachs_Premium_Banking_2026.pdf', publishedAt: '2026-01-25', author: 'Premium Segment', excerpt: 'Marcus: savings and loans, premium positioning. Limited overlap. UK retreat rumors.', reliabilityScore: 86 },

  // (s641-s661 final competitive docs - abbreviated for space)
  { id: 's641', title: 'SumUp Business Services - SMB Acquirer Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-SUMUP-0020', fileType: 'xlsx', fileName: 'SumUp_Business_Services_SMB_Acquirer_2026.xlsx', publishedAt: '2026-02-12', author: 'Merchant Services', excerpt: 'SumUp: POS hardware, merchant acquiring. Coexistence in different SMB segments.', reliabilityScore: 87 },
  { id: 's642', title: 'Vivid Money Investment Features - Neobank Trading 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-VIVID-INVEST-0021', fileType: 'pdf', fileName: 'Vivid_Money_Investment_Features_Trading_2026.pdf', publishedAt: '2026-01-12', author: 'Investment Competition', excerpt: 'Vivid: investment-focused, cashback aggressive. Cashback subsidy unsustainable long-term.', reliabilityScore: 84 },
  { id: 's643', title: 'JP Morgan Chase Digital Banking - US Incumbent Playbook 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-JPMC-0022', fileType: 'xlsx', fileName: 'JPMorgan_Chase_Digital_Banking_Playbook_2026.xlsx', publishedAt: '2026-02-08', author: 'Market Research', excerpt: 'Chase digital success (US). Lessons: scale advantages. EU entry barriers high. No direct competition.', reliabilityScore: 82 },
  { id: 's644', title: 'Zopa Bank Lending Model - UK Credit Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-ZOPA-0023', fileType: 'pdf', fileName: 'Zopa_Bank_Lending_Model_UK_Credit_2026.pdf', publishedAt: '2026-01-20', author: 'Lending Intelligence', excerpt: 'Zopa: lending-first neobank. Profitable lending model. Potential partnership opportunity.', reliabilityScore: 85 },
  { id: 's645', title: 'ANT Group (Alipay) European Strategy - Asian Expansion 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-ANT-0024', fileType: 'xlsx', fileName: 'ANT_Alipay_European_Strategy_Asian_Expansion_2026.xlsx', publishedAt: '2026-02-15', author: 'International Intel', excerpt: 'ANT Group: Chinese tourist payment acceptance. Revolut opportunity: tourist acceptance partnerships.', reliabilityScore: 81 },
  { id: 's646', title: 'Revolut Competitive Win/Loss Analysis - Market Share Trends 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-WINLOSS-0025', fileType: 'pdf', fileName: 'Revolut_Competitive_WinLoss_MarketShare_2025.pdf', publishedAt: '2026-01-28', author: 'Sales Intelligence', excerpt: 'Win rate vs competitors: N26 62%, Monzo 58%, Traditional banks 74%, Wise 48%.', reliabilityScore: 89 },
  { id: 's647', title: 'Neobank Market Share Consolidation - European Landscape 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-CONSOLIDATION-0026', fileType: 'xlsx', fileName: 'Neobank_Market_Consolidation_European_2026.xlsx', publishedAt: '2026-02-10', author: 'Market Analysis', excerpt: 'Consolidation trends: smaller neobanks struggling. Revolut potential acquirer, M&A budget €500M approved.', reliabilityScore: 87 },
  { id: 's648', title: 'Mastercard Send Competitive Assessment - Network Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-MASTERCARD-0027', fileType: 'pdf', fileName: 'Mastercard_Send_Competitive_Network_2026.pdf', publishedAt: '2026-01-15', author: 'Payments Strategy', excerpt: 'Mastercard Send: P2P, cross-border rails. Relationship: partner and competitor.', reliabilityScore: 86 },
  { id: 's649', title: 'Visa Direct Payment Flows - Card Network Strategy 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-VISA-0028', fileType: 'xlsx', fileName: 'Visa_Direct_Payment_Flows_Network_Strategy_2026.xlsx', publishedAt: '2026-02-08', author: 'Network Relations', excerpt: 'Visa Direct: real-time push payments. Strategic relationship: 68% of cards Visa-branded.', reliabilityScore: 88 },
  { id: 's650', title: 'Amazon Financial Services Threat - BigTech Entry Risk 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-AMAZON-0029', fileType: 'pdf', fileName: 'Amazon_Financial_Services_BigTech_Threat_2026.pdf', publishedAt: '2026-02-12', author: 'Strategic Threats', excerpt: 'Amazon: lending (SMB), payment methods. Regulatory scrutiny limits BigTech banking. Low near-term threat.', reliabilityScore: 83 },
  { id: 's651', title: 'Pepper Money Specialist Lending - Non-Bank Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-PEPPER-0030', fileType: 'xlsx', fileName: 'Pepper_Money_Specialist_Lending_NonBank_2026.xlsx', publishedAt: '2026-01-22', author: 'Lending Competition', excerpt: 'Pepper: non-bank lender, underserved credit. Different risk appetites enable market segmentation.', reliabilityScore: 82 },
  { id: 's652', title: 'Oaknorth SME Lending Platform - Business Credit Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-OAKNORTH-0031', fileType: 'pdf', fileName: 'Oaknorth_SME_Lending_Platform_Credit_2026.pdf', publishedAt: '2026-02-05', author: 'Business Lending', excerpt: 'Oaknorth: SME lending specialist, £6B portfolio. Partnership opportunity: Revolut distribution.', reliabilityScore: 86 },
  { id: 's653', title: 'Funding Circle Marketplace Lending - SMB Alternative Finance 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-FUNDING-0032', fileType: 'xlsx', fileName: 'Funding_Circle_Marketplace_Lending_SMB_2026.xlsx', publishedAt: '2026-01-18', author: 'Marketplace Intel', excerpt: 'Funding Circle: P2P SMB lending, struggling profitability. Potential acquisition target.', reliabilityScore: 84 },
  { id: 's654', title: 'Checkout.com Payment Processing - Infrastructure Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-CHECKOUT-0033', fileType: 'pdf', fileName: 'Checkout.com_Payment_Processing_Infrastructure_2026.pdf', publishedAt: '2026-02-10', author: 'Payments Infrastructure', excerpt: 'Checkout.com: payment gateway. Enterprise e-commerce focus. Different market segments.', reliabilityScore: 87 },
  { id: 's655', title: 'Clearbank Banking Infrastructure - B2B Platform Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-CLEARBANK-0034', fileType: 'xlsx', fileName: 'Clearbank_Banking_Infrastructure_B2B_2026.xlsx', publishedAt: '2026-01-25', author: 'Infrastructure Strategy', excerpt: 'Clearbank: UK banking infrastructure. B2B only. Revolut uses for some UK clearing.', reliabilityScore: 85 },
  { id: 's656', title: 'Wealthify Robo-Advisory - Investment Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-WEALTHIFY-0035', fileType: 'pdf', fileName: 'Wealthify_Robo_Advisory_Investment_Competition_2026.pdf', publishedAt: '2026-02-15', author: 'Wealth Management', excerpt: 'Wealthify (Aviva-owned): robo-advisor. Different value propositions, minimal conflict.', reliabilityScore: 83 },
  { id: 's657', title: 'Freetrade Commission-Free Trading - Investment App Competition 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-FREETRADE-0036', fileType: 'xlsx', fileName: 'Freetrade_Commission_Free_Trading_Investment_2026.xlsx', publishedAt: '2026-01-12', author: 'Trading Competition', excerpt: 'Freetrade: UK trading app, commission-free stocks. Market segmentation working.', reliabilityScore: 84 },
  { id: 's658', title: 'Tide Business Banking - UK SMB Neobank Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-TIDE-0037', fileType: 'pdf', fileName: 'Tide_Business_Banking_UK_SMB_Neobank_2026.pdf', publishedAt: '2026-02-08', author: 'UK Business Banking', excerpt: 'Tide: SMB focus, 575K business accounts. Market share: Tide 8.2%, Revolut 7.8% (UK SMB).', reliabilityScore: 88 },
  { id: 's659', title: 'Banking Circle Cross-Border Infrastructure - B2B Services 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-BANKINGCIRCLE-0038', fileType: 'xlsx', fileName: 'Banking_Circle_CrossBorder_Infrastructure_2026.xlsx', publishedAt: '2026-01-20', author: 'FX Infrastructure', excerpt: 'Banking Circle: B2B banking infrastructure. Revolut uses for some corridors. Strategic dependency assessment.', reliabilityScore: 82 },
  { id: 's660', title: 'PayPal Venmo European Expansion - P2P Competition 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-COMP-VENMO-0039', fileType: 'pdf', fileName: 'PayPal_Venmo_European_Expansion_P2P_2026.pdf', publishedAt: '2026-02-12', author: 'P2P Payments', excerpt: 'Venmo: US P2P leader, European entry speculated. Monitor for expansion announcements.', reliabilityScore: 81 },
  { id: 's661', title: 'Competitive Benchmarking Summary - Market Position 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-COMP-BENCHMARK-0040', fileType: 'xlsx', fileName: 'Competitive_Benchmarking_Summary_Position_2025.xlsx', publishedAt: '2026-02-15', author: 'Competitive Intelligence', excerpt: 'Revolut competitive position: #1 European neobank by customers (38M), revenue (€3.2B), product breadth. Widening lead.', reliabilityScore: 92 },

  // Product & Tech, Legal, Operations, Other (s662-s751) - abbreviated for space
  { id: 's662', title: 'API Platform Adoption - Developer Metrics Q4 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-API-0001', fileType: 'xlsx', fileName: 'API_Platform_Developer_Metrics_Q4_2025.xlsx', publishedAt: '2026-01-20', author: 'Platform Team', excerpt: 'API developers: 45K registered, 12K active monthly. Transaction volume €18B. Uptime 99.95%.', reliabilityScore: 92 },
  { id: 's663', title: 'Mobile App Performance & Engagement Metrics 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-MOBILE-0002', fileType: 'pdf', fileName: 'Mobile_App_Performance_Engagement_2026.pdf', publishedAt: '2026-02-05', author: 'Mobile Team', excerpt: 'App store ratings: iOS 4.7/5, Android 4.6/5. Crash rate 0.12%, load time 1.2s.', reliabilityScore: 91 },
  { id: 's664', title: 'Machine Learning Models - Fraud Detection Performance 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-ML-0003', fileType: 'xlsx', fileName: 'ML_Fraud_Detection_Performance_2026.xlsx', publishedAt: '2026-01-28', author: 'Data Science', excerpt: 'Fraud detection accuracy 98.2%, false positive rate 0.8%. Real-time processing <50ms.', reliabilityScore: 94 },

  // (s665-s691 product docs abbreviated)
  { id: 's665', title: 'Infrastructure Scalability - Peak Load Performance 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-INFRA-0004', fileType: 'pdf', fileName: 'Infrastructure_Scalability_Peak_Load_2025.pdf', publishedAt: '2026-02-10', author: 'Platform Engineering', excerpt: 'Peak transaction processing: 85K/second. Auto-scaling 0-100% in 90 seconds. RTO <15min, RPO <5min.', reliabilityScore: 93 },
  { id: 's666', title: 'Card Program Performance - Physical & Digital Cards 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-CARDS-0005', fileType: 'xlsx', fileName: 'Card_Program_Performance_Digital_2025.xlsx', publishedAt: '2026-01-15', author: 'Cards Team', excerpt: 'Cards issued: 24M (2025). Digital card adoption 48%. Instant issuance, cost optimization.', reliabilityScore: 90 },
  { id: 's667', title: 'Crypto Trading Platform - Technical Performance 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-CRYPTO-0006', fileType: 'pdf', fileName: 'Crypto_Trading_Platform_Technical_2025.pdf', publishedAt: '2026-02-08', author: 'Crypto Engineering', excerpt: 'Crypto trading: 30+ assets, real-time pricing, custody security. Regulatory compliance.', reliabilityScore: 89 },
  { id: 's668', title: 'Business Banking Platform - Feature Roadmap 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-BUSINESS-0007', fileType: 'xlsx', fileName: 'Business_Banking_Platform_Roadmap_2026.xlsx', publishedAt: '2026-01-22', author: 'Business Product', excerpt: 'Business features: multi-currency, expense management, accounting integration. Development priorities.', reliabilityScore: 88 },
  { id: 's669', title: 'Savings & Investment Products - Performance Metrics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-SAVINGS-0008', fileType: 'pdf', fileName: 'Savings_Investment_Products_Metrics_2025.pdf', publishedAt: '2026-02-12', author: 'Wealth Team', excerpt: 'Savings accounts: €4.2B deposits. Stock trading: commission-free, 140+ assets. User engagement.', reliabilityScore: 87 },
  { id: 's670', title: 'FX Trading Engine - Technology Performance 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-FX-0009', fileType: 'xlsx', fileName: 'FX_Trading_Engine_Technology_2025.xlsx', publishedAt: '2026-01-18', author: 'FX Engineering', excerpt: 'FX platform: 28 currencies, real-time rates, smart routing. Latency <100ms, high availability.', reliabilityScore: 92 },
  { id: 's671', title: 'Lending Platform Architecture - Credit Products 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-LENDING-0010', fileType: 'pdf', fileName: 'Lending_Platform_Architecture_Credit_2025.pdf', publishedAt: '2026-02-05', author: 'Lending Engineering', excerpt: 'Lending products: consumer loans, business credit. Credit scoring, risk management, compliance.', reliabilityScore: 88 },

  // (s672-s691 continuing product abbreviated)
  { id: 's672', title: 'Premium Subscription Features - Tier Comparison 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-PREMIUM-0011', fileType: 'xlsx', fileName: 'Premium_Subscription_Features_Tier_2025.xlsx', publishedAt: '2026-01-25', author: 'Premium Product', excerpt: 'Subscription tiers: Plus, Premium, Metal. Feature comparison, pricing, user adoption.', reliabilityScore: 90 },
  { id: 's673', title: 'Expense Management Platform - Business Features 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-EXPENSE-0012', fileType: 'pdf', fileName: 'Expense_Management_Platform_Business_2025.pdf', publishedAt: '2026-02-10', author: 'Business Platform', excerpt: 'Expense management: receipt capture, policy enforcement, accounting integration. Adoption growing.', reliabilityScore: 86 },
  { id: 's674', title: 'Budgeting & Insights Features - PFM Tools 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-BUDGETING-0013', fileType: 'xlsx', fileName: 'Budgeting_Insights_Features_PFM_2025.xlsx', publishedAt: '2026-01-12', author: 'PFM Team', excerpt: 'Personal finance management: spending categorization, budgeting, savings goals. User engagement analysis.', reliabilityScore: 85 },
  { id: 's675', title: 'Security & Fraud Prevention - Technical Controls 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-SECURITY-0014', fileType: 'pdf', fileName: 'Security_Fraud_Prevention_Technical_2025.pdf', publishedAt: '2026-02-15', author: 'Security Engineering', excerpt: 'Security measures: biometric auth, ML fraud detection, encryption. Fraud loss rate 0.04%.', reliabilityScore: 94 },
  { id: 's676', title: 'Notifications & Messaging - User Communication 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-NOTIFICATIONS-0015', fileType: 'xlsx', fileName: 'Notifications_Messaging_Communication_2025.xlsx', publishedAt: '2026-01-20', author: 'Communications', excerpt: 'Notification channels: push, in-app, email, SMS. Personalization, engagement metrics.', reliabilityScore: 87 },
  { id: 's677', title: 'Accounting Integration Platform - Business Tools 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-ACCOUNTING-0016', fileType: 'pdf', fileName: 'Accounting_Integration_Platform_Business_2025.pdf', publishedAt: '2026-02-08', author: 'Integrations', excerpt: 'Accounting integrations: Xero, QuickBooks, Sage. Automated sync, reconciliation.', reliabilityScore: 88 },
  { id: 's678', title: 'Payment Request & Invoicing - Business Features 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-INVOICING-0017', fileType: 'xlsx', fileName: 'Payment_Request_Invoicing_Business_2025.xlsx', publishedAt: '2026-01-28', author: 'Business Product', excerpt: 'Invoicing features: payment requests, invoicing, automatic reminders. Adoption growing.', reliabilityScore: 84 },
  { id: 's679', title: 'Multi-Currency Wallets - Currency Management 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-MULTICURRENCY-0018', fileType: 'pdf', fileName: 'Multi_Currency_Wallets_Management_2025.pdf', publishedAt: '2026-02-12', author: 'Currency Team', excerpt: 'Multi-currency: 28 currencies supported. Auto-convert, holds, rate alerts. High user satisfaction.', reliabilityScore: 91 },
  { id: 's680', title: 'Team & Permissions - Business Account Management 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-TEAM-0019', fileType: 'xlsx', fileName: 'Team_Permissions_Business_Management_2025.xlsx', publishedAt: '2026-01-15', author: 'Business Platform', excerpt: 'Team features: multi-user accounts, role-based permissions, spending controls. Business adoption.', reliabilityScore: 86 },
  { id: 's681', title: 'Virtual & Physical Card Programs - Card Features 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-CARDFEATURES-0020', fileType: 'pdf', fileName: 'Virtual_Physical_Card_Programs_Features_2025.pdf', publishedAt: '2026-02-05', author: 'Cards Product', excerpt: 'Card features: instant virtual cards, customization, disposable cards, spending controls.', reliabilityScore: 89 },
  { id: 's682', title: 'Auto-Exchange & Smart Routing - FX Optimization 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-AUTOEXCHANGE-0021', fileType: 'xlsx', fileName: 'Auto_Exchange_Smart_Routing_FX_2025.xlsx', publishedAt: '2026-01-22', author: 'FX Product', excerpt: 'Smart FX: auto-convert, best rate routing, rate alerts. User savings optimization.', reliabilityScore: 90 },
  { id: 's683', title: 'Disposable & Merchant-Locked Cards - Security Features 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-DISPOSABLE-0022', fileType: 'pdf', fileName: 'Disposable_Merchant_Locked_Cards_Security_2025.pdf', publishedAt: '2026-02-10', author: 'Card Security', excerpt: 'Security cards: single-use, merchant-locked, spending limits. Fraud prevention features.', reliabilityScore: 88 },
  { id: 's684', title: 'Recurring Payments & Standing Orders - Payment Automation 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-RECURRING-0023', fileType: 'xlsx', fileName: 'Recurring_Payments_Standing_Orders_2025.xlsx', publishedAt: '2026-01-18', author: 'Payments Product', excerpt: 'Recurring payments: scheduled transfers, standing orders, variable recurring payments.', reliabilityScore: 85 },
  { id: 's685', title: 'Airport Lounge Access - Premium Benefit Performance 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-LOUNGE-0024', fileType: 'pdf', fileName: 'Airport_Lounge_Access_Premium_Benefit_2025.pdf', publishedAt: '2026-02-15', author: 'Premium Benefits', excerpt: 'Lounge access: 1,000+ lounges globally. Usage rates, customer satisfaction.', reliabilityScore: 83 },
  { id: 's686', title: 'Travel Insurance Integration - Insurance Products 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-INSURANCE-0025', fileType: 'xlsx', fileName: 'Travel_Insurance_Integration_Products_2025.xlsx', publishedAt: '2026-01-25', author: 'Insurance Partnerships', excerpt: 'Travel insurance: automatic activation, claims process, customer utilization. Commission revenue.', reliabilityScore: 84 },
  { id: 's687', title: 'Cashback & Rewards Programs - Loyalty Features 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-CASHBACK-0026', fileType: 'pdf', fileName: 'Cashback_Rewards_Programs_Loyalty_2025.pdf', publishedAt: '2026-02-08', author: 'Loyalty Product', excerpt: 'Rewards: cashback on purchases, crypto rewards, partner offers. Engagement driver.', reliabilityScore: 86 },
  { id: 's688', title: 'Open Banking Integrations - Account Aggregation 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-OPENBANKING-0027', fileType: 'xlsx', fileName: 'Open_Banking_Integrations_Aggregation_2025.xlsx', publishedAt: '2026-01-12', author: 'Open Banking', excerpt: 'Open banking: account aggregation, PSD2 compliance, data access. User adoption analysis.', reliabilityScore: 87 },
  { id: 's689', title: 'Savings Vaults & Goals - Savings Features 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-VAULTS-0028', fileType: 'pdf', fileName: 'Savings_Vaults_Goals_Features_2025.pdf', publishedAt: '2026-02-12', author: 'Savings Product', excerpt: 'Savings vaults: goal-based savings, automatic rounding, interest optimization. User engagement high.', reliabilityScore: 88 },
  { id: 's690', title: 'Referral Program Platform - Viral Growth Features 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-PRODUCT-REFERRAL-0029', fileType: 'xlsx', fileName: 'Referral_Program_Platform_Viral_Growth_2025.xlsx', publishedAt: '2026-01-20', author: 'Growth Product', excerpt: 'Referral platform: invite mechanics, reward structure, viral coefficient 1.42. Best acquisition channel.', reliabilityScore: 91 },
  { id: 's691', title: 'Analytics & Insights Dashboard - Business Intelligence 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-PRODUCT-ANALYTICS-0030', fileType: 'pdf', fileName: 'Analytics_Insights_Dashboard_Business_2025.pdf', publishedAt: '2026-02-05', author: 'Analytics Product', excerpt: 'Business analytics: spending insights, cash flow forecasting, financial reporting. Business user adoption.', reliabilityScore: 85 },

  // Legal & Compliance (s692-s721) - 30 docs abbreviated
  { id: 's692', title: 'FCA Regulatory Compliance Status - UK Banking License 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-FCA-0001', fileType: 'pdf', fileName: 'FCA_Regulatory_Compliance_UK_2026.pdf', publishedAt: '2026-01-15', author: 'Legal Team', excerpt: 'UK banking license full compliance. Capital adequacy 14.2%. FCA supervision: enhanced monitoring removed.', reliabilityScore: 95 },
  { id: 's693', title: 'GDPR Data Protection Compliance Assessment 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-GDPR-0002', fileType: 'xlsx', fileName: 'GDPR_Data_Protection_Compliance_2026.xlsx', publishedAt: '2026-02-02', author: 'Privacy Office', excerpt: 'GDPR compliance: 98% score. Data processing agreements: 1,240 vendors. 0 reportable breaches.', reliabilityScore: 94 },
  { id: 's694', title: 'Anti-Money Laundering Controls - AML/CTF Program 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-AML-0003', fileType: 'pdf', fileName: 'AML_CTF_Controls_Program_2026.pdf', publishedAt: '2026-01-25', author: 'Compliance', excerpt: 'AML program: 100% automated transaction monitoring. SARs filed: 1,845. False positive rate 2.1%.', reliabilityScore: 95 },
  { id: 's695', title: 'EU Banking Licenses - Multi-Jurisdiction Regulatory Status 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-EULICENSE-0004', fileType: 'xlsx', fileName: 'EU_Banking_Licenses_MultiJurisdiction_2026.xlsx', publishedAt: '2026-02-08', author: 'Regulatory Affairs', excerpt: 'EU banking license (Lithuania): passporting to 30 EEA countries. Regulatory capital €580M consolidated.', reliabilityScore: 94 },
  { id: 's696', title: 'Crypto Asset Regulation - MiCA Compliance Roadmap 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-MICA-0005', fileType: 'pdf', fileName: 'Crypto_Asset_MiCA_Compliance_2026.pdf', publishedAt: '2026-01-30', author: 'Digital Assets Legal', excerpt: 'MiCA compliance: CASP license obtained, safeguarding requirements met. Crypto reserve backing: 100%.', reliabilityScore: 93 },

  // (s697-s721 abbreviated legal docs)
  { id: 's697', title: 'Consumer Protection Regulations - Complaint Handling 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-CONSUMER-0006', fileType: 'xlsx', fileName: 'Consumer_Protection_Complaints_2026.xlsx', publishedAt: '2026-02-15', author: 'Consumer Affairs', excerpt: 'Consumer complaints: 28K (0.07% of base). FOS referrals: 245 (upheld 18%). Resolution time 21 days.', reliabilityScore: 92 },
  { id: 's698', title: 'PSD2 Strong Customer Authentication - Compliance Status 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-PSD2-0007', fileType: 'pdf', fileName: 'PSD2_SCA_Compliance_Status_2026.pdf', publishedAt: '2026-01-18', author: 'Payments Compliance', excerpt: 'PSD2 SCA: biometric auth 94% adoption. Decline rate 2.1%. Frictionless rate 87%.', reliabilityScore: 94 },
  { id: 's699', title: 'Data Localization Requirements - Cross-Border Data Flow 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-DATALOCAL-0008', fileType: 'xlsx', fileName: 'Data_Localization_CrossBorder_Flow_2026.xlsx', publishedAt: '2026-02-12', author: 'Data Governance', excerpt: 'EU data residency: 100% in EU data centers. Schrems II compliance: SCCs implemented. 0 violations.', reliabilityScore: 93 },
  { id: 's700', title: 'Tax Compliance & Reporting - Multi-Jurisdiction Tax 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-TAX-0009', fileType: 'pdf', fileName: 'Tax_Compliance_MultiJurisdiction_2025.pdf', publishedAt: '2026-01-22', author: 'Tax Department', excerpt: 'Tax compliance: 38 countries. Effective tax rate 18.5%. Transfer pricing documentation. 0 material findings.', reliabilityScore: 92 },
  { id: 's701', title: 'Intellectual Property Portfolio - Patent & Trademark 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-IP-0010', fileType: 'xlsx', fileName: 'IP_Portfolio_Patent_Trademark_2026.xlsx', publishedAt: '2026-02-05', author: 'IP Legal', excerpt: 'Patent portfolio: 42 granted, 78 pending. Trademarks: 185 registrations (38 jurisdictions).', reliabilityScore: 91 },
  { id: 's702', title: 'Regulatory Capital Requirements Analysis - Basel III 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-CAPITAL-0011', fileType: 'pdf', fileName: 'Regulatory_Capital_Basel_Analysis_2026.pdf', publishedAt: '2026-01-12', author: 'Risk & Compliance', excerpt: 'Minimum regulatory capital: €420M (CET1 ratio 14.2%). Capital buffer €185M above minimum.', reliabilityScore: 94 },
  { id: 's703', title: 'Sanctions & Embargo Compliance - Trade Restrictions 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-SANCTIONS-0012', fileType: 'xlsx', fileName: 'Sanctions_Embargo_Compliance_2026.xlsx', publishedAt: '2026-02-10', author: 'Compliance', excerpt: 'Sanctions screening: real-time, comprehensive. Jurisdictions monitored: OFAC, EU, UN. 100% compliance.', reliabilityScore: 95 },
  { id: 's704', title: 'Financial Crime Prevention - Fraud & AML Controls 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-FINCRIME-0013', fileType: 'pdf', fileName: 'Financial_Crime_Prevention_Fraud_AML_2026.pdf', publishedAt: '2026-01-20', author: 'Financial Crime', excerpt: 'Financial crime controls: ML models, transaction monitoring, KYC. Fraud loss rate 0.04%.', reliabilityScore: 93 },
  { id: 's705', title: 'Licensing & Authorization Register - Regulatory Permissions 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-LICENSES-0014', fileType: 'xlsx', fileName: 'Licensing_Authorization_Register_2026.xlsx', publishedAt: '2026-02-15', author: 'Regulatory Affairs', excerpt: 'Active licenses: UK banking, EU banking (Lithuania), e-money (30 countries), crypto (MiCA). All current.', reliabilityScore: 94 },
  { id: 's706', title: 'Audit & Risk Committee Reports - Governance 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-AUDIT-0015', fileType: 'pdf', fileName: 'Audit_Risk_Committee_Reports_Governance_2025.pdf', publishedAt: '2026-01-28', author: 'Corporate Governance', excerpt: 'Audit committee: quarterly meetings, external audit oversight, risk assessment. Strong governance.', reliabilityScore: 92 },
  { id: 's707', title: 'Litigation & Legal Proceedings - Active Cases 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-LITIGATION-0016', fileType: 'xlsx', fileName: 'Litigation_Legal_Proceedings_Cases_2026.xlsx', publishedAt: '2026-02-08', author: 'Legal Counsel', excerpt: 'Active litigation: 12 cases (employment 5, commercial 4, regulatory 2, other 1). Exposure limited.', reliabilityScore: 90 },
  { id: 's708', title: 'Privacy Impact Assessments - DPIA Register 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-DPIA-0017', fileType: 'pdf', fileName: 'Privacy_Impact_Assessments_DPIA_2026.pdf', publishedAt: '2026-01-15', author: 'Privacy Office', excerpt: 'DPIAs completed: 45 high-risk processing activities. Mitigation measures implemented. Privacy by design.', reliabilityScore: 91 },
  { id: 's709', title: 'Third-Party Risk Management - Vendor Compliance 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-VENDOR-0018', fileType: 'xlsx', fileName: 'Third_Party_Risk_Management_Vendor_2026.xlsx', publishedAt: '2026-02-12', author: 'Vendor Management', excerpt: 'Critical vendors: 85. Annual reviews, due diligence, contract compliance. Risk scoring framework.', reliabilityScore: 89 },
  { id: 's710', title: 'Insider Trading & Market Abuse Controls - Compliance 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-INSIDER-0019', fileType: 'pdf', fileName: 'Insider_Trading_Market_Abuse_Controls_2026.pdf', publishedAt: '2026-01-22', author: 'Compliance', excerpt: 'Market abuse controls: insider lists, trading windows, pre-clearance. Employee training 100%.', reliabilityScore: 93 },
  { id: 's711', title: 'Regulatory Reporting Accuracy - Submission Quality 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-REPORTING-0020', fileType: 'xlsx', fileName: 'Regulatory_Reporting_Accuracy_Submission_2025.pdf', publishedAt: '2026-02-05', author: 'Regulatory Reporting', excerpt: 'Regulatory reports: 850+ annual submissions. Timeliness 100%, accuracy 99.2%. Automated reporting.', reliabilityScore: 94 },
  { id: 's712', title: 'Business Continuity Legal Requirements - Compliance 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-BCM-0021', fileType: 'pdf', fileName: 'Business_Continuity_Legal_Requirements_2026.pdf', publishedAt: '2026-01-18', author: 'Legal & Compliance', excerpt: 'BC/DR compliance: regulatory requirements met. Testing quarterly, documentation current. RTO/RPO compliance.', reliabilityScore: 92 },
  { id: 's713', title: 'Code of Conduct & Ethics Policy - Employee Compliance 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-ETHICS-0022', fileType: 'xlsx', fileName: 'Code_Conduct_Ethics_Policy_Employee_2026.xlsx', publishedAt: '2026-02-10', author: 'Ethics & Compliance', excerpt: 'Code of conduct: all employees certified. Ethics hotline, whistleblower protection. Violations investigated.', reliabilityScore: 91 },
  { id: 's714', title: 'Anti-Bribery & Corruption Program - ABAC Controls 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-ABAC-0023', fileType: 'pdf', fileName: 'Anti_Bribery_Corruption_Program_ABAC_2026.pdf', publishedAt: '2026-01-25', author: 'Compliance', excerpt: 'ABAC program: gifts & hospitality policy, third-party due diligence, training. Zero tolerance.', reliabilityScore: 93 },
  { id: 's715', title: 'Employment Law Compliance - HR Legal Requirements 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-EMPLOYMENT-0024', fileType: 'xlsx', fileName: 'Employment_Law_Compliance_HR_Legal_2026.xlsx', publishedAt: '2026-02-15', author: 'Employment Legal', excerpt: 'Employment compliance: 25 countries, local law adherence. Contracts, benefits, terminations. HR legal support.', reliabilityScore: 90 },
  { id: 's716', title: 'Contract Management & Legal Agreements - Contract Register 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-CONTRACTS-0025', fileType: 'pdf', fileName: 'Contract_Management_Legal_Agreements_2026.pdf', publishedAt: '2026-01-12', author: 'Legal Operations', excerpt: 'Active contracts: 2,400+. Categories: vendor, customer, partnership, employment. Automated renewal tracking.', reliabilityScore: 88 },
  { id: 's717', title: 'Insurance & Risk Transfer - Coverage Portfolio 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-INSURANCE-0026', fileType: 'xlsx', fileName: 'Insurance_Risk_Transfer_Coverage_2026.xlsx', publishedAt: '2026-02-08', author: 'Risk Management', excerpt: 'Insurance coverage: cyber, D&O, E&O, property, crime. Total coverage €500M+. Annual premium €28M.', reliabilityScore: 91 },
  { id: 's718', title: 'Accessibility Compliance - WCAG & ADA Requirements 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-ACCESSIBILITY-0027', fileType: 'pdf', fileName: 'Accessibility_Compliance_WCAG_ADA_2026.pdf', publishedAt: '2026-01-20', author: 'Product Legal', excerpt: 'Digital accessibility: WCAG 2.1 AA compliance target. Mobile app, web platform. Regular audits.', reliabilityScore: 87 },
  { id: 's719', title: 'Environmental & Social Governance - ESG Framework 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-ESG-0028', fileType: 'xlsx', fileName: 'Environmental_Social_Governance_ESG_2026.xlsx', publishedAt: '2026-02-12', author: 'ESG Committee', excerpt: 'ESG framework: carbon footprint measurement, diversity targets, governance standards. Reporting annual.', reliabilityScore: 85 },
  { id: 's720', title: 'External Audit & Assurance - Audit Findings 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-LEGAL-EXTAUDIT-0029', fileType: 'pdf', fileName: 'External_Audit_Assurance_Findings_2025.pdf', publishedAt: '2026-01-28', author: 'External Auditors', excerpt: 'External audit: unqualified opinion 2025. Financial statements, internal controls. 0 material weaknesses.', reliabilityScore: 95 },
  { id: 's721', title: 'Change Management & Project Governance - Compliance Controls 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-LEGAL-CHANGE-0030', fileType: 'xlsx', fileName: 'Change_Management_Project_Governance_2026.xlsx', publishedAt: '2026-02-05', author: 'PMO & Compliance', excerpt: 'Change governance: regulatory change assessment, impact analysis, approval workflows. 100% major changes reviewed.', reliabilityScore: 90 },

  // Operations & Other (s722-s751) - 30 docs abbreviated
  { id: 's722', title: 'Customer Onboarding Operations - KYC Process Efficiency 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-ONBOARDING-0001', fileType: 'pdf', fileName: 'Onboarding_KYC_Process_Efficiency_2026.pdf', publishedAt: '2026-01-10', author: 'Operations', excerpt: 'Onboarding: 62% instant approval, 32% manual review, 6% rejection. Review time 4.2 hours avg.', reliabilityScore: 92 },
  { id: 's723', title: 'Card Production & Logistics - Supply Chain Operations 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-CARDS-0002', fileType: 'xlsx', fileName: 'Card_Production_Logistics_SupplyChain_2025.xlsx', publishedAt: '2026-01-20', author: 'Card Operations', excerpt: 'Cards issued: 24M (2025), 8.2M new. Delivery SLA: 5-7 business days (EU). Cost per card: €2.80.', reliabilityScore: 91 },
  { id: 's724', title: 'Transaction Processing Infrastructure - Payment Rails 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-PROCESSING-0003', fileType: 'pdf', fileName: 'Transaction_Processing_Payment_Rails_2026.pdf', publishedAt: '2026-02-02', author: 'Payments Operations', excerpt: 'Payment rails: Visa (68%), Mastercard (32%), SEPA, SWIFT. Processing volume: 2.8B txns annually.', reliabilityScore: 93 },
  { id: 's725', title: 'Customer Support Operations - Global Support Centers 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-SUPPORT-0004', fileType: 'xlsx', fileName: 'Support_Operations_Global_Centers_2026.xlsx', publishedAt: '2026-01-28', author: 'Customer Operations', excerpt: 'Support centers: Krakow, Porto, Vilnius. Agents: 2,400 FTE. Languages: 28. Chatbot handles 42% tier-1.', reliabilityScore: 90 },
  { id: 's726', title: 'Vendor Management Program - Third-Party Risk 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-VENDOR-0005', fileType: 'pdf', fileName: 'Vendor_Management_ThirdParty_Risk_2026.pdf', publishedAt: '2026-02-10', author: 'Procurement', excerpt: 'Active vendors: 1,240. Critical vendors: 85. Annual reviews, continuous monitoring. Spend: €485M.', reliabilityScore: 91 },
  { id: 's727', title: 'Fraud Prevention Operations - Dispute Resolution 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-FRAUD-0006', fileType: 'xlsx', fileName: 'Fraud_Prevention_Dispute_Resolution_2026.xlsx', publishedAt: '2026-01-15', author: 'Fraud Operations', excerpt: 'Disputes processed: 145K annually. Chargeback rate: 0.18%. Resolution time: 28 days avg. Win rate: 58%.', reliabilityScore: 92 },
  { id: 's728', title: 'Treasury Operations - Liquidity Management & FX 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-TREASURY-0007', fileType: 'pdf', fileName: 'Treasury_Operations_Liquidity_FX_2026.pdf', publishedAt: '2026-02-08', author: 'Treasury', excerpt: 'Customer deposits: €14.8B across 28 currencies. Liquidity coverage ratio: 145%. FX trading: €4.2B daily.', reliabilityScore: 94 },
  { id: 's729', title: 'HR & Talent Operations - Workforce Analytics 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-HR-0008', fileType: 'xlsx', fileName: 'HR_Talent_Workforce_Analytics_2026.xlsx', publishedAt: '2026-01-25', author: 'People Operations', excerpt: 'Headcount: 8,200 FTE. Growth: +28% YoY. Engineering: 42%, Operations: 28%. Attrition: 18%.', reliabilityScore: 90 },
  { id: 's730', title: 'Office & Facilities Operations - Global Real Estate 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-FACILITIES-0009', fileType: 'pdf', fileName: 'Office_Facilities_Global_RealEstate_2026.pdf', publishedAt: '2026-02-12', author: 'Facilities', excerpt: 'Office locations: 38 global. HQ: London (1,200). Major hubs: Krakow 2,400, Vilnius 1,200. Real estate costs: €95M.', reliabilityScore: 89 },
  { id: 's731', title: 'Business Continuity & Disaster Recovery - Resilience Plan 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-BCDR-0010', fileType: 'xlsx', fileName: 'Business_Continuity_Disaster_Recovery_2026.xlsx', publishedAt: '2026-01-18', author: 'Risk Management', excerpt: 'BC/DR plan: RTO 15 minutes, RPO 5 minutes. Failover testing: quarterly. Uptime: 99.97%.', reliabilityScore: 93 },

  // (s732-s751 final ops & other docs - abbreviated)
  { id: 's732', title: 'Incident Management & Response - Operations 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-INCIDENT-0011', fileType: 'pdf', fileName: 'Incident_Management_Response_Operations_2025.pdf', publishedAt: '2026-02-05', author: 'Operations', excerpt: 'Incident management: 24/7 response team. P1 incidents: 8 (2025), avg resolution 45 minutes. Post-mortems conducted.', reliabilityScore: 91 },
  { id: 's733', title: 'Network & Infrastructure Monitoring - System Health 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-MONITORING-0012', fileType: 'xlsx', fileName: 'Network_Infrastructure_Monitoring_Health_2026.xlsx', publishedAt: '2026-01-22', author: 'Infrastructure', excerpt: 'Monitoring: 1,200+ services, 3 AWS regions. Alerting automation, anomaly detection. Mean time to detect: 2.4 minutes.', reliabilityScore: 92 },
  { id: 's734', title: 'Data Backup & Archive Strategy - Data Management 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-BACKUP-0013', fileType: 'pdf', fileName: 'Data_Backup_Archive_Strategy_Management_2026.pdf', publishedAt: '2026-02-10', author: 'Data Operations', excerpt: 'Backup strategy: daily full, hourly incremental. Retention: 7 years transactional. Archive storage: S3 Glacier. Restore testing monthly.', reliabilityScore: 93 },
  { id: 's735', title: 'Change Management Operations - Release Process 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-CHANGE-0014', fileType: 'xlsx', fileName: 'Change_Management_Operations_Release_2026.xlsx', publishedAt: '2026-01-15', author: 'Release Management', excerpt: 'Release cadence: bi-weekly production deployments. Success rate: 98%. Rollback procedures tested. Change approval board oversight.', reliabilityScore: 90 },
  { id: 's736', title: 'Capacity Planning & Resource Optimization - Infrastructure 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-CAPACITY-0015', fileType: 'pdf', fileName: 'Capacity_Planning_Resource_Optimization_2026.pdf', publishedAt: '2026-02-08', author: 'Capacity Management', excerpt: 'Capacity planning: 18-month forecasts. Auto-scaling policies. Peak capacity planning for Black Friday, holidays. Resource utilization 72%.', reliabilityScore: 89 },
  { id: 's737', title: 'Security Operations Center - SOC Performance 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-SOC-0016', fileType: 'xlsx', fileName: 'Security_Operations_Center_SOC_Performance_2026.xlsx', publishedAt: '2026-01-20', author: 'Security Operations', excerpt: 'SOC: 24/7 monitoring, threat intelligence. Security incidents: 2,400 investigated, 12 confirmed. Response time: 8 minutes avg.', reliabilityScore: 94 },
  { id: 's738', title: 'Network Operations Center - NOC Metrics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-NOC-0017', fileType: 'pdf', fileName: 'Network_Operations_Center_NOC_Metrics_2025.pdf', publishedAt: '2026-02-12', author: 'Network Operations', excerpt: 'NOC operations: network uptime 99.98%. Latency monitoring, bandwidth optimization. DDoS mitigation: 45 attacks blocked.', reliabilityScore: 92 },
  { id: 's739', title: 'Database Operations & Performance - DB Management 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-DATABASE-0018', fileType: 'xlsx', fileName: 'Database_Operations_Performance_DB_Management_2026.xlsx', publishedAt: '2026-01-28', author: 'Database Operations', excerpt: 'Database infrastructure: PostgreSQL, Cassandra, Redis. 240 shards, 8x read replicas. Query performance: p95 <200ms. Automated backups.', reliabilityScore: 91 },
  { id: 's740', title: 'API Gateway Performance - Platform Operations 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-APIGATEWAY-0019', fileType: 'pdf', fileName: 'API_Gateway_Performance_Platform_Operations_2026.pdf', publishedAt: '2026-02-05', author: 'Platform Operations', excerpt: 'API gateway: 500K requests/second peak. Latency p50 <50ms, p95 <200ms. Rate limiting, authentication, monitoring. Uptime 99.99%.', reliabilityScore: 93 },
  { id: 's741', title: 'Cloud Cost Management - FinOps Performance 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-FINOPS-0020', fileType: 'xlsx', fileName: 'Cloud_Cost_Management_FinOps_Performance_2025.xlsx', publishedAt: '2026-01-12', author: 'FinOps Team', excerpt: 'Cloud optimization: €42M savings (2025). Reserved instances, autoscaling, right-sizing. FinOps team ROI 18x. Cost per transaction -18% YoY.', reliabilityScore: 90 },
  { id: 's742', title: 'Supplier Performance Management - Vendor KPIs 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-SUPPLIER-0021', fileType: 'pdf', fileName: 'Supplier_Performance_Management_Vendor_KPIs_2026.pdf', publishedAt: '2026-02-10', author: 'Supplier Management', excerpt: 'Vendor performance: SLA achievement 94% avg. Critical suppliers: quarterly reviews. Performance scorecards, improvement plans.', reliabilityScore: 88 },
  { id: 's743', title: 'Employee Onboarding Operations - HR Process Efficiency 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-HRONBOARDING-0022', fileType: 'xlsx', fileName: 'Employee_Onboarding_Operations_HR_Efficiency_2026.xlsx', publishedAt: '2026-01-20', author: 'People Operations', excerpt: 'Employee onboarding: 340+ new hires/month. Time to productivity: 45 days avg. Satisfaction: 4.1/5. Automation improvements.', reliabilityScore: 86 },
  { id: 's744', title: 'IT Service Desk Performance - Support Metrics 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-SERVICEDESK-0023', fileType: 'pdf', fileName: 'IT_Service_Desk_Performance_Support_Metrics_2025.pdf', publishedAt: '2026-02-08', author: 'IT Operations', excerpt: 'Service desk: 12K tickets/month. First contact resolution: 78%. Average resolution time: 6 hours. Employee satisfaction: 4.3/5.', reliabilityScore: 87 },
  { id: 's745', title: 'Payment Settlement Operations - Clearing & Settlement 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-SETTLEMENT-0024', fileType: 'xlsx', fileName: 'Payment_Settlement_Operations_Clearing_2026.xlsx', publishedAt: '2026-01-15', author: 'Settlement Operations', excerpt: 'Settlement operations: €2.8B daily volume. Settlement success rate: 99.7%. Reconciliation automated. Failed settlements <0.3%.', reliabilityScore: 93 },
  { id: 's746', title: 'Quality Assurance Operations - Testing Performance 2026', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OPS-QA-0025', fileType: 'pdf', fileName: 'Quality_Assurance_Operations_Testing_Performance_2026.pdf', publishedAt: '2026-02-12', author: 'QA Team', excerpt: 'QA operations: automated test coverage 78%. Release defect rate: 2.1 per release. Testing cycle time: 2.5 days. Continuous testing.', reliabilityScore: 89 },
  { id: 's747', title: 'DevOps Metrics & Performance - Development Operations 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-OPS-DEVOPS-0026', fileType: 'xlsx', fileName: 'DevOps_Metrics_Performance_Development_Operations_2025.xlsx', publishedAt: '2026-01-22', author: 'DevOps Team', excerpt: 'DevOps metrics: deployment frequency 2x/day. Lead time for changes: 4 hours. Change failure rate: 3.2%. MTTR: 28 minutes.', reliabilityScore: 91 },
  { id: 's748', title: 'Environmental Sustainability - Carbon Footprint Report 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OTHER-ESG-0001', fileType: 'pdf', fileName: 'Environmental_Sustainability_Carbon_Footprint_2025.pdf', publishedAt: '2026-02-05', author: 'ESG Committee', excerpt: 'Carbon footprint: Scope 1+2 8,200 tCO2e. Cloud infrastructure 78% renewable energy. Offsetting program. Carbon neutral target 2027.', reliabilityScore: 84 },
  { id: 's749', title: 'Diversity & Inclusion Report - Workforce Demographics 2025', category: 'connector', connectorId: 'datasite', externalId: 'DS-OTHER-DEI-0002', fileType: 'xlsx', fileName: 'Diversity_Inclusion_Report_Workforce_2025.xlsx', publishedAt: '2026-01-18', author: 'People & Culture', excerpt: 'Diversity metrics: gender 38% women (target 40%), 85 nationalities. Leadership diversity improving. Inclusion score: 82%.', reliabilityScore: 85 },
  { id: 's750', title: 'Community Investment & Philanthropy - Corporate Social Responsibility 2025', category: 'connector', connectorId: 'sharepoint', externalId: 'SP-OTHER-CSR-0003', fileType: 'pdf', fileName: 'Community_Investment_Philanthropy_CSR_2025.pdf', publishedAt: '2026-02-10', author: 'Corporate Affairs', excerpt: 'Community investment: €2.8M (2025). Focus areas: financial inclusion, education, environment. Employee volunteering: 8,200 hours.', reliabilityScore: 82 },
  { id: 's751', title: 'Data Room Index & Catalog - Document Summary 2026', category: 'connector', connectorId: 'datasite', externalId: 'DS-DATAROOM-INDEX-0001', fileType: 'xlsx', fileName: 'Data_Room_Index_Catalog_Document_Summary_2026.xlsx', publishedAt: '2026-03-01', author: 'Corporate Development', excerpt: 'Data room contains 1,350+ documents across all categories. Comprehensive M&A due diligence materials. Updated weekly. Access: secure portal, NDA required.', reliabilityScore: 95 },

  // Revolut Retail Market Share Analysis Documents (n2b - UK/EU competitive dynamics)
  {
    id: 's752',
    title: 'Revolut_UK_Retail_KPI_Dashboard_Q2_2024.xlsx',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-KPI-Q2-2024',
    fileType: 'xlsx',
    fileName: 'Revolut_UK_Retail_KPI_Dashboard_Q2_2024.xlsx',
    publishedAt: '2024-08-15',
    author: 'Datasite (VDR)',
    excerpt: 'Revolut UK Retail Performance Q2 2024. 9.8M UK retail customers (+18% YoY). Monthly active users: 6.1M (62% activation rate). Net customer additions: +127K/month in Q2, down from +168K/month in Q1 2024. Customer acquisition cost £4.2 per retail user. Revenue per user: £92/year (up from £71 in 2023). UK retail revenue: £412M (H1 2024 annualised). Churn rate: 3.1% monthly for <6 month cohorts, 1.2% for >24 month cohorts.',
    reliabilityScore: 97,
    content: `REVOLUT UK RETAIL KPI DASHBOARD Q2 2024

KEY METRICS SUMMARY

Total UK Retail Customers: 9.8M (+18% YoY)
Monthly Active Users (MAU): 6.1M (62% activation rate)
Net Customer Additions: ~220K/month (annualized +12%)
Churn Rate: 4.1%
UK Retail Revenue: £473M H1 2024 (annualized)

CUSTOMER ACQUISITION & RETENTION

New Customer Acquisition:
- Q2 2024: 660K new customers
- Acquisition cost: £29/customer
- Primary channels: viral referral (52%), paid digital (31%), partnerships (17%)

Activation & Engagement:
- First transaction within 7 days: 78%
- Average time to activation: 3.2 days
- Monthly transactions per MAU: 18.5

Retention Metrics:
- 30-day retention: 86%
- 90-day retention: 71%
- 12-month retention: 58%
- Monthly churn rate: 4.1%

MARKET SHARE TRENDS

UK Retail Banking Market Share:
- By primary accounts: 28.4% (Q2 2024) vs 24% (Q2 2023)
- By MAU: 6.1M Revolut, 24M total UK neobank MAU
- Note: MAU-based, not primary account

Revenue per User:
- ARPU (all customers): £48/year
- ARPU (MAU only): £77/year
- Premium tier penetration: 18%`
  },
  {
    id: 's753',
    title: 'Revolut_Management_Presentation_Board_H1_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-BOARD-H1-2024',
    fileType: 'pdf',
    fileName: 'Revolut_Management_Presentation_Board_H1_2024.pdf',
    publishedAt: '2024-07-20',
    author: 'Datasite (VDR)',
    excerpt: 'Revolut Board Presentation H1 2024. Management acknowledges \'increasing competitive pressure in UK retail segment from Monzo and Starling.\' UK retail net adds declined 24% QoQ. However, B2B revenue grew 67% YoY, now representing 22% of total group revenue. Strategic pivot: \'UK retail is a mature acquisition market — growth will come from ARPU expansion and B2B cross-sell.\' Banking license (July 2024) expected to unlock £1.2B+ in deposit-related revenue by 2026.',
    reliabilityScore: 96,
    content: `REVOLUT BOARD PRESENTATION H1 2024

EXECUTIVE SUMMARY

H1 2024 Performance Overview:
- Total Revenue: £2.1B (+42% YoY)
- B2B Revenue Share: 67% YoY growth
- B2B Mix: 18% of total revenue
- UK Retail: Competitive pressure noted

COMPETITIVE LANDSCAPE - UK RETAIL

Market Dynamics:
- Intensifying competition from Monzo, Starling, Chase
- Customer acquisition costs rising: +12% YoY
- Revolut market share (primary accounts): -6.2% (H1 2024)
- Management assessment: "Monzo catching up"

Strategic Response:
- Banking license secured (July 2024)
- Deposit-related revenue opportunity: £1.2B+ by H2
- Focus shift toward B2B and premium tiers
- Note: Might flag Monzo as competitive threat

B2B SEGMENT PERFORMANCE

Revenue Growth:
- B2B revenue: £378M H1 2024 (+67% YoY)
- Current mix: 18% of total revenue
- Growth drivers:
  * ARPU expansion in existing customers
  * Cross-sell to retail customer base
  * New B2B product launches

Strategic Importance:
- Lower churn vs retail (3.1% vs 4.1%)
- Higher ARPU: £420/year vs £77 retail
- Defensible moat through business integrations

UK RETAIL CHALLENGES

Acquisition Trends:
- Deceleration noted: +12% YoY (H1 2024) vs +24% (2023)
- Monzo net adds: +24% (Q2 2024) vs Revolut +12%
- Starling: flat growth, defensive positioning
- Chase UK: aggressive pricing, losing share on both metrics`
  },
  {
    id: 's754',
    title: 'Revolut_Investor_Datapack_Series_E_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REVOLUT-SERIES-E-2024',
    fileType: 'pdf',
    fileName: 'Revolut_Investor_Datapack_Series_E_2024.pdf',
    publishedAt: '2024-05-10',
    author: 'Datasite (VDR)',
    excerpt: 'Revolut Series E Investor Pack. Global user base: 45M+ across 38 markets. UK: 9.8M users (22% of total). EU: 18.2M users. Revenue: £1.8B (FY2023), £2.4B projected FY2024. UK retail share: Revolut claims ~6.2% of UK current account market (primary account holders). Vs. Monzo ~5.8%, Starling ~3.1%. Key slide: \'Revolut is the #1 neobank in UK by total users but Monzo is closing the gap on primary accounts.\'',
    reliabilityScore: 94,
    content: `REVOLUT SERIES E INVESTOR DATAPACK 2024

GLOBAL OVERVIEW

Customer Base:
- Total users: 45M+ across 38 markets
- UK: 9.8M users (22% of total)
- EU: 18.2M users (40%)
- Rest of World: 17M users (38%)

Financial Performance:
- FY2023 Revenue: £1.8B
- FY2024 Projected: £2.4B (+33% YoY)
- EBITDA margin: 28% (FY2023)
- Path to profitability: achieved Q4 2023

UK MARKET POSITIONING

Market Share Analysis:
- UK current account share: 6.2% (primary accounts)
- Monzo: 9.6% (primary accounts)
- Starling: 3.1% (primary accounts)
- Chase UK: declining share (aggressive pricing)

Competitive Dynamics:
- Revolut: plateauing in retail, pivoting to B2B
- Monzo: +3.9pp YoY primary account share
- Starling: defensive, premium positioning
- Note: "Key battle is primary account status"

STRATEGIC POSITIONING

Management Quote:
"We don't optimise for retail anymore — Plan B!"

Strategic Priorities:
1. B2B & SME expansion
2. Premium tier penetration
3. Global expansion
4. Banking license monetization

UK Retail Reality Check:
- Monzo leads on primary accounts
- Revolut losing share on both metrics
- Revolut ahead on total registered users (vanity metric)`
  },
  {
    id: 's755',
    title: 'Bloomberg_Intelligence_UK_Neobank_Retail_Benchmarking_H1_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-BLOOMBERG-NEOBANK-H1-2024',
    fileType: 'pdf',
    fileName: 'Bloomberg_Intelligence_UK_Neobank_Retail_Benchmarking_H1_2024.pdf',
    publishedAt: '2024-07-01',
    author: 'Bloomberg Terminal',
    excerpt: 'Bloomberg Neobank Retail Benchmark H1 2024. UK retail market share by monthly active users: Revolut 28.4%, Monzo 24.1%, Starling 11.3%, Chase UK 8.2%, N26 UK 2.1%. YoY change: Revolut -1.2pp, Monzo +3.8pp, Starling +0.9pp. Revolut\'s UK retail customer acquisition has decelerated by 12% YoY in H1 2024, while Monzo gained 2.3M new users in the same period. EU market: Revolut leads in 19/27 EU markets by user count. N26 dominates DACH region.',
    reliabilityScore: 95,
    content: `BLOOMBERG NEOBANK RETAIL BENCHMARK H1 2024

UK MARKET SHARE BY MAU:
- Revolut: 28.4% (-1.2pp YoY)
- Monzo: 24.1% (+3.9pp)
- Starling: 11.3% (+0.9pp)
- Chase UK: 8.2% (new entrant)
- N26 UK: 2.1% (-0.4pp)

BY PRIMARY ACCOUNTS:
- Monzo: 5.8M (30.2% of digital-only)
- Revolut: 4.1M (21.4%)
- Starling: 2.4M (12.5%)

Monzo leads Revolut by 41% on primary`
  },
  {
    id: 's756',
    title: 'CapitalIQ_European_Neobank_Comps_Q3_2024.xlsx',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-CAPITALIQ-NEOBANK-Q3-2024',
    fileType: 'xlsx',
    fileName: 'CapitalIQ_European_Neobank_Comps_Q3_2024.xlsx',
    publishedAt: '2024-09-30',
    author: 'S&P CapitalIQ',
    excerpt: 'S&P CapitalIQ Neobank Comparables Q3 2024. Revenue comps: Revolut £1.8B, Monzo £880M, N26 €520M, Starling £453M, Qonto €220M. EV/Revenue multiples: Revolut 14.2x, Monzo 11.8x, N26 5.4x. Customer metrics: Revolut 45M total (9.8M UK), Monzo 10M (9.2M UK), N26 8M (0.3M UK). Revenue per user: Revolut £40 (global avg), Monzo £88 (UK-focused), Starling £126 (UK-focused). Key insight: Monzo\'s UK-centric model yields higher ARPU.',
    reliabilityScore: 92
  },
  {
    id: 's757',
    title: 'Refinitiv_LSEG_UK_Digital_Banking_Market_Share_Tracker_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-REFINITIV-MARKET-SHARE-2024',
    fileType: 'pdf',
    fileName: 'Refinitiv_LSEG_UK_Digital_Banking_Market_Share_Tracker_2024.pdf',
    publishedAt: '2024-06-15',
    author: 'Refinitiv (LSEG)',
    excerpt: 'Refinitiv UK Digital Banking Market Share 2024. Primary account holders (challenger banks only): Monzo 5.8M, Revolut 4.1M, Starling 3.6M, Chase UK 1.9M. Note: Revolut\'s total UK user base (9.8M) includes non-primary users who hold Revolut as secondary account. When measured by primary account share, Monzo leads Revolut by 41%. UK digital banking total addressable: 19.2M primary digital-only account holders (29% of UK adults).',
    reliabilityScore: 90
  },
  {
    id: 's758',
    title: 'FCA_UK_Retail_Banking_Competition_Report_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-FCA-RETAIL-BANKING-2024',
    fileType: 'pdf',
    fileName: 'FCA_UK_Retail_Banking_Competition_Report_2024.pdf',
    publishedAt: '2024-08-01',
    author: 'FCA (regulator)',
    excerpt: 'FCA Retail Banking Market Report 2024. Current account switching: 2.1M switches in H1 2024 (+14% YoY). Neobanks captured 38% of all switches (up from 29% in 2023). Monzo was the #1 destination for switchers. FCA notes \'increasing concentration risk\' in neobank sector. Revolut banking license granted July 2024 — FCA expects \'significant deposit migration once Revolut offers FSCS-protected accounts.\' Regulatory view: competition is healthy but...',
    reliabilityScore: 93
  },
  {
    id: 's759',
    title: 'Dialectica_Transcript_Ex_Revolut_UK_Head_of_Growth.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-DIALECTICA-REVOLUT-GROWTH',
    fileType: 'pdf',
    fileName: 'Dialectica_Transcript_Ex_Revolut_UK_Head_of_Growth.pdf',
    publishedAt: '2024-02-10',
    author: 'Dialectica',
    excerpt: 'Expert Call — Former Revolut UK Head of Growth (left Feb 2024). Key quotes: \'The UK retail market is getting saturated for neobanks. Everyone who wants a Revolut or Monzo already has one. The real battle is primary account status.\' On Monzo: \'They cracked the salary deposit problem before us. Their Monzo Flex and Salary Sort features drove primary adoption.\' On Revolut strategy: \'Internally we knew by Q3 2023 retail net adds would plateau. The banking license was Plan B.\'',
    reliabilityScore: 91
  },
  {
    id: 's760',
    title: 'AlphaSights_Call_Ex_Monzo_VP_Retail_Strategy.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-ALPHASIGHTS-MONZO-VP',
    fileType: 'pdf',
    fileName: 'AlphaSights_Call_Ex_Monzo_VP_Retail_Strategy.pdf',
    publishedAt: '2023-08-15',
    author: 'AlphaSights',
    excerpt: 'Expert Call — Former Monzo VP Retail Strategy (left Aug 2023). Key quotes: \'Monzo won the UK primary account war because we focused on making Monzo the account your salary lands in. Revolut optimised for total downloads — vanity metric.\' On market share: \'Real market share is measured in deposit volume, not app installs. By deposits, Monzo passed Revolut in UK in Q4 2023.\' On EU: \'Monzo has no EU ambitions. That\'s Revolut\'s playground.\'',
    reliabilityScore: 88
  },
  {
    id: 's761',
    title: 'GLG_Transcript_Senior_Fintech_Analyst_Barclays.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-GLG-BARCLAYS-ANALYST',
    fileType: 'pdf',
    fileName: 'GLG_Transcript_Senior_Fintech_Analyst_Barclays.pdf',
    publishedAt: '2024-03-20',
    author: 'GLG',
    excerpt: 'Expert Call — Senior Fintech Analyst, Barclays Research. Key insights: \'The neobank retail market in UK has three phases: 1) user acquisition (won by Revolut), 2) primary account conversion (being won by Monzo), 3) full banking relationship (yet to be won). Revolut\'s banking license changes the game for phase 3.\' On customer acquisition trends: \'H1 2024 saw the first quarter where combined neobank net adds declined YoY. Market is maturing.\'',
    reliabilityScore: 86
  },
  {
    id: 's762',
    title: 'McKinsey_UK_Personal_Finance_Survey_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MCKINSEY-PERSONAL-FINANCE-2024',
    fileType: 'pdf',
    fileName: 'McKinsey_UK_Personal_Finance_Survey_2024.pdf',
    publishedAt: '2024-03-01',
    author: 'McKinsey & Company',
    excerpt: 'McKinsey UK Personal Finance Survey 2024 (n=8,200). Neobank adoption: 41% of UK adults hold at least one neobank account (up from 33% in 2023). Primary neobank users: 14% of UK adults (up from 9%). Brand preference for primary account: Monzo 38%, Revolut 29%, Starling 18%, Other 15%. Key driver for Monzo preference: \'budgeting tools\' (67% cited) and \'salary sorting\' (54%). Key driver for Revolut: \'international use\' (71%) and \'crypto/trading\' (42%).',
    reliabilityScore: 87
  },
  {
    id: 's763',
    title: 'CB_Insights_State_of_Fintech_Neobank_Chapter_Q3_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-CB-INSIGHTS-NEOBANK-Q3-2024',
    fileType: 'pdf',
    fileName: 'CB_Insights_State_of_Fintech_Neobank_Chapter_Q3_2024.pdf',
    publishedAt: '2024-10-01',
    author: 'CB Insights',
    excerpt: 'CB Insights State of Fintech Q3 2024 — Neobank Deep Dive. European neobank funding: $2.1B in H1 2024 (down 34% YoY). Revolut: no new funding since $800M Series E. Customer acquisition cost trends: rising across all players (+22% avg YoY) as social media CAC inflates. Revolut CAC: estimated $4-6 (global avg), Monzo: $8-12 (UK only). EU expansion: Revolut active in 38 markets vs Monzo (1 market), N26 (24 markets). Revolut\'s EU scale is unmatched.',
    reliabilityScore: 84
  },
  {
    id: 's764',
    title: 'Monzo_Annual_Report_FY2024_Companies_House.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-MONZO-ANNUAL-REPORT-FY2024',
    fileType: 'pdf',
    fileName: 'Monzo_Annual_Report_FY2024_Companies_House.pdf',
    publishedAt: '2024-06-30',
    author: 'Companies House (UK)',
    excerpt: 'Monzo Bank Ltd — Annual Report FY2024 (filed Companies House). Revenue: £880M (+108% YoY). First full-year profit: £15.3M (vs -£116M loss FY2023). UK customers: 10M+ (milestone reached March 2024). Primary account holders: 5.8M. Deposits: £7.8B (+89% YoY). Revenue per customer: £88. Net customer adds: +2.3M in FY2024. Strategic focus: \'deepen existing customer relationships via lending, investments, and business accounts.\'',
    reliabilityScore: 91
  },
  {
    id: 's765',
    title: 'Starling_Bank_Annual_Report_FY2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-STARLING-ANNUAL-REPORT-FY2024',
    fileType: 'pdf',
    fileName: 'Starling_Bank_Annual_Report_FY2024.pdf',
    publishedAt: '2024-07-15',
    author: 'Companies House (UK)',
    excerpt: 'Starling Bank — Annual Report FY2024. Revenue: £453M (+42% YoY). Profit before tax: £195M (3rd consecutive profitable year). UK customers: 4.2M. Deposits: £12.1B. Revenue per customer: £126 (highest among UK neobanks). SME lending book: £4.1B. Note: Starling\'s model is fundamentally different — it\'s a lending-led model, not transaction-led like Revolut/Monzo. Retail growth slowing: +380K net adds FY2024 vs +620K FY2023.',
    reliabilityScore: 88
  },
  {
    id: 's766',
    title: 'N26_Geschaeftsbericht_2023_EN_Translation.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-N26-ANNUAL-REPORT-2023',
    fileType: 'pdf',
    fileName: 'N26_Geschaeftsbericht_2023_EN_Translation.pdf',
    publishedAt: '2024-04-01',
    author: 'Bundesanzeiger (DE)',
    excerpt: 'N26 GmbH — Annual Accounts 2023 (English translation). Revenue: €520M (+28% YoY). Net loss: -€78M (narrowing from -€172M in 2022). Customers: 8M across 24 markets. DACH focus: 65% of revenue from Germany/Austria. UK: exited in 2022 (no UK retail presence). Customer acquisition: net adds slowing significantly — +800K in 2023 vs +2.1M in 2022. BaFin restrictions partially in place. Limited relevance for UK competitive dynamics.',
    reliabilityScore: 85
  },
  {
    id: 's767',
    title: 'Sifted_UK_Neobank_Growth_Tracker_H1_2024.pdf',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DS-SIFTED-NEOBANK-H1-2024',
    fileType: 'pdf',
    fileName: 'Sifted_UK_Neobank_Growth_Tracker_H1_2024.pdf',
    publishedAt: '2024-07-10',
    author: 'Sifted',
    excerpt: 'Sifted Neobank Tracker H1 2024. Headline: \'The UK neobank land grab is over.\' Net customer additions (H1 2024): Monzo +1.4M, Revolut UK +680K, Starling +190K, Chase UK +310K. Analysis: Monzo\'s growth rate now 2x Revolut\'s in UK. However, Revolut\'s EU growth remains strong: +3.2M new users across EU in H1 2024. Key quote from Revolut CFO: \'We don\'t optimise for UK retail growth anymore. We optimise for global revenue per user.\'',
    reliabilityScore: 78
  },
  {
    id: 's755',
    title: 'Bloomberg_Intelligence_UK_Neobank_Retail_Benchmarking_H1_2024.pdf',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Bloomberg_Intelligence_UK_Neobank_Retail_Benchmarking_H1_2024.pdf',
    publishedAt: '2024-08-01',
    author: 'Bloomberg Terminal',
    excerpt: 'Bloomberg Neobank Retail Benchmark H1 2024. UK retail market share by monthly active users. Revolut 28.4%, Monzo 24.1%, Starling 10.2%, Chase 8.2%. By primary account: Monzo 5.8M (30.2% of digital-only), Revolut ~1.2pp. Revolut UK customer acquisition has decelerated by 12% in H1 2024, while Monzo gained 2.3M new users in the same period. EU market: Revolut holds 4.4% market share vs Germany/Austria. UK: customer retention remains strong: +3.2M net adds. Revolut losing share on both metrics.',
    reliabilityScore: 95,
    content: `BLOOMBERG INTELLIGENCE - UK NEOBANK RETAIL BENCHMARKING H1 2024

MARKET SHARE ANALYSIS

By MAU (Monthly Active Users):
- Revolut: 28.4% (6.9 Sep) vs Monzo 24.1% (+3.8pp vs H1 2023)
- Monzo: 24.1% (+3.8pp growth)
- Starling: 10.2% (+0.6pp)
- Chase UK: 8.2% (-1.2pp)

By Primary Account Status:
- Monzo: 5.8M primary accounts (30.2% digital-only share)
- Revolut: ~1.2pp below Monzo
- Gap widening: Monzo gaining primary account conversions

CUSTOMER ACQUISITION TRENDS

H1 2024 Net Additions:
- Revolut: decelerated -12% vs H1 2023
- Monzo: +2.3M new users (strong acceleration)
- Starling: flat growth, mature customer base
- Chase: declining (3.8M total, -18.8% retention)

Revolut UK Trajectory:
- Net adds: +3.2M (2024 YTD)
- However: losing share on competitive basis
- Monzo outpacing in both metrics
- This is THE key data point for hypothesis

EU MARKET POSITIONING

Revolut EU Share:
- EU-wide: 4.4% of neobank market
- Germany/Austria: below market average
- Strong in: UK, Poland, Romania
- Weakness: Germany (N26 dominance), France (competing locals)

KEY INSIGHTS

Primary Thesis:
- REVOLUT: -12% YoY deceleration
- MONZO: +2.3M new users H1 2024
- This is THE key data point
- Revolut losing share despite adding users
- Pivot signal toward B2B confirmed`
  },
  {
    id: 's756',
    title: 'CapitalIQ_European_Neobank_Comps_Q3_2024.xlsx',
    category: 'api',
    fileType: 'xlsx',
    fileName: 'CapitalIQ_European_Neobank_Comps_Q3_2024.xlsx',
    publishedAt: '2024-10-15',
    author: 'S&P CapitalIQ',
    excerpt: 'S&P CapitalIQ Neobank Comparables Q3 2024. Revenue comps: Revolut £1.8B, Monzo £880M, N26 €450M, Starling £453M. Customer metrics: Revolut 45M total (9.8M UK), Monzo 10M (focused), N26 8.4. Revolut 14.2x, Monzo 11.8x, N26 5.4. Key insight: Monzo\'s UK-centric model yields better ARPU. Revolut focus: UK/includes) Starling £128. Key insight: Monzo\'s UK/EU ratio unmatched.',
    reliabilityScore: 92,
    content: `S&P CAPITALIQ - EUROPEAN NEOBANK COMPARABLES Q3 2024

REVENUE ANALYSIS

Annual Revenue (LTM):
- Revolut: £1.8B (global)
- Monzo: £880M (UK-focused)
- Starling: £453M (UK-focused)
- N26: €450M (EU-focused)

Revenue Multiples:
- Revolut: 14.2x (estimated, private)
- Monzo: 11.8x (estimated, private)
- Starling: Not disclosed (private)
- N26: 5.4x (based on last funding)

CUSTOMER BASE METRICS

Total Customers:
- Revolut: 45M globally (9.8M UK, 18.2M EU)
- Monzo: 10M (UK-focused, highly engaged)
- N26: 8.4M (Germany-centric, EU-wide)
- Starling: 4.2M (UK SME + retail)

ARPU Comparison:
- Monzo: £88/year (high UK engagement)
- Revolut: £40/year (global average, UK ~£77)
- N26: €54/year
- Starling: £108/year (SME skew)

KEY INSIGHTS

Market Positioning:
- Monzo: UK-centric model = better ARPU
- Revolut: Global scale, lower ARPU
- N26: Struggling outside core markets
- Starling: SME defensibility but slower growth

Revenue Quality:
- Monzo interchange-heavy (78% of revenue)
- Revolut more diversified (subscription 18%, FX 35%)
- Starling business model (lending focus)`
  },
  {
    id: 's757',
    title: 'Refinitiv_LSEG_UK_Digital_Banking_Market_Share_Tracker_2024.pdf',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Refinitiv_LSEG_UK_Digital_Banking_Market_Share_Tracker_2024.pdf',
    publishedAt: '2024-09-01',
    author: 'Refinitiv (LSEG)',
    excerpt: 'Refinitiv UK Digital Banking Market Share 2024. Primary current account holders (challenger banks only): Monzo 5.8M, Revolut data not included in primary account analysis. Measured by primary account share, Monzo leads Revolut by 41%. UK total user base (8.9M) includes non-primary users who hold Revolut as secondary account. When measured by primary account share, Monzo has ~41% higher primary account base. Note: Revolut\'s advantage is total registered users but not primary accounts. "The real battle is primary account status."',
    reliabilityScore: 90,
    content: `REFINITIV LSEG - UK DIGITAL BANKING MARKET SHARE 2024

PRIMARY ACCOUNT ANALYSIS

Primary Account Holders (Challenger Banks):
- Monzo: 5.8M primary accounts
- Revolut: Data not included in primary metric
- Monzo advantage: ~41% higher primary base
- UK definition: Primary = salary deposit destination

Revolut Total vs Primary:
- Total UK users: 8.9M registered
- Primary accounts: estimated 4.1M (extrapolated)
- Gap: 4.8M "secondary" users
- Implication: Lower engagement for non-primary

THE PRIMARY ACCOUNT BATTLE

Why Primary Status Matters:
- Higher transaction volume (3.2x vs secondary)
- Better retention (monthly churn 1.2% vs 6.8%)
- Cross-sell opportunity (lending, savings)
- Revenue per user: £126 primary vs £38 secondary

Competitive Positioning:
- Monzo: Winning primary account conversions
- Revolut: Ahead on total users (vanity metric)
- Starling: 3.1M primary, defensive positioning
- Chase UK: 1.9M primary, losing share

MARKET DYNAMICS

User Acquisition vs Engagement:
- Revolut strong at sign-ups (viral growth)
- Monzo strong at primary conversion (2x better)
- Industry shift: focus moving to primary status
- Regulators track primary accounts for market share

STRATEGIC IMPLICATIONS

Revolut Challenge:
- 4.4M UK users NOT using as primary
- Lower revenue potential per user
- Competitive disadvantage vs Monzo
- Pivot to B2B makes strategic sense

Key Quote:
"The real battle is primary account status"
- Revolut losing share on metric that matters`
  },
  {
    id: 's758',
    title: 'FCA_UK_Retail_Banking_Competition_Report_2024.pdf',
    category: 'regulatory',
    fileType: 'pdf',
    fileName: 'FCA_UK_Retail_Banking_Competition_Report_2024.pdf',
    publishedAt: '2024-08-20',
    author: 'FCA (regulator)',
    excerpt: 'FCA UK Retail Banking Competition 2024. Challenger bank market concentration increasing. Top 3 challengers command 36% of all switches (up from 29% in 2023). Revolut 8.2M total, Monzo 10.1M. Switching dynamics: Monzo was the #1 destination for switchers, representing 22% of inbound switch flows. Revolut 7.1% of switches. FCA notes "increasing concentration risk" in neobank sector. Regulatory view: competition is healthy but...',
    reliabilityScore: 93,
    content: `FCA UK RETAIL BANKING COMPETITION REPORT 2024

MARKET CONCENTRATION ANALYSIS

Challenger Bank Market Share:
- Top 3 challengers: 36% of all switches (2024)
- Up from 29% (2023)
- FCA assessment: "Increasing concentration"

Current Account Provider Base:
- Monzo: 10.1M customers (includes non-primary)
- Revolut: 8.2M UK customers (total registered)
- Starling: 4.2M customers
- Note: FCA tracks total base, not primary distinction

SWITCHING DYNAMICS

Inbound Switch Flows (2024):
- Monzo: #1 destination (22% of total switches)
- Revolut: 7.1% of switch flows
- Starling: 5.4%
- Traditional banks: still losing customers to neobanks

Switch Flow Insights:
- Monzo gaining 3.1x more switchers than Revolut
- Revolut struggles with primary account conversion
- Current account switching service (CASS): facilitates competition
- FCA expects: "significant deposit migration once Revolut offers FSCS-protected accounts"

COMPETITIVE DYNAMICS

Market Health:
- Competition generally healthy
- Concentration risks emerging
- Smaller challengers struggling
- Big 4 traditional banks losing share steadily

Revolut Banking License:
- Granted July 2024
- FCA expects "significant deposit influx"
- Potential game-changer for Revolut
- Question: can it drive primary account adoption?

REGULATORY PERSPECTIVE

FCA Key Observations:
- Neobank competition maturing
- Primary account battle intensifying
- Deposit protection increasingly important
- Open Banking driving innovation

Concerns:
- Market concentration in top 3 neobanks
- Smaller players facing exit pressure
- Consumer understanding of protections varies`
  },
  {
    id: 's759',
    title: 'Dialectica_Transcript_Ex_Revolut_UK_Head_of_Growth.pdf',
    category: 'expert_network',
    fileType: 'pdf',
    fileName: 'Dialectica_Transcript_Ex_Revolut_UK_Head_of_Growth.pdf',
    publishedAt: '2024-02-15',
    author: 'Dialectica',
    excerpt: 'Expert Call — Former Revolut UK Head of Growth (left Feb 2024). Key quotes: "The UK retail market is getting saturated." "Everyone we know has a Monzo account now. The real battle is primary account status." "On Monzo: They cracked the salary deposit problem before us. Their Flex and Salary Sort features drove massive uptake by Q3 2023 that UK retail would plateau. Banking license = Plan B!"',
    reliabilityScore: 91,
    content: `DIALECTICA EXPERT CALL TRANSCRIPT
Former Revolut UK Head of Growth (Feb 2024)

INTERVIEWER CONTEXT
- Former Revolut UK Head of Growth
- Tenure: 2019-2024 (left Feb 2024)
- Oversaw UK retail expansion strategy
- Deep knowledge of competitive dynamics

KEY QUOTES - UK RETAIL SATURATION

"The UK retail market is getting saturated. Everyone we know has a Monzo account now."

Market Maturity:
- UK neobank penetration ~35% of population
- Limited headroom for new customer acquisition
- Competition shifting to primary account battle

"The real battle is primary account status. On Monzo: They cracked the salary deposit problem before us."

Monzo Competitive Advantage:
- Salary Sort feature: direct salary deposit made easy
- Flex product: buy-now-pay-later integration
- Result: 2x primary account conversion vs Revolut
- Revolut playing catch-up

STRATEGIC PIVOT - BANKING LICENSE AS PLAN B

"Their Flex and Salary Sort features drove massive uptake by Q3 2023 that UK retail would plateau."

Revolut Strategy Shift:
- Recognition: retail growth slowing
- Banking license: strategic necessity
- Deposit products = revenue diversification
- B2B focus accelerating

"Banking license = Plan B!"
- Retail customer acquisition not sustainable
- Need deposit-based revenue streams
- Competitive pressure from Monzo unsustainable
- Pivot toward business banking essential

INTERNAL DYNAMICS

Cultural Shift at Revolut:
- 2019-2022: retail growth obsession
- 2023+: B2B and premium tiers prioritized
- UK team morale: "losing to Monzo stings"
- Banking license seen as salvation

Ex-Revolut Perspective:
- Respects Monzo execution
- Acknowledges primary account gap
- Believes Revolut can recover with deposits
- Long-term: global scale will matter more`
  },
  {
    id: 's760',
    title: 'AlphaSights_Call_Ex_Monzo_VP_Retail_Strategy.pdf',
    category: 'expert_network',
    fileType: 'pdf',
    fileName: 'AlphaSights_Call_Ex_Monzo_VP_Retail_Strategy.pdf',
    publishedAt: '2024-01-20',
    author: 'AlphaSights',
    excerpt: 'Expert Call — Former Monzo VP Retail Strategy (left 2023). Key quote: "Monzo was the UK primary account war because we focused on making Monzo the account your salary lands in. Revolut optimised for total downloads — vanity metric. By deposits: Monzo passed Revolut UK Q4 2023. Monzo has no EU ambitions — UK-only means laser focus."',
    reliabilityScore: 88,
    content: `ALPHASIGHTS EXPERT CALL TRANSCRIPT
Former Monzo VP Retail Strategy (Jan 2024)

INTERVIEWER CONTEXT
- Former Monzo VP Retail Strategy
- Tenure: 2018-2023 (left 2023)
- Led primary account conversion strategy
- Key architect of Monzo's competitive positioning

PRIMARY ACCOUNT STRATEGY

"Monzo won the UK primary account war by focusing on making Monzo the account your salary lands in."

Strategic Focus:
- Primary account = strategic priority from Day 1
- Product development centered on salary use case
- Onboarding optimized for employer setup
- Result: 2x conversion rate vs competitors

"Revolut optimised for total downloads — vanity metric."
- Revolut KPIs: total user growth
- Monzo KPIs: primary account penetration
- Fundamental strategic difference
- Downloads don't equal revenue

COMPETITIVE POSITIONING

"By deposits: Monzo passed Revolut UK Q4 2023."
- Deposit balances = true engagement metric
- Monzo: higher average balance per user
- Revolut: more users, lower engagement
- Deposits drive lending revenue potential

Market Share Reality:
- Monzo: winning metric that matters
- Revolut: ahead on vanity metrics
- Gap widening in Monzo's favor
- Industry recognizing primary account importance

UK FOCUS VS GLOBAL AMBITION

"Monzo has no EU ambitions — UK-only means laser focus."

Strategic Trade-offs:
- Monzo: all resources on UK market
- Revolut: spreading across 38 markets
- Focus = better unit economics in core market
- Global expansion dilutes resources

UK Market Dynamics:
- Large enough to build £1B+ business
- Regulatory clarity and stability
- Cultural fit for Monzo brand
- No distraction from EU complexity`
  },
  {
    id: 's761',
    title: 'GLG_Transcript_Senior_Fintech_Analyst_Barclays.pdf',
    category: 'expert_network',
    fileType: 'pdf',
    fileName: 'GLG_Transcript_Senior_Fintech_Analyst_Barclays.pdf',
    publishedAt: '2024-03-01',
    author: 'GLG',
    excerpt: 'Expert Call — Senior Fintech Analyst, Barclays Research. Key insights: "The neobank retail market in UK has three phases: 1 (Acquisition): Won by Revolut. 2 (Primary account conversion): being won by Monzo. 3 (Full banking relationship): Not yet won: Revolut\'s banking license may change dynamics." Customer acquisition drivers analyzed. Top Monzo driver: international use (71%). Top Revolut driver: budgeting tools (67%).',
    reliabilityScore: 86,
    content: `GLG EXPERT CALL TRANSCRIPT
Senior Fintech Analyst, Barclays Research (March 2024)

ANALYST FRAMEWORK - THREE PHASES

Phase 1 (Acquisition):
"Won by Revolut"
- Viral growth engine superior
- Lowest CAC in industry
- 45M global users testament to acquisition strength

Phase 2 (Primary Account Conversion):
"Being won by Monzo"
- 2x primary account conversion rate
- Salary deposit features superior
- UK market share leadership on primary metric

Phase 3 (Full Banking Relationship):
"Not yet won: Revolut's banking license may change dynamics"
- Deposits + lending = full relationship
- Revolut positioned to compete on Phase 3
- Question: can they recover Phase 2 losses?

CUSTOMER ACQUISITION DRIVERS

Analyst Framework:
- Acquisition easiest to win (marketing spend)
- Conversion hardest (requires product excellence)
- Full relationship = ultimate prize (revenue)

"Monzo driver: international use (71%)"
- Monzo positioned as travel card alternative
- International spending no fees
- Viral growth through travel use case

"Revolut driver: budgeting tools (67%)"
- Personal finance management features
- Budgeting and savings automation
- Different value proposition than Monzo

PHASE SHIFT IMPLICATIONS

For Revolut:
- Phase 1 victory = vanity metric
- Phase 2 loss = revenue challenge
- Phase 3 opportunity = banking license critical
- Need to pivot quickly to capture lending revenue

For Monzo:
- Phase 1 loss = acceptable trade-off
- Phase 2 leadership = sustainable advantage
- Phase 3 competition = Revolut threat emerging`
  },
  {
    id: 's762',
    title: 'McKinsey_UK_Personal_Finance_Survey_2024.pdf',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'McKinsey_UK_Personal_Finance_Survey_2024.pdf',
    publishedAt: '2024-06-15',
    author: 'McKinsey & Company',
    excerpt: 'McKinsey UK Personal Finance Survey 2024 (n=8,200). Neobank adoption: 41% of UK adults hold at least one neobank account (up from 33% in 2023). Primary neobank users: 14% of UK adults (up from 9%). Brand preference for PRIMARY account: Monzo 33%, Revolut 29%, Starling 18%. Other 15%. Key driver for Monzo over 62%): "budgeting tools" (42%) Revolut driver: "international use" (71%).',
    reliabilityScore: 87,
    content: `MCKINSEY UK PERSONAL FINANCE SURVEY 2024
Sample: n=8,200 UK adults (Feb-Mar 2024)

NEOBANK ADOPTION TRENDS

Overall Penetration:
- At least one neobank account: 41% (2024) vs 33% (2023)
- Primary neobank users: 14% of UK adults
- Up from 9% (2023) — significant acceleration
- Traditional banks still dominate: 86% primary

Multi-Banking Behavior:
- Average UK adult holds 2.3 bank accounts
- Neobank users hold 1.8 neobank accounts on average
- Primary + secondary account strategy common
- Implication: total users ≠ engagement

BRAND PREFERENCE - PRIMARY ACCOUNT

Survey Question: "Which neobank would you choose as your primary account?"

Results:
- Monzo: 33%
- Revolut: 29%
- Starling: 18%
- Chase UK: 8%
- Other: 15%

Gap Analysis:
- Monzo leads Revolut by +4pp on primary preference
- Corresponds to actual market share dynamics
- Brand strength aligns with conversion rates

DRIVER ANALYSIS

Key Driver for Monzo Preference:
"Budgeting tools" (62% of Monzo preference voters)
- Personal finance management features
- Pots and savings automation
- Spending insights and notifications
- Clear value proposition for primary use

Revolut Driver - International Use:
"International use" (71% of Revolut preference voters)
- Travel-focused value proposition
- Currency exchange and international transfers
- Less relevant for daily UK banking
- Explains lower primary account conversion

Other Drivers:
- Monzo: "budgeting tools" (42% secondary)
- Revolut: "international use" (71% primary)
- Both: ease of use, modern app design`
  },
  {
    id: 's763',
    title: 'CB_Insights_State_of_Fintech_Neobank_Chapter_Q3_2024.pdf',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'CB_Insights_State_of_Fintech_Neobank_Chapter_Q3_2024.pdf',
    publishedAt: '2024-10-01',
    author: 'CB Insights',
    excerpt: 'CB Insights State of Fintech Q3 2024 — Neobank Deep Dive. European neobank funding: $2.18 in H1 2024 (down -34% YoY) as social media CAC inflates. Revolut: no new funding since Series E H1 market (24 markets). Revolut\'s EU active in 38 markets (24 EU). Revenue per user: Revolut £40 (global avg). N26 (24 markets). Revolut\'s EU ratio is unmatched.',
    reliabilityScore: 84,
    content: `CB INSIGHTS - STATE OF FINTECH Q3 2024
Neobank Chapter: European Focus

FUNDING ENVIRONMENT

European Neobank Funding:
- H1 2024: $2.18B (down -34% YoY)
- Investor concern: CAC inflation from social media
- Customer acquisition cost rising across sector
- Profitability pressure intensifying

Revolut Funding Status:
- No new funding since Series E
- Last raise: $800M (2021)
- Valuation: $33B (private market estimate)
- Cash position: strong, no immediate need

CUSTOMER ACQUISITION DYNAMICS

Social Media CAC Inflation:
- Average CAC up +22% YoY (2024)
- Meta/Instagram advertising costs rising
- TikTok emerging channel but experimental
- Organic/viral growth increasingly important

Revolut CAC Advantage:
- Referral program drives 52% of acquisitions
- Below-market CAC: £29 vs industry £41
- However: conversion to primary account weak
- CAC advantage less valuable if engagement low

GEOGRAPHIC DIVERSIFICATION

Revolut Market Presence:
- 38 markets globally (24 in EU)
- Revenue per user: £40 global average
- EU active vs UK: significant variance
- Multi-market strategy = complexity

Competitor Comparison:
- Monzo: UK-only, £88 ARPU
- N26: 8 markets (EU-focused), €54 ARPU
- Starling: UK-only, £108 ARPU

Geographic Trade-offs:
- Revolut: broad reach, lower ARPU
- Competitors: narrow focus, higher engagement
- Question: is global scale advantage or distraction?

KEY INSIGHT

"Revolut's EU ratio is unmatched"
- Market penetration varies widely by country
- Strong: UK, Poland, Romania
- Weak: Germany (N26), France (local players)
- EU-wide presence ≠ EU-wide leadership`
  },
  {
    id: 's764',
    title: 'Monzo_Annual_Report_FY2024_Companies_House.pdf',
    category: 'regulatory',
    fileType: 'pdf',
    fileName: 'Monzo_Annual_Report_FY2024_Companies_House.pdf',
    publishedAt: '2024-07-30',
    author: 'Companies House (UK)',
    excerpt: 'Monzo Bank Ltd — Annual Report FY2024 (filed Companies House). Revenue: £880M (+108% YoY). Full-year profit before tax: £15M (3rd consecutive year). UK customers: 10M+ (milestone reached March 2024). Primary account users: 5.8M (+47%) Deposits: £12.1B (highest per customer: £126 (highest in UK neobanks). First profitable year = sustainable growth model.',
    reliabilityScore: 91,
    content: `MONZO BANK LTD - ANNUAL REPORT FY2024
Filed with Companies House (UK)

FINANCIAL PERFORMANCE

Revenue: £880M (FY2024)
- YoY Growth: +108%
- Revenue breakdown:
  * Interchange fees: 67%
  * Lending interest: 18%
  * Subscription (Monzo Plus/Premium): 11%
  * Other: 4%

Profitability:
- Profit before tax: £15M (FY2024)
- First profitable full year
- 3rd consecutive profitable year (monthly basis since 2022)
- Demonstrates sustainable unit economics

CUSTOMER METRICS

Total UK Customers: 10M+ (March 2024)
- Milestone achievement: 10M users
- YoY growth: +47%
- Primary account users: 5.8M
- Primary account penetration: 58%

Deposits:
- Total customer deposits: £12.1B
- Average deposit per customer: £1,210
- Highest average in UK neobank sector
- Demonstrates superior engagement

ARPU & ENGAGEMENT

Average Revenue Per User: £88/year
- Highest among UK neobanks
- Driven by primary account usage
- Interchange + lending revenue combination
- Premium tier adoption: 15%

Monthly Active Users:
- MAU: 7.2M (72% of total customers)
- High engagement vs industry
- Primary account status drives usage
- Transaction frequency: 28/month per MAU

STRATEGIC POSITIONING

"First profitable year = sustainable growth model"
- Unit economics proven at scale
- Path to profitability clear
- No funding pressure (cash positive)
- Validates UK-focused strategy

Competitive Advantages:
- Primary account leadership
- Superior deposit balances
- Highest ARPU in sector
- Proven profitability

UK MARKET LEADERSHIP

Market Share (Primary Accounts):
- Monzo: 5.8M primary accounts
- Leadership in digital-only banking segment
- Gaining share from traditional banks
- Competitive moat: customer engagement`
  },
  {
    id: 's765',
    title: 'Starling_Bank_Annual_Report_FY2024.pdf',
    category: 'regulatory',
    fileType: 'pdf',
    fileName: 'Starling_Bank_Annual_Report_FY2024.pdf',
    publishedAt: '2024-08-15',
    author: 'Companies House (UK)',
    excerpt: 'Starling Bank — Annual Report FY2024. Revenue: £453M (+42% YoY). Profit before tax: £195M (3rd consecutive year). Customers: 4.2M total. Lending-led model (different from Revolut/Monzo). SME lending focus: £1B. Deposits: £12.1B (highest per customer) Average deposit: £2,870 per customer. Revolut/Monzo customer: £126 (highest per customer). UK neobanks Starling: £128.',
    reliabilityScore: 88,
    content: `STARLING BANK - ANNUAL REPORT FY2024
Filed with Companies House (UK)

FINANCIAL PERFORMANCE

Revenue: £453M (FY2024)
- YoY Growth: +42%
- Revenue model: lending-focused
- Net Interest Margin (NIM): 3.8%
- Different business model vs Revolut/Monzo

Profitability:
- Profit before tax: £195M
- 3rd consecutive profitable year
- Profit margin: 43% (exceptional)
- Most profitable UK neobank

CUSTOMER BASE

Total Customers: 4.2M
- Primary accounts: 3.1M (74% penetration)
- SME customers: 580K (14% of total)
- Retail: 3.6M customers
- Slower growth vs Monzo/Revolut (defensive)

Customer Deposits:
- Total deposits: £12.1B
- Average per customer: £2,870
- Far higher than Monzo (£1,210) or Revolut
- Reflects SME focus and older demographic

BUSINESS MODEL DIFFERENTIATION

Lending-Led Strategy:
- SME lending book: £1B outstanding
- Retail lending: £450M
- Total lending: £1.45B
- NIM-driven revenue vs interchange

Revenue Per Customer:
- Average: £128/year per customer
- Higher than Revolut (£77) and Monzo (£88)
- Driven by lending interest income
- Less dependent on transaction volume

STRATEGIC POSITIONING

"Different model — not directly competing on retail growth"
- SME focus = defensibility
- Lending expertise = barrier to entry
- Older customer demographic (avg 38 years)
- Less viral but more profitable

Competitive Position:
- 3rd in UK neobank market share
- Not chasing Monzo/Revolut on scale
- Focused on profitability over growth
- Banking license advantage from Day 1

NOT DIRECTLY COMPARABLE

Starling vs Revolut/Monzo:
- Different business model (lending vs interchange)
- Different customer segment (SME skew)
- Different growth strategy (profitable vs scale)
- Different revenue model (NIM vs fees)

Key Takeaway:
- Starling: most profitable but slower growth
- Revolut/Monzo: chasing scale and engagement
- All three viable but different approaches`
  },
  {
    id: 's766',
    title: 'N26_Geschäftsbericht_2023_EN_Translation.pdf',
    category: 'regulatory',
    fileType: 'pdf',
    fileName: 'N26_Geschäftsbericht_2023_EN_Translation.pdf',
    publishedAt: '2024-05-20',
    author: 'Bundesanzeiger (DE)',
    excerpt: 'N26 GmbH — Annual Account 2023 (English translation). Revenue: €520M (+28% YoY). Net loss: -€78M (narrowing losses). Customers: 8M across 24 markets. DACH focus: 65% of revenue from Germany/Austria. UK-focused: Monzo/Revolut\'s UK success. BaFin restrictions still partially in place. Limited relevance for UK competitive dynamics.',
    reliabilityScore: 85,
    content: `N26 GMBH - ANNUAL ACCOUNTS 2023
English Translation (Bundesanzeiger Filing)

FINANCIAL PERFORMANCE

Revenue: €520M (2023)
- YoY Growth: +28%
- Slowing growth vs prior years
- Path to profitability: not yet achieved

Net Loss: -€78M
- Narrowing from -€168M (2022)
- Improvement trajectory positive
- Still pre-profitability

CUSTOMER BASE

Total Customers: 8M (24 markets)
- Germany: 4.2M (52% of total)
- Austria: 1.1M (13%)
- Rest of EU: 2.7M (35%)
- Customer growth slowing: +18% YoY

Geographic Focus:
- DACH region: 65% of revenue
- Germany-centric business model
- Limited traction outside core markets
- UK presence minimal (exited retail 2020)

COMPETITIVE POSITIONING

Market Position:
- Leader in Germany
- Weak in UK (Monzo/Revolut dominance)
- Struggling in France, Spain (local players)
- EU-wide ambition not realized

Revenue Per User:
- Average: €54/year (€65 DACH, €38 outside)
- Below Monzo (£88) and Revolut UK (£77)
- Reflects different markets and engagement

REGULATORY CHALLENGES

BaFin Restrictions:
- Historical compliance issues (2019-2021)
- Restrictions on customer growth partially lifted
- Customer onboarding limitations remain
- Reputational damage in Germany

Impact on Growth:
- Customer cap removed (2023)
- But growth still sluggish
- Competition from Trade Republic, Revolut DE
- N26 losing German market share

LIMITED UK RELEVANCE

UK Competitive Dynamics:
- N26 exited UK retail (2020 post-Brexit)
- No direct competition with Monzo/Revolut in UK
- Different market dynamics (DACH vs UK)
- Not comparable for UK analysis

Key Insight:
- N26 shows European neobank challenges
- Country-specific success ≠ pan-EU success
- Revolut's EU presence stronger than N26's
- But UK remains Monzo/Revolut battleground`
  },
  {
    id: 's767',
    title: 'Sifted_UK_Neobank_Growth_Tracker_H1_2024.pdf',
    category: 'web',
    fileType: 'pdf',
    fileName: 'Sifted_UK_Neobank_Growth_Tracker_H1_2024.pdf',
    publishedAt: '2024-07-15',
    author: 'Sifted',
    excerpt: 'Sifted Neobank Tracker H1 2024. Headline: "The UK neobank land grab is over." Net customer additions (H1 2024): Monzo +1.4M. Revolut UK +880K. Starling +130K. Chase UK +310K (unconfirmed). Analysis: Monzo\'s growth rate now 2x Revolut\'s in UK. However, EU remains strong. Monzo UK +3.2M growth (unconfirmed). Clear trend: Revolut UK optimistic till H1 anymore." Revolut CFO: "We don\'t optimise for retail anymore."',
    reliabilityScore: 78,
    content: `SIFTED UK NEOBANK GROWTH TRACKER H1 2024

HEADLINE FINDING

"The UK neobank land grab is over"
- Market maturation evident
- Slowing customer growth across sector
- Competition shifting to engagement metrics
- Primary account battle intensifying

NET CUSTOMER ADDITIONS H1 2024

Rankings:
1. Monzo: +1.4M net additions
2. Revolut UK: +880K net additions
3. Chase UK: +310K (unconfirmed, directional)
4. Starling: +130K net additions

Growth Rate Analysis:
- Monzo growth rate: 2x Revolut in UK
- Revolut UK slowing significantly
- Revolut EU: remains strong growth engine
- Clear divergence: UK vs EU performance

REVOLUT UK DECELERATION

H1 2024 Performance:
- +880K net adds (vs +1.4M H1 2023)
- Growth deceleration: -37% YoY
- Market share loss to Monzo evident
- Strategic pivot confirmed

Revolut CFO Quote:
"We don't optimise for UK retail anymore"
- Explicit acknowledgment of strategic shift
- B2B and EU prioritized
- UK retail = mature, competitive
- Banking license = pivot mechanism

EU PERFORMANCE REMAINS STRONG

Revolut EU Growth:
- +3.2M net adds H1 2024 (estimated)
- EU growth compensating UK slowdown
- But: EU ARPU lower (€32 vs UK £77)
- Revenue quality trade-off

Geographic Strategy:
- UK: defensive positioning
- EU: offensive growth focus
- Global: emerging markets expansion
- Revenue vs volume tension

MONZO MOMENTUM

H1 2024 Highlights:
- Market share gaining across all metrics
- Primary account conversions accelerating
- Profitability achieved (competitive advantage)
- UK-only focus = laser execution

Competitive Moat:
- Primary account leadership
- Salary deposit features superior
- Brand strength in UK unmatched
- Monzo = default choice for UK millennials

KEY INSIGHT - REVOLUT PIVOT

Strategic Implications:
- UK retail no longer growth priority
- EU and B2B driving next phase
- Banking license enables deposit revenue
- Acceptance: Monzo won UK primary battle`
  },

  // Bloomberg API Live Data Sources
  {
    id: 's768',
    title: 'Bloomberg API — UK Neobank Live Market Data',
    category: 'api',
    fileType: 'csv',
    fileName: 'Bloomberg_API_UK_Neobank_Live_Data_Sep_2024.csv',
    publishedAt: '2024-09-15',
    author: 'Bloomberg Terminal (Live API)',
    excerpt: 'Bloomberg real-time UK neobank data. Monzo UK deposit base: £8.1B (September 2024), surpassing Revolut UK deposits for first time. Revolut UK deposits: est. <£7B. Primary account deposits signal engagement shift. Monzo deposit growth: +34% YoY vs Revolut UK +12% YoY.',
    reliabilityScore: 98,
    content: `BLOOMBERG API — UK NEOBANK LIVE MARKET DATA
LAST UPDATED: September 15, 2024

DEPOSIT BASE ANALYSIS (LIVE DATA)

Monzo UK Deposits:
- Total deposits: £8.1B (September 2024)
- YoY growth: +34%
- QoQ growth: +8.2%
- Primary account deposits: £7.4B (91% of total)
- Average deposit per customer: £810

Revolut UK Deposits:
- Total deposits: Est. <£7B (June 2024, last disclosed)
- Estimated current: £6.8B - £7.2B
- YoY growth: +12% (decelerating)
- Primary vs secondary split: undisclosed
- Average deposit per customer: £695

HISTORIC MILESTONE

First Time Monzo Surpasses Revolut UK:
- Monzo deposit leadership achieved Q3 2024
- Crossover point: August 2024
- Gap widening: £0.9B - £1.3B advantage
- Signal: Primary account battle outcome clear

DEPOSIT GROWTH TRENDS

Quarterly Deposit Growth:
- Monzo Q3 2024: +£612M (+8.2%)
- Revolut UK Q3 2024: +£234M (+3.5%)
- Monzo velocity: 2.6x Revolut UK
- Structural shift evident

YoY Comparisons:
- Monzo Sep 2023: £6.05B → Sep 2024: £8.1B (+34%)
- Revolut UK Sep 2023: £6.1B → Sep 2024: £6.9B (+13%)
- Monzo gaining share on every metric

PRIMARY ACCOUNT INDICATOR

Deposit Per Customer Analysis:
- Monzo: £810 average (high primary conversion)
- Revolut UK: £695 average (secondary account signal)
- Gap: £115 per customer
- Implication: Monzo users more engaged

Primary Account Deposits:
- Monzo: 91% of deposits are primary account
- Revolut: Estimated 60-65% primary
- Difference: 26-31pp engagement gap
- Business model divergence

KEY INSIGHTS

Bloomberg Live Data Confirms:
1. Monzo deposit base now exceeds Revolut UK
2. First time in history (achieved August 2024)
3. Primary account leadership translating to deposits
4. Revolut UK growth decelerating significantly

Strategic Implications:
- Deposit base = monetization proxy
- Monzo winning on quality, not just quantity
- Revolut UK tactical retreat evident
- Banking license value higher for Monzo`
  },
  {
    id: 's769',
    title: 'Bloomberg API — Revolut App Downloads Tracker Q3 2024',
    category: 'api',
    fileType: 'csv',
    fileName: 'Bloomberg_API_Revolut_App_Downloads_Q3_2024.csv',
    publishedAt: '2024-10-01',
    author: 'Bloomberg Terminal (App Annie Integration)',
    excerpt: 'Bloomberg app download data Q3 2024. Revolut UK app downloads: -18% YoY (Q3 2024 vs Q3 2023). Monzo UK downloads: +8% YoY. Starling: -3% YoY. Top-of-funnel weakness for Revolut UK confirmed. EU downloads stable. Acquisition channel shift evident.',
    reliabilityScore: 96,
    content: `BLOOMBERG API — APP DOWNLOAD TRACKER Q3 2024
DATA SOURCE: App Annie / Sensor Tower via Bloomberg Terminal

UK APP DOWNLOADS YoY CHANGE (Q3 2024 vs Q3 2023)

Revolut UK:
- Q3 2024 downloads: 1.24M
- Q3 2023 downloads: 1.51M
- YoY change: -18%
- Monthly average: 413K (vs 503K prior year)
- Trend: Decelerating significantly

Monzo UK:
- Q3 2024 downloads: 1.89M
- Q3 2023 downloads: 1.75M
- YoY change: +8%
- Monthly average: 630K
- Trend: Steady growth maintained

Starling UK:
- Q3 2024 downloads: 487K
- Q3 2023 downloads: 502K
- YoY change: -3%
- Monthly average: 162K
- Trend: Mature, stable base

MARKET SHARE BY APP DOWNLOADS

UK Neobank Download Share Q3 2024:
- Monzo: 43.2% (↑ from 38.1% Q3 2023)
- Revolut: 28.4% (↓ from 32.9%)
- Starling: 11.1% (stable)
- Chase UK: 8.8% (new entrant)
- Others: 8.5%

TOP-OF-FUNNEL ANALYSIS

Download-to-Activation Conversion:
- Monzo: 82% (best-in-class)
- Revolut: 73% (declining from 76%)
- Starling: 78%
- Industry average: 68%

Revolut UK Funnel Weakness:
- Downloads: -18% YoY (top of funnel issue)
- Activations: -12% YoY (better than downloads)
- Net adds: -12% YoY (matches activation)
- Retention: stable at ~96% monthly

GEOGRAPHIC DIVERGENCE

Revolut App Downloads by Region:
- UK: -18% YoY (mature market slowdown)
- EU (aggregate): +4% YoY (stable growth)
- Rest of World: +23% YoY (emerging markets)
- Global total: +7% YoY (geographic mix)

UK Share of Revolut Downloads:
- Q3 2023: 28% of global
- Q3 2024: 19% of global
- Decline: -9pp share
- Evidence: UK deprioritization

ACQUISITION CHANNEL BREAKDOWN

Revolut UK Download Sources Q3 2024:
- Organic search: 38% (↓ from 44%)
- Paid social: 31% (↑ from 26%)
- Referral/viral: 18% (↓ from 22%)
- Direct: 13%
- Shift: More paid, less organic (brand weakness)

Monzo UK Download Sources Q3 2024:
- Organic search: 52% (strong brand)
- Referral/viral: 27% (network effects)
- Paid social: 14%
- Direct: 7%
- Advantage: Organic acquisition dominance

KEY INSIGHTS

Bloomberg Data Confirms:
1. Revolut UK app downloads declining -18% YoY
2. Top-of-funnel weakness evident (acquisition problem)
3. Monzo gaining download share (+5pp YoY)
4. Revolut shifting spend to paid channels (brand erosion)

Strategic Implications:
- Revolut UK brand momentum lost
- Monzo organic acquisition engine superior
- Revolut compensating with paid marketing
- UK market maturity + competitive pressure
- Download trends predict future net adds decline`
  },

  // Web Sources — Press Releases & News Articles
  {
    id: 's770',
    title: 'Revolut Press Release — Q3 2024 Results',
    category: 'web',
    fileType: 'pdf',
    fileName: 'Revolut_PR_Q3_2024_Results.pdf',
    publishedAt: '2024-10-15',
    author: 'Revolut Ltd',
    excerpt: 'Revolut Q3 2024 results. Global revenue: £2.8B (+48% YoY). B2B revenue: £780M (28% of total). UK retail segment: revenue flat YoY. Customer count: 47M globally (+18% YoY), UK 10.1M (+3% YoY). CEO quote: "Our banking license unlocks deposit-led revenue model." Strategic pivot to B2B and deposits acknowledged.',
    reliabilityScore: 92,
    url: 'https://www.revolut.com/news/q3-2024-results',
    content: `REVOLUT Q3 2024 RESULTS — PRESS RELEASE
October 15, 2024

GLOBAL PERFORMANCE HIGHLIGHTS

Revenue:
- Q3 2024: £2.8B annualized (+48% YoY)
- B2B segment: £780M (28% of total, +73% YoY)
- Consumer segment: £2.0B (72%, +38% YoY)
- Geographic mix: UK 32%, EU 41%, RoW 27%

Customer Growth:
- Global customers: 47M (+18% YoY)
- UK customers: 10.1M (+3% YoY vs +18% prior year)
- EU customers: 19.8M (+22% YoY)
- Strategic shift: EU prioritization evident

BANKING LICENSE MILESTONE

UK Banking License (Secured July 2024):
- Deposit-led revenue model now enabled
- Target: £1.8B deposit revenue by end 2025
- Current UK deposits: £7.2B
- Savings products launching Q4 2024

CEO Nikolay Storonsky Quote:
"Our banking license unlocks a deposit-led revenue model that transforms our business economics. We're moving beyond transaction fees to sustainable, high-margin deposit and lending revenue."

SEGMENT PERFORMANCE

B2B & Business Accounts:
- Revenue: £780M annualized (+73% YoY)
- Customers: 850K businesses
- ARPU: £918/year (vs consumer £60)
- Churn: 3.1% (vs consumer 4.2%)
- Strategic priority: B2B expansion

UK Retail Segment:
- Revenue: flat YoY (£896M)
- Customer growth: +3% YoY (vs +18% prior year)
- ARPU: £89/year (↑ from £77, premium mix)
- Market assessment: "Mature, competitive"
- Strategic stance: Defensive positioning

STRATEGIC PRIORITIES 2025

1. B2B Expansion: Target 1.5M business customers
2. Deposit Products: Launch savings & investments
3. Banking License Leverage: Lending products H1 2025
4. EU Growth: Maintain 20%+ customer growth
5. Global Expansion: Prioritize high-growth markets

COMPETITIVE POSITIONING

Market Share Commentary:
- "UK neobank market is mature and highly competitive"
- "Monzo has established primary account leadership in UK"
- "Our focus is building global, multi-product platform"
- Implicit acknowledgment: UK retail battle outcome

UK vs EU Strategy:
- UK: Defend existing base, monetize deposits
- EU: Aggressive growth, market share expansion
- Different playbooks for different maturity stages`
  },
  {
    id: 's771',
    title: 'Monzo Press Release — 10M Customer Milestone & H1 2024',
    category: 'web',
    fileType: 'pdf',
    fileName: 'Monzo_PR_10M_Customers_H1_2024.pdf',
    publishedAt: '2024-08-20',
    author: 'Monzo Bank Ltd',
    excerpt: 'Monzo announces 10M customers (August 2024). Primary account holders: 5.8M (58% conversion). H1 2024 net adds: +1.4M. Revenue: £880M annualized (+50% YoY). First profitable half-year achieved. CEO quote: "We\'ve won the primary account battle in UK." Market share: 30.2% primary accounts (digital-only banks).',
    reliabilityScore: 94,
    url: 'https://monzo.com/blog/10-million-customers',
    content: `MONZO 10M CUSTOMER MILESTONE — PRESS RELEASE
August 20, 2024

CUSTOMER GROWTH MILESTONE

10 Million Customers Achieved:
- Total customers: 10M (August 2024)
- Primary account holders: 5.8M (58% conversion rate)
- H1 2024 net additions: +1.4M
- Growth rate: +2.3M annual run rate
- YoY growth: +30%

Primary Account Leadership:
- Primary account share (digital-only): 30.2%
- Primary vs secondary: 58% are primary (best-in-class)
- Salary deposits: 73% of primary account customers
- Market position: Clear leader in UK primary accounts

FINANCIAL PERFORMANCE

Revenue H1 2024:
- Annualized revenue: £880M (+50% YoY)
- Interchange revenue: £686M (78% of total)
- Subscription revenue: £88M (10%)
- Other revenue: £106M (12%)

Profitability Achieved:
- H1 2024: £12M profit (first profitable half)
- Full year 2024 projection: £35M profit
- Milestone: Sustainable profitability reached
- Competitive advantage: Only profitable UK neobank

CEO TS ANIL QUOTE

"We've won the primary account battle in the UK. Our 58% primary account conversion rate — versus industry average of 35% — proves that customers trust Monzo as their main bank. This isn't about total user count; it's about being the bank people actually use every day."

MARKET POSITIONING

UK Digital Banking Share:
- By primary accounts: 30.2% (↑ from 24.7% 2023)
- By MAU: 24.1% (↑ from 20.3% 2023)
- By deposits: £8.1B (leader among neobanks)
- Monzo = default digital bank for UK millennials

Competitive Differentiation:
- Primary account conversion: 58% (Revolut ~46%)
- Deposit per customer: £810 (Revolut UK £695)
- Engagement: 83% MAU ratio (industry 62%)
- Net Promoter Score: 67 (industry 42)

STRATEGIC FOCUS

Product Roadmap:
- Premium tier expansion: Target 15% penetration
- Lending products: Personal loans launching Q4
- Savings products: Market-leading rates
- Business accounts: SME expansion phase

Geographic Strategy:
- UK-only focus maintained
- "We're laser-focused on being the best bank in the UK"
- No near-term international expansion
- Execution over expansion philosophy

DEPOSITS & ENGAGEMENT

Deposit Growth:
- Total deposits: £8.1B (September 2024)
- YoY growth: +34%
- Average deposit: £810/customer
- 91% are primary account deposits

Engagement Metrics:
- Monthly active users: 83% of customer base
- Average transactions: 24/month per MAU
- Card usage: 92% use Monzo as primary card
- App sessions: 18/month per MAU

KEY INSIGHTS

Primary Account Victory:
- Monzo established clear leadership
- 58% primary conversion unmatched
- Deposit leadership = monetization advantage
- Profitability proves business model

Strategic Implications:
- UK primary account battle: decided
- Monzo moat: customer engagement
- Revolut pivot: tactical acknowledgment
- Market maturity: quality over quantity`
  },
  {
    id: 's772',
    title: 'Sifted — "How Monzo Won The UK Neobank Wars" (Oct 2024)',
    category: 'web',
    fileType: 'pdf',
    fileName: 'Sifted_How_Monzo_Won_UK_Neobank_Wars_Oct_2024.pdf',
    publishedAt: '2024-10-08',
    author: 'Sifted / Financial Times',
    excerpt: 'Sifted analysis: Monzo won UK neobank primary account battle. Key factors: primary account obsession, UK-only focus, brand trust. Revolut shifted to B2B and EU. Market share data: Monzo 30.2% primary accounts, Revolut 21.4%. Customer acquisition: Monzo 2x Revolut velocity in UK. Strategic divergence complete.',
    reliabilityScore: 82,
    url: 'https://sifted.eu/articles/monzo-uk-neobank-winner',
    content: `SIFTED ANALYSIS — HOW MONZO WON THE UK NEOBANK WARS
By Anna Heim, October 8, 2024

HEADLINE THESIS

After a decade of neobank competition in the UK, the primary account battle is over — and Monzo won. While Revolut has more total registered users globally, Monzo has established clear leadership where it matters most: primary current accounts, deposits, and customer engagement.

THE PRIMARY ACCOUNT METRIC

Why Primary Accounts Matter:
- Primary account = salary deposit destination
- 4-5x higher revenue per customer vs secondary
- 3x lower churn rate (2.1% vs 6.4%)
- Deposit base drives lending & savings revenue
- Network effects: bills, direct debits, savings

Current State (Q3 2024):
- Monzo: 5.8M primary accounts (30.2% of digital-only)
- Revolut UK: ~4.1M primary accounts (21.4%)
- Gap: 41% advantage for Monzo
- Trend: Gap widening (Monzo +1.4M vs Revolut +680K H1)

MONZO'S WINNING STRATEGY

1. Primary Account Obsession
- Product: Designed for salary & bills from day one
- UX: Bill splitting, pots, salary sorter features
- Marketing: "Make Monzo your main account"
- Metrics: 58% primary conversion (vs 35% industry)

2. UK-Only Focus
- No geographic distraction
- Deep UK market understanding
- Regulatory advantages (earlier banking license)
- Brand resonance: "The UK neobank"

3. Brand & Trust
- Brand awareness: 38% (Revolut 29%)
- Trust scores: Monzo leads all UK neobanks
- Customer satisfaction: NPS 67 (Revolut 42)
- Community: 10M customers, tight-knit

REVOLUT'S STRATEGIC PIVOT

Explicit Acknowledgment:
- CFO quote: "We don't optimise for UK retail anymore"
- CEO: "B2B and EU are our growth engines"
- Investor decks: UK retail = "mature market"
- Resource allocation: UK team flat, EU +40% headcount

Why Revolut Pivoted:
1. Monzo established primary account moat
2. UK CAC rising (+22% YoY), ROI declining
3. EU offers higher growth (+22% YoY vs UK +3%)
4. B2B higher margin (£918 ARPU vs £89 retail)
5. Banking license delayed (secured July 2024, late)

Strategic Shift Timeline:
- 2021-2022: UK retail priority, head-to-head battle
- 2023: B2B expansion initiated, EU investment
- 2024: Explicit pivot, UK retail defensive stance
- 2025 plan: B2B 35% revenue mix target

THE DATA CONFIRMS THE SHIFT

Customer Acquisition (H1 2024):
- Monzo UK: +1.4M net additions
- Revolut UK: +680K net additions
- Monzo velocity: 2.1x Revolut
- Revolut EU: +3.2M (compensating UK)

App Downloads YoY (Q3 2024):
- Monzo: +8% (organic acquisition strength)
- Revolut UK: -18% (top-of-funnel weakness)
- Starling: -3% (mature base)
- Signal: Revolut UK demand declining

Deposit Base:
- Monzo: £8.1B (Sep 2024)
- Revolut UK: £6.9B (last disclosed June)
- Crossover: Monzo overtook Revolut August 2024
- Historic: First time Monzo leads deposits

WHAT THIS MEANS

For Monzo:
- Primary account moat established
- Deposit-led revenue model validated
- Profitability achieved (sustainable advantage)
- UK neobank category leader cemented

For Revolut:
- UK retail = defensive, not growth
- B2B & EU = offensive strategy
- Global platform vision vs UK bank vision
- Different success metric (global scale)

For UK Neobank Market:
- Consolidation phase beginning
- Primary account battle: decided
- Next phase: Monetization & profitability
- Multi-product platforms vs specialists

INDUSTRY EXPERT QUOTES

Simon Taylor (fintech analyst):
"Monzo won by focusing on one thing: being the best primary account in the UK. Revolut tried to be everything to everyone globally. Both strategies can work, but in the UK primary account battle, focus beat scale."

Sarah Kocianski (neobank researcher):
"The deposit data is the smoking gun. Monzo's £8.1B vs Revolut's £6.9B tells you everything about primary account leadership. Deposits = real money, real engagement, real business model."

CONCLUSION

The UK neobank primary account war is over, and Monzo won decisively. Revolut's pivot to B2B and EU is a rational strategic response, not a failure — they're playing a different game now. But in the UK retail banking market, Monzo has established a defensible moat that will be hard to displace.

The question now isn't who won the UK battle, but whether Revolut's global platform strategy will create more value than Monzo's UK-specialist approach. Different visions, different outcomes, but the UK retail banking winner is clear: Monzo.`
  },
  {
    id: 's773',
    title: 'Financial Times — "Revolut Retreats From UK Retail Battle" (Sep 2024)',
    category: 'web',
    fileType: 'pdf',
    fileName: 'FT_Revolut_UK_Retail_Retreat_Sep_2024.pdf',
    publishedAt: '2024-09-25',
    author: 'Financial Times',
    excerpt: 'FT analysis: Revolut de-prioritizing UK retail amid Monzo competition. UK customer growth: +3% YoY (vs +18% prior). Strategic shift to B2B and EU markets. Banking license secured but late to market. Market share data: Monzo leads primary accounts 30.2% vs Revolut 21.4%. Revolut CFO acknowledges "mature UK market."',
    reliabilityScore: 88,
    url: 'https://www.ft.com/content/revolut-uk-retail-strategy-shift',
    content: `FINANCIAL TIMES — REVOLUT RETREATS FROM UK RETAIL BATTLE
By Siddharth Venkataramakrishnan, September 25, 2024

STRATEGIC SHIFT UNDERWAY

Revolut, the London-based fintech once laser-focused on dominating UK retail banking, is pulling back from head-to-head competition with rival Monzo, according to company executives and internal strategy documents reviewed by the Financial Times.

The shift comes as Monzo has established a commanding lead in primary current accounts — the most valuable customers in retail banking — forcing Revolut to refocus on faster-growing business-to-business services and European expansion.

THE NUMBERS TELL THE STORY

UK Customer Growth Deceleration:
- Revolut UK customers: 10.1M (Q3 2024)
- YoY growth: +3% (vs +18% prior year)
- Net adds H1 2024: +680K (vs Monzo +1.4M)
- Market share: 21.4% primary accounts

Monzo's Accelerating Lead:
- Total customers: 10M (Q3 2024)
- Primary accounts: 5.8M (30.2% market share)
- YoY growth: +30%
- Deposit base: £8.1B (surpassed Revolut UK in August)

CFO ACKNOWLEDGES MARKET REALITY

Mikko Salovaara, Revolut CFO, in interview with FT:

"The UK retail market is mature and intensely competitive. We're not going to win the primary account battle by outspending Monzo on customer acquisition. Our banking license came later than theirs, and they've built a moat in primary accounts that's expensive to attack.

We're reallocating capital to areas where we have differentiated advantages: B2B services, European expansion, and global platform capabilities. That's where the growth is, and frankly, where the margins are better."

BANKING LICENSE — TOO LITTLE, TOO LATE?

Revolut secured its UK banking license in July 2024, years after Monzo obtained theirs in 2017. The delay proved costly:

Competitive Disadvantage:
- Monzo had 7-year head start on deposit products
- Customer trust: Banking license signals regulatory approval
- Product roadmap: Lending & savings already scaled
- Revolut now playing catch-up

Deposit Base Reality:
- Monzo deposits: £8.1B (Sep 2024)
- Revolut UK deposits: £6.9B (June 2024, last disclosed)
- Gap: £1.2B and widening
- Monzo overtook Revolut in August 2024 (historic first)

B2B PIVOT IN FULL SWING

Resource Reallocation:
- B2B headcount: +67% in 2024
- UK retail headcount: flat YoY
- Marketing spend: UK retail -22%, B2B +85%
- Product development: 60% B2B focus vs 30% in 2023

B2B Business Case:
- Revenue: £780M annualized (28% of total)
- Growth: +73% YoY (vs UK retail flat)
- ARPU: £918/year (vs £89 retail)
- Churn: 3.1% (vs 4.2% retail)
- Current customers: 850K businesses

Target: 35% B2B Revenue Mix by 2025
"B2B is less sexy than consumer fintech, but it's more profitable and defensible," said one Revolut executive who requested anonymity. "Monzo can't easily replicate our B2B capabilities because they're UK-only and focused on retail."

EU EXPANSION AS GROWTH ENGINE

European Performance:
- EU customers: 19.8M (+22% YoY)
- Net adds H1 2024: +3.2M (vs UK +680K)
- EU markets: Present in 27 countries
- Market share: 4.4% of EU neobank market

EU Strategy:
- Marketing spend: +40% YoY
- Local teams: Hiring in Germany, France, Spain
- Product localization: Country-specific features
- Banking licenses: Pursuing in Lithuania, Ireland

Revenue Trade-off:
- EU ARPU: €32/year (vs UK £89)
- Volume over value strategy
- Future monetization: Savings, lending products
- EU banking license will enable deposit revenue

MONZO'S MOAT

Why Revolut Couldn't Close the Gap:

1. Primary Account Conversion
- Monzo: 58% of customers use as primary
- Revolut UK: ~46% (estimated)
- Gap: 12pp difference
- Network effects: Bills, salary, savings lock-in

2. Brand & Trust
- Monzo brand awareness: 38% (Revolut 29%)
- Customer trust: Monzo leads all UK neobanks
- Community: Monzo users are "evangelists"
- Revolut association: Travel card, FX, not main bank

3. Product-Market Fit
- Monzo designed for primary accounts from day one
- Revolut designed for travel, FX, multi-currency
- Product DNA shapes customer perception
- Hard to reposition established brand

4. Regulatory Advantage
- Monzo banking license: 2017
- Revolut banking license: 2024
- 7-year deposit product head start
- Trust signal: "Real bank" vs "fintech app"

WHAT REVOLUT EXECUTIVES SAY PRIVATELY

Senior Strategy Director (anonymous):
"We're not retreating, we're refocusing. The UK retail battle isn't over, but it's not our #1 priority anymore. We have a global platform that Monzo can't match. Yes, they won UK primary accounts, but we're building something bigger."

Product Lead (anonymous):
"Monzo's UK-only strategy is their strength and their limitation. They'll always be a UK bank. We're building a global financial super-app. Different visions, different time horizons."

ANALYST PERSPECTIVES

Citi Banking Analyst:
"Revolut's pivot is strategically sound. They can't win UK primary accounts without irrational spending, and the market has matured. B2B and EU offer better returns on capital. This is smart capital allocation, not defeat."

Independent Fintech Analyst:
"Let's be clear: Revolut lost the UK retail banking battle to Monzo. The deposit data proves it. But losing one battle doesn't mean losing the war. Revolut's global scale and B2B capabilities may create more shareholder value long-term. We'll see in 5 years."

CONCLUSION

Revolut's retreat from UK retail banking represents a rare admission of competitive defeat in the typically bullish fintech sector. While company executives frame the shift as strategic reallocation, the underlying reality is clear: Monzo won the primary account battle that defines retail banking success.

The question now is whether Revolut's global platform and B2B strategy will prove more valuable than Monzo's UK retail dominance. Both companies are profitable or near-profitable, both have loyal customer bases, but they're now playing fundamentally different games.

In UK retail banking specifically, however, the winner is decided: Monzo has established a primary account moat that Revolut cannot economically justify attacking. The neobank wars in the UK are over. The global fintech platform wars are just beginning.`
  },


];

// Combined sources: SOURCES (s1-s767) + GENERATED_SOURCES (s768-s1351)
export const ALL_SOURCES: Source[] = [
  ...SOURCES,
  ...GENERATED_SOURCES,
];

// ─── NODE → SOURCES MAPPING ──────────────────────────────────────────────────

export const NODE_SOURCES: Record<string, string[]> = {
  // Level 1 — for Analysis Matrix (40 sources each for rich display)
  n1: ['s1', 's2', 's4', 's5', 's6', 's7', 's8', 's10', 's11', 's12', 's13', 's14', 's15', 's16', 's18', 's19', 's20', 's21', 's22', 's23', 's24', 's25', 's26', 's27', 's28', 's29', 's30', 's31', 's32', 's33', 's34', 's35', 's36', 's37', 's38', 's39', 's40', 'cs62', 'cs75', 'cs88', 'cs101', 'cs114', 'cs127', 'cs140'], // Market & Dynamics (47 sources)
  n2: ['s41', 's42', 's43', 's44', 's45', 's46', 's47', 's48', 's49', 's50', 's51', 's52', 's53', 's54', 's55', 's56', 's57', 's58', 's59', 's60', 's61', 's62', 's63', 's64', 's65', 's66', 's67', 's68', 's69', 's70', 's71', 's72', 's73', 's74', 's75', 's76', 's77', 's78', 's79', 's80', 'cs63', 'cs76', 'cs89', 'cs102', 'cs115', 'cs128', 'cs141'], // Competition & Positioning (47 sources)
  n3: ['s81', 's82', 's83', 's84', 's85', 's86', 's87', 's88', 's89', 's90', 's91', 's92', 's93', 's94', 's95', 's96', 's97', 's98', 's99', 's100', 's101', 's102', 's103', 's104', 's105', 's106', 's107', 's108', 's109', 's110', 's111', 's112', 's113', 's114', 's115', 's116', 's117', 's118', 's119', 's120', 'cs64', 'cs77', 'cs90', 'cs103', 'cs116', 'cs129', 'cs142'], // Clients & Retention (47 sources)
  n4: ['s121', 's122', 's123', 's124', 's125', 's126', 's127', 's128', 's129', 's130', 's131', 's132', 's133', 's134', 's135', 's136', 's137', 's138', 's139', 's140', 's141', 's142', 's143', 's144', 's145', 's146', 's147', 's148', 's149', 's150', 's151', 's152', 's153', 's154', 's155', 's156', 's157', 's158', 's159', 's160', 'cs65', 'cs78', 'cs91', 'cs104', 'cs117', 'cs130', 'cs143'], // Pricing & Unit Economics (47 sources)
  n5: ['s161', 's162', 's163', 's164', 's165', 's166', 's167', 's168', 's169', 's170', 's171', 's172', 's173', 's174', 's175', 's176', 's177', 's178', 's179', 's180', 's181', 's182', 's183', 's184', 's185', 's186', 's187', 's188', 's189', 'cs66', 'cs79', 'cs92', 'cs105', 'cs118', 'cs131', 'cs144'], // Go-to-Market & Expansion (47 sources)
  // Level 2 — detailed sub-nodes
  n1a: [ 'cs67', 'cs80', 'cs93', 'cs106', 'cs119', 'cs132', 'cs145'], // Market Size & Growth (37 sources)
  n1b: [ 's260', 'cs68', 'cs81', 'cs94', 'cs107', 'cs120', 'cs133', 'cs146'], // Drivers & Macro Risks (37 sources)
  n2a: ['s261', 's262', 's263', 's264', 's265', 's266', 's267', 's268', 's269', 's270', 's271', 's272', 's273', 's274', 's275', 's276', 's277', 's278', 's279', 's280', 's281', 's282', 's283', 's284', 's285', 's286', 's287', 's288', 's289', 's290', 'cs69', 'cs82', 'cs95', 'cs108', 'cs121', 'cs134', 'cs147'], // Competitive Mapping (37 sources)
  n2b: ['s752', 's753', 's754', 's755', 's756', 's757', 's758', 's759', 's760', 's761', 's762', 's763', 's764', 's765', 's766', 's767', 's1', 's2', 's768', 's769'], // Retail Market Share & Dynamics (UK/EU) - 20 sources (16 matrix docs + 4 Bloomberg/API)
  n3a: ['s321', 's322', 's323', 's324', 's325', 's326', 's327', 's328', 's329', 's330', 's331', 's332', 's333', 's334', 's335', 's336', 's337', 's338', 's339', 's340', 's341', 's342', 's343', 's344', 's345', 's346', 's347', 'cs71', 'cs84', 'cs97', 'cs110', 'cs123', 'cs136', 'cs149'], // Valuation Analysis & Deal Terms (34 sources)
  n3b: ['s348', 'cs1', 'cs2', 'cs3', 'cs4', 'cs5', 'cs6', 'cs7', 'cs8', 'cs9', 'cs10', 'cs11', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16', 'cs17', 'cs18', 'cs19', 'cs20', 'cs21', 'cs22', 'cs72', 'cs85', 'cs98', 'cs111', 'cs124', 'cs137', 'cs150'], // Concentration & Customer Base Quality (30 sources)
  n4a: ['cs23', 'cs24', 'cs25', 'cs26', 'cs27', 'cs28', 'cs29', 'cs30', 'cs31', 'cs32', 'cs33', 'cs34', 'cs35', 'cs36', 'cs37', 'cs38', 'cs39', 'cs40', 'cs41', 'cs42', 'cs43', 'cs73', 'cs86', 'cs99', 'cs112', 'cs125', 'cs138'], // Pricing & Unit Economics (27 sources)
  n5a: ['cs44', 'cs45', 'cs46', 'cs47', 'cs48', 'cs49', 'cs50', 'cs51', 'cs52', 'cs53', 'cs54', 'cs55', 'cs56', 'cs57', 'cs58', 'cs59', 'cs60', 'cs61', 'cs74', 'cs87', 'cs100', 'cs113', 'cs126', 'cs139'], // Go-to-Market & Expansion (24 sources)
};

// Total source references: 498
// Unique sources in system: 498

// ─── WORKSTREAM NODES ─────────────────────────────────────────────────────────

export const WORKSTREAM_NODES: WorkstreamNode[] = [
  // Level 0 — Main thesis
  {
    id: 'n0',
    projectId: 'p1',
    parentId: null,
    title: 'Revolut Investment Thesis',
    description: 'Comprehensive due diligence analysis for Tiger Global investment opportunity in Revolut, the leading European neobank with 45M+ users across retail and business segments.',
    level: 0,
    order: 0,
    status: 'in_progress',
    assigneeId: 'u1',
    deadline: '2026-03-28',
    deadlineStatus: 'ok',
    coverageScore: 62,
    sourceCount: 198,
    hypothesisCount: 12,
    validatedCount: 6,
    updatedAt: '2026-03-16T14:30:00Z',
    updatedBy: 'u1',
  },

  // Level 1 — Main workstreams
  {
    id: 'n1',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Market Overview & Sizing',
    description: 'TAM/SAM/SOM analysis for European neobanking market, growth drivers, segmentation and regulatory landscape assessment.',
    level: 1,
    order: 1,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-15',
    deadlineStatus: 'ok',
    coverageScore: 92,
    sourceCount: 52,
    hypothesisCount: 4,
    validatedCount: 4,
    updatedAt: '2026-03-14T16:20:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n2',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Competitive Landscape',
    description: 'Competitive positioning analysis covering traditional banks, neobanks, and fintech players across retail and B2B segments in UK/EU markets.',
    level: 1,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u3',
    deadline: '2026-03-20',
    deadlineStatus: 'ok',
    coverageScore: 68,
    sourceCount: 58,
    hypothesisCount: 5,
    validatedCount: 2,
    updatedAt: '2026-03-17T10:15:00Z',
    updatedBy: 'u3',
  },
  {
    id: 'n3',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Customer Analysis',
    description: 'Deep-dive into customer segmentation, satisfaction metrics, unit economics (LTV/CAC), and retention/churn dynamics across cohorts.',
    level: 1,
    order: 3,
    status: 'not_started',
    assigneeId: 'u2',
    deadline: '2026-03-25',
    deadlineStatus: 'ok',
    coverageScore: 24,
    sourceCount: 38,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-12T09:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n4',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Growth Assessment & Value Creation',
    description: 'Analysis of organic growth levers, M&A opportunities, and commercial-to-financial revenue bridge for value creation roadmap.',
    level: 1,
    order: 4,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-27',
    deadlineStatus: 'ok',
    coverageScore: 18,
    sourceCount: 32,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-11T14:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n5',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Key Risks & Mitigants',
    description: 'Comprehensive risk assessment covering regulatory compliance, concentration dependencies, and technology/operational vulnerabilities with mitigation strategies.',
    level: 1,
    order: 5,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-28',
    deadlineStatus: 'ok',
    coverageScore: 12,
    sourceCount: 18,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-10T11:30:00Z',
    updatedBy: 'u1',
  },

  // Level 2 — Workstream 01 sub-nodes
  {
    id: 'n1a',
    projectId: 'p1',
    parentId: 'n1',
    title: 'TAM / SAM / SOM - Neobanking Europe',
    description: 'Total addressable market analysis for European neobanking across retail and business segments, with serviceable market sizing and share of market calculations.',
    level: 2,
    order: 1,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-12',
    deadlineStatus: 'ok',
    coverageScore: 94,
    sourceCount: 18,
    hypothesisCount: 2,
    validatedCount: 2,
    updatedAt: '2026-03-12T15:45:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n1b',
    projectId: 'p1',
    parentId: 'n1',
    title: 'Growth Drivers & Macro Trends',
    description: 'Analysis of structural growth drivers including digital banking adoption, mobile-first trends, cost pressures on traditional banks, and macro-economic tailwinds.',
    level: 2,
    order: 2,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-13',
    deadlineStatus: 'ok',
    coverageScore: 91,
    sourceCount: 14,
    hypothesisCount: 1,
    validatedCount: 1,
    updatedAt: '2026-03-13T11:20:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n1c',
    projectId: 'p1',
    parentId: 'n1',
    title: 'Market Segmentation',
    description: 'Customer segmentation across retail (personal banking, premium) and business (freelancers, SMEs, corporates) with penetration analysis by geography.',
    level: 2,
    order: 3,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-14',
    deadlineStatus: 'ok',
    coverageScore: 89,
    sourceCount: 12,
    hypothesisCount: 1,
    validatedCount: 1,
    updatedAt: '2026-03-14T09:30:00Z',
    updatedBy: 'u2',
  },
  {
    id: 'n1d',
    projectId: 'p1',
    parentId: 'n1',
    title: 'Regulatory Environment',
    description: 'European banking regulatory landscape including PSD2, open banking directives, capital requirements, and licensing considerations across key markets.',
    level: 2,
    order: 4,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-15',
    deadlineStatus: 'ok',
    coverageScore: 93,
    sourceCount: 8,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-14T16:10:00Z',
    updatedBy: 'u2',
  },

  // Level 2 — Workstream 02 sub-nodes
  {
    id: 'n2a',
    projectId: 'p1',
    parentId: 'n2',
    title: 'Competitor Mapping',
    description: 'Comprehensive mapping of competitive landscape including traditional banks (HSBC, Barclays), neobanks (N26, Monzo, Starling), and fintech challengers.',
    level: 2,
    order: 1,
    status: 'complete',
    assigneeId: 'u3',
    deadline: '2026-03-16',
    deadlineStatus: 'ok',
    coverageScore: 88,
    sourceCount: 15,
    hypothesisCount: 2,
    validatedCount: 2,
    updatedAt: '2026-03-16T14:00:00Z',
    updatedBy: 'u3',
  },
  {
    id: 'n2b',
    projectId: 'p1',
    parentId: 'n2',
    title: 'Retail Market Share & Dynamics (UK/EU)',
    description: 'Market share analysis and competitive dynamics in UK and EU retail banking segments with focus on user acquisition, feature parity, and pricing strategies.',
    level: 2,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u3',
    deadline: '2026-03-18',
    deadlineStatus: 'ok',
    coverageScore: 72,
    sourceCount: 16,
    hypothesisCount: 2,
    validatedCount: 0,
    updatedAt: '2026-03-17T10:15:00Z',
    updatedBy: 'u3',
  },
  {
    id: 'n2c',
    projectId: 'p1',
    parentId: 'n2',
    title: 'B2B & SME Competitive Dynamics',
    description: 'Business banking competitive landscape covering SME and corporate segments, with analysis of product offerings, pricing, and market positioning.',
    level: 2,
    order: 3,
    status: 'not_started',
    assigneeId: 'u3',
    deadline: '2026-03-20',
    deadlineStatus: 'ok',
    coverageScore: 28,
    sourceCount: 12,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-15T08:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n2d',
    projectId: 'p1',
    parentId: 'n2',
    title: '2.4 | Competitive Moats & Defensibility',
    description: 'Assessment of sustainable competitive advantages including network effects, switching costs, brand strength, regulatory moats, and technology differentiation.',
    level: 2,
    order: 4,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-21',
    deadlineStatus: 'ok',
    coverageScore: 15,
    sourceCount: 7,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-14T10:00:00Z',
    updatedBy: 'u1',
  },

  // Level 2 — Workstream 03 sub-nodes
  {
    id: 'n3a',
    projectId: 'p1',
    parentId: 'n3',
    title: '3.1 | Customer Segmentation & Cohort Analysis',
    description: 'Detailed customer segmentation by demographics, geography, and behavior with cohort-based analysis of activation, engagement, and revenue trends.',
    level: 2,
    order: 1,
    status: 'not_started',
    assigneeId: 'u2',
    deadline: '2026-03-23',
    deadlineStatus: 'ok',
    coverageScore: 22,
    sourceCount: 12,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-12T09:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n3b',
    projectId: 'p1',
    parentId: 'n3',
    title: '3.2 | NPS & Customer Satisfaction',
    description: 'Net Promoter Score analysis and customer satisfaction metrics across segments, with competitive benchmarking and driver analysis.',
    level: 2,
    order: 2,
    status: 'not_started',
    assigneeId: 'u2',
    deadline: '2026-03-24',
    deadlineStatus: 'ok',
    coverageScore: 18,
    sourceCount: 8,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-11T15:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n3c',
    projectId: 'p1',
    parentId: 'n3',
    title: '3.3 | Unit Economics (LTV / CAC / Payback)',
    description: 'Customer unit economics including lifetime value modeling, customer acquisition costs by channel, and payback period analysis across segments.',
    level: 2,
    order: 3,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-25',
    deadlineStatus: 'ok',
    coverageScore: 25,
    sourceCount: 10,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-10T14:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n3d',
    projectId: 'p1',
    parentId: 'n3',
    title: '3.4 | Churn & Retention Dynamics',
    description: 'Analysis of customer churn rates, retention drivers, and cohort-based retention curves with identification of at-risk segments and retention strategies.',
    level: 2,
    order: 4,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-25',
    deadlineStatus: 'ok',
    coverageScore: 20,
    sourceCount: 8,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-09T16:00:00Z',
    updatedBy: 'u1',
  },

  // Level 2 — Workstream 04 sub-nodes
  {
    id: 'n4a',
    projectId: 'p1',
    parentId: 'n4',
    title: '4.1 | Organic Growth Levers',
    description: 'Analysis of organic growth opportunities including geographic expansion, product cross-sell, pricing optimization, and customer segment penetration.',
    level: 2,
    order: 1,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-26',
    deadlineStatus: 'ok',
    coverageScore: 16,
    sourceCount: 12,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-11T14:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n4b',
    projectId: 'p1',
    parentId: 'n4',
    title: '4.2 | Inorganic / M&A Opportunities',
    description: 'Strategic M&A opportunity assessment including potential targets for geographic expansion, capability acquisition, and market consolidation plays.',
    level: 2,
    order: 2,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-27',
    deadlineStatus: 'ok',
    coverageScore: 12,
    sourceCount: 8,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-10T12:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n4c',
    projectId: 'p1',
    parentId: 'n4',
    title: '4.3 | Revenue Bridge (Commercial → Financial)',
    description: 'Detailed revenue bridge from commercial initiatives to financial outcomes, with waterfall analysis of growth drivers and value creation levers.',
    level: 2,
    order: 3,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-27',
    deadlineStatus: 'ok',
    coverageScore: 10,
    sourceCount: 5,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-09T13:00:00Z',
    updatedBy: 'u1',
  },

  // Level 2 — Workstream 05 sub-nodes
  {
    id: 'n5a',
    projectId: 'p1',
    parentId: 'n5',
    title: '5.1 | Regulatory & Compliance Risks',
    description: 'Assessment of regulatory risks including licensing requirements, capital adequacy, AML/KYC compliance, data protection, and evolving regulatory landscape.',
    level: 2,
    order: 1,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-28',
    deadlineStatus: 'ok',
    coverageScore: 14,
    sourceCount: 8,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-10T11:30:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n5b',
    projectId: 'p1',
    parentId: 'n5',
    title: '5.2 | Concentration & Dependency Risks',
    description: 'Analysis of concentration risks including customer concentration, revenue concentration, key person dependencies, and third-party vendor dependencies.',
    level: 2,
    order: 2,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-28',
    deadlineStatus: 'ok',
    coverageScore: 8,
    sourceCount: 5,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-09T10:00:00Z',
    updatedBy: 'u1',
  },
  {
    id: 'n5c',
    projectId: 'p1',
    parentId: 'n5',
    title: '5.3 | Technology & Operational Risks',
    description: 'Technology infrastructure risks, cybersecurity vulnerabilities, operational resilience, and business continuity planning assessment.',
    level: 2,
    order: 3,
    status: 'not_started',
    assigneeId: null,
    deadline: '2026-03-28',
    deadlineStatus: 'ok',
    coverageScore: 10,
    sourceCount: 5,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-08T15:00:00Z',
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
  // ─── Branch 01: Market Overview & Sizing (pre-computed) ────────────────────
  {
    id: 'h1',
    projectId: 'p1',
    nodeId: 'n1a',
    title: 'The European neobank TAM will reach €47B by 2028 (CAGR 12.3%)',
    body: 'Cross-verification of Statista European fintech market forecasts and Bloomberg Intelligence neobanking sector analysis confirms the European neobank Total Addressable Market (TAM) will reach €47B by 2028, representing a 12.3% CAGR from €26.4B in 2023. This growth is driven by three primary factors: (1) Accelerating consumer adoption of digital-first banking solutions across Western and Southern Europe, (2) Regulatory tailwinds including PSD2 open banking mandates enabling seamless account aggregation and payment initiation, and (3) Declining trust in traditional banking institutions post-2008 financial crisis, particularly among millennial and Gen-Z demographics. Statista forecasts €47.2B TAM by 2028 (94% reliability), while Bloomberg Intelligence estimates €46.8B (92% reliability), demonstrating strong cross-source convergence. The retail banking segment (including consumer accounts, cards, payments, and lending) represents the largest component at 68% of total revenue, with B2B neobanking (business accounts, expense management, corporate cards) comprising the remaining 32%. Geographic analysis shows Western Europe (UK, France, Germany, Benelux) accounts for 64% of TAM, Southern Europe (Spain, Italy) 19%, and Northern Europe (Nordics) 12%. This €47B TAM validates the market is large enough to support multiple scaled players including Revolut, N26, Monzo, and Starling, while creating substantial room for continued growth and consolidation.',
    status: 'validated',
    createdBy: 'u2',
    createdAt: '2026-02-18T09:00:00Z',
    updatedAt: '2026-03-01T14:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u1',
    validatedAt: '2026-03-01T16:00:00Z',
    confidence: {
      sourceQuality: 94,
      crossVerification: 88,
      dataFreshness: 95,
      internalConsistency: 90,
      overall: 92,
    },
    sourceIds: ['s1', 's2'],
    sources: [
      { sourceId: 's1', excerpt: 'European Neobank TAM Forecast 2023-2028: 2023: €26.4B, 2024: €29.6B, 2025: €33.2B, 2026: €37.3B, 2027: €41.9B, 2028: €47.2B. CAGR: 12.3%. Drivers: Digital adoption, PSD2 regulatory momentum, declining traditional bank trust.', addedBy: 'u2', addedAt: '2026-02-18T09:00:00Z', note: 'Statista European Fintech Forecast 2024 — premium data source with 94% reliability. Comprehensive TAM model covering all neobank segments.' },
      { sourceId: 's2', excerpt: 'Bloomberg Intelligence Neobanking Sector Analysis Q1 2024: European neobank revenue €46.8B by 2028. Segment breakdown: Retail banking 68% (€31.8B), B2B neobanking 32% (€15.0B). Geographic: Western Europe 64%, Southern Europe 19%, Northern Europe 12%, Other 5%.', addedBy: 'u2', addedAt: '2026-02-20T10:00:00Z', note: 'Bloomberg Intelligence cross-validates Statista TAM with 92% reliability. Strong convergence on €47B ±2% validates market size confidence.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h2', type: 'supports' },
    ],
    tags: ['market_sizing', 'TAM', 'growth', 'neobanking', 'europe'],
    comments: [
      {
        id: 'c1',
        authorId: 'u1',
        content: 'Strong cross-source validation between Statista (€47.2B) and Bloomberg (€46.8B). The 12.3% CAGR is healthy and supports investment thesis. Include TAM chart in executive summary.',
        createdAt: '2026-03-01T10:00:00Z',
        resolved: true,
      },
    ],
    versions: [
      {
        version: 1,
        content: 'European neobank TAM will reach €47B by 2028 with 12% CAGR.',
        changedBy: 'u2',
        changedAt: '2026-02-18T09:00:00Z',
        changeNote: 'Initial version based on Statista forecast',
      },
      {
        version: 2,
        content: 'The European neobank TAM will reach €47B by 2028 (CAGR 12.3%), cross-validated by Statista and Bloomberg Intelligence. Retail banking represents 68% of total revenue.',
        changedBy: 'u2',
        changedAt: '2026-03-01T14:00:00Z',
        changeNote: 'Bloomberg cross-verification added. Geographic and segment breakdowns integrated. TAM confidence validated at 92%.',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-18', score: 85, event: 'Created with Statista source' },
      { date: '2026-02-20', score: 90, event: 'Bloomberg cross-verification added' },
      { date: '2026-03-01', score: 92, event: 'Validated — Manager' },
    ],
    metadata: {
      source: 'manual',
      author: 'Sophie Leclerc',
    },
  },
  {
    id: 'h2',
    projectId: 'p1',
    nodeId: 'n1a',
    title: 'Retail banking represents 68% of total European neobank revenue in 2023',
    body: 'Cross-analysis of Euromonitor International neobanking sector report and McKinsey European Banking Survey confirms retail banking (consumer accounts, cards, payments, personal lending) represents 68% of total European neobank revenue in 2023, equating to €17.9B of €26.4B total market. This 68% retail dominance is strategically significant for three reasons: (1) Retail customers exhibit higher engagement and product attachment rates (3.4 products per customer) versus B2B customers (2.1 products), (2) Retail NPS scores average 58 (vs B2B 48), indicating stronger product-market fit and organic growth potential through word-of-mouth, and (3) Retail segment gross margins average 74% versus B2B 68%, reflecting lower support costs and higher automation rates. Euromonitor estimates retail at 68.2% of revenue (91% reliability), while McKinsey survey data shows 67.4% (87% reliability), demonstrating strong cross-source convergence within ±0.8 percentage points. The retail segment composition breaks down as: transaction accounts 38%, payment cards 24%, personal lending 18%, FX/international payments 12%, premium subscriptions 8%. This retail concentration validates why competitive dynamics in retail banking (including Revolut UK market share trends analyzed by Sarah) are strategically critical — if Revolut is losing ground in the segment that represents 68% of revenue, this poses material risk to the investment thesis. Conversely, if Revolut maintains or gains retail share, the 68% weight amplifies positive returns. The B2B neobanking segment (32% of revenue) is growing faster at 18% CAGR but from a smaller base, suggesting retail will remain the dominant revenue driver through 2028.',
    status: 'validated',
    createdBy: 'u2',
    createdAt: '2026-02-19T11:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u1',
    validatedAt: '2026-03-02T11:00:00Z',
    confidence: {
      sourceQuality: 91,
      crossVerification: 85,
      dataFreshness: 92,
      internalConsistency: 88,
      overall: 89,
    },
    sourceIds: ['s3', 's5'],
    sources: [
      { sourceId: 's3', excerpt: 'European Neobank Revenue Segmentation 2023: Retail Banking €17.9B (68.2%), B2B Neobanking €8.4B (31.8%). Retail breakdown: Transaction accounts 38%, Payment cards 24%, Personal lending 18%, FX/international 12%, Premium subscriptions 8%. Retail gross margins 74%.', addedBy: 'u2', addedAt: '2026-02-19T11:00:00Z', note: 'Euromonitor International Neobanking Sector Report 2024 — comprehensive revenue segmentation with 91% reliability. Critical for understanding retail importance.' },
      { sourceId: 's5', excerpt: 'McKinsey European Banking Survey 2024: Retail neobanking represents 67.4% of total revenue. Retail NPS average 58 vs B2B 48. Retail product attachment 3.4 products/customer vs B2B 2.1. Retail customer acquisition cost €45 vs B2B €180. B2B growing faster (18% CAGR) but from smaller base.', addedBy: 'u2', addedAt: '2026-02-22T10:00:00Z', note: 'McKinsey cross-validates 68% retail dominance with 87% reliability. Strong convergence with Euromonitor confirms strategic weight of retail segment.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h1', type: 'supports' },
    ],
    tags: ['market_segmentation', 'retail_banking', 'revenue_mix', 'strategic_weight'],
    comments: [
      {
        id: 'c2',
        authorId: 'u1',
        content: 'The 68% retail weight is crucial context for Sara\'s UK market share analysis. If Revolut is losing retail share, the 68% multiplier makes this material to investment thesis. Strong cross-source validation.',
        createdAt: '2026-03-02T09:00:00Z',
        resolved: true,
      },
      {
        id: 'c3',
        authorId: 'u3',
        content: 'Note that B2B is growing faster (18% CAGR) but retail remains dominant. Monitor whether this 68% ratio shifts over next 3 years as B2B scales.',
        createdAt: '2026-03-02T10:00:00Z',
        resolved: false,
      },
    ],
    versions: [
      {
        version: 1,
        content: 'Retail banking represents majority of neobank revenue in Europe.',
        changedBy: 'u2',
        changedAt: '2026-02-19T11:00:00Z',
        changeNote: 'Initial version with Euromonitor data',
      },
      {
        version: 2,
        content: 'Retail banking represents 68% of total European neobank revenue (€17.9B of €26.4B in 2023). Cross-validated by Euromonitor and McKinsey. Retail dominance driven by higher engagement, NPS, and margins vs B2B.',
        changedBy: 'u2',
        changedAt: '2026-03-02T10:00:00Z',
        changeNote: 'McKinsey cross-verification added. Strategic implications integrated. Connected to Sara\'s retail market share analysis.',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-19', score: 82, event: 'Created with Euromonitor source' },
      { date: '2026-02-22', score: 87, event: 'McKinsey cross-verification added' },
      { date: '2026-03-02', score: 89, event: 'Validated — Manager' },
    ],
    metadata: {
      source: 'manual',
      author: 'Sophie Leclerc',
    },
  },

  // ─── Branch 02: Competitive Landscape ───────────────────────────────────────
  {
    id: 'h3',
    projectId: 'p1',
    nodeId: 'n2a',
    title: 'Revolut is the #1 neobank in Europe by total users (45M), ahead of Monzo (10M) and N26 (8M)',
    body: 'Cross-verification of CapitalIQ Comparable Company Analysis and Crunchbase neobank user data confirms Revolut is the clear European neobank leader by total users with 45M registered accounts, significantly ahead of second-place Monzo (10M users) and third-place N26 (8M users). This 4.5x user advantage over the second-largest competitor establishes Revolut as the undisputed category leader in terms of customer base scale. CapitalIQ estimates Revolut at 45.2M users (92% reliability), while Crunchbase reports 44.8M users (82% reliability), demonstrating strong cross-source convergence within ±1%. The user distribution breaks down as: UK 38% (17.1M users), EU27 52% (23.4M users), Rest of World 10% (4.5M users). However, total users is a vanity metric that requires contextualization: (1) Revolut\'s retention rates are lower than Monzo (68% annual retention vs Monzo 78%), suggesting user quality gaps, (2) Active user ratio is estimated at only 62% for Revolut vs 84% for Monzo, meaning effective active base is closer to 28M vs 8.4M (3.3x rather than 4.5x), (3) Average revenue per user (ARPU) is lower for Revolut at €94 versus Monzo £112 (€126), indicating Revolut users are less monetized. Most critically, this aggregate user leadership metric masks critical regional dynamics — Revolut is losing UK retail market share to Monzo (per Sara\'s analysis), suggesting the user base advantage may be eroding in the most strategic market. Geographic diversification (52% EU27) provides strategic optionality but also introduces regulatory complexity. The #1 user position remains strategically valuable for brand perception, network effects, and investor narratives, but requires continuous monitoring of underlying engagement and monetization metrics to validate sustainable competitive advantage.',
    status: 'validated',
    createdBy: 'u3',
    createdAt: '2026-02-20T14:00:00Z',
    updatedAt: '2026-03-03T09:00:00Z',
    updatedBy: 'u3',
    validatedBy: 'u1',
    validatedAt: '2026-03-03T10:00:00Z',
    confidence: {
      sourceQuality: 92,
      crossVerification: 80,
      dataFreshness: 90,
      internalConsistency: 85,
      overall: 87,
    },
    sourceIds: ['s2', 's15'],
    sources: [
      { sourceId: 's2', excerpt: 'CapitalIQ Comparable Company Analysis Q1 2024: Revolut 45.2M total users (UK 17.1M, EU27 23.4M, RoW 4.7M). Monzo 10.1M users (UK-focused). N26 8.2M users (EU-focused). Starling 3.8M users (UK-focused). Revolut ARPU €94, retention 68% annual, active ratio 62%.', addedBy: 'u3', addedAt: '2026-02-20T14:00:00Z', note: 'CapitalIQ premium data confirms Revolut #1 position with 92% reliability. However, user quality metrics (retention 68%, active 62%, ARPU €94) lag Monzo on all three dimensions.' },
      { sourceId: 's15', excerpt: 'Crunchbase Neobank Database 2024: Revolut 44.8M users, Monzo 10.0M, N26 8.0M, Starling 3.7M, Wise 16M (cross-border focus). Revolut geographic split: UK 38%, Continental Europe 52%, Rest of World 10%. Monzo retention rate 78%, active user ratio 84%, ARPU £112 (€126).', addedBy: 'u3', addedAt: '2026-02-23T10:00:00Z', note: 'Crunchbase cross-validates user counts with 82% reliability. Notable that Monzo outperforms Revolut on quality metrics despite 4.5x smaller user base — suggests Revolut scale advantage may not translate to sustainable monetization advantage.' },
    ] as HypothesisSource[],
    relations: [],
    tags: ['competitive_landscape', 'market_share', 'user_base', 'scale', 'europe'],
    comments: [
      {
        id: 'c4',
        authorId: 'u1',
        content: 'Revolut #1 position by users (45M vs 10M) is important but not sufficient. The underlying quality metrics are concerning: 68% retention vs Monzo 78%, 62% active vs 84%, €94 ARPU vs €126. This suggests Revolut has scale but not quality advantage.',
        createdAt: '2026-03-02T14:00:00Z',
        resolved: true,
      },
      {
        id: 'c5',
        authorId: 'u2',
        content: 'Critical link to Sara\'s UK market share analysis: if Revolut is losing ground in UK (38% of user base), this erodes the #1 position foundation. Geographic diversification (52% EU27) provides hedge but UK remains strategic core.',
        createdAt: '2026-03-03T09:00:00Z',
        resolved: false,
      },
    ],
    versions: [
      {
        version: 1,
        content: 'Revolut is the largest neobank in Europe by user count.',
        changedBy: 'u3',
        changedAt: '2026-02-20T14:00:00Z',
        changeNote: 'Initial version with CapitalIQ data',
      },
      {
        version: 2,
        content: 'Revolut is #1 neobank in Europe with 45M users (vs Monzo 10M, N26 8M). However, user quality metrics lag: 68% retention vs Monzo 78%, 62% active vs 84%, €94 ARPU vs €126. UK market share erosion (per Sara) threatens foundation.',
        changedBy: 'u3',
        changedAt: '2026-03-03T09:00:00Z',
        changeNote: 'Crunchbase cross-verification added. Critical nuances on user quality metrics integrated. Connected to Sara\'s UK market share findings for strategic context.',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-20', score: 80, event: 'Created with CapitalIQ source' },
      { date: '2026-02-23', score: 85, event: 'Crunchbase cross-verification added' },
      { date: '2026-03-03', score: 87, event: 'Validated — Manager' },
    ],
    metadata: {
      source: 'manual',
      author: 'Thomas Chen',
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
    actor: 'Sarah Clarke',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h8',
    targetName: 'H8 — Compression multiples SaaS',
    timestamp: '2026-03-01T10:00:00Z',
  },
  {
    id: 'log9',
    projectId: 'p1',
    action: 'Statut → On Hold',
    actor: 'Sarah Clarke',
    actorId: 'u2',
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

export const getSourceById = (id: string) => ALL_SOURCES.find(s => s.id === id);

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
  {
    id: 'cs8',
    title: 'Document 1 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-75678',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-01',
    author: 'External System',
    reliabilityScore: 83,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-01T16:26:00Z',
  },
  {
    id: 'cs9',
    title: 'Document 2 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-23320',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-10-12',
    author: 'External System',
    reliabilityScore: 85,
    syncStatus: 'synced',
    lastSyncAt: '2025-10-12T10:19:00Z',
  },
  {
    id: 'cs10',
    title: 'Document 3 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-13079',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-05-07',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'syncing',
    lastSyncAt: '2025-05-07T13:10:00Z',
  },
  {
    id: 'cs11',
    title: 'Document 4 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-59883',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-23',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'syncing',
    lastSyncAt: '2026-03-23T14:29:00Z',
  },
  {
    id: 'cs12',
    title: 'Document 5 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-74024',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-11-03',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'synced',
    lastSyncAt: '2025-11-03T15:53:00Z',
  },
  {
    id: 'cs13',
    title: 'Document 6 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-20843',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-23',
    author: 'External System',
    reliabilityScore: 85,
    syncStatus: 'syncing',
    lastSyncAt: '2026-03-23T09:12:00Z',
  },
  {
    id: 'cs14',
    title: 'Document 7 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-40245',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-06',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'syncing',
    lastSyncAt: '2025-09-06T10:45:00Z',
  },
  {
    id: 'cs15',
    title: 'Document 8 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-20676',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-01',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-01T18:36:00Z',
  },
  {
    id: 'cs16',
    title: 'Document 9 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-86348',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-05-21',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'synced',
    lastSyncAt: '2025-05-21T18:45:00Z',
  },
  {
    id: 'cs17',
    title: 'Document 10 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-87490',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-18',
    author: 'External System',
    reliabilityScore: 83,
    syncStatus: 'pending',
    lastSyncAt: '2025-12-18T14:19:00Z',
  },
  {
    id: 'cs18',
    title: 'Document 11 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-79513',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-08-28',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2025-08-28T16:25:00Z',
  },
  {
    id: 'cs19',
    title: 'Document 12 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-73482',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-04',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'pending',
    lastSyncAt: '2025-03-04T16:26:00Z',
  },
  {
    id: 'cs20',
    title: 'Document 13 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-40184',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-20',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-20T13:36:00Z',
  },
  {
    id: 'cs21',
    title: 'Document 14 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-27556',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-07-08',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2025-07-08T08:09:00Z',
  },
  {
    id: 'cs22',
    title: 'Document 15 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-23000',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-05-09',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2025-05-09T10:13:00Z',
  },
  {
    id: 'cs23',
    title: 'Document 16 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-55357',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-02-15',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2025-02-15T08:03:00Z',
  },
  {
    id: 'cs24',
    title: 'Document 17 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-25415',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-01-26',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2025-01-26T08:52:00Z',
  },
  {
    id: 'cs25',
    title: 'Document 18 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-86674',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-07-27',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'synced',
    lastSyncAt: '2025-07-27T10:06:00Z',
  },
  {
    id: 'cs26',
    title: 'Document 19 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-57748',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-06-20',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2025-06-20T14:24:00Z',
  },
  {
    id: 'cs27',
    title: 'Document 20 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-10789',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-24',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'syncing',
    lastSyncAt: '2026-01-24T08:52:00Z',
  },
  {
    id: 'cs28',
    title: 'Document 21 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-24721',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-10',
    author: 'External System',
    reliabilityScore: 87,
    syncStatus: 'syncing',
    lastSyncAt: '2025-12-10T17:33:00Z',
  },
  {
    id: 'cs29',
    title: 'Document 22 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-17800',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-02',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'synced',
    lastSyncAt: '2025-12-02T17:30:00Z',
  },
  {
    id: 'cs30',
    title: 'Document 23 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-58424',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-09',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-09T09:49:00Z',
  },
  {
    id: 'cs31',
    title: 'Document 24 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-72120',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-21',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-21T17:41:00Z',
  },
  {
    id: 'cs32',
    title: 'Document 25 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-24441',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-13',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2025-12-13T18:22:00Z',
  },
  {
    id: 'cs33',
    title: 'Document 26 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-12976',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-18',
    author: 'External System',
    reliabilityScore: 87,
    syncStatus: 'pending',
    lastSyncAt: '2026-01-18T10:30:00Z',
  },
  {
    id: 'cs34',
    title: 'Document 27 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-81901',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-05-22',
    author: 'External System',
    reliabilityScore: 85,
    syncStatus: 'synced',
    lastSyncAt: '2025-05-22T16:36:00Z',
  },
  {
    id: 'cs35',
    title: 'Document 28 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-29494',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-25',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-25T12:17:00Z',
  },
  {
    id: 'cs36',
    title: 'Document 29 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-92451',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-21',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'syncing',
    lastSyncAt: '2025-12-21T18:16:00Z',
  },
  {
    id: 'cs37',
    title: 'Document 30 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-25685',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-18',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'syncing',
    lastSyncAt: '2025-09-18T11:11:00Z',
  },
  {
    id: 'cs38',
    title: 'Document 31 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-79556',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-16',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'pending',
    lastSyncAt: '2026-03-16T14:36:00Z',
  },
  {
    id: 'cs39',
    title: 'Document 32 from GOOGLE DRIVE',
    category: 'connector',
    connectorId: 'google_drive',
    externalId: 'GOOGLE_DRIVE-54871',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-13',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-13T10:00:00Z',
  },
  {
    id: 'cs40',
    title: 'Document 1 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-23922',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-17',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-17T08:15:00Z',
  },
  {
    id: 'cs41',
    title: 'Document 2 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-77700',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-15',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-15T08:43:00Z',
  },
  {
    id: 'cs42',
    title: 'Document 3 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-58275',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-27',
    author: 'External System',
    reliabilityScore: 96,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-27T12:37:00Z',
  },
  {
    id: 'cs43',
    title: 'Document 4 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-20313',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-20',
    author: 'External System',
    reliabilityScore: 94,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-20T17:47:00Z',
  },
  {
    id: 'cs44',
    title: 'Document 5 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-57198',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-01',
    author: 'External System',
    reliabilityScore: 96,
    syncStatus: 'synced',
    lastSyncAt: '2025-03-01T08:57:00Z',
  },
  {
    id: 'cs45',
    title: 'Document 6 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-74706',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-03',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2025-03-03T14:13:00Z',
  },
  {
    id: 'cs46',
    title: 'Document 7 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-30531',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-08',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'synced',
    lastSyncAt: '2025-12-08T16:13:00Z',
  },
  {
    id: 'cs47',
    title: 'Document 8 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-73002',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-01-11',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2025-01-11T16:44:00Z',
  },
  {
    id: 'cs48',
    title: 'Document 9 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-53567',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-13',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'pending',
    lastSyncAt: '2026-03-13T14:03:00Z',
  },
  {
    id: 'cs49',
    title: 'Document 10 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-76706',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-26',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'synced',
    lastSyncAt: '2025-09-26T08:00:00Z',
  },
  {
    id: 'cs50',
    title: 'Document 11 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-71369',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-21',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'syncing',
    lastSyncAt: '2025-12-21T17:45:00Z',
  },
  {
    id: 'cs51',
    title: 'Document 12 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-32154',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-08-10',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2025-08-10T12:18:00Z',
  },
  {
    id: 'cs52',
    title: 'Document 13 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-27305',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-11',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-11T14:57:00Z',
  },
  {
    id: 'cs53',
    title: 'Document 14 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-68552',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-06',
    author: 'External System',
    reliabilityScore: 96,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-06T11:44:00Z',
  },
  {
    id: 'cs54',
    title: 'Document 15 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-30960',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-16',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2025-12-16T13:34:00Z',
  },
  {
    id: 'cs55',
    title: 'Document 16 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-81136',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-08',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-08T14:47:00Z',
  },
  {
    id: 'cs56',
    title: 'Document 17 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-18503',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-10',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-10T09:59:00Z',
  },
  {
    id: 'cs57',
    title: 'Document 18 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-87912',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-01-20',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2025-01-20T13:04:00Z',
  },
  {
    id: 'cs58',
    title: 'Document 19 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-93435',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-06',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-06T18:58:00Z',
  },
  {
    id: 'cs59',
    title: 'Document 20 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-59749',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-03',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-03T17:42:00Z',
  },
  {
    id: 'cs60',
    title: 'Document 21 from CAPITALIQ',
    category: 'connector',
    connectorId: 'capitaliq',
    externalId: 'CAPITALIQ-96955',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-28',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-28T11:24:00Z',
  },
  {
    id: 'cs61',
    title: 'Document 1 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-73592',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-23',
    author: 'External System',
    reliabilityScore: 81,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-23T09:02:00Z',
  },
  {
    id: 'cs62',
    title: 'Document 2 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-37577',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-05',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-05T08:38:00Z',
  },
  {
    id: 'cs63',
    title: 'Document 3 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-47584',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-20',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'syncing',
    lastSyncAt: '2026-03-20T08:03:00Z',
  },
  {
    id: 'cs64',
    title: 'Document 4 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-46710',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-05',
    author: 'External System',
    reliabilityScore: 78,
    syncStatus: 'syncing',
    lastSyncAt: '2026-03-05T08:09:00Z',
  },
  {
    id: 'cs65',
    title: 'Document 5 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-46305',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-28',
    author: 'External System',
    reliabilityScore: 85,
    syncStatus: 'synced',
    lastSyncAt: '2025-09-28T12:11:00Z',
  },
  {
    id: 'cs66',
    title: 'Document 6 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-84136',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-17',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-17T11:59:00Z',
  },
  {
    id: 'cs67',
    title: 'Document 7 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-42819',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-01',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'pending',
    lastSyncAt: '2026-01-01T09:00:00Z',
  },
  {
    id: 'cs68',
    title: 'Document 8 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-33880',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-06-20',
    author: 'External System',
    reliabilityScore: 87,
    syncStatus: 'synced',
    lastSyncAt: '2025-06-20T15:01:00Z',
  },
  {
    id: 'cs69',
    title: 'Document 9 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-95249',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-06-22',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'pending',
    lastSyncAt: '2025-06-22T11:34:00Z',
  },
  {
    id: 'cs70',
    title: 'Document 10 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-14392',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-03',
    author: 'External System',
    reliabilityScore: 80,
    syncStatus: 'syncing',
    lastSyncAt: '2026-02-03T09:42:00Z',
  },
  {
    id: 'cs71',
    title: 'Document 11 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-85002',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-15',
    author: 'External System',
    reliabilityScore: 79,
    syncStatus: 'syncing',
    lastSyncAt: '2026-01-15T13:50:00Z',
  },
  {
    id: 'cs72',
    title: 'Document 12 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-68359',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-01-05',
    author: 'External System',
    reliabilityScore: 81,
    syncStatus: 'synced',
    lastSyncAt: '2025-01-05T14:11:00Z',
  },
  {
    id: 'cs73',
    title: 'Document 13 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-14866',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-28',
    author: 'External System',
    reliabilityScore: 88,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-28T12:00:00Z',
  },
  {
    id: 'cs74',
    title: 'Document 14 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-69361',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-25',
    author: 'External System',
    reliabilityScore: 87,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-25T14:29:00Z',
  },
  {
    id: 'cs75',
    title: 'Document 15 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-15969',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-10',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-10T08:50:00Z',
  },
  {
    id: 'cs76',
    title: 'Document 16 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-13095',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-25',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'synced',
    lastSyncAt: '2025-12-25T17:16:00Z',
  },
  {
    id: 'cs77',
    title: 'Document 17 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-20131',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-11',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-11T16:12:00Z',
  },
  {
    id: 'cs78',
    title: 'Document 18 from DROPBOX',
    category: 'connector',
    connectorId: 'dropbox',
    externalId: 'DROPBOX-10255',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-01-26',
    author: 'External System',
    reliabilityScore: 87,
    syncStatus: 'synced',
    lastSyncAt: '2025-01-26T13:29:00Z',
  },
  {
    id: 'cs79',
    title: 'Document 1 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-89647',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-10',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'syncing',
    lastSyncAt: '2026-01-10T17:35:00Z',
  },
  {
    id: 'cs80',
    title: 'Document 2 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-39899',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-18',
    author: 'External System',
    reliabilityScore: 88,
    syncStatus: 'synced',
    lastSyncAt: '2025-03-18T11:23:00Z',
  },
  {
    id: 'cs81',
    title: 'Document 3 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-61043',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-28',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-28T09:45:00Z',
  },
  {
    id: 'cs82',
    title: 'Document 4 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-35968',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-13',
    author: 'External System',
    reliabilityScore: 80,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-13T09:38:00Z',
  },
  {
    id: 'cs83',
    title: 'Document 5 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-20970',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-03',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-03T09:22:00Z',
  },
  {
    id: 'cs84',
    title: 'Document 6 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-13202',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-04-27',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'synced',
    lastSyncAt: '2025-04-27T17:08:00Z',
  },
  {
    id: 'cs85',
    title: 'Document 7 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-25913',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-08-25',
    author: 'External System',
    reliabilityScore: 81,
    syncStatus: 'synced',
    lastSyncAt: '2025-08-25T10:03:00Z',
  },
  {
    id: 'cs86',
    title: 'Document 8 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-17551',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-24',
    author: 'External System',
    reliabilityScore: 81,
    syncStatus: 'pending',
    lastSyncAt: '2026-01-24T13:31:00Z',
  },
  {
    id: 'cs87',
    title: 'Document 9 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-55530',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-06',
    author: 'External System',
    reliabilityScore: 80,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-06T16:56:00Z',
  },
  {
    id: 'cs88',
    title: 'Document 10 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-43464',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-04-14',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'synced',
    lastSyncAt: '2025-04-14T18:07:00Z',
  },
  {
    id: 'cs89',
    title: 'Document 11 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-18008',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-26',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'syncing',
    lastSyncAt: '2026-01-26T09:09:00Z',
  },
  {
    id: 'cs90',
    title: 'Document 12 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-74519',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-11',
    author: 'External System',
    reliabilityScore: 85,
    syncStatus: 'syncing',
    lastSyncAt: '2026-03-11T14:47:00Z',
  },
  {
    id: 'cs91',
    title: 'Document 13 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-22429',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-21',
    author: 'External System',
    reliabilityScore: 81,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-21T10:05:00Z',
  },
  {
    id: 'cs92',
    title: 'Document 14 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-97509',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-24',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'pending',
    lastSyncAt: '2026-03-24T12:22:00Z',
  },
  {
    id: 'cs93',
    title: 'Document 15 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-47029',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-06-01',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'synced',
    lastSyncAt: '2025-06-01T12:52:00Z',
  },
  {
    id: 'cs94',
    title: 'Document 16 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-61110',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-20',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-20T17:21:00Z',
  },
  {
    id: 'cs95',
    title: 'Document 17 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-93163',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-22',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'syncing',
    lastSyncAt: '2026-01-22T13:25:00Z',
  },
  {
    id: 'cs96',
    title: 'Document 18 from SHAREPOINT',
    category: 'connector',
    connectorId: 'sharepoint',
    externalId: 'SHAREPOINT-80741',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-11-06',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'synced',
    lastSyncAt: '2025-11-06T08:38:00Z',
  },
  {
    id: 'cs97',
    title: 'Document 1 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-26485',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-06',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'synced',
    lastSyncAt: '2025-09-06T18:58:00Z',
  },
  {
    id: 'cs98',
    title: 'Document 2 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-34106',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-27',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'syncing',
    lastSyncAt: '2026-02-27T14:43:00Z',
  },
  {
    id: 'cs99',
    title: 'Document 3 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-24975',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-23',
    author: 'External System',
    reliabilityScore: 97,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-23T17:51:00Z',
  },
  {
    id: 'cs100',
    title: 'Document 4 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-93185',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-20',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-20T09:44:00Z',
  },
  {
    id: 'cs101',
    title: 'Document 5 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-24283',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-16',
    author: 'External System',
    reliabilityScore: 96,
    syncStatus: 'synced',
    lastSyncAt: '2025-09-16T10:46:00Z',
  },
  {
    id: 'cs102',
    title: 'Document 6 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-55826',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-07-07',
    author: 'External System',
    reliabilityScore: 98,
    syncStatus: 'synced',
    lastSyncAt: '2025-07-07T16:31:00Z',
  },
  {
    id: 'cs103',
    title: 'Document 7 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-61515',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-03',
    author: 'External System',
    reliabilityScore: 96,
    syncStatus: 'pending',
    lastSyncAt: '2025-03-03T11:15:00Z',
  },
  {
    id: 'cs104',
    title: 'Document 8 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-91847',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-02-25',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'synced',
    lastSyncAt: '2025-02-25T12:19:00Z',
  },
  {
    id: 'cs105',
    title: 'Document 9 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-53200',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-11-25',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'syncing',
    lastSyncAt: '2025-11-25T11:38:00Z',
  },
  {
    id: 'cs106',
    title: 'Document 10 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-66013',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-12',
    author: 'External System',
    reliabilityScore: 95,
    syncStatus: 'pending',
    lastSyncAt: '2025-12-12T18:44:00Z',
  },
  {
    id: 'cs107',
    title: 'Document 11 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-85169',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-16',
    author: 'External System',
    reliabilityScore: 95,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-16T13:52:00Z',
  },
  {
    id: 'cs108',
    title: 'Document 12 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-50333',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-11-11',
    author: 'External System',
    reliabilityScore: 94,
    syncStatus: 'synced',
    lastSyncAt: '2025-11-11T13:48:00Z',
  },
  {
    id: 'cs109',
    title: 'Document 13 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-14284',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-10-22',
    author: 'External System',
    reliabilityScore: 94,
    syncStatus: 'syncing',
    lastSyncAt: '2025-10-22T12:30:00Z',
  },
  {
    id: 'cs110',
    title: 'Document 14 from BLOOMBERG',
    category: 'connector',
    connectorId: 'bloomberg',
    externalId: 'BLOOMBERG-44656',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-01',
    author: 'External System',
    reliabilityScore: 95,
    syncStatus: 'pending',
    lastSyncAt: '2025-09-01T10:49:00Z',
  },
  {
    id: 'cs111',
    title: 'Document 1 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-78342',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-07-08',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2025-07-08T13:03:00Z',
  },
  {
    id: 'cs112',
    title: 'Document 2 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-76006',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-17',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'syncing',
    lastSyncAt: '2026-02-17T10:34:00Z',
  },
  {
    id: 'cs113',
    title: 'Document 3 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-93391',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-27',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-27T16:29:00Z',
  },
  {
    id: 'cs114',
    title: 'Document 4 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-71386',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-24',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'pending',
    lastSyncAt: '2025-03-24T15:15:00Z',
  },
  {
    id: 'cs115',
    title: 'Document 5 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-74806',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-10-25',
    author: 'External System',
    reliabilityScore: 87,
    syncStatus: 'syncing',
    lastSyncAt: '2025-10-25T15:50:00Z',
  },
  {
    id: 'cs116',
    title: 'Document 6 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-50033',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-07-12',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2025-07-12T11:58:00Z',
  },
  {
    id: 'cs117',
    title: 'Document 7 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-33671',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-13',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-13T18:14:00Z',
  },
  {
    id: 'cs118',
    title: 'Document 8 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-42370',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-25',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-25T17:21:00Z',
  },
  {
    id: 'cs119',
    title: 'Document 9 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-69909',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-11',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'pending',
    lastSyncAt: '2026-01-11T16:13:00Z',
  },
  {
    id: 'cs120',
    title: 'Document 10 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-18901',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-21',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-21T14:18:00Z',
  },
  {
    id: 'cs121',
    title: 'Document 11 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-97761',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-05-14',
    author: 'External System',
    reliabilityScore: 87,
    syncStatus: 'pending',
    lastSyncAt: '2025-05-14T10:16:00Z',
  },
  {
    id: 'cs122',
    title: 'Document 12 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-41312',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-05',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'syncing',
    lastSyncAt: '2026-02-05T13:19:00Z',
  },
  {
    id: 'cs123',
    title: 'Document 13 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-17136',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-10-04',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'synced',
    lastSyncAt: '2025-10-04T09:27:00Z',
  },
  {
    id: 'cs124',
    title: 'Document 14 from PITCHBOOK',
    category: 'connector',
    connectorId: 'pitchbook',
    externalId: 'PITCHBOOK-26256',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-23',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-23T14:58:00Z',
  },
  {
    id: 'cs125',
    title: 'Document 1 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-29860',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-27',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'synced',
    lastSyncAt: '2025-12-27T15:22:00Z',
  },
  {
    id: 'cs126',
    title: 'Document 2 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-29609',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-16',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-16T17:35:00Z',
  },
  {
    id: 'cs127',
    title: 'Document 3 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-10984',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-13',
    author: 'External System',
    reliabilityScore: 86,
    syncStatus: 'syncing',
    lastSyncAt: '2025-03-13T08:39:00Z',
  },
  {
    id: 'cs128',
    title: 'Document 4 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-26066',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-18',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'syncing',
    lastSyncAt: '2026-01-18T11:13:00Z',
  },
  {
    id: 'cs129',
    title: 'Document 5 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-86828',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-14',
    author: 'External System',
    reliabilityScore: 85,
    syncStatus: 'pending',
    lastSyncAt: '2026-03-14T12:31:00Z',
  },
  {
    id: 'cs130',
    title: 'Document 6 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-75239',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-18',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-18T08:26:00Z',
  },
  {
    id: 'cs131',
    title: 'Document 7 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-96798',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-21',
    author: 'External System',
    reliabilityScore: 84,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-21T18:41:00Z',
  },
  {
    id: 'cs132',
    title: 'Document 8 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-98941',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-05-22',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'synced',
    lastSyncAt: '2025-05-22T11:31:00Z',
  },
  {
    id: 'cs133',
    title: 'Document 9 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-53433',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-10-11',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2025-10-11T13:35:00Z',
  },
  {
    id: 'cs134',
    title: 'Document 10 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-94455',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-20',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'synced',
    lastSyncAt: '2026-01-20T09:45:00Z',
  },
  {
    id: 'cs135',
    title: 'Document 11 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-14023',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-07-21',
    author: 'External System',
    reliabilityScore: 82,
    syncStatus: 'syncing',
    lastSyncAt: '2025-07-21T18:22:00Z',
  },
  {
    id: 'cs136',
    title: 'Document 12 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-67332',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-14',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-14T12:34:00Z',
  },
  {
    id: 'cs137',
    title: 'Document 13 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-10990',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-24',
    author: 'External System',
    reliabilityScore: 88,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-24T16:31:00Z',
  },
  {
    id: 'cs138',
    title: 'Document 14 from BOX',
    category: 'connector',
    connectorId: 'box',
    externalId: 'BOX-86432',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-12-11',
    author: 'External System',
    reliabilityScore: 88,
    syncStatus: 'pending',
    lastSyncAt: '2025-12-11T16:50:00Z',
  },
  {
    id: 'cs139',
    title: 'Document 1 from INTRALINKS',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'INTRALINKS-24413',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-09',
    author: 'External System',
    reliabilityScore: 94,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-09T14:44:00Z',
  },
  {
    id: 'cs140',
    title: 'Document 2 from INTRALINKS',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'INTRALINKS-67718',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-07',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'syncing',
    lastSyncAt: '2026-02-07T11:36:00Z',
  },
  {
    id: 'cs141',
    title: 'Document 3 from INTRALINKS',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'INTRALINKS-70864',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-03',
    author: 'External System',
    reliabilityScore: 89,
    syncStatus: 'pending',
    lastSyncAt: '2026-01-03T12:55:00Z',
  },
  {
    id: 'cs142',
    title: 'Document 4 from INTRALINKS',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'INTRALINKS-74895',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-08-09',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'synced',
    lastSyncAt: '2025-08-09T09:41:00Z',
  },
  {
    id: 'cs143',
    title: 'Document 5 from INTRALINKS',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'INTRALINKS-42054',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-03-12',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'synced',
    lastSyncAt: '2026-03-12T13:29:00Z',
  },
  {
    id: 'cs144',
    title: 'Document 6 from INTRALINKS',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'INTRALINKS-97498',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-09-09',
    author: 'External System',
    reliabilityScore: 92,
    syncStatus: 'pending',
    lastSyncAt: '2025-09-09T13:19:00Z',
  },
  {
    id: 'cs145',
    title: 'Document 7 from INTRALINKS',
    category: 'connector',
    connectorId: 'intralinks',
    externalId: 'INTRALINKS-99312',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-01-24',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'pending',
    lastSyncAt: '2026-01-24T10:57:00Z',
  },
  {
    id: 'cs146',
    title: 'Document 1 from DATASITE',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DATASITE-68477',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-03-23',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'synced',
    lastSyncAt: '2025-03-23T10:08:00Z',
  },
  {
    id: 'cs147',
    title: 'Document 2 from DATASITE',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DATASITE-89366',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-11-25',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'synced',
    lastSyncAt: '2025-11-25T17:39:00Z',
  },
  {
    id: 'cs148',
    title: 'Document 3 from DATASITE',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DATASITE-72800',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2025-04-11',
    author: 'External System',
    reliabilityScore: 90,
    syncStatus: 'pending',
    lastSyncAt: '2025-04-11T09:36:00Z',
  },
  {
    id: 'cs149',
    title: 'Document 4 from DATASITE',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DATASITE-21046',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-22',
    author: 'External System',
    reliabilityScore: 91,
    syncStatus: 'pending',
    lastSyncAt: '2026-02-22T17:26:00Z',
  },
  {
    id: 'cs150',
    title: 'Document 5 from DATASITE',
    category: 'connector',
    connectorId: 'datasite',
    externalId: 'DATASITE-85383',
    excerpt: 'Synced document from external system with relevant data.',
    publishedAt: '2026-02-14',
    author: 'External System',
    reliabilityScore: 93,
    syncStatus: 'synced',
    lastSyncAt: '2026-02-14T09:03:00Z',
  },
];

// ─── CONNECTED CONNECTORS (mock - IDs des connectors connectés) ──────────────

export const CONNECTED_CONNECTORS: string[] = ['google_drive', 'capitaliq'];

// ─── ANALYSIS MATRIX ─────────────────────────────────────────────────────────

import { MatrixScope } from '@/types/matrix';

// Matrix Scopes — Define research scope for matrix analysis
export const MATRIX_SCOPES: MatrixScope[] = [
  {
    id: 'scope-segment-analysis',
    nodeId: 'n1a',
    scopePrompt: 'Revolut payment processing market segmentation analysis: SMB, Mid-market, and Enterprise segments including TAM/SAM, growth rates, unit economics, competitive positioning, and product-market fit indicators',
    discoveredSourceIds: ['s1', 's2', 's3', 's5', 's6', 's7', 's8', 's10', 's12', 's13'],
    createdBy: 'u1',
    createdAt: '2026-02-15T09:30:00Z',
    updatedAt: '2026-03-01T14:30:00Z',
    discoveryStatus: 'validated',
  },
];

// Matrix Columns — Questions/prompts applied to all sources in scope
export const MATRIX_COLUMNS: MatrixColumn[] = [
  // ===== SEGMENT ANALYSIS MATRIX =====

  // Summary column (auto-generated)
  {
    id: 'col-seg-summary',
    matrixScopeId: 'scope-segment-analysis',
    label: 'Summary',
    prompt: 'Summarize key insights from this source regarding payment processing market segmentation (SMB, Mid-market, Enterprise)',
    type: 'text',
    order: 0,
    isSystemGenerated: true,
    createdBy: 'system',
    createdAt: '2026-02-15T09:30:00Z',
  },

  // TAM/SAM/SOM by Segment
  {
    id: 'col-seg-tam',
    matrixScopeId: 'scope-segment-analysis',
    label: 'TAM/SAM/SOM by Segment',
    prompt: 'Extract market sizing by business size: SMB (<50 employees), Mid-market (50-500), Enterprise (>500). Include TAM, SAM, merchant counts, and addressable opportunity.',
    type: 'text',
    order: 1,
    createdBy: 'u1',
    createdAt: '2026-02-15T09:35:00Z',
  },

  // CAGR by Segment
  {
    id: 'col-seg-cagr',
    matrixScopeId: 'scope-segment-analysis',
    label: 'CAGR 2025-2028 by Segment',
    prompt: 'Extract growth rates (CAGR) for each segment: SMB, Mid-market, Enterprise. Include growth drivers and headwinds for each.',
    type: 'text',
    order: 2,
    createdBy: 'u1',
    createdAt: '2026-02-15T09:36:00Z',
  },

  // Unit Economics
  {
    id: 'col-seg-economics',
    matrixScopeId: 'scope-segment-analysis',
    label: 'Unit Economics by Segment',
    prompt: 'Extract unit economics by segment: LTV/CAC, take rates, gross margins, payback periods, NRR, churn rates, and revenue per merchant.',
    type: 'text',
    order: 3,
    createdBy: 'u1',
    createdAt: '2026-02-15T09:37:00Z',
  },

  // Competitive Win Rates
  {
    id: 'col-seg-competitive',
    matrixScopeId: 'scope-segment-analysis',
    label: 'Competitive Win Rates',
    prompt: 'Extract Revolut competitive positioning by segment: win rates versus competitors (Stripe, Adyen, Square, PayPal), key win/loss factors, and market share data.',
    type: 'text',
    order: 4,
    createdBy: 'u1',
    createdAt: '2026-02-15T09:38:00Z',
  },

  // Product-Market Fit
  {
    id: 'col-seg-pmf',
    matrixScopeId: 'scope-segment-analysis',
    label: 'Product-Market Fit Indicators',
    prompt: 'Extract product-market fit signals by segment: NPS scores, customer satisfaction, feature satisfaction rates, top-rated features, and critical feature gaps.',
    type: 'text',
    order: 5,
    createdBy: 'u1',
    createdAt: '2026-02-15T09:39:00Z',
  },

  // Market Share & Penetration
  {
    id: 'col-seg-share',
    matrixScopeId: 'scope-segment-analysis',
    label: 'Market Share & Penetration',
    prompt: 'Extract market share and penetration data by segment: current share, growth trajectory, merchant counts, and geographic presence.',
    type: 'text',
    order: 6,
    createdBy: 'u1',
    createdAt: '2026-02-15T09:40:00Z',
  },

  // Segment Risks
  {
    id: 'col-seg-risks',
    matrixScopeId: 'scope-segment-analysis',
    label: 'Risk Factors by Segment',
    prompt: 'Identify risks and challenges by segment: regulatory, competitive threats, operational constraints, and execution risks.',
    type: 'list',
    order: 7,
    createdBy: 'u1',
    createdAt: '2026-02-15T09:41:00Z',
  },
];

// Matrix Cells — Individual cell values for the matrix grid
export const MATRIX_CELLS: MatrixCell[] = [
  // ===== BLOOMBERG (s1) - European Payment Volumes =====

  // Summary
  {
    id: 'cell-s1-summary',
    columnId: 'col-seg-summary',
    sourceId: 's1',
    matrixScopeId: 'scope-segment-analysis',
    value: 'Bloomberg Intelligence provides comprehensive European payment market segmentation showing €2.8T total market split across SMB (€850B, 8.2M merchants, 18% CAGR), Mid-market (€850B, 450K merchants, 14% CAGR), and Enterprise (€1.1T, 12K merchants, 9% CAGR). SMB demonstrates highest growth driven by digital adoption and e-commerce expansion, while Enterprise shows slowest growth due to market maturity and commoditization pressures.',
    status: 'done',
    generatedAt: '2026-02-15T10:00:00Z',
  },

  // TAM/SAM/SOM by Segment
  {
    id: 'cell-s1-tam',
    columnId: 'col-seg-tam',
    sourceId: 's1',
    matrixScopeId: 'scope-segment-analysis',
    value: '**Total European Market: €2.8T** | **SMB Segment:** TAM €850B, 8.2M merchants, €17.9B revenue opportunity (2.1% take rate) | **Mid-Market:** TAM €850B, 450K merchants, €15.3B revenue opportunity (1.8% take rate) | **Enterprise:** TAM €1.1T, 12K merchants, €9.9B revenue opportunity (0.9% take rate) | Regional breakdown: Western Europe 64%, Southern 19%, Northern 12%, Eastern 5%',
    status: 'done',
    generatedAt: '2026-02-15T10:05:00Z',
  },

  // CAGR by Segment
  {
    id: 'cell-s1-cagr',
    columnId: 'col-seg-cagr',
    sourceId: 's1',
    matrixScopeId: 'scope-segment-analysis',
    value: '**SMB: 18% CAGR (2025-2028)** - Drivers: Digital adoption (67% penetration from 54%), e-commerce growth, gig economy expansion | **Mid-Market: 14% CAGR** - Drivers: Omnichannel expansion, international growth | **Enterprise: 9% CAGR** - Headwinds: Take rate compression, commoditization, market maturity | Digital payment penetration increasing across all segments',
    status: 'done',
    generatedAt: '2026-02-15T10:10:00Z',
  },

  // ===== REVOLUT DATA ROOM (s3) - Financial Model =====

  // Summary
  {
    id: 'cell-s3-summary',
    columnId: 'col-seg-summary',
    sourceId: 's3',
    matrixScopeId: 'scope-segment-analysis',
    value: 'Revolut internal financials reveal strong multi-segment positioning with €450B total payment volume across 948K merchants. SMB (30% volume, 89.6% merchants) shows exceptional unit economics (8.2x LTV/CAC, 124% NRR) despite highest churn. Mid-market (40% volume, 10% merchants) demonstrates optimal balance with 128% NRR and best-in-class cohort performance. Enterprise (30% volume, 0.3% merchants) generates highest revenue per merchant (€506K) but requires longest payback (14.8 months). Cross-segment migration creates 311% LTV uplift for SMB→Mid transitions.',
    status: 'done',
    generatedAt: '2026-02-20T09:30:00Z',
  },

  // Unit Economics by Segment
  {
    id: 'cell-s3-economics',
    columnId: 'col-seg-economics',
    sourceId: 's3',
    matrixScopeId: 'scope-segment-analysis',
    value: '**SMB:** LTV/CAC 8.2x, Take Rate 2.1%, Gross Margin 78%, Payback 4.5mo, Churn 12%, NRR 124%, Rev/Merchant €3,340/yr | **Mid-Market:** LTV/CAC 6.1x, Take Rate 1.8%, Gross Margin 74%, Payback 7.2mo, Churn 8%, NRR 128%, Rev/Merchant €34,020/yr | **Enterprise:** LTV/CAC 3.8x, Take Rate 0.9%, Gross Margin 68%, Payback 14.8mo, Churn 5%, NRR 118%, Rev/Merchant €506,700/yr | Segment migration: SMB→Mid creates +311% LTV increase',
    status: 'done',
    generatedAt: '2026-02-20T09:45:00Z',
  },

  // ===== MCKINSEY (s5) - Market Segmentation =====

  // TAM/SAM/SOM
  {
    id: 'cell-s5-tam',
    columnId: 'col-seg-tam',
    sourceId: 's5',
    matrixScopeId: 'scope-segment-analysis',
    value: '**SMB:** Total 8.2M merchants, Addressable 5.5M (67% digital-ready), SAM €567B, Penetration opportunity HIGH (fragmented market) | **Mid-Market:** Total 450K merchants, Addressable 360K (80% digital-ready), SAM €680B, Penetration opportunity MEDIUM (consolidating) | **Enterprise:** Total 12K merchants, Addressable 9.8K (82% digital-native), SAM €902B, Penetration opportunity LOW (mature market) | Multi-segment players capture 34% market share despite being only 8% of providers',
    status: 'done',
    generatedAt: '2026-02-22T10:00:00Z',
  },

  // Unit Economics (McKinsey operating margins)
  {
    id: 'cell-s5-economics',
    columnId: 'col-seg-economics',
    sourceId: 's5',
    matrixScopeId: 'scope-segment-analysis',
    value: '**Average Gross Margins:** SMB 76% (highest, higher servicing cost), Mid-Market 72% (optimal balance), Enterprise 65% (volume play, lower take rates) | **Operating Margins at Scale:** SMB 22% (CAC amortization challenge), Mid-Market 28% (best unit economics), Enterprise 18% (customization overhead) | Strategic implication: Mid-market offers optimal margin-growth balance for profitability scaling',
    status: 'done',
    generatedAt: '2026-02-22T10:15:00Z',
  },

  // ===== GARTNER (s7) - Magic Quadrant =====

  // Competitive Win Rates
  {
    id: 'cell-s7-competitive',
    columnId: 'col-seg-competitive',
    sourceId: 's7',
    matrixScopeId: 'scope-segment-analysis',
    value: '**SMB Win Rates:** vs Square 67%, vs Stripe 45%, vs PayPal 81% (pricing + ease of use advantage) | **Mid-Market:** vs Stripe 52%, vs Adyen 38%, vs Traditional 74% (multi-currency + API strength) | **Enterprise:** vs Adyen 23%, vs FIS 28%, vs Stripe 34% (customization gaps limit penetration) | Gartner positions Revolut as Visionary with strong SMB/Mid execution but limited Enterprise traction. Primary enterprise loss factors: customization limitations, SLA concerns, legacy integration gaps.',
    status: 'done',
    generatedAt: '2026-02-24T11:00:00Z',
  },

  // Product-Market Fit
  {
    id: 'cell-s7-pmf',
    columnId: 'col-seg-pmf',
    sourceId: 's7',
    matrixScopeId: 'scope-segment-analysis',
    value: '**SMB Customer Satisfaction:** 4.2/5 overall, NPS 68 (vs benchmark 52), Top-rated: Pricing transparency, onboarding speed | **Mid-Market:** 3.9/5 overall, NPS 58 (vs benchmark 48), Top-rated: API documentation, multi-currency. Pain: Account manager inconsistency | **Enterprise:** 3.4/5 overall, NPS 42 (vs benchmark 55) [BELOW BENCHMARK], Critical gaps: Customization, SLAs, enterprise support model. Gartner assessment: Strong SMB product-market fit, good Mid-market fit, enterprise requires investment.',
    status: 'done',
    generatedAt: '2026-02-24T11:30:00Z',
  },

  // ===== REVOLUT CUSTOMER SEGMENTATION (s8) =====

  // Product-Market Fit Indicators
  {
    id: 'cell-s8-pmf',
    columnId: 'col-seg-pmf',
    sourceId: 's8',
    matrixScopeId: 'scope-segment-analysis',
    value: '**SMB (850K merchants):** NPS 68, Satisfaction 4.2/5, Feature Satisfaction 94%, Top features: Onboarding speed 96%, Pricing 94%, Multi-currency 91%. Churn by cohort: Yr1 18%, Yr2 10%, Yr3 7% | **Mid-Market (95K):** NPS 58, Satisfaction 3.9/5, Feature Satisfaction 88%, Top: API 92%, Multi-currency 91%. Account manager 64% satisfaction (concern) | **Enterprise (2.4K):** NPS 42 [BELOW BENCHMARK], Satisfaction 3.4/5, Feature Satisfaction 72%. Critical gaps: Customization 52%, SLA 48%, Support 55%, Legacy integration 42%',
    status: 'done',
    generatedAt: '2026-02-25T10:00:00Z',
  },

  // Market Share & Penetration
  {
    id: 'cell-s8-share',
    columnId: 'col-seg-share',
    sourceId: 's8',
    matrixScopeId: 'scope-segment-analysis',
    value: '**Merchant Base:** 947,400 total (SMB 850K / 89.7%, Mid 95K / 10%, Enterprise 2.4K / 0.3%) | **Annual Growth:** SMB +48% YoY (new acquisition), Mid +32% (migration + acquisition), Enterprise +18% (slower) | **Segment Migration:** SMB→Mid 2.8% annually (23,800 merchants), 94% success rate, 3.4x revenue increase | Mid→Enterprise 1.2% annually (1,140 merchants), 88% success, 8.2x revenue increase | Migration creates 41% higher LTV vs single-segment retention',
    status: 'done',
    generatedAt: '2026-02-25T10:30:00Z',
  },

  // Additional cells would follow the same pattern for other sources (s10, s12, s13, etc.)
  {
    id: 'cell-s2-tam',
    columnId: 'col-seg-tam',
    sourceId: 's2',
    matrixScopeId: 'scope-segment-analysis',
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
