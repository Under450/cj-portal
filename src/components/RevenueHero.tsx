import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { useData } from '@/lib/DataProvider'
import { TrendingUp } from 'lucide-react'

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => `£${Math.round(v).toLocaleString()}`)

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' })
    return controls.stop
  }, [value, count])

  return <motion.span>{rounded}</motion.span>
}

export function RevenueHero() {
  const { brands, revenueForBrand } = useData()
  const total = brands.reduce((sum, b) => sum + revenueForBrand(b.id), 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-[#1a1a1a] text-white p-6 mb-6 overflow-hidden relative"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <svg viewBox="0 0 800 200" className="w-full h-full">
          <line x1="0" y1="200" x2="200" y2="80" stroke="white" strokeWidth="1" />
          <line x1="200" y1="80" x2="400" y2="120" stroke="white" strokeWidth="1" />
          <line x1="400" y1="120" x2="600" y2="40" stroke="white" strokeWidth="1" />
          <line x1="600" y1="40" x2="800" y2="90" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-white/50 text-xs font-medium mb-2">
          <TrendingUp size={14} />
          April 2026 Revenue
        </div>
        <div className="text-4xl font-extrabold tracking-tight mb-4">
          <AnimatedCounter value={total} />
        </div>
        <div className="flex gap-3">
          {brands.map((brand) => {
            const rev = revenueForBrand(brand.id)
            const pct = total > 0 ? (rev / total) * 100 : 0
            return (
              <div key={brand.id} className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/50">{brand.name.split(' ')[0]}</span>
                  <span className="text-white/70 font-semibold">£{rev.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: brand.colour }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
