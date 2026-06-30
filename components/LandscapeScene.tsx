'use client'

import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllObjectives } from '@/data/objectives'
import { hotspots, type Hotspot } from '@/data/hotspots'

interface LandscapeSceneProps {
  activeTheme: string | null
  selectedHotspot: Hotspot | null
  onHotspotClick: (hotspot: Hotspot) => void
}

const ALL_ELEMENTS = [
  'sandy-ridge', 'nature-zone', 'agricultural-west', 'agricultural-east',
  'brook-valley', 'brook-stream', 'retention-basin', 'urban-area', 'rwzi',
  'effluent-pipe', 'polder', 'dike', 'sea-zone', 'groundwater-zone',
  'groundwater-table', 'soil-topsoil', 'soil-sand', 'soil-clay',
  'soil-saturated', 'soil-aquifer', 'soil-peat',
  'extraction-well-inland', 'extraction-well-urban', 'infiltration-zone',
  'seepage-zone', 'energy-recovery', 'nutrient-recovery', 'pumping-station',
  'storm-drain',
]

export default function LandscapeScene({
  activeTheme,
  selectedHotspot,
  onHotspotClick,
}: LandscapeSceneProps) {
  const objective = activeTheme ? getAllObjectives().find(o => o.id === activeTheme) : null
  const highlighted = objective?.highlightedElements ?? []

  const getElementClass = useCallback(
    (id: string) => {
      if (!activeTheme) return 'neutral'
      return highlighted.includes(id) ? 'highlighted' : 'dimmed'
    },
    [activeTheme, highlighted]
  )

  const elementStyle = useCallback(
    (id: string): React.CSSProperties => {
      if (!activeTheme) return {}
      if (highlighted.includes(id)) {
        return { opacity: 1, transition: 'opacity 0.5s ease, filter 0.5s ease' }
      }
      return { opacity: 0.18, filter: 'saturate(0.3) brightness(0.7)', transition: 'opacity 0.5s ease, filter 0.5s ease' }
    },
    [activeTheme, highlighted]
  )

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A1628]">
      <svg
        viewBox="0 0 1600 870"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky gradient — dawn to blue */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E1F3D" />
            <stop offset="30%" stopColor="#1A3A6B" />
            <stop offset="60%" stopColor="#2E6A9E" />
            <stop offset="82%" stopColor="#6AACCF" />
            <stop offset="92%" stopColor="#B8D8EA" />
            <stop offset="100%" stopColor="#D4ECEF" />
          </linearGradient>

          {/* Horizon haze */}
          <linearGradient id="hazeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8E8F0" stopOpacity="0" />
            <stop offset="100%" stopColor="#C8E8F0" stopOpacity="0.55" />
          </linearGradient>

          {/* Sun radial glow */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="1" />
            <stop offset="35%" stopColor="#FFB74D" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF8F00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
          </radialGradient>

          {/* Sun core */}
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="60%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFB74D" />
          </radialGradient>

          {/* Underground topsoil */}
          <linearGradient id="topsoilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A2010" />
            <stop offset="100%" stopColor="#4A2E18" />
          </linearGradient>

          {/* Underground sand */}
          <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4A86A" />
            <stop offset="100%" stopColor="#D8BC88" />
          </linearGradient>

          {/* Underground clay */}
          <linearGradient id="clayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6A7888" />
            <stop offset="100%" stopColor="#7A8898" />
          </linearGradient>

          {/* Aquifer */}
          <linearGradient id="aquiferGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A4878" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0E3258" stopOpacity="0.95" />
          </linearGradient>

          {/* Deep base */}
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A2030" />
            <stop offset="100%" stopColor="#0A1020" />
          </linearGradient>

          {/* Sandy ridge */}
          <linearGradient id="ridgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8A86A" />
            <stop offset="40%" stopColor="#B09050" />
            <stop offset="100%" stopColor="#8A7040" />
          </linearGradient>

          {/* Agriculture gradient */}
          <linearGradient id="agriGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6CA830" />
            <stop offset="100%" stopColor="#5A9020" />
          </linearGradient>

          <linearGradient id="agriGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8B840" />
            <stop offset="100%" stopColor="#B0A030" />
          </linearGradient>

          {/* Brook valley */}
          <linearGradient id="brookGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A8830" />
            <stop offset="100%" stopColor="#387020" />
          </linearGradient>

          {/* Urban */}
          <linearGradient id="urbanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7888A0" />
            <stop offset="100%" stopColor="#607080" />
          </linearGradient>

          {/* Polder */}
          <linearGradient id="polderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78A848" />
            <stop offset="100%" stopColor="#609038" />
          </linearGradient>

          {/* Dike */}
          <linearGradient id="dikeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7AAA50" />
            <stop offset="100%" stopColor="#628838" />
          </linearGradient>

          {/* Sea */}
          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A4870" />
            <stop offset="40%" stopColor="#0E3058" />
            <stop offset="100%" stopColor="#081828" />
          </linearGradient>

          {/* Water stream */}
          <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A90D8" />
            <stop offset="100%" stopColor="#2A70B8" />
          </linearGradient>

          {/* Retention basin water */}
          <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5294C8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2A68A8" stopOpacity="1" />
          </linearGradient>

          {/* Nature zone */}
          <linearGradient id="natureGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#387828" />
            <stop offset="100%" stopColor="#285818" />
          </linearGradient>

          {/* Glow filter for highlights */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft glow */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sun bloom filter */}
          <filter id="sunBloom" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ground water table pattern */}
          <pattern id="gwPattern" x="0" y="0" width="40" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0 4 Q 10 1, 20 4 Q 30 7, 40 4" stroke="#4A90D8" strokeWidth="1.5" fill="none" />
          </pattern>

          {/* Agricultural field stripe pattern */}
          <pattern id="agriStripe1" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="9" height="18" fill="#6CA830" />
            <rect x="9" width="9" height="18" fill="#8ACC40" />
          </pattern>

          <pattern id="agriStripe2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="8" height="16" fill="#C8B840" />
            <rect x="8" width="8" height="16" fill="#D8C850" />
          </pattern>

          {/* Heathland dot pattern */}
          <pattern id="heathPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#8A6A3A" />
            <circle cx="3" cy="3" r="1.5" fill="#9A7A4A" />
            <circle cx="9" cy="9" r="1.5" fill="#9A7A4A" />
            <circle cx="9" cy="3" r="1" fill="#7A5A2A" />
          </pattern>

          {/* Polder ditch pattern */}
          <pattern id="polderDitches" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#78A848" />
            <rect y="18" width="40" height="4" fill="#3A7AB8" opacity="0.6" />
          </pattern>

          {/* Clip paths for underground zones */}
          <clipPath id="undergroundClip">
            <rect x="0" y="480" width="1600" height="390" />
          </clipPath>

          <clipPath id="aboveGroundClip">
            <path d="M 0 0 L 1600 0 L 1600 488 C 1480 488, 1420 480, 1400 476 L 1392 468 C 1374 438, 1358 384, 1346 362 C 1336 344, 1326 338, 1318 344 C 1310 350, 1300 366, 1288 388 C 1272 414, 1254 434, 1238 446 C 1208 460, 1170 466, 1130 468 C 1090 470, 1050 466, 1010 456 C 970 446, 930 436, 900 430 C 872 424, 840 420, 800 418 C 760 416, 720 416, 690 422 C 660 428, 630 440, 602 450 C 574 460, 548 468, 522 470 C 496 472, 468 468, 446 458 C 424 448, 400 434, 372 418 C 344 402, 316 386, 290 376 C 266 366, 242 358, 222 352 C 200 346, 178 344, 156 348 C 132 352, 104 368, 74 386 C 48 400, 24 414, 0 424 L 0 0 Z" />
          </clipPath>
        </defs>

        {/* ── SKY ── */}
        <rect width="1600" height="870" fill="url(#skyGrad)" />

        {/* Atmospheric bands */}
        <rect x="0" y="380" width="1600" height="120" fill="url(#hazeGrad)" opacity="0.6" />

        {/* Stars (distant, faint) */}
        {[...Array(30)].map((_, i) => (
          <circle
            key={i}
            cx={20 + ((i * 173) % 1560)}
            cy={10 + ((i * 89) % 200)}
            r={0.8 + (i % 3) * 0.4}
            fill="white"
            opacity={0.2 + (i % 5) * 0.08}
          />
        ))}

        {/* ── SUN on horizon ── */}
        <g id="sun" style={{ transform: 'translateX(0)' }}>
          {/* Bloom */}
          <ellipse cx="1440" cy="462" rx="160" ry="80" fill="url(#sunGlow)" opacity="0.4" filter="url(#sunBloom)" />
          {/* Horizon glow */}
          <ellipse cx="1440" cy="468" rx="280" ry="40" fill="#FF8F00" opacity="0.18" />
          {/* Sun body */}
          <circle cx="1440" cy="450" r="58" fill="url(#sunGlow)" opacity="0.7" />
          <circle cx="1440" cy="450" r="34" fill="url(#sunCore)" />
          {/* Rays */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8
            const x1 = 1440 + Math.cos(angle) * 40
            const y1 = 450 + Math.sin(angle) * 40
            const x2 = 1440 + Math.cos(angle) * 80
            const y2 = 450 + Math.sin(angle) * 80
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#FFD54F"
                strokeWidth="2"
                opacity="0.4"
              />
            )
          })}
        </g>

        {/* ── CLOUDS ── */}
        <g id="clouds" opacity="0.85">
          {/* Cloud 1 */}
          <g transform="translate(120, 100)">
            <ellipse cx="0" cy="0" rx="80" ry="28" fill="white" opacity="0.55" />
            <ellipse cx="50" cy="-10" rx="50" ry="22" fill="white" opacity="0.5" />
            <ellipse cx="-40" cy="-5" rx="45" ry="18" fill="white" opacity="0.45" />
          </g>
          {/* Cloud 2 */}
          <g transform="translate(480, 70)">
            <ellipse cx="0" cy="0" rx="100" ry="30" fill="white" opacity="0.45" />
            <ellipse cx="60" cy="-12" rx="60" ry="24" fill="white" opacity="0.4" />
            <ellipse cx="-50" cy="-6" rx="55" ry="20" fill="white" opacity="0.38" />
          </g>
          {/* Cloud 3 */}
          <g transform="translate(840, 130)">
            <ellipse cx="0" cy="0" rx="90" ry="25" fill="white" opacity="0.35" />
            <ellipse cx="55" cy="-10" rx="55" ry="20" fill="white" opacity="0.3" />
          </g>
          {/* Cloud 4 — lighter, farther */}
          <g transform="translate(1180, 88)">
            <ellipse cx="0" cy="0" rx="120" ry="28" fill="white" opacity="0.28" />
            <ellipse cx="70" cy="-12" rx="70" ry="22" fill="white" opacity="0.22" />
            <ellipse cx="-60" cy="-6" rx="60" ry="18" fill="white" opacity="0.2" />
          </g>
        </g>

        {/* ── DISTANT LANDSCAPE SILHOUETTE (background) ── */}
        <path
          d="M 0 380 C 100 370, 200 362, 300 368 C 400 374, 500 380, 600 376 C 700 372, 800 366, 900 370 C 1000 374, 1100 372, 1200 368 C 1280 365, 1340 370, 1400 374 C 1450 378, 1520 380, 1600 380 L 1600 870 L 0 870 Z"
          fill="#1A3020"
          opacity="0.4"
        />

        {/* ── UNDERGROUND LAYERS (below terrain surface ≈ y480) ── */}
        <g id="underground">
          {/* Topsoil band */}
          <g id="soil-topsoil" style={elementStyle('soil-topsoil')} className="landscape-element">
            <rect x="0" y="480" width="1600" height="40" fill="url(#topsoilGrad)" opacity="0.95" />
            <text x="16" y="505" fontSize="10" fill="#8A6A4A" fontWeight="600" letterSpacing="1" opacity="0.7">BODEM</text>
          </g>

          {/* Sandy zone */}
          <g id="soil-sand" style={elementStyle('soil-sand')} className="landscape-element">
            <rect x="0" y="520" width="1600" height="80" fill="url(#sandGrad)" opacity="0.9" />
            {/* Sand texture dots */}
            {[...Array(40)].map((_, i) => (
              <circle
                key={i}
                cx={20 + ((i * 37) % 1560)}
                cy={540 + ((i * 13) % 40)}
                r={1.5}
                fill="#A8904A"
                opacity="0.4"
              />
            ))}
          </g>

          {/* Peat lens (left side) */}
          <g id="soil-peat" style={elementStyle('soil-peat')} className="landscape-element">
            <ellipse cx="500" cy="570" rx="200" ry="25" fill="#3A2010" opacity="0.7" />
            <text x="400" y="574" fontSize="9" fill="#8A6A4A" fontWeight="600" opacity="0.6">VEEN</text>
          </g>

          {/* Groundwater table */}
          <g id="groundwater-table" style={elementStyle('groundwater-table')} className="landscape-element">
            {/* Animated groundwater line */}
            <motion.path
              d="M 0 558 Q 160 550 320 558 Q 480 566 640 558 Q 800 550 960 558 Q 1120 566 1280 558 Q 1440 550 1600 558"
              stroke="#4A90D8"
              strokeWidth="2.5"
              fill="none"
              opacity="0.9"
              animate={{
                d: [
                  "M 0 558 Q 160 550 320 558 Q 480 566 640 558 Q 800 550 960 558 Q 1120 566 1280 558 Q 1440 550 1600 558",
                  "M 0 562 Q 160 554 320 562 Q 480 570 640 562 Q 800 554 960 562 Q 1120 570 1280 562 Q 1440 554 1600 562",
                  "M 0 558 Q 160 550 320 558 Q 480 566 640 558 Q 800 550 960 558 Q 1120 566 1280 558 Q 1440 550 1600 558",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <text x="16" y="554" fontSize="9" fill="#4A90D8" fontWeight="700" letterSpacing="0.5" opacity="0.9">
              GRONDWATERSPIEGEL
            </text>
          </g>

          {/* Saturated zone */}
          <g id="soil-saturated" style={elementStyle('soil-saturated')} className="landscape-element">
            <rect x="0" y="560" width="1600" height="60" fill="#2A5880" opacity="0.25" />
          </g>

          {/* Clay confining layer */}
          <g id="soil-clay" style={elementStyle('soil-clay')} className="landscape-element">
            <rect x="0" y="620" width="1600" height="45" fill="url(#clayGrad)" opacity="0.85" />
            {/* Clay texture */}
            {[...Array(20)].map((_, i) => (
              <line
                key={i}
                x1={i * 80} y1="620"
                x2={i * 80 + 60} y2="665"
                stroke="#5A6878"
                strokeWidth="0.8"
                opacity="0.4"
              />
            ))}
            <text x="16" y="647" fontSize="9" fill="#9AAAB8" fontWeight="600" letterSpacing="1" opacity="0.6">KLEILAAG</text>
          </g>

          {/* Deep aquifer */}
          <g id="soil-aquifer" style={elementStyle('soil-aquifer')} className="landscape-element">
            <rect x="0" y="665" width="1600" height="80" fill="url(#aquiferGrad)" />
            {/* Flow arrows in aquifer */}
            {[...Array(8)].map((_, i) => (
              <g key={i} transform={`translate(${100 + i * 190}, 705)`}>
                <path d="M -20 0 L 10 0 M 5 -5 L 14 0 L 5 5" stroke="#4A90D8" strokeWidth="1.5" fill="none" opacity="0.6" />
              </g>
            ))}
            <text x="16" y="710" fontSize="9" fill="#4A90D8" fontWeight="700" letterSpacing="1" opacity="0.8">WATERVOEREND PAKKET</text>
          </g>

          {/* Impermeable base */}
          <rect x="0" y="745" width="1600" height="125" fill="url(#baseGrad)" />
          <text x="16" y="768" fontSize="9" fill="#4A5870" fontWeight="600" letterSpacing="1" opacity="0.5">ONDOORLATENDE BASIS</text>

          {/* Underground zone labels */}
          <g id="groundwater-zone" style={elementStyle('groundwater-zone')} className="landscape-element">
            <rect x="1520" y="480" width="80" height="280" fill="none" />
            <text x="1588" y="620" fontSize="9" fill="#7AB8D8" fontWeight="600" letterSpacing="2" opacity="0.6"
              transform="rotate(-90, 1588, 620)" textAnchor="middle">GRONDWATERSYSTEEM</text>
          </g>

          {/* Infiltration zone indicator */}
          <g id="infiltration-zone" style={elementStyle('infiltration-zone')} className="landscape-element">
            {/* Downward arrows on left side (infiltration) */}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${80 + i * 60}, 500)`}>
                <path d="M 0 0 L 0 35 M -5 28 L 0 38 L 5 28" stroke="#4A90D8" strokeWidth="1.5" fill="none" opacity="0.5"
                  className="flow-path" />
              </g>
            ))}
          </g>

          {/* Seepage zone indicator */}
          <g id="seepage-zone" style={elementStyle('seepage-zone')} className="landscape-element">
            {/* Upward arrows on right side of ridge/valley transition (seepage = kwel) */}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${480 + i * 60}, 500)`}>
                <path d="M 0 38 L 0 3 M -5 10 L 0 0 L 5 10" stroke="#60A8E0" strokeWidth="1.5" fill="none" opacity="0.5"
                  className="flow-path" />
              </g>
            ))}
            <text x="470" y="552" fontSize="8" fill="#60A8E0" opacity="0.6" fontWeight="600">KWEL</text>
          </g>

          {/* Extraction wells underground part */}
          <g id="extraction-well-inland" style={elementStyle('extraction-well-inland')} className="landscape-element">
            {/* Deep well pipe */}
            <rect x="133" y="480" width="6" height="250" fill="#B0C0D0" opacity="0.8" rx="3" />
            <rect x="133" y="700" width="6" height="30" fill="#4A90D8" opacity="0.9" rx="3" />
          </g>

          <g id="extraction-well-urban" style={elementStyle('extraction-well-urban')} className="landscape-element">
            <rect x="813" y="480" width="6" height="250" fill="#B0C0D0" opacity="0.7" rx="3" />
            <rect x="813" y="700" width="6" height="30" fill="#4A90D8" opacity="0.8" rx="3" />
          </g>
        </g>

        {/* ── MAIN TERRAIN ZONES ── */}

        {/* Zone A: Sandy Ridge */}
        <g id="sandy-ridge" style={elementStyle('sandy-ridge')} className="landscape-element">
          {/* Base terrain fill */}
          <path
            d="M 0 480 L 0 424 C 24 416, 48 404, 74 392 C 100 380, 128 366, 156 352 C 176 344, 198 342, 220 348 C 240 354, 260 366, 280 380 L 280 480 Z"
            fill="url(#ridgeGrad)"
          />
          {/* Sandy surface texture */}
          <path
            d="M 0 480 L 0 424 C 24 416, 48 404, 74 392 C 100 380, 128 366, 156 352 C 176 344, 198 342, 220 348 C 240 354, 260 366, 280 380 L 280 480 Z"
            fill="url(#heathPattern)"
            opacity="0.4"
          />
        </g>

        {/* Zone A2: Nature zone (flank of sandy ridge) */}
        <g id="nature-zone" style={elementStyle('nature-zone')} className="landscape-element">
          <path
            d="M 0 480 L 0 424 C 24 416, 48 404, 74 392 C 100 380, 128 366, 156 352 C 176 344, 198 342, 220 348 C 240 354, 260 366, 280 380 C 290 387, 300 394, 310 400 L 310 480 Z"
            fill="url(#natureGrad)"
            opacity="0.7"
          />
        </g>

        {/* Zone B: Agricultural West + Brook Valley area */}
        <g id="agricultural-west" style={elementStyle('agricultural-west')} className="landscape-element">
          <path
            d="M 280 480 L 280 386 C 300 396, 320 410, 345 424 C 365 436, 390 448, 420 458 L 420 480 Z"
            fill="url(#agriStripe1)"
            opacity="0.9"
          />
        </g>

        {/* Brook Valley */}
        <g id="brook-valley" style={elementStyle('brook-valley')} className="landscape-element">
          <path
            d="M 380 480 L 380 452 C 400 460, 420 468, 450 474 C 470 478, 500 476, 530 470 C 550 466, 568 460, 580 456 L 580 480 Z"
            fill="url(#brookGrad)"
          />
          {/* Richer vegetation strip in valley */}
          <path
            d="M 400 476 C 420 468, 450 468, 480 470 C 510 472, 540 468, 565 462"
            stroke="#2A6818"
            strokeWidth="8"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* Zone B East: Agricultural */}
        <g id="agricultural-east" style={elementStyle('agricultural-east')} className="landscape-element">
          <path
            d="M 560 480 L 560 456 C 580 450, 600 444, 635 434 C 660 426, 690 420, 730 416 C 760 412, 790 414, 800 416 L 800 480 Z"
            fill="url(#agriStripe2)"
            opacity="0.9"
          />
        </g>

        {/* Retention basin */}
        <g id="retention-basin" style={elementStyle('retention-basin')} className="landscape-element">
          <path
            d="M 600 480 L 600 448 C 620 440, 648 436, 678 442 C 698 446, 715 452, 730 456 L 730 480 Z"
            fill="url(#retentionGrad)"
            opacity="0.9"
          />
          {/* Water surface shimmer */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M ${608 + i * 30} ${462 + i * 4} C ${618 + i * 30} ${459 + i * 4}, ${628 + i * 30} ${462 + i * 4}, ${638 + i * 30} ${459 + i * 4}`}
              stroke="white"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          ))}
        </g>

        {/* Zone C: Urban Area */}
        <g id="urban-area" style={elementStyle('urban-area')} className="landscape-element">
          <path
            d="M 770 480 L 770 418 C 800 416, 830 418, 860 422 C 890 426, 920 432, 950 438 C 970 442, 990 446, 1010 450 L 1010 480 Z"
            fill="url(#urbanGrad)"
          />
          {/* Road lines */}
          <line x1="770" y1="460" x2="1010" y2="460" stroke="#4A5460" strokeWidth="2.5" opacity="0.6" />
          <line x1="890" y1="418" x2="890" y2="480" stroke="#4A5460" strokeWidth="1.5" opacity="0.5" />
        </g>

        {/* Zone D: Polder */}
        <g id="polder" style={elementStyle('polder')} className="landscape-element">
          <path
            d="M 1010 480 L 1010 450 C 1040 456, 1075 462, 1115 466 C 1150 470, 1188 468, 1220 460 C 1234 456, 1244 452, 1256 446 L 1256 480 Z"
            fill="url(#polderDitches)"
            opacity="0.9"
          />
        </g>

        {/* Zone E: Dike */}
        <g id="dike" style={elementStyle('dike')} className="landscape-element">
          <path
            d="M 1230 480 L 1230 450 C 1248 440, 1264 422, 1282 402 C 1294 386, 1306 366, 1316 348 C 1326 336, 1334 340, 1344 358 C 1354 378, 1366 424, 1382 460 C 1390 470, 1398 477, 1408 480 Z"
            fill="url(#dikeGrad)"
          />
          {/* Dike crest detail */}
          <path
            d="M 1280 407 C 1294 388, 1306 366, 1316 350 C 1326 338, 1334 342, 1344 360 C 1352 376, 1362 418, 1375 455"
            stroke="#5A8A3A"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
          {/* Riprap stones on sea side */}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={1344 + i * 12}
              cy={358 + i * 24}
              rx="10"
              ry="6"
              fill="#7A8878"
              opacity="0.7"
            />
          ))}
        </g>

        {/* ── SEA ZONE ── */}
        <g id="sea-zone" style={elementStyle('sea-zone')} className="landscape-element">
          {/* Sea body */}
          <path
            d="M 1395 480 L 1408 480 C 1430 480, 1480 484, 1600 488 L 1600 870 L 1395 870 Z"
            fill="url(#seaGrad)"
          />
          {/* Wave lines */}
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M ${1400 + i * 10} ${490 + i * 20} C ${1450 + i * 10} ${486 + i * 20}, ${1520 + i * 5} ${492 + i * 20}, ${1600} ${488 + i * 20}`}
              stroke="white"
              strokeWidth="1"
              fill="none"
              opacity={0.15 - i * 0.02}
              animate={{ translateX: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          {/* High water threat indicator */}
          <line x1="1395" y1="468" x2="1600" y2="468" stroke="#E05040" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.5" />
          <text x="1410" y="463" fontSize="8" fill="#E05040" fontWeight="600" opacity="0.7">+80cm MHW 2100</text>
        </g>

        {/* ── SURFACE WATER ── */}

        {/* Brook stream */}
        <g id="brook-stream" style={elementStyle('brook-stream')} className="landscape-element">
          <motion.path
            d="M 260 440 C 300 450, 340 462, 380 472 C 420 482, 440 478, 470 474 C 510 470, 540 468, 570 464 C 600 460, 620 454, 640 448"
            stroke="#3A80D0"
            strokeWidth="5"
            fill="none"
            filter="url(#softGlow)"
          />
          <motion.path
            d="M 260 440 C 300 450, 340 462, 380 472 C 420 482, 440 478, 470 474 C 510 470, 540 468, 570 464 C 600 460, 620 454, 640 448"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          {/* Flow direction arrows */}
          {[0.25, 0.5, 0.75].map((t, i) => {
            const x = 280 + t * 360
            const y = 448 + Math.sin(t * Math.PI) * 20
            return (
              <motion.g
                key={i}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.66 }}
              >
                <path
                  d={`M ${x - 6} ${y} L ${x + 4} ${y} M ${x + 1} ${y - 3} L ${x + 5} ${y} L ${x + 1} ${y + 3}`}
                  stroke="#4A90D8"
                  strokeWidth="1.5"
                  fill="none"
                />
              </motion.g>
            )
          })}
        </g>

        {/* Canals in polder */}
        {[0, 1, 2].map((i) => (
          <g key={i} id={`canal-${i}`}>
            <rect
              x="1020" y={452 + i * 9}
              width="230" height="3"
              fill="#2A68A8"
              opacity="0.5"
              rx="1"
            />
          </g>
        ))}

        {/* ── VEGETATION ── */}

        {/* Pine trees on sandy ridge */}
        <g opacity="0.85">
          {[30, 60, 90, 120, 150, 175].map((x, i) => {
            const scale = 0.7 + (i % 3) * 0.18
            const y = 360 - (i === 3 ? 15 : 0)
            return (
              <g key={x} transform={`translate(${x}, ${y - 10})`}>
                {/* Dark pine triangle */}
                <polygon
                  points={`0,${-38 * scale} ${14 * scale},${8 * scale} ${-14 * scale},${8 * scale}`}
                  fill="#2A5018"
                />
                <polygon
                  points={`0,${-28 * scale} ${11 * scale},${14 * scale} ${-11 * scale},${14 * scale}`}
                  fill="#387028"
                />
                <polygon
                  points={`0,${-16 * scale} ${9 * scale},${18 * scale} ${-9 * scale},${18 * scale}`}
                  fill="#4A8838"
                />
                {/* Trunk */}
                <rect x={-2} y={18 * scale} width={4} height={8} fill="#5A3A20" />
              </g>
            )
          })}
        </g>

        {/* Mixed trees — nature zone */}
        <g opacity="0.9">
          {[200, 225, 248, 272].map((x, i) => {
            const yBase = 370 + i * 4
            return (
              <g key={x}>
                <rect x={x - 2} y={yBase} width={4} height={20} fill="#4A2A10" />
                <ellipse cx={x} cy={yBase - 8} rx={16} ry={18} fill="#3A6A28" />
                <ellipse cx={x - 6} cy={yBase - 4} rx={10} ry={12} fill="#4A7A38" />
              </g>
            )
          })}
        </g>

        {/* Riparian vegetation in brook valley */}
        <g opacity="0.85">
          {[360, 390, 420, 450, 500, 530, 560].map((x, i) => {
            const yBase = 470 - (i % 2 === 0 ? 5 : 2)
            return (
              <g key={x}>
                <rect x={x - 1.5} y={yBase - 18} width={3} height={18} fill="#3A2810" />
                <ellipse cx={x} cy={yBase - 22} rx={11} ry={13} fill="#2A5818" />
                <ellipse cx={x + 5} cy={yBase - 18} rx={8} ry={10} fill="#3A6828" />
              </g>
            )
          })}
        </g>

        {/* Trees along agricultural edges */}
        <g opacity="0.7">
          {[300, 325, 350].map((x, i) => (
            <g key={x}>
              <rect x={x - 1.5} y={415} width={3} height={16} fill="#3A2810" />
              <ellipse cx={x} cy={408} rx={9} ry={10} fill="#4A7830" />
            </g>
          ))}
        </g>

        {/* Urban trees */}
        <g opacity="0.75">
          {[790, 830, 870, 950, 990].map((x) => (
            <g key={x}>
              <rect x={x - 1.5} y={430} width={3} height={12} fill="#3A2810" />
              <circle cx={x} cy={425} r={8} fill="#4A7830" />
            </g>
          ))}
        </g>

        {/* ── INFRASTRUCTURE ── */}

        {/* Extraction well (inland, on ridge) */}
        <g id="extraction-well-inland-surface" style={elementStyle('extraction-well-inland')} className="landscape-element">
          {/* Pump house */}
          <rect x="126" y="352" width="18" height="14" fill="#8A9AA8" rx="1" />
          <polygon points="126,352 135,344 144,352" fill="#7A8A98" />
          {/* Well pipe surface */}
          <rect x="133" y="366" width="6" height="18" fill="#A0B0C0" rx="3" />
          {/* Label */}
          <text x="136" y="342" fontSize="8" fill="#A0B8C8" textAnchor="middle" fontWeight="600" opacity="0.8">BRON</text>
        </g>

        {/* Extraction well (urban) */}
        <g id="extraction-well-urban-surface" style={elementStyle('extraction-well-urban')} className="landscape-element">
          <rect x="806" y="419" width="18" height="12" fill="#8A9AA8" rx="1" />
          <polygon points="806,419 815,412 824,419" fill="#7A8A98" />
          <rect x="813" y="431" width="6" height="14" fill="#A0B0C0" rx="3" />
          <text x="815" y="410" fontSize="8" fill="#A0B8C8" textAnchor="middle" fontWeight="600" opacity="0.8">PUT</text>
        </g>

        {/* Weir in brook */}
        <g style={elementStyle('brook-stream')} className="landscape-element">
          <rect x="518" y="463" width="14" height="16" fill="#7A8898" rx="1" />
          <rect x="516" y="461" width="18" height="4" fill="#9AAAB8" rx="1" />
          {/* Water level difference */}
          <path d="M 518 465 L 505 465" stroke="#3A80D0" strokeWidth="2" opacity="0.7" />
          <path d="M 532 470 L 545 470" stroke="#3A80D0" strokeWidth="2" opacity="0.7" />
        </g>

        {/* ── RWZI (Wastewater Treatment Plant) ── */}
        <g id="rwzi" style={elementStyle('rwzi')} className="landscape-element">
          {/* Main building */}
          <rect x="868" y="410" width="40" height="28" fill="#606E7C" rx="2" />
          <polygon points="868,410 888,400 908,410" fill="#505E6C" />
          {/* Settling tanks */}
          <ellipse cx="928" cy="430" rx="18" ry="14" fill="#4A5E70" stroke="#607888" strokeWidth="1.5" />
          <ellipse cx="928" cy="430" rx="10" ry="7" fill="#3A4E60" />
          <ellipse cx="955" cy="432" rx="16" ry="12" fill="#4A5E70" stroke="#607888" strokeWidth="1.5" />
          <ellipse cx="955" cy="432" rx="8" ry="6" fill="#3A4E60" />
          {/* Pipes */}
          <line x1="908" y1="424" x2="910" y2="424" stroke="#8090A0" strokeWidth="2" />
          <line x1="939" y1="430" x2="939" y2="430" stroke="#8090A0" strokeWidth="2" />
          {/* Label */}
          <text x="905" y="398" fontSize="9" fill="#90A8B8" textAnchor="middle" fontWeight="700" letterSpacing="0.5">RWZI</text>
        </g>

        {/* Energy recovery indicator */}
        <g id="energy-recovery" style={elementStyle('energy-recovery')} className="landscape-element">
          <rect x="876" y="404" width="14" height="10" fill="#FFB300" opacity="0.8" rx="1" />
          <text x="883" y="413" fontSize="7" fill="#1A1A00" textAnchor="middle" fontWeight="800">⚡</text>
          <text x="883" y="398" fontSize="7" fill="#FFB300" textAnchor="middle" fontWeight="600" opacity="0.8">ENERGIE</text>
        </g>

        {/* Nutrient recovery */}
        <g id="nutrient-recovery" style={elementStyle('nutrient-recovery')} className="landscape-element">
          <circle cx="970" cy="416" r="8" fill="#7B1FA2" opacity="0.7" />
          <text x="970" y="419" fontSize="7" fill="white" textAnchor="middle" fontWeight="700">P</text>
          <text x="970" y="408" fontSize="7" fill="#CE93D8" textAnchor="middle" fontWeight="600" opacity="0.8">FOSFAAT</text>
        </g>

        {/* Effluent pipe to brook */}
        <g id="effluent-pipe" style={elementStyle('effluent-pipe')} className="landscape-element">
          <path d="M 908 434 C 850 440, 750 450, 660 452" stroke="#4A90D8" strokeWidth="3" fill="none" opacity="0.6" />
          <path
            d="M 908 434 C 850 440, 750 450, 660 452"
            stroke="#7AB8E8"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            className="flow-path"
          />
          <text x="780" y="444" fontSize="8" fill="#4A90D8" textAnchor="middle" opacity="0.7" fontWeight="600">EFFLUENT</text>
        </g>

        {/* Storm drain indicator */}
        <g id="storm-drain" style={elementStyle('storm-drain')} className="landscape-element">
          <path d="M 880 460 L 880 480 M 850 460 L 850 480 M 920 460 L 920 480" stroke="#3A6080" strokeWidth="2" opacity="0.5" />
          {/* Downward arrows */}
          {[850, 880, 920].map((x) => (
            <path key={x} d={`M ${x - 3} 465 L ${x} 470 L ${x + 3} 465`} stroke="#3A7090" strokeWidth="1.5" fill="none" opacity="0.5" />
          ))}
        </g>

        {/* Pumping station */}
        <g id="pumping-station" style={elementStyle('pumping-station')} className="landscape-element">
          <rect x="1118" y="450" width="22" height="18" fill="#5A6A78" rx="2" />
          <polygon points="1118,450 1129,442 1140,450" fill="#4A5A68" />
          {/* Impeller symbol */}
          <circle cx="1129" cy="459" r="5" fill="none" stroke="#8090A0" strokeWidth="1.5" />
          <path d="M 1129 454 L 1129 464 M 1124 459 L 1134 459" stroke="#8090A0" strokeWidth="1.5" />
          <text x="1129" y="440" fontSize="8" fill="#8AA0B0" textAnchor="middle" fontWeight="600">GEMAAL</text>
        </g>

        {/* ── URBAN BUILDINGS silhouette ── */}
        <g id="buildings" style={elementStyle('urban-area')} className="landscape-element" opacity="0.9">
          {[
            { x: 790, w: 22, h: 35, fill: '#6A7A88' },
            { x: 815, w: 16, h: 25, fill: '#7A8A98' },
            { x: 833, w: 28, h: 42, fill: '#5A6A78' },
            { x: 864, w: 14, h: 28, fill: '#7A8A98' },
            { x: 913, w: 18, h: 30, fill: '#687888' },
            { x: 933, w: 24, h: 22, fill: '#788898' },
            { x: 960, w: 20, h: 36, fill: '#607080' },
            { x: 982, w: 16, h: 24, fill: '#708090' },
          ].map(({ x, w, h, fill }) => (
            <g key={x}>
              <rect x={x} y={420 - h} width={w} height={h} fill={fill} rx="1" />
              {/* Window hints */}
              {h > 30 && (
                <>
                  <rect x={x + 4} y={420 - h + 6} width={5} height={5} fill="#B8C8D8" opacity="0.3" rx="0.5" />
                  <rect x={x + w - 9} y={420 - h + 6} width={5} height={5} fill="#B8C8D8" opacity="0.3" rx="0.5" />
                  <rect x={x + 4} y={420 - h + 15} width={5} height={5} fill="#C8D8E8" opacity="0.4" rx="0.5" />
                </>
              )}
            </g>
          ))}
        </g>

        {/* ── THEME CONNECTION PATHS ── */}
        <AnimatePresence>
          {([] as { from: string; to: string; label?: string }[]).map((conn, i) => {
            // Map element IDs to approximate SVG coordinates
            const coords: Record<string, [number, number]> = {
              'agricultural-west': [350, 440],
              'agricultural-east': [665, 440],
              'brook-valley': [480, 468],
              'groundwater-zone': [400, 560],
              'retention-basin': [660, 458],
              'extraction-well-inland': [136, 450],
              'extraction-well-urban': [816, 440],
              'nature-zone': [200, 420],
              'brook-stream': [460, 460],
              'urban-area': [890, 440],
              'rwzi': [920, 425],
              'effluent-pipe': [780, 445],
              'energy-recovery': [883, 408],
              'nutrient-recovery': [970, 416],
              'polder': [1130, 460],
              'dike': [1310, 360],
              'sea-zone': [1480, 490],
              'pumping-station': [1129, 450],
              'groundwater-table': [800, 558],
              'soil-aquifer': [800, 700],
              'storm-drain': [880, 460],
            }

            const from = coords[conn.from]
            const to = coords[conn.to]
            if (!from || !to) return null

            const mx = (from[0] + to[0]) / 2
            const my = Math.min(from[1], to[1]) - 40

            return (
              <motion.g key={`${conn.from}-${conn.to}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.12 }}>
                {/* Connection path */}
                <motion.path
                  d={`M ${from[0]} ${from[1]} Q ${mx} ${my} ${to[0]} ${to[1]}`}
                  stroke={'#4AB0D8'}
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"
                  filter="url(#softGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                />
                {/* Animated dot on path */}
                <motion.circle
                  r="4"
                  fill={'#4AB0D8'}
                  opacity="0.9"
                  animate={{
                    offsetDistance: ['0%', '100%'],
                    opacity: [0, 1, 1, 0],
                  }}
                  style={{
                    offsetPath: `path("M ${from[0]} ${from[1]} Q ${mx} ${my} ${to[0]} ${to[1]}")`,
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                />
                {/* Label */}
                {conn.label && (
                  <motion.text
                    x={mx}
                    y={my - 8}
                    fontSize="9"
                    fill={'#4AB0D8'}
                    textAnchor="middle"
                    fontWeight="600"
                    opacity="0.8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: i * 0.12 + 0.4 }}
                  >
                    {conn.label}
                  </motion.text>
                )}
              </motion.g>
            )
          })}
        </AnimatePresence>

        {/* ── SCALE / DEPTH LABELS (always visible) ── */}
        <g opacity="0.5">
          {/* Depth labels */}
          <line x1="1568" y1="480" x2="1568" y2="748" stroke="#4A6070" strokeWidth="1" />
          {[
            { y: 480, label: '0m' },
            { y: 558, label: '-2m' },
            { y: 620, label: '-4m' },
            { y: 665, label: '-6m' },
            { y: 748, label: '-10m' },
          ].map(({ y, label }) => (
            <g key={y}>
              <line x1="1562" y1={y} x2="1574" y2={y} stroke="#4A6070" strokeWidth="1" />
              <text x="1590" y={y + 4} fontSize="8" fill="#5A7888" fontWeight="500">{label}</text>
            </g>
          ))}
        </g>

        {/* ── WIND TURBINES on polder (distant) ── */}
        <g opacity="0.6">
          {[1060, 1100, 1145].map((x, i) => {
            const yBase = 456 + i * 2
            return (
              <g key={x}>
                {/* Mast */}
                <line x1={x} y1={yBase} x2={x} y2={yBase - 55} stroke="#8A9AA8" strokeWidth="2" />
                {/* Blades */}
                <motion.g
                  style={{ transformOrigin: `${x}px ${yBase - 55}px` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
                >
                  <line x1={x} y1={yBase - 55} x2={x + 2} y2={yBase - 85} stroke="#9AAAB8" strokeWidth="2" />
                  <line x1={x} y1={yBase - 55} x2={x - 22} y2={yBase - 40} stroke="#9AAAB8" strokeWidth="2" />
                  <line x1={x} y1={yBase - 55} x2={x + 20} y2={yBase - 42} stroke="#9AAAB8" strokeWidth="2" />
                </motion.g>
                {/* Nacelle */}
                <circle cx={x} cy={yBase - 55} r="4" fill="#8090A0" />
              </g>
            )
          })}
        </g>

        {/* ── HOTSPOT MARKERS ── */}
        {hotspots.map((hotspot) => {
          const svgX = (hotspot.x / 100) * 1600
          const svgY = (hotspot.y / 100) * 870
          const isActive = selectedHotspot?.id === hotspot.id
          const primaryEl = hotspot.id.replace(/-hotspot$/, '')
          const isThemeActive = activeTheme
            ? highlighted.includes(primaryEl) || (hotspot.linkedElements ?? []).some(el => highlighted.includes(el))
            : true

          return (
            <g
              key={hotspot.id}
              transform={`translate(${svgX}, ${svgY})`}
              style={{
                cursor: 'pointer',
                opacity: !activeTheme || isThemeActive ? 1 : 0.25,
                transition: 'opacity 0.4s ease',
              }}
              onClick={() => onHotspotClick(hotspot)}
            >
              {/* Outer pulse ring */}
              <motion.circle
                r={isActive ? 22 : 16}
                fill="none"
                stroke={isActive ? '#FFFFFF' : '#7BC8E8'}
                strokeWidth={isActive ? 2 : 1.5}
                opacity={0.5}
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.15, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Inner dot */}
              <circle
                r={isActive ? 9 : 6}
                fill={isActive ? '#FFFFFF' : '#4AB0D8'}
                stroke={isActive ? '#4AB0D8' : '#FFFFFF'}
                strokeWidth="2"
                style={{ transition: 'all 0.3s ease' }}
              />
              {/* Center dot */}
              <circle r={3} fill={isActive ? '#0A5A8A' : '#FFFFFF'} />
              {/* Label */}
              <text
                y={-18}
                fontSize="9"
                fill="white"
                textAnchor="middle"
                fontWeight="600"
                style={{ pointerEvents: 'none', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                opacity={isActive || isThemeActive ? 1 : 0.4}
              >
                {hotspot.label.split('\n')[0]}
              </text>
              {hotspot.label.includes('\n') && (
                <text
                  y={-8}
                  fontSize="9"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="600"
                  opacity={isActive || isThemeActive ? 0.85 : 0.35}
                >
                  {hotspot.label.split('\n')[1]}
                </text>
              )}
            </g>
          )
        })}

        {/* ── TERRAIN EDGE / GROUND LINE ── */}
        <path
          d="M 0 424 C 24 416, 48 404, 74 392 C 100 380, 128 366, 156 352 C 176 344, 198 342, 220 348 C 240 354, 260 366, 280 380 C 300 394, 320 408, 345 424 C 365 436, 390 448, 420 458 C 450 468, 470 474, 490 472 C 510 470, 530 464, 555 456 C 578 448, 605 440, 635 432 C 660 424, 690 418, 730 416 C 760 414, 790 415, 820 419 C 850 423, 878 428, 900 434 C 922 440, 948 446, 975 452 C 1002 458, 1040 462, 1080 466 C 1120 470, 1160 470, 1196 462 C 1218 456, 1238 446, 1256 432 C 1272 418, 1290 394, 1304 370 C 1316 350, 1324 340, 1332 344 C 1342 350, 1354 374, 1366 416 C 1378 450, 1392 470, 1408 480"
          stroke="#5A7A40"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />

        {/* ── LEGEND STRIP (bottom left) ── */}
        <g transform="translate(12, 788)" opacity="0.7">
          {[
            { color: '#C8A86A', label: 'Zandrug' },
            { color: '#4A8830', label: 'Natuur' },
            { color: '#8BC34A', label: 'Landbouw' },
            { color: '#7888A0', label: 'Stedelijk' },
            { color: '#78A848', label: 'Polder' },
            { color: '#1A4878', label: 'Grondwater' },
          ].map(({ color, label }, i) => (
            <g key={label} transform={`translate(${i * 110}, 0)`}>
              <rect width="12" height="8" rx="2" fill={color} />
              <text x="16" y="8" fontSize="9" fill="#90A8B8" fontWeight="500">{label}</text>
            </g>
          ))}
        </g>

        {/* ── WATERSCHAP LOGO PLACEHOLDER ── */}
        <g transform="translate(1480, 20)" opacity="0.8">
          <rect width="108" height="36" rx="4" fill="rgba(10,22,40,0.6)" />
          <text x="54" y="15" fontSize="8" fill="#5A90B8" textAnchor="middle" fontWeight="700" letterSpacing="2">WATERSCHAP</text>
          <text x="54" y="28" fontSize="10" fill="#7AB8D8" textAnchor="middle" fontWeight="300" letterSpacing="1">WATERBEHEER</text>
        </g>
      </svg>
    </div>
  )
}
