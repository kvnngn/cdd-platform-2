import { WorkstreamNode, ScopingAnswers, ProjectTemplate } from '@/types';

// ─── Children by axis ─────────────────────────────────────────────────────────

const AXIS_CHILDREN: Record<string, string[]> = {
  // SaaS B2B
  'Market & Dynamics': ['Market Size & Growth', 'Drivers & Macro Risks', 'Segmentation'],
  'Competition & Positioning': ['Competitive Mapping', 'Barriers to Entry', 'Market Shares'],
  'Clients & Retention': ['Retention Metrics (NRR / Churn)', 'Concentration & Customer Base Quality', 'Satisfaction & NPS'],
  'Pricing & Unit Economics': ['Pricing Structure', 'LTV / CAC', 'Industry Benchmarks'],
  'Go-to-Market & Expansion': ['Sales Pipeline', 'Geographic Potential', 'Partnerships & Channels'],
  'Technology & Product': ['Product Roadmap', 'Technical Debt', 'Differentiation & Moats'],
  'Management Team': ['Profile & Track Record', 'Team Retention', 'Succession Plan'],

  // Industrial
  'Value Chain': ['Vertical Integration', 'Key Production Steps', 'Value Added per Link'],
  'Regulation & Compliance': ['Current Regulatory Framework', 'Regulatory Changes', 'Non-Compliance Risks'],
  'Capex & Investments': ['Short-Term Capex Needs', 'Growth Capex', 'Depreciation & Profitability'],
  'Supply Chain & Suppliers': ['Supplier Concentration', 'Disruption Risks', 'Alternatives & Substitutes'],
  'Clients & Contracts': ['Customer Base Profile', 'Contract Duration & Quality', 'Customer Loss Risk'],

  // Retail
  'Distribution & Channels': ['Physical Channels', 'Digital Channels', 'Multi-Channel Management'],
  'Brand & Positioning': ['Awareness & Perception', 'Differentiation vs Competitors', 'Positioning Evolution'],
  'E-commerce & Digital': ['E-commerce Performance', 'Data & CRM Strategy', 'Digital Acquisition'],
  'Pricing & Margins': ['Price Structure', 'Margins by Channel', 'Promotional Policy'],
  'Seasonality': ['Seasonal Exposure', 'Inventory Management', 'Revenue Smoothing'],

  // Generic
  'Finance & Valuation': ['Revenue Structure', 'Profitability & Margins', 'Valuation Multiples'],
  'Operations': ['Operational Efficiency', 'Operational KPIs', 'Process Scalability'],
  'Competition': ['Competitive Mapping', 'Competitive Advantages', 'Competitive Intensity'],
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
    ? `${clientName} Investment Thesis`
    : "Investment Thesis";
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

  // Extra node for white space
  if (whiteSpace) {
    const label = whiteSpace.length > 50 ? whiteSpace.slice(0, 50) + '…' : whiteSpace;
    const extraId = `${prefix}-nwb`;
    nodes.push(makeNode(extraId, projectId, rootId, `White Space: ${label}`, 1, selectedAxes.length + 1, projectDeadline));
  }

  return nodes;
}

function getGrandchildren(axis: string, parentTitle: string): string[] {
  const map: Record<string, string[]> = {
    'Market Size & Growth': ['TAM / SAM / SOM', 'Historical CAGR & Projection', 'Sources & Reliability'],
    'Retention Metrics (NRR / Churn)': ['NRR by Cohort', 'Gross vs Net Churn', 'Industry Benchmarks'],
    'Competitive Mapping': ['Direct Players', 'Indirect Players', 'Potential Entrants'],
    'Pricing Structure': ['Pricing Models', 'Price Evolution', 'Client Price Sensitivity'],
    'Sales Pipeline': ['Sales Cycle', 'Conversion Rate', 'Revenue Forecasts'],
  };
  return map[parentTitle] ?? [];
}
