'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { type Hotspot } from '@/data/hotspots'
import { type Objective, type ObjectiveCategory, RELEVANCE_GROUPS, RELEVANCE_LABELS, getAllObjectives } from '@/data/objectives'

interface InfoPanelProps {
  hotspot: Hotspot | null
  objective: Objective | null
  category: ObjectiveCategory | null
  onClose: () => void
  onObjectiveSelect: (id: string) => void
  activeObjective: string | null
}

export default function InfoPanel({ hotspot, objective, category, onClose, onObjectiveSelect, activeObjective }: InfoPanelProps) {
  const isVisible = !!(hotspot || objective)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={hotspot?.id ?? objective?.id}
          className="absolute right-0 top-0 h-full z-30 flex items-stretch"
          initial={{ x: 380, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 380, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 35 }}
          style={{ width: 360 }}
        >
          <div className="glass h-full w-full flex flex-col" style={{ borderRadius: '12px 0 0 12px' }}>

            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-white/10 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-3">
                {hotspot ? (
                  <>
                    <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30 mb-1">
                      Locatie
                    </div>
                    <h2 className="text-white font-semibold text-sm leading-snug">{hotspot.title}</h2>
                    {hotspot.sublabel && (
                      <p className="text-blue-300/60 text-xs mt-0.5 font-medium">{hotspot.sublabel}</p>
                    )}
                  </>
                ) : objective && category ? (
                  <>
                    <div
                      className="text-[10px] font-bold tracking-[0.12em] uppercase mb-1"
                      style={{ color: `${category.color}80` }}
                    >
                      {category.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 16 }}>{objective.icon}</span>
                      <h2 className="text-white font-semibold text-sm leading-snug">{objective.label}</h2>
                    </div>
                  </>
                ) : null}
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
                {hotspot ? (
                  <HotspotContent
                    hotspot={hotspot}
                    activeObjective={activeObjective}
                    onObjectiveSelect={onObjectiveSelect}
                  />
                ) : objective && category ? (
                  <ObjectiveContent objective={objective} category={category} />
                ) : null}
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-5 py-3 border-t border-white/10">
              <p className="text-[9px] text-white/20 leading-relaxed">
                Waterschap — Waterbeheerprogramma WBP6 2025–2033
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Hotspot content ── */
function HotspotContent({ hotspot, activeObjective, onObjectiveSelect }: {
  hotspot: Hotspot
  activeObjective: string | null
  onObjectiveSelect: (id: string) => void
}) {
  const primaryElement = hotspot.id.replace(/-hotspot$/, '')
  const relatedObjectives = getAllObjectives().filter(o =>
    o.highlightedElements.includes(primaryElement) ||
    (hotspot.linkedElements ?? []).some(el => o.highlightedElements.includes(el))
  )

  return (
    <>
      <p className="text-white/65 text-xs leading-relaxed">{hotspot.description}</p>

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
                        color: kpi.trend === 'stable' ? '#8AA8C8'
                          : (kpi.trend === 'up') === kpi.good ? '#4AC878' : '#F08050',
                      }}
                    >
                      {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-white text-base font-semibold leading-none">{kpi.value}</span>
                  <span className="text-white/35 text-[9px]">{kpi.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {relatedObjectives.length > 0 && (
        <div>
          <SectionLabel label="Gerelateerde doelstellingen" />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {relatedObjectives.slice(0, 6).map((obj) => {
              const isActive = activeObjective === obj.id
              return (
                <button
                  key={obj.id}
                  onClick={() => onObjectiveSelect(obj.id)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold transition-all"
                  style={{
                    background: isActive ? `${obj.color}30` : `${obj.color}12`,
                    color: obj.color,
                    border: `1px solid ${obj.color}${isActive ? '60' : '25'}`,
                  }}
                >
                  <span style={{ fontSize: 10 }}>{obj.icon}</span>
                  {obj.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

/* ── Objective content ── */
function ObjectiveContent({ objective, category }: { objective: Objective; category: ObjectiveCategory }) {
  return (
    <>
      <p className="text-white/65 text-xs leading-relaxed">{objective.toelichting}</p>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-2">
        <div className="glass-light rounded-lg p-3">
          <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1">Horizon</div>
          <div className="text-xs font-semibold" style={{ color: category.color }}>{objective.horizon}</div>
        </div>
        <div className="glass-light rounded-lg p-3 col-span-1">
          <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1">Categorie</div>
          <div className="text-[11px] text-white/70 font-medium">{category.label}</div>
        </div>
      </div>

      {/* Bron */}
      <div>
        <SectionLabel label="Wettelijke grondslag / bron" />
        <p className="mt-1.5 text-[10px] text-white/40 leading-relaxed">{objective.bron}</p>
      </div>

      {/* Relevance matrix */}
      {RELEVANCE_GROUPS.map((group) => (
        <div key={group.label}>
          <SectionLabel label={group.label} />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {group.keys.map((key) => {
              const level = objective.relevance[key]
              if (level === 0) return null
              return (
                <div
                  key={key}
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium"
                  style={{
                    background: level === 3
                      ? `${category.color}25`
                      : level === 2
                        ? `${category.color}15`
                        : `${category.color}08`,
                    border: `1px solid ${category.color}${level === 3 ? '50' : level === 2 ? '30' : '18'}`,
                    color: level === 3
                      ? category.color
                      : level === 2
                        ? `${category.color}cc`
                        : `${category.color}80`,
                  }}
                >
                  <span>{level === 3 ? '●●●' : level === 2 ? '●●' : '●'}</span>
                  <span>{RELEVANCE_LABELS[key]}</span>
                </div>
              )
            })}
          </div>
          {group.keys.every(k => objective.relevance[k] === 0) && (
            <p className="text-[10px] text-white/20 mt-1.5 italic">Niet of nauwelijks relevant</p>
          )}
        </div>
      ))}
    </>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30">{label}</span>
  )
}
