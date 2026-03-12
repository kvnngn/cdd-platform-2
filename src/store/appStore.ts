import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Hypothesis, HypothesisSource, HypothesisVersion, WorkstreamNode, Alert, Project, Source, NodeComment, NodeVersion, MatrixColumn, MatrixCell } from '../types';
import { USERS } from '../data/users';
import { HYPOTHESES, ALERTS, WORKSTREAM_NODES, PROJECTS, NODE_SOURCES, SOURCES, CONNECTORS, CONNECTOR_SOURCES, MATRIX_COLUMNS, MATRIX_CELLS, MOCK_CELL_VALUES } from '../data/mockData';

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

  setCurrentUser: (user: User) => void;
  logout: () => void;
  setSelectedProject: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedHypothesis: (id: string | null) => void;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateHypothesisStatus: (id: string, status: Hypothesis['status']) => void;
  // Hypothesis rich actions
  rejectHypothesisWithReason: (id: string, reason: string) => void;
  updateHypothesisBody: (id: string, body: string, userId: string) => void;
  addSourceToHypothesis: (hypothesisId: string, source: HypothesisSource) => void;
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
  matrixColumns: MatrixColumn[];
  matrixCells: MatrixCell[];
  addMatrixColumn: (col: Omit<MatrixColumn, 'id' | 'createdAt'>) => MatrixColumn;
  updateMatrixColumn: (id: string, patch: Partial<MatrixColumn>) => void;
  deleteMatrixColumn: (id: string) => void;
  generateMatrixCell: (columnId: string, sourceId: string, nodeId: string) => void;
  setCellHypothesis: (cellId: string, hypothesisId: string) => void;
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
      matrixColumns: MATRIX_COLUMNS,
      matrixCells: MATRIX_CELLS,

      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null, selectedProjectId: null, selectedNodeId: null }),
      setSelectedProject: (id) => set({ selectedProjectId: id }),
      setSelectedNode: (id) => set((state) => {
        if (!id) return { selectedNodeId: null };
        const node = state.nodes.find(n => n.id === id);
        const projectId = node?.projectId ?? state.selectedProjectId ?? '';
        const visit: RecentNode = { nodeId: id, projectId, visitedAt: new Date().toISOString() };
        const recents = [visit, ...state.recentNodes.filter(r => r.nodeId !== id)].slice(0, 15);
        return { selectedNodeId: id, recentNodes: recents };
      }),
      setSelectedHypothesis: (id) => set({ selectedHypothesisId: id }),
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
        set((state) => ({
          hypotheses: state.hypotheses.map((h) =>
            h.id === id ? { ...h, status, updatedAt: new Date().toISOString() } : h
          ),
        })),

      // ─── Hypothesis rich actions ──────────────────────────────────────────
      rejectHypothesisWithReason: (id, reason) =>
        set((state) => ({
          hypotheses: state.hypotheses.map((h) =>
            h.id === id
              ? {
                  ...h,
                  status: 'rejected' as const,
                  rejectionReason: reason,
                  rejectedBy: state.currentUser?.id ?? 'unknown',
                  rejectedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }
              : h
          ),
        })),

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
      addMatrixColumn: (colData) => {
        const newCol: MatrixColumn = {
          ...colData,
          id: `mc${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        // Auto-generate idle cells for all existing sources of this node
        const existingSources = NODE_SOURCES[colData.nodeId] || [];
        const newCells: MatrixCell[] = existingSources.map((sourceId) => ({
          id: `mce${Date.now()}-${sourceId}`,
          columnId: newCol.id,
          sourceId,
          nodeId: colData.nodeId,
          value: null,
          status: 'idle' as const,
        }));
        set((state) => ({
          matrixColumns: [...state.matrixColumns, newCol],
          matrixCells: [...state.matrixCells, ...newCells],
        }));
        return newCol;
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

      generateMatrixCell: (columnId, sourceId, nodeId) => {
        const cellId = `mce${Date.now()}-${columnId}-${sourceId}`;
        // Upsert: find existing idle cell or create one
        set((state) => {
          const existing = state.matrixCells.find(
            (c) => c.columnId === columnId && c.sourceId === sourceId && c.nodeId === nodeId
          );
          const targetId = existing?.id ?? cellId;
          const updatingCells = existing
            ? state.matrixCells.map((c) =>
                c.id === targetId ? { ...c, status: 'generating' as const } : c
              )
            : [
                ...state.matrixCells,
                { id: targetId, columnId, sourceId, nodeId, value: null, status: 'generating' as const },
              ];
          return { matrixCells: updatingCells };
        });
        // Simulate async LLM (800ms mock delay)
        setTimeout(() => {
          set((state) => {
            const col = state.matrixColumns.find((c) => c.id === columnId);
            const mockValues = MOCK_CELL_VALUES[columnId] ?? {};
            const value = mockValues.default ?? 'Analyse en cours — données insuffisantes dans ce document pour répondre précisément.';
            return {
              matrixCells: state.matrixCells.map((c) =>
                c.columnId === columnId && c.sourceId === sourceId && c.nodeId === nodeId
                  ? { ...c, status: 'done' as const, value, generatedAt: new Date().toISOString() }
                  : c
              ),
            };
          });
        }, 800);
      },

      setCellHypothesis: (cellId, hypothesisId) =>
        set((state) => ({
          matrixCells: state.matrixCells.map((c) =>
            c.id === cellId ? { ...c, hypothesisId } : c
          ),
        })),
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
        matrixColumns: state.matrixColumns,
        matrixCells: state.matrixCells,
      }),
    }
  )
);

export { USERS };
