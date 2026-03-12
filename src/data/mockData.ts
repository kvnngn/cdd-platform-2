import { Project, WorkstreamNode, Source, ResearchSynthesis, Hypothesis, HypothesisSource, Alert, ActivityLog, ConnectorConfig, MatrixColumn, MatrixCell } from '../types';

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'DD DataSense — Nordic Capital Acquisition',
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
  {
    id: 'p2',
    name: 'DD Nexova — Industrial Sale',
    client: 'Nexova Industries',
    acquirer: 'Wendel Group',
    status: 'in_review',
    template: 'industrial',
    deadline: '2026-03-12',
    createdAt: '2026-01-15',
    updatedAt: '2026-03-01',
    members: ['u1', 'u5', 'u2'],
    managerId: 'u5',
    description: 'DD of a tier-2 automotive supplier specialized in thermal management.',
    sector: 'Industrial / Automotive',
    dealSize: '€340M',
  },
  {
    id: 'p3',
    name: 'DD MediCloud — Series C',
    client: 'MediCloud SA',
    acquirer: 'Sofina Ventures',
    status: 'delivered',
    template: 'saas_b2b',
    deadline: '2026-02-20',
    createdAt: '2025-12-01',
    updatedAt: '2026-02-20',
    members: ['u5', 'u3', 'u4'],
    managerId: 'u5',
    description: 'DD of a SaaS platform for medical records management for private clinics.',
    sector: 'HealthTech / SaaS',
    dealSize: '€55M',
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
    excerpt: 'Retail analytics platform market will reach $8.4B in 2028 (CAGR 19%). Verticalized solutions capture 34% of the market.',
    reliabilityScore: 88,
    content: `GARTNER MARKET GUIDE: RETAIL ANALYTICS PLATFORMS 2025\n\nMARKET DEFINITION\n\nRetail analytics platforms provide comprehensive data analysis and visualization capabilities specifically designed for retail operations, including inventory management, customer behavior analysis, pricing optimization, and supply chain visibility.\n\nMARKET SIZE & GROWTH\n\nTotal Addressable Market (TAM):\n- 2024: $4,2B\n- 2025: $5,0B\n- 2026: $6,0B\n- 2027: $7,2B\n- 2028: $8,4B (forecast)\n\nCompound Annual Growth Rate (CAGR): 19% (2024-2028)\n\nSEGMENTATION BY SOLUTION TYPE:\n\n1. Generalist Analytics (66% of market):\n   - Tableau, Power BI, Looker\n   - Require significant customization\n   - CAGR: 15%\n\n2. Verticalized Retail Solutions (34% of market):\n   - Purpose-built for retail use cases\n   - Pre-configured retail KPIs\n   - Faster implementation\n   - CAGR: 23%\n\nREGIONAL BREAKDOWN:\n- North America: 42%\n- Europe: 31%\n- Asia-Pacific: 22%\n- Rest of world: 5%\n\nKEY TRENDS:\n- Shift toward real-time analytics\n- AI/ML integration becoming standard\n- Cloud-native architecture preferred\n- API-first platforms gaining market share`,
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
  n3a: ['s1', 's5', 's11'],          // Retention Metrics (NRR / Churn)
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
    title: 'Drivers & Risques Macro',
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
    title: 'Retention Metrics (NRR / Churn)',
    description: 'Analysis of NRR, gross/net churn, cohort analysis.',
    level: 2,
    order: 1,
    status: 'complete',
    assigneeId: 'u2',
    deadline: '2026-03-13',
    deadlineStatus: 'ok',
    coverageScore: 95,
    sourceCount: 3,
    hypothesisCount: 2,
    validatedCount: 2,
    updatedAt: '2026-03-09T14:20:00Z',
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
    summary: 'DataSense retention metrics significantly outperform industry benchmarks. The 118% NRR demonstrates strong expansion capability within the existing customer base, while 6% gross churn remains well below the industry median (8-12% according to Forrester). Cohort stability over 3 years confirms the quality of client relationships.',
    keyPoints: [
      'NRR 118% vs industry median 105-110% (Forrester 2025)',
      'Gross churn: 6% annual — best quartile of the sector',
      'Negative net retention: revenue from existing clients grows faster than churn',
      'Average contract length: 36 months, vs 18-24 months for comparables',
      'Average NPS 67: excellent for B2B, sign of strong product-market fit',
    ],
    sources: [SOURCES[0], SOURCES[4], SOURCES[10]],
    lastUpdated: '2026-03-02T09:15:00Z',
    coverageScore: 95,
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
    nodeId: 'n1',
    title: 'The retail analytics market supports a 15-19% CAGR through 2028',
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
      { sourceId: 's6', excerpt: 'Technology spending in European retail is growing 16% YoY. Analytics and AI now represent 28% of the digital budget for retailers >€500M revenue.', addedBy: 'u2', addedAt: '2026-02-22T11:00:00Z' },
      { sourceId: 's4', excerpt: 'DataSense cited among the top 5 vendors to watch in B2B retail analytics. Growth estimated at +40% in 2025 according to industry sources.', addedBy: 'u2', addedAt: '2026-02-24T09:00:00Z', note: 'Press source — lower reliability (62%), to be used for illustration only.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h2', type: 'supports' },
      { hypothesisId: 'h5', type: 'supports' },
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
        changeNote: 'Version initiale',
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
  },
  {
    id: 'h2',
    projectId: 'p1',
    nodeId: 'n1',
    title: 'DataSense operates in the most dynamic market segment (verticalized solutions)',
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
    ],
    tags: ['market', 'positioning', 'vertical'],
    comments: [],
    versions: [
      {
        version: 1,
        content: 'DataSense operates in the most dynamic market segment (verticalized solutions).',
        changedBy: 'u2',
        changedAt: '2026-02-21T11:00:00Z',
        changeNote: 'Version initiale',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-21', score: 60, event: 'Created' },
      { date: '2026-02-24', score: 72, event: 'DataSense source added' },
      { date: '2026-03-01', score: 79, event: 'Validated — Manager' },
    ],
  },
  {
    id: 'h3',
    projectId: 'p1',
    nodeId: 'n3a',
    title: 'Le NRR de 118% confirme un fort pouvoir d\'expansion dans la base clients',
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
        changeNote: 'Version initiale',
      },
    ],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-22', score: 78, event: 'Created' },
      { date: '2026-02-25', score: 85, event: 'Forrester benchmark' },
      { date: '2026-03-02', score: 90, event: 'Validated — Manager' },
    ],
  },
  {
    id: 'h4',
    projectId: 'p1',
    nodeId: 'n3a',
    title: 'The 6% gross churn places DataSense in the best industry quartile',
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
  },
  {
    id: 'h5',
    projectId: 'p1',
    nodeId: 'n3b',
    title: 'Revenue concentration (top 10 clients = 38% ARR) represents a moderate risk',
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
      { sourceId: 's1', excerpt: 'Top 10 customers: 38% of ARR (vs 46% in 2023). Average contract value: €127K. Contract length: 36 months average.', addedBy: 'u2', addedAt: '2026-02-24T10:00:00Z', note: 'Chiffre officiel data room — la tendance de désconcentration est positive.' },
      { sourceId: 's5', excerpt: 'Concentration clients médiane SaaS B2B mid-market : top 10 = 35-45% ARR. Un ratio > 50% est considéré comme risque élevé par les acquéreurs PE.', addedBy: 'u2', addedAt: '2026-02-27T09:00:00Z', note: 'Forrester benchmark confirme que DataSense est dans la norme.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h6', type: 'nuances' },
    ],
    tags: ['concentration', 'risque', 'clients'],
    comments: [],
    versions: [],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-24', score: 70, event: 'Création' },
      { date: '2026-03-01', score: 82, event: 'Validée — Manager' },
    ],
  },
  {
    id: 'h6',
    projectId: 'p1',
    nodeId: 'n3b',
    title: 'Le risque de départ de grands comptes est limité par les switching costs élevés',
    body: 'Les coûts de migration estimés à plus de 2M€ pour les grands comptes (source: interview CDO Carrefour) constituent une barrière à la sortie significative. Les 34 connecteurs natifs de DataSense créent une dépendance opérationnelle qui limite le risque de churns massifs, même en cas d\'insatisfaction partielle.',
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
      { sourceId: 's7', excerpt: '"Les coûts de migration sont colossaux. On parle de 18 à 24 mois de projet et minimum 2M€ pour un acteur de notre taille. Ce n\'est pas réaliste de changer de solution." — CDO, Carrefour France (interview terrain, 28/02/2026)', addedBy: 'u3', addedAt: '2026-02-28T16:00:00Z', note: 'Interview client clé — verbatim direct. Très fort pour le rapport.' },
      { sourceId: 's8', excerpt: 'DataSense propose 34 connecteurs natifs (ERP, WMS, e-commerce, PoS). Aucun concurrent direct ne dépasse 15 connecteurs sur ce segment.', addedBy: 'u3', addedAt: '2026-03-01T09:00:00Z' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h5', type: 'supports' },
    ],
    tags: ['switching-costs', 'lock-in', 'risque'],
    comments: [],
    versions: [],
    includedInReport: true,
    confidenceHistory: [
      { date: '2026-02-26', score: 65, event: 'Création' },
      { date: '2026-03-01', score: 81, event: 'Interview Carrefour intégrée' },
    ],
  },
  {
    id: 'h7',
    projectId: 'p1',
    nodeId: 'n2a',
    title: 'DataSense est le seul acteur SaaS verticalisé francophone dans son segment',
    body: 'L\'analyse compétitive révèle que DataSense occupe une position de leader sans concurrent direct sur le segment des solutions SaaS retail analytics verticalisées en langue française. Tableau et Power BI sont trop généralistes, Dunnhumby est centré groceries UK, Symphony RetailAI est US-centric. Cette absence de concurrent direct est un facteur de différenciation fort.',
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
      { sourceId: 's8', excerpt: 'Scan de marché Q1 2026 : aucun acteur SaaS pur-play francophone identifié sur le segment retail analytics B2B mid-market (<50M€ ARR). Tableau et Power BI positionnés comme généralistes, non verticalisés.', addedBy: 'u3', addedAt: '2026-02-28T15:00:00Z', note: 'Source interne (data room) — à valider impérativement avec une source externe indépendante.' },
    ] as HypothesisSource[],
    relations: [],
    tags: ['compétition', 'positioning', 'moat'],
    comments: [
      {
        id: 'c3',
        authorId: 'u1',
        content: 'À valider avec une source externe indépendante. La data room est potentiellement biaisée sur ce point.',
        createdAt: '2026-03-01T12:00:00Z',
        resolved: false,
      }
    ],
    versions: [],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-02-28', score: 60, event: 'Création' },
      { date: '2026-03-01', score: 70, event: 'Source data room enrichie' },
    ],
  },
  {
    id: 'h8',
    projectId: 'p1',
    nodeId: 'n1b',
    title: 'La compression des multiples SaaS en 2025-2026 pèse sur la valorisation',
    body: 'Bloomberg Intelligence signale une compression des multiples SaaS mid-market: médiane NTM EV/Revenue à 6,1x en février 2026, contre 7,8x en H1 2025. Cette tendance remet en question le multiple de 8x ARR envisagé par Nordic Capital. Il convient d\'analyser si DataSense peut justifier une prime sur ses comparables compte tenu de sa surperformance opérationnelle.',
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
      { sourceId: 's9', excerpt: 'Bloomberg Intelligence SaaS Valuation Monitor — Février 2026 : médiane NTM EV/Revenue SaaS mid-market = 6,1x (vs 7,8x en H1 2025). Compression significative liée à la remontée des taux.', addedBy: 'u4', addedAt: '2026-03-01T10:00:00Z', note: 'En attente des données CapitalIQ actualisées pour valider cette tendance sur les comparables retail analytics.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h1', type: 'nuances' },
    ],
    tags: ['valorisation', 'multiples', 'risque-macro'],
    comments: [
      {
        id: 'c4',
        authorId: 'u1',
        content: 'En attente des données CapitalIQ actualisées pour valider ou infirmer cette hypothèse. On hold jusqu\'à réception.',
        createdAt: '2026-03-03T09:30:00Z',
        resolved: false,
      }
    ],
    versions: [],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-03-01', score: 68, event: 'Création' },
      { date: '2026-03-03', score: 73, event: 'Bloomberg data intégrée — On Hold' },
    ],
  },
  {
    id: 'h9',
    projectId: 'p1',
    nodeId: 'n4',
    title: 'Le pricing de DataSense est premium mais reste dans la norme sectorielle',
    body: 'Le prix moyen par siège de DataSense (1 200€/an) est positionné 15% au-dessus de la médiane sectorielle. Cet écart est justifié par la verticalisation de la solution et le niveau d\'intégration (34 connecteurs). Les entretiens clients indiquent une perception de valeur supérieure au prix : 7 clients sur 8 interviewés estiment le ROI positif en moins de 12 mois. Cependant, la pression à la renégociation augmente chez les mid-market (<100 sièges) depuis H2 2025.',
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
      { sourceId: 's1', excerpt: 'Average contract value: €127K (≈ 1 200€/siège/an sur la base d\'une licence 106 sièges en moyenne). Mix revenue : 78% licences récurrentes, 22% services.', addedBy: 'u3', addedAt: '2026-03-04T09:00:00Z', note: 'Pricing confirmé data room.' },
      { sourceId: 's7', excerpt: '"On renégocie tous les 3 ans. Le prix est élevé mais on ne peut pas partir facilement. Si le ROI reste là, on renouvelle." — Directeur Achat, Fnac-Darty (interview 01/03/2026)', addedBy: 'u3', addedAt: '2026-03-04T14:00:00Z', note: 'Tension sur le pricing visible — à intégrer dans le raisonnement.' },
    ] as HypothesisSource[],
    relations: [
      { hypothesisId: 'h6', type: 'nuances' },
    ],
    tags: ['pricing', 'unit-economics', 'benchmark'],
    comments: [],
    versions: [
      {
        version: 1,
        content: 'Le pricing de DataSense est premium mais reste dans la norme sectorielle.',
        changedBy: 'u3',
        changedAt: '2026-03-04T09:00:00Z',
        changeNote: 'Version initiale',
      },
    ],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-03-04', score: 68, event: 'Création' },
      { date: '2026-03-04', score: 75, event: 'Interviews intégrées' },
    ],
  },
  {
    id: 'h10',
    projectId: 'p1',
    nodeId: 'n5',
    title: 'L\'équipe dirigeante a les compétences pour exécuter la phase d\'internationalisation',
    body: 'Le CEO (Nicolas Bertrand, ex-Dassault Systèmes) et le CPO (Sarah Chen, ex-Salesforce EMEA) ont tous deux une expérience significative à l\'international. L\'organisation compte 12 personnes ayant déjà travaillé dans un contexte de scale-up européen. Le plan d\'expansion présenté est réaliste : 3 marchés cibles (Espagne, Belgique, Pays-Bas) à horizon 18 mois, avec une go-to-market strategy basée sur des partenaires locaux. Point de vigilance : le CFO est en poste depuis seulement 4 mois.',
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
      { sourceId: 's8', excerpt: 'Équipe dirigeante DataSense : CEO Nicolas Bertrand (15 ans d\'expérience SaaS B2B, ex-VP Sales Dassault Systèmes EMEA). CPO Sarah Chen (ex-Head of Product Salesforce EMEA). CFO Pierre Dumont (en poste depuis novembre 2025).', addedBy: 'u2', addedAt: '2026-03-05T10:00:00Z', note: 'CV confirment l\'expérience internationale.' },
      { sourceId: 's10', excerpt: '"L\'équipe a clairement la capacité d\'aller en Europe. Le playbook est solide. Ce que je surveille c\'est la capacité d\'exécution avec un CFO nouveau." — Avis expert call, ex-DG Axway (28/02/2026)', addedBy: 'u2', addedAt: '2026-03-05T14:00:00Z', note: 'Expert call — nuance importante sur le CFO à mentionner dans le rapport.' },
    ] as HypothesisSource[],
    relations: [],
    tags: ['management', 'internationalisation', 'exécution'],
    comments: [],
    versions: [
      {
        version: 1,
        content: 'L\'équipe dirigeante a les compétences pour exécuter la phase d\'internationalisation.',
        changedBy: 'u2',
        changedAt: '2026-03-05T10:00:00Z',
        changeNote: 'Version initiale',
      },
    ],
    includedInReport: false,
    confidenceHistory: [
      { date: '2026-03-05', score: 65, event: 'Création' },
      { date: '2026-03-05', score: 72, event: 'Expert call intégré' },
    ],
  },
];

// ─── ALERTS ──────────────────────────────────────────────────────────────────

export const ALERTS: Alert[] = [
  {
    id: 'a1',
    projectId: 'p1',
    type: 'on_hold',
    severity: 'medium',
    title: 'H8 — En attente de recoupement',
    description: 'L\'hypothèse sur la compression des multiples SaaS est en attente d\'une source Bloomberg actualisée. Nordic Capital a besoin de cette analyse pour finaliser la valorisation.',
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
    title: 'Source Bloomberg H1 2025 — Données obsolètes',
    description: 'Les données Bloomberg sur les multiples SaaS (H1 2025) sont désormais remplacées par les données Feb 2026. L\'hypothèse H8 doit être mise à jour.',
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
    title: 'Contradiction — Pricing power vs. avis clients négatifs',
    description: 'H7 (positionnement unique) s\'appuie sur la data room, mais les avis G2 mentionnent un "pricing opaque" susceptible de générer de l\'insatisfaction. Ces deux éléments nécessitent une réconciliation.',
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
    title: 'H3 — NRR confirmé par benchmark Forrester',
    description: 'Le NRR de 118% est renforcé par le benchmark Forrester 2025. L\'hypothèse H3 peut être considérée comme hautement fiable.',
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
    action: 'Création du projet',
    actor: 'Alexandre Moreau',
    actorId: 'u1',
    targetType: 'project',
    targetId: 'p1',
    targetName: 'CDD DataSense — Acquisition Nordic Capital',
    timestamp: '2026-02-10T09:00:00Z',
  },
  {
    id: 'log2',
    projectId: 'p1',
    action: 'Ajout hypothèse',
    actor: 'Sophie Leclerc',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1 — CAGR marché 15-19%',
    timestamp: '2026-02-20T10:00:00Z',
  },
  {
    id: 'log3',
    projectId: 'p1',
    action: 'Validation hypothèse',
    actor: 'Alexandre Moreau',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1 — CAGR marché 15-19%',
    timestamp: '2026-02-28T16:00:00Z',
    detail: 'Statut → Validated',
  },
  {
    id: 'log4',
    projectId: 'p1',
    action: 'Modification hypothèse',
    actor: 'Sophie Leclerc',
    actorId: 'u2',
    targetType: 'hypothesis',
    targetId: 'h1',
    targetName: 'H1 — CAGR marché 15-19%',
    timestamp: '2026-02-28T14:30:00Z',
    detail: 'Corps modifié — source IDC ajoutée',
  },
  {
    id: 'log5',
    projectId: 'p1',
    action: 'Ajout hypothèse',
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
    action: 'Validation hypothèse',
    actor: 'Alexandre Moreau',
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
    action: 'Dépréciation source',
    actor: 'Système',
    actorId: 'system',
    targetType: 'hypothesis',
    targetId: 'h8',
    targetName: 'H8 — Compression multiples',
    timestamp: '2026-03-02T16:00:00Z',
    detail: 'Source Bloomberg H1 2025 → remplacée par données Feb 2026',
  },
  {
    id: 'log8',
    projectId: 'p1',
    action: 'Ajout hypothèse',
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
    detail: 'En attente source Bloomberg actualisée',
  },
  {
    id: 'log10',
    projectId: 'p1',
    action: 'Ajout hypothèse',
    actor: 'Thomas Blanc',
    actorId: 'u3',
    targetType: 'hypothesis',
    targetId: 'h6',
    targetName: 'H6 — Switching costs élevés',
    timestamp: '2026-02-26T11:00:00Z',
  },
  {
    id: 'log11',
    projectId: 'p1',
    action: 'Validation hypothèse',
    actor: 'Alexandre Moreau',
    actorId: 'u1',
    targetType: 'hypothesis',
    targetId: 'h6',
    targetName: 'H6 — Switching costs élevés',
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

import { MatrixScope } from '../types/matrix';

// Matrix Scopes — Define research scope for matrix analysis
export const MATRIX_SCOPES: MatrixScope[] = [
  {
    id: 'scope-n1a',
    nodeId: 'n1a', // Taille & Croissance du Marché
    scopePrompt: 'taille du marché SaaS analytics et projections de croissance 2024-2028',
    discoveredSourceIds: ['s2', 's6', 's4'], // Gartner, IDC, Les Echos
    createdBy: 'u1',
    createdAt: '2025-01-10T09:30:00Z',
    updatedAt: '2025-01-10T09:30:00Z',
  },
];

// Matrix Columns — Questions/prompts applied to all sources in scope
export const MATRIX_COLUMNS: MatrixColumn[] = [
  // ===== SCOPE N1A — Taille & Croissance du Marché =====

  // Colonne Synthèse (auto-générée)
  {
    id: 'col-n1a-synthese',
    matrixScopeId: 'scope-n1a',
    label: 'Synthèse',
    prompt: 'Résume les points clés de ce document concernant la taille et la croissance du marché',
    type: 'text',
    order: 0,
    isSystemGenerated: true,
    createdBy: 'system',
    createdAt: '2025-01-10T09:30:00Z',
  },

  // Colonne TAM/SAM/SOM
  {
    id: 'col-n1a-tam',
    matrixScopeId: 'scope-n1a',
    label: 'TAM / SAM / SOM',
    prompt: 'Extraire les chiffres de taille de marché: TAM (Total Addressable Market), SAM (Serviceable Addressable Market), SOM (Serviceable Obtainable Market)',
    type: 'text',
    order: 1,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:35:00Z',
  },

  // Colonne CAGR
  {
    id: 'col-n1a-cagr',
    matrixScopeId: 'scope-n1a',
    label: 'CAGR 2024-2028',
    prompt: 'Extraire le taux de croissance annuel composé (CAGR) prévu pour la période 2024-2028',
    type: 'text',
    order: 2,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:36:00Z',
  },

  // Colonne Drivers de Croissance
  {
    id: 'col-n1a-drivers',
    matrixScopeId: 'scope-n1a',
    label: 'Drivers de Croissance',
    prompt: 'Lister les principaux moteurs de croissance du marché mentionnés',
    type: 'list',
    order: 3,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:37:00Z',
  },

  // Colonne Forecast 2028
  {
    id: 'col-n1a-forecast',
    matrixScopeId: 'scope-n1a',
    label: 'Forecast 2028',
    prompt: 'Extraire la projection de taille de marché pour 2028',
    type: 'text',
    order: 4,
    createdBy: 'u1',
    createdAt: '2025-01-10T09:38:00Z',
  },
];

// Matrix Cells — Individual cell values for the matrix grid
export const MATRIX_CELLS: MatrixCell[] = [
  // ===== GARTNER REPORT (s2) =====

  // Synthèse
  {
    id: 'cell-s2-synthese',
    columnId: 'col-n1a-synthese',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: 'Gartner prévoit une forte croissance du marché SaaS analytics, porté par l\'adoption accrue de solutions cloud-native et l\'essor de l\'IA générative. Le marché est segmenté en 3 catégories: descriptive analytics (45% du marché), predictive analytics (35%), et prescriptive analytics (20%). Les plateformes all-in-one gagnent des parts face aux solutions point.',
    status: 'done',
    generatedAt: '2025-01-10T09:31:00Z',
  },

  // TAM/SAM/SOM
  {
    id: 'cell-s2-tam',
    columnId: 'col-n1a-tam',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '• TAM: $47.2B (marché global analytics SaaS)\n• SAM: $12.3B (segment mid-market Europe)\n• SOM: $850M (DataSense addressable market)',
    status: 'done',
    generatedAt: '2025-01-10T09:35:00Z',
  },

  // CAGR
  {
    id: 'cell-s2-cagr',
    columnId: 'col-n1a-cagr',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '18.7% CAGR (2024-2028)\n\nVariation par segment:\n• Descriptive: 14.2%\n• Predictive: 22.5%\n• Prescriptive: 25.1%',
    status: 'done',
    generatedAt: '2025-01-10T09:36:00Z',
  },

  // Drivers
  {
    id: 'cell-s2-drivers',
    columnId: 'col-n1a-drivers',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '1. Adoption IA générative (+40% adoption en 2024)\n2. Migration cloud (85% entreprises en 2025)\n3. Demande self-service analytics\n4. Consolidation des stacks data\n5. Réglementations data privacy (GDPR, etc.)',
    status: 'done',
    generatedAt: '2025-01-10T09:37:00Z',
  },

  // Forecast 2028
  {
    id: 'cell-s2-forecast',
    columnId: 'col-n1a-forecast',
    sourceId: 's2',
    matrixScopeId: 'scope-n1a',
    value: '$89.4B en 2028\n\nPar région:\n• Amérique du Nord: $38.2B (43%)\n• Europe: $27.1B (30%)\n• APAC: $18.7B (21%)\n• RoW: $5.4B (6%)',
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
    value: 'IDC met l\'accent sur la transformation du marché vers des solutions embedded analytics et data democratization. Les PMEs représentent 58% de la croissance future. Le marché européen surperforme grâce aux investissements dans la souveraineté des données. IDC identifie 3 vagues d\'adoption: early adopters (15%), mainstream (60%), laggards (25%).',
    status: 'done',
    generatedAt: '2025-01-10T09:31:30Z',
  },

  // TAM/SAM/SOM
  {
    id: 'cell-s6-tam',
    columnId: 'col-n1a-tam',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '• TAM: $52.8B (IDC inclut adjacent markets)\n• SAM: $14.7B (Europe mid-market + SMBs)\n• SOM: $920M (focus français + Benelux)',
    status: 'done',
    generatedAt: '2025-01-10T09:35:30Z',
  },

  // CAGR
  {
    id: 'cell-s6-cagr',
    columnId: 'col-n1a-cagr',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '21.3% CAGR (2024-2028)\n\nPar type de déploiement:\n• Public cloud: 23.8%\n• Private cloud: 18.2%\n• Hybrid: 19.5%\n\nIDC plus optimiste que Gartner sur Europe.',
    status: 'done',
    generatedAt: '2025-01-10T09:36:30Z',
  },

  // Drivers
  {
    id: 'cell-s6-drivers',
    columnId: 'col-n1a-drivers',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '1. Data sovereignty & compliance (Europe focus)\n2. Embedded analytics dans SaaS verticaux\n3. Citizen data scientists (+150% en 2024)\n4. Real-time analytics demand\n5. Investissements data infrastructure',
    status: 'done',
    generatedAt: '2025-01-10T09:37:30Z',
  },

  // Forecast 2028
  {
    id: 'cell-s6-forecast',
    columnId: 'col-n1a-forecast',
    sourceId: 's6',
    matrixScopeId: 'scope-n1a',
    value: '$106.7B en 2028\n\nPar segment:\n• Enterprise (>1000 emp): $64.2B (60%)\n• Mid-market (100-1000): $32.0B (30%)\n• SMB (<100): $10.5B (10%)\n\nEurope: $32.8B (+21.5% CAGR)',
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
    value: 'Les Echos souligne la dynamique exceptionnelle du marché français SaaS analytics avec 3 licornes émergentes (Contentsquare, Dataiku, Spendesk adjacents). Le marché français représente 18% du marché européen. Focus sur les enjeux de souveraineté numérique et le Cloud Act. Les investissements VC dans les startups analytics ont augmenté de 340% depuis 2020.',
    status: 'done',
    generatedAt: '2025-01-10T09:32:00Z',
  },

  // TAM/SAM/SOM
  {
    id: 'cell-s4-tam',
    columnId: 'col-n1a-tam',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '• TAM France: $5.9B (2024)\n• SAM (PMEs françaises): $2.1B\n• SOM DataSense: $180M (8.5% du SAM français)\n\nNote: Chiffres extrapolés des données Eurostat et INSEE.',
    status: 'done',
    generatedAt: '2025-01-10T09:35:45Z',
  },

  // CAGR
  {
    id: 'cell-s4-cagr',
    columnId: 'col-n1a-cagr',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '24.2% CAGR (2024-2028) pour la France\n\nLe marché français surperforme la moyenne européenne (+2.7pts) grâce à:\n• French Tech initiatives\n• Investissements publics data\n• Adoption rapide IA',
    status: 'done',
    generatedAt: '2025-01-10T09:36:45Z',
  },

  // Drivers
  {
    id: 'cell-s4-drivers',
    columnId: 'col-n1a-drivers',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '1. Souveraineté numérique (Cloud de confiance)\n2. Plan France 2030 (€2.5B data/IA)\n3. Digitalisation PMEs (80% en cours)\n4. Normes ESG et reporting data\n5. Pénurie talents data → SaaS adoption',
    status: 'done',
    generatedAt: '2025-01-10T09:37:45Z',
  },

  // Forecast 2028
  {
    id: 'cell-s4-forecast',
    columnId: 'col-n1a-forecast',
    sourceId: 's4',
    matrixScopeId: 'scope-n1a',
    value: '$14.2B en 2028 pour la France\n\nCroissance sectorielle:\n• Services financiers: $4.1B\n• Retail/eCommerce: $3.2B\n• Manufacturing: $2.8B\n• Healthcare: $1.9B\n• Autres: $2.2B',
    status: 'done',
    generatedAt: '2025-01-10T09:38:45Z',
  },
];

// TODO: Create mock MatrixScope data for testing
/*
export const MATRIX_COLUMNS_OLD: MatrixColumn[] = [
  // Node n1 — Marché & Dynamiques
  {
    id: 'mc1',
    matrixScopeId: 'ms1', // NOTE: was nodeId: 'n1',
    label: 'Résumé 3 phrases',
    prompt: 'Résume ce document en exactement 3 phrases clés concernant le marché adressable et la dynamique de croissance.',
    type: 'text',
    order: 0,
    createdBy: 'u1',
    createdAt: '2026-03-08T09:00:00Z',
  },
  {
    id: 'mc2',
    nodeId: 'n1',
    label: 'Taille de marché',
    prompt: 'Quelle est la taille de marché mentionnée (TAM, SAM ou SOM) ? Indique le chiffre exact, l\'année de référence et la source si précisée.',
    type: 'number',
    order: 1,
    createdBy: 'u1',
    createdAt: '2026-03-08T09:05:00Z',
  },
  {
    id: 'mc3',
    nodeId: 'n1',
    label: 'Risques macros',
    prompt: 'Liste les 2-3 risques macro-économiques ou sectoriels explicitement mentionnés dans ce document.',
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
    label: 'Concurrents cités',
    prompt: 'Liste tous les concurrents directs mentionnés dans ce document avec leur positionnement.',
    type: 'list',
    order: 0,
    createdBy: 'u2',
    createdAt: '2026-03-09T11:00:00Z',
  },
  {
    id: 'mc5',
    nodeId: 'n2',
    label: 'Part de marché',
    prompt: 'Quelle part de marché est attribuée à DataSense ou à ses principaux concurrents dans ce document ?',
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
  // n1a × s2 (DS Financial Model) × mc1 (Résumé)
  {
    id: 'mce1',
    columnId: 'mc1',
    sourceId: 's2',
    nodeId: 'n1',
    value: 'DataSense opère sur un marché SaaS d\'analyse retail en forte croissance estimé à €14,2M ARR en 2025. La croissance organique est tirée par l\'adoption des retailers mid-market (250–2 500 points de vente) cherchant à réduire leur dépendance aux ERP legacy. Le modèle économique par abonnement génère un NRR structurel supérieur à 118%.',
    status: 'done',
    generatedAt: '2026-03-08T09:30:00Z',
    hypothesisId: 'h1',
  },
  // n1a × s2 × mc2 (Taille marché)
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
    value: '1. Sensibilité aux cycles de dépenses retail\n2. Pression sur les budgets IT en contexte inflationniste\n3. Dépendance aux intégrations ERP (SAP, Oracle)',
    status: 'done',
    generatedAt: '2026-03-08T09:32:00Z',
  },
  // n1a × s6 (Gartner) × mc1
  {
    id: 'mce4',
    columnId: 'mc1',
    sourceId: 's6',
    nodeId: 'n1',
    value: 'Le marché mondial du retail analytics atteindra 8,4Md$ en 2028 avec un CAGR de 22,3% selon Gartner. Les segments à plus forte croissance sont l\'analyse prédictive des stocks et l\'optimisation dynamique des prix. Les acteurs spécialisés mid-market capturent une part croissante face aux suites ERP généralistes.',
    status: 'done',
    generatedAt: '2026-03-08T09:35:00Z',
  },
  // n1a × s6 × mc2
  {
    id: 'mce5',
    columnId: 'mc2',
    sourceId: 's6',
    nodeId: 'n1',
    value: '8,4Md$ en 2028 (TAM mondial retail analytics, CAGR 22,3%)',
    status: 'done',
    generatedAt: '2026-03-08T09:36:00Z',
  },
  // n1a × s6 × mc3
  {
    id: 'mce6',
    columnId: 'mc3',
    sourceId: 's6',
    nodeId: 'n1',
    value: '1. Ralentissement de la consommation en Europe occidentale\n2. Consolidation du marché par les grands acteurs (SAP, Oracle)',
    status: 'done',
    generatedAt: '2026-03-08T09:37:00Z',
  },
  // n1a × s4 (Les Echos) × mc1
  {
    id: 'mce7',
    columnId: 'mc1',
    sourceId: 's4',
    nodeId: 'n1',
    value: 'L\'article souligne l\'accélération de la digitalisation des retailers français post-COVID avec +34% d\'investissements en outils analytics en 2024. DataSense est cité parmi les 5 acteurs à surveiller dans l\'espace SaaS retail français. La tendance "composable retail stack" favorise les solutions spécialisées versus les suites intégrées.',
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
    value: '1. Fin des aides post-COVID aux retailers\n2. Guerre des prix dans le secteur grande distribution',
    status: 'done',
    generatedAt: '2026-03-08T09:41:00Z',
  },
];
*/

// Mock cell values for generating new cells (simulates LLM output)
export const MOCK_CELL_VALUES: Record<string, Record<string, string>> = {
  // mc1 (Résumé 3 phrases) — générique
  mc1: {
    default: 'Ce document fournit une analyse approfondie du segment de marché cible. Les données présentées confirment la thèse de croissance structurelle avec des indicateurs solides. Les perspectives à 3-5 ans restent favorables malgré les pressions macroéconomiques identifiées.',
  },
  mc2: {
    default: 'Chiffre de marché non explicitement mentionné dans ce document.',
  },
  mc3: {
    default: '1. Incertitude macroéconomique globale\n2. Pression réglementaire accrue\n3. Intensification de la concurrence',
  },
  mc4: {
    default: 'Concurrents identifiés : Qlik Sense, MicroStrategy, Tableau (Salesforce), Looker (Google). Positionnements variés entre solutions généralistes et spécialisées retail.',
  },
  mc5: {
    default: 'Part de marché non précisée dans ce document. Indicateurs de part relative suggèrent une position challenger.',
  },
};

// AI column suggestions per node type
export const AI_SUGGESTIONS: Record<string, Array<{ label: string; prompt: string; type: 'text' | 'number' | 'boolean' | 'list' }>> = {
  n1: [
    { label: 'CAGR mentionné', prompt: 'Quel est le taux de croissance annuel composé (CAGR) mentionné pour le marché ou le segment ? Donne le chiffre exact et la période de référence.', type: 'number' },
    { label: 'Segments de marché', prompt: 'Quels sont les segments de marché ou verticales identifiés comme les plus porteurs dans ce document ?', type: 'list' },
    { label: 'Géographies citées', prompt: 'Quelles géographies ou régions sont mentionnées comme marchés prioritaires ?', type: 'list' },
    { label: 'Tendances clés', prompt: 'Quelles sont les 2-3 tendances structurelles qui impactent ce marché selon ce document ?', type: 'list' },
  ],
  n2: [
    { label: 'Différenciateurs cités', prompt: 'Quels sont les différenciateurs compétitifs mis en avant par les acteurs mentionnés ?', type: 'list' },
    { label: 'Consolidation du marché', prompt: 'Y a-t-il des mentions de fusions, acquisitions ou consolidation dans ce segment ?', type: 'text' },
    { label: 'Drivers de croissance', prompt: 'Quels sont les principaux drivers de croissance identifiés dans ce document ?', type: 'list' },
  ],
  n3: [
    { label: 'NRR / NDR mentionné', prompt: 'Le Net Revenue Retention (NRR) ou Net Dollar Retention (NDR) est-il mentionné ? Donne le chiffre exact.', type: 'number' },
    { label: 'Churn rate', prompt: 'Le taux de churn (logo ou revenue) est-il indiqué ? Donne le chiffre et la période.', type: 'number' },
    { label: 'Métriques d\'expansion', prompt: 'Quelles métriques d\'expansion client sont citées (upsell, cross-sell, expansion MRR) ?', type: 'text' },
  ],
  n4: [
    { label: 'ACV / ARR par client', prompt: 'Quelle est la valeur annuelle moyenne par client (ACV ou ARR moyen) mentionnée ?', type: 'number' },
    { label: 'LTV / CAC ratio', prompt: 'Le ratio LTV/CAC ou les coûts d\'acquisition client sont-ils mentionnés ?', type: 'text' },
    { label: 'Structure de pricing', prompt: 'Comment est structuré le pricing (par siège, par module, par usage) selon ce document ?', type: 'text' },
  ],
  default: [
    { label: 'Résumé exécutif', prompt: 'Résume ce document en 2-3 phrases clés pour un décideur C-level.', type: 'text' },
    { label: 'Chiffres clés', prompt: 'Quels sont les 3 chiffres ou métriques les plus importants cités dans ce document ?', type: 'list' },
    { label: 'Risques identifiés', prompt: 'Quels risques ou points de vigilance sont mentionnés dans ce document ?', type: 'list' },
  ],
};
