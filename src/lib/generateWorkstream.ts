import { WorkstreamNode, ScopingAnswers, ProjectTemplate } from '../types';

// ─── Enfants par axe ─────────────────────────────────────────────────────────

const AXIS_CHILDREN: Record<string, string[]> = {
  // SaaS B2B
  'Marché & Dynamiques': ['Taille & Croissance du Marché', 'Drivers & Risques Macro', 'Segmentation'],
  'Compétition & Positionnement': ['Mapping Concurrentiel', "Barrières à l'Entrée", 'Parts de Marché'],
  'Clients & Rétention': ['Métriques de Rétention (NRR / Churn)', 'Concentration & Qualité Base Clients', 'Satisfaction & NPS'],
  'Pricing & Unit Economics': ['Structure de Pricing', 'LTV / CAC', 'Benchmarks Sectoriels'],
  'Go-to-Market & Expansion': ['Pipeline Commercial', 'Potentiel Géographique', 'Partenariats & Canaux'],
  'Technologie & Produit': ['Roadmap Produit', 'Dette Technique', 'Différenciation & Moats'],
  'Équipe dirigeante': ['Profil & Track Record', "Rétention de l'Équipe", 'Plan de Succession'],

  // Industrial
  'Chaîne de valeur': ["Intégration Verticale", "Étapes Clés de Production", "Valeur Ajoutée par Maillon"],
  'Réglementation & Conformité': ['Cadre Réglementaire Actuel', 'Évolutions Réglementaires', 'Risques de Non-Conformité'],
  'Capex & Investissements': ['Besoins Capex Court Terme', 'Capex de Croissance', 'Amortissements & Rentabilité'],
  'Supply chain & Fournisseurs': ['Concentration Fournisseurs', 'Risques de Disruption', 'Alternatives & Substituts'],
  'Clients & Contrats': ['Profil de la Base Clients', 'Durée & Qualité Contrats', 'Risque de Perte de Clients'],

  // Retail
  'Distribution & Canaux': ['Canaux Physiques', 'Canaux Digitaux', 'Gestion Multi-Canal'],
  'Marque & Positionnement': ['Notoriété & Perception', 'Différenciation vs Concurrents', 'Évolution du Positionnement'],
  'E-commerce & Digital': ['Performance E-commerce', 'Stratégie Data & CRM', 'Acquisition Digitale'],
  'Pricing & Marges': ['Structure de Prix', 'Marges par Canal', 'Politique Promotionnelle'],
  'Saisonnalité': ['Exposition Saisonnière', 'Gestion des Stocks', 'Lissage du Revenu'],

  // Generic
  'Finances & Valorisation': ['Structure de Revenus', 'Rentabilité & Marges', 'Multiples de Valorisation'],
  'Opérations': ["Efficacité Opérationnelle", "KPIs Opérationnels", "Scalabilité des Process"],
  'Compétition': ['Mapping Concurrentiel', "Avantages Compétitifs", 'Intensité Concurrentielle'],
};

// ─── Génération ──────────────────────────────────────────────────────────────

function makeNode(
  id: string,
  projectId: string,
  parentId: string | null,
  title: string,
  level: number,
  order: number,
  deadline: string,
): WorkstreamNode {
  return {
    id,
    projectId,
    parentId,
    title,
    description: '',
    level,
    order,
    status: 'not_started',
    assigneeId: null,
    deadline,
    deadlineStatus: 'ok',
    coverageScore: 0,
    sourceCount: 0,
    hypothesisCount: 0,
    validatedCount: 0,
  };
}

export function generateWorkstream(
  projectId: string,
  template: ProjectTemplate,
  answers: ScopingAnswers,
  projectDeadline: string,
  clientName?: string,
): WorkstreamNode[] {
  const nodes: WorkstreamNode[] = [];
  const prefix = `${projectId}-ws`;

  // Determine depth from answers
  const depthAnswer = (answers['q3'] as string) ?? '';
  const isRapide = depthAnswer.startsWith('Rapide');
  const isApprofondi = depthAnswer.startsWith('Approfondi');

  // Determine selected axes
  let selectedAxes: string[] = [];
  if (template === 'custom') {
    // Custom: free text split by newline
    const rawAxes = answers['q1'] as string ?? '';
    selectedAxes = rawAxes
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    selectedAxes = (answers['q1'] as string[]) ?? [];
  }

  // Whitespace / zone blanche (last question is always text for most templates)
  const whiteSpaceKey = template === 'saas_b2b' ? 'q5' : 'q4';
  const whiteSpace = (answers[whiteSpaceKey] as string ?? '').trim();

  // Root node (level 0)
  const rootTitle = clientName
    ? `Thèse d'investissement ${clientName}`
    : "Thèse d'investissement";
  const rootId = `${prefix}-n0`;
  nodes.push(makeNode(rootId, projectId, null, rootTitle, 0, 0, projectDeadline));

  // Level 1 nodes from selected axes
  selectedAxes.forEach((axis, idx) => {
    const nodeId = `${prefix}-n${idx + 1}`;
    nodes.push(makeNode(nodeId, projectId, rootId, axis, 1, idx + 1, projectDeadline));

    // Level 2 children (if not "Rapide")
    if (!isRapide) {
      const children = AXIS_CHILDREN[axis] ?? [];
      children.forEach((childTitle, childIdx) => {
        const childId = `${prefix}-n${idx + 1}-${childIdx + 1}`;
        nodes.push(makeNode(childId, projectId, nodeId, childTitle, 2, childIdx + 1, projectDeadline));

        // Level 3 (only for "Approfondi" and key axes)
        if (isApprofondi && childIdx === 0) {
          const grandchildren = getGrandchildren(axis, childTitle);
          grandchildren.forEach((gcTitle, gcIdx) => {
            const gcId = `${prefix}-n${idx + 1}-${childIdx + 1}-${gcIdx + 1}`;
            nodes.push(makeNode(gcId, projectId, childId, gcTitle, 3, gcIdx + 1, projectDeadline));
          });
        }
      });
    }
  });

  // Extra node for white space / zone blanche
  if (whiteSpace) {
    const label = whiteSpace.length > 50 ? whiteSpace.slice(0, 50) + '…' : whiteSpace;
    const extraId = `${prefix}-nwb`;
    nodes.push(makeNode(extraId, projectId, rootId, `Zone blanche : ${label}`, 1, selectedAxes.length + 1, projectDeadline));
  }

  return nodes;
}

function getGrandchildren(axis: string, parentTitle: string): string[] {
  const map: Record<string, string[]> = {
    'Taille & Croissance du Marché': ['TAM / SAM / SOM', 'CAGR Historique & Projection', 'Sources & Fiabilité'],
    'Métriques de Rétention (NRR / Churn)': ['NRR par Cohorte', 'Churn Gross vs Net', 'Benchmarks Sectoriels'],
    'Mapping Concurrentiel': ['Acteurs Directs', 'Acteurs Indirects', 'Entrants Potentiels'],
    'Structure de Pricing': ['Modèles de Tarification', 'Évolution des Prix', 'Sensibilité Prix Client'],
    'Pipeline Commercial': ['Cycle de Vente', "Taux de Conversion", 'Prévisions de Revenus'],
  };
  return map[parentTitle] ?? [];
}
