export interface Relevance {
  oppervlaktewater: number
  grondwater: number
  hemelwater: number
  afvalwater: number
  drinkwater: number
  bodem: number
  waterkeringen: number
  wonenWerken: number
  natuur: number
  landbouw: number
  recreatie: number
  industrie: number
  zandruggen: number
  flanken: number
  beekdalen: number
  stedelijk: number
}

export interface RelevanceNote {
  ambitie: string
  samenwerking: string
  maatregel: string
  voorbeeld: string
}

export interface Objective {
  id: string
  label: string
  icon: string
  color: string
  toelichting: string
  bron: string
  horizon: string
  relevance: Relevance
  highlightedElements: string[]
  notes?: Partial<Record<keyof Relevance, RelevanceNote>>
}

export interface ObjectiveCategory {
  id: string
  label: string
  color: string
  gradient: [string, string]
  objectives: Objective[]
}

const COL: Record<keyof Relevance, string[]> = {
  oppervlaktewater: ['brook-stream', 'effluent-pipe', 'polder', 'sea-zone'],
  grondwater: ['groundwater-zone', 'groundwater-table', 'soil-aquifer', 'soil-saturated', 'seepage-zone', 'infiltration-zone'],
  hemelwater: ['storm-drain', 'retention-basin', 'infiltration-zone'],
  afvalwater: ['rwzi', 'effluent-pipe'],
  drinkwater: ['extraction-well-inland', 'extraction-well-urban'],
  bodem: ['soil-topsoil', 'soil-sand', 'soil-peat', 'soil-aquifer'],
  waterkeringen: ['dike', 'pumping-station'],
  wonenWerken: ['urban-area', 'storm-drain'],
  natuur: ['nature-zone', 'brook-valley'],
  landbouw: ['agricultural-west', 'agricultural-east'],
  recreatie: ['brook-valley', 'retention-basin'],
  industrie: ['energy-recovery', 'nutrient-recovery'],
  zandruggen: ['soil-sand', 'extraction-well-inland', 'infiltration-zone'],
  flanken: ['seepage-zone', 'nature-zone', 'groundwater-zone'],
  beekdalen: ['brook-valley', 'brook-stream', 'retention-basin'],
  stedelijk: ['urban-area', 'storm-drain', 'rwzi'],
}

function computeHighlighted(r: Relevance): string[] {
  const seen: Record<string, true> = {}
  const result: string[] = []
  ;(Object.keys(r) as (keyof Relevance)[]).forEach(k => {
    if (r[k] > 0) COL[k].forEach(e => { if (!seen[e]) { seen[e] = true; result.push(e) } })
  })
  return result
}

function parseNote(raw: string): RelevanceNote {
  const parts = raw.split('|').map(s => s.trim())
  return {
    ambitie: parts[0] ?? '',
    samenwerking: parts[1] ?? '',
    maatregel: parts[2] ?? '',
    voorbeeld: parts[3] ?? '',
  }
}

function makeObjective(
  id: string, label: string, icon: string, color: string,
  toelichting: string, bron: string, horizon: string, r: Relevance,
  notes?: Partial<Record<keyof Relevance, RelevanceNote>>,
): Objective {
  return { id, label, icon, color, toelichting, bron, horizon, relevance: r, highlightedElements: computeHighlighted(r), notes }
}

export const RELEVANCE_LABELS: Record<keyof Relevance, string> = {
  oppervlaktewater: 'Oppervlaktewater',
  grondwater: 'Grondwater',
  hemelwater: 'Hemelwater',
  afvalwater: 'Afvalwater',
  drinkwater: 'Drinkwater',
  bodem: 'Bodem & ondergrond',
  waterkeringen: 'Waterkeringen',
  wonenWerken: 'Wonen & werken',
  natuur: 'Natuur',
  landbouw: 'Landbouw',
  recreatie: 'Recreatie & erfgoed',
  industrie: 'Industrie & energie',
  zandruggen: 'Zandruggen (hoog)',
  flanken: 'Flanken (overgang)',
  beekdalen: 'Beekdalen (laag)',
  stedelijk: 'Stedelijk gebied',
}

export const RELEVANCE_GROUPS: { label: string; keys: (keyof Relevance)[] }[] = [
  { label: 'Watersysteem', keys: ['oppervlaktewater', 'grondwater', 'hemelwater', 'afvalwater', 'drinkwater', 'bodem', 'waterkeringen'] },
  { label: 'Gebiedsfuncties', keys: ['wonenWerken', 'natuur', 'landbouw', 'recreatie', 'industrie'] },
  { label: 'Landschapstypen', keys: ['zandruggen', 'flanken', 'beekdalen', 'stedelijk'] },
]

export const objectiveCategories: ObjectiveCategory[] = [
  {
    id: 'wettelijk',
    label: 'Wettelijke kerntaken',
    color: '#3B82F6',
    gradient: ['#3B82F6', '#1D4ED8'],
    objectives: [
      makeObjective('waterveiligheid', 'Waterveiligheid & Wateroverlast', '🛡️', '#3B82F6',
        'Bescherming tegen overstromingen; beheer primaire en regionale waterkeringen; normering en toetsing',
        'Waterwet art. 2.1 lid 1; Waterschapswet; Omgevingswet (afd. 5.1); Waterbesluit; WBI 2017', '2028-2033',
        { oppervlaktewater:1, grondwater:0, hemelwater:0, afvalwater:0, drinkwater:0, bodem:0, waterkeringen:3, wonenWerken:1, natuur:0, landbouw:0, recreatie:1, industrie:0, zandruggen:1, flanken:2, beekdalen:3, stedelijk:2 },
        { beekdalen: parseNote('voldoende ruimte om neerslagpieken op te vangen | samen met grondeigenaren, landbouw en natuurorganisaties water meer ruimte geven | aanpassen schaderegelingen, stimuleringsregeling | bijv.') }),
      makeObjective('waterkwantiteit', 'Waterkwantiteitsbeheer', '⚖️', '#60A5FA',
        'Peilbeheer, wateraan- en afvoer, waterberging, verdeling beschikbaar water',
        'Waterwet art. 2.1 lid 2; Omgevingswet; Peilbesluiten; Deltaprogramma Zoetwater', '2028-2033',
        { oppervlaktewater:3, grondwater:3, hemelwater:1, afvalwater:0, drinkwater:0, bodem:1, waterkeringen:0, wonenWerken:2, natuur:2, landbouw:3, recreatie:1, industrie:0, zandruggen:2, flanken:3, beekdalen:3, stedelijk:1 },
        { beekdalen: parseNote('een beekdal dat niet verdrogend werkt op de omgeving | waterschap en grondeigenaren zorgen dat beken blijven stromen, het natter wordt | compensatie waardedaling gronden | bijv.') }),
      makeObjective('zuiveringstaak', 'Zuiveringstaak', '🔬', '#93C5FD',
        "Inzameling, transport en zuivering stedelijk afvalwater; beheer en exploitatie RWZI's; effluentkwaliteit",
        'Waterwet art. 3.4; EU Richtlijn Stedelijk Afvalwater (91/271/EEG, herziening 2024); Activiteitenbesluit', '2028-2033',
        { oppervlaktewater:2, grondwater:0, hemelwater:0, afvalwater:3, drinkwater:1, bodem:0, waterkeringen:0, wonenWerken:2, natuur:1, landbouw:1, recreatie:0, industrie:3, zandruggen:1, flanken:1, beekdalen:3, stedelijk:2 },
        { beekdalen: parseNote('omgeving geen vervuiling naar het beekdal | grondeigenaren zorgen dat uitspoeling meststoffen en gewasbeschermingsmiddelen minder wordt | maatregel planperiode ... | nog geen voorbeeld') }),
      makeObjective('waterkwaliteit', 'Waterkwaliteitsbeheer', '💧', '#38BDF8',
        'Chemische en ecologische kwaliteit oppervlaktewater; monitoring; beoordeling; maatregelprogramma',
        'Kaderrichtlijn Water (2000/60/EG); Waterwet; Besluit kwaliteitseisen en monitoring water; Omgevingswet', '2027 (KRW)',
        { oppervlaktewater:3, grondwater:2, hemelwater:0, afvalwater:1, drinkwater:1, bodem:1, waterkeringen:0, wonenWerken:1, natuur:3, landbouw:3, recreatie:1, industrie:2, zandruggen:1, flanken:2, beekdalen:3, stedelijk:1 },
        { beekdalen: parseNote('weigeren van verontreinigd water (specifieke stoffen) | waterschap, gemeenten en bedrijven stoppen met lozen van specifieke stoffen | handelingskader pfas, influentbeleid aanpassen, waterschapsverordening aanpassen | bijv.') }),
      makeObjective('grondwaterbeheer', 'Grondwaterbeheer', '🌊', '#0EA5E9',
        'Kwantitatief en kwalitatief grondwaterbeheer; vergunningverlening onttrekkingen; grondwatermonitoring',
        'Waterwet art. 6.4; Omgevingswet; KRW (grondwaterlichamen); Grondwaterrichtlijn (2006/118/EG)', '2028-2033',
        { oppervlaktewater:1, grondwater:3, hemelwater:1, afvalwater:0, drinkwater:1, bodem:2, waterkeringen:0, wonenWerken:1, natuur:3, landbouw:3, recreatie:0, industrie:0, zandruggen:3, flanken:3, beekdalen:2, stedelijk:1 }),
      makeObjective('wegenbeheer', 'Wegenbeheer', '🛣️', '#7DD3FC',
        'Aanleg, beheer en onderhoud van wegen in het buitengebied (waar van toepassing)',
        'Waterschapswet art. 1 lid 2 (regionaal bepaald via reglement)', 'Doorlopend',
        { oppervlaktewater:0, grondwater:0, hemelwater:0, afvalwater:0, drinkwater:0, bodem:1, waterkeringen:0, wonenWerken:1, natuur:1, landbouw:2, recreatie:1, industrie:0, zandruggen:2, flanken:2, beekdalen:1, stedelijk:0 }),
      makeObjective('muskusrat', 'Muskusrattenbestrijding', '🐀', '#BAE6FD',
        'Bestrijding muskus- en beverratten ter bescherming van waterkeringen en oevers',
        'Waterschapswet; Flora- en faunawet / Wet natuurbescherming (ontheffing)', 'Doorlopend',
        { oppervlaktewater:1, grondwater:0, hemelwater:0, afvalwater:0, drinkwater:0, bodem:0, waterkeringen:3, wonenWerken:0, natuur:1, landbouw:1, recreatie:0, industrie:0, zandruggen:0, flanken:0, beekdalen:1, stedelijk:0 }),
      makeObjective('vth', 'Vergunning, Toezicht & Handhaving', '📋', '#BFDBFE',
        'Verlenen watervergunningen; toezicht op lozingen en onttrekkingen; handhaving bij overtredingen',
        'Omgevingswet (hfst. 5 en 18); Waterschapsverordening; Landelijke Handhavingsstrategie Omgevingsrecht (LHSO)', 'Doorlopend',
        { oppervlaktewater:2, grondwater:1, hemelwater:0, afvalwater:2, drinkwater:1, bodem:1, waterkeringen:1, wonenWerken:2, natuur:1, landbouw:3, recreatie:1, industrie:3, zandruggen:1, flanken:1, beekdalen:2, stedelijk:2 }),
    ],
  },
  {
    id: 'europees',
    label: 'Europese & nationale beleidsdoelen',
    color: '#10B981',
    gradient: ['#10B981', '#047857'],
    objectives: [
      makeObjective('schoon-water', 'Schoon Water / KRW-doelbereik', '🧪', '#10B981',
        'Realisatie goede chemische en ecologische toestand; bronaanpak; emissiebeperking; grip op lozingen',
        'Kaderrichtlijn Water (2000/60/EG); Stroomgebiedbeheerplannen (SGBP3); Nitraatrichtlijn; OSPAR', '2027 (harde deadline KRW)',
        { oppervlaktewater:3, grondwater:2, hemelwater:1, afvalwater:3, drinkwater:1, bodem:2, waterkeringen:0, wonenWerken:1, natuur:3, landbouw:3, recreatie:1, industrie:3, zandruggen:1, flanken:2, beekdalen:3, stedelijk:2 }),
      makeObjective('droge-voeten', 'Droge Voeten / Hoogwaterbescherming', '🌊', '#34D399',
        'Voorkomen wateroverlast en overstromingen; meerlaagsveiligheid; waterrobuust inrichten',
        "Waterwet; Deltaprogramma Waterveiligheid; EU Richtlijn Overstromingsrisico's (2007/60/EG); DPRA", '2050',
        { oppervlaktewater:2, grondwater:1, hemelwater:2, afvalwater:0, drinkwater:0, bodem:0, waterkeringen:3, wonenWerken:3, natuur:1, landbouw:1, recreatie:1, industrie:0, zandruggen:1, flanken:2, beekdalen:3, stedelijk:3 }),
      makeObjective('voldoende-water', 'Voldoende Water', '💦', '#6EE7B7',
        'Zoetwaterbeschikbaarheid; strategische watervoorraad; klimaatbuffers; verdringingsreeks',
        "Deltaprogramma Zoetwater; Waterwet; Beleidstafel Droogte (2019); 'Water en Bodem Sturend' (2022/2024)", '2050',
        { oppervlaktewater:3, grondwater:3, hemelwater:1, afvalwater:0, drinkwater:1, bodem:2, waterkeringen:0, wonenWerken:2, natuur:3, landbouw:3, recreatie:1, industrie:0, zandruggen:3, flanken:3, beekdalen:3, stedelijk:1 }),
      makeObjective('klimaatadaptatie', 'Klimaatadaptatie', '🌡️', '#A7F3D0',
        "Aanpassing watersysteem aan klimaatextremen; stresstesten; risicodialogen; uitvoeringsagenda's",
        'Deltaplan Ruimtelijke Adaptatie (DPRA); Nationale Klimaatadaptatiestrategie (NAS); Omgevingsvisie', '2050',
        { oppervlaktewater:3, grondwater:3, hemelwater:3, afvalwater:1, drinkwater:0, bodem:2, waterkeringen:2, wonenWerken:3, natuur:3, landbouw:3, recreatie:2, industrie:1, zandruggen:2, flanken:3, beekdalen:3, stedelijk:3 }),
    ],
  },
  {
    id: 'sectoraal',
    label: 'Sectorale ambities & akkoorden',
    color: '#8B5CF6',
    gradient: ['#8B5CF6', '#5B21B6'],
    objectives: [
      makeObjective('klimaatneutraliteit', 'Klimaatneutraliteit', '🌿', '#8B5CF6',
        'Reductie scope 1/2/3 broeikasgasemissies; verduurzaming bedrijfsvoering; CO₂-reductiepad',
        "Klimaatakkoord (2019); EU Green Deal; Sectorale Routekaart Klimaatneutraal (UvW); IPCC-scenario's", '2035 (ambitie UvW)',
        { oppervlaktewater:0, grondwater:0, hemelwater:0, afvalwater:2, drinkwater:0, bodem:0, waterkeringen:0, wonenWerken:1, natuur:0, landbouw:1, recreatie:0, industrie:2, zandruggen:0, flanken:0, beekdalen:0, stedelijk:1 }),
      makeObjective('energieneutraliteit', 'Energieneutraliteit', '⚡', '#A78BFA',
        "Eigen energieopwekking ≥ verbruik; biogas, zon, wind, aquathermie; energiebesparing RWZI's",
        'Routekaart Energieneutraliteit Waterschappen (UvW, 2017); Klimaatakkoord; RES', '2025 (ambitie) / 2030',
        { oppervlaktewater:0, grondwater:0, hemelwater:0, afvalwater:3, drinkwater:0, bodem:0, waterkeringen:0, wonenWerken:1, natuur:0, landbouw:1, recreatie:0, industrie:3, zandruggen:0, flanken:0, beekdalen:1, stedelijk:1 }),
      makeObjective('circulariteit', 'Circulariteit', '♻️', '#C4B5FD',
        'Terugwinning grondstoffen uit afvalwater (P, cellulose, bioplastics); slib als grondstof; circulaire inkoop',
        'Grondstoffenakkoord (UvW/VNG/IPO); EU Circular Economy Action Plan; Ketenakkoord Fosfaat', '2030-2050',
        { oppervlaktewater:1, grondwater:0, hemelwater:0, afvalwater:3, drinkwater:1, bodem:1, waterkeringen:0, wonenWerken:1, natuur:0, landbouw:2, recreatie:0, industrie:3, zandruggen:0, flanken:0, beekdalen:1, stedelijk:1 }),
      makeObjective('weerbaarheid', 'Weerbaarheid vitale infrastructuur', '🔄', '#DDD6FE',
        'Cyber- en fysieke weerbaarheid; crisisbeheersing; bedrijfscontinuïteit; bescherming vitale processen',
        'Wet weerbaarheid kritieke entiteiten (CER-richtlijn); Wbni; Baseline Informatiebeveiliging Waterschappen (BIWA)', 'Doorlopend',
        { oppervlaktewater:1, grondwater:0, hemelwater:0, afvalwater:2, drinkwater:1, bodem:0, waterkeringen:2, wonenWerken:2, natuur:0, landbouw:0, recreatie:0, industrie:1, zandruggen:1, flanken:1, beekdalen:1, stedelijk:2 }),
      makeObjective('compliance', 'Compliance / naleving', '📋', '#EDE9FE',
        'Integrale naleving wet- en regelgeving; kwaliteitsborging; audits; transparantie',
        'Omgevingswet; BBV; Waterschapswet; Archiefwet; WOO; AVG; sectorale afspraken (bijv. Aquo)', 'Doorlopend',
        { oppervlaktewater:2, grondwater:1, hemelwater:0, afvalwater:2, drinkwater:1, bodem:1, waterkeringen:1, wonenWerken:2, natuur:1, landbouw:2, recreatie:1, industrie:2, zandruggen:1, flanken:1, beekdalen:1, stedelijk:2 }),
    ],
  },
]

export const getAllObjectives = (): Objective[] =>
  objectiveCategories.flatMap(c => c.objectives)

export const getObjectiveById = (id: string): Objective | undefined =>
  getAllObjectives().find(o => o.id === id)

export const getCategoryByObjectiveId = (id: string): ObjectiveCategory | undefined =>
  objectiveCategories.find(c => c.objectives.some(o => o.id === id))
