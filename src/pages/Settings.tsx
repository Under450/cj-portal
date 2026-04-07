import { PageTransition } from '@/components/PageTransition'
import { useData } from '@/lib/DataProvider'
import { motion } from 'framer-motion'
import { ExternalLink, Shield, Database, Key } from 'lucide-react'

export function Settings() {
  const { brands } = useData()

  return (
    <PageTransition>
      <h1 className="text-2xl font-extrabold mb-8">Settings</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center gap-2.5 mb-5">
            <Shield size={18} className="text-[#9ca3af]" />
            <h3 className="text-base font-bold">Brands</h3>
          </div>
          <div className="space-y-3">
            {brands.map((brand, i) => (
              <motion.div key={brand.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between p-4 rounded-xl border border-[#e8e6e2] hover:bg-[#fafafa] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full" style={{ background: brand.colour }} />
                  <div>
                    <div className="text-[15px] font-semibold">{brand.name}</div>
                    <div className="text-sm text-[#9ca3af]">{brand.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${brand.status === 'live' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {brand.status}
                  </span>
                  {brand.url && (
                    <a href={brand.url} target="_blank" rel="noopener noreferrer" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center gap-2.5 mb-5">
            <Database size={18} className="text-[#9ca3af]" />
            <h3 className="text-base font-bold">Connections</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#e8e6e2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Database size={18} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold">Supabase</div>
                  <div className="text-sm text-[#9ca3af]">{import.meta.env.VITE_SUPABASE_URL ? 'Connected' : 'Not configured'}</div>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${import.meta.env.VITE_SUPABASE_URL ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {import.meta.env.VITE_SUPABASE_URL ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center gap-2.5 mb-5">
            <Key size={18} className="text-[#9ca3af]" />
            <h3 className="text-base font-bold">API Keys</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#9ca3af] mb-2">Supabase URL</label>
              <input type="text" readOnly value={import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
                className="w-full h-11 px-4 text-sm rounded-xl border border-[#e8e6e2] outline-none font-mono bg-[#fafafa]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#9ca3af] mb-2">Anthropic API Key</label>
              <input type="password" readOnly value={import.meta.env.VITE_ANTHROPIC_API_KEY ? '••••••••••••••••' : 'Not configured'}
                className="w-full h-11 px-4 text-sm rounded-xl border border-[#e8e6e2] outline-none font-mono bg-[#fafafa]" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
