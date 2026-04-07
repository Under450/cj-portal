import { PageTransition } from '@/components/PageTransition'
import { RevenueHero } from '@/components/RevenueHero'
import { BrandTile } from '@/components/BrandTile'
import { useData } from '@/lib/DataProvider'
import { motion } from 'framer-motion'
import { CheckSquare, Calendar, Users, ExternalLink, Pin } from 'lucide-react'

export function Overview() {
  const { brands, tasks, loading } = useData()
  const openTasks = tasks.filter(t => t.status !== 'done').length
  const pinnedTasks = tasks.filter(t => t.pinned)

  const STATS = [
    { icon: CheckSquare, label: 'Open Tasks', value: String(openTasks), color: '#1d4ed8' },
    { icon: Calendar, label: 'Scheduled Posts', value: '0', color: '#15803d' },
    { icon: Users, label: 'Brands Managed', value: String(brands.length), color: '#7c3aed' },
  ]

  if (loading) return <PageTransition><div className="flex items-center justify-center h-64 text-sm text-[#6b7280]">Loading...</div></PageTransition>

  return (
    <PageTransition>
      <RevenueHero />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
            className="bg-white rounded-xl border border-[#e8e6e2] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: stat.color + '12' }}>
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-[#6b7280]">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {brands.map((brand, i) => <BrandTile key={brand.id} brand={brand} index={i} />)}
      </div>
      {pinnedTasks.length > 0 && (
        <div className="bg-white rounded-xl border border-[#e8e6e2] p-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6b7280] mb-3"><Pin size={13} /> PINNED TASKS</div>
          <div className="space-y-1.5">
            {pinnedTasks.map(task => {
              const brand = brands.find(b => b.id === task.brand_id)
              return (
                <div key={task.id} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: brand?.colour || '#6b7280' }} />
                  <span className="font-medium">{task.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: (brand?.colour || '#6b7280') + '15', color: brand?.colour }}>{brand?.name.split(' ')[0]}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
      <motion.a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#e8e6e2] bg-white text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f8f8] transition-colors">
        <ExternalLink size={15} /> Open Aventus Studio
      </motion.a>
    </PageTransition>
  )
}
