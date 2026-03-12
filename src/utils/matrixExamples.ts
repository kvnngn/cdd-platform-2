/**
 * Get contextual examples for matrix scope prompts based on node title.
 * Uses pattern matching to provide relevant examples specific to the workstream node.
 */
export function getContextualExamples(nodeTitle: string): string[] {
  const lowercaseTitle = nodeTitle.toLowerCase();

  // Pattern matching basé sur le titre du node
  if (lowercaseTitle.includes('taille') && lowercaseTitle.includes('croissance')) {
    return [
      'taille du marché et projections de croissance',
      'études de marché et sizing du TAM/SAM/SOM',
      'tendances de croissance historiques et forecasts',
      'analyses de parts de marché et évolution',
    ];
  }

  if (lowercaseTitle.includes('concurr') || lowercaseTitle.includes('compétit')) {
    return [
      'unit economics et modèles tarifaires des concurrents',
      'positionnement et stratégies de différenciation',
      'forces et faiblesses concurrentielles',
      'parts de marché et trajectoires de croissance',
    ];
  }

  if (lowercaseTitle.includes('driver') || lowercaseTitle.includes('risque')) {
    return [
      'drivers de croissance et catalyseurs du marché',
      'risques macro-économiques et réglementaires',
      'barrières à l\'entrée et facteurs de succès',
      'tendances technologiques et disruptions',
    ];
  }

  if (lowercaseTitle.includes('client') || lowercaseTitle.includes('customer') || lowercaseTitle.includes('rétention')) {
    return [
      'profils et segmentation clients',
      'métriques de rétention et NRR',
      'customer lifetime value et CAC',
      'satisfaction client et NPS',
    ];
  }

  if (lowercaseTitle.includes('produit') || lowercaseTitle.includes('product')) {
    return [
      'roadmap produit et features clés',
      'différenciation et avantages compétitifs',
      'adoption et usage des fonctionnalités',
      'feedback utilisateurs et améliorations',
    ];
  }

  if (lowercaseTitle.includes('financ') || lowercaseTitle.includes('économ') || lowercaseTitle.includes('pricing')) {
    return [
      'unit economics et rentabilité',
      'structure de coûts et marges',
      'investissements et levées de fonds',
      'KPIs financiers et projections',
    ];
  }

  if (lowercaseTitle.includes('marché') || lowercaseTitle.includes('market') || lowercaseTitle.includes('dynamique')) {
    return [
      'taille de marché et dynamiques sectorielles',
      'tendances et évolution du marché',
      'segmentation et opportunités',
      'analyses de croissance et forecasts',
    ];
  }

  if (lowercaseTitle.includes('go-to-market') || lowercaseTitle.includes('expansion') || lowercaseTitle.includes('commercial')) {
    return [
      'stratégies d\'acquisition et go-to-market',
      'pipeline commercial et conversion',
      'expansion géographique et internationalization',
      'canaux de distribution et partenariats',
    ];
  }

  // Exemples par défaut si pas de match
  return [
    'analyses et insights clés sur ce sujet',
    'données quantitatives et benchmarks',
    'tendances et évolutions récentes',
    'stratégies et recommandations',
  ];
}
