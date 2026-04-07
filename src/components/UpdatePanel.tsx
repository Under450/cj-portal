import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Update } from '../data/updates'

const TYPE_BORDER: Record<string, string> = {
  dev: 'border-l-amber',
  deploy: 'border-l-teal',
  legal: 'border-l-red',
  design: 'border-l-purple',
}

const PILL_STYLE: Record<string, string> = {
  live: 'bg-teal/15 text-teal border-teal/25',
  wip: 'bg-amber/15 text-amber border-amber/25',
  blocked: 'bg-red/15 text-red border-red/25',
}

interface UpdatePanelProps {
  title: string
  updates: Update[]
  onToggle: (id: string) => void
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

export function UpdatePanel({ title, updates, onToggle }: UpdatePanelProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-border bg-surface overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-border">
        <span className="text-[11px] font-mono text-muted tracking-[0.15em]">{title}</span>
      </div>

      {/* Entries */}
      <div className="p-4 space-y-2">
        {updates.map(u => (
          <motion.div
            key={u.id}
            variants={item}
            className={`rounded-lg border border-border bg-surface2/50 overflow-hidden border-l-[3px] ${TYPE_BORDER[u.type]}`}
          >
            {/* Clickable header */}
            <button
              onClick={() => onToggle(u.id)}
              className="w-full text-left px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-surface2/80 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[15px] text-text font-medium">{u.title}</div>
                <div className="text-[11px] font-mono text-muted2 mt-1">{u.date}</div>
              </div>
              <ChevronDown
                size={16}
                className={`text-muted2 transition-transform flex-shrink-0 ${u.expanded ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Expanded content */}
            {u.expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4"
              >
                <div className="border-t border-border pt-3">
                  <p
                    className="text-[13px] text-muted leading-relaxed [&_.text-amber]:text-amber [&_.text-teal]:text-teal [&_.text-purple]:text-purple"
                    dangerouslySetInnerHTML={{ __html: u.body }}
                  />
                  <div className="mt-3">
                    <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border ${PILL_STYLE[u.pill]}`}>
                      {u.pillText}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
