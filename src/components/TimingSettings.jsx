export default function TimingSettings({ settings, onChange }) {
  const {
    videoDuration = 20,
    charMin = 60,
    charMax = 80,
    silentEnding = 1,
    speechSpeed = 6,
  } = settings

  const avgChars = (charMin + charMax) / 2
  const narrationTime = Math.round((avgChars / speechSpeed) * 10) / 10
  const availableTime = videoDuration - silentEnding
  const isOvertime = narrationTime > availableTime
  const margin = Math.round((availableTime - narrationTime) * 10) / 10
  // Min/max range speech time
  const minSpeechTime = Math.round((charMin / speechSpeed) * 10) / 10
  const maxSpeechTime = Math.round((charMax / speechSpeed) * 10) / 10

  const update = (patch) => onChange({ ...settings, ...patch })

  const ButtonGroup = ({ label, options, value, onChange: onBtnChange }) => (
    <div>
      <div className="text-[10px] tracking-wider uppercase mb-1.5" style={{ color: 'var(--mil-text-dim)' }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-1">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onBtnChange(opt.value)}
            className="px-2.5 py-1.5 text-[10px] tracking-wider transition"
            style={{
              background: value === opt.value ? 'var(--mil-green-dim)' : 'transparent',
              border: `1px solid ${value === opt.value ? 'var(--mil-green)' : 'var(--mil-border)'}`,
              color: value === opt.value ? 'var(--mil-green)' : 'var(--mil-text-dim)',
              textShadow: value === opt.value ? '0 0 6px rgba(0,255,65,0.3)' : 'none',
            }}
            onMouseEnter={e => {
              if (value !== opt.value) {
                e.currentTarget.style.borderColor = 'var(--mil-green)'
                e.currentTarget.style.color = 'var(--mil-text)'
              }
            }}
            onMouseLeave={e => {
              if (value !== opt.value) {
                e.currentTarget.style.borderColor = 'var(--mil-border)'
                e.currentTarget.style.color = 'var(--mil-text-dim)'
              }
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )

  const charPreset = charMin === 40 ? 'compact' : charMin === 80 ? 'detailed' : 'standard'

  return (
    <section className="tactical-panel p-4" style={{ border: '1px solid var(--mil-border)', background: 'var(--mil-panel)' }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] tracking-widest uppercase glow-green">TIMING CONFIG</span>
        <div className="flex-1 h-px" style={{ background: 'var(--mil-border)' }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ButtonGroup
          label="DURATION / PART"
          value={videoDuration}
          onChange={v => update({ videoDuration: v })}
          options={[
            { label: '10s', value: 10 },
            { label: '12s', value: 12 },
            { label: '15s', value: 15 },
            { label: '20s', value: 20 },
            { label: '25s', value: 25 },
            { label: '30s', value: 30 },
          ]}
        />

        <ButtonGroup
          label="SILENT ENDING"
          value={silentEnding}
          onChange={v => update({ silentEnding: v })}
          options={[
            { label: '1s', value: 1 },
            { label: '2s', value: 2 },
            { label: '3s', value: 3 },
          ]}
        />

        <ButtonGroup
          label={`CHARS / NARRATION (${charMin}-${charMax})`}
          value={charPreset}
          onChange={v => {
            const presets = {
              compact: { charMin: 40, charMax: 60 },
              standard: { charMin: 60, charMax: 80 },
              detailed: { charMin: 80, charMax: 100 },
            }
            update(presets[v])
          }}
          options={[
            { label: 'COMPACT 40-60', value: 'compact' },
            { label: 'STANDARD 60-80', value: 'standard' },
            { label: 'DETAILED 80-100', value: 'detailed' },
          ]}
        />

        <ButtonGroup
          label="SPEECH SPEED"
          value={speechSpeed}
          onChange={v => update({ speechSpeed: v })}
          options={[
            { label: 'SLOW 5字/s', value: 5 },
            { label: 'NORMAL 6字/s', value: 6 },
            { label: 'FAST 7字/s', value: 7 },
          ]}
        />
      </div>

      {/* Timing calculation */}
      <div className="mt-4 pt-3 space-y-1.5" style={{ borderTop: '1px solid var(--mil-border)' }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--mil-text-dim)' }}>
            TIMELINE ANALYSIS
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] tracking-wider">
          <span style={{ color: 'var(--mil-text)' }}>
            NARRATION: {minSpeechTime}-{maxSpeechTime}s (avg ~{narrationTime}s)
          </span>
          <span style={{ color: 'var(--mil-text)' }}>
            ACTIVE: {availableTime}s
          </span>
          <span style={{ color: 'var(--mil-text)' }}>
            SILENT: {silentEnding}s
          </span>
          <span style={{ color: isOvertime ? 'var(--mil-red)' : margin < 2 ? 'var(--mil-amber)' : 'var(--mil-green)' }}>
            MARGIN: {margin >= 0 ? '+' : ''}{margin}s {isOvertime ? '⚠ OVERTIME' : margin < 2 ? '△ TIGHT' : '● OK'}
          </span>
        </div>
        {maxSpeechTime > availableTime && (
          <div className="text-[10px] tracking-wider mt-1" style={{ color: 'var(--mil-red)' }}>
            ⚠ {charMax}字 @ {speechSpeed}字/s = {maxSpeechTime}s → {availableTime}sに収まりません。文字数を減らすか速度を上げてください。
          </div>
        )}

        {/* Visual timeline bar */}
        <div className="relative h-3 mt-2" style={{ background: 'var(--mil-green-dim)', border: '1px solid var(--mil-border)' }}>
          {/* Narration portion */}
          <div
            className="absolute top-0 left-0 h-full transition-all"
            style={{
              width: `${Math.min((narrationTime / videoDuration) * 100, 100)}%`,
              background: isOvertime ? 'rgba(255,32,32,0.3)' : 'rgba(0,255,65,0.2)',
              borderRight: `1px solid ${isOvertime ? 'var(--mil-red)' : 'var(--mil-green)'}`,
            }}
          />
          {/* Silent ending */}
          <div
            className="absolute top-0 right-0 h-full"
            style={{
              width: `${(silentEnding / videoDuration) * 100}%`,
              background: 'rgba(255,176,0,0.15)',
              borderLeft: '1px dashed var(--mil-amber)',
            }}
          />
          {/* Labels */}
          <span className="absolute left-1 top-0 text-[8px] leading-3" style={{ color: 'var(--mil-green)' }}>NAR</span>
          <span className="absolute right-1 top-0 text-[8px] leading-3" style={{ color: 'var(--mil-amber)' }}>SIL</span>
        </div>
      </div>
    </section>
  )
}
