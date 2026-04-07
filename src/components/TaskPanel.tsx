import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import type { Tag, Task } from '../data/tasks'

const TAG_PILL: Record<Tag, string> = {
  DEV: 'bg-amber/10 text-amber border-amber/20',
  OPS: 'bg-teal/10 text-teal border-teal/20',
  LEGAL: 'bg-red/10 text-red border-red/20',
  DESIGN: 'bg-purple/10 text-purple border-purple/20',
}

interface TaskPanelProps {
  title: string
  tasks: Task[]
  onToggle: (id: string) => void
  onAdd: (text: string) => void
  filter: Tag | null
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

export function TaskPanel({ title, tasks, onToggle, onAdd, filter }: TaskPanelProps) {
  const [input, setInput] = useState('')

  const filteredTasks = filter ? tasks.filter(t => t.tag === filter) : tasks

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input.trim())
      setInput('')
    }
  }

  // Group tasks by section
  let lastSection: string | undefined
  const rows: Array<{ type: 'section'; label: string } | { type: 'task'; task: Task }> = []
  for (const task of filteredTasks) {
    if (task.section && task.section !== lastSection) {
      rows.push({ type: 'section', label: task.section })
      lastSection = task.section
    }
    rows.push({ type: 'task', task })
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-border bg-surface overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted tracking-[0.15em]">{title}</span>
        <span className="text-[11px] font-mono text-muted2">
          {tasks.filter(t => t.done).length}/{tasks.length}
        </span>
      </div>

      {/* Task list */}
      <div className="p-4 space-y-0.5">
        {rows.map((row) => {
          if (row.type === 'section') {
            return (
              <motion.div
                key={`section-${row.label}`}
                variants={item}
                className="pt-5 pb-2 px-1"
              >
                <div className="border-t border-border pt-3">
                  <span className="text-[10px] font-mono text-amber-dim tracking-[0.15em]">
                    {row.label}
                  </span>
                </div>
              </motion.div>
            )
          }

          const t = row.task
          return (
            <motion.div
              key={t.id}
              variants={item}
              className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-surface2 transition-colors group"
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggle(t.id)}
                className={`w-[18px] h-[18px] rounded border-[1.5px] flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
                  t.done
                    ? 'bg-teal/20 border-teal text-teal'
                    : 'border-border-lit hover:border-muted'
                }`}
              >
                {t.done && <Check size={11} strokeWidth={3} />}
              </button>

              {/* Text */}
              <span className={`text-[14px] flex-1 leading-snug ${
                t.done ? 'line-through text-muted2' : 'text-text'
              }`}>
                {t.text}
              </span>

              {/* Tag */}
              <span className={`text-[11px] font-mono tracking-wider px-2 py-0.5 rounded border flex-shrink-0 ${TAG_PILL[t.tag]}`}>
                {t.tag}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Add task input — full width, prominent */}
      <form onSubmit={handleSubmit} className="p-4 pt-2">
        <div className="flex items-center gap-3 border border-dashed border-border-lit rounded-lg px-4 py-3 hover:border-muted focus-within:border-amber/40 transition-colors">
          <Plus size={15} className="text-muted2 flex-shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add task..."
            className="flex-1 bg-transparent text-[14px] text-text placeholder:text-muted2 outline-none"
          />
        </div>
      </form>
    </motion.div>
  )
}
