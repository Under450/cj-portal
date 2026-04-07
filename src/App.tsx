import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { StatsBar } from './components/StatsBar'
import { TaskPanel } from './components/TaskPanel'
import { UpdatePanel } from './components/UpdatePanel'
import { TASKS } from './data/tasks'
import { UPDATES } from './data/updates'
import type { Tag, Task } from './data/tasks'
import type { Update } from './data/updates'

const TABS = [
  { id: 'bergason-tasks', label: 'Block Mgmt & Landlord' },
  { id: 'cj-tasks', label: 'FMM & CJ Projects' },
  { id: 'bergason-updates', label: 'Bergason Updates' },
  { id: 'cj-updates', label: 'CJ Updates' },
] as const

type TabId = typeof TABS[number]['id']

function App() {
  const [activeProject, setActiveProject] = useState('bergason-block')
  const [tasks, setTasks] = useState<Task[]>(TASKS)
  const [updates, setUpdates] = useState<Update[]>(UPDATES)
  const [activeFilter, setActiveFilter] = useState<Tag | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('bergason-tasks')
  const [tabDirection, setTabDirection] = useState(1)

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

  const switchTab = (newTab: TabId) => {
    const currentIdx = TABS.findIndex(t => t.id === activeTab)
    const newIdx = TABS.findIndex(t => t.id === newTab)
    setTabDirection(newIdx >= currentIdx ? 1 : -1)
    setActiveTab(newTab)
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
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
        <main className="flex-1 min-w-0 p-6 pl-5">
          <StatsBar tasks={tasks} updates={updates} />

          {/* Tab switcher */}
          <div className="flex items-center gap-1 mt-5 mb-5 bg-surface rounded-lg border border-border p-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`relative px-4 py-2 rounded-md text-[12px] font-medium tracking-wide transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-bg'
                    : 'text-muted hover:text-text'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-amber rounded-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Single panel — full width */}
          <AnimatePresence mode="wait" custom={tabDirection}>
            {activeTab === 'bergason-tasks' && (
              <motion.div key="bergason-tasks" custom={tabDirection} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                <TaskPanel title="BLOCK MGMT & LANDLORD · TASKS" tasks={tasks.filter(t => t.panel === 1)} onToggle={toggleTask} onAdd={(text) => addTask(text, 1)} filter={activeFilter} />
              </motion.div>
            )}
            {activeTab === 'cj-tasks' && (
              <motion.div key="cj-tasks" custom={tabDirection} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                <TaskPanel title="FORWARD MY MAIL & CJ PROJECTS · TASKS" tasks={tasks.filter(t => t.panel === 2)} onToggle={toggleTask} onAdd={(text) => addTask(text, 2)} filter={activeFilter} />
              </motion.div>
            )}
            {activeTab === 'bergason-updates' && (
              <motion.div key="bergason-updates" custom={tabDirection} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                <UpdatePanel title="BERGASON · UPDATES" updates={updates.filter(u => u.panel === 3)} onToggle={toggleUpdate} />
              </motion.div>
            )}
            {activeTab === 'cj-updates' && (
              <motion.div key="cj-updates" custom={tabDirection} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                <UpdatePanel title="CJ PROJECTS · UPDATES" updates={updates.filter(u => u.panel === 4)} onToggle={toggleUpdate} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
