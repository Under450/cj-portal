import { PageTransition } from '@/components/PageTransition'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { BRANDS } from '@/lib/brands'
import { Plus, GripVertical } from 'lucide-react'

interface Task {
  id: string
  title: string
  brandId: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Fix tenant portal login', brandId: '1', status: 'todo', priority: 'high' },
  { id: '2', title: 'Update FMM pricing page', brandId: '2', status: 'todo', priority: 'medium' },
  { id: '3', title: 'Design Velvet onboarding', brandId: '3', status: 'in-progress', priority: 'high' },
  { id: '4', title: 'Set up Aventus analytics', brandId: '4', status: 'in-progress', priority: 'medium' },
  { id: '5', title: 'Bergason invoice automation', brandId: '1', status: 'done', priority: 'low' },
  { id: '6', title: 'FMM email templates', brandId: '2', status: 'done', priority: 'medium' },
]

const COLUMNS: { key: Task['status']; label: string; colour: string }[] = [
  { key: 'todo', label: 'To Do', colour: '#6b7280' },
  { key: 'in-progress', label: 'In Progress', colour: '#1d4ed8' },
  { key: 'done', label: 'Done', colour: '#15803d' },
]

const PRIORITY_COLOURS: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#6b7280',
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBrand, setNewBrand] = useState('1')
  const [newPriority, setNewPriority] = useState<Task['priority']>('medium')

  function addTask() {
    if (!newTitle.trim()) return
    setTasks(prev => [{
      id: Date.now().toString(),
      title: newTitle.trim(),
      brandId: newBrand,
      status: 'todo',
      priority: newPriority,
    }, ...prev])
    setNewTitle('')
    setAdding(false)
  }

  function moveTask(id: string, newStatus: Task['status']) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Tasks</h1>
        <button onClick={() => setAdding(true)} className="h-8 px-3 rounded-lg bg-[#1a1a1a] text-white text-xs font-semibold flex items-center gap-1.5">
          <Plus size={14} /> Add Task
        </button>
      </div>

      {adding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-[#e8e6e2] p-4 mb-4">
          <div className="grid grid-cols-4 gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Task title" className="col-span-2 h-9 px-3 text-sm rounded-lg border border-[#e8e6e2] outline-none" autoFocus />
            <select value={newBrand} onChange={e => setNewBrand(e.target.value)} className="h-9 px-2 text-sm rounded-lg border border-[#e8e6e2] outline-none">
              {BRANDS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <select value={newPriority} onChange={e => setNewPriority(e.target.value as Task['priority'])} className="h-9 px-2 text-sm rounded-lg border border-[#e8e6e2] outline-none">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={addTask} className="h-8 px-4 rounded-lg bg-[#1a1a1a] text-white text-xs font-semibold">Save</button>
            <button onClick={() => setAdding(false)} className="h-8 px-4 rounded-lg border border-[#e8e6e2] text-xs font-medium text-[#6b7280]">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map(col => (
          <div key={col.key}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: col.colour }} />
              <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">{col.label}</span>
              <span className="text-xs text-[#9ca3af] ml-auto">{tasks.filter(t => t.status === col.key).length}</span>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {tasks.filter(t => t.status === col.key).map((task, i) => {
                const brand = BRANDS.find(b => b.id === task.brandId)
                const nextStatus: Task['status'] = col.key === 'todo' ? 'in-progress' : col.key === 'in-progress' ? 'done' : 'todo'
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => moveTask(task.id, nextStatus)}
                    className="bg-white rounded-xl border border-[#e8e6e2] p-3 cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical size={14} className="text-[#d1d5db] mt-0.5 opacity-0 group-hover:opacity-100 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium mb-1.5">{task.title}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: brand?.colour + '15', color: brand?.colour }}>
                            {brand?.name.split(' ')[0]}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: PRIORITY_COLOURS[task.priority] }} />
                          <span className="text-[10px] text-[#9ca3af] capitalize">{task.priority}</span>
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
