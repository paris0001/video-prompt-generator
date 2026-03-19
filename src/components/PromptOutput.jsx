import { useState } from 'react'

function CopyButton({ text, label, variant = 'default' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const colors = variant === 'primary'
    ? {
        bg: copied ? 'var(--mil-green-mid)' : 'var(--mil-green-dim)',
        border: 'var(--mil-green)',
        color: 'var(--mil-green)',
      }
    : {
        bg: copied ? 'var(--mil-green-dim)' : 'transparent',
        border: copied ? 'var(--mil-green)' : 'var(--mil-border)',
        color: copied ? 'var(--mil-green)' : 'var(--mil-text)',
      }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium transition"
      style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color }}
    >
      {copied ? '✓ COPIED' : label}
    </button>
  )
}

function CharBadge({ chars, min, max }) {
  const inRange = chars >= min && chars <= max
  const under = chars < min
  const over = chars > max
  const color = inRange ? 'var(--mil-green)' : under ? 'var(--mil-amber)' : 'var(--mil-red)'
  const bg = inRange ? 'rgba(0,255,65,0.08)' : under ? 'rgba(255,176,0,0.08)' : 'rgba(255,32,32,0.08)'
  const label = inRange ? 'IN RANGE' : under ? `${min - chars}字 SHORT` : `${chars - max}字 OVER`

  return (
    <span
      className="text-[9px] tracking-wider px-2 py-0.5 uppercase"
      style={{ color, background: bg, border: `1px solid ${color}` }}
    >
      {chars}字 — {label}
    </span>
  )
}

function NarrationInfo({ meta, partLabel }) {
  if (!meta) return null
  const info = partLabel === 'PT.1' ? meta.n1 : meta.n2

  return (
    <div className="flex items-center gap-2 px-4 py-1.5" style={{ borderBottom: '1px solid var(--mil-border)', background: 'rgba(0,0,0,0.2)' }}>
      <span className="text-[9px] tracking-wider uppercase" style={{ color: 'var(--mil-text-dim)' }}>
        NARRATION:
      </span>
      <CharBadge chars={info.chars} min={meta.charMin} max={meta.charMax} />
      <span className="text-[9px] tracking-wider" style={{ color: 'var(--mil-text-dim)' }}>
        ~{info.speechTime}s SPEECH
      </span>
      <span className="text-[9px] tracking-wider" style={{ color: 'var(--mil-text-dim)' }}>
        / {meta.activeTime}s ACTIVE
      </span>
      <span className="text-[9px] tracking-wider" style={{ color: 'var(--mil-text-dim)' }}>
        + {meta.silentEnding}s SILENT
      </span>
    </div>
  )
}

export default function PromptOutput({ prompts, theme }) {
  const meta = prompts.meta || null

  return (
    <div className="space-y-4">
      {/* Title bar */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] tracking-widest uppercase glow-amber">OUTPUT</span>
        <div className="flex-1 h-px" style={{ background: 'var(--mil-border)' }} />
        <span className="text-xs glow-green">{theme.title}</span>
      </div>

      {/* Part 1 */}
      <section className="tactical-panel" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--mil-border)', background: 'rgba(0, 255, 65, 0.03)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--mil-green)', boxShadow: '0 0 6px var(--mil-green)' }} />
            <span className="text-[10px] tracking-widest uppercase glow-green">PART 1 — FRONT</span>
          </div>
          <CopyButton text={prompts.part1} label="COPY PT.1" />
        </div>
        <NarrationInfo meta={meta} partLabel="PT.1" />
        <pre className="p-4 text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto" style={{ color: 'var(--mil-text)', fontFamily: 'inherit' }}>
          {prompts.part1}
        </pre>
      </section>

      {/* Part 2 */}
      <section className="tactical-panel" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--mil-border)', background: 'rgba(255, 176, 0, 0.03)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--mil-amber)', boxShadow: '0 0 6px var(--mil-amber)' }} />
            <span className="text-[10px] tracking-widest uppercase glow-amber">PART 2 — BACK</span>
          </div>
          <CopyButton text={prompts.part2} label="COPY PT.2" />
        </div>
        <NarrationInfo meta={meta} partLabel="PT.2" />
        <pre className="p-4 text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto" style={{ color: 'var(--mil-text)', fontFamily: 'inherit' }}>
          {prompts.part2}
        </pre>
      </section>

      {/* Copy Both */}
      <div className="flex justify-center py-1">
        <CopyButton
          text={`=== PART 1 — FRONT ===\n\n${prompts.part1}\n\n=== PART 2 — BACK ===\n\n${prompts.part2}`}
          label="◆ COPY ALL PROMPTS"
          variant="primary"
        />
      </div>
    </div>
  )
}
