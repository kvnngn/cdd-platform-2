import { ScopingQuestion } from '../types';

export const SCOPING_QUESTIONS: Record<string, ScopingQuestion[]> = {
  saas_b2b: [
    {
      id: 'q1',
      text: 'Quels sont les axes prioritaires de votre thèse ?',
      type: 'checkbox',
      options: [
        'Marché & Dynamiques',
        'Compétition & Positionnement',
        'Clients & Rétention',
        'Pricing & Unit Economics',
        'Go-to-Market & Expansion',
        'Technologie & Produit',
        'Équipe dirigeante',
      ],
    },
    {
      id: 'q2',
      text: "Quelle est la principale préoccupation de l'acquéreur ?",
      type: 'radio',
      options: [
        'Risque de churn élevé',
        'Capacité à scaler sans dégradation',
        'Intensité concurrentielle croissante',
        'Durabilité du pricing actuel',
        'Concentration sur peu de clients',
      ],
    },
    {
      id: 'q3',
      text: "Sur quel niveau de profondeur souhaitez-vous travailler ?",
      type: 'radio',
      options: [
        'Rapide — 2 niveaux (blocs principaux uniquement)',
        'Standard — 3 niveaux (sous-axes détaillés)',
        'Approfondi — 3+ niveaux (analyse granulaire)',
      ],
    },
    {
      id: 'q4',
      text: 'Quelles sources avez-vous déjà à disposition ?',
      type: 'checkbox',
      options: [
        'Data room',
        'Rapports sectoriels (Gartner, IDC…)',
        'Interviews management',
        'Web & presse spécialisée',
        'Bases de données (Euromonitor, CapitalIQ…)',
      ],
    },
    {
      id: 'q5',
      text: 'Y a-t-il des zones blanches ou sujets critiques à investiguer en priorité ?',
      type: 'text',
    },
  ],

  industrial: [
    {
      id: 'q1',
      text: 'Quels sont les axes prioritaires de votre thèse ?',
      type: 'checkbox',
      options: [
        'Marché & Dynamiques',
        'Chaîne de valeur',
        'Réglementation & Conformité',
        'Capex & Investissements',
        'Supply chain & Fournisseurs',
        'Clients & Contrats',
      ],
    },
    {
      id: 'q2',
      text: "Quelle est la principale préoccupation de l'acquéreur ?",
      type: 'radio',
      options: [
        'Exposition aux cycles économiques',
        'Dépendance fournisseurs clés',
        'Risque réglementaire',
        "Capacité d'investissement (Capex)",
        'Pricing power limité',
      ],
    },
    {
      id: 'q3',
      text: "Sur quel niveau de profondeur souhaitez-vous travailler ?",
      type: 'radio',
      options: [
        'Rapide — 2 niveaux',
        'Standard — 3 niveaux',
        'Approfondi — 3+ niveaux',
      ],
    },
    {
      id: 'q4',
      text: 'Y a-t-il des zones blanches ou sujets critiques ?',
      type: 'text',
    },
  ],

  retail: [
    {
      id: 'q1',
      text: 'Quels sont les axes prioritaires de votre thèse ?',
      type: 'checkbox',
      options: [
        'Marché & Dynamiques',
        'Distribution & Canaux',
        'Marque & Positionnement',
        'E-commerce & Digital',
        'Pricing & Marges',
        'Saisonnalité',
      ],
    },
    {
      id: 'q2',
      text: "Quelle est la principale préoccupation de l'acquéreur ?",
      type: 'radio',
      options: [
        'Exposition aux cycles de consommation',
        'Concurrence e-commerce',
        'Durabilité de la marque',
        'Rentabilité par canal',
        'Dépendance à quelques références',
      ],
    },
    {
      id: 'q3',
      text: "Sur quel niveau de profondeur souhaitez-vous travailler ?",
      type: 'radio',
      options: [
        'Rapide — 2 niveaux',
        'Standard — 3 niveaux',
        'Approfondi — 3+ niveaux',
      ],
    },
    {
      id: 'q4',
      text: 'Y a-t-il des zones blanches ou sujets critiques ?',
      type: 'text',
    },
  ],

  custom: [
    {
      id: 'q1',
      text: 'Décrivez les axes principaux de votre thèse (un par ligne)',
      type: 'text',
    },
    {
      id: 'q2',
      text: "Quelle est la principale préoccupation de l'acquéreur ?",
      type: 'text',
    },
    {
      id: 'q3',
      text: "Sur quel niveau de profondeur souhaitez-vous travailler ?",
      type: 'radio',
      options: [
        'Rapide — 2 niveaux',
        'Standard — 3 niveaux',
        'Approfondi — 3+ niveaux',
      ],
    },
  ],

  generic: [
    {
      id: 'q1',
      text: 'Quels sont les axes prioritaires de votre thèse ?',
      type: 'checkbox',
      options: [
        'Marché & Dynamiques',
        'Compétition',
        'Clients & Rétention',
        'Finances & Valorisation',
        'Opérations',
        'Équipe dirigeante',
      ],
    },
    {
      id: 'q2',
      text: "Sur quel niveau de profondeur souhaitez-vous travailler ?",
      type: 'radio',
      options: [
        'Rapide — 2 niveaux',
        'Standard — 3 niveaux',
        'Approfondi — 3+ niveaux',
      ],
    },
    {
      id: 'q3',
      text: 'Y a-t-il des zones blanches ou sujets critiques ?',
      type: 'text',
    },
  ],
};

export function getScopingQuestions(template: string): ScopingQuestion[] {
  return SCOPING_QUESTIONS[template] ?? SCOPING_QUESTIONS.generic;
}
