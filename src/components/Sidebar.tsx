import { PROJECTS } from '../data/projects'
import type { Tag } from '../data/tasks'

const BADGE_COLORS = {
  LIVE: 'bg-teal/15 text-teal border-teal/25',
  WIP: 'bg-amber/15 text-amber border-amber/25',
  TBC: 'bg-muted2/30 text-muted border-muted2/50',
} as const

const PROGRESS_COLORS = {
  amber: 'bg-amber',
  green: 'bg-teal',
  purple: 'bg-purple',
  muted: 'bg-muted2',
} as const

const FILTER_TAGS: Tag[] = ['DEV', 'OPS', 'LEGAL', 'DESIGN']

const TAG_COLORS: Record<Tag, string> = {
  DEV: 'bg-amber/15 text-amber border-amber/30 hover:bg-amber/25',
  OPS: 'bg-teal/15 text-teal border-teal/30 hover:bg-teal/25',
  LEGAL: 'bg-red/15 text-red border-red/30 hover:bg-red/25',
  DESIGN: 'bg-purple/15 text-purple border-purple/30 hover:bg-purple/25',
}

const TAG_ACTIVE: Record<Tag, string> = {
  DEV: 'bg-amber/30 text-amber border-amber/50',
  OPS: 'bg-teal/30 text-teal border-teal/50',
  LEGAL: 'bg-red/30 text-red border-red/50',
  DESIGN: 'bg-purple/30 text-purple border-purple/50',
}

interface SidebarProps {
  activeProject: string
  onSelectProject: (id: string) => void
  activeFilter: Tag | null
  onFilterChange: (tag: Tag | null) => void
}

export function Sidebar({ activeProject, onSelectProject, activeFilter, onFilterChange }: SidebarProps) {
  const bergason = PROJECTS.filter(p => p.group === 'bergason')
  const cj = PROJECTS.filter(p => p.group === 'cj')

  return (
    <aside className="w-[260px] min-w-[260px] h-[calc(100vh-49px)] sticky top-[49px] border-r border-border bg-surface overflow-y-auto flex flex-col">
      <div className="flex-1 p-3 space-y-4">
        <ProjectGroup label="BERGASON" projects={bergason} activeProject={activeProject} onSelect={onSelectProject} />
        <ProjectGroup label="CJ" projects={cj} activeProject={activeProject} onSelect={onSelectProject} />
      </div>

      {/* Quick filter chips */}
      <div className="p-3 border-t border-border">
        <div className="text-[10px] font-mono text-muted2 tracking-widest mb-2">QUICK FILTER</div>
        <div className="flex flex-wrap gap-1.5">
          {FILTER_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => onFilterChange(activeFilter === tag ? null : tag)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border transition-colors cursor-pointer ${
                activeFilter === tag ? TAG_ACTIVE[tag] : TAG_COLORS[tag]
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

function ProjectGroup({ label, projects, activeProject, onSelect }: {
  label: string
  projects: typeof PROJECTS
  activeProject: string
  onSelect: (id: string) => void
}) {
  return (
    <div>
      <div className="text-[10px] font-mono text-muted2 tracking-[0.15em] mb-2 px-1">{label}</div>
      <div className="space-y-1">
        {projects.map(p => {
          const isActive = p.id === activeProject
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`w-full text-left rounded-lg p-2.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[rgba(240,165,0,0.08)] border-l-2 border-l-amber pl-2'
                  : 'hover:bg-surface2 border-l-2 border-l-transparent pl-2'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-[14px] font-medium ${isActive ? 'text-text' : 'text-muted'}`}>
                  {p.name}
                </span>
                <span className={`text-[9px] font-mono tracking-wider px-1.5 py-px rounded border ${BADGE_COLORS[p.badge]}`}>
                  {p.badge}
                </span>
              </div>
              <div className="text-[11px] text-muted2 mb-2 leading-tight">{p.sub}</div>
              <div className="h-1 rounded-full bg-border overflow-hidden">
                <div
                  className={`h-full rounded-full ${PROGRESS_COLORS[p.progressColor]} transition-all`}
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
