import { PageTransition } from '@/components/PageTransition'
import { BRANDS } from '@/lib/brands'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export function Settings() {
  return (
    <PageTransition>
      <h1 className="text-xl font-bold mb-6">Settings</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-[#e8e6e2] p-5">
          <h3 className="text-sm font-bold mb-4">Brands</h3>
          <div className="space-y-3">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between p-3 rounded-lg border border-[#e8e6e2] hover:bg-[#fafafa]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ background: brand.colour }} />
                  <div>
                    <div className="text-sm font-semibold">{brand.name}</div>
                    <div className="text-xs text-[#6b7280]">{brand.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${brand.status === 'live' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {brand.status}
                  </span>
                  {brand.url && (
                    <a href={brand.url} target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#6b7280]">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e8e6e2] p-5">
          <h3 className="text-sm font-bold mb-4">API Keys</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#6b7280] mb-1">Supabase URL</label>
              <input type="text" placeholder="https://xxx.supabase.co" className="w-full h-9 px-3 text-sm rounded-lg border border-[#e8e6e2] outline-none font-mono" readOnly value={import.meta.env.VITE_SUPABASE_URL || 'Not configured'} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6b7280] mb-1">Anthropic API Key</label>
              <input type="password" placeholder="sk-ant-..." className="w-full h-9 px-3 text-sm rounded-lg border border-[#e8e6e2] outline-none font-mono" readOnly value={import.meta.env.VITE_ANTHROPIC_API_KEY ? 'secured' : 'Not configured'} />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
