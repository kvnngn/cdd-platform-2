import { Project, WorkstreamNode, Source, ResearchSynthesis, Hypothesis, HypothesisSource, Alert, ActivityLog, ConnectorConfig, MatrixColumn, MatrixCell } from '@/types';

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT QONTO - KKR ACQUISITION
// Commercial Due Diligence on European Neobank Leader
// Deal Size: €1.8B | Sector: Fintech / Banking-as-a-Service
// ═══════════════════════════════════════════════════════════════════════════

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Qonto Project',
    client: 'Qonto SAS',
    acquirer: 'KKR',
    status: 'in_progress',
    template: 'saas_b2b',
    deadline: '2026-03-28',
    createdAt: '2026-02-10',
    updatedAt: '2026-03-13',
    members: ['u1', 'u2', 'u3'],
    managerId: 'u2',
    description: 'Commercial due diligence on European neobank leader targeting SMEs and freelancers. Focus on growth sustainability, competitive moats, and regulatory risks in post-PSD2 environment.',
    sector: 'Fintech / Banking-as-a-Service',
    dealSize: '€1.8B',
  },
];

// ─── USERS ───────────────────────────────────────────────────────────────────

export const USERS = [
  {
    id: 'u1',
    name: 'Alex Morgan',
    initials: 'AM',
    role: 'manager',
    email: 'a.morgan@stratcap.com',
    color: '#3b82f6', // Blue
  },
  {
    id: 'u2',
    name: 'Sarah Clarke',
    initials: 'SC',
    role: 'consultant',
    email: 's.clarke@stratcap.com',
    color: '#8b5cf6', // Purple
  },
  {
    id: 'u3',
    name: 'Thomas White',
    initials: 'TW',
    role: 'consultant',
    email: 't.white@stratcap.com',
    color: '#10b981', // Green
  },
];

// ─── CONNECTOR CONFIGS ───────────────────────────────────────────────────────

export const CONNECTOR_CONFIGS: ConnectorConfig[] = [
  {
    id: 'conn-sharepoint',
    type: 'sharepoint',
    name: 'Qonto Data Room',
    status: 'connected',
    lastSync: '2026-03-13T08:00:00Z',
    config: {
      siteUrl: 'https://ophys.sharepoint.com/sites/QontoDataRoom',
      libraryName: 'Documents',
      folder: '/Project Qonto/Data Room',
    },
  },
  {
    id: 'conn-capitaliq',
    type: 'capitaliq',
    name: 'CapitalIQ Market Data',
    status: 'connected',
    lastSync: '2026-03-13T06:00:00Z',
    config: {
      apiKey: '***',
      regions: ['Europe'],
      sectors: ['Fintech', 'Banking'],
    },
  },
  {
    id: 'conn-intralinks',
    type: 'intralinks',
    name: 'Qonto Legal Data Room',
    status: 'connected',
    lastSync: '2026-03-12T18:00:00Z',
    config: {
      exchangeId: 'QONTO-KKR-2026',
      folder: '/Legal/Regulatory',
    },
  },
];

// ─── SOURCES ─────────────────────────────────────────────────────────────────
// 50 Sources: 15 SharePoint + 10 CapitalIQ + 12 Intralinks + 8 Premium + 5 Experts

export const SOURCES: Source[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SHAREPOINT SOURCES (Data Room - 15 sources)
  // ═══════════════════════════════════════════════════════════════════════════

  // Financial & Metrics (5)
  {
    id: 's1',
    title: 'Qonto Financial Model 2021-2026',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'xlsx',
    fileName: 'Qonto_Financial_Model_2021-2026.xlsx',
    publishedAt: '2026-01-15',
    author: 'Qonto CFO',
    excerpt: 'NRR 118% driven by tier upgrades: €9/mo (freemium) → €29/mo (M3, 50% conversion) → €49/mo (M12, 35% conversion). CAC €180 (freemium), payback 9 months. Blended CAC €240 (incl. paid channels). LTV €2,400 → LTV/CAC ratio 10x.',
    reliabilityScore: 95,
    content: `QONTO FINANCIAL MODEL - FY2021-2026

EXECUTIVE SUMMARY

Annual Recurring Revenue (ARR): €152M (2024), projected €245M (2026)
Net Revenue Retention (NRR): 118%
Customer Count: 450,000 (Dec 2024)
Average Revenue Per Account (ARPA): €28/month

TIER STRUCTURE & CONVERSION:

Freemium Tier (€9/month):
- 35% of customer base
- Conversion to paid: 50% at M3
- Primary acquisition channel (viral growth)

Standard Tier (€29/month):
- 45% of customer base
- Upgrade to Premium: 35% at M12
- Core revenue generator

Premium Tier (€49/month):
- 20% of customer base
- Includes lending access
- Highest LTV segment (€4,200 over 4 years)

UNIT ECONOMICS:

CAC by Channel:
- Freemium/Organic: €180 (45% of new customers)
- Paid Marketing: €320 (35% of new customers)
- Partner/Accountant Referral: €120 (20% of new customers)
- Blended CAC: €240

Payback Period:
- Freemium channel: 9 months
- Paid channel: 14 months
- Blended: 11 months

Customer Lifetime Value (LTV):
- Freemium→Standard: €1,800 (36 months avg retention)
- Standard→Premium: €4,200 (48 months avg retention)
- Blended LTV: €2,400
- LTV/CAC Ratio: 10x

CHURN METRICS:

Gross Churn Rate: 12% annually
- Freemium tier: 18%
- Standard tier: 10%
- Premium tier: 6%

Net Churn: -6% (negative due to expansion)

Churn Reasons (2024 analysis):
- Business closure: 45%
- Price sensitivity: 22%
- Switch to competitor: 18%
- Feature gaps: 15%

REVENUE COMPOSITION:

Subscription Revenue: 70% (€106M ARR 2024)
Interchange Fees: 25% (€38M ARR 2024)
Other (FX, lending): 5% (€8M ARR 2024)`,
  },
  {
    id: 's2',
    title: 'Monthly Cohort Analysis',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'xlsx',
    fileName: 'Qonto_Cohort_Analysis_2022-2024.xlsx',
    publishedAt: '2026-02-01',
    author: 'Qonto Growth Team',
    excerpt: 'Cohort retention analysis shows 2024 cohorts retaining at 82% after 12 months (vs 88% for 2022 cohorts). Digital-native SMEs (tech, startups) show 92% retention vs traditional SMEs (retail, manufacturing) at 74%.',
    reliabilityScore: 92,
    content: `COHORT ANALYSIS - CUSTOMER RETENTION & BEHAVIOR

RETENTION BY COHORT VINTAGE:

2022 Cohorts (12-month retention):
- Month 1: 100%
- Month 3: 94%
- Month 6: 91%
- Month 12: 88%
- Month 24: 82%

2023 Cohorts (12-month retention):
- Month 1: 100%
- Month 3: 92%
- Month 6: 88%
- Month 12: 85%

2024 Cohorts (12-month retention):
- Month 1: 100%
- Month 3: 89%
- Month 6: 85%
- Month 12: 82%

RETENTION BY CUSTOMER SEGMENT:

Digital-Native SMEs (Tech, Startups, Digital Services):
- 12-month retention: 92%
- Upgrade rate to Premium: 45%
- Primary growth driver

Traditional SMEs (Retail, Manufacturing, Hospitality):
- 12-month retention: 74%
- Upgrade rate to Premium: 22%
- Higher churn during macro uncertainty

GEOGRAPHIC RETENTION:

France: 86% (12-month)
Germany: 79% (12-month)
Spain: 81% (12-month)
Italy: 77% (12-month)

EXPANSION REVENUE BY COHORT:

Average months to first upgrade: 3.2 months
Average months to second upgrade: 11.5 months
Multi-product adoption correlation with retention: +28% retention lift`,
  },

  {
    id: 's3',
    title: 'ARR Evolution & Forecast',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'xlsx',
    fileName: 'Qonto_ARR_Forecast_2024-2028.xlsx',
    publishedAt: '2026-01-20',
    author: 'Qonto Finance',
    excerpt: 'ARR growth projection: €152M (2024) → €245M (2026) → €385M (2028). Growth drivers: geographic expansion (Germany +45% YoY), product expansion (lending ARR growing 120% YoY), and mid-market penetration (50-500 employees segment).',
    reliabilityScore: 94,
    content: `ARR EVOLUTION & GROWTH FORECAST

HISTORICAL ARR (€M):
2021: €42M
2022: €78M (+86% YoY)
2023: €115M (+47% YoY)
2024: €152M (+32% YoY)

FORECAST ARR (€M):
2025: €195M (+28% YoY)
2026: €245M (+26% YoY)
2027: €308M (+26% YoY)
2028: €385M (+25% YoY)

GROWTH DRIVERS:

Geographic Expansion:
- France: €95M (2024) → €125M (2026) - mature market, slower growth
- Germany: €32M (2024) → €68M (2026) - high growth opportunity
- Spain: €15M (2024) → €28M (2026) - early-stage expansion
- Italy: €10M (2024) → €24M (2026) - early-stage expansion

Product Expansion (New ARR):
- Lending product: €5M (2024) → €18M (2026) - 120% CAGR
- Insurance partnerships: €2M (2024) → €8M (2026)
- FX services: €3M (2024) → €7M (2026)

Customer Segment Mix:
- Freelancers (1-10 employees): 45% of ARR, 15% growth
- Small SMEs (10-50 employees): 35% of ARR, 25% growth
- Mid-market (50-500 employees): 20% of ARR, 40% growth ← KEY OPPORTUNITY

RISKS TO FORECAST:
- Macro headwinds: -12% business formation in France 2024
- Competitive pressure from incumbents (BNP, SG digital brands)
- Regulatory changes (PSD3 interchange caps)
- Customer acquisition cost inflation`,
  },

  {
    id: 's4',
    title: 'Churn Analysis by Segment',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'xlsx',
    fileName: 'Qonto_Churn_Deep_Dive_2024.xlsx',
    publishedAt: '2026-02-10',
    author: 'Qonto Customer Success',
    excerpt: 'Annual churn rate 12% overall, but segmentation reveals critical insight: digital-native SMEs churn at 8%, traditional SMEs at 18%. Churn drivers: macro uncertainty (35%), price sensitivity (25%), feature gaps (20%), competitor offers (20%).',
    reliabilityScore: 90,
    content: `CHURN ANALYSIS - 2024 DEEP DIVE

OVERALL CHURN METRICS:

Annual Gross Churn Rate: 12%
Monthly Churn Rate: 1.0%
Net Churn: -6% (negative due to expansion revenue)

CHURN BY CUSTOMER SEGMENT:

Digital-Native SMEs:
- Annual churn: 8%
- Primarily tech, startups, digital services
- Churn reasons: business failure (60%), feature gaps (25%), price (15%)

Traditional SMEs:
- Annual churn: 18%
- Retail, manufacturing, hospitality sectors
- Churn reasons: macro uncertainty (45%), return to traditional bank (25%), price (20%), other (10%)

CHURN BY TIER:

Freemium (€9/mo): 18% annual churn
Standard (€29/mo): 10% annual churn
Premium (€49/mo): 6% annual churn

CHURN TREND ANALYSIS:

2022: 10% annual churn
2023: 11% annual churn
2024: 12% annual churn ← INCREASING TREND

Q4 2024 showed acceleration to 14% annualized churn rate (seasonal + macro factors)

CHURN DRIVERS (2024):

Macro Uncertainty: 35%
- "Returning to traditional bank for safety" - growing trend
- Correlated with interest rate environment

Price Sensitivity: 25%
- Primarily affects Standard tier
- Competitive pressure from Revolut Business pricing

Feature Gaps: 20%
- Expense management (vs Pleo)
- Multi-currency needs
- Advanced reporting

Competitor Switching: 20%
- Revolut Business: 45% of competitive losses
- Pleo: 30%
- Traditional banks (BNP, SG): 15%
- Others: 10%

RETENTION INITIATIVES:

Early warning system: Identify at-risk customers 30 days before churn
Customer success outreach: Reduce churn by 15% when engaged
Product improvements: Launched expense module Q4 2024 to address Pleo competitive threat`,
  },

  {
    id: 's5',
    title: 'Unit Economics Dashboard',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Unit_Economics_Q4_2024.pdf',
    publishedAt: '2025-12-20',
    author: 'Qonto CFO',
    excerpt: 'LTV/CAC ratio 10x (best-in-class SaaS). CAC payback 11 months blended. Gross margin 78% at scale. Operating margin trajectory: -15% (2023) → -8% (2024) → breakeven projected 2026.',
    reliabilityScore: 88,
    content: `UNIT ECONOMICS DASHBOARD - Q4 2024

KEY METRICS SUMMARY:

Customer Lifetime Value (LTV): €2,400 (blended)
Customer Acquisition Cost (CAC): €240 (blended)
LTV/CAC Ratio: 10x ← Best-in-class SaaS benchmark (>3x)

CAC Payback Period: 11 months (blended)
- Freemium channel: 9 months
- Paid channel: 14 months
- Partner referral: 7 months

MARGIN ANALYSIS:

Gross Margin: 78%
- Subscription revenue: 85% gross margin
- Interchange revenue: 65% gross margin
- Lending revenue: 70% gross margin

Operating Margin Evolution:
- 2022: -28%
- 2023: -15%
- 2024: -8%
- 2025E: -3%
- 2026E: Breakeven

Path to Profitability:
- Improving unit economics (CAC efficiency +15% YoY)
- Operating leverage (revenue per employee +22% YoY)
- Product mix shift toward higher-margin subscription

COHORT ECONOMICS:

2022 Vintage Cohorts (24 months):
- Total cohort CAC: €12M
- Cumulative revenue: €48M
- Cohort payback: 9 months
- Projected LTV: €96M (8x CAC)

2024 Vintage Cohorts (initial):
- Higher CAC (€240 vs €180 in 2022) due to market saturation
- Faster upgrade velocity (3.2 months vs 4.1 months in 2022)
- Mixed outlook: better expansion, higher acquisition cost

BENCHMARKING VS COMPETITORS:

Qonto LTV/CAC: 10x
Revolut Business: Estimated 7x
Pleo: Estimated 8x
Industry Median (B2B SaaS): 4.5x

RISK FACTORS:

- CAC inflation: +15% YoY (market saturation in France)
- Churn acceleration: 12% (2024) vs 10% (2022)
- Interchange revenue at risk (PSD3 regulatory changes)
- Competition intensifying (pricing pressure)`,
  },

  // Strategic (5)
  {
    id: 's6',
    title: 'Product Roadmap 2024-2026',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Product_Roadmap_2024-2026.pdf',
    publishedAt: '2025-11-30',
    author: 'Qonto CPO',
    excerpt: 'Strategic roadmap focuses on three pillars: (1) Lending expansion to capture €50M ARR by 2026, (2) Embedded accounting integration with top providers (Pennylane, Sage), (3) Mid-market features (multi-entity, advanced permissions) to address 50-500 employee segment.',
    reliabilityScore: 85,
    content: `PRODUCT ROADMAP 2024-2026

STRATEGIC VISION:
Become the all-in-one financial OS for European SMEs through multi-product expansion and vertical integration.

THREE STRATEGIC PILLARS:

PILLAR 1: LENDING & FINANCING
Timeline: 2024-2026
Target: €50M ARR by end 2026

Current State (2024):
- Invoice financing: €5M ARR
- Credit line: Limited rollout (France only)
- Partnerships with Younited Credit, October

Roadmap:
- Q2 2024: Launch credit line in Germany
- Q4 2024: Equipment financing (asset-backed loans)
- Q1 2025: Working capital loans (algorithmic underwriting)
- Q3 2025: International expansion (Spain, Italy)
- Q4 2025: Partnership with institutional lenders
- 2026: Scale to €50M ARR

Success Metrics:
- Attach rate: 25% of Premium customers
- Default rate: <3%
- Revenue contribution: 12% of total ARR

PILLAR 2: EMBEDDED ACCOUNTING INTEGRATION
Timeline: Q1 2024 - Q4 2025
Target: 60% of customers using integrated accounting by end 2025

Current State (2024):
- Partnerships: Pennylane (France), Sage (UK/Germany)
- API integrations: Real-time sync of transactions
- 35% of customers actively using integrations

Roadmap:
- Q2 2024: Expand to Datev (Germany - #1 SME accounting)
- Q3 2024: Launch accounting marketplace (15+ integrations)
- Q4 2024: AI-powered categorization and reconciliation
- Q1 2025: Tax filing integration (automated VAT reporting)
- Q2 2025: Accountant portal (multi-client dashboard)

Success Metrics:
- Integration adoption: 60% of active customers
- Retention lift: +18% for integrated customers
- NPS improvement: +12 points

PILLAR 3: MID-MARKET EXPANSION
Timeline: 2024-2026
Target: 30% of ARR from 50-500 employee segment by 2026

Current State (2024):
- Mid-market: 20% of ARR
- Feature gaps vs. traditional banks: Multi-entity consolidation, advanced permissions, treasury management

Roadmap:
- Q2 2024: Multi-entity dashboard (group-level view)
- Q3 2024: Advanced role-based permissions (10+ user roles)
- Q4 2024: Treasury management module (cash forecasting)
- Q1 2025: Multi-currency optimization (FX hedging)
- Q2 2025: White-label cards (custom branding)
- Q3 2025: Enterprise API (custom integrations)
- Q4 2025: Dedicated relationship managers (high-touch)

Success Metrics:
- Mid-market ARR: €75M by end 2026 (30% of total)
- ARPA mid-market: €120/month (vs €28 blended)
- Retention: 95% (vs 88% overall)

ADDITIONAL INITIATIVES:

Q3 2024: Mobile app redesign (improved UX, +15% engagement target)
Q4 2024: Expense management module (compete with Pleo)
Q1 2025: Insurance marketplace (partnership model)
Q2 2025: Sustainability tracking (carbon footprint for transactions)`,
  },

  {
    id: 's7',
    title: 'Go-to-Market Strategy Germany',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_GTM_Germany_2024-2026.pdf',
    publishedAt: '2025-12-15',
    author: 'Qonto GM Germany',
    excerpt: 'Germany represents €68M ARR opportunity by 2026 (up from €32M in 2024). GTM strategy: partner with Datev (80% of SME accountants), localize product for German tax requirements, and target underserved mid-market segment neglected by N26 and Kontist.',
    reliabilityScore: 82,
    content: `GO-TO-MARKET STRATEGY - GERMANY 2024-2026

MARKET OPPORTUNITY:

Total Addressable Market (Germany): €4.2B
Serviceable Addressable Market: €2.8B (SMEs 10-500 employees)
Qonto Target Market: €1.2B (digital-first SMEs)

Current Penetration: 12% (vs 18% in France)
Target Penetration 2026: 25%

COMPETITIVE LANDSCAPE:

N26 Business: Strong in freelancers, weak in mid-market
Kontist: Niche player (freelancers only, Germany-only)
Revolut Business: Aggressive pricing, limited local features
Traditional Banks: Deutsche Bank, Commerzbank launching digital offerings

Qonto Differentiation:
- Multi-country presence (vs Kontist Germany-only)
- Mid-market focus (vs N26 freelancer focus)
- Accounting integration (Datev partnership = killer feature)
- Regulatory compliance (full banking license via Olinda)

GTM STRATEGY:

PILLAR 1: DATEV PARTNERSHIP (Strategic Moat)
- Datev: 80% market share in SME accounting software (Germany)
- Integration: Real-time bank feed into Datev
- Distribution: Datev recommends Qonto to 40,000+ accountants
- Target: 50% of new customers via Datev channel by end 2025

PILLAR 2: PRODUCT LOCALIZATION
- German tax requirements (USt-VA, EÜR automation)
- SEPA instant payments (real-time settlement)
- German customer support (Berlin team expansion)
- Compliance with German banking regulations (BaFin)

PILLAR 3: MID-MARKET FOCUS
- Target: 50-500 employee SMEs (underserved by N26, Kontist)
- Features: Multi-entity, advanced permissions, treasury tools
- Pricing: €99-€299/month enterprise tiers
- Sales: Inside sales team (5 reps by Q2 2024)

PILLAR 4: BRAND & AWARENESS
- Digital marketing: €5M budget 2024-2026
- Event sponsorships: German SME conferences
- PR: Thought leadership on SME digitalization
- Referral program: €50 credit for referrer + referee

FINANCIAL TARGETS:

2024: €32M ARR (21% of total Qonto ARR)
2025: €48M ARR (+50% YoY)
2026: €68M ARR (+42% YoY)

CAC Target (Germany): €200 (blended, vs €240 company-wide)
- Lower CAC via Datev partnership channel (€120 CAC)
- Higher CAC via paid marketing (€350 CAC)

RISKS & MITIGATIONS:

Risk: Regulatory complexity (BaFin requirements)
Mitigation: Hired ex-BaFin compliance officer, Q4 2023

Risk: Strong incumbents (Deutsche Bank digital push)
Mitigation: Focus on speed-to-market, superior UX

Risk: Cultural differences (German preference for traditional banking)
Mitigation: Emphasize security, compliance, local presence`,
  },

  {
    id: 's8',
    title: 'Customer Segmentation Study',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Customer_Segmentation_2024.pdf',
    publishedAt: '2025-10-20',
    author: 'Qonto Marketing',
    excerpt: 'Customer segmentation reveals three distinct personas: (1) Digital Natives (tech startups, 45% of base, highest retention 92%), (2) Traditional SMEs (retail/manufacturing, 35% of base, retention 74%), (3) Mid-Market (50-500 employees, 20% of base, highest ARPA €120/mo).',
    reliabilityScore: 88,
    content: `CUSTOMER SEGMENTATION STUDY - 2024

METHODOLOGY:
- Sample: 50,000 customers (representative 11% sample)
- Analysis period: Jan 2023 - Dec 2024
- Variables: Industry, size, digital maturity, product usage, retention

THREE CORE SEGMENTS:

SEGMENT 1: DIGITAL NATIVES (45% of customer base)

Profile:
- Industries: Tech, startups, digital services, agencies
- Company size: 1-50 employees
- Age of business: <5 years
- Digital maturity: High (cloud-first operations)

Behavior:
- Onboarding: 100% self-service (no support needed)
- Feature adoption: High (80% use >5 features)
- Integrations: 75% connect accounting software within first month
- Upgrade velocity: Fast (3.2 months to first upgrade)

Economics:
- ARPA: €32/month
- Retention (12-month): 92%
- CAC: €180
- LTV: €2,880
- LTV/CAC: 16x ← BEST SEGMENT

Strategic Importance: Core growth engine, viral acquisition

SEGMENT 2: TRADITIONAL SMEs (35% of customer base)

Profile:
- Industries: Retail, restaurants, manufacturing, hospitality
- Company size: 1-50 employees
- Age of business: >5 years
- Digital maturity: Medium-Low

Behavior:
- Onboarding: 45% require support
- Feature adoption: Low-Medium (35% use >5 features)
- Integrations: 30% connect accounting software
- Upgrade velocity: Slow (5.8 months to first upgrade)
- Price sensitivity: High (churn at tier upgrades)

Economics:
- ARPA: €21/month
- Retention (12-month): 74%
- CAC: €280
- LTV: €1,512
- LTV/CAC: 5.4x

Strategic Importance: Volume play, but higher churn risk during macro stress

Churn Drivers (This Segment):
- Macro uncertainty: "Return to traditional bank for safety"
- Price sensitivity: Upgrade resistance
- Digital literacy gaps: Underutilize platform

SEGMENT 3: MID-MARKET (20% of customer base)

Profile:
- Industries: All sectors
- Company size: 50-500 employees
- Age of business: >5 years
- Digital maturity: Medium-High

Behavior:
- Onboarding: Requires sales-assisted setup (demo, training)
- Feature adoption: Very high (multi-entity, advanced permissions)
- Integrations: API integrations, custom workflows
- Upgrade velocity: Immediate (start on Premium tier)

Economics:
- ARPA: €120/month (4x blended average)
- Retention (12-month): 95%
- CAC: €450
- LTV: €5,760
- LTV/CAC: 12.8x

Strategic Importance: Highest revenue per customer, stickiest segment, underserved opportunity

Feature Gaps (This Segment):
- Treasury management (cash forecasting, liquidity planning)
- Multi-entity consolidation (group-level reporting)
- Dedicated support (relationship manager)

STRATEGIC RECOMMENDATIONS:

1. Double down on Digital Natives (45% of base):
   - Best unit economics (LTV/CAC 16x)
   - Organic growth engine
   - Continue freemium strategy

2. Selective acquisition of Traditional SMEs (35%):
   - Focus on higher digital maturity sub-segment
   - Improve onboarding UX to reduce support costs
   - Accept higher churn as cost of volume

3. Aggressively expand Mid-Market (20% → 30% target):
   - Build enterprise features (roadmap prioritization)
   - Inside sales team for white-glove onboarding
   - Highest ARPA, best retention, under-penetrated`,
  },

  {
    id: 's9',
    title: 'Competitive Intelligence Report',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Competitive_Intel_Q4_2024.pdf',
    publishedAt: '2025-12-30',
    author: 'Qonto Strategy',
    excerpt: 'Competitive landscape analysis: Revolut Business aggressive pricing (€15/mo vs Qonto €29/mo), Pleo strong in expense management, N26 weak in mid-market. Emerging threat: traditional banks (BNP Hello Bank Pro, SG Shine) leveraging incumbency and cross-sell to existing SME base.',
    reliabilityScore: 80,
    content: `COMPETITIVE INTELLIGENCE REPORT - Q4 2024

COMPETITIVE LANDSCAPE OVERVIEW:

European B2B Neobank Market Structure:
- Leaders: Qonto, Revolut Business, Pleo, N26 Business
- Challengers: Shine (France), Kontist (Germany), Lunar (Nordics)
- Traditional Banks: BNP Hello Bank Pro, SG Shine, Deutsche Bank digital

Market Share (Estimated, Western Europe):
- Qonto: 18%
- Revolut Business: 22%
- Pleo: 12%
- N26 Business: 10%
- Others: 38%

COMPETITOR DEEP DIVES:

REVOLUT BUSINESS (Primary Competitor)

Strengths:
- Brand recognition (consumer business success)
- Aggressive pricing: €15/mo entry tier (vs Qonto €29/mo)
- Multi-currency strength (40+ currencies)
- Global expansion (beyond Europe)

Weaknesses:
- Product complexity (overwhelming UX for SMEs)
- Customer support issues (NPS 28 vs Qonto 62)
- Limited accounting integrations
- Regulatory challenges (license limitations in some countries)

Competitive Positioning:
- Price leader (undercutting Qonto by 50% on entry tier)
- Volume strategy (acquire customers, upsell forex)
- Less focus on SME-specific workflows

Qonto Differentiators vs Revolut:
- Superior UX/NPS (62 vs 28)
- Stronger accounting integrations (Datev, Pennylane)
- Better customer support (dedicated success managers for Premium)
- SME-focused feature set (expense management, team permissions)

PLEO (Expense Management Leader)

Strengths:
- Best-in-class expense management (mobile-first, real-time)
- Strong brand in Nordics
- High NPS (72)

Weaknesses:
- Limited banking features (not a full neobank)
- Geographic limitations (Nordics focus)
- Higher pricing for full feature set

Competitive Positioning:
- Niche player (expense management specialists)
- Premium pricing (€39/mo+ for core features)
- Growing into full banking (threat to Qonto mid-market)

Qonto Response:
- Launched expense module Q4 2024 (feature parity by Q2 2025)
- Bundle pricing advantage (banking + expense in one platform)

N26 BUSINESS (Declining Threat)

Strengths:
- Strong consumer brand (7M+ consumers)
- Germany market leader (consumer)

Weaknesses:
- Neglected B2B product (minimal investment)
- Freelancer-only focus (no mid-market features)
- Regulatory issues (growth caps imposed by BaFin)

Competitive Positioning:
- Declining relevance in B2B market
- Focus shifted to consumer profitability
- Not a strategic threat to Qonto

TRADITIONAL BANKS - DIGITAL ARMS (Emerging Threat)

BNP Hello Bank Pro (Launched Q3 2024):
- Leveraging: 2M existing SME customers for cross-sell
- CAC advantage: €50 (cross-sell) vs Qonto €240
- Features: Matching neobank feature parity
- Weakness: Slower innovation, legacy infrastructure

Société Générale Shine (Acquired 2023, Relaunched 2024):
- SG acquired Shine (French neobank) to compete
- Distribution: Branch network + digital
- Threat level: Medium-High (incumbent trust + digital UX)

Qonto Risks from Incumbents:
- Trust advantage during macro uncertainty (SMEs "return to safety")
- Lower CAC via cross-sell to existing customer base
- Deep pockets (can price aggressively to gain share)
- Regulatory advantage (no license complexity)

STRATEGIC IMPLICATIONS:

Short-term (2024-2025):
- Defend against Revolut pricing pressure (communicate value, not price)
- Match Pleo on expense management (feature parity by Q2 2025)
- Monitor incumbent digital arms (BNP, SG market traction)

Medium-term (2025-2026):
- Differentiate via mid-market features (moat against Pleo, Revolut)
- Expand geographic footprint faster than competitors (Germany, Spain, Italy)
- Build switching costs (lending, multi-product bundling)

Long-term (2026+):
- Platform play: Become financial OS for SMEs (multi-product stickiness)
- Vertical integration: Own more of the value chain (reduce interchange dependency)
- M&A: Consider acquiring niche players (accounting software, lending fintechs)`,
  },

  {
    id: 's10',
    title: 'Pricing Strategy Analysis',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Pricing_Strategy_2024.pdf',
    publishedAt: '2025-11-10',
    author: 'Qonto Pricing Team',
    excerpt: 'Pricing analysis shows €29/month standard tier optimized for willingness-to-pay (WTP) among SMEs. Price elasticity testing reveals -15% volume impact from €29→€35 increase, but +18% revenue. Recommendation: hold pricing stable through 2024-2025, focus on tier upgrade optimization vs absolute price increases.',
    reliabilityScore: 83,
    content: `PRICING STRATEGY ANALYSIS - 2024

CURRENT PRICING STRUCTURE:

Solo (€9/month):
- Freemium tier (acquisition engine)
- Features: 1 account, 1 card, basic transactions
- Purpose: Viral growth, minimize acquisition friction
- Conversion to paid: 50% at M3

Standard (€29/month):
- Core revenue tier (45% of customer base)
- Features: Multiple cards, integrations, advanced features
- Position: Value-for-money leader
- Upgrade to Premium: 35% at M12

Premium (€49/month):
- High-value tier (20% of customer base)
- Features: Lending access, priority support, advanced permissions
- Position: All-in-one financial platform
- Highest retention: 94% vs 88% blended

PRICING BENCHMARKING:

Qonto vs Competitors (Standard Tier Equivalent):
- Qonto: €29/month
- Revolut Business: €15/month ← 50% cheaper
- Pleo: €39/month ← 35% more expensive
- N26 Business: €9.90/month (limited features)

Qonto Positioning: Premium pricing vs Revolut, value pricing vs Pleo

WILLINGNESS-TO-PAY ANALYSIS (2024 Survey):

SME Customer WTP (Standard Tier Features):
- 10th percentile: €12/month
- 25th percentile: €18/month
- Median (50th): €28/month ← Current pricing optimal
- 75th percentile: €42/month
- 90th percentile: €55/month

Conclusion: €29/month is at median WTP (optimal revenue capture)

PRICE ELASTICITY TESTING (Q3 2024):

Scenario 1: Increase Standard tier €29 → €35 (+21%)
- Volume impact: -15% (churn spike, lower conversions)
- Revenue impact: +5% net (21% price - 15% volume)
- Customer feedback: Negative (competitive pressure from Revolut)

Scenario 2: Increase Standard tier €29 → €39 (+34%)
- Volume impact: -28%
- Revenue impact: -4% net (not viable)

Scenario 3: Hold pricing, optimize tier upgrades
- Focus on Solo→Standard conversion (currently 50% at M3)
- Focus on Standard→Premium conversion (currently 35% at M12)
- Potential: +12% revenue from improved conversion (no price increase)

RECOMMENDATION: TIER OPTIMIZATION OVER PRICE INCREASES

Strategy for 2024-2026:
1. Hold absolute pricing stable (competitive pressure from Revolut)
2. Optimize tier upgrade velocity (shorten time to conversion)
3. Expand Premium tier value (lending, insurance, new features)
4. Test geo-specific pricing (Germany higher WTP than France)

Tier Upgrade Optimization Initiatives:

Solo → Standard Conversion:
- Current: 50% convert at M3
- Target: 60% convert at M3
- Tactics: Feature gating, usage nudges, limited-time offers
- Revenue Impact: +€4M ARR

Standard → Premium Conversion:
- Current: 35% convert at M12
- Target: 45% convert at M12
- Tactics: Lending pre-qualification, priority support trial
- Revenue Impact: +€8M ARR

GEO-SPECIFIC PRICING TESTING:

Germany Pricing Test (Q4 2024):
- WTP analysis shows €35/month acceptable (vs €29 in France)
- Test: Increase German Standard tier to €35/month
- Result: -8% volume impact, +23% revenue (net positive)
- Rollout: Implement Germany pricing increase Q1 2025

Spain/Italy Pricing:
- Lower WTP (€22-25/month median)
- Consider country-specific discounts to drive adoption
- Trade volume for market share in early-stage markets

RISKS:

Competitive Pressure:
- Revolut aggressive pricing (€15/month) creates price anchoring
- Risk: Perception of Qonto as "expensive" vs Revolut
- Mitigation: Emphasize superior UX, support, SME-focused features

Customer Backlash:
- Price increases trigger churn among price-sensitive Traditional SMEs
- Recommendation: Grandfather existing customers, price new customers higher

Conclusion: Optimize tier upgrades (low-risk, high-impact) over absolute price increases (high-risk, moderate-impact)`,
  },

  // Operational (5)
  {
    id: 's11',
    title: 'Tech Stack Architecture',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Tech_Stack_2024.pdf',
    publishedAt: '2025-09-15',
    author: 'Qonto CTO',
    excerpt: 'Cloud-native architecture built on AWS. Microservices pattern with 45+ services. Banking core: partnership with Treezor (BaaS provider) for regulatory compliance. Tech stack: React (frontend), Node.js (backend), PostgreSQL (database), Kubernetes (orchestration). 99.97% uptime SLA achieved 2024.',
    reliabilityScore: 87,
    content: `TECH STACK ARCHITECTURE - 2024

ARCHITECTURAL OVERVIEW:

Philosophy: Cloud-native, microservices, API-first
Infrastructure: AWS (primary), multi-region for redundancy
Deployment: Kubernetes (container orchestration)
Uptime: 99.97% (2024 actual vs 99.95% SLA)

TECHNOLOGY STACK:

Frontend:
- Framework: React 18 (TypeScript)
- Mobile: React Native (iOS + Android)
- State Management: Redux Toolkit
- Design System: Custom (based on Material Design principles)

Backend:
- Runtime: Node.js 20 LTS
- Framework: NestJS (TypeScript microservices)
- API: REST + GraphQL (federation)
- Message Queue: RabbitMQ (async processing)

Data:
- Primary Database: PostgreSQL 15 (multi-tenant)
- Caching: Redis (session, rate limiting)
- Search: Elasticsearch (transaction search, analytics)
- Data Warehouse: Snowflake (business intelligence)

Infrastructure:
- Cloud Provider: AWS (eu-west-1 primary, eu-central-1 DR)
- Orchestration: Kubernetes (EKS)
- Service Mesh: Istio
- Monitoring: Datadog, PagerDuty
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)

MICROSERVICES ARCHITECTURE:

45 microservices organized by domain:

Core Banking (5 services):
- Account Service (IBAN management, balance tracking)
- Card Service (issuance, authorization, fraud detection)
- Transaction Service (payment processing, reconciliation)
- Compliance Service (AML, KYC workflows)
- Ledger Service (double-entry bookkeeping)

Product Features (12 services):
- Onboarding Service (customer acquisition, KYC)
- Pricing Service (subscription management, billing)
- Integration Service (accounting software APIs)
- Expense Service (expense management, receipts)
- Lending Service (credit underwriting, loan management)
- Analytics Service (dashboards, reporting)
- Notification Service (email, SMS, push)
- Support Service (ticketing, CRM integration)
- Others...

Platform Services (8 services):
- Authentication Service (OAuth2, SSO)
- Authorization Service (RBAC, permissions)
- Audit Service (compliance logging)
- Rate Limiting Service
- Feature Flag Service
- Configuration Service
- Others...

BANKING-AS-A-SERVICE (BaaS) PARTNERSHIP:

Provider: Treezor (Olinda - licensed e-money institution)
Model: Qonto UI/UX + Treezor banking core + regulatory license
Benefits: Faster time-to-market, regulatory compliance offloaded
Risks: Vendor lock-in, limited customization of core banking logic

Treezor Responsibilities:
- Banking license (e-money institution)
- IBAN provisioning
- SEPA payment processing
- Regulatory reporting (ACPR, ECB)
- Card issuing infrastructure (Mastercard partnership)

Qonto Responsibilities:
- Customer-facing application (web, mobile)
- User experience and product innovation
- Customer acquisition and support
- Data analytics and business intelligence
- Value-added services (lending, integrations)

SECURITY & COMPLIANCE:

Security Stack:
- Encryption: TLS 1.3 (transport), AES-256 (data at rest)
- Secrets Management: AWS Secrets Manager
- Access Control: Role-based access control (RBAC), MFA enforced
- Fraud Detection: Machine learning models (real-time scoring)
- Penetration Testing: Quarterly (external security audits)

Compliance:
- PCI-DSS Level 1 (card payment security)
- GDPR (data protection, EU)
- PSD2 (Strong Customer Authentication - SCA)
- ISO 27001 (information security management)

SCALABILITY & PERFORMANCE:

Current Scale:
- Customers: 450,000
- Transactions/day: 1.2M
- API requests/day: 45M
- Database size: 12TB

Performance Benchmarks:
- API response time (p95): <200ms
- Page load time (p95): <1.2s
- Mobile app startup: <800ms
- Transaction processing: Real-time (<500ms end-to-end)

Scaling Strategy:
- Horizontal scaling (auto-scaling groups, K8s HPA)
- Database sharding (planned for 2025 at 1M+ customers)
- CDN (CloudFront for static assets)
- Geographic distribution (DR region ready)

TECHNICAL DEBT & ROADMAP:

Current Technical Debt:
- Monolithic components: Legacy onboarding service (migrating to microservices Q2 2025)
- Database optimization: Query performance degrading at scale (indexing improvements ongoing)
- Test coverage: 78% (target 85% by end 2025)

2025-2026 Tech Roadmap:
- Real-time ledger (event-sourcing migration)
- Multi-region active-active (reduce latency, improve DR)
- AI/ML platform (fraud detection, personalization, lending underwriting)
- GraphQL federation (unified API layer)
- Platform API (enable third-party integrations - marketplace strategy)`,
  },

  {
    id: 's12',
    title: 'Team Org Chart & Hiring Plan',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Org_Chart_Hiring_Plan_2024.pdf',
    publishedAt: '2025-08-20',
    author: 'Qonto CHRO',
    excerpt: 'Headcount: 850 FTEs (Dec 2024), target 1,100 FTEs (Dec 2026). Key hires: GM Spain/Italy, VP Lending, 15 mid-market sales reps. Engineering: 320 FTEs (38% of total), heavy investment in product development. Revenue per employee: €179K (2024), target €223K (2026) via operating leverage.',
    reliabilityScore: 75,
    content: `TEAM ORG CHART & HIRING PLAN - 2024

CURRENT HEADCOUNT (Dec 2024):

Total FTEs: 850
- Engineering & Product: 320 (38%)
- Sales & Marketing: 210 (25%)
- Customer Support: 180 (21%)
- Operations & Compliance: 90 (11%)
- G&A (Finance, HR, Legal): 50 (6%)

HEADCOUNT GROWTH PLAN (2024-2026):

2024: 850 FTEs
2025: 950 FTEs (+100, 12% growth)
2026: 1,100 FTEs (+150, 16% growth)

Revenue per Employee:
- 2024: €179K (€152M ARR / 850 FTEs)
- 2025: €205K (€195M ARR / 950 FTEs) - improving leverage
- 2026: €223K (€245M ARR / 1,100 FTEs) - target efficiency

ORGANIZATIONAL STRUCTURE:

EXECUTIVE TEAM:
- CEO: Alexandre Prot (Co-founder)
- COO: Marjolaine Grondin (HR, Ops, Compliance)
- CTO: Florian Léger (Engineering, Product, Data)
- CFO: TBD (Hire planned Q1 2025 for IPO readiness)
- CMO: Vianney Brunet (Marketing, Brand, Growth)
- CPO: Nicolas Gueudelot (Product Management, Design)

ENGINEERING & PRODUCT (320 FTEs):

Engineering (240):
- Backend Engineering: 95
- Frontend Engineering: 65
- Mobile Engineering: 35
- Data Engineering: 20
- Infrastructure & DevOps: 15
- Security Engineering: 10

Product Management (40):
- Core Banking: 12
- Growth & Monetization: 10
- Expansion Products (Lending, Insurance): 8
- Integrations & Platform: 6
- Analytics & BI: 4

Design (20):
- Product Design: 12
- Brand & Marketing Design: 5
- Design Systems: 3

Data Science & Analytics (20):
- Data Scientists: 12 (fraud, credit scoring, personalization)
- Business Analysts: 8

SALES & MARKETING (210 FTEs):

Marketing (110):
- Performance Marketing: 35
- Brand & Communications: 20
- Product Marketing: 15
- Content & SEO: 12
- Events & Partnerships: 10
- Marketing Ops & Analytics: 8
- Regional Marketing (DE, ES, IT): 10

Sales (100):
- Inside Sales (Mid-Market): 40
- Sales Development (SDRs): 25
- Account Management: 20
- Partnerships (Accountants, Integrations): 10
- Sales Ops & Enablement: 5

CUSTOMER SUPPORT (180 FTEs):

Support Operations:
- Tier 1 Support: 100 (chat, email)
- Tier 2 Support: 35 (complex issues, escalations)
- Onboarding Specialists: 20
- Customer Success Managers: 15 (Premium/Enterprise)
- Support Ops & Quality: 10

Geographic Distribution:
- France: 90
- Germany: 40
- Spain: 25
- Italy: 25

OPERATIONS & COMPLIANCE (90 FTEs):

Compliance & Risk (40):
- AML/KYC: 15
- Regulatory Compliance: 10
- Risk Management: 8
- Fraud & Security Operations: 7

Finance & Accounting (25):
- Financial Planning & Analysis: 8
- Accounting & Reporting: 10
- Treasury: 4
- Procurement: 3

Legal (10):
- Contracts: 4
- Regulatory Affairs: 3
- Litigation & IP: 3

IT & Business Systems (15):
- Internal IT: 7
- Business Systems (Salesforce, HubSpot, etc.): 5
- Workplace & Facilities: 3

G&A - GENERAL & ADMINISTRATIVE (50 FTEs):

HR & People (25):
- Talent Acquisition: 10
- People Operations: 8
- Learning & Development: 4
- Compensation & Benefits: 3

Executive & Strategy (15):
- Executive Assistants: 5
- Strategy & Corp Dev: 6
- Investor Relations (new hire planned): 2
- Chief of Staff: 2

Admin & Facilities (10):
- Office Management: 6
- Admin Support: 4

KEY HIRES (2024-2026):

Executive Hires:
- CFO (Q1 2025): IPO readiness, financial controls
- GM Spain (Q2 2024): Lead Iberia expansion
- GM Italy (Q3 2024): Lead Italy expansion
- VP Lending (Q4 2024): Scale lending product to €50M ARR

Strategic Hires:
- 15 Mid-Market Sales Reps (2024-2025): Inside sales for 50-500 employee segment
- 10 Enterprise Customer Success Managers (2025-2026): White-glove support for high-value customers
- 25 Engineers (Lending Platform): Build algorithmic underwriting, loan management
- Data Scientists (Credit Risk): Improve underwriting models, reduce default rate

COMPENSATION PHILOSOPHY:

Benchmarking: 75th percentile for tech/product, median for other functions
Equity: Stock option grants for all employees (4-year vesting, 1-year cliff)
Benefits: Health insurance, remote work flexibility, professional development budget

RETENTION & ATTRITION:

Attrition Rate (2024): 14% annually
- Engineering: 18% (competitive market, poaching)
- Sales: 16% (performance-based turnover)
- Support: 10% (stable)

Retention Initiatives:
- Career progression frameworks
- Internal mobility (20% of new roles filled internally)
- Learning & development budget (€1,500/employee/year)`,
  },

  {
    id: 's13',
    title: 'Customer Support Metrics',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'xlsx',
    fileName: 'Qonto_Support_Metrics_2024.xlsx',
    publishedAt: '2025-12-01',
    author: 'Qonto VP Support',
    excerpt: 'NPS 62 (vs industry average 42 for neobanks). First response time: 2.3 hours (target <3h). Resolution time: 12 hours average. Support costs: €22/customer/year. Chat deflection via AI: 35% of inquiries self-served through chatbot.',
    reliabilityScore: 78,
    content: `CUSTOMER SUPPORT METRICS - 2024

NET PROMOTER SCORE (NPS):

Qonto NPS: 62
Industry Benchmark (Neobanks): 42
Traditional Banks: 28

NPS by Customer Segment:
- Digital Natives: 72 (high satisfaction)
- Traditional SMEs: 54 (moderate satisfaction)
- Mid-Market: 68 (high satisfaction)

NPS Drivers (Positive):
- Ease of use: +18 NPS points
- Speed of onboarding: +12 points
- Customer support quality: +10 points

NPS Detractors (Negative):
- Pricing concerns: -8 points
- Feature gaps (vs competitors): -6 points
- Occasional downtime: -4 points

SUPPORT VOLUME METRICS:

Total Tickets (2024): 1.2M
- Chat: 720K (60%)
- Email: 360K (30%)
- Phone: 120K (10%)

Tickets per Customer: 2.7 annually
- Freemium: 1.8 tickets/year
- Standard: 2.5 tickets/year
- Premium: 4.2 tickets/year (higher usage = more support needs)

RESPONSE & RESOLUTION TIMES:

First Response Time (FRT):
- Average: 2.3 hours
- Target: <3 hours (SLA)
- P95: 6 hours

Resolution Time:
- Average: 12 hours
- Target: <24 hours (SLA)
- P95: 28 hours
- Complex issues: 72 hours average

Resolution Rate (First Contact):
- Chat: 45% (one-touch resolution)
- Email: 32%
- Phone: 68% (highest resolution rate)

SUPPORT CHANNEL PERFORMANCE:

Chat (60% of volume):
- Pros: Fast, convenient, scalable
- Cons: Lower first-contact resolution (45%)
- Cost per ticket: €3.50
- AI Deflection: 35% of chat inquiries handled by chatbot (no human intervention)

Email (30% of volume):
- Pros: Async, allows detailed responses
- Cons: Slower response time (avg 4 hours FRT)
- Cost per ticket: €5.20

Phone (10% of volume):
- Pros: Highest customer satisfaction (CSAT 4.6/5), best resolution rate (68%)
- Cons: Expensive, not scalable
- Cost per ticket: €12.80

SUPPORT COSTS:

Total Support Budget (2024): €9.8M
- Personnel: €7.2M (180 FTEs)
- Technology (Zendesk, chatbot, phone): €1.8M
- Training & Quality: €0.8M

Cost per Customer per Year: €22
Cost per Ticket: €8.17 (blended across channels)

Efficiency Target (2026): €18/customer/year (via AI deflection scaling to 50%)

AI CHATBOT PERFORMANCE:

Self-Service Deflection Rate: 35% (2024)
Target Deflection Rate: 50% (2026)

Common Deflected Inquiries:
- Password reset: 95% deflection
- Transaction status: 78% deflection
- Account balance: 82% deflection
- Card activation: 68% deflection
- Simple how-to questions: 55% deflection

Chatbot Technology: Custom NLU model (trained on 2M+ historical tickets)
Human Escalation: Seamless handoff when chatbot confidence <70%

CUSTOMER SATISFACTION (CSAT):

Overall CSAT: 4.3/5
- Chat: 4.1/5
- Email: 4.2/5
- Phone: 4.6/5

CSAT by Issue Type:
- Billing questions: 4.0/5
- Technical issues: 3.8/5
- Product how-to: 4.5/5
- Complaints: 3.2/5

ESCALATIONS & COMPLAINTS:

Escalation Rate: 8% of tickets escalated to Tier 2
Complaint Rate: 2.5% of tickets formal complaints
Resolution SLA for Complaints: 72 hours

Complaint Categories:
- Unauthorized transactions (fraud): 35%
- Account access issues: 25%
- Billing disputes: 20%
- Feature requests: 12%
- Other: 8%

SUPPORT TEAM STRUCTURE:

Tier 1 Support (100 FTEs):
- Handle: 90% of tickets
- Avg Handle Time: 8 minutes (chat), 15 minutes (phone)
- Training: 2 weeks onboarding, ongoing product training

Tier 2 Support (35 FTEs):
- Handle: Complex escalations, technical issues
- Avg Handle Time: 45 minutes per ticket
- Expertise: Product specialists, technical troubleshooting

Onboarding Specialists (20 FTEs):
- Handle: New customer setup, KYC issues
- Proactive outreach to high-value customers

Customer Success Managers (15 FTEs):
- Handle: Premium/Enterprise customers (white-glove)
- Proactive: Quarterly business reviews, feature training
- Retention impact: +12% retention lift for managed customers

QUALITY ASSURANCE:

QA Monitoring: 5% of tickets randomly reviewed
QA Score Target: >90% (currently 92%)
Coaching: Weekly feedback sessions for agents <85% QA score

STRATEGIC INITIATIVES (2024-2026):

Initiative 1: Scale AI Deflection (35% → 50%)
- Investment: €1.2M in AI/ML improvements
- Impact: Save €1.8M annually in support costs

Initiative 2: Premium Support Tier
- Launch: Dedicated phone line for Premium customers
- SLA: <1 hour FRT, <6 hour resolution
- Impact: Reduce Premium churn by 15%

Initiative 3: Self-Service Knowledge Base
- Expand: 500+ help articles (currently 200)
- SEO: Drive organic traffic, reduce ticket volume
- Impact: 10% ticket deflection`,
  },

  {
    id: 's14',
    title: 'Security & Compliance Audit',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'pdf',
    fileName: 'Qonto_Security_Compliance_Audit_2024.pdf',
    publishedAt: '2025-10-30',
    author: 'External Auditor (Deloitte)',
    excerpt: 'Independent security audit (Deloitte) confirms PCI-DSS Level 1 compliance, ISO 27001 certification, GDPR adherence. Penetration testing (quarterly) identified 3 medium-severity vulnerabilities (patched within 48h). Zero data breaches 2021-2024. Fraud rate: 0.08% (below industry 0.12%).',
    reliabilityScore: 92,
    content: `SECURITY & COMPLIANCE AUDIT REPORT - 2024
Conducted by: Deloitte Cyber Risk Services
Audit Period: October 2024
Scope: Comprehensive security assessment, compliance validation

EXECUTIVE SUMMARY:

Overall Security Posture: STRONG
Compliance Status: FULLY COMPLIANT (PCI-DSS, GDPR, ISO 27001, PSD2)
Critical Findings: 0
High-Risk Findings: 0
Medium-Risk Findings: 3 (remediated within 48 hours)
Low-Risk Findings: 8 (remediation plan in place)

Recommendation: Qonto demonstrates industry-leading security practices for fintech scale-ups. No material risks identified.

COMPLIANCE CERTIFICATIONS:

PCI-DSS Level 1:
- Status: Compliant (renewed Q3 2024)
- Scope: Card payment processing, PAN data protection
- Annual Assessment: Qualified Security Assessor (QSA) audit passed
- Next Recertification: Q3 2025

ISO 27001 (Information Security Management):
- Status: Certified (initial certification 2021, renewed 2024)
- Scope: All Qonto operations (cloud infrastructure, applications, processes)
- Auditor: BSI Group
- Next Surveillance Audit: Q4 2025

GDPR (General Data Protection Regulation):
- Status: Compliant
- DPO (Data Protection Officer): Appointed (external specialist)
- Data Processing Agreements: Validated with all third-party processors
- Data Subject Requests: 1,250 requests in 2024, 100% fulfilled within 30 days
- Privacy Impact Assessments: Conducted for all new product features

PSD2 (Payment Services Directive 2):
- Status: Compliant
- Strong Customer Authentication (SCA): Implemented (2-factor authentication)
- Open Banking APIs: PSD2-compliant (third-party access)
- Regulatory Reporting: Automated (ECB, ACPR)

SOC 2 Type II (planned for 2025):
- Timeline: Audit planned Q2 2025
- Purpose: Enterprise customer requirements, SaaS compliance

SECURITY ARCHITECTURE:

Data Encryption:
- Data in Transit: TLS 1.3 (minimum)
- Data at Rest: AES-256 encryption (databases, backups, file storage)
- Key Management: AWS KMS (Hardware Security Modules - HSMs)

Access Control:
- Multi-Factor Authentication (MFA): Enforced for all employees, optional for customers (70% adoption)
- Role-Based Access Control (RBAC): Granular permissions (principle of least privilege)
- Password Policy: Minimum 12 characters, complexity requirements, rotation every 90 days

Network Security:
- Firewall: AWS WAF (Web Application Firewall)
- DDoS Protection: AWS Shield Advanced
- Network Segmentation: VPC isolation (production, staging, development)
- Intrusion Detection: IDS/IPS monitoring (24/7 SOC)

Application Security:
- Secure Development Lifecycle: OWASP Top 10 mitigations
- Code Reviews: Mandatory peer review + automated scanning (SonarQube)
- Dependency Scanning: Automated vulnerability scanning (Snyk)
- Static Analysis: SAST tools (Checkmarx)
- Dynamic Analysis: DAST tools (Burp Suite)

PENETRATION TESTING:

Frequency: Quarterly (external security firm)
Last Test: September 2024
Methodology: OWASP Testing Guide, PTES

Findings (Q3 2024):
- Critical: 0
- High: 0
- Medium: 3
  1. Session timeout configuration (web app) - Fixed in 24h
  2. Rate limiting bypass (API endpoint) - Fixed in 48h
  3. Information disclosure (error messages) - Fixed in 48h
- Low: 8 (cosmetic issues, no immediate risk)

Remediation SLA:
- Critical: <8 hours
- High: <24 hours
- Medium: <48 hours
- Low: <30 days

FRAUD DETECTION & PREVENTION:

Fraud Rate (2024): 0.08% of transaction volume
Industry Benchmark: 0.12% (Qonto outperforms)

Fraud Detection Technology:
- Machine Learning Models: Real-time transaction scoring (proprietary models)
- Behavioral Analytics: Anomaly detection (velocity checks, geo-location, device fingerprinting)
- 3D Secure: Implemented for card-not-present transactions
- Manual Review: High-risk transactions flagged for human review

Fraud Types (2024 Breakdown):
- Card fraud (lost/stolen): 45%
- Account takeover: 30%
- Synthetic identity: 15%
- Other: 10%

False Positive Rate: 2.3% (industry avg 5-8%)
- Balance: Minimize friction for legitimate customers while blocking fraud

INCIDENT RESPONSE:

Security Incidents (2024): 12 minor incidents (no material impact)
Data Breaches (2021-2024): 0 ← Zero breaches since founding

Incident Response Plan:
- 24/7 Security Operations Center (SOC)
- Incident Commander (on-call rotation)
- Communication Plan (customers, regulators, public)
- Post-Incident Reviews: Lessons learned, process improvements

Incident Categories (2024):
- Phishing attempts: 7 (employee targeted, blocked by training + email filtering)
- DDoS attempts: 3 (mitigated by AWS Shield, no downtime)
- Unauthorized access attempts: 2 (blocked by MFA + rate limiting)

DATA PRIVACY:

Data Minimization: Collect only necessary customer data
Data Retention: Automated deletion after regulatory retention period (7 years for financial records)
Anonymization: PII anonymized for analytics use cases
Third-Party Processors: 18 vendors (all GDPR-compliant DPAs signed)

Customer Data Rights:
- Right to Access: Self-service export (GDPR Article 15)
- Right to Erasure: Account deletion within 30 days (GDPR Article 17)
- Right to Rectification: Self-service data updates (GDPR Article 16)
- Right to Portability: Data export in machine-readable format (GDPR Article 20)

EMPLOYEE SECURITY TRAINING:

Mandatory Training: All employees (annual security awareness)
Phishing Simulations: Quarterly (current pass rate: 94%)
Security Champions: 12 employees trained as security advocates
Insider Threat Program: Background checks, access monitoring, anomaly detection

VULNERABILITY MANAGEMENT:

Vulnerability Scanning: Automated (daily)
Patch Management: Critical patches applied within 48 hours
Bug Bounty Program: HackerOne platform (launched Q2 2024)
  - Bounties Paid (2024): €45K
  - Valid Submissions: 32
  - Duplicate/Invalid: 68

AUDIT RECOMMENDATIONS:

Low-Priority Improvements:
1. Expand MFA adoption (70% → 90% customer adoption target)
2. Implement SOC 2 Type II (for enterprise sales)
3. Enhance logging retention (current 90 days → 365 days for forensic analysis)
4. Conduct tabletop exercises (disaster recovery, incident response)

Conclusion: Qonto demonstrates mature security and compliance posture. No material risks to business operations or customer data. Continue current practices and monitor evolving regulatory landscape (PSD3, DORA).`,
  },

  {
    id: 's15',
    title: 'Cap Table & Fundraising History',
    category: 'data_room',
    connectorId: 'conn-sharepoint',
    fileType: 'xlsx',
    fileName: 'Qonto_Cap_Table_Fundraising_History.xlsx',
    publishedAt: '2026-01-05',
    author: 'Qonto CFO',
    excerpt: 'Total funding: €486M across 4 rounds (Seed 2017, Series A 2019, Series B 2020, Series C 2022). Last valuation: €5.0B (Series C, Jan 2022). Investor syndicate: Valar, Alven, DST Global, Tencent. Founders retain 22% ownership post-Series C.',
    reliabilityScore: 96,
    content: `CAP TABLE & FUNDRAISING HISTORY

TOTAL CAPITAL RAISED: €486M (Seed through Series C)

FUNDRAISING ROUNDS:

Seed Round (June 2017):
- Amount: €1.6M
- Lead Investor: Alven Capital
- Other Investors: Kima Ventures, Xavier Niel (personal)
- Valuation: €8M post-money
- Use of Funds: Product development, initial team (15 employees)

Series A (January 2019):
- Amount: €10M
- Lead Investor: Valar Ventures (Peter Thiel's fund)
- Other Investors: Alven Capital (follow-on)
- Valuation: €60M post-money
- Use of Funds: Geographic expansion (Germany), team scaling (50 → 120 employees)

Series B (July 2020):
- Amount: €104M
- Lead Investors: Valar Ventures, DST Global
- Other Investors: Alven Capital, Tencent
- Valuation: €1.0B post-money ← Unicorn status achieved
- Use of Funds: Product expansion (lending, integrations), international growth (Spain, Italy), team scaling (250 employees)

Series C (January 2022):
- Amount: €486M (including €486M total raised notation includes this round)
- Lead Investors: Tiger Global, TCV
- Other Investors: Valar, DST, Tencent (all participated)
- Valuation: €5.0B post-money
- Use of Funds: War chest for M&A, further geographic expansion, profitability push

OWNERSHIP BREAKDOWN (Post-Series C, Jan 2022):

Founders & Management: 22%
- Alexandre Prot (CEO): 12%
- Steve Anavi (COO, left 2023): 5%
- Other early employees: 5%

Investors: 68%
- Tiger Global: 18%
- TCV: 15%
- Valar Ventures: 14%
- DST Global: 10%
- Tencent: 6%
- Alven Capital: 5%

Employee Stock Option Pool: 10%
- Allocated: 6%
- Reserved for future grants: 4%

VALUATION MULTIPLES (Series C, Jan 2022):

ARR (2021): €78M
Valuation: €5.0B
Revenue Multiple: 64x ARR ← Peak growth-stage fintech valuation (2021-2022 bubble)

Comparable Valuations (2022):
- Revolut: €33B (50x ARR)
- N26: €9B (45x ARR)
- Chime: $25B USD (42x ARR)

Note: 2022 valuations inflated by zero-interest-rate environment. Current market multiples significantly lower (7-10x ARR for growth-stage fintech in 2024-2025).

CURRENT VALUATION CONSIDERATIONS (2026):

Last Round Valuation (2022): €5.0B (64x ARR)
Current ARR (2024): €152M
Implied Multiple (if flat valuation): 33x ARR (still rich vs current market)

Realistic Valuation Range (2026):
- Bear Case: €1.2B (8x ARR on 2024 base)
- Base Case: €1.8B (12x ARR) ← KKR offer range
- Bull Case: €2.4B (16x ARR if path to profitability credible)

Down Round Risk: Likely (2022 peak valuation of €5.0B not defensible in current market)

LIQUIDATION PREFERENCES:

Series C: 1x non-participating liquidation preference
Series B: 1x non-participating
Series A: 1x non-participating
Seed: Converted to common stock (standard)

Liquidation Stack (€M):
- Series C investors: €486M (1x)
- Series B investors: €104M (1x)
- Series A investors: €10M (1x)
- Total Preference: €600M

Implication for KKR Acquisition:
- If acquisition at €1.8B: Investors recoup preferences, founders/employees share remaining €1.2B (founders get €264M on 22% ownership)
- If acquisition below €600M: Series C investors impaired (down round)

EXIT SCENARIOS:

IPO Path (2027-2028):
- Requires: Path to profitability (breakeven 2026), ARR >€300M, growth >25%
- Valuation Target: €3-5B at IPO (10-15x ARR)
- Likelihood: Medium (contingent on macro recovery, fintech IPO market reopening)

Strategic Acquisition (KKR Scenario):
- Valuation: €1.8B (12x 2024 ARR, 7x 2026E ARR)
- Strategic Rationale: Consolidate European neobank market, bolt-on acquisitions, profitability focus
- Likelihood: High (current process)

Stay Private & Scale:
- Raise Series D (2026-2027) at lower valuation (down round)
- Path to profitability without exit pressure
- Likelihood: Low (investor pressure for liquidity after 2022 peak)

INVESTOR RIGHTS:

Board Seats:
- Tiger Global: 1 seat
- Valar Ventures: 1 seat
- Founders: 2 seats
- Independent: 1 seat
- Total: 5-person board

Pro-Rata Rights: All investors have pro-rata rights (can participate in future rounds to maintain ownership %)

Drag-Along Rights: Majority investors can force sale if approved by board

Information Rights: Quarterly financials, annual audited statements

EMPLOYEE EQUITY:

Option Pool: 10% of fully diluted cap table
Typical Grants:
- Engineering (mid-level): 0.01-0.03%
- Senior Engineer: 0.03-0.08%
- Director-level: 0.08-0.15%
- VP-level: 0.15-0.30%
- C-level (new hire): 0.30-1.00%

Vesting: 4-year vesting, 1-year cliff (standard)
Exercise Window: 10 years (post-termination, employee-friendly)

409A Valuation (for option grants):
- Last 409A (Q4 2024): €3.2B (down from €5.0B Series C)
- Strike Price: €7.11/share (based on 409A common stock valuation)

Employee Exit Value (at €1.8B KKR acquisition):
- Fully diluted shares: 450M
- Employee pool: 45M shares (10%)
- Value of pool: €180M
- Avg value per early employee (0.05% ownership): €90K`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CAPITALIQ SOURCES (Financial API - 10 sources)
  // ═══════════════════════════════════════════════════════════════════════════

  // Market Data (4)
  {
    id: 's16',
    title: 'European Neobank Market Sizing 2024',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_European_Neobank_Market_2024.csv',
    publishedAt: '2026-02-01',
    author: 'CapitalIQ Research',
    excerpt: 'European SME digital banking TAM at €18.2B (2024), growing to €32.4B by 2028 (22% CAGR). France represents €4.8B TAM. Serviceable market (SMEs 10-500 employees) = €12.3B. Qonto addressable SAM = €3.2B (France + Germany + Spain + Italy). Penetration rates: France 18%, Germany 12%, Spain 9%, Italy 7%.',
    reliabilityScore: 91,
    content: `EUROPEAN NEOBANK MARKET SIZING - 2024

TOTAL ADDRESSABLE MARKET (TAM):

Europe (Western): €18.2B (2024)
Growth Forecast: €32.4B (2028)
CAGR 2024-2028: 22%

GEOGRAPHIC BREAKDOWN (2024):

France: €4.8B (26% of total)
Germany: €4.2B (23%)
UK: €3.1B (17%)
Spain: €2.4B (13%)
Italy: €2.2B (12%)
Benelux: €1.5B (8%)

SERVICEABLE ADDRESSABLE MARKET (SAM):

SMEs 10-500 employees: €12.3B (68% of TAM)
- Excludes micro-businesses (1-9 employees, cash-based)
- Excludes enterprises (500+ employees, complex needs)

QONTO ADDRESSABLE MARKET:

France + Germany + Spain + Italy: €13.6B (TAM)
Digital-first SMEs (10-500 employees): €3.2B (SAM)

PENETRATION RATES (2024):

France: 18% (mature market, early leader)
Germany: 12% (growth opportunity)
Spain: 9% (early-stage)
Italy: 7% (early-stage)
UK: 22% (most mature, Revolut dominance)

PENETRATION FORECAST (2028):

France: 42% (saturation approaching)
Germany: 32% (high growth)
Spain: 28% (catch-up growth)
Italy: 25% (catch-up growth)

MARKET DYNAMICS:

Drivers:
- SME digitalization post-COVID
- Traditional bank digital transformation lag
- Regulatory tailwinds (PSD2/3 open banking)
- Cloud accounting adoption (integration demand)
- Freemium business models (low acquisition friction)

Headwinds:
- Macro uncertainty (business formation -12% in 2024)
- Incumbent bank counter-attack (digital subsidiaries)
- Regulatory convergence (capital requirements increasing)
- Customer acquisition costs rising (market saturation)`,
  },

  {
    id: 's17',
    title: 'SME Banking TAM/SAM Analysis',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_SME_Banking_TAM_SAM_2024.csv',
    publishedAt: '2026-01-25',
    author: 'CapitalIQ',
    excerpt: 'SME banking market segmentation: Freelancers (1-10 employees) = 45% of market, high churn. Small SMEs (10-50) = 35%, core segment. Mid-market (50-500) = 20%, highest ARPA and retention. Qonto sweet spot: Small SMEs + Mid-market = 55% of addressable market.',
    reliabilityScore: 89,
    content: `SME BANKING TAM/SAM ANALYSIS

CUSTOMER SEGMENTATION:

Freelancers / Micro (1-10 employees):
- Share of market: 45%
- ARPA: €18/month
- Churn rate: 18% annually
- CAC: €150
- Characteristics: Price-sensitive, basic needs, high volume

Small SMEs (10-50 employees):
- Share of market: 35%
- ARPA: €42/month
- Churn rate: 10% annually
- CAC: €280
- Characteristics: Core target, balanced economics, scalable

Mid-Market (50-500 employees):
- Share of market: 20%
- ARPA: €140/month
- Churn rate: 6% annually
- CAC: €520
- Characteristics: High-value, sticky, underserved opportunity

QONTO POSITIONING:

Primary Target: Small SMEs (35% of market)
- Best fit for freemium-to-paid model
- Balanced CAC/LTV economics
- Growth scalability

Secondary Target: Mid-Market (20% of market)
- Highest revenue potential
- Requires enterprise features
- Sales-assisted motion

Tertiary: Freelancers (45% of market)
- Acquisition funnel top-of-funnel
- Upgrade path to Small SME tier
- Accept higher churn for volume

COMPETITIVE INTENSITY BY SEGMENT:

Freelancers:
- High competition (N26, Revolut, local players)
- Price wars (race to bottom)
- Commoditized offering

Small SMEs:
- Moderate competition
- Differentiation via integrations, support
- Qonto strong position

Mid-Market:
- Low competition (neobanks underpenetrated)
- Traditional banks dominant but slow
- Opportunity for disruption`,
  },

  {
    id: 's18',
    title: 'Fintech Comp Set - Valuation Multiples',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_Fintech_Valuation_Multiples_2024.csv',
    publishedAt: '2026-02-15',
    author: 'CapitalIQ M&A',
    excerpt: 'Median valuation multiples: 7.2x ARR for retail analytics SaaS (n=14 transactions, 2024-2025). B2B neobanks: 8-12x ARR (2024 comps), down from 40-60x in 2021-2022. Qonto implied valuation at 12x: €1.8B (on €152M ARR base). Profitability premium: +30% multiple for breakeven+ companies.',
    reliabilityScore: 93,
    content: `FINTECH VALUATION MULTIPLES - 2024

B2B NEOBANK COMPARABLES:

Recent Transactions (2024-2025):
- Median: 9.5x ARR
- 25th percentile: 7.2x ARR
- 75th percentile: 12.8x ARR

Valuation Drivers:
- Growth rate (>30% YoY = premium)
- Profitability (breakeven = +30% multiple)
- Geographic footprint (multi-country = premium)
- Product breadth (multi-product = premium)
- Customer retention (NRR >110% = premium)

QONTO VALUATION BENCHMARKING:

ARR (2024): €152M
Growth Rate: 32% YoY (premium to median)
Profitability: Not yet breakeven (discount)
NRR: 118% (premium)
Geographic Footprint: 4 countries (premium)

Implied Valuation Range:
- Bear Case: €1.2B (8x ARR, no profitability premium)
- Base Case: €1.8B (12x ARR, moderate premium)
- Bull Case: €2.4B (16x ARR, full premium if path to profitability credible)

COMPARABLE TRANSACTIONS:

Pleo (2023 round):
- ARR: €80M
- Valuation: €1.0B (12.5x ARR)
- Geography: Nordics focus
- Profitability: Burning cash

Revolut Business (embedded in Revolut valuation):
- Not separately valued
- Estimated contribution: 15% of total ARR
- Revolut total valuation: €33B (2021, likely marked down)

N26 Business:
- Minimal value contribution
- N26 total valuation: €9B (2021, marked down to ~€3B est. 2024)

MARKET EVOLUTION:

2021-2022: Peak multiples (40-60x ARR)
- Zero interest rates
- Growth-at-all-costs narrative
- FOMO investor behavior

2023-2024: Correction (8-12x ARR)
- Rising interest rates
- Profitability focus
- Rational valuation

2025-2026: Stabilization expected
- Survivors consolidate
- Strategic M&A increases
- Flight to quality`,
  },

  {
    id: 's19',
    title: 'Payment Processing Market Data',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_Payment_Processing_Market_2024.csv',
    publishedAt: '2026-01-30',
    author: 'CapitalIQ',
    excerpt: 'European payment processing market: €850B transaction volume (2024), growing 12% annually. Interchange revenue under pressure: PSD3 proposal to cap interchange at 0.15% (currently 0.2-0.3% average). Revenue impact for neobanks: -15-20% if implemented.',
    reliabilityScore: 87,
    content: `PAYMENT PROCESSING MARKET DATA - EUROPE 2024

TRANSACTION VOLUME:

Total European Payments: €850B (2024)
- Card payments: €420B (49%)
- SEPA transfers: €280B (33%)
- Instant payments: €95B (11%)
- Other: €55B (6%)

Growth Rate: 12% CAGR (2024-2028)

SME SEGMENT:

SME Payment Volume: €180B (21% of total)
- Average transaction value: €85
- Transactions per SME: 1,200/year
- Qonto share (estimated): €2.4B (1.3% of SME segment)

INTERCHANGE ECONOMICS:

Current Interchange Rates:
- Debit cards: 0.2% average
- Credit cards: 0.3% average (capped at EU regulation limits)
- Blended: 0.23% average

Revenue from Interchange (Neobanks):
- Qonto estimated: €38M (25% of total revenue)
- Industry average: 20-30% of revenue

PSD3 REGULATORY RISK:

Proposed Interchange Cap: 0.15% (vs current 0.2-0.3%)
Revenue Impact: -15-20% if cap implemented
Implementation Timeline: H2 2025 (proposed)

Mitigation Strategies:
- Shift revenue mix to subscription (vs interchange)
- Increase pricing on value-added services
- Expand lending product (non-interchange revenue)
- Negotiate processor contracts (reduce costs)

PAYMENT PROCESSING COSTS:

Qonto Cost Structure (estimated):
- Card scheme fees (Mastercard): 0.08%
- Processor fees (Treezor): 0.03%
- Fraud/chargeback costs: 0.02%
- Net margin on interchange: 0.10% (before PSD3 cap)

Post-PSD3 Margin:
- Interchange revenue: 0.15% (capped)
- Total costs: 0.13%
- Net margin: 0.02% (80% margin compression)`,
  },

  // Competitive Intelligence (6)
  {
    id: 's20',
    title: 'Revolut Business Metrics',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_Revolut_Business_Metrics_2024.csv',
    publishedAt: '2026-02-10',
    author: 'CapitalIQ',
    excerpt: 'Revolut Business: 800K customers (2024), €180M ARR estimated. Pricing: €15/mo entry tier (50% cheaper than Qonto). NPS: 28 (vs Qonto 62). Competitive threat: aggressive pricing, weak on SME-specific features. Market share: 22% (Europe B2B neobank).',
    reliabilityScore: 85,
    content: `REVOLUT BUSINESS COMPETITIVE INTELLIGENCE

SCALE METRICS (2024 EST):

Customers: 800,000
ARR: €180M (estimated, not disclosed)
ARPA: €22.50/month (lower than Qonto €28/mo)
Employee Count: ~250 (dedicated B2B team)

PRICING STRATEGY:

Entry Tier: €15/month
- vs Qonto Standard: €29/month (Revolut 48% cheaper)
- Features: Basic banking, limited cards, forex

Mid Tier: €30/month
- Multi-currency accounts
- 20 cards
- Expense management

Premium Tier: €60/month
- Unlimited cards
- Advanced analytics
- Priority support

COMPETITIVE POSITIONING:

Strengths:
- Brand recognition (15M consumer customers)
- Multi-currency strength (40+ currencies, best FX rates)
- Global expansion (beyond Europe)
- Aggressive pricing (undercut competitors)

Weaknesses:
- Poor customer support (NPS 28 vs Qonto 62)
- Product complexity (overwhelming UX)
- Limited SME-specific features (no accounting integrations)
- Regulatory challenges (license restrictions in some markets)

STRATEGIC PLAYBOOK:

1. Volume over value (low pricing, high customer count)
2. Cross-sell forex (make money on FX spread, not subscriptions)
3. Subsidize B2B with consumer profits
4. Land-and-expand (cheap entry, upsell premium features)

QONTO COMPETITIVE RESPONSE:

Do NOT compete on price:
- Revolut can afford to subsidize (consumer cash cow)
- Qonto differentiate on value, not cost

Emphasize SME-specific features:
- Accounting integrations (Datev, Pennylane, Sage)
- Expense management (match Pleo)
- Superior customer support (white-glove for Premium)

Target segments Revolut underserves:
- Mid-market (50-500 employees)
- Traditional SMEs (need hand-holding, support)
- Accounting-driven workflows

MARKET SHARE (Europe B2B Neobank):

Revolut Business: 22%
Qonto: 18%
Pleo: 12%
N26 Business: 10%
Others: 38%`,
  },

  {
    id: 's21',
    title: 'N26 Business Performance',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_N26_Business_Performance_2024.csv',
    publishedAt: '2026-02-05',
    author: 'CapitalIQ',
    excerpt: 'N26 Business: 250K customers, declining relevance in B2B market. Minimal product investment (focus shifted to consumer profitability). Freelancer-only focus, no mid-market features. Regulatory issues (BaFin growth caps). Not a strategic threat to Qonto.',
    reliabilityScore: 83,
    content: `N26 BUSINESS COMPETITIVE ASSESSMENT

PERFORMANCE METRICS (2024):

Customers: 250,000 (stagnant, no growth 2023-2024)
ARR: €30M estimated (low ARPA, freelancer focus)
ARPA: €10/month (freemium-heavy)
Market Share: 10% (declining)

STRATEGIC PRIORITIES:

Consumer Focus: 95% of company resources
- N26 shifted focus to consumer profitability (2023)
- B2B product neglected (minimal updates since 2022)
- Internal re-org de-prioritized business banking

Regulatory Constraints:
- BaFin imposed customer growth cap (2021-2023)
- Compliance issues delayed expansion
- Germany-centric (limited international footprint)

PRODUCT POSITIONING:

Target Segment: Freelancers only
- No mid-market features
- No multi-entity support
- No advanced permissions
- No integrations beyond basic

Pricing: €9.90/month (basic tier)
- Undercuts competitors
- Minimal feature set
- No premium tiers

COMPETITIVE THREAT LEVEL: LOW

Why N26 Business is NOT a threat:
1. Product neglect (no innovation 2+ years)
2. Freelancer-only positioning (Qonto targets Small SME + Mid-Market)
3. Regulatory headwinds (limited growth capacity)
4. Strategic de-prioritization (internal focus on consumer)

Qonto Advantages vs N26:
- Mid-market features (multi-entity, advanced permissions)
- Accounting integrations (Datev, Pennylane, Sage)
- Multi-country expansion (4 markets vs N26 Germany-heavy)
- Product velocity (continuous innovation)

MARKET DYNAMICS:

N26 Business market share: 10% (2024) → 6% (2026E) - declining
- Customers churning to Qonto, Revolut, Pleo
- New customer acquisition slowing
- No competitive moat

Qonto strategy: Ignore N26, focus on Revolut (pricing pressure) and Pleo (expense management)`,
  },

  {
    id: 's22',
    title: 'Pleo Market Position',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_Pleo_Market_Analysis_2024.csv',
    publishedAt: '2026-01-28',
    author: 'CapitalIQ',
    excerpt: 'Pleo: 180K customers, €90M ARR, NPS 72 (highest in category). Expense management leader, expanding into full banking. Threat to Qonto mid-market positioning. Qonto response: launched expense module Q4 2024, targeting feature parity by Q2 2025.',
    reliabilityScore: 80,
    content: `PLEO COMPETITIVE INTELLIGENCE

COMPANY OVERVIEW:

Customers: 180,000
ARR: €90M (2024)
ARPA: €50/month (premium pricing)
Geography: Nordics-focused, expanding EU
Funding: €300M raised (Series C, 2022)

PRODUCT STRENGTHS:

Expense Management (Best-in-class):
- Mobile-first UX (easiest to use)
- Real-time categorization (AI-powered)
- Receipt capture (OCR, automatic matching)
- Approval workflows (customizable)
- Accounting sync (real-time)

Customer Satisfaction:
- NPS: 72 (vs Qonto 62, Revolut 28)
- High engagement (daily active usage)
- Strong word-of-mouth (viral coefficient 0.4)

COMPETITIVE POSITIONING:

Niche Player → Full Banking Expansion:

Phase 1 (2018-2022): Expense management specialist
- Single product focus
- Premium pricing (€39/mo+)
- High NPS, loyal customers

Phase 2 (2023-2025): Expanding into banking
- Adding: IBAN accounts, SEPA transfers
- Partnering: Banking-as-a-Service providers
- Goal: Become full neobank (compete with Qonto directly)

Phase 3 (2026+): Mid-market dominance?
- Target: 50-500 employee companies
- Thesis: Expense management + banking + accounting = sticky platform
- Threat to Qonto: Direct competition for same customer segment

QONTO COMPETITIVE THREAT ASSESSMENT: MEDIUM-HIGH

Why Pleo is a threat:
1. Superior expense management (Qonto weak here historically)
2. Mid-market focus (same target as Qonto growth strategy)
3. High NPS (customer love = retention + referrals)
4. Expanding into full banking (closing feature gap)

Qonto vulnerabilities:
- Expense management feature gap (until Q4 2024 launch)
- Pleo customers unlikely to switch (high satisfaction)
- Mid-market customers choosing Pleo over Qonto

QONTO COMPETITIVE RESPONSE:

Product Parity:
- Launched expense module Q4 2024
- Target feature parity by Q2 2025
- Invest in mobile UX (match Pleo ease-of-use)

Bundle Advantage:
- Qonto = banking + expense in one (vs Pleo still partnering for banking)
- Pricing advantage: €49/mo for full suite vs Pleo €39/mo expense + banking partner

Speed to Market:
- Qonto in 4 countries (Pleo still Nordics-heavy)
- Geographic advantage in France, Germany, Spain, Italy

STRATEGIC RECOMMENDATION:

1. Accelerate expense module development (close gap fast)
2. Bundle pricing (all-in-one value prop)
3. Target Pleo customers with migration offers
4. Emphasize Qonto full-stack advantage (no partnerships needed)`,
  },

  {
    id: 's23',
    title: 'Shine (France) Benchmarking',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_Shine_France_Benchmark_2024.csv',
    publishedAt: '2026-02-12',
    author: 'CapitalIQ',
    excerpt: 'Shine (acquired by Société Générale 2023): 120K customers, France-only. Relaunched as SG digital brand with incumbent distribution advantage. CAC: €50 (cross-sell to existing SG SME base). Threat: incumbent trust + digital UX combination.',
    reliabilityScore: 78,
    content: `SHINE COMPETITIVE ANALYSIS (POST-SG ACQUISITION)

BACKGROUND:

Founded: 2018 (French neobank for freelancers)
Acquired: Société Générale (2023, €100M)
Relaunched: Q1 2024 as "SG Shine" (digital SME brand)

CURRENT METRICS (2024):

Customers: 120,000 (pre-acquisition: 100K freelancers)
Post-relaunch growth: +20K customers in 9 months
ARR: €18M (ARPA: €15/mo - low, freemium-heavy)
Geography: France only

SG STRATEGIC PLAYBOOK:

Leverage Incumbent Distribution:
- SG has 2M existing SME customers
- Cross-sell SG Shine to existing base
- CAC advantage: €50 (vs Qonto €240)

Digital + Branch Hybrid:
- Online onboarding (neobank UX)
- Branch support available (traditional bank trust)
- Best of both worlds pitch

Competitive Pricing:
- Free tier (freemium, loss leader)
- €12/mo paid tier (vs Qonto €29/mo)
- Subsidized by SG balance sheet

COMPETITIVE THREAT LEVEL: MEDIUM-HIGH

Why Shine/SG is a threat:

1. Incumbent Trust (Macro Uncertainty Advantage):
   - SMEs "return to safety" during economic stress
   - SG brand = 150 years of stability
   - Neobanks perceived as risky by traditional SMEs

2. Distribution Advantage:
   - 2M existing SME customers (warm leads)
   - Branch network (800+ branches in France)
   - CAC €50 vs Qonto €240 (5x advantage)

3. Deep Pockets:
   - Can price aggressively (subsidize losses)
   - Outspend Qonto on marketing
   - Survive long-term competitive war

Qonto Vulnerabilities:
- Traditional SMEs churning back to incumbents (18% of 2024 cohort per ex-Revolut VP)
- France market saturation (18% penetration → harder growth)
- Pricing pressure (SG Shine €12/mo vs Qonto €29/mo)

QONTO COMPETITIVE ADVANTAGES:

1. Product Velocity:
   - SG Shine slow to innovate (legacy processes)
   - Qonto ships features 10x faster

2. Multi-Country:
   - Qonto in 4 markets (SG Shine France-only)
   - Geographic diversification

3. Digital-Native SMEs:
   - Qonto resonates with tech, startups (45% of base)
   - SG Shine better for traditional SMEs

MARKET SEGMENTATION RESPONSE:

Qonto should:
- Focus on Digital-Native SMEs (92% retention, less price-sensitive)
- De-prioritize Traditional SMEs (vulnerable to incumbent poaching)
- Expand outside France (reduce SG Shine geographic overlap)
- Differentiate on innovation speed (SG can't match agility)`,
  },

  {
    id: 's24',
    title: 'Traditional Banks Digital Adoption',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_Traditional_Banks_Digital_2024.csv',
    publishedAt: '2026-01-20',
    author: 'CapitalIQ',
    excerpt: 'Traditional banks launching digital SME brands: BNP Hello Bank Pro (Q3 2024), SG Shine (Q1 2024), Deutsche Bank digital (2025). Threat: leverage 20M+ existing SME relationships for cross-sell. CAC advantage: €50-80 vs neobank €240. Defensive response required.',
    reliabilityScore: 82,
    content: `TRADITIONAL BANK DIGITAL TRANSFORMATION - COMPETITIVE THREAT

INCUMBENT DIGITAL ARMS:

BNP Paribas Hello Bank Pro:
- Launched: Q3 2024
- Customers: 2M existing SME base (target for cross-sell)
- CAC: €50 (internal cross-sell, vs Qonto €240)
- Features: Matching neobank parity (cards, mobile app, integrations)
- Distribution: Branch network + digital

Société Générale Shine:
- Acquired Shine (2023), relaunched Q1 2024
- Customers: 120K (growing via SG cross-sell)
- Pricing: €12/mo (vs Qonto €29/mo - subsidized)
- Advantage: Incumbent trust + digital UX

Deutsche Bank Digital SME:
- Launching: 2025
- Target: German mid-market (underserved by N26, Kontist)
- Strategy: Premium positioning (vs low-cost neobanks)

INCUMBENT ADVANTAGES:

1. Distribution (Existing Customer Base):
   - BNP: 2M SMEs
   - SG: 2M SMEs
   - Deutsche Bank: 1.5M SMEs
   - Total: 5.5M SMEs across top 3 (warm cross-sell leads)

2. CAC Arbitrage:
   - Incumbents: €50-80 (cross-sell to existing customers)
   - Neobanks: €240 (cold acquisition)
   - 3-5x CAC advantage

3. Trust & Brand:
   - 100+ year brands
   - Balance sheet strength (€1T+ assets)
   - Regulatory comfort (FDIC-equivalent deposit insurance)
   - "Return to safety" behavior during macro stress

4. Deep Pockets:
   - Can subsidize losses indefinitely
   - Outspend neobanks on marketing
   - Price aggressively to gain share

INCUMBENT WEAKNESSES:

1. Innovation Speed:
   - Legacy IT systems (mainframes, batch processing)
   - Organizational bureaucracy (slow decision-making)
   - Ship features 10x slower than neobanks

2. Product Quality:
   - Inferior UX (designed by bankers, not designers)
   - Missing integrations (accounting software, APIs)
   - Complex pricing (hidden fees)

3. Cultural Mismatch:
   - Traditional bank culture (risk-averse, compliance-heavy)
   - Digital-native SMEs prefer neobank ethos
   - Talent challenges (can't attract top product/eng talent)

NEOBANK DEFENSIVE STRATEGY:

1. Speed to Market:
   - Maintain 10x innovation velocity advantage
   - Continuous feature launches (vs incumbent annual releases)
   - Agile product development

2. Product Differentiation:
   - Accounting integrations (Datev, Pennylane, Sage)
   - API-first platform (developer-friendly)
   - Best-in-class mobile UX

3. Customer Segmentation:
   - Target Digital-Native SMEs (less incumbent-sensitive)
   - Mid-market expansion (incumbents slow here)
   - Geographic arbitrage (expand faster than incumbents)

4. Switching Costs:
   - Build lock-in: lending, multi-product bundles
   - Accounting integration stickiness
   - Community/network effects

MARKET SHARE PROJECTIONS:

2024: Neobanks 35%, Incumbents 65%
2026: Neobanks 28%, Incumbents 72% ← Incumbent resurgence expected
2028: Stabilization (neobanks defend digital-native segment, incumbents win traditional SMEs)`,
  },

  {
    id: 's25',
    title: 'Fintech M&A Comps 2022-2024',
    category: 'api',
    connectorId: 'conn-capitaliq',
    fileType: 'csv',
    fileName: 'CapIQ_Fintech_M&A_Comps_2022-2024.csv',
    publishedAt: '2026-02-18',
    author: 'CapitalIQ M&A',
    excerpt: 'European fintech M&A activity: 14 transactions 2022-2024, median 9.5x ARR. Strategic buyers (banks, payments) pay 20% premium vs financial buyers (PE). Down rounds common (60% of 2024 deals below last private valuation). Consolidation trend: larger players acquiring sub-scale competitors.',
    reliabilityScore: 90,
    content: `FINTECH M&A COMPARABLES - 2022-2024

M&A ACTIVITY OVERVIEW:

Total Transactions (Europe, B2B Fintech): 14
- 2022: 6 deals
- 2023: 5 deals
- 2024: 3 deals

Trend: M&A slowing (2022 peak → 2024 trough)
- High interest rates suppress valuations
- Buyers cautious, waiting for distress
- Sellers reluctant (hoping for recovery)

VALUATION MULTIPLES:

Median: 9.5x ARR
25th percentile: 7.2x ARR
75th percentile: 12.8x ARR

BUYER TYPE PREMIUM:

Strategic Buyers (Banks, Payment Processors):
- Median: 11.2x ARR (+20% vs financial buyers)
- Rationale: Synergies, distribution, customer base acquisition

Financial Buyers (PE, Growth Equity):
- Median: 9.0x ARR
- Rationale: Standalone value, cost optimization, profitability focus

DOWN ROUNDS PREVALENCE:

60% of 2024 deals priced below last private valuation
- 2021-2022 peak valuations unsustainable
- Markdowns of 40-60% common
- "Get liquid or die trying" - founders accepting down rounds for exit

NOTABLE TRANSACTIONS:

1. Shine → Société Générale (2023):
   - ARR: €15M
   - Valuation: €100M (6.7x ARR)
   - Buyer: Strategic (SG)
   - Rationale: Digital SME brand, customer acquisition
   - Down round: Yes (vs €200M 2021 valuation)

2. Solarisbank → [Undisclosed Buyer] (2024):
   - ARR: €40M
   - Valuation: €400M (10x ARR)
   - Buyer: Strategic (BaaS platform acquisition)
   - Down round: Yes (vs €1.5B 2021 valuation - 73% markdown)

3. Monese → [Rumored PE Bid] (2024, process):
   - ARR: €25M
   - Expected: €150M (6x ARR)
   - Distressed sale (running out of cash)

QONTO M&A POSITIONING:

Valuation Context:
- Last private: €5.0B (2022, 64x ARR)
- Current ARR: €152M
- KKR offer: €1.8B (12x ARR) ← premium to market median
- Down round: Yes (64% markdown from peak)

Strategic Buyer Potential:
- BNP Paribas: Distribution play
- Stripe: Embedded banking expansion
- Adyen: SME platform strategy
- PayPal: European SME entry

Financial Buyer (KKR) Rationale:
- Consolidation play (bolt-on acquisitions)
- Profitability optimization (cost synergies)
- European fintech thesis (long-term secular growth)

MARKET OUTLOOK:

2025-2026: M&A rebound expected
- Distressed assets (companies running out of runway)
- Consolidation (larger players acquiring smaller)
- Strategic buyers returning (banks, payments)

Qonto Strategic Options:
1. Accept KKR offer (€1.8B, liquidity now)
2. Hold out for strategic buyer (potential premium)
3. Stay private, raise down round (2026-2027)
4. IPO path (2027-2028, requires profitability)`,
  },


  // ═════════════════════════════════════════════════════════════════════════════
  // INTRALINKS SOURCES (Legal Data Room - 12 sources s26-s37)
  // ═════════════════════════════════════════════════════════════════════════════
  
  {
    id: 's26',
    title: 'Banking License Documentation',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_Banking_License_2021.pdf',
    publishedAt: '2021-06-15',
    author: 'ACPR',
    excerpt: 'Qonto operates under Treezor e-money institution license. Regulatory capital €350K minimum. PSD3 may increase requirements to €500K + risk-based calculation.',
    reliabilityScore: 94,
    content: 'Banking license details via Treezor EMI...',
  },
  
  {
    id: 's27',
    title: 'PSD2 Compliance Report',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_PSD2_Compliance_2024.pdf',
    publishedAt: '2024-09-01',
    author: 'Qonto Compliance',
    excerpt: 'Full PSD2 compliance: SCA implemented, open banking APIs live (12 licensed TPPs connected). API uptime 99.95%. PSD3 transition planning underway.',
    reliabilityScore: 92,
    content: 'PSD2 compliance details...',
  },
  
  {
    id: 's28',
    title: 'ACPR Regulatory Filings',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_ACPR_Filings_2024.pdf',
    publishedAt: '2024-12-31',
    author: 'ACPR',
    excerpt: 'Annual regulatory filings: 450K customers, €12.4B transaction volume. AML alerts: 1,250 (0.28%), 8 SARs filed. Regulatory exam Q2 2024: no material findings.',
    reliabilityScore: 96,
    content: 'ACPR regulatory filing details...',
  },
  
  {
    id: 's29',
    title: 'GDPR & Data Protection Audit',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_GDPR_Audit_2024.pdf',
    publishedAt: '2024-11-15',
    author: 'External DPO',
    excerpt: 'GDPR compliant. 18 DPAs signed. 1,250 DSARs (2024), 100% fulfilled within 30 days. Privacy-by-design in all features. No GDPR fines since 2018.',
    reliabilityScore: 91,
    content: 'GDPR compliance audit details...',
  },
  
  {
    id: 's30',
    title: 'AML/KYC Procedures',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_AML_KYC_2024.pdf',
    publishedAt: '2024-10-01',
    author: 'Qonto Compliance',
    excerpt: 'Risk-based CDD. IDnow verification (98% pass rate). EDD for 8% high-risk customers. Elliptic ML monitoring. SAR rate: 0.002% (8 SARs from 450K customers).',
    reliabilityScore: 89,
    content: 'AML/KYC procedures...',
  },
  
  {
    id: 's31',
    title: 'Material Customer Contracts',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_Customer_Contracts_2024.pdf',
    publishedAt: '2024-12-01',
    author: 'Qonto Legal',
    excerpt: 'Standard 36-month term, auto-renewal, 30-day cancellation. Top 10 customers: 38% ARR (down from 46% in 2023). No customer >5%. SLA: 99.5% uptime.',
    reliabilityScore: 88,
    content: 'Customer contract terms...',
  },
  
  {
    id: 's32',
    title: 'Banking Partner Agreements',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_Treezor_Agreement_2021.pdf',
    publishedAt: '2021-03-15',
    author: 'Qonto Legal',
    excerpt: 'Treezor partnership: 5-year term (2021-2026). Revenue share: 0.03% transaction volume + €2/customer/month. Total cost: €14.5M/year (9.5% of ARR). Renewal negotiations ongoing.',
    reliabilityScore: 90,
    content: 'Treezor partnership details...',
  },
  
  {
    id: 's33',
    title: 'Stripe Partnership Terms',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_Stripe_Partnership_2024.pdf',
    publishedAt: '2024-06-15',
    author: 'Qonto Partnerships',
    excerpt: 'Stripe partnership: Discounted pricing for Qonto customers (2.1% vs 2.9%). Revenue share: 0.3% of GMV. Estimated revenue: €1.2M/year. 3-year term (2024-2027).',
    reliabilityScore: 85,
    content: 'Stripe partnership details...',
  },
  
  {
    id: 's34',
    title: 'Insurance Policies',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_Insurance_2024.pdf',
    publishedAt: '2024-08-01',
    author: 'Qonto Risk',
    excerpt: 'Cyber liability €10M, PI €25M, D&O €15M. Premiums: €2.1M/year. Deductibles: €500K (cyber), €1M (PI). No material claims 2021-2024.',
    reliabilityScore: 82,
    content: 'Insurance policy details...',
  },
  
  {
    id: 's35',
    title: 'IP & Trademark Portfolio',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_IP_Trademarks_2024.pdf',
    publishedAt: '2024-07-01',
    author: 'Qonto Legal',
    excerpt: 'Qonto trademark registered in 15 jurisdictions. Proprietary software (not open-source). 0 patents. Domain: qonto.com + 25 country domains. No IP disputes.',
    reliabilityScore: 80,
    content: 'IP and trademark details...',
  },
  
  {
    id: 's36',
    title: 'Employment Contracts Key Hires',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_Employment_Executives_2024.pdf',
    publishedAt: '2024-05-01',
    author: 'Qonto CHRO',
    excerpt: 'CEO base €250K + equity. CFO hire planned Q1 2025 (€180K-220K + 0.5-1% equity). Non-compete: 12mo (execs), 6mo (senior ICs). Vesting: 4-year, 1-year cliff.',
    reliabilityScore: 75,
    content: 'Executive employment contracts...',
  },
  
  {
    id: 's37',
    title: 'Shareholder Agreement',
    category: 'data_room',
    connectorId: 'conn-intralinks',
    fileType: 'pdf',
    fileName: 'Qonto_Shareholder_Agreement_2022.pdf',
    publishedAt: '2022-01-20',
    author: 'Qonto Legal',
    excerpt: 'Series C SHA: 5-seat board (2 founders, 2 investors, 1 independent). Drag-along rights. Pro-rata rights. 1x non-participating liquidation preference. No redemption rights.',
    reliabilityScore: 93,
    content: 'Shareholder agreement details...',
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // PREMIUM REPORTS (8 sources s38-s45)
  // ═════════════════════════════════════════════════════════════════════════════
  
  {
    id: 's38',
    title: 'Gartner - SME Banking Digital Transformation 2024',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Gartner_SME_Banking_2024.pdf',
    publishedAt: '2024-03-15',
    author: 'Gartner Research',
    excerpt: 'Gartner forecasts 22% CAGR for European SME digital banking 2024-2028, driven by cloud adoption, embedded finance demand, and regulatory tailwinds (PSD2/3). Primary growth vector: mid-market SMEs (50-500 employees) digitalizing treasury operations. Risk factors include macro headwinds (reduced business creation in high-rate environment) and incumbent bank counter-offensive via digital subsidiaries.',
    reliabilityScore: 94,
    content: `GARTNER SME DIGITAL BANKING 2024

MARKET FORECAST:

European SME Digital Banking TAM:
- 2024: €18B
- 2028: €32.4B
- CAGR: 22%

Growth Drivers:
• Cloud-first SME adoption (+45% YoY 2023-2024)
• Embedded finance demand (accounting software integration)
• PSD2/3 regulatory push toward open banking
• Mid-market digitalization (50-500 employees = €12B TAM)
• Remote work driving need for digital treasury tools

Penetration Rates (2024):
- France: 18%
- Germany: 12%
- Spain: 9%
- Italy: 7%

Risk Factors:
• High interest rates → -12% business creation 2024 (France)
• PSD3 regulatory uncertainty (interchange fee caps)
• Macro recession risk → SME churn spike
• Incumbent bank digital subsidiaries (competition intensifies)

Market Dynamics:
Market at inflection point: 18% penetration in France (2024), projected 42% by 2028. TAM: €18B (Europe), SAM: €12B (SME 50-500). Fragmented landscape (HHI index 0.15) with top 5 players holding 35% share. Growth stage, not yet mature.

Competitive Threats:
• Traditional banks launching digital arms (BNP Hello Bank Pro, SG Shine)
• US neobanks expanding to EU (Mercury, Brex)
• Vertical SaaS embedding banking (Stripe Treasury)
• Big Tech potential entry (Apple Business Banking)`,
  },
  
  {
    id: 's39',
    title: 'McKinsey - European Neobank Landscape 2024',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'McKinsey_Neobank_Landscape_2024.pdf',
    publishedAt: '2024-05-20',
    author: 'McKinsey & Company',
    excerpt: 'McKinsey identifies B2B neobanks (Qonto, Pleo, Revolut Business) as "Category II" winners vs. B2C struggles. Success factors: high NRR (110-120%), CAC efficiency via freemium, sticky product (treasury = critical workflow). Key threat: traditional banks waking up + regulatory arbitrage closing (same capital requirements post-2025).',
    reliabilityScore: 92,
    content: `MCKINSEY NEOBANK LANDSCAPE 2024

B2B NEOBANK SUCCESS FACTORS:

NRR Performance: 110-120% (vs B2C 95%)
- Expansion revenue drives growth
- Multi-product bundling (cards → lending → insurance)
- NRR boost to 118% from product expansion

CAC Efficiency:
• Freemium virality (€9/month tier = acquisition engine)
• SME pain point: slow onboarding at traditional banks (3 weeks vs 10 minutes)
• Pan-European ambition (4 markets = 3x TAM vs France-only)

Product Stickiness:
- Treasury = critical workflow (daily usage)
- Switching costs from accounting integrations
- Network effects via accountant partnerships

Market Dynamics:
B2B neobanks show 3x better unit economics than B2C (NRR 118% vs 95%). Consolidation expected 2024-2026: M&A or shutdowns for sub-scale players (<100K customers). Qonto at 450K customers = scale leader in France.

Regulatory Risks:
• Regulatory arbitrage closing: neobanks face same capital requirements as banks by 2025
• Margin compression from rising cost of capital
• Customer acquisition slowing in saturated markets (France 42% penetration by 2026)

Competitive Threats:
• Incumbent counter-attack with digital brands (lower CAC via cross-sell to existing SME base)
• Consolidation among neobanks (Revolut aggressively pricing to gain share)
• Embedded banking unbundling the stack (Stripe, Adyen offering banking-as-a-service to software)`,
  },
  
  {
    id: 's40',
    title: 'CB Insights - Fintech Unicorn Report Q1 2024',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'CB_Insights_Fintech_Unicorns_Q1_2024.pdf',
    publishedAt: '2024-04-10',
    author: 'CB Insights',
    excerpt: 'Fintech unicorn valuations down 40% from 2021 peak. B2B fintech outperforming B2C (median down 25% vs 55%). Path to profitability now mandatory for new funding. Qonto positioned well: €152M ARR, breakeven projected 2026, strong unit economics (LTV/CAC 10x).',
    reliabilityScore: 90,
    content: 'CB Insights fintech unicorn analysis: valuation corrections, profitability focus, B2B outperformance...',
  },
  
  {
    id: 's41',
    title: 'PwC - Banking Regulation EU 2024',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'PwC_Banking_Regulation_EU_2024.pdf',
    publishedAt: '2024-06-01',
    author: 'PwC Financial Services',
    excerpt: 'PSD3 regulatory update: Interchange cap proposals (0.15% vs current 0.2-0.3%) would impact neobank revenue -15-20%. Capital requirements increasing to match traditional banks. Open banking expansion mandatory. Implementation H2 2025 expected.',
    reliabilityScore: 91,
    content: 'PwC regulatory analysis: PSD3 impact, capital requirements, compliance roadmap...',
  },
  
  {
    id: 's42',
    title: 'Forrester - B2B Payment Platforms Wave',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Forrester_B2B_Payment_Wave_2024.pdf',
    publishedAt: '2024-07-15',
    author: 'Forrester Research',
    excerpt: 'Forrester Wave: B2B payment platforms. Leaders: Stripe, Adyen. Strong performers: Qonto, Pleo. Key differentiators: SME-specific workflows, accounting integrations, multi-product bundling. Recommendation: prioritize mid-market expansion (highest ARPA, retention).',
    reliabilityScore: 88,
    content: 'Forrester Wave B2B payments: competitive positioning, feature comparison, market trends...',
  },
  
  {
    id: 's43',
    title: 'IDC - SME Cloud Banking Adoption',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'IDC_SME_Cloud_Banking_2024.pdf',
    publishedAt: '2024-08-20',
    author: 'IDC',
    excerpt: 'SME cloud banking adoption accelerating: 45% of European SMEs using cloud-first banking (up from 28% in 2022). Drivers: remote work, accounting integration, mobile-first UX. Barriers: security concerns (35%), feature gaps vs traditional banks (28%).',
    reliabilityScore: 87,
    content: 'IDC cloud banking adoption: growth drivers, barriers, regional differences...',
  },
  
  {
    id: 's44',
    title: 'Pitchbook - European Fintech M&A Trends',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Pitchbook_Fintech_M&A_2024.pdf',
    publishedAt: '2024-09-10',
    author: 'Pitchbook',
    excerpt: 'European fintech M&A activity: 60% of deals below last private valuation (down rounds). Median: 9.5x ARR. Strategic buyers paying 20% premium vs PE. Consolidation wave expected 2025-2026. Qonto well-positioned: scale (450K customers), profitability path, multi-product.',
    reliabilityScore: 89,
    content: 'Pitchbook M&A trends: valuation multiples, buyer types, consolidation thesis...',
  },
  
  {
    id: 's45',
    title: 'Les Echos - French Neobank Market Analysis',
    category: 'premium_report',
    fileType: 'pdf',
    fileName: 'Les_Echos_Neobank_Market_2024.pdf',
    publishedAt: '2024-10-05',
    author: 'Les Echos',
    excerpt: 'French neobank market: 18% penetration (2024), approaching saturation. Business formation down -12% (high interest rates). Traditional banks launching digital arms (BNP Hello Bank Pro, SG Shine) leveraging incumbent distribution. Recommendation: geographic expansion beyond France critical.',
    reliabilityScore: 82,
    content: 'Les Echos French market: saturation risks, incumbent threats, growth strategies...',
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // EXPERT CALLS (5 sources s46-s50)
  // ═════════════════════════════════════════════════════════════════════════════
  
  {
    id: 's46',
    title: 'Interview - Ex-Revolut VP Product',
    category: 'interview',
    fileType: 'pdf',
    fileName: 'Expert_Call_Ex_Revolut_VP_2024.pdf',
    publishedAt: '2024-03-08',
    author: 'Thomas Leclerc (Interviewer)',
    excerpt: '[Expert Call Transcript] Former Revolut VP Product discusses B2B neobank competitive dynamics. Key insight: observing 18% customer churn back to traditional banks in 2024 cohort (vs. 12% in 2022) — attributed to "return to safety" behavior during macro uncertainty. Contradicts pure growth narrative. Also notes: incumbent banks improving digital UX significantly, closing gap.',
    reliabilityScore: 88,
    content: `EXPERT CALL TRANSCRIPT - EX-REVOLUT VP PRODUCT

Interviewer: Thomas Leclerc, Ophys Consultant
Expert: Anonymous (Former Revolut VP Product, 2019-2023)
Date: March 8, 2024
Duration: 45 minutes

KEY INSIGHTS:

CHURN TO TRADITIONAL BANKS (CRITICAL):

"We saw 18% of our 2024 cohort churn back to traditional banks — up from 12% in 2022. SMEs citing 'return to safety' during macro uncertainty. This contradicts the pure digital-first adoption narrative."

Context:
- Macro stress (high interest rates, inflation, recession fears)
- Traditional SMEs (retail, manufacturing) more likely to churn
- Digital-native SMEs (tech, startups) remain loyal
- Market bifurcating by customer segment

INCUMBENT DIGITAL UX IMPROVEMENTS:

"The biggest threat isn't other neobanks — it's incumbents finally getting their act together. BNP, SG launching digital-only SME brands with lower CAC (cross-sell from existing base) and trust advantage. We underestimated this."

Product Stickiness Drivers:
• Multi-product bundling (cards → accounting integration → lending)
• Network effects from accountant partnerships (accountant recommends = high LTV customer)
• Speed to market advantage vs incumbents (ship features 10x faster)

Market Dynamics:
Market bifurcating: digital-native SMEs (startups, tech) = loyal to neobanks. Traditional SMEs (retail, manufacturing) = more likely to churn back during uncertainty. Customer segmentation critical for retention strategy.

Competitive Threats:
"The biggest threat isn't other neobanks — it's incumbents finally getting their act together. BNP, SG launching digital-only SME brands with lower CAC (cross-sell from existing base) and trust advantage. We underestimated this."`,
  },
  
  {
    id: 's47',
    title: 'Interview - Qonto Customer (CFO mid-market)',
    category: 'interview',
    fileType: 'pdf',
    fileName: 'Expert_Call_Qonto_Customer_CFO_2024.pdf',
    publishedAt: '2024-03-11',
    author: 'Sarah Dubois (Interviewer)',
    excerpt: '[Customer Interview] CFO of 120-person SaaS company (Qonto customer since 2022). Highlights: switched from BNP due to slow onboarding (3 weeks vs. 10 min) and poor digital UX. Uses Qonto for treasury, cards, accounting integration (Pennylane). Satisfied but notes: considering Pleo for better expense management features. Price-sensitive above €50/month tier.',
    reliabilityScore: 85,
    content: `CUSTOMER INTERVIEW TRANSCRIPT

Interviewer: Sarah Dubois, Ophys Consultant
Customer: CFO, 120-person SaaS company (Anonymous)
Qonto customer since: 2022
Date: March 11, 2024

SWITCH DRIVERS (FROM BNP):

"We switched from BNP due to slow onboarding (3 weeks vs 10 minutes with Qonto) and terrible mobile app. The digital experience was night and day."

Key Benefits:
• Speed to onboard (10 minutes vs 3 weeks at BNP)
• Accounting software integration (Pennylane sync = time-saving)
• Multi-card issuance for team (employee expense management)
• Mobile-first UX (CFO works remotely)

PRICE SENSITIVITY:

"We're on the €29/month tier now. Considering upgrade to €49/month for lending access, but that's our ceiling. If it goes above €50/month, we'd look at alternatives like Pleo or even go back to BNP if they've improved."

Customer Journey:
- Freemium trial (€9/mo) → upgrade to €29/mo after 3 months → considering €49/mo tier for lending access
- Expansion revenue = key growth driver
- Churn risk at tier boundaries (price sensitivity)

COMPETITIVE THREATS:

"Pleo has better expense management features. If they offered full banking, we'd seriously consider switching. For now, Qonto's all-in-one approach keeps us here."

Threats:
• Pleo offering better expense (competitive feature gap)
• Revolut Business pricing aggressively (€15/mo vs Qonto €29/mo for similar features)
• Easy switching (no lock-in) = low moat`,
  },
  
  {
    id: 's48',
    title: 'Interview - ACPR Banking Regulator',
    category: 'interview',
    fileType: 'pdf',
    fileName: 'Expert_Call_ACPR_Regulator_2024.pdf',
    publishedAt: '2024-03-11',
    author: 'Sarah Dubois (Interviewer)',
    excerpt: '[Regulatory Expert Call] ACPR (French banking regulator) representative discusses PSD3 impact on neobanks. Key point: interchange fee caps likely (15-20% revenue impact for neobanks). Capital requirements increasing to match traditional banks by 2025. However, PSD3 also mandates better data access (open banking tailwind for tech-first players).',
    reliabilityScore: 92,
    content: `REGULATORY EXPERT CALL - ACPR

Interviewer: Sarah Dubois, Ophys Consultant
Expert: ACPR Representative (Anonymous)
Date: March 11, 2024

PSD3 INTERCHANGE CAPS (CRITICAL RISK):

"PSD3 will likely cap interchange fees — neobanks generating 25-30% of revenue from interchange could see 15-20% revenue impact. Capital requirements also increasing to match traditional banks by 2025, eliminating regulatory arbitrage advantage."

Revenue Impact Estimate:
• Interchange revenue at risk: €30M-40M for Qonto (estimated)
• Mitigation: Shift to subscription revenue, expand lending product
• Timeline: H2 2025 implementation expected

OPEN BANKING TAILWIND:

"PSD3 mandates better data access APIs (open banking = neobank advantage). Digital-first compliance easier for neobanks (no legacy systems)."

Regulatory Dynamics:
Environment shifting from "innovation-friendly light touch" (2015-2023) to "level playing field" (2024+). Neobanks must prove sustainable business models without regulatory arbitrage. Winners = those with strong unit economics beyond interchange.

Competitive Implications:
• Regulatory convergence (no more advantage vs incumbents)
• Compliance costs rising (AML, KYC, capital requirements)
• Interchange cap = revenue headwind`,
  },
  
  {
    id: 's49',
    title: 'Interview - Stripe Partnership Manager',
    category: 'interview',
    fileType: 'pdf',
    fileName: 'Expert_Call_Stripe_PM_2024.pdf',
    publishedAt: '2024-03-12',
    author: 'Alex Martin (Interviewer)',
    excerpt: '[Partnership Interview] Stripe Partnership Manager discusses Qonto collaboration. Qonto customers get 28% discount on Stripe pricing. Estimated GMV: €400M/year from Qonto referrals. Strong product-market fit: SMEs need both banking + online payments. Potential expansion: Stripe Treasury (embedded banking), Stripe Capital (lending).',
    reliabilityScore: 83,
    content: 'Stripe partnership interview: discount economics, GMV projections, expansion opportunities (Treasury, Capital)...',
  },
  
  {
    id: 's50',
    title: 'Interview - N26 Insider (Competitive Intel)',
    category: 'interview',
    fileType: 'pdf',
    fileName: 'Expert_Call_N26_Insider_2024.pdf',
    publishedAt: '2024-03-13',
    author: 'Thomas Leclerc (Interviewer)',
    excerpt: '[Competitive Intelligence] N26 insider confirms B2B product neglect: 95% of resources on consumer, minimal B2B investment since 2022. BaFin growth caps limiting expansion. Freelancer-only positioning (no mid-market features). Conclusion: N26 Business not a strategic threat to Qonto.',
    reliabilityScore: 80,
    content: 'N26 insider interview: strategic deprioritization of B2B, regulatory constraints, freelancer-only focus...',
  },
];


// ─── WORKSTREAM NODES ────────────────────────────────────────────────────────

export const WORKSTREAM_NODES: WorkstreamNode[] = [
  // Root node
  {
    id: 'n0',
    projectId: 'p1',
    parentId: null,
    title: 'Investment Thesis - Qonto',
    description: 'Overall investment thesis evaluation for KKR acquisition of Qonto',
    level: 0,
    order: 0,
    status: 'in_progress',
    assigneeId: null,
    deadline: "2026-03-28",
    deadlineStatus: 'ok',
    coverageScore: 68,
    sourceCount: 50,
    hypothesisCount: 8,
    validatedCount: 4,
    updatedAt: '2026-03-13T16:45:00Z',
    updatedBy: 'u2',
  },

  // Level 1 nodes
  {
    id: 'n1',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Market & Dynamics',
    description: 'Market sizing, growth drivers, and macroeconomic factors',
    level: 1,
    order: 1,
    status: 'in_progress',
    assigneeId: 'u1',
    deadline: '2026-03-20',
    deadlineStatus: 'ok',
    coverageScore: 74,
    sourceCount: 18,
    hypothesisCount: 4,
    validatedCount: 2,
    updatedAt: '2026-03-13T16:45:00Z',
    updatedBy: 'u1',
  },

  {
    id: 'n2',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Competition & Positioning',
    description: 'Competitive landscape and Qonto differentiation',
    level: 1,
    order: 2,
    status: 'not_started',
    assigneeId: 'u3',
    deadline: '2026-03-22',
    deadlineStatus: 'ok',
    coverageScore: 45,
    sourceCount: 12,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-10T10:00:00Z',
    updatedBy: 'u2',
  },

  {
    id: 'n3',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Product & Technology',
    description: 'Product roadmap, tech stack, and platform scalability',
    level: 1,
    order: 3,
    status: 'in_progress',
    assigneeId: 'u2',
    deadline: '2026-03-24',
    deadlineStatus: 'ok',
    coverageScore: 38,
    sourceCount: 8,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-08T14:00:00Z',
    updatedBy: 'u2',
  },

  {
    id: 'n4',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Unit Economics & Metrics',
    description: 'CAC, LTV, NRR, churn analysis and cohort economics',
    level: 1,
    order: 4,
    status: 'in_progress',
    assigneeId: 'u1',
    deadline: '2026-03-21',
    deadlineStatus: 'ok',
    coverageScore: 82,
    sourceCount: 10,
    hypothesisCount: 2,
    validatedCount: 2,
    updatedAt: '2026-03-10T11:00:00Z',
    updatedBy: 'u1',
  },

  {
    id: 'n5',
    projectId: 'p1',
    parentId: 'n0',
    title: 'Regulation & Risk',
    description: 'Banking licenses, PSD2/3 compliance, and regulatory risks',
    level: 1,
    order: 5,
    status: 'not_started',
    assigneeId: 'u3',
    deadline: '2026-03-25',
    deadlineStatus: 'ok',
    coverageScore: 65,
    sourceCount: 12,
    hypothesisCount: 1,
    validatedCount: 0,
    updatedAt: '2026-03-11T15:00:00Z',
    updatedBy: 'u1',
  },

  // Level 2 nodes (n1 children)
  {
    id: 'n1a',
    projectId: 'p1',
    parentId: 'n1',
    title: 'Market Size & Growth',
    description: 'TAM/SAM analysis and penetration rates',
    level: 2,
    order: 1,
    status: 'complete',
    assigneeId: 'u1',
    deadline: '2026-03-15',
    deadlineStatus: 'ok',
    coverageScore: 88,
    sourceCount: 6,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-15T18:00:00Z',
    updatedBy: 'u1',
  },

  {
    id: 'n1b',
    projectId: 'p1',
    parentId: 'n1',
    title: 'Drivers & Macro Risks',
    description: 'Analyze key growth drivers for European SME neobanking and macroeconomic/regulatory headwinds',
    level: 2,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u1',
    deadline: '2026-03-20',
    deadlineStatus: 'ok',
    coverageScore: 72,
    sourceCount: 14,
    hypothesisCount: 4,
    validatedCount: 2,
    updatedAt: '2026-03-13T16:45:00Z',
    updatedBy: 'u1',
  },

  // Level 2 nodes (n2 children - Competition)
  {
    id: 'n2a',
    projectId: 'p1',
    parentId: 'n2',
    title: 'Competitive Landscape',
    description: 'Direct competitors (Revolut, Pleo, N26) and market positioning',
    level: 2,
    order: 1,
    status: 'not_started',
    assigneeId: 'u3',
    deadline: '2026-03-22',
    deadlineStatus: 'ok',
    coverageScore: 42,
    sourceCount: 8,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-10T10:00:00Z',
    updatedBy: 'u2',
  },

  {
    id: 'n2b',
    projectId: 'p1',
    parentId: 'n2',
    title: 'Barriers to Entry',
    description: 'Competitive moats and defensibility analysis',
    level: 2,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u2',
    deadline: '2026-03-23',
    deadlineStatus: 'ok',
    coverageScore: 35,
    sourceCount: 4,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-08T14:00:00Z',
    updatedBy: 'u2',
  },

  // Level 2 nodes (n3 children - Product)
  {
    id: 'n3a',
    projectId: 'p1',
    parentId: 'n3',
    title: 'Platform Features & Roadmap',
    description: 'Product capabilities, roadmap, and competitive feature comparison',
    level: 2,
    order: 1,
    status: 'in_progress',
    assigneeId: 'u2',
    deadline: '2026-03-24',
    deadlineStatus: 'ok',
    coverageScore: 40,
    sourceCount: 5,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-08T14:00:00Z',
    updatedBy: 'u2',
  },

  {
    id: 'n3b',
    projectId: 'p1',
    parentId: 'n3',
    title: 'Tech Stack & Security',
    description: 'Technology architecture, scalability, and security posture',
    level: 2,
    order: 2,
    status: 'in_progress',
    assigneeId: 'u2',
    deadline: '2026-03-25',
    deadlineStatus: 'ok',
    coverageScore: 48,
    sourceCount: 3,
    hypothesisCount: 0,
    validatedCount: 0,
    updatedAt: '2026-03-08T14:00:00Z',
    updatedBy: 'u2',
  },

  // Level 2 nodes (n4 children - Unit Economics)
  {
    id: 'n4a',
    projectId: 'p1',
    parentId: 'n4',
    title: 'CAC, LTV, NRR, Churn',
    description: 'Unit economics analysis and cohort performance',
    level: 2,
    order: 1,
    status: 'in_progress',
    assigneeId: 'u1',
    deadline: '2026-03-21',
    deadlineStatus: 'ok',
    coverageScore: 82,
    sourceCount: 10,
    hypothesisCount: 2,
    validatedCount: 2,
    updatedAt: '2026-03-10T12:00:00Z',
    updatedBy: 'u1',
  },

  // Level 2 nodes (n5 children - Regulation)
  {
    id: 'n5a',
    projectId: 'p1',
    parentId: 'n5',
    title: 'Banking Licenses & PSD2/3',
    description: 'Regulatory compliance and PSD3 impact analysis',
    level: 2,
    order: 1,
    status: 'not_started',
    assigneeId: 'u3',
    deadline: '2026-03-25',
    deadlineStatus: 'ok',
    coverageScore: 65,
    sourceCount: 8,
    hypothesisCount: 1,
    validatedCount: 0,
    updatedAt: '2026-03-11T15:00:00Z',
    updatedBy: 'u1',
  },
];

// ─── NODE SOURCES MAPPING ────────────────────────────────────────────────────

export const NODE_SOURCES: Record<string, string[]> = {
  n1b: ['s16', 's17', 's38', 's39', 's40', 's41', 's45', 's46', 's47', 's48', 's49', 's50', 's1', 's2'],
  n1a: ['s16', 's17', 's38', 's43'],
  n2a: ['s20', 's21', 's22', 's23', 's24', 's9'],
  n2b: ['s39', 's40', 's9'],
  n3a: ['s1', 's6', 's8', 's10'],
  n3b: ['s11', 's14'],
  n4a: ['s1', 's2', 's3', 's4', 's5'],
  n5a: ['s26', 's27', 's28', 's29', 's30', 's41', 's48'],
};

// ─── MATRIX FOR NODE N1B ─────────────────────────────────────────────────────

export const MATRIX_SCOPES = [{
  id: 'scope-n1b',
  nodeId: 'n1b',
  scopePrompt: 'Identify growth drivers and macroeconomic/regulatory risks affecting European SME neobanking market 2024-2028',
  discoveredSourceIds: ['s16', 's17', 's38', 's39', 's40', 's41', 's45', 's46', 's47', 's48'],
  createdBy: 'u1',
  createdAt: '2026-03-10T14:00:00Z',
  updatedAt: '2026-03-10T14:00:00Z',
  discoveryStatus: 'validated',
}];

export const MATRIX_COLUMNS: MatrixColumn[] = [
  // Column 0: Summary
  {
    id: 'col-n1b-summary',
    matrixScopeId: 'scope-n1b',
    label: 'Summary',
    prompt: 'Summarize key points from this document regarding SME neobanking growth drivers and macro risks',
    type: 'text',
    order: 0,
    isSystemGenerated: true,
    createdBy: 'system',
    createdAt: '2026-03-10T14:00:00Z',
  },

  // Column 1: Growth Drivers
  {
    id: 'col-n1b-drivers',
    matrixScopeId: 'scope-n1b',
    label: 'Growth Drivers',
    prompt: 'What are the main growth drivers identified for digital SME banking?',
    type: 'text',
    order: 1,
    createdBy: 'u1',
    createdAt: '2026-03-10T14:05:00Z',
  },

  // Column 2: Macro Risks
  {
    id: 'col-n1b-risks',
    matrixScopeId: 'scope-n1b',
    label: 'Macro Risks',
    prompt: 'What macroeconomic or regulatory risks are mentioned?',
    type: 'text',
    order: 2,
    createdBy: 'u1',
    createdAt: '2026-03-10T14:06:00Z',
  },

  // Column 3: Market Dynamics
  {
    id: 'col-n1b-dynamics',
    matrixScopeId: 'scope-n1b',
    label: 'Market Dynamics',
    prompt: 'What is the dynamics of the addressed market (growth, maturity, concentration)?',
    type: 'text',
    order: 3,
    createdBy: 'u1',
    createdAt: '2026-03-10T14:07:00Z',
  },

  // Column 4: Competitive Threats
  {
    id: 'col-n1b-threats',
    matrixScopeId: 'scope-n1b',
    label: 'Competitive Threats',
    prompt: 'What competitive threats are mentioned (incumbents, new entrants)?',
    type: 'text',
    order: 4,
    createdBy: 'u1',
    createdAt: '2026-03-10T14:08:00Z',
  },
];

// Matrix cells simplified for size - showing key cells only
export const MATRIX_CELLS: MatrixCell[] = [
  // s38 (Gartner) - Favorited by Sarah
  {
    id: 'cell-s38-summary',
    columnId: 'col-n1b-summary',
    sourceId: 's38',
    matrixScopeId: 'scope-n1b',
    value: 'Gartner forecasts 22% CAGR for European SME digital banking 2024-2028, driven by cloud adoption, embedded finance demand, and regulatory tailwinds (PSD2/3). Primary growth vector: mid-market SMEs (50-500 employees) digitalizing treasury operations. Risk factors include macro headwinds (reduced business creation in high-rate environment) and incumbent bank counter-offensive via digital subsidiaries.',
    status: 'done',
    generatedAt: '2026-03-10T14:30:00Z',
    isFavorite: true,
  },

  {
    id: 'cell-s38-drivers',
    columnId: 'col-n1b-drivers',
    sourceId: 's38',
    matrixScopeId: 'scope-n1b',
    value: '• Cloud-first SME adoption (+45% YoY 2023-2024)\\n• Embedded finance demand (accounting software integration)\\n• PSD2/3 regulatory push toward open banking\\n• Mid-market digitalization (50-500 employees = €12B TAM)\\n• Remote work driving need for digital treasury tools',
    status: 'done',
    generatedAt: '2026-03-10T14:31:00Z',
    isFavorite: true,
  },

  {
    id: 'cell-s38-risks',
    columnId: 'col-n1b-risks',
    sourceId: 's38',
    matrixScopeId: 'scope-n1b',
    value: '• High interest rates → -12% business creation 2024 (France)\\n• PSD3 regulatory uncertainty (interchange fee caps)\\n• Macro recession risk → SME churn spike\\n• Incumbent bank digital subsidiaries (competition intensifies)',
    status: 'done',
    generatedAt: '2026-03-10T14:32:00Z',
  },

  // s39 (McKinsey) - Favorited
  {
    id: 'cell-s39-summary',
    columnId: 'col-n1b-summary',
    sourceId: 's39',
    matrixScopeId: 'scope-n1b',
    value: 'McKinsey identifies B2B neobanks (Qonto, Pleo, Revolut Business) as "Category II" winners vs. B2C struggles. Success factors: high NRR (110-120%), CAC efficiency via freemium, sticky product (treasury = critical workflow). Key threat: traditional banks waking up + regulatory arbitrage closing (same capital requirements post-2025).',
    status: 'done',
    generatedAt: '2026-03-10T15:00:00Z',
    isFavorite: false,
  },

  {
    id: 'cell-s39-drivers',
    columnId: 'col-n1b-drivers',
    sourceId: 's39',
    matrixScopeId: 'scope-n1b',
    value: '• Freemium virality (€9/month tier = acquisition engine)\\n• SME pain point: slow onboarding at traditional banks (3 weeks vs. 10 minutes)\\n• Multi-product expansion (cards → lending → insurance): NRR boost to 118%\\n• Pan-European ambition (4 markets = 3x TAM vs. France-only)',
    status: 'done',
    generatedAt: '2026-03-10T15:01:00Z',
    isFavorite: true,
  },

  // s46 (Ex-Revolut VP) - CRITICAL: Contains churn insight that contradicts H2
  {
    id: 'cell-s46-summary',
    columnId: 'col-n1b-summary',
    sourceId: 's46',
    matrixScopeId: 'scope-n1b',
    value: '[Expert Call Transcript] Former Revolut VP Product discusses B2B neobank competitive dynamics. Key insight: observing 18% customer churn back to traditional banks in 2024 cohort (vs. 12% in 2022) — attributed to "return to safety" behavior during macro uncertainty. Contradicts pure growth narrative. Also notes: incumbent banks improving digital UX significantly, closing gap.',
    status: 'done',
    generatedAt: '2026-03-12T10:15:00Z',
    isFavorite: false,
  },

  {
    id: 'cell-s46-risks',
    columnId: 'col-n1b-risks',
    sourceId: 's46',
    matrixScopeId: 'scope-n1b',
    value: '⚠️ CRITICAL: "We saw 18% of our 2024 cohort churn back to traditional banks — up from 12% in 2022. SMEs citing \'return to safety\' during macro uncertainty. This contradicts the pure digital-first adoption narrative."\\n\\n• Macro-driven risk aversion among SMEs\\n• Traditional banks catching up on UX (gap closing)\\n• Regulatory uncertainty causing hesitation',
    status: 'done',
    generatedAt: '2026-03-12T10:17:00Z',
    isFavorite: false,
  },

  // s48 (ACPR Regulator) - Favorited
  {
    id: 'cell-s48-summary',
    columnId: 'col-n1b-summary',
    sourceId: 's48',
    matrixScopeId: 'scope-n1b',
    value: '[Regulatory Expert Call] ACPR (French banking regulator) representative discusses PSD3 impact on neobanks. Key point: interchange fee caps likely (15-20% revenue impact for neobanks). Capital requirements increasing to match traditional banks by 2025. However, PSD3 also mandates better data access (open banking tailwind for tech-first players).',
    status: 'done',
    generatedAt: '2026-03-11T18:00:00Z',
    isFavorite: true,
  },

  {
    id: 'cell-s48-risks',
    columnId: 'col-n1b-risks',
    sourceId: 's48',
    matrixScopeId: 'scope-n1b',
    value: '⚠️ REGULATORY RISK: "PSD3 will likely cap interchange fees — neobanks generating 25-30% of revenue from interchange could see 15-20% revenue impact. Capital requirements also increasing to match traditional banks by 2025, eliminating regulatory arbitrage advantage."\\n\\n• Interchange revenue at risk (€30M-40M for Qonto estimate)\\n• Higher capital requirements = margin pressure',
    status: 'done',
    generatedAt: '2026-03-11T18:02:00Z',
    isFavorite: true,
  },

  // s16 (CapitalIQ Market Data)
  {
    id: 'cell-s16-summary',
    columnId: 'col-n1b-summary',
    sourceId: 's16',
    matrixScopeId: 'scope-n1b',
    value: 'CapitalIQ estimates European SME digital banking TAM at €18.2B (2024), growing to €32.4B by 2028 (22% CAGR). France represents €4.8B TAM. Serviceable market (SMEs 10-500 employees) = €12.3B. Qonto addressable SAM = €3.2B (France + Germany + Spain + Italy). Penetration rates: France 18%, Germany 12%, Spain 9%, Italy 7%.',
    status: 'done',
    generatedAt: '2026-03-10T16:00:00Z',
  },

  {
    id: 'cell-s16-drivers',
    columnId: 'col-n1b-drivers',
    sourceId: 's16',
    matrixScopeId: 'scope-n1b',
    value: '• TAM expansion: €18.2B (2024) → €32.4B (2028) = 22% CAGR\\n• Low penetration runway: France 18%, Germany 12%, Southern Europe <10%\\n• SME segment growth: +12% new business formation 2023 (post-COVID normalization)',
    status: 'done',
    generatedAt: '2026-03-10T16:01:00Z',
  },

  // s47 (Qonto Customer CFO)
  {
    id: 'cell-s47-drivers',
    columnId: 'col-n1b-drivers',
    sourceId: 's47',
    matrixScopeId: 'scope-n1b',
    value: '• Speed to onboard (10 minutes vs 3 weeks at BNP)\\n• Accounting software integration (Pennylane sync = time-saving)\\n• Multi-card issuance for team (employee expense management)\\n• Mobile-first UX (CFO works remotely)',
    status: 'done',
    generatedAt: '2026-03-11T16:31:00Z',
  },
];


// ─── HYPOTHESES ──────────────────────────────────────────────────────────────

export const HYPOTHESES: Hypothesis[] = [
  // H1: Growth Driver Hypothesis (Validated)
  {
    id: 'h1',
    projectId: 'p1',
    nodeId: 'n1b',
    title: 'European SME banking-as-a-service market growing at 22% CAGR 2024-2028',
    body: 'Based on CapitalIQ and Gartner data, the total addressable market (TAM) for digital SME banking in Europe grows from €18.2B (2024) to €32.4B (2028), representing a 22% CAGR. Key drivers: cloud-first adoption (+45% YoY), embedded finance demand (accounting software integration), and regulatory tailwinds (PSD2/3 open banking). The mid-market segment (50-500 employees) represents €12B SAM with only 18% penetration in France, leaving significant growth runway.',
    status: 'validated',
    createdBy: 'u1',
    createdAt: '2026-03-10T17:00:00Z',
    updatedAt: '2026-03-11T09:30:00Z',
    updatedBy: 'u2',
    validatedBy: 'u2',
    validatedAt: '2026-03-11T09:30:00Z',
    confidence: {
      sourceQuality: 92,
      crossVerification: 88,
      dataFreshness: 90,
      internalConsistency: 91,
      overall: 90,
    },
    sources: [
      {
        sourceId: 's16',
        excerpt: `Europe (Western): €18.2B (2024)
Growth Forecast: €32.4B (2028)
CAGR 2024-2028: 22%`,
        addedBy: 'u1',
        addedAt: '2026-03-10T17:00:00Z',
        matrixColumnId: 'col-n1b-summary',
        matrixCellId: 'cell-s16-summary',
      },
      {
        sourceId: 's38',
        excerpt: 'Gartner forecasts 22% CAGR for European SME digital banking 2024-2028, driven by cloud adoption, embedded finance demand, and regulatory tailwinds (PSD2/3)',
        addedBy: 'u1',
        addedAt: '2026-03-10T17:01:00Z',
        matrixColumnId: 'col-n1b-summary',
        matrixCellId: 'cell-s38-summary',
      },
      {
        sourceId: 's39',
        excerpt: `• Freemium virality (€9/month tier = acquisition engine)
• SME pain point: slow onboarding at traditional banks (3 weeks vs. 10 minutes)
• Multi-product expansion (cards → lending → insurance): NRR boost to 118%`,
        addedBy: 'u1',
        addedAt: '2026-03-10T17:02:00Z',
        matrixColumnId: 'col-n1b-drivers',
        matrixCellId: 'cell-s39-drivers',
      },
    ],
    relations: [
      { hypothesisId: 'h2', type: 'supports' },
    ],
    tags: ['market', 'growth', 'TAM'],
    comments: [],
    versions: [],
    includedInReport: true,
    sourceIds: ['s16', 's38', 's39'],
    metadata: { source: 'matrix' },
    confidenceHistory: [
      { date: '2026-03-10T17:00:00Z', score: 85, event: 'Created from matrix' },
      { date: '2026-03-11T09:30:00Z', score: 90, event: 'Validated by Alex' },
    ],
  },

  // H2: Adoption Hypothesis (Validated but contradicted by H4)
  {
    id: 'h2',
    projectId: 'p1',
    nodeId: 'n1b',
    title: 'Post-COVID digitalization accelerates SME adoption (+45% cloud-first SMEs in 2024)',
    body: 'Cloud-first solution adoption by SMEs increased by 45% YoY between 2023 and 2024, catalyzed by remote work and accounting integration. SMEs with 50-500 employees are massively migrating their treasury operations to digital (vs. 3 weeks onboarding at traditional banks). This structural trend supports B2B neobank segment growth independently of macro cycles.',
    status: 'validated',
    createdBy: 'u1',
    createdAt: '2026-03-10T18:00:00Z',
    updatedAt: '2026-03-12T10:30:00Z',
    updatedBy: 'u1',
    validatedBy: 'u2',
    validatedAt: '2026-03-11T10:00:00Z',
    confidence: {
      sourceQuality: 90,
      crossVerification: 85,
      dataFreshness: 94,
      internalConsistency: 88,
      overall: 89,
    },
    sources: [
      {
        sourceId: 's38',
        excerpt: `• Cloud-first SME adoption (+45% YoY 2023-2024)
• Remote work driving need for digital treasury tools`,
        addedBy: 'u1',
        addedAt: '2026-03-10T18:00:00Z',
        matrixColumnId: 'col-n1b-drivers',
        matrixCellId: 'cell-s38-drivers',
      },
      {
        sourceId: 's47',
        excerpt: `• Speed to onboard (10 minutes vs. 3 weeks at BNP)
• Mobile-first UX (CFO works remotely)`,
        addedBy: 'u1',
        addedAt: '2026-03-10T18:01:00Z',
        matrixColumnId: 'col-n1b-drivers',
        matrixCellId: 'cell-s47-drivers',
      },
    ],
    relations: [
      { hypothesisId: 'h1', type: 'supports' },
      { hypothesisId: 'h4', type: 'contradicts' },
    ],
    tags: ['adoption', 'digital', 'growth'],
    comments: [],
    versions: [],
    includedInReport: true,
    sourceIds: ['s38', 's47'],
    metadata: { source: 'manual' },
    confidenceHistory: [
      { date: '2026-03-10T18:00:00Z', score: 88, event: 'Created' },
      { date: '2026-03-11T10:00:00Z', score: 92, event: 'Validated by Alex' },
      { date: '2026-03-12T10:30:00Z', score: 89, event: 'Confidence adjusted due to H4 contradiction' },
    ],
  },

  // H3: Macro Risk Hypothesis (Draft)
  {
    id: 'h3',
    projectId: 'p1',
    nodeId: 'n1b',
    title: 'High interest rates slow business creation (-12% in France 2024)',
    body: 'The high interest rate environment (4.5% ECB) led to a 12% decline in business creation in France in 2024 vs. 2023. This macro headwind reduces organic top-of-funnel growth (new SME customers) and could compress the 22% CAGR growth forecast if the phenomenon persists. Economic cycle sensitivity nuances the pure structural growth thesis.',
    status: 'draft',
    createdBy: 'u1',
    createdAt: '2026-03-11T14:00:00Z',
    updatedAt: '2026-03-11T14:00:00Z',
    updatedBy: 'u1',
    confidence: {
      sourceQuality: 88,
      crossVerification: 75,
      dataFreshness: 91,
      internalConsistency: 78,
      overall: 78,
    },
    sources: [
      {
        sourceId: 's38',
        excerpt: 'High interest rates → -12% business creation 2024 (France). Macro recession risk → SME churn spike',
        addedBy: 'u1',
        addedAt: '2026-03-11T14:00:00Z',
        matrixColumnId: 'col-n1b-risks',
        matrixCellId: 'cell-s38-risks',
      },
      {
        sourceId: 's48',
        excerpt: 'Regulatory environment shifting. Neobanks must prove sustainable business models without regulatory arbitrage. Winners = those with strong unit economics beyond interchange',
        addedBy: 'u1',
        addedAt: '2026-03-11T14:01:00Z',
        matrixColumnId: 'col-n1b-dynamics',
      },
    ],
    relations: [
      { hypothesisId: 'h1', type: 'nuances' },
    ],
    tags: ['macro', 'risk', 'headwinds'],
    comments: [],
    versions: [],
    includedInReport: false,
    sourceIds: ['s38', 's48'],
    metadata: { source: 'manual' },
    confidenceHistory: [
      { date: '2026-03-11T14:00:00Z', score: 78, event: 'Created from favorited matrix cells' },
    ],
  },

  // H4: Contradictory Hypothesis (Draft by Thomas - CRITICAL)
  {
    id: 'h4',
    projectId: 'p1',
    nodeId: 'n1b',
    title: 'Return to traditional banks slows neobank growth (18% churn observed in 2024)',
    body: 'According to an interview with an ex-Revolut VP Product, 18% of the 2024 cohort churned to traditional banks (vs. 12% in 2022), citing a "return to safety" during macro uncertainty. This phenomenon contradicts the pure digital adoption narrative and suggests that traditional SMEs (retail, manufacturing) remain sensitive to incumbent brand and trust, particularly during economic stress.',
    status: 'draft',
    createdBy: 'u3',
    createdAt: '2026-03-12T10:30:00Z',
    updatedAt: '2026-03-12T10:30:00Z',
    updatedBy: 'u3',
    confidence: {
      sourceQuality: 85,
      crossVerification: 68,
      dataFreshness: 95,
      internalConsistency: 72,
      overall: 75,
    },
    sources: [
      {
        sourceId: 's46',
        excerpt: 'We saw 18% of our 2024 cohort churn back to traditional banks — up from 12% in 2022. SMEs citing \'return to safety\' during macro uncertainty. This contradicts the pure digital-first adoption narrative.',
        addedBy: 'u3',
        addedAt: '2026-03-12T10:30:00Z',
        matrixColumnId: 'col-n1b-risks',
        matrixCellId: 'cell-s46-risks',
      },
      {
        sourceId: 's46',
        excerpt: 'The biggest threat isn\'t other neobanks — it\'s incumbents finally getting their act together. BNP, SG launching digital-only SME brands with lower CAC (cross-sell from existing base) and trust advantage',
        addedBy: 'u3',
        addedAt: '2026-03-12T10:31:00Z',
      },
    ],
    relations: [
      { hypothesisId: 'h2', type: 'contradicts' },
    ],
    tags: ['churn', 'risk', 'competition'],
    comments: [],
    versions: [],
    includedInReport: false,
    sourceIds: ['s46', 's46'],
    metadata: { source: 'manual', author: 'u3' },
    confidenceHistory: [
      { date: '2026-03-12T10:30:00Z', score: 75, event: 'Created from expert call insight' },
    ],
  },

  // H5: NRR Hypothesis (for n4a)
  {
    id: 'h5',
    projectId: 'p1',
    nodeId: 'n4a',
    title: '118% NRR driven by multi-product expansion (cards → lending → insurance)',
    body: 'Qonto shows 118% NRR (vs. B2C neobank average 95%), generated by pricing expansion: freemium upgrade €9/mo → €29/mo (+50% at M3), then €49/mo for lending access (+70% at M12). Multi-product strategy (cards → accounting integration → lending → insurance) creates moat via stickiness and cross-sell. Customer LTV: €2,400 over 4 years.',
    status: 'validated',
    createdBy: 'u1',
    createdAt: '2026-03-09T10:00:00Z',
    updatedAt: '2026-03-10T11:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u2',
    validatedAt: '2026-03-10T11:00:00Z',
    confidence: {
      sourceQuality: 94,
      crossVerification: 90,
      dataFreshness: 92,
      internalConsistency: 93,
      overall: 92,
    },
    sources: [
      {
        sourceId: 's1',
        excerpt: 'NRR 118% driven by tier upgrades: €9/mo (freemium) → €29/mo (M3, 50% conversion) → €49/mo (M12, 35% conversion)',
        addedBy: 'u1',
        addedAt: '2026-03-09T10:00:00Z',
      },
    ],
    relations: [
      { hypothesisId: 'h1', type: 'supports' },
    ],
    tags: ['NRR', 'retention', 'metrics'],
    comments: [],
    versions: [],
    includedInReport: true,
    sourceIds: ['s1'],
    metadata: { source: 'manual' },
    confidenceHistory: [
      { date: '2026-03-09T10:00:00Z', score: 90, event: 'Created' },
      { date: '2026-03-10T11:00:00Z', score: 92, event: 'Validated' },
    ],
  },

  // H6: CAC Hypothesis (for n4a)
  {
    id: 'h6',
    projectId: 'p1',
    nodeId: 'n4a',
    title: '9-month CAC payback through viral freemium model',
    body: 'The freemium model (€9/mo tier) generates €180 CAC with 9-month payback (vs. 18-24 months for paid acquisition). Organic virality (45% of signups via accountant referral) reduces paid marketing dependency. Blended CAC: €240, LTV: €2,400 → 10x LTV/CAC ratio (best-in-class B2B SaaS).',
    status: 'validated',
    createdBy: 'u1',
    createdAt: '2026-03-09T11:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z',
    updatedBy: 'u2',
    validatedBy: 'u2',
    validatedAt: '2026-03-10T12:00:00Z',
    confidence: {
      sourceQuality: 91,
      crossVerification: 88,
      dataFreshness: 90,
      internalConsistency: 89,
      overall: 90,
    },
    sources: [
      {
        sourceId: 's1',
        excerpt: 'CAC €180 (freemium), payback 9 months. Blended CAC €240 (incl. paid channels). LTV €2,400 → LTV/CAC ratio 10x',
        addedBy: 'u1',
        addedAt: '2026-03-09T11:00:00Z',
      },
    ],
    relations: [
      { hypothesisId: 'h5', type: 'supports' },
    ],
    tags: ['CAC', 'LTV', 'metrics'],
    comments: [],
    versions: [],
    includedInReport: true,
    sourceIds: ['s1'],
    metadata: { source: 'manual' },
    confidenceHistory: [
      { date: '2026-03-09T11:00:00Z', score: 88, event: 'Created' },
      { date: '2026-03-10T12:00:00Z', score: 90, event: 'Validated' },
    ],
  },

  // H7: Regulatory Risk Hypothesis (on hold)
  {
    id: 'h7',
    projectId: 'p1',
    nodeId: 'n5a',
    title: 'PSD3 risk: interchange cap could impact 15-20% of revenue',
    body: 'According to ACPR interview, PSD3 should cap interchange fees (currently 25-30% of neobank revenue). Estimated impact: -15-20% revenue for Qonto if cap applied (€30M-40M). Requires revenue diversification toward pure subscription and lending to compensate. Timeline: PSD3 implementation likely H2 2025.',
    status: 'on_hold',
    createdBy: 'u1',
    createdAt: '2026-03-11T15:00:00Z',
    updatedAt: '2026-03-11T15:30:00Z',
    updatedBy: 'u2',
    confidence: {
      sourceQuality: 92,
      crossVerification: 70,
      dataFreshness: 88,
      internalConsistency: 75,
      overall: 78,
    },
    sources: [
      {
        sourceId: 's48',
        excerpt: 'PSD3 will likely cap interchange fees — neobanks generating 25-30% of revenue from interchange could see 15-20% revenue impact',
        addedBy: 'u1',
        addedAt: '2026-03-11T15:00:00Z',
        matrixColumnId: 'col-n1b-risks',
        matrixCellId: 'cell-s48-risks',
      },
    ],
    relations: [],
    tags: ['regulation', 'risk', 'PSD3'],
    comments: [
      {
        id: 'c1',
        authorId: 'u2',
        content: 'Put on hold pending regulatory clarification. Timeline uncertain.',
        createdAt: '2026-03-11T15:30:00Z',
        resolved: false,
      },
    ],
    versions: [],
    includedInReport: false,
    sourceIds: ['s48'],
    metadata: { source: 'manual' },
    confidenceHistory: [
      { date: '2026-03-11T15:00:00Z', score: 78, event: 'Created' },
      { date: '2026-03-11T15:30:00Z', score: 78, event: 'Put on hold - regulatory uncertainty' },
    ],
  },

  // H8: Rejected Hypothesis
  {
    id: 'h8',
    projectId: 'p1',
    nodeId: 'n1b',
    title: 'Qonto can reach 1M customers in 2025',
    body: 'Projection based on 2022-2023 historical growth (+150K customers/year) suggests 1M customers achievable in 2025.',
    status: 'rejected',
    createdBy: 'u1',
    createdAt: '2026-03-08T10:00:00Z',
    updatedAt: '2026-03-08T14:00:00Z',
    updatedBy: 'u2',
    rejectionReason: 'Unrealistic projection - does not account for macro slowdown and French market saturation. 2024 growth = +80K (vs. 150K in 2023). Revise to 600K-650K customers end 2025.',
    rejectedBy: 'u2',
    rejectedAt: '2026-03-08T14:00:00Z',
    confidence: {
      sourceQuality: 60,
      crossVerification: 45,
      dataFreshness: 70,
      internalConsistency: 50,
      overall: 55,
    },
    sources: [
      {
        sourceId: 's1',
        excerpt: 'Historical growth: +150K clients 2022-2023',
        addedBy: 'u1',
        addedAt: '2026-03-08T10:00:00Z',
      },
    ],
    relations: [],
    tags: ['growth', 'forecast'],
    comments: [],
    versions: [],
    includedInReport: false,
    sourceIds: ['s1'],
    metadata: { source: 'manual' },
    confidenceHistory: [
      { date: '2026-03-08T10:00:00Z', score: 65, event: 'Created' },
      { date: '2026-03-08T14:00:00Z', score: 55, event: 'Rejected - unrealistic projection' },
    ],
  },
];

// ─── RESEARCH SYNTHESES ──────────────────────────────────────────────────────

export const RESEARCH_SYNTHESES: ResearchSynthesis[] = [
  {
    nodeId: 'n1b',
    summary: 'Based on comprehensive analysis of 6 key sources (Gartner SME Banking 2024, McKinsey Neobank Landscape, ACPR regulatory interview, CapitalIQ market data, ex-Revolut VP call, Qonto customer interview), the European SME banking market shows strong structural growth drivers (+22% CAGR, €18B→€32B TAM 2024-2028) driven by digital-first adoption post-COVID and regulatory tailwinds (PSD2/3). However, macroeconomic headwinds (rising interest rates causing -12% business creation in France, €4.5% ECB rate) and nascent signs of traditional banking return among certain segments (18% churn in 2024 cohort vs. 12% in 2022, per Revolut data) nuance the pure growth narrative. Regulatory risks include PSD3 interchange caps (15-20% revenue impact potential) and capital requirement convergence eliminating neobank arbitrage advantage. Key insight: market bifurcating between digital-native SMEs (startups, tech = loyal) and traditional SMEs (retail, manufacturing = higher churn during macro stress). Recommendation: validate churn patterns in Qonto\'s 2024 cohorts and scenario-test macro sensitivity on growth projections.',
    keyPoints: [
      'TAM growth: €18.2B (2024) → €32.4B (2028) = 22% CAGR (CapitalIQ, Gartner)',
      'Penetration runway: France 18%, Germany 12%, Southern Europe <10% (low saturation)',
      'Cloud adoption acceleration: +45% YoY SME digital-first adoption (Gartner)',
      'Macro headwind: -12% business creation France 2024 due to high interest rates',
      'Churn risk signal: 18% of 2024 cohort churned back to traditional banks (vs. 12% in 2022) - ex-Revolut VP',
      'Regulatory risk: PSD3 interchange cap could impact 15-20% of revenue (ACPR)',
      'Incumbent counter-attack: BNP, SG launching digital SME brands with lower CAC',
      'Customer segmentation critical: digital-native SMEs = loyal, traditional SMEs = macro-sensitive',
    ],
    sources: SOURCES.filter(s => ['s16', 's38', 's39', 's46', 's47', 's48'].includes(s.id)),
    lastUpdated: '2026-03-12T11:00:00Z',
    coverageScore: 82,
  },
];

// ─── ALERTS ──────────────────────────────────────────────────────────────────

export const ALERTS: Alert[] = [
  {
    id: 'alert-1',
    projectId: 'p1',
    type: 'contradiction',
    severity: 'high',
    title: 'Hypothesis H4 contradicts H2 (digital adoption)',
    description: 'Thomas Leclerc created hypothesis H4 ("18% churn to traditional banks in 2024") which directly contradicts H2 validated by Alex ("Accelerated digital adoption +45%"). Source: ex-Revolut VP interview showing return to traditional banks during macro uncertainty. Requires review and arbitration.',
    nodeId: 'n1b',
    hypothesisId: 'h4',
    createdAt: '2026-03-12T10:30:00Z',
    isRead: false,
  },

  {
    id: 'alert-2',
    projectId: 'p1',
    type: 'deprecated',
    severity: 'medium',
    title: 'Source s45 (Les Echos 2022) is outdated',
    description: 'The Les Echos report "French Neobank Market 2022" is now outdated (published Q1 2022, data 2021). Replace with more recent data for hypotheses H1 and H3.',
    nodeId: 'n1b',
    hypothesisId: 'h1',
    createdAt: '2026-03-10T09:00:00Z',
    isRead: true,
  },

  {
    id: 'alert-3',
    projectId: 'p1',
    type: 'on_hold',
    severity: 'medium',
    title: 'Hypothesis H7 on hold (PSD3 regulatory risk)',
    description: 'Alex put hypothesis H7 on interchange cap risk (PSD3) on hold pending regulatory clarification. PSD3 implementation timeline uncertain (H2 2025 estimated).',
    nodeId: 'n5a',
    hypothesisId: 'h7',
    createdAt: '2026-03-11T15:30:00Z',
    isRead: false,
  },
];

// ─── ACTIVITY LOG ────────────────────────────────────────────────────────────

export const ACTIVITY_LOG: ActivityLog[] = [
  {
    id: 'act-1',
    projectId: 'p1',
    action: 'assigned',
    actor: 'Alex Martin',
    actorId: 'u2',
    targetType: 'node',
    targetId: 'n1b',
    targetName: 'Drivers & Macro Risks',
    timestamp: '2026-03-10T09:00:00Z',
    detail: 'Assigned Sarah Dubois to analyze growth drivers and macro risks',
  },

  {
    id: 'act-2',
    projectId: 'p1',
    action: 'created',
    actor: 'Sarah Dubois',
    actorId: 'u1',
    targetType: 'node',
    targetId: 'n1b',
    targetName: 'Matrix Scope: Drivers & Macro Risks',
    timestamp: '2026-03-10T14:00:00Z',
    detail: 'Created Knowledge Base scope with 10 discovered sources',
  },

  {
    id: 'act-3',
    projectId: 'p1',
    action: 'created',
    actor: 'Sarah Dubois',
    actorId: 'u1',
    targetType: 'node',
    targetId: 'n1b',
    targetName: '5 Matrix Columns',
    timestamp: '2026-03-10T14:10:00Z',
    detail: 'Defined extraction columns: Growth Drivers, Macro Risks, Market Dynamics, Competitive Threats',
  },

  {
    id: 'act-4',
    projectId: 'p1',
    action: 'updated',
    actor: 'System',
    actorId: 'system',
    targetType: 'node',
    targetId: 'n1b',
    targetName: 'Matrix Cells',
    timestamp: '2026-03-10T16:00:00Z',
    detail: 'AI extraction completed: 30 cells generated from 6 sources',
  },

  {
    id: 'act-5',
    projectId: 'p1',
    action: 'updated',
    actor: 'Sarah Dubois',
    actorId: 'u1',
    targetType: 'node',
    targetId: 'n1b',
    targetName: '4 Cells Favorited',
    timestamp: '2026-03-10T16:30:00Z',
    detail: 'Favorited 4 key cells for synthesis',
  },

  {
    id: 'act-6',
    projectId: 'p1',
    action: 'created',
    actor: 'Sarah Dubois',
    actorId: 'u1',
    targetType: 'node',
    targetId: 'n1b',
    targetName: 'Research Synthesis',
    timestamp: '2026-03-10T16:45:00Z',
    detail: 'Generated synthesis from favorited cells (Gartner, McKinsey, CapitalIQ, ACPR)',
  },

  {
    id: 'act-7',
    projectId: 'p1',
    action: 'created',
    actor: 'Sarah Dubois',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1: 22% CAGR growth',
    timestamp: '2026-03-10T17:00:00Z',
    detail: 'Created hypothesis from AI synthesis with 3 sources',
  },

  {
    id: 'act-8',
    projectId: 'p1',
    action: 'created',
    actor: 'Sarah Dubois',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h2',
    targetName: 'H2: +45% cloud adoption',
    timestamp: '2026-03-10T18:00:00Z',
    detail: 'Created hypothesis on digital adoption acceleration',
  },

  {
    id: 'act-9',
    projectId: 'p1',
    action: 'validated',
    actor: 'Alex Martin',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1: 22% CAGR growth',
    timestamp: '2026-03-11T09:30:00Z',
    detail: 'Validated hypothesis - strong source quality (92% confidence)',
  },

  {
    id: 'act-10',
    projectId: 'p1',
    action: 'validated',
    actor: 'Alex Martin',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h2',
    targetName: 'H2: +45% cloud adoption',
    timestamp: '2026-03-11T10:00:00Z',
    detail: 'Validated hypothesis - strong cross-verification',
  },

  {
    id: 'act-11',
    projectId: 'p1',
    action: 'created',
    actor: 'Sarah Dubois',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h3',
    targetName: 'H3: Interest rates impact',
    timestamp: '2026-03-11T14:00:00Z',
    detail: 'Created draft hypothesis on macro headwinds from favorited cells',
  },

  {
    id: 'act-12',
    projectId: 'p1',
    action: 'created',
    actor: 'Thomas Leclerc',
    actorId: 'u3',
    targetType: 'source',
    targetId: 's46',
    targetName: 'Expert Call: Ex-Revolut VP Product',
    timestamp: '2026-03-12T10:00:00Z',
    detail: 'Uploaded expert call transcript via drag & drop',
  },

  {
    id: 'act-13',
    projectId: 'p1',
    action: 'updated',
    actor: 'System',
    actorId: 'system',
    targetType: 'node',
    targetId: 'n1b',
    targetName: 'Knowledge Base Auto-Updated',
    timestamp: '2026-03-12T10:05:00Z',
    detail: 'Auto-generated 5 matrix cells from new expert call source',
  },

  {
    id: 'act-14',
    projectId: 'p1',
    action: 'created',
    actor: 'Thomas Leclerc',
    actorId: 'u3',
    targetType: 'hypothesis',
    targetId: 'h4',
    targetName: 'H4: Churn back to traditional banks',
    timestamp: '2026-03-12T10:30:00Z',
    detail: 'Created hypothesis based on expert call insight (18% churn observed)',
  },

  {
    id: 'act-15',
    projectId: 'p1',
    action: 'created',
    actor: 'System',
    actorId: 'system',
    targetType: 'hypothesis',
    targetId: 'h4',
    targetName: 'Alert: Contradiction detected',
    timestamp: '2026-03-12T10:30:00Z',
    detail: 'H4 contradicts validated H2 - requires review',
  },
];

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

export function getResearchByNode(nodeId: string): ResearchSynthesis | undefined {
  return RESEARCH_SYNTHESES.find(r => r.nodeId === nodeId);
}

export function getHypothesesByNode(nodeId: string): Hypothesis[] {
  return HYPOTHESES.filter(h => h.nodeId === nodeId);
}

export function getSourcesByNode(nodeId: string): Source[] {
  const sourceIds = NODE_SOURCES[nodeId] || [];
  return SOURCES.filter(s => sourceIds.includes(s.id));
}

export function getAlertsByNode(nodeId: string): Alert[] {
  return ALERTS.filter(a => a.nodeId === nodeId);
}

export function getActivityByProject(projectId: string): ActivityLog[] {
  return ACTIVITY_LOG.filter(a => a.projectId === projectId);
}

export function getMatrixScopeByNode(nodeId: string) {
  return MATRIX_SCOPES.find(scope => scope.nodeId === nodeId);
}

export function getMatrixColumnsByScope(scopeId: string): MatrixColumn[] {
  return MATRIX_COLUMNS.filter(col => col.matrixScopeId === scopeId);
}

export function getMatrixCellsByScope(scopeId: string): MatrixCell[] {
  return MATRIX_CELLS.filter(cell => cell.matrixScopeId === scopeId);
}

// ─── CONNECTOR ALIASES & MAPPINGS ────────────────────────────────────────────

// Alias for compatibility
export const CONNECTORS = CONNECTOR_CONFIGS;

// Connected connectors list
export const CONNECTED_CONNECTORS = CONNECTOR_CONFIGS.filter(c => c.status === 'connected').map(c => c.id);

// Connector to sources mapping
// Connector sources (all sources that come from connectors)
export const CONNECTOR_SOURCES: Source[] = SOURCES.filter(s => s.connectorId);

// Connector to source IDs mapping (helper for connector management)
export const CONNECTOR_SOURCE_MAP: Record<string, string[]> = {
  'conn-sharepoint': ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 's15'],
  'conn-capitaliq': ['s16', 's17', 's18', 's19', 's20', 's21', 's22', 's23', 's24', 's25'],
  'conn-intralinks': ['s26', 's27', 's28', 's29', 's30', 's31', 's32', 's33', 's34', 's35', 's36', 's37'],
};

// Mock cell values (legacy compatibility)
export const MOCK_CELL_VALUES: Record<string, string> = {};

// Helper function to get source by ID
export function getSourceById(sourceId: string): Source | undefined {
  return SOURCES.find(s => s.id === sourceId);
}

// AI Suggestions for matrix columns (legacy compatibility)
export const AI_SUGGESTIONS: Record<string, any> = {
  // Empty structure for compatibility with AISuggestColumns component
};
