import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Hypothesis, WorkstreamNode, Alert } from '../types';
import { USERS } from '../data/users';
import { HYPOTHESES, ALERTS, WORKSTREAM_NODES } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  selectedProjectId: string | null;
  selectedNodeId: string | null;
  selectedHypothesisId: string | null;
  hypotheses: Hypothesis[];
  alerts: Alert[];
  nodes: WorkstreamNode[];
  sidebarOpen: boolean;

  setCurrentUser: (user: User) => void;
  logout: () => void;
  setSelectedProject: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedHypothesis: (id: string | null) => void;
  updateHypothesisStatus: (id: string, status: Hypothesis['status']) => void;
  markAlertRead: (id: string) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      selectedProjectId: null,
      selectedNodeId: null,
      selectedHypothesisId: null,
      hypotheses: HYPOTHESES,
      alerts: ALERTS,
      nodes: WORKSTREAM_NODES,
      sidebarOpen: true,

      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null, selectedProjectId: null, selectedNodeId: null }),
      setSelectedProject: (id) => set({ selectedProjectId: id }),
      setSelectedNode: (id) => set({ selectedNodeId: id }),
      setSelectedHypothesis: (id) => set({ selectedHypothesisId: id }),
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
    }),
    {
      name: 'cdd-platform-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        sidebarOpen: state.sidebarOpen,
        hypotheses: state.hypotheses,
        alerts: state.alerts,
      }),
    }
  )
);

export { USERS };
