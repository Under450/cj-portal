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

  if (loading) return <PageTransition><div className="flex items-center justify-center h-64 text-base text-[#9ca3af]">Loading...</div></PageTransition>

  return (
    <PageTransition>
      <RevenueHero />

      <div className="grid grid-cols-3 gap-5 mb-8">
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
            className="bg-white rounded-2xl border border-[#e8e6e2] p-5 flex items-center gap-4"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: stat.color + '12' }}>
              <stat.icon size={22} style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
              <div className="text-sm text-[#9ca3af] font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        {brands.map((brand, i) => <BrandTile key={brand.id} brand={brand} index={i} />)}
      </div>

      {pinnedTasks.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6 mb-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center gap-2.5 text-[13px] font-bold text-[#9ca3af] mb-4 uppercase tracking-wider"><Pin size={14} /> Pinned Tasks</div>
          <div className="space-y-2.5">
            {pinnedTasks.map(task => {
              const brand = brands.find(b => b.id === task.brand_id)
              return (
                <div key={task.id} className="flex items-center gap-3 text-[15px]">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: brand?.colour || '#6b7280' }} />
                  <span className="font-medium">{task.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: (brand?.colour || '#6b7280') + '15', color: brand?.colour }}>{brand?.name.split(' ')[0]}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <motion.a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl border border-[#e8e6e2] bg-white text-[15px] font-bold text-[#1a1a1a] hover:bg-[#fafafa] transition-colors"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <ExternalLink size={16} /> Open Aventus Studio
      </motion.a>
    </PageTransition>
  )
}
