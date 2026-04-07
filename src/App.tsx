import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { StatsBar } from './components/StatsBar'
import { TaskPanel } from './components/TaskPanel'
import { UpdatePanel } from './components/UpdatePanel'
import { TASKS } from './data/tasks'
import { UPDATES } from './data/updates'
import type { Tag, Task } from './data/tasks'
import type { Update } from './data/updates'

function App() {
  const [activeProject, setActiveProject] = useState('bergason-block')
  const [tasks, setTasks] = useState<Task[]>(TASKS)
  const [updates, setUpdates] = useState<Update[]>(UPDATES)
  const [activeFilter, setActiveFilter] = useState<Tag | null>(null)

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addTask = (text: string, panel: 1 | 2) => {
    const newTask: Task = {
      id: `t${Date.now()}`,
      text,
      done: false,
      tag: 'DEV',
      panel,
    }
    setTasks(prev => [...prev, newTask])
  }

  const toggleUpdate = (id: string) => {
    setUpdates(prev => prev.map(u => u.id === id ? { ...u, expanded: !u.expanded } : u))
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <div className="flex">
        <Sidebar
          activeProject={activeProject}
          onSelectProject={setActiveProject}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <main className="flex-1 min-w-0 p-6 pl-4">
          <StatsBar tasks={tasks} updates={updates} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TaskPanel
              title="BLOCK MGMT & LANDLORD"
              tasks={tasks.filter(t => t.panel === 1)}
              onToggle={toggleTask}
              onAdd={(text) => addTask(text, 1)}
              filter={activeFilter}
            />
            <TaskPanel
              title="FMM + CJ PROJECTS"
              tasks={tasks.filter(t => t.panel === 2)}
              onToggle={toggleTask}
              onAdd={(text) => addTask(text, 2)}
              filter={activeFilter}
            />
            <UpdatePanel
              title="BERGASON UPDATES"
              updates={updates.filter(u => u.panel === 3)}
              onToggle={toggleUpdate}
            />
            <UpdatePanel
              title="CJ UPDATES"
              updates={updates.filter(u => u.panel === 4)}
              onToggle={toggleUpdate}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
