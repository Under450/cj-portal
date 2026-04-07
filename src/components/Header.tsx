import { useState, useEffect } from 'react'

export function Header() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface">
      <div className="flex items-center gap-3">
        {/* Logo mark */}
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm text-bg font-display"
          style={{
            background: 'var(--amber)',
            boxShadow: '0 0 16px rgba(240, 165, 0, 0.3)',
          }}
        >
          CJ
        </div>
        <h1 className="text-lg font-display text-text tracking-tight">
          Ops Portal
        </h1>
        {/* LIVE badge */}
        <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full border border-border-lit bg-surface2 text-[11px] font-mono tracking-wider text-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-teal live-pulse" />
          LIVE
        </div>
      </div>

      {/* Clock */}
      <div className="flex items-center gap-3 text-muted font-mono text-xs">
        <span>{formatDate(time)}</span>
        <span className="text-border-lit">|</span>
        <span className="text-text tabular-nums">{formatTime(time)}</span>
      </div>
    </header>
  )
}
