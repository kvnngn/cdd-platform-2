import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Hypothesis, HypothesisSource, HypothesisVersion, WorkstreamNode, Alert, Project, Source, NodeComment, NodeVersion, MatrixColumn, MatrixCell, MatrixScope } from '@/types';
import { CellGenerationJob, SynthesisStrategy, SynthesisContext } from '@/types/matrix';
import { USERS } from '@/data/users';
import { HYPOTHESES, ALERTS, WORKSTREAM_NODES, PROJECTS, NODE_SOURCES, SOURCES, CONNECTORS, CONNECTOR_SOURCES, MATRIX_SCOPES, MATRIX_COLUMNS, MATRIX_CELLS, MOCK_CELL_VALUES } from '@/data/mockData';
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

  setCurrentUser: (user: User) => void;
  logout: () => void;
  setSelectedProject: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedResearchTab: (tab: 'chat' | 'matrix') => void;
  setActiveProjectView: (view: 'board' | 'tree' | 'manager') => void;
  setSelectedHypothesis: (id: string | null) => void;
  toggleGraphNodeExpansion: (nodeId: string) => void;
  setExpandedGraphNodes: (nodeIds: Set<string>) => void;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateHypothesisStatus: (id: string, status: Hypothesis['status']) => void;
  // Hypothesis rich actions
  rejectHypothesisWithReason: (id: string, reason: string) => void;
  updateHypothesisBody: (id: string, body: string, userId: string) => void;
  addSourceToHypothesis: (hypothesisId: string, source: HypothesisSource) => void;
  removeHypothesisRelation: (hypothesisId: string, targetHypothesisId: string) => void;
  createHypothesis: (data: Omit<Hypothesis, 'id' | 'createdAt' | 'updatedAt'>) => Hypothesis;
  markAlertRead: (id: string) => void;
  toggleSidebar: () => void;
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
  addMatrixColumnsFromTemplates: (scopeId: string, templateIds: string[], userId: string) => Promise<MatrixColumn[]>;
  updateMatrixColumn: (id: string, patch: Partial<MatrixColumn>) => void;
  deleteMatrixColumn: (id: string) => void;
  // Cell actions
  generateMatrixCell: (columnId: string, sourceId: string, matrixScopeId: string) => Promise<void>;
  setCellHypothesis: (cellId: string, hypothesisId: string) => void;
  toggleCellSelection: (cellId: string) => void;
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
      nodes: WORKSTREAM_NODES,
      nodeComments: [],
      nodeVersions: [],
      sidebarOpen: true,
      nodeSourceSelections: {},
      connectedConnectors: ['google_drive', 'capitaliq'], // Mock: connecteurs déjà connectés
      recentNodes: [],
      expandedGraphNodes: new Set(['n0']), // Root node expanded by default
      selectedResearchTab: 'chat',
      activeProjectView: 'board',
      matrixScopes: MATRIX_SCOPES,
      matrixColumns: MATRIX_COLUMNS,
      matrixCells: MATRIX_CELLS,
      cellGenerationJobs: [],

      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null, selectedProjectId: null, selectedNodeId: null }),
      setSelectedProject: (id) => set({ selectedProjectId: id }),
      setSelectedResearchTab: (tab) => set({ selectedResearchTab: tab }),
      setActiveProjectView: (view) => set({ activeProjectView: view }),
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
      updateHypothesisStatus: (id, status) =>
        set((state) => {
          // Trouver l'hypothèse qu'on modifie pour vérifier ses relations
          const targetHypothesis = state.hypotheses.find(h => h.id === id);

          console.log('🔄 updateHypothesisStatus:', { id, status });
          console.log('🎯 Target hypothesis:', targetHypothesis?.title);
          console.log('📋 Target relations:', targetHypothesis?.relations);

          const updatedHypotheses = state.hypotheses.map((h) => {
            // Mettre à jour l'hypothèse ciblée
            if (h.id === id) {
              console.log('✅ Updating target hypothesis to:', status);
              return { ...h, status, updatedAt: new Date().toISOString() };
            }

            // Si on rejette une hypothèse, mettre en "on_hold" les hypothèses validées liées
            if (status === 'rejected' && h.status === 'validated') {
              // Vérifier la relation dans les DEUX directions :
              // 1. Est-ce que h a une relation vers l'hypothèse rejetée ?
              const hPointsToRejected = h.relations.some(rel => rel.hypothesisId === id);
              // 2. Est-ce que l'hypothèse rejetée a une relation vers h ?
              const rejectedPointsToH = targetHypothesis?.relations.some(rel => rel.hypothesisId === h.id) ?? false;

              console.log(`🔍 Checking ${h.id}:`, {
                title: h.title.substring(0, 50),
                hPointsToRejected,
                rejectedPointsToH,
                hRelations: h.relations,
              });

              if (hPointsToRejected || rejectedPointsToH) {
                console.log(`⚠️ Setting ${h.id} to on_hold`);
                return { ...h, status: 'on_hold' as const, updatedAt: new Date().toISOString() };
              }
            }

            return h;
          });

          return { hypotheses: updatedHypotheses };
        }),

      // ─── Hypothesis rich actions ──────────────────────────────────────────
      rejectHypothesisWithReason: (id, reason) =>
        set((state) => {
          // Trouver l'hypothèse qu'on rejette pour vérifier ses relations
          const targetHypothesis = state.hypotheses.find(h => h.id === id);

          console.log('🔄 rejectHypothesisWithReason:', { id, reason });
          console.log('🎯 Target hypothesis:', targetHypothesis?.title);
          console.log('📋 Target relations:', targetHypothesis?.relations);

          return {
            hypotheses: state.hypotheses.map((h) => {
              // Mettre à jour l'hypothèse ciblée avec le rejet
              if (h.id === id) {
                console.log('✅ Rejecting target hypothesis');
                return {
                  ...h,
                  status: 'rejected' as const,
                  rejectionReason: reason,
                  rejectedBy: state.currentUser?.id ?? 'unknown',
                  rejectedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };
              }

              // Si on rejette une hypothèse, mettre en "on_hold" les hypothèses validées liées
              if (h.status === 'validated') {
                // Vérifier la relation dans les DEUX directions :
                // 1. Est-ce que h a une relation vers l'hypothèse rejetée ?
                const hPointsToRejected = h.relations.some(rel => rel.hypothesisId === id);
                // 2. Est-ce que l'hypothèse rejetée a une relation vers h ?
                const rejectedPointsToH = targetHypothesis?.relations.some(rel => rel.hypothesisId === h.id) ?? false;

                console.log(`🔍 Checking ${h.id}:`, {
                  title: h.title.substring(0, 50),
                  hPointsToRejected,
                  rejectedPointsToH,
                  hRelations: h.relations,
                });

                if (hPointsToRejected || rejectedPointsToH) {
                  console.log(`⚠️ Setting ${h.id} to on_hold because it's linked to rejected hypothesis`);
                  return { ...h, status: 'on_hold' as const, updatedAt: new Date().toISOString() };
                }
              }

              return h;
            }),
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
            changeNote: 'Corps modifié',
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
            // Supprimer la relation dans les DEUX sens
            if (h.id === hypothesisId) {
              // Supprimer hypothesisId → targetHypothesisId
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

      createHypothesis: (data) => {
        const newH: Hypothesis = {
          ...data,
          id: `h${Date.now()}`,
          sources: data.sources || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ hypotheses: [newH, ...state.hypotheses] }));
        return newH;
      },
      markAlertRead: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
        })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
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
        // Auto-select the new source
        set((state) => ({
          nodeSourceSelections: {
            ...state.nodeSourceSelections,
            [nodeId]: [...(state.nodeSourceSelections[nodeId] || NODE_SOURCES[nodeId] || []), newSource.id],
          },
        }));
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

        // Auto-create "Synthèse" column
        const synthesisColumn: MatrixColumn = {
          id: `mc${Date.now()}-synthesis`,
          matrixScopeId: newScope.id,
          label: 'Synthèse',
          prompt: 'Résumé du document dans le contexte du scope',
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
                  const cell = get().matrixCells.find(
                    c => c.columnId === columnId && c.sourceId === sourceId && c.matrixScopeId === scopeId
                  );
                  const col = get().matrixColumns.find(c => c.id === columnId);
                  if (!cell || !col) return null;

                  return {
                    cell,
                    columnPrompt: col.prompt,
                    columnLabel: col.label,
                  };
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
      addMatrixColumnsFromTemplates: async (scopeId, templateIds, userId) => {
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
            isAutoExecute: true,
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

        // Create batch jobs for auto-execution
        for (const column of newColumns) {
          if (scope.discoveredSourceIds.length > 0) {
            get().createGenerationJob(column.id, scope.discoveredSourceIds, scopeId);

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
                  const cell = get().matrixCells.find(
                    c => c.columnId === columnId && c.sourceId === sourceId && c.matrixScopeId === scopeId
                  );
                  const col = get().matrixColumns.find(c => c.id === columnId);
                  if (!cell || !col) return null;

                  return {
                    cell,
                    columnPrompt: col.prompt,
                    columnLabel: col.label,
                  };
                }
              ).then(() => {
                get().completeJob(job.id);
              }).catch((error) => {
                console.error('Job execution failed:', error);
              });
            }
          }
        }

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
          if (column.isSystemGenerated && column.label === 'Synthèse') {
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
          nodes: WORKSTREAM_NODES,
          nodeComments: [],
          nodeVersions: [],
          sidebarOpen: true,
          nodeSourceSelections: {},
          connectedConnectors: ['google_drive', 'capitaliq'],
          recentNodes: [],
          matrixScopes: MATRIX_SCOPES,
          matrixColumns: MATRIX_COLUMNS,
          matrixCells: MATRIX_CELLS,
          cellGenerationJobs: [],
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
        matrixScopes: state.matrixScopes,
        matrixColumns: state.matrixColumns,
        matrixCells: state.matrixCells,
        cellGenerationJobs: state.cellGenerationJobs,
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
