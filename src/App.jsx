import { useState, useCallback } from 'react'
import { categories, getRandomTheme } from './data/themes'
import { generatePrompts, generateSinglePrompt, generateSystemPrompt, defaultTiming } from './data/promptTemplates'
import PromptOutput from './components/PromptOutput'
import ThemeBrowser from './components/ThemeBrowser'
import TimingSettings from './components/TimingSettings'
import SystemPromptModal from './components/SystemPromptModal'
import ScriptHistory from './components/ScriptHistory'
import './App.css'

function App() {
  const [theme, setTheme] = useState(null)
  const [customTheme, setCustomTheme] = useState('')
  const [prompts, setPrompts] = useState(null)
  const [showThemes, setShowThemes] = useState(false)
  const [showTiming, setShowTiming] = useState(false)
  const [showSystem, setShowSystem] = useState(false)
  const [history, setHistory] = useState([])
  const [timing, setTiming] = useState(defaultTiming)
  const [mode, setMode] = useState('2part') // '2part' or 'single'
  const [intensity, setIntensity] = useState('cool') // 'cool' = DEFCON 3 / 'hot' = DEFCON 1
  const [fxKey, setFxKey] = useState(0) // bump to retrigger the strobe FX

  const handleRandom = useCallback(() => {
    const t = getRandomTheme()
    setTheme(t)
    setCustomTheme(t.title)
  }, [])

  const handleSelectTheme = useCallback((t) => {
    setTheme(t)
    setCustomTheme(t.title)
    setShowThemes(false)
  }, [])

  const handleGenerate = useCallback(() => {
    const activeTheme = theme || {
      title: customTheme,
      stage: "海上",
      color: intensity === 'hot' ? "combat_red" : "cold_ocean",
      protagonist: "艦長",
    }
    const result = mode === 'single'
      ? generateSinglePrompt(activeTheme, timing, intensity)
      : generatePrompts(activeTheme, timing, intensity)
    setPrompts({ ...result, mode })
    setHistory(prev => [{ theme: activeTheme, prompts: { ...result, mode }, time: new Date() }, ...prev].slice(0, 10))
    if (intensity === 'hot') setFxKey(k => k + 1)
  }, [theme, customTheme, timing, mode, intensity])

  const handleCustomChange = useCallback((e) => {
    setCustomTheme(e.target.value)
    setTheme(null)
  }, [])

  const isHot = intensity === 'hot'

  return (
    <div
      className={`min-h-screen scanlines grid-bg${isHot ? ' defcon-1' : ''}`}
      style={{ background: 'var(--mil-bg)', color: 'var(--mil-text)' }}
    >
      {/* DEFCON 1 strobe FX (one-shot, retriggered by fxKey) */}
      {isHot && fxKey > 0 && <div key={fxKey} className="fx-strobe" />}

      {/* Header */}
      <header className="sticky top-0 z-50" style={{ borderBottom: '1px solid var(--mil-green-dim)', background: isHot ? 'rgba(20, 5, 5, 0.95)' : 'rgba(10, 14, 10, 0.95)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--mil-green)' }} />
              <div>
                <h1 className="text-sm font-bold tracking-widest uppercase glow-green">
                  {isHot ? 'TACTICAL PROMPT GENERATOR // BATTLE STATIONS' : 'TACTICAL PROMPT GENERATOR'}
                </h1>
                <p className="text-[10px] tracking-wider uppercase mt-0.5" style={{ color: 'var(--mil-text-dim)' }}>
                  {isHot
                    ? 'DIRECT ENGAGEMENT MODE // ROE: WEAPONS FREE'
                    : 'MILITARY SHORT DRAMA // SYSTEM ONLINE'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-wider" style={{ color: isHot ? '#ff7070' : 'var(--mil-text-dim)' }}>
                {isHot ? 'THEMES: 115 // DEFCON 1 — ENGAGED' : 'THEMES: 115 // STATUS: READY'}
              </span>
              {/* DEFCON intensity toggle */}
              <button
                onClick={() => setIntensity(isHot ? 'cool' : 'hot')}
                title="Toggle DEFCON 1 — direct combat mode"
                className="text-[10px] px-3 py-1.5 tracking-widest uppercase transition font-bold"
                style={{
                  border: `1px solid ${isHot ? '#ff3030' : 'var(--mil-green-dim)'}`,
                  color: isHot ? '#ffd0d0' : 'var(--mil-text-dim)',
                  background: isHot ? 'rgba(255,32,32,0.18)' : 'transparent',
                  textShadow: isHot ? '0 0 6px rgba(255,32,32,0.8)' : 'none',
                  letterSpacing: '0.2em',
                }}
              >
                {isHot ? '⚠ DEFCON 1' : '◯ DEFCON 3'}
              </button>
              <button
                onClick={() => setShowTiming(!showTiming)}
                className="text-[10px] px-3 py-1.5 tracking-wider uppercase transition font-medium"
                style={{
                  border: `1px solid ${showTiming ? 'var(--mil-amber)' : 'var(--mil-green-dim)'}`,
                  color: showTiming ? 'var(--mil-amber)' : 'var(--mil-green)',
                  background: showTiming ? 'rgba(255,176,0,0.1)' : 'var(--mil-green-dim)',
                }}
                onMouseEnter={e => { e.target.style.background = showTiming ? 'rgba(255,176,0,0.15)' : 'var(--mil-green-mid)'; e.target.style.borderColor = showTiming ? 'var(--mil-amber)' : 'var(--mil-green)' }}
                onMouseLeave={e => { e.target.style.background = showTiming ? 'rgba(255,176,0,0.1)' : 'var(--mil-green-dim)'; e.target.style.borderColor = showTiming ? 'var(--mil-amber)' : 'var(--mil-green-dim)' }}
              >
                ⏱ TIMING
              </button>
              <button
                onClick={() => setShowSystem(true)}
                className="text-[10px] px-3 py-1.5 tracking-wider uppercase transition font-medium"
                style={{
                  border: '1px solid var(--mil-green-dim)',
                  color: 'var(--mil-green)',
                  background: 'var(--mil-green-dim)',
                }}
                onMouseEnter={e => { e.target.style.background = 'var(--mil-green-mid)'; e.target.style.borderColor = 'var(--mil-green)' }}
                onMouseLeave={e => { e.target.style.background = 'var(--mil-green-dim)'; e.target.style.borderColor = 'var(--mil-green-dim)' }}
              >
                SYS PROMPT
              </button>
            </div>
          </div>
        </div>
        {isHot && (
          <div className="defcon-banner">
            <span className="stripe" />
            ⚠ DEFCON 1 — ACTIVE ENGAGEMENT // ROE: WEAPONS FREE ⚠
            <span className="stripe" />
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Command Input Panel */}
        <section className="tactical-panel p-5" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] tracking-widest uppercase glow-green">
              {isHot ? 'ENGAGEMENT BRIEFING — TARGET ACQUISITION' : 'MISSION BRIEFING'}
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--mil-border)' }} />
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleRandom}
                className="px-4 py-2.5 text-xs tracking-wider uppercase font-bold transition"
                style={{
                  background: 'var(--mil-green-dim)',
                  border: '1px solid var(--mil-green)',
                  color: 'var(--mil-green)',
                  textShadow: '0 0 8px rgba(0,255,65,0.5)',
                }}
                onMouseEnter={e => e.target.style.background = 'var(--mil-green-mid)'}
                onMouseLeave={e => e.target.style.background = 'var(--mil-green-dim)'}
              >
                ▶ RANDOM TARGET
              </button>
              <button
                onClick={() => setShowThemes(!showThemes)}
                className="px-4 py-2.5 text-xs tracking-wider uppercase font-medium transition"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--mil-border)',
                  color: 'var(--mil-text)',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--mil-green)'; e.target.style.color = 'var(--mil-green)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--mil-border)'; e.target.style.color = 'var(--mil-text)' }}
              >
                {showThemes ? '× CLOSE DB' : '◆ THEME DATABASE [115]'}
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-1">
              {[
                { id: '2part', label: '2-PART (12s×2)' },
                { id: 'single', label: 'SINGLE (15s)' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className="px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium transition"
                  style={{
                    background: mode === m.id ? 'var(--mil-green-dim)' : 'transparent',
                    border: `1px solid ${mode === m.id ? 'var(--mil-green)' : 'var(--mil-border)'}`,
                    color: mode === m.id ? 'var(--mil-green)' : 'var(--mil-text-dim)',
                    textShadow: mode === m.id ? '0 0 6px rgba(0,255,65,0.3)' : 'none',
                  }}
                  onMouseEnter={e => {
                    if (mode !== m.id) { e.currentTarget.style.borderColor = 'var(--mil-green)'; e.currentTarget.style.color = 'var(--mil-text)' }
                  }}
                  onMouseLeave={e => {
                    if (mode !== m.id) { e.currentTarget.style.borderColor = 'var(--mil-border)'; e.currentTarget.style.color = 'var(--mil-text-dim)' }
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs glow-green">{'>'}</span>
                <input
                  type="text"
                  value={customTheme}
                  onChange={handleCustomChange}
                  placeholder={isHot ? 'DESIGNATE TARGET — HOSTILE CONTACT...' : 'ENTER MISSION THEME...'}
                  className="w-full pl-7 pr-4 py-2.5 text-sm placeholder-opacity-30 focus:outline-none"
                  style={{
                    background: 'rgba(0, 255, 65, 0.03)',
                    border: '1px solid var(--mil-border)',
                    color: 'var(--mil-green)',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--mil-green)'}
                  onBlur={e => e.target.style.borderColor = 'var(--mil-border)'}
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={!customTheme.trim()}
                className="px-6 py-2.5 text-xs tracking-wider uppercase font-bold transition"
                style={{
                  background: customTheme.trim()
                    ? (isHot ? '#ff3030' : 'var(--mil-amber)')
                    : 'var(--mil-green-dim)',
                  border: '1px solid ' + (customTheme.trim()
                    ? (isHot ? '#ff3030' : 'var(--mil-amber)')
                    : 'var(--mil-border)'),
                  color: customTheme.trim()
                    ? (isHot ? '#fff' : '#000')
                    : 'var(--mil-text-dim)',
                  boxShadow: customTheme.trim() && isHot ? '0 0 18px rgba(255,32,32,0.6)' : 'none',
                  textShadow: customTheme.trim() && isHot ? '0 0 6px rgba(0,0,0,0.6)' : 'none',
                }}
              >
                {isHot ? 'FIRE ▶▶' : 'GENERATE ▶'}
              </button>
            </div>

            {theme && (
              <div className="flex gap-2 flex-wrap pt-1">
                <span className="text-[10px] px-2 py-1 tracking-wider uppercase" style={{ border: '1px solid var(--mil-border)', color: 'var(--mil-text-dim)' }}>
                  AO: {theme.stage}
                </span>
                <span className="text-[10px] px-2 py-1 tracking-wider uppercase" style={{ border: '1px solid var(--mil-border)', color: 'var(--mil-text-dim)' }}>
                  GRADE: {theme.color}
                </span>
                <span className="text-[10px] px-2 py-1 tracking-wider uppercase" style={{ border: '1px solid var(--mil-border)', color: 'var(--mil-text-dim)' }}>
                  LEAD: {theme.protagonist}
                </span>
                {theme.category && (
                  <span className="text-[10px] px-2 py-1 tracking-wider uppercase" style={{ border: '1px solid var(--mil-green-dim)', color: 'var(--mil-green)', background: 'rgba(0,255,65,0.05)' }}>
                    CAT: {theme.category}
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Timing Settings */}
        {showTiming && (
          <TimingSettings settings={timing} onChange={setTiming} />
        )}

        {/* Theme Browser */}
        {showThemes && (
          <ThemeBrowser categories={categories} onSelect={handleSelectTheme} />
        )}

        {/* Prompt Output */}
        {prompts && (
          <PromptOutput prompts={prompts} theme={theme || { title: customTheme }} />
        )}

        {/* Script History — always visible when there are entries */}
        {history.length > 0 && (
          <ScriptHistory
            history={history}
            onSelect={(item) => {
              setTheme(item.theme)
              setCustomTheme(item.theme.title)
              setPrompts(item.prompts)
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-3 text-center">
        <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--mil-text-dim)' }}>
          {isHot
            ? 'CLASSIFICATION: SECRET // ENGAGEMENT LOG ACTIVE — DO NOT DISTRIBUTE'
            : 'CLASSIFICATION: UNCLASSIFIED // PROMPT GENERATION SYSTEM v1.1'}
        </p>
      </footer>

      {showSystem && <SystemPromptModal onClose={() => setShowSystem(false)} />}
    </div>
  )
}

export default App
