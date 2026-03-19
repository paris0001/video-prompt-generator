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

function NarrationInfoBar({ info, meta }) {
  if (!info || !meta) return null
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 flex-wrap" style={{ borderBottom: '1px solid var(--mil-border)', background: 'rgba(0,0,0,0.2)' }}>
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

function ScriptBlock({ label, text, accentColor = 'var(--mil-green)' }) {
  const chars = text.length
  return (
    <div className="mt-1 px-4 py-3" style={{ borderTop: '1px dashed var(--mil-border)', background: 'rgba(0,0,0,0.15)' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-widest uppercase" style={{ color: accentColor }}>
            {label}
          </span>
          <span className="text-[10px] tracking-wider" style={{ color: 'var(--mil-text-dim)' }}>
            {chars}字
          </span>
        </div>
        <CopyButton text={text} label="COPY SCRIPT" />
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--mil-text)', letterSpacing: '0.02em' }}>
        {text}
      </p>
    </div>
  )
}

function TwoPartOutput({ prompts, theme, meta }) {
  return (
    <div className="space-y-4">
      {/* Part 1 */}
      <section className="tactical-panel" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--mil-border)', background: 'rgba(0, 255, 65, 0.03)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--mil-green)', boxShadow: '0 0 6px var(--mil-green)' }} />
            <span className="text-[10px] tracking-widest uppercase glow-green">PART 1 — FRONT</span>
          </div>
          <CopyButton text={prompts.part1} label="COPY PT.1" />
        </div>
        <NarrationInfoBar info={meta?.n1} meta={meta} />
        <pre className="p-4 text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto" style={{ color: 'var(--mil-text)', fontFamily: 'inherit' }}>
          {prompts.part1}
        </pre>
        {meta?.n1 && <ScriptBlock label="SCRIPT PT.1" text={meta.n1.text} accentColor="var(--mil-green)" />}
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
        <NarrationInfoBar info={meta?.n2} meta={meta} />
        <pre className="p-4 text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto" style={{ color: 'var(--mil-text)', fontFamily: 'inherit' }}>
          {prompts.part2}
        </pre>
        {meta?.n2 && <ScriptBlock label="SCRIPT PT.2" text={meta.n2.text} accentColor="var(--mil-amber)" />}
      </section>

      {/* Copy Both */}
      <div className="flex justify-center gap-2 py-1">
        <CopyButton
          text={`=== PART 1 — FRONT ===\n\n${prompts.part1}\n\n=== PART 2 — BACK ===\n\n${prompts.part2}`}
          label="◆ COPY ALL PROMPTS"
          variant="primary"
        />
        {meta?.n1 && meta?.n2 && (
          <CopyButton
            text={`【前編台本】\n${meta.n1.text}\n\n【後編台本】\n${meta.n2.text}`}
            label="◆ COPY ALL SCRIPTS"
            variant="primary"
          />
        )}
      </div>
    </div>
  )
}

function SingleOutput({ prompts, theme, meta }) {
  return (
    <div className="space-y-4">
      <section className="tactical-panel" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--mil-border)', background: 'rgba(0, 255, 65, 0.03)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--mil-green)', boxShadow: '0 0 6px var(--mil-green)' }} />
            <span className="text-[10px] tracking-widest uppercase glow-green">SINGLE 15s — COMPLETE</span>
          </div>
          <CopyButton text={prompts.single} label="COPY PROMPT" variant="primary" />
        </div>
        <NarrationInfoBar info={meta?.narration} meta={meta} />
        <pre className="p-4 text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto" style={{ color: 'var(--mil-text)', fontFamily: 'inherit' }}>
          {prompts.single}
        </pre>
        {meta?.narration && <ScriptBlock label="SCRIPT" text={meta.narration.text} accentColor="var(--mil-green)" />}
      </section>
    </div>
  )
}

function PostInfoBlock({ theme }) {
  if (!theme.ytTitle && !theme.ytDesc) return null
  return (
    <section className="tactical-panel" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <span className="text-[10px] tracking-widest uppercase glow-green">POST INFO</span>
        <div className="flex-1 h-px" style={{ background: 'var(--mil-border)' }} />
      </div>

      {/* Title */}
      {theme.ytTitle && (
        <div className="px-4 py-2" style={{ borderBottom: '1px solid var(--mil-border)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--mil-amber)' }}>TITLE</span>
            <CopyButton text={theme.ytTitle} label="COPY TITLE" />
          </div>
          <p className="text-sm font-bold" style={{ color: 'var(--mil-text)', lineHeight: '1.5' }}>
            {theme.ytTitle}
          </p>
        </div>
      )}

      {/* Description */}
      {theme.ytDesc && (
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--mil-amber)' }}>DESCRIPTION</span>
            <CopyButton text={theme.ytDesc} label="COPY DESC" />
          </div>
          <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--mil-text)' }}>
            {theme.ytDesc}
          </p>
        </div>
      )}

      {/* Copy All Post Info */}
      {theme.ytTitle && theme.ytDesc && (
        <div className="flex justify-center py-2" style={{ borderTop: '1px solid var(--mil-border)' }}>
          <CopyButton
            text={`${theme.ytTitle}\n\n${theme.ytDesc}`}
            label="◆ COPY TITLE + DESC"
            variant="primary"
          />
        </div>
      )}
    </section>
  )
}

export default function PromptOutput({ prompts, theme }) {
  const meta = prompts.meta || null
  const isSingle = prompts.mode === 'single'

  return (
    <div className="space-y-4">
      {/* Title bar */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] tracking-widest uppercase glow-amber">OUTPUT</span>
        <span className="text-[10px] tracking-wider px-2 py-0.5" style={{
          border: '1px solid var(--mil-border)',
          color: isSingle ? 'var(--mil-amber)' : 'var(--mil-green)',
        }}>
          {isSingle ? 'SINGLE 15s' : '2-PART'}
        </span>
        <div className="flex-1 h-px" style={{ background: 'var(--mil-border)' }} />
        <span className="text-xs glow-green">{theme.title}</span>
      </div>

      {/* Post Info (Title + Description) */}
      <PostInfoBlock theme={theme} />

      {isSingle
        ? <SingleOutput prompts={prompts} theme={theme} meta={meta} />
        : <TwoPartOutput prompts={prompts} theme={theme} meta={meta} />
      }
    </div>
  )
}
