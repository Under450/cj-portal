import { PageTransition } from '@/components/PageTransition'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useData } from '@/lib/DataProvider'
import * as api from '@/lib/data'
import { Plus, GripVertical } from 'lucide-react'

type TaskStatus = 'open' | 'in-progress' | 'done'

const COLUMNS: { key: TaskStatus; label: string; colour: string }[] = [
  { key: 'open', label: 'To Do', colour: '#6b7280' },
  { key: 'in-progress', label: 'In Progress', colour: '#1d4ed8' },
  { key: 'done', label: 'Done', colour: '#15803d' },
]

const PRIORITY_COLOURS: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#6b7280',
}

export function Tasks() {
  const { brands, tasks, reloadTasks } = useData()
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBrand, setNewBrand] = useState(brands[0]?.id || '')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')

  async function addTask() {
    if (!newTitle.trim() || !newBrand) return
    await api.createTask({ brand_id: newBrand, title: newTitle.trim(), priority: newPriority })
    setNewTitle('')
    setAdding(false)
    await reloadTasks()
  }

  async function moveTask(id: string, newStatus: TaskStatus) {
    await api.updateTask(id, { status: newStatus })
    await reloadTasks()
  }

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold">Tasks</h1>
        <button onClick={() => setAdding(true)} className="h-10 px-5 rounded-xl bg-[#111] text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#222]">
          <Plus size={15} strokeWidth={2.5} /> Add Task
        </button>
      </div>

      {adding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#e8e6e2] p-5 mb-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
          <div className="grid grid-cols-4 gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Task title"
              className="col-span-2 h-10 px-4 text-sm rounded-xl border border-[#e8e6e2] outline-none focus:border-[#9ca3af]" autoFocus />
            <select value={newBrand} onChange={e => setNewBrand(e.target.value)} className="h-10 px-3 text-sm rounded-xl border border-[#e8e6e2] outline-none">
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <select value={newPriority} onChange={e => setNewPriority(e.target.value as 'low' | 'medium' | 'high')} className="h-10 px-3 text-sm rounded-xl border border-[#e8e6e2] outline-none">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={addTask} className="h-10 px-5 rounded-xl bg-[#111] text-white text-sm font-bold hover:bg-[#222]">Save</button>
            <button onClick={() => setAdding(false)} className="h-10 px-5 rounded-xl border border-[#e8e6e2] text-sm font-medium text-[#9ca3af]">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-5">
        {COLUMNS.map(col => (
          <div key={col.key}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.colour }} />
              <span className="text-[13px] font-bold text-[#9ca3af] uppercase tracking-wider">{col.label}</span>
              <span className="text-[13px] text-[#d1d5db] font-semibold ml-auto">{tasks.filter(t => t.status === col.key).length}</span>
            </div>
            <div className="space-y-3 min-h-[250px]">
              {tasks.filter(t => t.status === col.key).map((task, i) => {
                const brand = brands.find(b => b.id === task.brand_id)
                const nextStatus: TaskStatus = col.key === 'open' ? 'in-progress' : col.key === 'in-progress' ? 'done' : 'open'
                return (
                  <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => moveTask(task.id, nextStatus)}
                    className="bg-white rounded-2xl border border-[#e8e6e2] p-4 cursor-pointer hover:shadow-lg transition-shadow group"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div className="flex items-start gap-2.5">
                      <GripVertical size={15} className="text-[#e8e6e2] mt-0.5 opacity-0 group-hover:opacity-100 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold mb-2">{task.title}</div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: brand?.colour + '15', color: brand?.colour }}>
                            {brand?.name.split(' ')[0]}
                          </span>
                          <span className="w-2 h-2 rounded-full" style={{ background: PRIORITY_COLOURS[task.priority] }} />
                          <span className="text-xs text-[#9ca3af] capitalize font-medium">{task.priority}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  )
}
