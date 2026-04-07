export interface Project {
  id: string
  name: string
  group: 'bergason' | 'cj'
  badge: 'LIVE' | 'WIP' | 'TBC'
  sub: string
  progress: number
  progressColor: 'amber' | 'green' | 'purple' | 'muted'
}

export const PROJECTS: Project[] = [
  { id: 'bergason-block', name: 'Block Management', group: 'bergason', badge: 'WIP', sub: 'Residents Portal · Admin Portal · Tenant Rights Act', progress: 82, progressColor: 'amber' },
  { id: 'landlord-portal', name: 'Landlord Portal', group: 'bergason', badge: 'WIP', sub: 'Landlord Portal · Admin Panel', progress: 45, progressColor: 'amber' },
  { id: 'estate-agents', name: 'Estate Agents', group: 'bergason', badge: 'TBC', sub: 'Website · Portal TBC', progress: 15, progressColor: 'muted' },
  { id: 'brochure', name: 'Brochure', group: 'bergason', badge: 'LIVE', sub: 'Generic Template · Site-Specific Flipbook', progress: 80, progressColor: 'green' },
  { id: 'inventory', name: 'Inventory App', group: 'bergason', badge: 'TBC', sub: 'App TBC', progress: 5, progressColor: 'muted' },
  { id: 'fmm', name: 'Forward My Mail', group: 'cj', badge: 'WIP', sub: 'Staff Portal · Client Portal', progress: 60, progressColor: 'green' },
  { id: 'velvet', name: 'Velvet', group: 'cj', badge: 'TBC', sub: 'App TBC', progress: 20, progressColor: 'purple' },
  { id: 'aventus', name: 'Aventus', group: 'cj', badge: 'TBC', sub: 'TBC', progress: 5, progressColor: 'muted' },
  { id: 'studio', name: 'Studio Dashboard', group: 'cj', badge: 'TBC', sub: 'Socials · Content Management', progress: 10, progressColor: 'muted' },
  { id: 'cj-ops', name: 'CJ Ops Portal', group: 'cj', badge: 'WIP', sub: 'Ops Dashboard · Supabase · GitHub Pages', progress: 30, progressColor: 'amber' },
]
