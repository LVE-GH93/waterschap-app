'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { objectiveCategories } from '@/data/objectives'

interface ThemeSidebarProps {
  activeObjective: string | null
  onObjectiveSelect: (id: string | null) => void
}

export default function ThemeSidebar({ activeObjective, onObjectiveSelect }: ThemeSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (catId: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev)
      next.has(catId) ? next.delete(catId) : next.add(catId)
      return next
    })
  }

  const handleObjectiveClick = (id: string) => {
    onObjectiveSelect(activeObjective === id ? null : id)
  }

  return (
    <div className="absolute left-0 top-0 h-full z-20 flex items-center">
      <motion.div
        className="h-full flex flex-col"
        animate={{ width: isExpanded ? 220 : 52 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="h-full glass flex flex-col overflow-hidden" style={{ borderRadius: '0 12px 12px 0' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-3 py-4 border-b border-white/10 flex-shrink-0">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <span className="text-[10px] font-bold tracking-[0.15em] text-blue-300/60 uppercase">
                    Doelstellingen
                  </span>
                  <span className="text-xs text-white/80 font-medium mt-0.5">
                    Waterbeheerprogramma
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white/90"
            >
              <motion.svg
                width="14" height="14" viewBox="0 0 14 14"
                animate={{ rotate: isExpanded ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M 9 2 L 4 7 L 9 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </button>
          </div>

          {/* Categories + objectives */}
          <div className="flex-1 overflow-y-auto py-2 info-panel-scroll">
            {objectiveCategories.map((cat) => {
              const isCatCollapsed = collapsedCategories.has(cat.id)
              const activeInThisCat = cat.objectives.some(o => o.id === activeObjective)

              return (
                <div key={cat.id} className="mb-1">
                  {/* Category header */}
                  <button
                    onClick={() => isExpanded && toggleCategory(cat.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left"
                  >
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full"
                      style={{ background: activeInThisCat ? cat.color : `${cat.color}60` }}
                    />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex-1 flex items-center justify-between min-w-0"
                        >
                          <span
                            className="text-[9px] font-bold tracking-[0.12em] uppercase truncate"
                            style={{ color: activeInThisCat ? cat.color : 'rgba(255,255,255,0.35)' }}
                          >
                            {cat.label}
                          </span>
                          <motion.svg
                            width="10" height="10" viewBox="0 0 10 10"
                            animate={{ rotate: isCatCollapsed ? -90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 ml-1"
                          >
                            <path d="M 2 3 L 5 7 L 8 3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Objectives list */}
                  <AnimatePresence>
                    {(!isCatCollapsed) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {cat.objectives.map((obj) => {
                          const isActive = activeObjective === obj.id
                          return (
                            <motion.button
                              key={obj.id}
                              onClick={() => handleObjectiveClick(obj.id)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all relative"
                              style={{
                                background: isActive
                                  ? `linear-gradient(90deg, ${cat.color}20, ${cat.color}0a)`
                                  : 'transparent',
                                borderRadius: '6px',
                                margin: '1px 4px',
                                width: 'calc(100% - 8px)',
                              }}
                              whileTap={{ scale: 0.97 }}
                            >
                              {/* Active bar */}
                              {isActive && (
                                <motion.div
                                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 rounded-r"
                                  style={{ background: cat.color }}
                                  layoutId="activeBar"
                                />
                              )}

                              {/* Icon */}
                              <div
                                className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs transition-all"
                                style={{
                                  background: isActive
                                    ? `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})`
                                    : 'rgba(255,255,255,0.07)',
                                  boxShadow: isActive ? `0 2px 6px ${cat.color}40` : 'none',
                                }}
                              >
                                <span style={{ fontSize: '11px' }}>{obj.icon}</span>
                              </div>

                              {/* Label */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-[11px] font-medium leading-tight"
                                    style={{ color: isActive ? obj.color : 'rgba(255,255,255,0.65)' }}
                                  >
                                    {obj.label}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Divider */}
                  <div className="mx-3 border-b border-white/5 mt-1" />
                </div>
              )
            })}
          </div>

          {/* Bottom hint */}
          <div className="px-3 py-3 border-t border-white/10 flex-shrink-0">
            <AnimatePresence>
              {isExpanded ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[9px] text-white/25 leading-relaxed"
                >
                  Klik op een doelstelling om relevante gebieden te markeren
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
