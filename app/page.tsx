'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandscapeScene from '@/components/LandscapeScene'
import ThemeSidebar from '@/components/ThemeSidebar'
import InfoPanel from '@/components/InfoPanel'
import { type Hotspot } from '@/data/hotspots'
import { themes } from '@/data/themes'

export default function Home() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [showIntro, setShowIntro] = useState(true)

  const handleThemeSelect = (themeId: string | null) => {
    setActiveTheme(themeId)
  }

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot((prev) => (prev?.id === hotspot.id ? null : hotspot))
    setShowIntro(false)
  }

  const handleClosePanel = () => {
    setSelectedHotspot(null)
  }

  const activeThemeData = activeTheme ? themes.find((t) => t.id === activeTheme) : null

  return (
    <main className="w-screen h-screen overflow-hidden relative bg-[#0A1628]">
      {/* ── Main landscape ── */}
      <LandscapeScene
        activeTheme={activeTheme}
        selectedHotspot={selectedHotspot}
        onHotspotClick={handleHotspotClick}
      />

      {/* ── Theme sidebar ── */}
      <ThemeSidebar
        activeTheme={activeTheme}
        onThemeSelect={handleThemeSelect}
      />

      {/* ── Info panel ── */}
      <InfoPanel
        hotspot={selectedHotspot}
        onClose={handleClosePanel}
        onThemeSelect={(id) => { handleThemeSelect(id); setShowIntro(false) }}
        activeTheme={activeTheme}
      />

      {/* ── Active theme indicator (top bar) ── */}
      <AnimatePresence>
        {activeThemeData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{ transform: 'translateX(-50%)' }}
          >
            <div
              className="mt-3 px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2.5"
              style={{
                background: `linear-gradient(90deg, ${activeThemeData.gradient[0]}30, ${activeThemeData.gradient[1]}20)`,
                border: `1px solid ${activeThemeData.color}40`,
                backdropFilter: 'blur(12px)',
                color: activeThemeData.color,
              }}
            >
              <span style={{ fontSize: 15 }}>{activeThemeData.icon}</span>
              <span>{activeThemeData.labelNL}</span>
              <span className="text-white/30 text-xs font-normal">—</span>
              <span className="text-white/50 text-xs font-normal max-w-xs truncate">
                {activeThemeData.policyGoal}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Intro overlay ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 z-20 pointer-events-none"
            style={{ transform: 'translateX(-50%)' }}
          >
            <div className="glass rounded-2xl px-8 py-5 text-center max-w-lg mx-auto">
              <h1 className="text-white text-lg font-semibold mb-1.5 tracking-tight">
                Strategisch Waterbeheerprogramma
              </h1>
              <p className="text-white/45 text-xs leading-relaxed mb-3">
                Verken het waterbeheersysteem door op thema&apos;s of objecten te klikken.
                Ontdek verbanden, beleidsdoelen en uitdagingen in het regionale watersysteem.
              </p>
              <div className="flex items-center justify-center gap-6 text-[10px] text-white/30 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                  Selecteer een thema links
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300/60" />
                  Klik op een hotspot in het landschap
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom context bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div
          className="flex items-center justify-between px-6 py-2"
          style={{
            background: 'linear-gradient(0deg, rgba(8,16,30,0.7) 0%, transparent 100%)',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-[9px] font-medium tracking-widest uppercase">
              Waterschap
            </span>
            <span className="text-white/10 text-[9px]">|</span>
            <span className="text-white/15 text-[9px]">
              Watersysteemkaart 2025–2033
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/15 text-[9px]">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400/40" />
              Grondwater
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-blue-400/40" />
              Oppervlaktewater
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-amber-400/40" />
              Klimaatrisico
            </span>
          </div>
        </div>
      </div>

      {/* ── Cross-section depth label ── */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-40">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-16 bg-gradient-to-b from-sky-400/60 to-transparent" />
          <span className="text-[8px] text-sky-300/60 font-medium tracking-wider" style={{ writingMode: 'vertical-rl' }}>
            DOORSNEDE
          </span>
          <div className="w-px h-16 bg-gradient-to-t from-earth-400/60 to-transparent" />
        </div>
      </div>
    </main>
  )
}
