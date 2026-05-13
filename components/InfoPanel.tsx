'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { themes } from '@/data/themes'
import { type Hotspot } from '@/data/hotspots'

interface InfoPanelProps {
  hotspot: Hotspot | null
  onClose: () => void
  onThemeSelect: (themeId: string) => void
  activeTheme: string | null
}

export default function InfoPanel({ hotspot, onClose, onThemeSelect, activeTheme }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {hotspot && (
        <motion.div
          key={hotspot.id}
          className="absolute right-0 top-0 h-full z-30 flex items-stretch"
          initial={{ x: 380, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 380, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 35 }}
          style={{ width: 360 }}
        >
          <div className="glass h-full w-full flex flex-col"
            style={{ borderRadius: '12px 0 0 12px' }}>

            {/* Header with close */}
            <div className="flex items-start justify-between p-5 border-b border-white/10 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  {hotspot.themes.slice(0, 3).map((tid) => {
                    const t = themes.find((th) => th.id === tid)
                    return t ? (
                      <span key={tid} style={{ fontSize: 14 }}>{t.icon}</span>
                    ) : null
                  })}
                </div>
                <h2 className="text-white font-semibold text-sm leading-snug">
                  {hotspot.title}
                </h2>
                {hotspot.sublabel && (
                  <p className="text-blue-300/60 text-xs mt-0.5 font-medium">{hotspot.sublabel}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-all flex-shrink-0 -mt-1 -mr-1"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M 3 3 L 13 13 M 13 3 L 3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto info-panel-scroll">
              <div className="p-5 space-y-5">

                {/* Description */}
                <p className="text-white/65 text-xs leading-relaxed">
                  {hotspot.description}
                </p>

                {/* KPIs */}
                {hotspot.kpis && hotspot.kpis.length > 0 && (
                  <div>
                    <SectionLabel label="Indicatoren" />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {hotspot.kpis.map((kpi) => (
                        <div
                          key={kpi.label}
                          className="glass-light rounded-lg p-2.5"
                          style={{
                            borderColor: kpi.good === true
                              ? 'rgba(74,200,120,0.2)'
                              : kpi.good === false
                                ? 'rgba(240,100,80,0.2)'
                                : 'rgba(255,255,255,0.08)',
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white/40 text-[9px] font-semibold uppercase tracking-wide leading-tight">
                              {kpi.label}
                            </span>
                            {kpi.trend && (
                              <span
                                className="text-[10px]"
                                style={{
                                  color:
                                    kpi.trend === 'up'
                                      ? kpi.good ? '#4AC878' : '#F08050'
                                      : kpi.trend === 'down'
                                        ? kpi.good ? '#4AC878' : '#F08050'
                                        : '#8AA8C8',
                                }}
                              >
                                {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-white text-base font-semibold leading-none">
                              {kpi.value}
                            </span>
                            <span className="text-white/35 text-[9px]">{kpi.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Policy Goals */}
                <div>
                  <SectionLabel label="Beleidsdoelen" />
                  <ul className="mt-2 space-y-1.5">
                    {hotspot.policyGoals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-white/60 leading-relaxed">
                        <span className="text-blue-400 mt-0.5 flex-shrink-0 text-[10px]">◆</span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                <div>
                  <SectionLabel label="Uitdagingen" />
                  <ul className="mt-2 space-y-1.5">
                    {hotspot.challenges.map((ch, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-white/55 leading-relaxed">
                        <span className="text-amber-400/70 mt-0.5 flex-shrink-0 text-[10px]">⚠</span>
                        {ch}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Measures */}
                <div>
                  <SectionLabel label="Maatregelen" />
                  <ul className="mt-2 space-y-1.5">
                    {hotspot.measures.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-white/60 leading-relaxed">
                        <span className="text-emerald-400/70 mt-0.5 flex-shrink-0 text-[10px]">✓</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related themes */}
                <div>
                  <SectionLabel label="Gerelateerde thema's" />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {hotspot.themes.map((tid) => {
                      const t = themes.find((th) => th.id === tid)
                      if (!t) return null
                      const isActive = activeTheme === tid
                      return (
                        <button
                          key={tid}
                          onClick={() => onThemeSelect(tid)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-semibold transition-all"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})`
                              : `${t.color}18`,
                            color: isActive ? 'white' : t.color,
                            border: `1px solid ${t.color}${isActive ? 'FF' : '40'}`,
                            boxShadow: isActive ? `0 2px 8px ${t.color}40` : 'none',
                          }}
                        >
                          <span style={{ fontSize: 11 }}>{t.icon}</span>
                          {t.labelNL}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-5 py-3 border-t border-white/10">
              <p className="text-[9px] text-white/20 leading-relaxed">
                Waterschap Waterbeheer — Programma Watersysteem 2025–2033
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30">
      {label}
    </span>
  )
}
