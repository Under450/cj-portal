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
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-[72px] min-w-[72px] bg-[#111111] flex flex-col items-center py-8 gap-3 fixed h-full z-50">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-extrabold text-sm mb-8 tracking-tight">
          CJ
        </div>
        {NAV.map(({ icon: Icon, label, path }) => {
          const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              title={label}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                active
                  ? 'bg-white/15 text-white shadow-lg shadow-white/5'
                  : 'text-white/35 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2 : 1.5} />
            </button>
          )
        })}
      </aside>

      {/* Main content — full width */}
      <div className="flex-1 ml-[72px] w-[calc(100%-72px)]">
        {/* Topbar */}
        <header className="h-16 border-b border-[#e8e6e2] bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-2.5 text-[15px] text-[#9ca3af]">
            <span className="font-bold text-[#1a1a1a]">CJ Portal</span>
            <span className="text-[#d1d5db]">/</span>
            <span className="capitalize font-medium">{location.pathname === '/' ? 'Overview' : location.pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[13px] text-[#9ca3af] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
            <button
              onClick={() => navigate('/tasks')}
              className="h-10 px-5 rounded-xl bg-[#111111] text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#222] transition-colors"
            >
              <Plus size={15} strokeWidth={2.5} /> New Task
            </button>
          </div>
        </header>

        <main className="p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
