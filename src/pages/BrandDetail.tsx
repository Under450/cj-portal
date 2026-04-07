import { useParams, useNavigate } from 'react-router-dom'
import { PageTransition } from '@/components/PageTransition'
import { useData } from '@/lib/DataProvider'
import { getBrand } from '@/lib/data'
import * as api from '@/lib/data'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Plus, Check, Trash2, Clock, PoundSterling } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function getStoredRevenue(brandSlug: string): Record<string, number> {
  try {
    const stored = localStorage.getItem(`cj_revenue_${brandSlug}`)
    return stored ? JSON.parse(stored) : {}
  } catch { return {} }
}

function setStoredRevenue(brandSlug: string, month: string, amount: number) {
  const current = getStoredRevenue(brandSlug)
  current[month] = amount
  localStorage.setItem(`cj_revenue_${brandSlug}`, JSON.stringify(current))
}

export function BrandDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { brands, revenueForBrand, reloadTasks, reloadActivity } = useData()
  const brand = getBrand(brands, slug || '')
  const [tasks, setTasks] = useState<api.Task[]>([])
  const [activity, setActivity] = useState<api.Activity[]>([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)

  // Editable revenue
  const [editingRevenue, setEditingRevenue] = useState(false)
  const [revenueInput, setRevenueInput] = useState('')
  const [localRevenue, setLocalRevenue] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!brand) return
    setLoading(true)
    Promise.all([
      api.fetchTasks(brand.id),
      api.fetchActivity(brand.id),
    ]).then(([t, a]) => {
      setTasks(t)
      setActivity(a)
      setLoading(false)
    })
    setLocalRevenue(getStoredRevenue(brand.slug))
  }, [brand])

  if (!brand) return <div className="p-8 text-base">Brand not found</div>

  const supabaseRevenue = revenueForBrand(brand.id)
  const aprRevenue = localRevenue['Apr'] ?? supabaseRevenue
  const chartData = [
    { month: 'Jan', amount: localRevenue['Jan'] ?? Math.round(supabaseRevenue * 0.7) },
    { month: 'Feb', amount: localRevenue['Feb'] ?? Math.round(supabaseRevenue * 0.8) },
    { month: 'Mar', amount: localRevenue['Mar'] ?? Math.round(supabaseRevenue * 0.9) },
    { month: 'Apr', amount: aprRevenue },
  ]

  function saveRevenue() {
    const val = parseFloat(revenueInput)
    if (isNaN(val) || !brand) return
    setStoredRevenue(brand.slug, 'Apr', val)
    setLocalRevenue(prev => ({ ...prev, Apr: val }))
    setEditingRevenue(false)
  }

  async function addTask() {
    if (!newTask.trim() || !brand) return
    const t = await api.createTask({ brand_id: brand.id, title: newTask.trim(), priority: 'medium' })
    if (t) setTasks(prev => [t, ...prev])
    setNewTask('')
    await api.logActivity(brand.id, `Task created: ${newTask.trim()}`)
    reloadTasks()
    reloadActivity()
  }

  async function toggleTask(id: string) {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const newStatus = task.status === 'done' ? 'open' : 'done'
    await api.updateTask(id, { status: newStatus })
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
    reloadTasks()
  }

  async function removeTask(id: string) {
    await api.deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
    reloadTasks()
  }

  const progress = brand.monthly_target > 0 ? Math.min((aprRevenue / brand.monthly_target) * 100, 100) : 0

  return (
    <PageTransition>
      {/* Hero */}
      <div className="rounded-2xl p-8 mb-8 relative overflow-hidden" style={{ background: brand.colour, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
        <div className="relative z-10">
          <button onClick={() => navigate('/')} className="mb-4 flex items-center gap-2 text-white/60 text-[14px] font-medium hover:text-white/90 transition-colors">
            <ArrowLeft size={16} /> Back to Overview
          </button>
          <h1 className="text-4xl font-extrabold text-white mb-2">{brand.name}</h1>
          <p className="text-white/70 text-base">{brand.description}</p>
          <div className="flex gap-3 mt-5">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${brand.status === 'live' ? 'bg-white/20 text-white' : 'bg-amber-400/20 text-amber-200'}`}>
              {brand.status.toUpperCase()}
            </span>
            {brand.url && (
              <a href={brand.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-white/50 flex items-center gap-1.5 hover:text-white/80">
                <ExternalLink size={12} /> {brand.url.replace('https://', '').replace('http://', '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Revenue + editable input */}
      <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6 mb-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold">Revenue</h3>
          <div className="flex items-center gap-3">
            {editingRevenue ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-[#e8e6e2] rounded-lg overflow-hidden">
                  <span className="px-3 py-2 bg-[#f8f8f8] text-[#9ca3af] text-sm font-medium border-r border-[#e8e6e2]">£</span>
                  <input
                    type="number"
                    value={revenueInput}
                    onChange={e => setRevenueInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveRevenue()}
                    placeholder={String(aprRevenue)}
                    className="w-28 px-3 py-2 text-sm outline-none"
                    autoFocus
                  />
                </div>
                <button onClick={saveRevenue} className="h-9 px-4 rounded-lg bg-[#111] text-white text-sm font-bold hover:bg-[#222]">Save</button>
                <button onClick={() => setEditingRevenue(false)} className="h-9 px-3 rounded-lg border border-[#e8e6e2] text-sm font-medium text-[#9ca3af]">Cancel</button>
              </div>
            ) : (
              <button onClick={() => { setRevenueInput(String(aprRevenue)); setEditingRevenue(true) }}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#9ca3af] hover:text-[#1a1a1a] transition-colors">
                <PoundSterling size={14} /> Edit Revenue
              </button>
            )}
          </div>
        </div>

        {/* Current revenue display */}
        <div className="flex items-end gap-3 mb-5">
          <span className="text-4xl font-extrabold">£{aprRevenue.toLocaleString()}</span>
          {brand.monthly_target > 0 && (
            <span className="text-sm text-[#9ca3af] font-medium mb-1">of £{brand.monthly_target.toLocaleString()} target ({Math.round(progress)}%)</span>
          )}
        </div>
        {brand.monthly_target > 0 && (
          <div className="h-2.5 rounded-full bg-[#f0eff0] overflow-hidden mb-6">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }}
              className="h-full rounded-full" style={{ background: brand.colour }} />
          </div>
        )}

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `£${v}`} />
            <Tooltip formatter={(v) => [`£${Number(v).toLocaleString()}`, 'Revenue']} />
            <Bar dataKey="amount" fill={brand.colour} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6 mb-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <h3 className="text-base font-bold mb-4">Tasks</h3>
        <div className="flex gap-2 mb-4">
          <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a task..." className="flex-1 h-10 px-4 text-sm rounded-xl border border-[#e8e6e2] outline-none focus:border-[#9ca3af]" />
          <button onClick={addTask} className="h-10 w-10 rounded-xl bg-[#111] text-white flex items-center justify-center hover:bg-[#222]">
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {loading ? <div className="text-sm text-[#9ca3af] py-6 text-center">Loading...</div> :
            tasks.length === 0 ? <div className="text-sm text-[#9ca3af] py-6 text-center">No tasks yet</div> :
            tasks.map(task => (
              <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#fafafa] group">
                <button onClick={() => toggleTask(task.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-[#d1d5db] hover:border-[#9ca3af]'}`}>
                  {task.status === 'done' && <Check size={12} className="text-white" />}
                </button>
                <span className={`text-sm flex-1 font-medium ${task.status === 'done' ? 'line-through text-[#9ca3af]' : ''}`}>{task.title}</span>
                <button onClick={() => removeTask(task.id)} className="opacity-0 group-hover:opacity-100 text-[#d1d5db] hover:text-red-500 transition-all">
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))
          }
        </div>
      </div>

      {/* Activity */}
      {activity.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e8e6e2] p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
          <h3 className="text-base font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activity.map(a => (
              <div key={a.id} className="flex items-start gap-3 text-sm">
                <Clock size={14} className="text-[#d1d5db] mt-0.5 flex-shrink-0" />
                <span className="text-[#4a4f6a] font-medium">{a.description}</span>
                <span className="text-[#d1d5db] ml-auto flex-shrink-0 text-xs">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  )
}
