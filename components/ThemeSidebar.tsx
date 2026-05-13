'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { themes } from '@/data/themes'

interface ThemeSidebarProps {
  activeTheme: string | null
  onThemeSelect: (themeId: string | null) => void
}

export default function ThemeSidebar({ activeTheme, onThemeSelect }: ThemeSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)

  const handleThemeClick = (themeId: string) => {
    onThemeSelect(activeTheme === themeId ? null : themeId)
  }

  const activeThemeData = themes.find((t) => t.id === activeTheme)

  return (
    <div className="absolute left-0 top-0 h-full z-20 flex items-center">
      <motion.div
        className="h-full flex flex-col"
        animate={{ width: isExpanded ? 200 : 56 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Sidebar panel */}
        <div className="h-full glass flex flex-col overflow-hidden"
          style={{ borderRadius: '0 12px 12px 0' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
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
                    Thema&apos;s
                  </span>
                  <span className="text-xs text-white/80 font-medium mt-0.5">
                    Waterbeheer
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

          {/* Theme buttons */}
          <div className="flex-1 overflow-y-auto py-2 space-y-0.5 info-panel-scroll">
            {themes.map((theme) => {
              const isActive = activeTheme === theme.id
              const isHovered = hoveredTheme === theme.id

              return (
                <motion.button
                  key={theme.id}
                  onClick={() => handleThemeClick(theme.id)}
                  onMouseEnter={() => setHoveredTheme(theme.id)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all relative overflow-hidden"
                  style={{
                    background: isActive
                      ? `linear-gradient(90deg, ${theme.gradient[0]}25, ${theme.gradient[1]}15)`
                      : isHovered
                        ? 'rgba(255,255,255,0.06)'
                        : 'transparent',
                    borderRadius: '6px',
                    margin: '1px 4px',
                    width: 'calc(100% - 8px)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5/6 rounded-r"
                      style={{ background: theme.color }}
                      layoutId="activeBar"
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]})`
                        : 'rgba(255,255,255,0.08)',
                      boxShadow: isActive ? `0 2px 8px ${theme.color}40` : 'none',
                    }}
                  >
                    <span style={{ fontSize: '13px' }}>{theme.icon}</span>
                  </div>

                  {/* Label */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col min-w-0"
                      >
                        <span
                          className="text-xs font-semibold truncate leading-tight"
                          style={{ color: isActive ? theme.color : 'rgba(255,255,255,0.75)' }}
                        >
                          {theme.labelNL}
                        </span>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[9px] text-white/40 truncate mt-0.5"
                          >
                            {theme.highlightedElements.length} elementen
                          </motion.span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>

          {/* Active theme description */}
          <AnimatePresence>
            {isExpanded && activeThemeData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="p-3 border-t border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${activeThemeData.gradient[0]}15, ${activeThemeData.gradient[1]}08)`,
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: activeThemeData.color }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: activeThemeData.color }}>
                    Actief
                  </span>
                </div>
                <p className="text-[10px] text-white/55 leading-relaxed line-clamp-4">
                  {activeThemeData.policyGoal}
                </p>
                <button
                  onClick={() => onThemeSelect(null)}
                  className="mt-2 text-[9px] text-white/30 hover:text-white/60 transition-colors"
                >
                  × Thema wissen
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom: Reset and info */}
          <div className="px-3 py-3 border-t border-white/10">
            <AnimatePresence>
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-[9px] text-white/25 leading-relaxed">
                    Klik op een thema om gerelateerde elementen te markeren
                  </p>
                </motion.div>
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
