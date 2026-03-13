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
