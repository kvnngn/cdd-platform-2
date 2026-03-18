import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Hypothesis, HypothesisSource, HypothesisVersion, HypothesisStatus, WorkstreamNode, Alert, ActivityLog, Project, Source, NodeComment, NodeVersion, MatrixColumn, MatrixCell, MatrixScope } from '@/types';
import { CellGenerationJob, SynthesisStrategy, SynthesisContext, MatrixChatContext } from '@/types/matrix';
import { USERS } from '@/data/users';
import { HYPOTHESES, ALERTS, ACTIVITY_LOG, WORKSTREAM_NODES, PROJECTS, NODE_SOURCES, SOURCES, CONNECTORS, CONNECTOR_SOURCES, MATRIX_SCOPES, MATRIX_COLUMNS, MATRIX_CELLS, MOCK_CELL_VALUES } from '@/data/mockData';
import { searchDocumentsByScope, searchWithAgent } from '@/services/semanticSearch';
import {
  generateDocumentSummary,
  generateCellSynthesis,
  analyzeSelectionGeometry,
  synthesizeByReliableSource,
  synthesizeByAveraging,
  synthesizeRow,
  synthesizeGlobal,
} from '@/services/matrixSynthesis';
import { cellGenerationQueue } from '@/services/cellGenerationQueue';
import { getTemplateById } from '@/data/columnTemplates';
import { nanoid } from 'nanoid';

interface RecentNode {
  nodeId: string;
  projectId: string;
  visitedAt: string; // ISO timestamp
}

interface AppState {
  currentUser: User | null;
  selectedProjectId: string | null;
  selectedNodeId: string | null;
  selectedHypothesisId: string | null;
  projects: Project[];
  hypotheses: Hypothesis[];
  alerts: Alert[];
  activityLogs: ActivityLog[];
  nodes: WorkstreamNode[];
  nodeComments: NodeComment[];
  nodeVersions: NodeVersion[];
  sidebarOpen: boolean;
  nodeSourceSelections: Record<string, string[]>;
  connectedConnectors: string[];
  recentNodes: RecentNode[];
  expandedGraphNodes: Set<string>;
  selectedResearchTab: 'chat' | 'matrix';
  activeProjectView: 'board' | 'tree' | 'manager';
  workstreamWidth: number;
  showOnlyFavorites: boolean;
  suggestedChatMessage: string | null;

  setCurrentUser: (user: User) => void;
  logout: () => void;
  setSelectedProject: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedResearchTab: (tab: 'chat' | 'matrix') => void;
  setSuggestedChatMessage: (message: string | null) => void;
  setActiveProjectView: (view: 'board' | 'tree' | 'manager') => void;
  setWorkstreamWidth: (width: number) => void;
  setSelectedHypothesis: (id: string | null) => void;
  toggleGraphNodeExpansion: (nodeId: string) => void;
  setExpandedGraphNodes: (nodeIds: Set<string>) => void;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  // Cascade logic helpers
  getBidirectionalRelationships: (
    hypothesisId: string,
    allHypotheses: Hypothesis[]
  ) => Array<{
    relatedHypothesisId: string;
    relationshipType: 'supports' | 'contradicts' | 'nuances';
    direction: 'outbound' | 'inbound' | 'both';
  }>;
  createCascadeAlert: (
    projectId: string,
    triggeredBy: {
      hypothesisId: string;
      hypothesisTitle: string;
      newStatus: HypothesisStatus;
    },
    affected: {
      hypothesisId: string;
      hypothesisTitle: string;
      newStatus: HypothesisStatus;
    },
    relationshipType: 'supports' | 'contradicts' | 'nuances'
  ) => Alert;
  updateHypothesisStatus: (id: string, status: Hypothesis['status']) => void;
  // Hypothesis rich actions
  rejectHypothesisWithReason: (id: string, reason: string) => void;
  updateHypothesisBody: (id: string, body: string, userId: string) => void;
  addSourceToHypothesis: (hypothesisId: string, source: HypothesisSource) => void;
  removeHypothesisRelation: (hypothesisId: string, targetHypothesisId: string) => void;
  addHypothesisRelation: (hypothesisId: string, targetHypothesisId: string, relationType: 'supports' | 'contradicts' | 'nuances') => void;
  createHypothesis: (data: Omit<Hypothesis, 'id' | 'createdAt' | 'updatedAt'>) => Hypothesis;
  markAlertRead: (id: string) => void;
  addActivityLog: (action: string, targetType: ActivityLog['targetType'], targetId: string, targetName: string, detail?: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  getNodeSelectedSources: (nodeId: string) => string[];
  toggleSourceSelection: (nodeId: string, sourceId: string) => void;
  selectAllNodeSources: (nodeId: string) => void;
  deselectAllNodeSources: (nodeId: string) => void;
  addSourceToNode: (nodeId: string, source: Omit<Source, 'id'>) => Source;
  connectConnector: (connectorId: string) => void;
  disconnectConnector: (connectorId: string) => void;
  // Node CRUD
  addNodesForProject: (projectId: string, nodes: WorkstreamNode[]) => void;
  updateNode: (nodeId: string, patch: Partial<WorkstreamNode>) => void;
  addNode: (node: WorkstreamNode) => void;
  deleteNode: (nodeId: string) => void;
  // Node comments
  addNodeComment: (comment: NodeComment) => void;
  resolveNodeComment: (commentId: string) => void;
  // Node versions
  addNodeVersion: (version: NodeVersion) => void;
  // Matrix
  matrixScopes: MatrixScope[];
  matrixColumns: MatrixColumn[];
  matrixCells: MatrixCell[];
  cellGenerationJobs: CellGenerationJob[];
  matrixChatContext: MatrixChatContext | null;
  // Scope actions
  addMatrixScope: (scope: Omit<MatrixScope, 'id' | 'createdAt' | 'createdBy' | 'discoveredSourceIds' | 'discoveryStatus'>, userId: string) => Promise<MatrixScope>;
  validateScopeDocuments: (scopeId: string, approvedSourceIds: string[]) => Promise<void>;
  updateScopeConversation: (scopeId: string, conversation: any[], suggestedSourceIds: string[]) => void;
  updateMatrixScope: (id: string, patch: Partial<MatrixScope>) => void;
  deleteMatrixScope: (id: string) => void;
  refreshScopeDiscovery: (scopeId: string) => Promise<void>;
  refreshMatrixScope: (scopeId: string, newPrompt: string, userId: string) => Promise<void>;
  // Column actions
  addMatrixColumn: (col: Omit<MatrixColumn, 'id' | 'createdAt'>) => MatrixColumn;
  addMatrixColumnsFromTemplates: (scopeId: string, templateIds: string[], userId: string, autoGenerate?: boolean) => Promise<MatrixColumn[]>;
  updateMatrixColumn: (id: string, patch: Partial<MatrixColumn>) => void;
  deleteMatrixColumn: (id: string) => void;
  // Cell actions
  generateMatrixCell: (columnId: string, sourceId: string, matrixScopeId: string) => Promise<void>;
  setCellHypothesis: (cellId: string, hypothesisId: string) => void;
  toggleCellSelection: (cellId: string) => void;
  toggleCellFavorite: (cellId: string) => void;
  toggleShowOnlyFavorites: () => void;
  selectAllCellsInColumn: (columnId: string, matrixScopeId: string) => void;
  deselectAllCells: () => void;
  getSelectedCells: () => MatrixCell[];
  // Job queue actions
  createGenerationJob: (columnId: string, sourceIds: string[], matrixScopeId: string) => CellGenerationJob;
  updateJobProgress: (jobId: string, progress: number, processedCount: number) => void;
  completeJob: (jobId: string) => void;
  cancelJob: (jobId: string) => void;
  // Multi-strategy synthesis
  generateHypothesisWithStrategy: (strategy: SynthesisStrategy, context: SynthesisContext) => Promise<string>;
  // Matrix → Chat integration
  setMatrixChatContext: (cells: MatrixCell[], columns: MatrixColumn[], nodeId: string, scopeId: string) => void;
  clearMatrixChatContext: () => void;
  addCellsToMatrixChatContext: (cells: MatrixCell[], columns: MatrixColumn[]) => void;
  // Reset
  resetStore: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      selectedProjectId: null,
      selectedNodeId: null,
      selectedHypothesisId: null,
      projects: PROJECTS,
      hypotheses: HYPOTHESES,
      alerts: ALERTS,
      activityLogs: ACTIVITY_LOG,
      nodes: WORKSTREAM_NODES,
      nodeComments: [],
      nodeVersions: [],
      sidebarOpen: false,
      nodeSourceSelections: {},
      connectedConnectors: ['sharepoint', 'bloomberg', 'capitaliq', 'datasite'], // Mock: connecteurs déjà connectés
      recentNodes: [],
      expandedGraphNodes: new Set(['n0']), // Root node expanded by default
      selectedResearchTab: 'matrix',
      activeProjectView: 'board',
      workstreamWidth: 320,
      showOnlyFavorites: false,
      suggestedChatMessage: null,
      matrixScopes: MATRIX_SCOPES,
      matrixColumns: MATRIX_COLUMNS,
      matrixCells: MATRIX_CELLS,
      cellGenerationJobs: [],
      matrixChatContext: null,

      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({
        currentUser: null,
        selectedProjectId: null,
        selectedNodeId: null,
        selectedHypothesisId: null,
        selectedResearchTab: 'matrix',
        matrixChatContext: null,
        suggestedChatMessage: null,
        showOnlyFavorites: false,
        expandedGraphNodes: new Set(['n0']),
      }),
      setSelectedProject: (id) => set({ selectedProjectId: id }),
      setSelectedResearchTab: (tab) => set({ selectedResearchTab: tab }),
      setSuggestedChatMessage: (message) => set({ suggestedChatMessage: message }),
      setActiveProjectView: (view) => set({ activeProjectView: view }),
      setWorkstreamWidth: (width) => set({ workstreamWidth: width }),
      setSelectedNode: (id) => set((state) => {
        if (!id) return { selectedNodeId: null };
        const node = state.nodes.find(n => n.id === id);
        const projectId = node?.projectId ?? state.selectedProjectId ?? '';
        const visit: RecentNode = { nodeId: id, projectId, visitedAt: new Date().toISOString() };
        const recents = [visit, ...state.recentNodes.filter(r => r.nodeId !== id)].slice(0, 15);
        return { selectedNodeId: id, recentNodes: recents };
      }),
      setSelectedHypothesis: (id) => set({ selectedHypothesisId: id }),
      toggleGraphNodeExpansion: (nodeId) => set((state) => {
        const newExpanded = new Set(state.expandedGraphNodes);
        if (newExpanded.has(nodeId)) {
          newExpanded.delete(nodeId);
        } else {
          newExpanded.add(nodeId);
        }
        return { expandedGraphNodes: newExpanded };
      }),
      setExpandedGraphNodes: (nodeIds) => set({ expandedGraphNodes: nodeIds }),
      createProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: `p${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          projects: [newProject, ...state.projects],
          selectedProjectId: newProject.id,
        }));
        return newProject;
      },

      // ─── Cascade Logic Helpers ────────────────────────────────────────────

      /**
       * Finds all bidirectional relationships for a hypothesis with their types
       * Returns relationships in both directions (A→B and B→A)
       */
      getBidirectionalRelationships: (
        hypothesisId: string,
        allHypotheses: Hypothesis[]
      ): Array<{
        relatedHypothesisId: string;
        relationshipType: 'supports' | 'contradicts' | 'nuances';
        direction: 'outbound' | 'inbound' | 'both';
      }> => {
        const targetHypothesis = allHypotheses.find(h => h.id === hypothesisId);
        if (!targetHypothesis) return [];

        const relationships = new Map<string, {
          relatedHypothesisId: string;
          relationshipType: 'supports' | 'contradicts' | 'nuances';
          direction: 'outbound' | 'inbound' | 'both';
        }>();

        // Find outbound relationships (hypothesisId → other)
        targetHypothesis.relations.forEach(rel => {
          relationships.set(rel.hypothesisId, {
            relatedHypothesisId: rel.hypothesisId,
            relationshipType: rel.type,
            direction: 'outbound'
          });
        });

        // Find inbound relationships (other → hypothesisId)
        allHypotheses.forEach(h => {
          if (h.id === hypothesisId) return;

          h.relations.forEach(rel => {
            if (rel.hypothesisId === hypothesisId) {
              const existing = relationships.get(h.id);
              if (existing) {
                // Bidirectional relationship exists - keep the type that matters more
                relationships.set(h.id, {
                  relatedHypothesisId: h.id,
                  relationshipType: rel.type,
                  direction: 'both'
                });
              } else {
                relationships.set(h.id, {
                  relatedHypothesisId: h.id,
                  relationshipType: rel.type,
                  direction: 'inbound'
                });
              }
            }
          });
        });

        return Array.from(relationships.values());
      },

      /**
       * Creates alerts when hypothesis status changes affect related hypotheses
       */
      createCascadeAlert: (
        projectId: string,
        triggeredBy: {
          hypothesisId: string;
          hypothesisTitle: string;
          newStatus: HypothesisStatus;
        },
        affected: {
          hypothesisId: string;
          hypothesisTitle: string;
          newStatus: HypothesisStatus;
        },
        relationshipType: 'supports' | 'contradicts' | 'nuances'
      ): Alert => {
        const alertConfigs = {
          validated_contradicts: {
            type: 'contradiction' as const,
            severity: 'high' as const,
            title: 'Hypothesis auto-rejected due to contradiction',
            description: `"${affected.hypothesisTitle}" was automatically rejected because validated hypothesis "${triggeredBy.hypothesisTitle}" contradicts it.`
          },
          rejected_supports_onhold: {
            type: 'on_hold' as const,
            severity: 'medium' as const,
            title: 'Hypothesis placed on hold',
            description: `"${affected.hypothesisTitle}" was placed on hold because supporting hypothesis "${triggeredBy.hypothesisTitle}" was rejected.`
          },
          rejected_supports_rejected: {
            type: 'cascade_rejection' as const,
            severity: 'high' as const,
            title: 'Hypothesis auto-rejected (cascade)',
            description: `"${affected.hypothesisTitle}" was automatically rejected because it supports rejected hypothesis "${triggeredBy.hypothesisTitle}".`
          }
        };

        // Build key based on status change and affected status
        let key: string;
        if (triggeredBy.newStatus === 'rejected' && relationshipType === 'supports') {
          key = affected.newStatus === 'on_hold' ? 'rejected_supports_onhold' : 'rejected_supports_rejected';
        } else {
          key = `${triggeredBy.newStatus}_${relationshipType}`;
        }

        const config = alertConfigs[key as keyof typeof alertConfigs] || {
          type: 'on_hold' as const,
          severity: 'low' as const,
          title: 'Related hypothesis status changed',
          description: `"${affected.hypothesisTitle}" was affected by status change of "${triggeredBy.hypothesisTitle}".`
        };

        return {
          id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          projectId,
          type: config.type,
          severity: config.severity,
          title: config.title,
          description: config.description,
          hypothesisId: affected.hypothesisId,
          createdAt: new Date().toISOString(),
          isRead: false
        };
      },

      updateHypothesisStatus: (id, status) => {
        set((state) => {
          const targetHypothesis = state.hypotheses.find(h => h.id === id);
          if (!targetHypothesis) {
            console.warn('Hypothesis not found:', id);
            return state;
          }

          console.log('🔄 updateHypothesisStatus:', {
            id,
            status,
            currentStatus: targetHypothesis.status,
            title: targetHypothesis.title
          });

          // Get all bidirectional relationships with their types
          const relationships = get().getBidirectionalRelationships(id, state.hypotheses);

          console.log('📋 Bidirectional relationships:', relationships);

          const updatedHypotheses: Hypothesis[] = [];
          const newAlerts: Alert[] = [];
          const now = new Date().toISOString();

          // Track modifications to avoid duplicates
          const modificationsMap = new Map<string, Hypothesis>();

          state.hypotheses.forEach((h) => {
            // 1. Update the target hypothesis
            if (h.id === id) {
              console.log(`✅ Updating target hypothesis to: ${status}`);
              modificationsMap.set(h.id, {
                ...h,
                status,
                updatedAt: now,
                ...(status === 'validated' && {
                  validatedBy: state.currentUser?.id,
                  validatedAt: now
                })
              });
              return;
            }

            // 2. Check if this hypothesis is related to the target
            const relationship = relationships.find(r => r.relatedHypothesisId === h.id);

            if (!relationship) {
              updatedHypotheses.push(h);
              return;
            }

            console.log(`🔍 Checking related hypothesis ${h.id}:`, {
              title: h.title.substring(0, 50),
              currentStatus: h.status,
              relationshipType: relationship.relationshipType,
              direction: relationship.direction
            });

            // 3. Apply cascade logic based on status change and relationship type

            // === VALIDATION CASCADES ===
            if (status === 'validated') {
              if (relationship.relationshipType === 'contradicts') {
                // When validating A that contradicts B, auto-reject B
                if (h.status !== 'rejected') {
                  console.log(`❌ Auto-rejecting ${h.id} (contradicts validated hypothesis)`);
                  modificationsMap.set(h.id, {
                    ...h,
                    status: 'rejected' as const,
                    rejectionReason: `Automatically rejected: contradicts validated hypothesis "${targetHypothesis.title}"`,
                    rejectedBy: state.currentUser?.id ?? 'system',
                    rejectedAt: now,
                    updatedAt: now
                  });

                  newAlerts.push(get().createCascadeAlert(
                    h.projectId,
                    {
                      hypothesisId: id,
                      hypothesisTitle: targetHypothesis.title,
                      newStatus: 'validated'
                    },
                    {
                      hypothesisId: h.id,
                      hypothesisTitle: h.title,
                      newStatus: 'rejected'
                    },
                    'contradicts'
                  ));
                  return;
                }
              } else if (relationship.relationshipType === 'supports') {
                // When validating A that supports B, no status change needed
                console.log(`✨ Hypothesis ${h.id} is reinforced by validation`);
                // Future: could add confidence boost or reinforcement alert
              }
              // nuances: no cascade
            }

            // === REJECTION CASCADES ===
            if (status === 'rejected') {
              if (relationship.relationshipType === 'supports') {
                // When rejecting A that supports B, set validated B to on_hold
                if (h.status === 'validated') {
                  console.log(`⚠️ Setting ${h.id} to on_hold (supporting hypothesis rejected)`);
                  modificationsMap.set(h.id, {
                    ...h,
                    status: 'on_hold' as const,
                    updatedAt: now
                  });

                  newAlerts.push(get().createCascadeAlert(
                    h.projectId,
                    {
                      hypothesisId: id,
                      hypothesisTitle: targetHypothesis.title,
                      newStatus: 'rejected'
                    },
                    {
                      hypothesisId: h.id,
                      hypothesisTitle: h.title,
                      newStatus: 'on_hold'
                    },
                    'supports'
                  ));
                  return;
                }
              } else if (relationship.relationshipType === 'contradicts') {
                // When rejecting A that contradicts B, B is reinforced
                console.log(`✨ Hypothesis ${h.id} is reinforced by rejection of contradicting hypothesis`);
                // Future: could add reinforcement alert
              }
              // nuances: no cascade
            }

            // === ON_HOLD CASCADES ===
            // No cascades needed for on_hold status

            // If no modification was made, keep original
            if (!modificationsMap.has(h.id)) {
              updatedHypotheses.push(h);
            }
          });

          // Apply all modifications
          modificationsMap.forEach((modifiedHypothesis) => {
            updatedHypotheses.push(modifiedHypothesis);
          });

          // === SECOND PASS: Propagate rejection cascade ===
          // For each hypothesis that was just rejected, set validated supporting hypotheses to on_hold
          const rejectedInFirstPass = Array.from(modificationsMap.values()).filter(h => h.status === 'rejected');

          if (rejectedInFirstPass.length > 0) {
            console.log(`🔄 Second pass: propagating rejection cascade for ${rejectedInFirstPass.length} rejected hypotheses`);

            rejectedInFirstPass.forEach(rejectedHypothesis => {
              // Find all hypotheses that support this rejected hypothesis
              const allHypothesesWithModifications = [...updatedHypotheses, ...Array.from(modificationsMap.values())];

              allHypothesesWithModifications.forEach(h => {
                // Skip if already processed
                if (modificationsMap.has(h.id)) return;

                // Check if h supports the rejected hypothesis
                const hSupportsRejected = h.relations?.some(
                  rel => rel.hypothesisId === rejectedHypothesis.id && rel.type === 'supports'
                );

                // Only set to on_hold if currently validated
                if (hSupportsRejected && h.status === 'validated') {
                  console.log(`⚠️ Second pass: Setting ${h.id} to on_hold (supports rejected hypothesis ${rejectedHypothesis.id})`);

                  const cascadedHypothesis = {
                    ...h,
                    status: 'on_hold' as const,
                    updatedAt: now
                  };

                  modificationsMap.set(h.id, cascadedHypothesis);

                  // Update updatedHypotheses array
                  const indexInUpdated = updatedHypotheses.findIndex(uh => uh.id === h.id);
                  if (indexInUpdated >= 0) {
                    updatedHypotheses[indexInUpdated] = cascadedHypothesis;
                  }

                  newAlerts.push(get().createCascadeAlert(
                    h.projectId,
                    {
                      hypothesisId: rejectedHypothesis.id,
                      hypothesisTitle: rejectedHypothesis.title,
                      newStatus: 'rejected'
                    },
                    {
                      hypothesisId: h.id,
                      hypothesisTitle: h.title,
                      newStatus: 'on_hold'
                    },
                    'supports'
                  ));
                }
              });
            });
          }

          console.log(`📊 Status update complete: ${modificationsMap.size} hypotheses modified`);
          console.log(`🔔 Generated ${newAlerts.length} alerts`);

          return {
            hypotheses: updatedHypotheses,
            alerts: [...state.alerts, ...newAlerts]
          };
        });

        // Log activity
        const targetHypothesis = get().hypotheses.find(h => h.id === id);
        if (targetHypothesis) {
          get().addActivityLog(
            `Hypothesis ${status}`,
            'hypothesis',
            id,
            targetHypothesis.title
          );
        }
      },

      // ─── Hypothesis rich actions ──────────────────────────────────────────
      rejectHypothesisWithReason: (id, reason) =>
        set((state) => {
          console.log('🔄 rejectHypothesisWithReason:', { id, reason });

          // First, set the rejection fields on the target hypothesis
          const hypothesesWithRejection = state.hypotheses.map((h) =>
            h.id === id
              ? {
                  ...h,
                  rejectionReason: reason,
                  rejectedBy: state.currentUser?.id ?? 'unknown',
                  rejectedAt: new Date().toISOString(),
                }
              : h
          );

          // Now apply the cascade logic through updateHypothesisStatus
          const targetHypothesis = hypothesesWithRejection.find(h => h.id === id);
          if (!targetHypothesis) {
            console.warn('Hypothesis not found:', id);
            return state;
          }

          const relationships = get().getBidirectionalRelationships(id, hypothesesWithRejection);
          const updatedHypotheses: Hypothesis[] = [];
          const newAlerts: Alert[] = [];
          const now = new Date().toISOString();
          const modificationsMap = new Map<string, Hypothesis>();

          hypothesesWithRejection.forEach((h) => {
            if (h.id === id) {
              // Update target with rejected status
              modificationsMap.set(h.id, {
                ...h,
                status: 'rejected' as const,
                updatedAt: now
              });
              return;
            }

            const relationship = relationships.find(r => r.relatedHypothesisId === h.id);

            if (!relationship) {
              updatedHypotheses.push(h);
              return;
            }

            // Only process 'supports' relationships when rejecting
            if (relationship.relationshipType === 'supports') {
              // When rejecting A that supports B, set validated B to on_hold
              if (h.status === 'validated') {
                console.log(`⚠️ Setting ${h.id} to on_hold (supporting hypothesis rejected)`);
                modificationsMap.set(h.id, {
                  ...h,
                  status: 'on_hold' as const,
                  updatedAt: now
                });

                newAlerts.push(get().createCascadeAlert(
                  h.projectId,
                  {
                    hypothesisId: id,
                    hypothesisTitle: targetHypothesis.title,
                    newStatus: 'rejected'
                  },
                  {
                    hypothesisId: h.id,
                    hypothesisTitle: h.title,
                    newStatus: 'on_hold'
                  },
                  'supports'
                ));
                return;
              }
            }

            if (!modificationsMap.has(h.id)) {
              updatedHypotheses.push(h);
            }
          });

          modificationsMap.forEach((modifiedHypothesis) => {
            updatedHypotheses.push(modifiedHypothesis);
          });

          // === SECOND PASS: Propagate rejection cascade ===
          // For each hypothesis that was just rejected, set validated supporting hypotheses to on_hold
          const rejectedInFirstPass = Array.from(modificationsMap.values()).filter(h => h.status === 'rejected');

          if (rejectedInFirstPass.length > 0) {
            console.log(`🔄 Second pass: propagating rejection cascade for ${rejectedInFirstPass.length} rejected hypotheses`);

            rejectedInFirstPass.forEach(rejectedHypothesis => {
              // Find all hypotheses that support this rejected hypothesis
              const allHypothesesWithModifications = [...updatedHypotheses, ...Array.from(modificationsMap.values())];

              allHypothesesWithModifications.forEach(h => {
                // Skip if already processed
                if (modificationsMap.has(h.id)) return;

                // Check if h supports the rejected hypothesis
                const hSupportsRejected = h.relations?.some(
                  rel => rel.hypothesisId === rejectedHypothesis.id && rel.type === 'supports'
                );

                // Only set to on_hold if currently validated
                if (hSupportsRejected && h.status === 'validated') {
                  console.log(`⚠️ Second pass: Setting ${h.id} to on_hold (supports rejected hypothesis ${rejectedHypothesis.id})`);

                  const cascadedHypothesis = {
                    ...h,
                    status: 'on_hold' as const,
                    updatedAt: now
                  };

                  modificationsMap.set(h.id, cascadedHypothesis);

                  // Update updatedHypotheses array
                  const indexInUpdated = updatedHypotheses.findIndex(uh => uh.id === h.id);
                  if (indexInUpdated >= 0) {
                    updatedHypotheses[indexInUpdated] = cascadedHypothesis;
                  }

                  newAlerts.push(get().createCascadeAlert(
                    h.projectId,
                    {
                      hypothesisId: rejectedHypothesis.id,
                      hypothesisTitle: rejectedHypothesis.title,
                      newStatus: 'rejected'
                    },
                    {
                      hypothesisId: h.id,
                      hypothesisTitle: h.title,
                      newStatus: 'on_hold'
                    },
                    'supports'
                  ));
                }
              });
            });
          }

          console.log(`📊 Rejection complete: ${modificationsMap.size} hypotheses modified`);
          console.log(`🔔 Generated ${newAlerts.length} alerts`);

          return {
            hypotheses: updatedHypotheses,
            alerts: [...state.alerts, ...newAlerts]
          };
        }),

      updateHypothesisBody: (id, body, userId) =>
        set((state) => {
          const h = state.hypotheses.find((x) => x.id === id);
          if (!h) return state;
          const newVersion: HypothesisVersion = {
            version: h.versions.length + 1,
            content: body,
            changedBy: userId,
            changedAt: new Date().toISOString(),
            changeNote: 'Body modified',
          };
          return {
            hypotheses: state.hypotheses.map((x) =>
              x.id === id
                ? {
                    ...x,
                    body,
                    versions: [...x.versions, newVersion],
                    updatedAt: new Date().toISOString(),
                    updatedBy: userId,
                  }
                : x
            ),
          };
        }),

      addSourceToHypothesis: (hypothesisId, source) =>
        set((state) => ({
          hypotheses: state.hypotheses.map((h) =>
            h.id === hypothesisId
              ? {
                  ...h,
                  sources: [...(h.sources || []), source],
                  // also add to legacy sourceIds if not already there
                  sourceIds: h.sourceIds.includes(source.sourceId)
                    ? h.sourceIds
                    : [...h.sourceIds, source.sourceId],
                  updatedAt: new Date().toISOString(),
                }
              : h
          ),
        })),

      removeHypothesisRelation: (hypothesisId, targetHypothesisId) =>
        set((state) => ({
          hypotheses: state.hypotheses.map((h) => {
            // Remove relationship in BOTH directions
            if (h.id === hypothesisId) {
              // Remove hypothesisId → targetHypothesisId
              return {
                ...h,
                relations: h.relations.filter((r) => r.hypothesisId !== targetHypothesisId),
                updatedAt: new Date().toISOString(),
              };
            } else if (h.id === targetHypothesisId) {
              // Supprimer aussi targetHypothesisId → hypothesisId (relation inverse)
              return {
                ...h,
                relations: h.relations.filter((r) => r.hypothesisId !== hypothesisId),
                updatedAt: new Date().toISOString(),
              };
            }
            return h;
          }),
        })),

      addHypothesisRelation: (hypothesisId, targetHypothesisId, relationType) =>
        set((state) => ({
          hypotheses: state.hypotheses.map((h) => {
            if (h.id === hypothesisId) {
              // Prevent self-relations
              if (hypothesisId === targetHypothesisId) {
                console.warn('Cannot create self-relation');
                return h;
              }

              // Check for duplicate relations (same target + same type)
              const exists = h.relations.some(
                r => r.hypothesisId === targetHypothesisId && r.type === relationType
              );
              if (exists) {
                console.warn('Relation already exists');
                return h;
              }

              // Add new relation
              return {
                ...h,
                relations: [
                  ...h.relations,
                  { hypothesisId: targetHypothesisId, type: relationType }
                ],
                updatedAt: new Date().toISOString(),
              };
            }
            return h;
          }),
        })),

      createHypothesis: (data) => {
        const newH: Hypothesis = {
          ...data,
          id: `h${Date.now()}`,
          sources: data.sources || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // Ensure metadata is set with backward compatibility
          metadata: data.metadata || { source: 'manual' },
        };
        set((state) => ({ hypotheses: [newH, ...state.hypotheses] }));

        // Log activity
        get().addActivityLog(
          'Hypothesis created',
          'hypothesis',
          newH.id,
          newH.title
        );

        return newH;
      },
      markAlertRead: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
        })),
      addActivityLog: (action, targetType, targetId, targetName, detail) => {
        const state = get();
        const user = state.currentUser;
        const projectId = state.selectedProjectId;

        if (!user || !projectId) return;

        const newLog: ActivityLog = {
          id: `log${Date.now()}`,
          projectId,
          action,
          actor: user.name,
          actorId: user.id,
          targetType,
          targetId,
          targetName,
          timestamp: new Date().toISOString(),
          detail,
        };

        set((state) => ({
          activityLogs: [newLog, ...state.activityLogs],
        }));
      },
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      getNodeSelectedSources: (nodeId: string) => {
        const state = get();
        if (state.nodeSourceSelections[nodeId]) return state.nodeSourceSelections[nodeId];
        // Lazy init: all sources selected by default
        return NODE_SOURCES[nodeId] || [];
      },
      toggleSourceSelection: (nodeId, sourceId) =>
        set((state) => {
          const current = state.nodeSourceSelections[nodeId] || NODE_SOURCES[nodeId] || [];
          const isSelected = current.includes(sourceId);
          const updated = isSelected
            ? current.filter((id) => id !== sourceId)
            : [...current, sourceId];

          // If selecting a source (not deselecting), pre-fill chat and switch to chat tab
          if (!isSelected) {
            // DEMO: Dialectica interview for Thomas - specialized prompt
            const chatMessage = sourceId === 's774'
              ? 'Based on this expert interview, what evidence suggests Revolut\'s UK retail growth is actually accelerating despite market perceptions? Highlight revenue metrics, product innovation velocity, and strategic positioning advantages over Monzo.'
              : 'Cross-reference these findings with the latest Bloomberg data and recent market signals ?';

            return {
              nodeSourceSelections: { ...state.nodeSourceSelections, [nodeId]: updated },
              suggestedChatMessage: chatMessage,
              selectedResearchTab: 'chat',
            };
          }

          return { nodeSourceSelections: { ...state.nodeSourceSelections, [nodeId]: updated } };
        }),
      selectAllNodeSources: (nodeId) =>
        set((state) => ({
          nodeSourceSelections: { ...state.nodeSourceSelections, [nodeId]: NODE_SOURCES[nodeId] || [] },
        })),
      deselectAllNodeSources: (nodeId) =>
        set((state) => ({
          nodeSourceSelections: { ...state.nodeSourceSelections, [nodeId]: [] },
        })),
      addSourceToNode: (nodeId, sourceData) => {
        const newSource: Source = {
          ...sourceData,
          id: `s${Date.now()}`,
        };
        // Add to global SOURCES array
        SOURCES.push(newSource);
        // Add to NODE_SOURCES mapping
        if (!NODE_SOURCES[nodeId]) {
          NODE_SOURCES[nodeId] = [];
        }
        NODE_SOURCES[nodeId].push(newSource.id);
        // Auto-select the new source AND auto-add to matrix scope
        set((state) => {
          // Find matrix scope for this node and auto-add source to it
          const scope = state.matrixScopes.find(s => s.nodeId === nodeId);
          const updatedScopes = scope
            ? state.matrixScopes.map(s =>
                s.id === scope.id && !s.discoveredSourceIds.includes(newSource.id)
                  ? { ...s, discoveredSourceIds: [...s.discoveredSourceIds, newSource.id] }
                  : s
              )
            : state.matrixScopes;

          return {
            nodeSourceSelections: {
              ...state.nodeSourceSelections,
              [nodeId]: [...(state.nodeSourceSelections[nodeId] || NODE_SOURCES[nodeId] || []), newSource.id],
            },
            matrixScopes: updatedScopes,
          };
        });
        return newSource;
      },
      connectConnector: (connectorId) =>
        set((state) => ({
          connectedConnectors: state.connectedConnectors.includes(connectorId)
            ? state.connectedConnectors
            : [...state.connectedConnectors, connectorId],
        })),
      disconnectConnector: (connectorId) =>
        set((state) => ({
          connectedConnectors: state.connectedConnectors.filter((id) => id !== connectorId),
        })),

      // ─── Node CRUD ────────────────────────────────────────────────────────
      addNodesForProject: (projectId, newNodes) =>
        set((state) => ({
          nodes: [
            ...state.nodes.filter((n) => n.projectId !== projectId),
            ...newNodes,
          ],
        })),
      updateNode: (nodeId, patch) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === nodeId
              ? { ...n, ...patch, updatedAt: new Date().toISOString(), updatedBy: state.currentUser?.id }
              : n
          ),
        })),
      addNode: (node) =>
        set((state) => ({ nodes: [...state.nodes, node] })),
      deleteNode: (nodeId) =>
        set((state) => {
          const idsToDelete = new Set<string>();
          const collect = (id: string) => {
            idsToDelete.add(id);
            state.nodes
              .filter((n) => n.parentId === id)
              .forEach((child) => collect(child.id));
          };
          collect(nodeId);
          return { nodes: state.nodes.filter((n) => !idsToDelete.has(n.id)) };
        }),

      // ─── Node Comments ────────────────────────────────────────────────────
      addNodeComment: (comment) =>
        set((state) => ({ nodeComments: [...state.nodeComments, comment] })),
      resolveNodeComment: (commentId) =>
        set((state) => ({
          nodeComments: state.nodeComments.map((c) =>
            c.id === commentId ? { ...c, resolved: true } : c
          ),
        })),

      // ─── Node Versions ────────────────────────────────────────────────────
      addNodeVersion: (version) =>
        set((state) => ({ nodeVersions: [...state.nodeVersions, version] })),

      // ─── Analysis Matrix ──────────────────────────────────────────────────

      // ─── Matrix Scope Actions ───────────────────────────────────────────
      addMatrixScope: async (scopeData, userId) => {
        const newScope: MatrixScope = {
          ...scopeData,
          id: `ms${Date.now()}`,
          createdAt: new Date().toISOString(),
          createdBy: userId,
          discoveredSourceIds: [],
          discoveryStatus: 'idle',
        };

        // Perform semantic search to discover documents
        try {
          const discoveredIds = await searchDocumentsByScope(scopeData.scopePrompt, scopeData.nodeId);
          newScope.discoveredSourceIds = discoveredIds;
        } catch (error) {
          console.error('Error discovering sources:', error);
        }

        set((state) => ({
          matrixScopes: [...state.matrixScopes, newScope],
        }));

        // Auto-create "Synthesis" column
        const synthesisColumn: MatrixColumn = {
          id: `mc${Date.now()}-synthesis`,
          matrixScopeId: newScope.id,
          label: 'Synthesis',
          prompt: 'Document summary in the scope context',
          type: 'text',
          order: 0,
          isSystemGenerated: true,
          createdBy: userId,
          createdAt: new Date().toISOString(),
        };

        // Auto-generate cells for synthesis column
        const synthesisCells: MatrixCell[] = newScope.discoveredSourceIds.map((sourceId, idx) => ({
          id: `mce${Date.now()}-${idx}`,
          columnId: synthesisColumn.id,
          sourceId,
          matrixScopeId: newScope.id,
          value: null,
          status: 'idle' as const,
        }));

        set((state) => ({
          matrixColumns: [...state.matrixColumns, synthesisColumn],
          matrixCells: [...state.matrixCells, ...synthesisCells],
        }));

        // Auto-generate synthesis for all discovered documents
        newScope.discoveredSourceIds.forEach((sourceId) => {
          get().generateMatrixCell(synthesisColumn.id, sourceId, newScope.id);
        });

        return newScope;
      },

      updateMatrixScope: (id, patch) =>
        set((state) => ({
          matrixScopes: state.matrixScopes.map((s) =>
            s.id === id ? { ...s, ...patch, updatedAt: new Date().toISOString() } : s
          ),
        })),

      // Update scope conversation (from chat UI)
      updateScopeConversation: (scopeId, conversation, suggestedSourceIds) =>
        set((state) => ({
          matrixScopes: state.matrixScopes.map((s) =>
            s.id === scopeId
              ? {
                  ...s,
                  discoveryConversation: conversation,
                  suggestedSourceIds,
                  discoveryStatus: 'reviewing' as const,
                  updatedAt: new Date().toISOString(),
                }
              : s
          ),
        })),

      // Validate scope documents (Hebbia-style flow)
      validateScopeDocuments: async (scopeId, approvedSourceIds) => {
        const scope = get().matrixScopes.find((s) => s.id === scopeId);
        if (!scope) return;

        const previousSourceIds = scope.discoveredSourceIds;
        const newSourceIds = approvedSourceIds.filter(id => !previousSourceIds.includes(id));

        // Update scope with validated documents
        set((state) => ({
          matrixScopes: state.matrixScopes.map((s) =>
            s.id === scopeId
              ? {
                  ...s,
                  discoveredSourceIds: approvedSourceIds,
                  discoveryStatus: 'validated' as const,
                  lastValidatedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }
              : s
          ),
        }));

        // Get all auto-execute columns for this scope
        const autoExecuteColumns = get().matrixColumns.filter(
          (c) => c.matrixScopeId === scopeId && c.isAutoExecute !== false
        );

        // Create cells for new documents
        if (newSourceIds.length > 0) {
          const newCells: MatrixCell[] = [];
          for (const column of autoExecuteColumns) {
            for (const sourceId of newSourceIds) {
              newCells.push({
                id: `mce${Date.now()}-${nanoid()}`,
                columnId: column.id,
                sourceId,
                matrixScopeId: scopeId,
                value: null,
                status: 'idle',
              });
            }
          }

          set((state) => ({
            matrixCells: [...state.matrixCells, ...newCells],
          }));

          // Create batch jobs for auto-execution
          for (const column of autoExecuteColumns) {
            get().createGenerationJob(column.id, newSourceIds, scopeId);

            // Execute job
            const job = get().cellGenerationJobs.find(
              j => j.columnId === column.id && j.status === 'queued'
            );
            if (job) {
              cellGenerationQueue.executeBatchJob(
                job.id,
                (progress, processedCount) => {
                  get().updateJobProgress(job.id, progress, processedCount);
                },
                async (columnId, sourceId) => {
                  // Call the store method to ensure reactive updates via Zustand's set()
                  await get().generateMatrixCell(columnId, sourceId, scopeId);
                }
              ).then(() => {
                get().completeJob(job.id);
              }).catch((error) => {
                console.error('Job execution failed:', error);
              });
            }
          }
        }
      },

      deleteMatrixScope: (id) =>
        set((state) => ({
          matrixScopes: state.matrixScopes.filter((s) => s.id !== id),
          matrixColumns: state.matrixColumns.filter((c) => c.matrixScopeId !== id),
          matrixCells: state.matrixCells.filter((c) => c.matrixScopeId !== id),
        })),

      refreshScopeDiscovery: async (scopeId) => {
        const scope = get().matrixScopes.find((s) => s.id === scopeId);
        if (!scope) return;

        try {
          const discoveredIds = await searchDocumentsByScope(scope.scopePrompt, scope.nodeId);

          set((state) => ({
            matrixScopes: state.matrixScopes.map((s) =>
              s.id === scopeId ? { ...s, discoveredSourceIds: discoveredIds, updatedAt: new Date().toISOString() } : s
            ),
          }));

          // Update cells for new/removed sources
          const columns = get().matrixColumns.filter((c) => c.matrixScopeId === scopeId);
          columns.forEach((column) => {
            discoveredIds.forEach((sourceId) => {
              const cellExists = get().matrixCells.some(
                (c) => c.columnId === column.id && c.sourceId === sourceId
              );
              if (!cellExists) {
                const newCell: MatrixCell = {
                  id: `mce${Date.now()}-${column.id}-${sourceId}`,
                  columnId: column.id,
                  sourceId,
                  matrixScopeId: scopeId,
                  value: null,
                  status: 'idle',
                };
                set((state) => ({
                  matrixCells: [...state.matrixCells, newCell],
                }));
              }
            });
          });
        } catch (error) {
          console.error('Error refreshing scope discovery:', error);
        }
      },

      refreshMatrixScope: async (scopeId, newPrompt, userId) => {
        const scope = get().matrixScopes.find((s) => s.id === scopeId);
        if (!scope) return;

        try {
          // 1. Update scope prompt
          set((state) => ({
            matrixScopes: state.matrixScopes.map((s) =>
              s.id === scopeId
                ? {
                    ...s,
                    scopePrompt: newPrompt,
                    updatedAt: new Date().toISOString(),
                  }
                : s
            ),
          }));

          // 2. Re-run semantic search with new prompt
          const newSourceIds = await searchDocumentsByScope(newPrompt, scope.nodeId);

          // 3. Update discovered sources
          set((state) => ({
            matrixScopes: state.matrixScopes.map((s) =>
              s.id === scopeId
                ? { ...s, discoveredSourceIds: newSourceIds }
                : s
            ),
          }));

          // 4. Delete all existing cells for this scope
          set((state) => ({
            matrixCells: state.matrixCells.filter((c) => c.matrixScopeId !== scopeId),
          }));

          // 5. Get all columns for this scope
          const columns = get().matrixColumns.filter((c) => c.matrixScopeId === scopeId);

          // 6. Create new cells for each (column × source) combination
          const newCells: MatrixCell[] = [];
          for (const column of columns) {
            for (const sourceId of newSourceIds) {
              const cellId = `mce${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              newCells.push({
                id: cellId,
                columnId: column.id,
                sourceId,
                matrixScopeId: scopeId,
                value: null,
                status: 'idle',
              });
            }
          }

          set((state) => ({
            matrixCells: [...state.matrixCells, ...newCells],
          }));

          // 7. Auto-generate synthesis column cells
          const synthesisColumn = columns.find((c) => c.isSystemGenerated);
          if (synthesisColumn) {
            for (const sourceId of newSourceIds) {
              // Find the cell we just created
              const cell = newCells.find(
                (c) => c.columnId === synthesisColumn.id && c.sourceId === sourceId
              );
              if (cell) {
                // Trigger generation
                get().generateMatrixCell(synthesisColumn.id, sourceId, scopeId);
              }
            }
          }
        } catch (error) {
          console.error('Error refreshing matrix scope:', error);
        }
      },

      // ─── Matrix Column Actions ──────────────────────────────────────────
      addMatrixColumn: (colData) => {
        const newCol: MatrixColumn = {
          ...colData,
          id: `mc${Date.now()}`,
          createdAt: new Date().toISOString(),
          isAutoExecute: colData.isAutoExecute ?? true, // Default to true
        };

        // Get scope to find discovered sources
        const scope = get().matrixScopes.find((s) => s.id === colData.matrixScopeId);
        if (!scope) {
          console.error('Matrix scope not found');
          return newCol;
        }

        // Auto-generate idle cells for all discovered sources
        const newCells: MatrixCell[] = scope.discoveredSourceIds.map((sourceId, idx) => ({
          id: `mce${Date.now()}-${idx}`,
          columnId: newCol.id,
          sourceId,
          matrixScopeId: colData.matrixScopeId,
          value: null,
          status: 'idle' as const,
        }));

        set((state) => ({
          matrixColumns: [...state.matrixColumns, newCol],
          matrixCells: [...state.matrixCells, ...newCells],
        }));

        // Auto-generate all cells if auto-execute enabled
        if (newCol.isAutoExecute !== false) {
          newCells.forEach((cell) => {
            get().generateMatrixCell(newCol.id, cell.sourceId, colData.matrixScopeId);
          });
        }

        return newCol;
      },

      // Add columns from templates (batch creation)
      addMatrixColumnsFromTemplates: async (scopeId, templateIds, userId, autoGenerate = true) => {
        console.log('[addMatrixColumnsFromTemplates] Called with:', { scopeId, templateIds, userId, autoGenerate });
        const scope = get().matrixScopes.find((s) => s.id === scopeId);
        if (!scope) {
          console.error('Matrix scope not found');
          return [];
        }

        const newColumns: MatrixColumn[] = [];
        const newCells: MatrixCell[] = [];

        // Get next order number
        const existingColumns = get().matrixColumns.filter((c) => c.matrixScopeId === scopeId);
        let nextOrder = Math.max(...existingColumns.map((c) => c.order), 0) + 1;

        // Create columns from templates
        for (const templateId of templateIds) {
          const template = getTemplateById(templateId);
          if (!template) {
            console.warn(`Template ${templateId} not found`);
            continue;
          }

          const newCol: MatrixColumn = {
            id: `mc${Date.now()}-${nanoid()}`,
            matrixScopeId: scopeId,
            label: template.label,
            prompt: template.prompt,
            type: template.type,
            order: nextOrder++,
            isSystemGenerated: false,
            isAutoExecute: autoGenerate,
            createdBy: userId,
            createdAt: new Date().toISOString(),
          };

          newColumns.push(newCol);

          // Create cells for this column
          for (const sourceId of scope.discoveredSourceIds) {
            newCells.push({
              id: `mce${Date.now()}-${nanoid()}`,
              columnId: newCol.id,
              sourceId,
              matrixScopeId: scopeId,
              value: null,
              status: 'idle',
            });
          }
        }

        // Update state
        set((state) => ({
          matrixColumns: [...state.matrixColumns, ...newColumns],
          matrixCells: [...state.matrixCells, ...newCells],
        }));

        // Create batch jobs for auto-execution only if autoGenerate is true
        console.log('[addMatrixColumnsFromTemplates] autoGenerate:', autoGenerate, 'newColumns:', newColumns.length, 'sources:', scope.discoveredSourceIds.length);
        if (autoGenerate) {
          console.log('[addMatrixColumnsFromTemplates] Creating generation jobs for', newColumns.length, 'columns');
          for (const column of newColumns) {
            if (scope.discoveredSourceIds.length > 0) {
              // Create job in the singleton queue (not in Zustand store)
              const job = cellGenerationQueue.createBatchJob(column.id, scope.discoveredSourceIds, scopeId);
              console.log('[addMatrixColumnsFromTemplates] Created job:', job.id, 'for column:', column.label);

              // Execute job immediately
              cellGenerationQueue.executeBatchJob(
                job.id,
                (progress, processedCount) => {
                  // Progress tracking (optional - could update UI here)
                  console.log(`Job ${job.id} progress: ${progress}% (${processedCount}/${scope.discoveredSourceIds.length})`);
                },
                async (columnId, sourceId) => {
                  // Call the store method to ensure reactive updates via Zustand's set()
                  await get().generateMatrixCell(columnId, sourceId, scopeId);
                }
              ).then(() => {
                console.log(`Job ${job.id} completed successfully`);
              }).catch((error) => {
                console.error('Job execution failed:', error);
              });
            }
          }
        }

        // Log activity for each column added
        newColumns.forEach((column) => {
          get().addActivityLog(
            'Column added',
            'matrix_column',
            column.id,
            column.label,
            `Added to matrix from template`
          );
        });

        return newColumns;
      },

      updateMatrixColumn: (id, patch) =>
        set((state) => ({
          matrixColumns: state.matrixColumns.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        })),

      deleteMatrixColumn: (id) =>
        set((state) => ({
          matrixColumns: state.matrixColumns.filter((c) => c.id !== id),
          matrixCells: state.matrixCells.filter((cell) => cell.columnId !== id),
        })),

      // ─── Matrix Cell Actions ────────────────────────────────────────────
      generateMatrixCell: async (columnId, sourceId, matrixScopeId) => {
        const cellId = `mce${Date.now()}-${columnId}-${sourceId}`;

        // Upsert: find existing idle cell or create one
        set((state) => {
          const existing = state.matrixCells.find(
            (c) => c.columnId === columnId && c.sourceId === sourceId && c.matrixScopeId === matrixScopeId
          );
          const targetId = existing?.id ?? cellId;
          const updatingCells = existing
            ? state.matrixCells.map((c) =>
                c.id === targetId ? { ...c, status: 'generating' as const } : c
              )
            : [
                ...state.matrixCells,
                { id: targetId, columnId, sourceId, matrixScopeId, value: null, status: 'generating' as const },
              ];
          return { matrixCells: updatingCells };
        });

        // Generate cell value using synthesis service
        try {
          const column = get().matrixColumns.find((c) => c.id === columnId);
          if (!column) throw new Error('Column not found');

          let value: string;
          if (column.isSystemGenerated && column.label === 'Synthesis') {
            // Generate document summary
            const scope = get().matrixScopes.find((s) => s.id === matrixScopeId);
            value = await generateDocumentSummary(sourceId, scope?.scopePrompt || '');
          } else {
            // Generate column-specific extraction
            value = await generateCellSynthesis(sourceId, column.prompt, matrixScopeId);
          }

          set((state) => ({
            matrixCells: state.matrixCells.map((c) =>
              c.columnId === columnId && c.sourceId === sourceId && c.matrixScopeId === matrixScopeId
                ? { ...c, status: 'done' as const, value, generatedAt: new Date().toISOString() }
                : c
            ),
          }));
        } catch (error) {
          console.error('Error generating cell:', error);
          set((state) => ({
            matrixCells: state.matrixCells.map((c) =>
              c.columnId === columnId && c.sourceId === sourceId && c.matrixScopeId === matrixScopeId
                ? { ...c, status: 'error' as const }
                : c
            ),
          }));
        }
      },

      setCellHypothesis: (cellId, hypothesisId) =>
        set((state) => ({
          matrixCells: state.matrixCells.map((c) =>
            c.id === cellId ? { ...c, hypothesisId } : c
          ),
        })),

      toggleCellSelection: (cellId) =>
        set((state) => ({
          matrixCells: state.matrixCells.map((c) =>
            c.id === cellId ? { ...c, isSelected: !c.isSelected } : c
          ),
        })),

      toggleCellFavorite: (cellId) => {
        const state = get();
        const cell = state.matrixCells.find((c) => c.id === cellId);
        if (!cell) return;

        const newFavoriteState = !cell.isFavorite;

        set((state) => ({
          matrixCells: state.matrixCells.map((c) =>
            c.id === cellId ? { ...c, isFavorite: newFavoriteState } : c
          ),
        }));

        // Get column and source info for the log
        const column = state.matrixColumns.find((col) => col.id === cell.columnId);
        const source = [...SOURCES, ...CONNECTOR_SOURCES].find((s) => s.id === cell.sourceId);

        if (column && source) {
          get().addActivityLog(
            newFavoriteState ? 'Cell favorited' : 'Cell unfavorited',
            'matrix_cell',
            cellId,
            `${source.title} × ${column.label}`,
            `${column.label} for ${source.title}`
          );
        }
      },

      toggleShowOnlyFavorites: () =>
        set((state) => ({
          showOnlyFavorites: !state.showOnlyFavorites,
        })),

      selectAllCellsInColumn: (columnId, matrixScopeId) =>
        set((state) => ({
          matrixCells: state.matrixCells.map((c) =>
            c.columnId === columnId && c.matrixScopeId === matrixScopeId
              ? { ...c, isSelected: true }
              : c
          ),
        })),

      deselectAllCells: () =>
        set((state) => ({
          matrixCells: state.matrixCells.map((c) => ({ ...c, isSelected: false })),
        })),

      getSelectedCells: () =>
        get().matrixCells.filter((c) => c.isSelected),

      // ─── Job Queue Actions ───────────────────────────────────────────────
      createGenerationJob: (columnId, sourceIds, matrixScopeId) => {
        const job: CellGenerationJob = {
          id: nanoid(),
          matrixScopeId,
          columnId,
          sourceIds,
          status: 'queued',
          progress: 0,
          processedCount: 0,
          totalCount: sourceIds.length,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          cellGenerationJobs: [...state.cellGenerationJobs, job],
        }));

        return job;
      },

      updateJobProgress: (jobId, progress, processedCount) =>
        set((state) => ({
          cellGenerationJobs: state.cellGenerationJobs.map((j) =>
            j.id === jobId
              ? { ...j, progress, processedCount, status: 'processing' as const }
              : j
          ),
        })),

      completeJob: (jobId) =>
        set((state) => ({
          cellGenerationJobs: state.cellGenerationJobs.map((j) =>
            j.id === jobId
              ? {
                  ...j,
                  status: 'completed' as const,
                  progress: 100,
                  completedAt: new Date().toISOString(),
                }
              : j
          ),
        })),

      cancelJob: (jobId) =>
        set((state) => ({
          cellGenerationJobs: state.cellGenerationJobs.filter((j) => j.id !== jobId),
        })),

      // ─── Matrix → Chat Integration ───────────────────────────────────────
      setMatrixChatContext: (cells, columns, nodeId, scopeId) =>
        set({
          matrixChatContext: {
            cells,
            columns,
            nodeId,
            matrixScopeId: scopeId,
            createdAt: new Date().toISOString(),
          },
        }),

      clearMatrixChatContext: () => set({ matrixChatContext: null }),

      addCellsToMatrixChatContext: (cells, columns) =>
        set((state) => {
          if (!state.matrixChatContext) {
            // If no context exists, create a new one with the first cell's info
            const firstCell = cells[0];
            if (!firstCell) return state;
            return {
              matrixChatContext: {
                cells,
                columns,
                nodeId: firstCell.matrixScopeId, // Use matrixScopeId as fallback
                matrixScopeId: firstCell.matrixScopeId,
                createdAt: new Date().toISOString(),
              },
            };
          }

          // Merge new cells with existing ones, avoiding duplicates
          const existingCellIds = new Set(state.matrixChatContext.cells.map(c => c.id));
          const newCells = cells.filter(c => !existingCellIds.has(c.id));

          // Merge columns similarly
          const existingColumnIds = new Set(state.matrixChatContext.columns.map(c => c.id));
          const newColumns = columns.filter(c => !existingColumnIds.has(c.id));

          return {
            matrixChatContext: {
              ...state.matrixChatContext,
              cells: [...state.matrixChatContext.cells, ...newCells],
              columns: [...state.matrixChatContext.columns, ...newColumns],
            },
          };
        }),

      // ─── Multi-Strategy Synthesis ────────────────────────────────────────
      generateHypothesisWithStrategy: async (strategy, context) => {
        const { selectedCells, selectionGeometry, columnLabels, sourceNames } = context;

        let synthesisResult: string;

        switch (strategy) {
          case 'reliable_source':
            synthesisResult = await synthesizeByReliableSource(selectedCells, sourceNames);
            break;

          case 'intelligent_average':
            // Get column prompt from first selected cell
            const firstCell = selectedCells[0];
            const column = get().matrixColumns.find(c => c.id === firstCell.columnId);
            synthesisResult = await synthesizeByAveraging(
              selectedCells,
              column?.prompt || '',
              sourceNames
            );
            break;

          case 'row_synthesis':
            // Get source name from first cell
            const sourceName = sourceNames.get(selectedCells[0].sourceId) || 'Unknown source';
            synthesisResult = await synthesizeRow(selectedCells, sourceName, columnLabels);
            break;

          case 'global_synthesis':
            synthesisResult = await synthesizeGlobal(context);
            break;

          default:
            throw new Error(`Unknown synthesis strategy: ${strategy}`);
        }

        return synthesisResult;
      },

      // ─── Reset Store ─────────────────────────────────────────────────────
      resetStore: () => {
        set({
          currentUser: null,
          selectedProjectId: null,
          selectedNodeId: null,
          selectedHypothesisId: null,
          projects: PROJECTS,
          hypotheses: HYPOTHESES,
          alerts: ALERTS,
          activityLogs: ACTIVITY_LOG,
          nodes: WORKSTREAM_NODES,
          nodeComments: [],
          nodeVersions: [],
          sidebarOpen: false,
          nodeSourceSelections: {},
          connectedConnectors: ['google_drive', 'capitaliq'],
          recentNodes: [],
          matrixScopes: MATRIX_SCOPES,
          matrixColumns: MATRIX_COLUMNS,
          matrixCells: MATRIX_CELLS,
          cellGenerationJobs: [],
          matrixChatContext: null,
        });
      },
    }),
    {
      name: 'cdd-platform-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        sidebarOpen: state.sidebarOpen,
        projects: state.projects,
        hypotheses: state.hypotheses,
        alerts: state.alerts,
        nodes: state.nodes,
        nodeComments: state.nodeComments,
        nodeVersions: state.nodeVersions,
        nodeSourceSelections: state.nodeSourceSelections,
        connectedConnectors: state.connectedConnectors,
        recentNodes: state.recentNodes,
        expandedGraphNodes: Array.from(state.expandedGraphNodes), // Convert Set to array for storage
        // showOnlyFavorites: removed from persistence - always starts as false
        matrixScopes: state.matrixScopes,
        matrixColumns: state.matrixColumns,
        matrixCells: state.matrixCells,
        cellGenerationJobs: state.cellGenerationJobs,
        matrixChatContext: state.matrixChatContext,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        // Convert array back to Set on hydration
        expandedGraphNodes: new Set(persistedState?.expandedGraphNodes || ['n0']),
      }),
    }
  )
);

export { USERS };
