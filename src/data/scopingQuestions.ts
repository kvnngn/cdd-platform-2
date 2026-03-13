import { ScopingQuestion } from '../types';

export const SCOPING_QUESTIONS: Record<string, ScopingQuestion[]> = {
  saas_b2b: [
    {
      id: 'q1',
      text: 'What are the priority areas of your thesis?',
      type: 'checkbox',
      options: [
        'Market & Dynamics',
        'Competition & Positioning',
        'Customers & Retention',
        'Pricing & Unit Economics',
        'Go-to-Market & Expansion',
        'Technology & Product',
        'Management Team',
      ],
    },
    {
      id: 'q2',
      text: "What is the acquirer's main concern?",
      type: 'radio',
      options: [
        'High churn risk',
        'Ability to scale without degradation',
        'Increasing competitive intensity',
        'Sustainability of current pricing',
        'Concentration on few clients',
      ],
    },
    {
      id: 'q3',
      text: "What level of depth would you like to work on?",
      type: 'radio',
      options: [
        'Quick — 2 levels (main blocks only)',
        'Standard — 3 levels (detailed sub-areas)',
        'Deep — 3+ levels (granular analysis)',
      ],
    },
    {
      id: 'q4',
      text: 'Which sources do you already have available?',
      type: 'checkbox',
      options: [
        'Data room',
        'Industry reports (Gartner, IDC…)',
        'Management interviews',
        'Web & specialized press',
        'Databases (Euromonitor, CapitalIQ…)',
      ],
    },
    {
      id: 'q5',
      text: 'Are there any blind spots or critical topics to investigate as a priority?',
      type: 'text',
    },
  ],

  industrial: [
    {
      id: 'q1',
      text: 'What are the priority areas of your thesis?',
      type: 'checkbox',
      options: [
        'Market & Dynamics',
        'Value Chain',
        'Regulation & Compliance',
        'Capex & Investments',
        'Supply Chain & Suppliers',
        'Customers & Contracts',
      ],
    },
    {
      id: 'q2',
      text: "What is the acquirer's main concern?",
      type: 'radio',
      options: [
        'Exposure to economic cycles',
        'Dependence on key suppliers',
        'Regulatory risk',
        "Investment capacity (Capex)",
        'Limited pricing power',
      ],
    },
    {
      id: 'q3',
      text: "What level of depth would you like to work on?",
      type: 'radio',
      options: [
        'Quick — 2 levels',
        'Standard — 3 levels',
        'Deep — 3+ levels',
      ],
    },
    {
      id: 'q4',
      text: 'Are there any blind spots or critical topics?',
      type: 'text',
    },
  ],

  retail: [
    {
      id: 'q1',
      text: 'What are the priority areas of your thesis?',
      type: 'checkbox',
      options: [
        'Market & Dynamics',
        'Distribution & Channels',
        'Brand & Positioning',
        'E-commerce & Digital',
        'Pricing & Margins',
        'Seasonality',
      ],
    },
    {
      id: 'q2',
      text: "What is the acquirer's main concern?",
      type: 'radio',
      options: [
        'Exposure to consumption cycles',
        'E-commerce competition',
        'Brand sustainability',
        'Profitability by channel',
        'Dependence on few products',
      ],
    },
    {
      id: 'q3',
      text: "What level of depth would you like to work on?",
      type: 'radio',
      options: [
        'Quick — 2 levels',
        'Standard — 3 levels',
        'Deep — 3+ levels',
      ],
    },
    {
      id: 'q4',
      text: 'Are there any blind spots or critical topics?',
      type: 'text',
    },
  ],

  custom: [
    {
      id: 'q1',
      text: 'Describe the main areas of your thesis (one per line)',
      type: 'text',
    },
    {
      id: 'q2',
      text: "What is the acquirer's main concern?",
      type: 'text',
    },
    {
      id: 'q3',
      text: "What level of depth would you like to work on?",
      type: 'radio',
      options: [
        'Quick — 2 levels',
        'Standard — 3 levels',
        'Deep — 3+ levels',
      ],
    },
  ],

  generic: [
    {
      id: 'q1',
      text: 'What are the priority areas of your thesis?',
      type: 'checkbox',
      options: [
        'Market & Dynamics',
        'Competition',
        'Customers & Retention',
        'Finance & Valuation',
        'Operations',
        'Management Team',
      ],
    },
    {
      id: 'q2',
      text: "What level of depth would you like to work on?",
      type: 'radio',
      options: [
        'Quick — 2 levels',
        'Standard — 3 levels',
        'Deep — 3+ levels',
      ],
    },
    {
      id: 'q3',
      text: 'Are there any blind spots or critical topics?',
      type: 'text',
    },
  ],
};

export function getScopingQuestions(template: string): ScopingQuestion[] {
  return SCOPING_QUESTIONS[template] ?? SCOPING_QUESTIONS.generic;
}
