import { PageTransition } from '@/components/PageTransition'
import { RevenueHero } from '@/components/RevenueHero'
import { BrandTile } from '@/components/BrandTile'
import { BRANDS } from '@/lib/brands'
import { motion } from 'framer-motion'
import { CheckSquare, Calendar, Users, ExternalLink } from 'lucide-react'

const STATS = [
  { icon: CheckSquare, label: 'Open Tasks', value: '12', color: '#1d4ed8' },
  { icon: Calendar, label: 'Scheduled Posts', value: '8', color: '#15803d' },
  { icon: Users, label: 'Creators Managed', value: '3', color: '#7c3aed' },
]

export function Overview() {
  return (
    <PageTransition>
      <RevenueHero />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="bg-white rounded-xl border border-[#e8e6e2] p-4 flex items-center gap-3"
          >
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

      {/* Brand tiles */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {BRANDS.map((brand, i) => (
          <BrandTile key={brand.id} brand={brand} index={i} />
        ))}
      </div>

      {/* Quick action */}
      <motion.a
        href="http://localhost:3000"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#e8e6e2] bg-white text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f8f8] transition-colors"
      >
        <ExternalLink size={15} />
        Open Aventus Studio
      </motion.a>
    </PageTransition>
  )
}
