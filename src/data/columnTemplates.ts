import { MatrixColumnTemplate } from '@/types/matrix';

/**
 * Predefined column templates for common analysis types.
 * Organized by category: financial, market, product, competitive.
 */
export const COLUMN_TEMPLATES: MatrixColumnTemplate[] = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // FINANCIAL METRICS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'arpu',
    label: 'ARPU',
    prompt: 'Extract the Average Revenue Per User (ARPU). Include the specific value, time period, and currency. If different ARPU metrics are mentioned (monthly, annual), extract all of them.',
    type: 'text',
    category: 'financial',
    description: 'Average revenue generated per user/customer',
    examples: ['$45/month', '$540/year', '€38 monthly ARPU'],
  },
  {
    id: 'nrr',
    label: 'Net Revenue Retention',
    prompt: 'Extract the Net Revenue Retention (NRR) rate. Look for NRR, NDR, or net dollar retention metrics. Include the percentage and time period.',
    type: 'text',
    category: 'financial',
    description: 'Percentage of recurring revenue retained from existing customers',
    examples: ['120% NRR', 'NDR of 115%', 'Net retention: 130%'],
  },
  {
    id: 'cac',
    label: 'CAC',
    prompt: 'Extract the Customer Acquisition Cost (CAC). Include the amount, currency, and how it\'s calculated if mentioned (blended vs. paid).',
    type: 'text',
    category: 'financial',
    description: 'Cost to acquire a new customer',
    examples: ['$250 blended CAC', 'CAC: €180', '$400 paid CAC'],
  },
  {
    id: 'ltv',
    label: 'LTV',
    prompt: 'Extract the Customer Lifetime Value (LTV or CLV). Include the amount and any methodology mentioned.',
    type: 'text',
    category: 'financial',
    description: 'Total revenue expected from a customer relationship',
    examples: ['LTV: $1,200', 'CLV of €2,500', '$3k lifetime value'],
  },
  {
    id: 'ltv_cac_ratio',
    label: 'LTV:CAC Ratio',
    prompt: 'Extract the LTV to CAC ratio. Look for explicit ratios or calculate from LTV and CAC if both are provided.',
    type: 'text',
    category: 'financial',
    description: 'Ratio of lifetime value to acquisition cost',
    examples: ['3.5:1', 'LTV/CAC: 4.2', 'Ratio of 5:1'],
  },
  {
    id: 'gross_margin',
    label: 'Gross Margin',
    prompt: 'Extract the gross margin or gross profit margin. Include the percentage and what it applies to (product, overall, etc.).',
    type: 'text',
    category: 'financial',
    description: 'Revenue minus cost of goods sold, as percentage',
    examples: ['75% gross margin', 'GM: 82%', 'Gross profit margin of 68%'],
  },
  {
    id: 'burn_rate',
    label: 'Burn Rate',
    prompt: 'Extract the monthly or annual burn rate. Include amount, currency, and time period.',
    type: 'text',
    category: 'financial',
    description: 'Rate at which company spends cash reserves',
    examples: ['$500k/month burn', 'Monthly burn: €350k', 'Burning $6M annually'],
  },
  {
    id: 'arr_mrr',
    label: 'ARR/MRR',
    prompt: 'Extract Annual Recurring Revenue (ARR) or Monthly Recurring Revenue (MRR). Include amount, currency, and growth rate if mentioned.',
    type: 'text',
    category: 'financial',
    description: 'Recurring revenue metrics',
    examples: ['$10M ARR', 'MRR: $850k', '$24M ARR (+150% YoY)'],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // MARKET METRICS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'tam',
    label: 'TAM',
    prompt: 'Extract the Total Addressable Market (TAM). Include the value, currency, geographic scope, and any growth projections.',
    type: 'text',
    category: 'market',
    description: 'Total market opportunity available',
    examples: ['$50B global TAM', 'TAM: €15B in Europe', '$100B TAM by 2026'],
  },
  {
    id: 'sam',
    label: 'SAM',
    prompt: 'Extract the Serviceable Addressable Market (SAM). Include value, currency, and how it\'s defined relative to TAM.',
    type: 'text',
    category: 'market',
    description: 'Portion of TAM targeted by products/services',
    examples: ['$12B SAM', 'Serviceable market: €8B', 'SAM of $20B'],
  },
  {
    id: 'market_share',
    label: 'Market Share',
    prompt: 'Extract the company\'s market share. Include percentage, market segment, and geographic region.',
    type: 'text',
    category: 'market',
    description: 'Company\'s percentage of total market',
    examples: ['15% market share', 'Leading with 28%', '12% share in Europe'],
  },
  {
    id: 'cagr',
    label: 'CAGR',
    prompt: 'Extract the Compound Annual Growth Rate (CAGR). Include percentage, time period, and what metric it applies to.',
    type: 'text',
    category: 'market',
    description: 'Compound annual growth rate',
    examples: ['25% CAGR', 'Growing at 35% CAGR 2021-2025', 'Market CAGR: 18%'],
  },
  {
    id: 'growth_drivers',
    label: 'Growth Drivers',
    prompt: 'Extract the main growth drivers for the company or market. List key factors driving expansion.',
    type: 'list',
    category: 'market',
    description: 'Key factors driving growth',
    examples: ['Digital transformation, Remote work adoption', 'AI adoption, Regulatory changes'],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PRODUCT METRICS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'key_features',
    label: 'Key Features',
    prompt: 'Extract the main product features or capabilities. List the most important or differentiated features.',
    type: 'list',
    category: 'product',
    description: 'Core product features and capabilities',
    examples: ['Real-time collaboration, AI-powered insights', 'Mobile app, API access'],
  },
  {
    id: 'pricing_model',
    label: 'Pricing Model',
    prompt: 'Extract the pricing model and tiers. Include pricing structure, tiers/plans, and key price points if available.',
    type: 'text',
    category: 'product',
    description: 'How the product is priced',
    examples: ['Freemium + 3 paid tiers', 'Usage-based pricing', '$29-$299/month tiered'],
  },
  {
    id: 'roadmap',
    label: 'Product Roadmap',
    prompt: 'Extract upcoming product developments or roadmap items. Include timeframes if mentioned.',
    type: 'list',
    category: 'product',
    description: 'Planned future product developments',
    examples: ['Mobile app Q2 2024, Enterprise features Q3', 'AI assistant, Advanced analytics'],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    prompt: 'Extract key integrations and partnerships. List major platform integrations or technology partners.',
    type: 'list',
    category: 'product',
    description: 'Technology integrations and partners',
    examples: ['Salesforce, HubSpot, Slack', 'AWS, Google Cloud, Microsoft Azure'],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // COMPETITIVE METRICS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'uk_retail_market_share',
    label: 'UK Retail Market Share (%)',
    prompt: 'Extract the UK retail banking market share (%) for each neobank mentioned. Include: player name, % share, metric used (MAU, primary accounts, deposits), and time period. If multiple metrics exist, list all.',
    type: 'text',
    category: 'competitive',
    description: 'UK neobank market share with metric breakdown',
    examples: ['Revolut: 28.4% (MAU, Q2 2024)', 'Monzo: 30.2% (primary accounts, H1 2024)', 'Starling: 3.1M primary accounts'],
  },
  {
    id: 'customer_acquisition_trend',
    label: 'Customer Acquisition Trend',
    prompt: 'Extract customer acquisition data: net new customers added (monthly or quarterly), YoY growth rate, and any mention of acceleration or deceleration in acquisition. Flag directional trends (↗↘↔).',
    type: 'text',
    category: 'competitive',
    description: 'Customer growth trends and acquisition dynamics',
    examples: ['Monzo: +1.4M H1 2024 (↗ accelerating)', 'Revolut UK: +880K (-37% YoY, ↘ decelerating)', 'Chase UK: +310K (↔ flat)'],
  },
  {
    id: 'competitive_position',
    label: 'Competitive Position',
    prompt: 'Extract the company\'s competitive positioning. Include market position, competitive advantages, and differentiation.',
    type: 'text',
    category: 'competitive',
    description: 'Market position relative to competitors',
    examples: ['Market leader in Europe', '#2 player with superior UX', 'Challenger with AI focus'],
  },
  {
    id: 'barriers_to_entry',
    label: 'Barriers to Entry',
    prompt: 'Extract barriers to entry in this market. Include regulatory, technical, or economic barriers.',
    type: 'list',
    category: 'competitive',
    description: 'Obstacles preventing new competitors',
    examples: ['High capital requirements, Network effects', 'Regulatory approvals, Brand loyalty'],
  },
  {
    id: 'competitive_moats',
    label: 'Competitive Moats',
    prompt: 'Extract the company\'s sustainable competitive advantages or moats. What protects them from competition?',
    type: 'list',
    category: 'competitive',
    description: 'Sustainable competitive advantages',
    examples: ['Proprietary data, Switching costs', 'Brand, Network effects, Patents'],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // STRATEGIC ANALYSIS (McKinsey-Level Deep Dives)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'market_sizing_tam',
    label: 'Market Sizing & TAM',
    prompt: 'Extract Total Addressable Market (TAM) analysis with: Top-down approach (global market → segment), Bottom-up approach (unit economics × customers), TAM/SAM/SOM breakdown with figures, 5-year CAGR projection, key assumptions, and comparison to analyst reports.',
    type: 'text',
    category: 'market',
    description: 'McKinsey-level market sizing with TAM/SAM/SOM',
    examples: ['TAM: €450B global payments, SAM: €85B SMB segment, SOM: €8.5B (10% penetration), 18% CAGR 2024-2029'],
  },
  {
    id: 'competitive_landscape',
    label: 'Competitive Landscape',
    prompt: 'Extract competitive intelligence: Top 10 direct competitors ranked by market share/revenue/funding, indirect competitors and substitutes, for each player analyze pricing model, key features, target audience, strengths/weaknesses, recent strategic moves, market positioning, competitive moats, white space gaps, and threat assessment (low/medium/high).',
    type: 'text',
    category: 'competitive',
    description: 'Bain-style competitive landscape analysis',
    examples: ['Direct: Stripe (28% share, $95B valuation), Adyen (15% share), Square (12% share). Moats: Network effects, switching costs. White space: SMB cross-border payments'],
  },
  {
    id: 'customer_personas',
    label: 'Customer Personas',
    prompt: 'Extract 3-4 detailed customer personas with: Demographics (age, income, location, job title), psychographics (values, lifestyle), top 5 pain points, goals & aspirations, buying behavior, media consumption, top 3 objections, trigger events, willingness to pay, segment sizing (% of market), and prioritization matrix.',
    type: 'text',
    category: 'market',
    description: 'Deep customer segmentation and personas',
    examples: ['Persona 1: Tech-savvy SMB owner, 35-45, €75K+ income, pain: high bank fees, goal: global expansion, trigger: first international client, WTP: €50-150/month (40% of market)'],
  },
  {
    id: 'industry_trends',
    label: 'Industry Trends',
    prompt: 'Extract industry trend analysis: 5 macro trends (economic, regulatory, tech, social, environmental), 7 micro trends from last 12 months, technology disruptions with mainstream timeline, regulatory shifts, capital flow (VC deals, M&A, IPOs), map each to short/mid/long-term timeline (0-1yr, 1-3yr, 3-5yr), and "so what" analysis with impact ratings (1-10).',
    type: 'text',
    category: 'market',
    description: 'Goldman Sachs-style trend intelligence',
    examples: ['Macro: Open banking regulation (+9 impact), Micro: Embedded finance growth, Tech: AI fraud detection (2-3yr mainstream), Capital: €2.5B fintech M&A Q1 2024'],
  },
  {
    id: 'swot_porters',
    label: 'SWOT + Porter\'s Five Forces',
    prompt: 'Extract combined SWOT and Porter\'s Five Forces: SWOT with 5-7 items per quadrant with evidence, cross-analysis matching strengths to opportunities (SO strategy) and threats to weaknesses (WT risks). Porter\'s: Supplier power, buyer power, competitive rivalry, threat of substitution, threat of new entry. Rate each force (1-10) with overall industry attractiveness score.',
    type: 'text',
    category: 'competitive',
    description: 'HBS-level strategic framework analysis',
    examples: ['Strengths: Banking license, 20M users. Opportunities: SMB expansion. SO: Leverage license for B2B products. Porter\'s: Rivalry 8/10, New entry 6/10, Attractiveness: 7/10'],
  },
  {
    id: 'pricing_strategy',
    label: 'Pricing Strategy',
    prompt: 'Extract pricing strategy analysis: Competitor pricing audit (all prices, tiers, packaging), value-based pricing calculation, cost-plus floor price, price elasticity estimate, psychological pricing tactics (anchoring, charm, decoy), tiering recommendation with 3-4 plans, discount strategy (when, how much, for whom), 3 revenue scenarios (aggressive/moderate/conservative), and monetization opportunities (upsells, cross-sells, usage-based).',
    type: 'text',
    category: 'financial',
    description: 'Fortune 500-level pricing analysis',
    examples: ['Competitor: Stripe 2.9%+€0.25, Value-based: €1.8%+€0.15 (40% cheaper), 3 tiers: Starter €0/mo, Growth €49/mo, Enterprise custom, Upsell: FX hedging +€15/mo'],
  },
  {
    id: 'gtm_strategy',
    label: 'Go-To-Market Plan',
    prompt: 'Extract go-to-market strategy: Launch phasing (pre-launch 60d, launch week 1, post-launch 90d), top 7 channels ranked by ROI, messaging framework (value prop, 3 supporting messages, proof points), content strategy per funnel stage, 5 strategic partnerships, budget allocation across channels, 10 KPIs with benchmarks, top 5 launch risks with mitigation, and 3 quick wins within 14 days.',
    type: 'text',
    category: 'market',
    description: 'CSO-level launch playbook',
    examples: ['Channels: #1 Content SEO (8:1 ROI), #2 Partnerships (6:1), #3 Paid search (3:1). Value prop: "Bank-level payments at 50% lower cost". Quick win: Partner co-marketing launch week 1'],
  },
  {
    id: 'customer_journey',
    label: 'Customer Journey Map',
    prompt: 'Extract complete customer lifecycle mapping across 6 stages: Awareness (discovery, triggers), Consideration (comparison, info needed), Decision (conversion factors, blockers), Onboarding (first 7 days, retention drivers), Engagement (activation moments), Loyalty (advocacy triggers). For each: customer actions/thoughts/emotions, touchpoints, pain points, opportunities, metrics, tools/tactics to optimize.',
    type: 'text',
    category: 'market',
    description: 'CX strategist journey optimization',
    examples: ['Awareness: Google "business payment solution" (trigger: €500+ invoice). Pain: Too many options. Touchpoint: Comparison blog. Metric: Cost per lead €12. Optimize: SEO + calculator tool'],
  },
  {
    id: 'unit_economics',
    label: 'Financial Model & Unit Economics',
    prompt: 'Extract financial modeling: Unit economics (CAC by channel, LTV calculation with assumptions, LTV:CAC ratio, payback period, gross margin, contribution margin), 3-year projection (revenue monthly Y1/quarterly Y2-3, cost structure fixed vs variable, cash flow with burn rate), sensitivity analysis (best/base/worst case), key assumptions with justification, benchmark comparison vs industry, and red flags.',
    type: 'text',
    category: 'financial',
    description: 'VP Finance-level financial modeling',
    examples: ['CAC: SEO €45, Paid €180, LTV: €2,400 (40mo avg), Ratio: 13:1, Payback: 6mo, Y1 revenue: €12M→€28M, Burn: €800K/mo, Best case: 45% growth, Base: 32%, Worst: 18%'],
  },
  {
    id: 'risk_assessment',
    label: 'Risk Assessment & Scenarios',
    prompt: 'Extract risk analysis: 15 risks across market/operational/financial/regulatory/reputational categories. For each: probability (1-5), impact (1-5), risk score, early warning indicators, mitigation strategy, contingency plan. Scenario planning: best case, base case, worst case, black swan event. For each scenario: revenue impact, timeline, strategic response.',
    type: 'text',
    category: 'competitive',
    description: 'Deloitte-level risk management',
    examples: ['Market risk: New entrant (P:4, I:3, Score:12), Mitigation: Build moat via partnerships, Early warning: VC funding news. Worst case: -40% revenue, 18mo recovery, pivot to enterprise'],
  },
  {
    id: 'market_entry',
    label: 'Market Entry & Expansion',
    prompt: 'Extract market expansion strategy: Market attractiveness scoring (size, growth, competition, regulation, accessibility, infrastructure, score 1-10 each), entry mode analysis (direct/partnership/acquisition/licensing/digital with pros/cons/cost/timeline), localization requirements (product adaptations, pricing, cultural, legal, talent), 12-month roadmap, investment budget, success metrics (6mo and 12mo KPIs).',
    type: 'text',
    category: 'market',
    description: 'Global expansion strategist analysis',
    examples: ['Target: Germany, Attractiveness: 8.5/10 (size:9, growth:7, regulation:8), Entry: Partnership with N26 (6mo, €500K), Localization: German UI, SEPA pricing, BaFin compliance, Y1 goal: 50K users'],
  },
  {
    id: 'executive_synthesis',
    label: 'Executive Strategy Synthesis',
    prompt: 'Extract McKinsey-level strategic recommendation: 3-paragraph executive summary, current state assessment (brutal honesty), 3 strategic options (A: Conservative/low-risk, B: Balanced growth, C: Aggressive/high-risk) with expected outcome/investment/timeline/risks for each, recommended strategy with clear reasoning, top 5 priority initiatives for next 90 days ranked, resource requirements (people/money/tools), decision framework matrix, and "1-hour brief" with single most important insight and action.',
    type: 'text',
    category: 'competitive',
    description: 'McKinsey senior partner strategic synthesis',
    examples: ['Current: Strong product-market fit SMB (20M users), weak enterprise. Options: A) Optimize SMB (€5M, 12mo, +25%), B) Balanced SMB+Enterprise (€15M, 18mo, +45%), C) Enterprise pivot (€30M, 24mo, +80%). Recommend: B. Priority 1: Launch enterprise tier Q2'],
  },
];

/**
 * Get templates by category.
 */
export function getTemplatesByCategory(category: MatrixColumnTemplate['category']): MatrixColumnTemplate[] {
  return COLUMN_TEMPLATES.filter(t => t.category === category);
}

/**
 * Search templates by keyword.
 */
export function searchTemplates(query: string): MatrixColumnTemplate[] {
  const lowerQuery = query.toLowerCase();
  return COLUMN_TEMPLATES.filter(t =>
    t.label.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.prompt.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get template by ID.
 */
export function getTemplateById(id: string): MatrixColumnTemplate | undefined {
  return COLUMN_TEMPLATES.find(t => t.id === id);
}

/**
 * Get suggested templates for a specific node based on context.
 * Returns template IDs that are most relevant for the given node.
 */
export function getSuggestedTemplatesForNode(nodeId: string): string[] {
  // Special suggestions for n2b (Retail Market Share & Dynamics UK/EU)
  if (nodeId === 'n2b') {
    return ['uk_retail_market_share', 'customer_acquisition_trend'];
  }

  // Default suggestions (can be extended for other nodes)
  return [];
}
