import { useState } from 'react'

function CopyBtn({ text, label }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={(e) => { e.stopPropagation(); handleCopy() }}
      className="px-2 py-1 text-[9px] tracking-wider uppercase font-medium transition shrink-0"
      style={{
        background: copied ? 'var(--mil-green-dim)' : 'transparent',
        border: `1px solid ${copied ? 'var(--mil-green)' : 'var(--mil-border)'}`,
        color: copied ? 'var(--mil-green)' : 'var(--mil-text-dim)',
      }}
    >
      {copied ? '✓' : label}
    </button>
  )
}

export default function ScriptHistory({ history, onSelect }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <section className="tactical-panel" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <span className="text-[10px] tracking-widest uppercase glow-green">SCRIPT LOG</span>
        <div className="flex-1 h-px" style={{ background: 'var(--mil-border)' }} />
        <span className="text-[10px] tracking-wider" style={{ color: 'var(--mil-text-dim)' }}>
          {history.length} / 10
        </span>
      </div>

      <div className="divide-y" style={{ borderColor: 'var(--mil-border)' }}>
        {history.map((item, i) => {
          const isExpanded = expandedIndex === i
          const isSingle = item.prompts.mode === 'single'
          const meta = item.prompts.meta
          // Get script texts
          const script1 = isSingle
            ? meta?.narration?.text
            : meta?.n1?.text
          const script2 = !isSingle ? meta?.n2?.text : null
          const ytTitle = item.theme.ytTitle || ''
          const ytDesc = item.theme.ytDesc || ''

          return (
            <div key={i} style={{ borderColor: 'var(--mil-border)' }}>
              {/* Header row — click to expand/collapse */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="w-full text-left px-4 py-2.5 flex items-center gap-2 transition"
                style={{ color: 'var(--mil-text)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,65,0.03)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <span className="text-[10px] shrink-0" style={{ color: 'var(--mil-text-dim)' }}>
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <span className="text-[10px] px-1.5 py-0.5 shrink-0" style={{
                  border: '1px solid var(--mil-border)',
                  color: isSingle ? 'var(--mil-amber)' : 'var(--mil-green)',
                }}>
                  {isSingle ? '15s' : '2PT'}
                </span>
                <span className="text-xs truncate flex-1">{item.theme.title}</span>
                <span className="text-[10px] shrink-0" style={{ color: 'var(--mil-text-dim)' }}>
                  {isExpanded ? '▲' : '▼'}
                </span>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-3 space-y-2" style={{ background: 'rgba(0,0,0,0.15)' }}>
                  {/* YouTube Title */}
                  {ytTitle && (
                    <div className="flex items-start gap-2 pt-2">
                      <span className="text-[9px] tracking-wider uppercase shrink-0 mt-0.5" style={{ color: 'var(--mil-amber)' }}>TITLE</span>
                      <p className="text-xs font-bold flex-1" style={{ color: 'var(--mil-text)' }}>{ytTitle}</p>
                      <CopyBtn text={ytTitle} label="COPY" />
                    </div>
                  )}

                  {/* Script 1 */}
                  {script1 && (
                    <div className="flex items-start gap-2">
                      <span className="text-[9px] tracking-wider uppercase shrink-0 mt-0.5" style={{ color: 'var(--mil-green)' }}>
                        {isSingle ? 'SCRIPT' : 'SC.1'}
                      </span>
                      <p className="text-xs flex-1 leading-relaxed" style={{ color: 'var(--mil-text)' }}>{script1}</p>
                      <CopyBtn text={script1} label="COPY" />
                    </div>
                  )}

                  {/* Script 2 (2-part only) */}
                  {script2 && (
                    <div className="flex items-start gap-2">
                      <span className="text-[9px] tracking-wider uppercase shrink-0 mt-0.5" style={{ color: 'var(--mil-amber)' }}>SC.2</span>
                      <p className="text-xs flex-1 leading-relaxed" style={{ color: 'var(--mil-text)' }}>{script2}</p>
                      <CopyBtn text={script2} label="COPY" />
                    </div>
                  )}

                  {/* Description */}
                  {ytDesc && (
                    <div className="flex items-start gap-2">
                      <span className="text-[9px] tracking-wider uppercase shrink-0 mt-0.5" style={{ color: 'var(--mil-text-dim)' }}>DESC</span>
                      <p className="text-[11px] flex-1 leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--mil-text-dim)' }}>{ytDesc}</p>
                      <CopyBtn text={ytDesc} label="COPY" />
                    </div>
                  )}

                  {/* Re-open full output */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelect(item) }}
                      className="px-3 py-1.5 text-[10px] tracking-wider uppercase transition"
                      style={{
                        border: '1px solid var(--mil-green)',
                        color: 'var(--mil-green)',
                        background: 'var(--mil-green-dim)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--mil-green-mid)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--mil-green-dim)'}
                    >
                      ▶ OPEN FULL OUTPUT
                    </button>
                    {/* Copy all at once */}
                    <CopyBtn
                      text={[
                        ytTitle && `【タイトル】\n${ytTitle}`,
                        script1 && `【台本${isSingle ? '' : '1'}】\n${script1}`,
                        script2 && `【台本2】\n${script2}`,
                        ytDesc && `【解説】\n${ytDesc}`,
                      ].filter(Boolean).join('\n\n')}
                      label="ALL"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
