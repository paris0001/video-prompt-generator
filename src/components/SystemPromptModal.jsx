import { useState } from 'react'
import { generateSystemPrompt } from '../data/promptTemplates'

export default function SystemPromptModal({ onClose }) {
  const [copied, setCopied] = useState(false)
  const systemPrompt = generateSystemPrompt()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(systemPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="tactical-panel w-full max-w-2xl max-h-[80vh] flex flex-col m-4"
        style={{ border: '1px solid var(--mil-green)', background: 'var(--mil-panel)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--mil-border)', background: 'rgba(0, 255, 65, 0.03)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--mil-green)', boxShadow: '0 0 6px var(--mil-green)' }} />
            <span className="text-[10px] tracking-widest uppercase glow-green">SYSTEM PROMPT — CLASSIFIED</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-[10px] tracking-wider uppercase font-medium transition"
              style={{
                background: copied ? 'var(--mil-green-mid)' : 'var(--mil-green-dim)',
                border: '1px solid var(--mil-green)',
                color: 'var(--mil-green)',
              }}
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 text-[10px] tracking-wider uppercase"
              style={{
                background: 'transparent',
                border: '1px solid var(--mil-border)',
                color: 'var(--mil-text-dim)',
              }}
            >
              CLOSE
            </button>
          </div>
        </div>

        {/* Content */}
        <pre
          className="p-4 text-[11px] leading-relaxed whitespace-pre-wrap overflow-y-auto flex-1"
          style={{ color: 'var(--mil-text)', fontFamily: 'inherit' }}
        >
          {systemPrompt}
        </pre>
      </div>
    </div>
  )
}
