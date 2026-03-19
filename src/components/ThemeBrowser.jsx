import { useState } from 'react'

export default function ThemeBrowser({ categories, onSelect }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="tactical-panel" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <span className="text-[10px] tracking-widest uppercase glow-green">THEME DATABASE</span>
        <div className="flex-1 h-px" style={{ background: 'var(--mil-border)' }} />
        <span className="text-[10px] tracking-wider" style={{ color: 'var(--mil-text-dim)' }}>
          {categories[activeTab].themes.length} ENTRIES
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto px-2 pb-2 gap-1" style={{ borderBottom: '1px solid var(--mil-border)' }}>
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className="px-3 py-2 text-[10px] tracking-wider uppercase whitespace-nowrap transition font-medium"
            style={{
              background: activeTab === i ? 'var(--mil-green-dim)' : 'transparent',
              border: activeTab === i ? '1px solid var(--mil-green)' : '1px solid transparent',
              color: activeTab === i ? 'var(--mil-green)' : 'var(--mil-text-dim)',
              textShadow: activeTab === i ? '0 0 8px rgba(0,255,65,0.4)' : 'none',
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Theme Grid */}
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-72 overflow-y-auto">
        {categories[activeTab].themes.map((theme, i) => (
          <button
            key={i}
            onClick={() => onSelect({ ...theme, category: categories[activeTab].name })}
            className="text-left px-3 py-2 text-xs transition flex items-center gap-2"
            style={{
              color: 'var(--mil-text)',
              borderBottom: '1px solid var(--mil-border)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--mil-green)'
              e.currentTarget.style.background = 'rgba(0,255,65,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--mil-text)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <span style={{ color: 'var(--mil-text-dim)', fontSize: '10px' }}>{String(i + 1).padStart(2, '0')}</span>
            {theme.title}
          </button>
        ))}
      </div>
    </section>
  )
}
