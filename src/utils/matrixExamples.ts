/**
 * Get contextual examples for matrix scope prompts based on node title.
 * Uses pattern matching to provide relevant examples specific to the workstream node.
 */
export function getContextualExamples(nodeTitle: string): string[] {
  const lowercaseTitle = nodeTitle.toLowerCase();

  // Specific pattern for Retail Market Share node
  if (lowercaseTitle.includes('retail market share') || lowercaseTitle.includes('2.2')) {
    return [
      'EU retail market share and customer acquisition trends for Revolut vs. Neobanks',
    ];
  }

  // Pattern matching based on node title
  if ((lowercaseTitle.includes('size') || lowercaseTitle.includes('market')) && lowercaseTitle.includes('growth')) {
    return [
      'market size and growth projections',
      'market research and TAM/SAM/SOM sizing',
      'historical growth trends and forecasts',
      'market share analysis and evolution',
    ];
  }

  if (lowercaseTitle.includes('compet') || lowercaseTitle.includes('rival')) {
    return [
      'unit economics and competitor pricing models',
      'positioning and differentiation strategies',
      'competitive strengths and weaknesses',
      'market share and growth trajectories',
    ];
  }

  if (lowercaseTitle.includes('driver') || lowercaseTitle.includes('risk')) {
    return [
      'growth drivers and market catalysts',
      'macroeconomic and regulatory risks',
      'barriers to entry and success factors',
      'technology trends and disruptions',
    ];
  }

  if (lowercaseTitle.includes('client') || lowercaseTitle.includes('customer') || lowercaseTitle.includes('retention')) {
    return [
      'customer profiles and segmentation',
      'retention metrics and NRR',
      'customer lifetime value and CAC',
      'customer satisfaction and NPS',
    ];
  }

  if (lowercaseTitle.includes('product')) {
    return [
      'product roadmap and key features',
      'differentiation and competitive advantages',
      'feature adoption and usage',
      'user feedback and improvements',
    ];
  }

  if (lowercaseTitle.includes('financ') || lowercaseTitle.includes('econom') || lowercaseTitle.includes('pricing')) {
    return [
      'unit economics and profitability',
      'cost structure and margins',
      'investments and fundraising',
      'financial KPIs and projections',
    ];
  }

  if (lowercaseTitle.includes('market') || lowercaseTitle.includes('dynamic')) {
    return [
      'market size and industry dynamics',
      'market trends and evolution',
      'segmentation and opportunities',
      'growth analysis and forecasts',
    ];
  }

  if (lowercaseTitle.includes('go-to-market') || lowercaseTitle.includes('expansion') || lowercaseTitle.includes('sales')) {
    return [
      'acquisition strategies and go-to-market',
      'sales pipeline and conversion',
      'geographic expansion and internationalization',
      'distribution channels and partnerships',
    ];
  }

  // Default examples if no match
  return [
    'key analyses and insights on this topic',
    'quantitative data and benchmarks',
    'recent trends and developments',
    'strategies and recommendations',
  ];
}
