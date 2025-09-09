import { create } from 'zustand'

interface UIStore {
  sidebarCollapsed: boolean
  leadDetailOpen: boolean
  selectedLeadId: string | null
  searchQuery: string
  campaignFilter: string
  statusFilter: string
  
  // Actions
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  openLeadDetail: (leadId: string) => void
  closeLeadDetail: () => void
  setSearchQuery: (query: string) => void
  setCampaignFilter: (filter: string) => void
  setStatusFilter: (filter: string) => void
  resetFilters: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  leadDetailOpen: false,
  selectedLeadId: null,
  searchQuery: '',
  campaignFilter: 'all',
  statusFilter: 'all',
  
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  openLeadDetail: (leadId) => set({ leadDetailOpen: true, selectedLeadId: leadId }),
  closeLeadDetail: () => set({ leadDetailOpen: false, selectedLeadId: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCampaignFilter: (filter) => set({ campaignFilter: filter }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  resetFilters: () => set({ searchQuery: '', campaignFilter: 'all', statusFilter: 'all' }),
}))