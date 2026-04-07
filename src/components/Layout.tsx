import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, CheckSquare, TrendingUp, Settings, Plus } from 'lucide-react'

const NAV = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: FolderKanban, label: 'Projects', path: '/brand/bergason' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: TrendingUp, label: 'Revenue', path: '/revenue' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 bg-[#1a1a1a] flex flex-col items-center py-6 gap-2 fixed h-full z-50">
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-sm mb-6">
          CJ
        </div>
        {NAV.map(({ icon: Icon, label, path }) => {
          const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              title={label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 ${
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
            </button>
          )
        })}
      </aside>

      {/* Main */}
      <div className="flex-1 ml-16">
        {/* Topbar */}
        <header className="h-14 border-b border-[#e8e6e2] bg-white/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <span className="font-semibold text-[#1a1a1a]">CJ Portal</span>
            <span>/</span>
            <span className="capitalize">{location.pathname === '/' ? 'Overview' : location.pathname.split('/').pop()}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
            <button
              onClick={() => navigate('/tasks')}
              className="h-8 px-3 rounded-lg bg-[#1a1a1a] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#333] transition-colors"
            >
              <Plus size={14} /> New Task
            </button>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
