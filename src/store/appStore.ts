import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Hypothesis, WorkstreamNode, Alert, Project, Source } from '../types';
import { USERS } from '../data/users';
import { HYPOTHESES, ALERTS, WORKSTREAM_NODES, PROJECTS, NODE_SOURCES, SOURCES, CONNECTORS, CONNECTOR_SOURCES } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  selectedProjectId: string | null;
  selectedNodeId: string | null;
  selectedHypothesisId: string | null;
  projects: Project[];
  hypotheses: Hypothesis[];
  alerts: Alert[];
  nodes: WorkstreamNode[];
  sidebarOpen: boolean;
  nodeSourceSelections: Record<string, string[]>;
  connectedConnectors: string[];

  setCurrentUser: (user: User) => void;
  logout: () => void;
  setSelectedProject: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedHypothesis: (id: string | null) => void;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateHypothesisStatus: (id: string, status: Hypothesis['status']) => void;
  markAlertRead: (id: string) => void;
  toggleSidebar: () => void;
  getNodeSelectedSources: (nodeId: string) => string[];
  toggleSourceSelection: (nodeId: string, sourceId: string) => void;
  selectAllNodeSources: (nodeId: string) => void;
  deselectAllNodeSources: (nodeId: string) => void;
  addSourceToNode: (nodeId: string, source: Omit<Source, 'id'>) => Source;
  connectConnector: (connectorId: string) => void;
  disconnectConnector: (connectorId: string) => void;
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
      sidebarOpen: true,
      nodeSourceSelections: {},
      connectedConnectors: ['google_drive', 'capitaliq'], // Mock: connecteurs déjà connectés

      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null, selectedProjectId: null, selectedNodeId: null }),
      setSelectedProject: (id) => set({ selectedProjectId: id }),
      setSelectedNode: (id) => set({ selectedNodeId: id }),
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
    }),
    {
      name: 'cdd-platform-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        sidebarOpen: state.sidebarOpen,
        projects: state.projects,
        hypotheses: state.hypotheses,
        alerts: state.alerts,
        nodeSourceSelections: state.nodeSourceSelections,
        connectedConnectors: state.connectedConnectors,
      }),
    }
  )
);

export { USERS };
