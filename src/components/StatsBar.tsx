import { PROJECTS } from '../data/projects'
import type { Task } from '../data/tasks'
import type { Update } from '../data/updates'

interface StatsBarProps {
  tasks: Task[]
  updates: Update[]
}

export function StatsBar({ tasks, updates }: StatsBarProps) {
  const totalProjects = PROJECTS.length
  const openTasks = tasks.filter(t => !t.done).length
  const completedTasks = tasks.filter(t => t.done).length
  const needsAttention = 2
  const totalUpdates = updates.length

  const stats = [
    { label: 'PROJECTS', value: totalProjects, color: 'text-muted' },
    { label: 'OPEN TASKS', value: openTasks, color: 'text-amber' },
    { label: 'COMPLETED', value: completedTasks, color: 'text-teal' },
    { label: 'NEEDS ATTENTION', value: needsAttention, color: 'text-red' },
    { label: 'UPDATES', value: totalUpdates, color: 'text-text' },
  ]

  return (
    <div className="flex items-center gap-0 rounded-lg border border-border bg-surface overflow-hidden">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center">
          {i > 0 && <div className="w-px h-8 bg-border" />}
          <div className="px-5 py-3 flex items-center gap-2">
            <span className={`text-lg font-semibold tabular-nums ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-[10px] font-mono text-muted2 tracking-widest">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
