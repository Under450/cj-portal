import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { Brand } from '@/lib/brands'
import { SEED_REVENUE } from '@/lib/brands'

function BergasonBg() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.07]">
      <svg viewBox="0 0 400 200" className="absolute -right-10 -top-10 w-[300px] h-[300px]">
        <rect x="50" y="20" width="60" height="120" rx="4" fill="#1d4ed8" />
        <rect x="120" y="40" width="60" height="100" rx="4" fill="#1d4ed8" />
        <rect x="190" y="10" width="60" height="130" rx="4" fill="#1d4ed8" />
        <circle cx="300" cy="80" r="50" fill="none" stroke="#1d4ed8" strokeWidth="2" />
        <circle cx="300" cy="80" r="30" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

function FmmBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-20 -top-20 w-[250px] h-[250px] rounded-full bg-gradient-to-br from-emerald-100/60 to-transparent" />
      <div className="absolute -left-10 -bottom-10 w-[150px] h-[150px] rounded-full bg-gradient-to-tr from-emerald-50/40 to-transparent" />
    </div>
  )
}

function VelvetBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: 'conic-gradient(from 0deg at 70% 30%, #7c3aed, transparent, #7c3aed, transparent, #7c3aed)',
          animation: 'spin 8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function AventusBg() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
      <svg viewBox="0 0 400 200" className="absolute -right-5 top-0 w-[350px]">
        <polygon points="200,20 250,120 150,120" fill="none" stroke="#ea580c" strokeWidth="2">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </polygon>
        <line x1="0" y1="180" x2="400" y2="40" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="8 4" />
      </svg>
    </div>
  )
}

const BG_MAP: Record<string, () => React.JSX.Element> = {
  bergason: BergasonBg,
  'forward-my-mail': FmmBg,
  'velvet-app': VelvetBg,
  'aventus-studio': AventusBg,
}

const TILE_BG: Record<string, string> = {
  bergason: 'bg-[#0f1a3d]',
  'forward-my-mail': 'bg-white',
  'velvet-app': 'bg-[#1a0a2e]',
  'aventus-studio': 'bg-[#0a0a0a]',
}

const TILE_TEXT: Record<string, string> = {
  bergason: 'text-white',
  'forward-my-mail': 'text-[#1a1a1a]',
  'velvet-app': 'text-white',
  'aventus-studio': 'text-white',
}

export function BrandTile({ brand, index }: { brand: Brand; index: number }) {
  const navigate = useNavigate()
  const revenue = SEED_REVENUE[brand.id] || 0
  const progress = brand.monthly_target > 0 ? Math.min((revenue / brand.monthly_target) * 100, 100) : 0
  const Bg = BG_MAP[brand.slug]
  const tileBg = TILE_BG[brand.slug] || 'bg-white'
  const tileText = TILE_TEXT[brand.slug] || 'text-[#1a1a1a]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={() => navigate(`/brand/${brand.slug}`)}
      className={`relative rounded-2xl ${tileBg} ${tileText} p-5 cursor-pointer border border-[#e8e6e2]/10 overflow-hidden`}
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {Bg && <Bg />}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: brand.colour }} />
            <span className="font-bold text-sm">{brand.name}</span>
          </div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              brand.status === 'live'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}
          >
            {brand.status.toUpperCase()}
          </span>
        </div>
        <p className="text-xs opacity-60 mb-4">{brand.description}</p>
        <div className="text-2xl font-extrabold mb-1">
          £{revenue.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs opacity-50">
            of £{brand.monthly_target.toLocaleString()} target
          </span>
          {brand.monthly_target > 0 && (
            <span className={`text-xs font-semibold ${progress >= 80 ? 'text-emerald-400' : progress >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {Math.round(progress)}%
            </span>
          )}
        </div>
        {brand.monthly_target > 0 && (
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: brand.colour }}
            />
          </div>
        )}
        {brand.url && (
          <div className="mt-3 flex items-center gap-1 text-xs opacity-40">
            <ExternalLink size={11} />
            {brand.url.replace('https://', '').replace('http://', '')}
          </div>
        )}
      </div>
    </motion.div>
  )
}
