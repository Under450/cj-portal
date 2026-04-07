import { useParams, useNavigate } from 'react-router-dom'
import { PageTransition } from '@/components/PageTransition'
import { getBrand, SEED_REVENUE } from '@/lib/brands'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Plus, Check, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function BrandDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const brand = getBrand(slug || '')
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Update homepage copy', status: 'open' },
    { id: '2', title: 'Review analytics dashboard', status: 'done' },
  ])
  const [newTask, setNewTask] = useState('')

  if (!brand) return <div className="p-6">Brand not found</div>

  const revenue = SEED_REVENUE[brand.id] || 0
  const chartData = [
    { month: 'Jan', amount: Math.round(revenue * 0.7) },
    { month: 'Feb', amount: Math.round(revenue * 0.8) },
    { month: 'Mar', amount: Math.round(revenue * 0.9) },
    { month: 'Apr', amount: revenue },
  ]

  function addTask() {
    if (!newTask.trim()) return
    setTasks(prev => [{ id: Date.now().toString(), title: newTask.trim(), status: 'open' }, ...prev])
    setNewTask('')
  }

  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'open' : 'done' } : t))
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <PageTransition>
      {/* Hero */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden" style={{ background: brand.colour }}>
        <div className="relative z-10">
          <button onClick={() => navigate('/')} className="mb-3 flex items-center gap-1.5 text-white/60 text-xs font-medium hover:text-white/90 transition-colors">
            <ArrowLeft size={14} /> Back to Overview
          </button>
          <h1 className="text-3xl font-extrabold text-white mb-1">{brand.name}</h1>
          <p className="text-white/70 text-sm">{brand.description}</p>
          <div className="flex gap-3 mt-4">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${brand.status === 'live' ? 'bg-white/20 text-white' : 'bg-amber-400/20 text-amber-200'}`}>
              {brand.status.toUpperCase()}
            </span>
            {brand.url && (
              <a href={brand.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-white/50 flex items-center gap-1 hover:text-white/80">
                <ExternalLink size={10} /> {brand.url.replace('https://', '').replace('http://', '')}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="bg-white rounded-xl border border-[#e8e6e2] p-5">
          <h3 className="text-sm font-bold mb-4">Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `£${v}`} />
              <Tooltip formatter={(v) => [`£${Number(v).toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="amount" fill={brand.colour} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl border border-[#e8e6e2] p-5">
          <h3 className="text-sm font-bold mb-4">Tasks</h3>
          <div className="flex gap-2 mb-3">
            <input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="Add a task..."
              className="flex-1 h-8 px-3 text-xs rounded-lg border border-[#e8e6e2] outline-none focus:border-[#6b7280]"
            />
            <button onClick={addTask} className="h-8 w-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-[#333]">
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
            {tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f8f8f8] group"
              >
                <button onClick={() => toggleTask(task.id)} className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-[#d1d5db]'}`}>
                  {task.status === 'done' && <Check size={10} className="text-white" />}
                </button>
                <span className={`text-xs flex-1 ${task.status === 'done' ? 'line-through text-[#9ca3af]' : ''}`}>{task.title}</span>
                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-[#9ca3af] hover:text-red-500">
                  <Trash2 size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
