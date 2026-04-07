import { PageTransition } from '@/components/PageTransition'
import { useData } from '@/lib/DataProvider'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

export function Revenue() {
  const { brands, revenueForBrand } = useData()
  const total = brands.reduce((sum, b) => sum + revenueForBrand(b.id), 0)
  const combinedTarget = brands.reduce((a, b) => a + b.monthly_target, 0)

  const chartData = brands.map(b => ({
    name: b.name.split(' ')[0],
    revenue: revenueForBrand(b.id),
    target: b.monthly_target,
    fill: b.colour,
  }))

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold">Revenue</h1>
        <div className="text-sm text-[#9ca3af] font-semibold">April 2026</div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#e8e6e2] p-6 mb-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <div className="flex items-center gap-2.5 text-sm text-[#9ca3af] font-semibold mb-2">
          <TrendingUp size={16} /> Total CJ Group Revenue
        </div>
        <div className="text-4xl font-extrabold mb-1">£{total.toLocaleString()}</div>
        <div className="text-sm text-[#9ca3af] font-medium">of £{combinedTarget.toLocaleString()} combined target</div>
      </motion.div>

      <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6 mb-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <h3 className="text-base font-bold mb-5">Brand Comparison</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barGap={8}>
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `£${v}`} />
            <Tooltip formatter={(v) => [`£${Number(v).toLocaleString()}`, '']} />
            <Bar dataKey="revenue" name="Revenue" fill="#111111" radius={[8, 8, 0, 0]} />
            <Bar dataKey="target" name="Target" fill="#e8e6e2" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {brands.map((brand, i) => {
          const rev = revenueForBrand(brand.id)
          const pct = brand.monthly_target > 0 ? Math.round((rev / brand.monthly_target) * 100) : 0
          return (
            <motion.div key={brand.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-[#e8e6e2] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: brand.colour }} />
                <span className="text-base font-bold">{brand.name}</span>
              </div>
              <div className="text-3xl font-extrabold mb-2">£{rev.toLocaleString()}</div>
              {brand.monthly_target > 0 && (
                <>
                  <div className="text-sm text-[#9ca3af] font-medium mb-3">{pct}% of £{brand.monthly_target.toLocaleString()} target</div>
                  <div className="h-2 rounded-full bg-[#f0eff0] overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full" style={{ background: brand.colour }} />
                  </div>
                </>
              )}
            </motion.div>
          )
        })}
      </div>
    </PageTransition>
  )
}
