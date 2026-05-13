export interface KPI {
  label: string
  value: string
  unit: string
  trend?: 'up' | 'down' | 'stable'
  good?: boolean
}

export interface Hotspot {
  id: string
  x: number
  y: number
  label: string
  sublabel?: string
  themes: string[]
  title: string
  description: string
  policyGoals: string[]
  challenges: string[]
  measures: string[]
  kpis?: KPI[]
  linkedElements?: string[]
}

export const hotspots: Hotspot[] = [
  {
    id: 'extraction-well-inland',
    x: 8.5,
    y: 68,
    label: 'Drinkwater\nonttrekking',
    themes: ['groundwater', 'drought', 'agriculture'],
    title: 'Grondwateronttrekking — Zandruggebied',
    description:
      'Diep grondwater wordt onttrokken voor drinkwater en agrarische beregening. De zandrug fungeert als infiltratiegebied dat het diepe grondwater aanvult. Overmatige onttrekking verlaagt de grondwaterstand en kan natuur- en landbouwschade veroorzaken.',
    policyGoals: [
      'Duurzame onttrekking binnen herlaadcapaciteit van het systeem',
      'Monitoring grondwaterstand en -kwaliteit',
      'Vergunningenstelsel voor grote onttrekkingen',
    ],
    challenges: [
      'Toenemende droogte vermindert herlaad van het grondwater',
      'Concurrentie tussen drinkwater, landbouw en natuur',
      'Slagingsdiepte van putten neemt toe',
    ],
    measures: [
      'Aquifer Storage & Recovery (ASR)',
      'Optimalisatie onttrekkingsregime',
      'Uitbreiding infiltratiecapaciteit',
      'Monitoring netwerk versterken',
    ],
    kpis: [
      { label: 'Onttrekkingsdepth', value: '42', unit: 'm-mv', trend: 'down', good: true },
      { label: 'Jaaronttrekking', value: '12.4', unit: 'Mm³/jr', trend: 'stable', good: true },
      { label: 'Grondwaterstand', value: '-3.2', unit: 'm NAP', trend: 'down', good: false },
    ],
    linkedElements: ['groundwater-zone', 'soil-aquifer'],
  },
  {
    id: 'nature-zone-hotspot',
    x: 6,
    y: 45,
    label: 'Natuur\ngebied',
    themes: ['nature', 'groundwater', 'sustainability'],
    title: 'Natte Natuurgebied — Zandrug & Flank',
    description:
      'Het natte natuurgebied op de flanken van de zandrug is afhankelijk van kwelwater vanuit de zandrug. Zeldzame beekdalvegetaties en fauna zijn gebonden aan de specifieke hydrologische omstandigheden: kweldruk, lage mineralenconcentraties en stabiele temperatuur.',
    policyGoals: [
      'Behoud en herstel van kwelafhankelijke natuur',
      'Realisatie KRW-doelen voor ecologische kwaliteit',
      'Verbinding van natte natuurgebieden (NNN)',
    ],
    challenges: [
      'Verdroging door verlaagde grondwaterstand',
      'Vermesting vanuit aangrenzende landbouw',
      'Klimaatverandering beïnvloedt kwelpatronen',
    ],
    measures: [
      'Peilverhoging beekdal en flanken',
      'Bufferzone instellen rond kwelgebieden',
      'Herstel beekdalhoofdstructuur',
      'Vernatten voormalige landbouwgronden',
    ],
    kpis: [
      { label: 'Kwelflux', value: '0.8', unit: 'mm/dag', trend: 'down', good: false },
      { label: 'Ecologische kwaliteit', value: 'Matig', unit: 'KRW-klasse', trend: 'stable', good: false },
      { label: 'Aandeel nat', value: '68', unit: '%', trend: 'up', good: true },
    ],
  },
  {
    id: 'brook-valley-hotspot',
    x: 30,
    y: 58,
    label: 'Beekdal',
    sublabel: 'Zandbeek',
    themes: ['nature', 'waterquality', 'agriculture', 'drought'],
    title: 'Beekdal & Zandbeek',
    description:
      'De zandbeek is de levensader van het beekdallandschap. De beek voert water af uit het hogergelegen zandruggebied naar de lagergelegen polder. Het beekdal heeft een rijke biodiversiteit en is kwetsbaar voor lage afvoeren in droge perioden en vervuiling vanuit landbouw.',
    policyGoals: [
      'Goede ecologische toestand (KRW)',
      'Herstel meanderend beekloop',
      'Minimale ecologische afvoer garanderen',
    ],
    challenges: [
      'Lage zomerafvoer door droogte en onttrekking',
      'Nutriëntenbelasting vanuit landbouw',
      'Gestuwd beekpeil beïnvloedt ecologie',
      'Maaibeleid en oevervegetatie',
    ],
    measures: [
      'Hermeandering en natuurvriendelijke oevers',
      'Instelling ecologisch streefpeil',
      'Bufferstroken langs de beek verplichten',
      'Aanleggen van retentiegebieden in beekdal',
    ],
    kpis: [
      { label: 'Zomerafvoer', value: '0.12', unit: 'm³/s', trend: 'down', good: false },
      { label: 'Fosfaat', value: '0.18', unit: 'mg P/l', trend: 'down', good: true },
      { label: 'EKR macrofyten', value: '0.42', unit: 'score', trend: 'up', good: true },
    ],
  },
  {
    id: 'agricultural-west-hotspot',
    x: 21,
    y: 48,
    label: 'Landbouw\nwest',
    themes: ['agriculture', 'waterquality', 'drought', 'sustainability'],
    title: 'Landbouwgebied — Hogere Zandgronden',
    description:
      'Intensieve akkerbouw en melkveehouderij op de hogere zandgronden zijn sterk afhankelijk van grondwater voor beregening in droge zomers. De lichte, goed doorlatende grond is droogtegevoelig maar ook kwetsbaar voor uitspoeling van nitraten en gewasbeschermingsmiddelen.',
    policyGoals: [
      'Toekomstbestendige landbouw op droogtegevoelige gronden',
      'Vermindering nutriëntenbelasting oppervlaktewater',
      'Verbetering bodemkwaliteit en organische stof',
    ],
    challenges: [
      'Droogteschade bij lage grondwaterstanden',
      'Beregening vergroot concurrentie om grondwater',
      'Nitraatuitspoeling naar grondwater en beek',
      'Economische druk op boeren',
    ],
    measures: [
      'Waterbeschikbaarheidskaart droogtestress',
      'Stimulering droogtestolerante gewassen',
      'Precisielandbouw voor waterefficiëntie',
      'Gebiedsgerichte aanpak nutriënten',
    ],
    kpis: [
      { label: 'Beregening', value: '38', unit: '%', trend: 'up', good: false },
      { label: 'Nitraat grondwater', value: '42', unit: 'mg NO₃/l', trend: 'down', good: true },
      { label: 'Droogteschade', value: 'Hoog', unit: 'risico', trend: 'stable', good: false },
    ],
  },
  {
    id: 'retention-basin-hotspot',
    x: 38,
    y: 52,
    label: 'Retentie\ngebied',
    themes: ['flood', 'drought', 'climate', 'nature', 'resilience'],
    title: 'Waterretentiegebied',
    description:
      'Het retentiegebied slaat regenwater op tijdens natte perioden en benut dit water in droge perioden voor landbouw en natuur. Het is een klimaatbuffer die zowel wateroverlast als droogte helpt mitigeren — een sleutelelement in het adaptieve watersysteem.',
    policyGoals: [
      'Piekberging bij extreme neerslag',
      'Waterconservering voor droge perioden',
      'Ecologische meerwaarde door natte natuur',
    ],
    challenges: [
      'Grondverwerving voor uitbreiding',
      'Beheer en onderhoud van in- en uitlaatwerken',
      'Wateraanvoer garanderen in droge zomers',
    ],
    measures: [
      'Uitbreiding retentiecapaciteit tot 2,4 Mm³',
      'Koppeling aan droogte-monitoringsysteem',
      'Inrichten als nevengeul / zoetwatergetij',
      'Participatief beheer met agrariërs',
    ],
    kpis: [
      { label: 'Bergingscapaciteit', value: '1.8', unit: 'Mm³', trend: 'up', good: true },
      { label: 'Bezettingsgraad', value: '74', unit: '%', trend: 'stable', good: true },
      { label: 'Piekdemping', value: '35', unit: '%', trend: 'up', good: true },
    ],
  },
  {
    id: 'urban-area-hotspot',
    x: 56,
    y: 49,
    label: 'Stedelijk\ngebied',
    themes: ['urban', 'climate', 'waterquality', 'resilience'],
    title: 'Stedelijk Watersysteem',
    description:
      'In het stedelijk gebied komen alle wateruitdagingen samen: wateroverlast bij hevige neerslag, hittestress, verdroging van stedelijk groen, en lozingen op het oppervlaktewater. Blauw-groene infrastructuur maakt de stad klimaatrobuust en leefbaar.',
    policyGoals: [
      'Klimaatadaptieve stad: 60mm/uur opvangen zonder wateroverlast',
      'Reductie uitstoot ongezuiverd rioolwater',
      'Verharding verminderen, infiltratie stimuleren',
    ],
    challenges: [
      'Verouderde riolering bij extreme neerslag',
      'Hittestress in stenige omgeving',
      'Eigendomsverdeling (gemeente vs. waterschap)',
      'Microplastics en medicijnresten in afvalwater',
    ],
    measures: [
      'Groene daken en infiltratieperken',
      'Ontkoppeling hemelwater van riool',
      'Watergangen verbreden voor berging',
      'Smart monitoring peilbeheer',
    ],
    kpis: [
      { label: 'Verharding', value: '62', unit: '%', trend: 'down', good: true },
      { label: 'Riooloverstort', value: '8', unit: 'x/jr', trend: 'down', good: true },
      { label: 'Warmtestresspercelen', value: '23', unit: '%', trend: 'stable', good: false },
    ],
  },
  {
    id: 'rwzi-hotspot',
    x: 58.5,
    y: 44,
    label: 'RWZI',
    sublabel: 'Zuivering',
    themes: ['circularity', 'waterquality', 'energy', 'sustainability'],
    title: 'Rioolwaterzuiveringsinstallatie (RWZI)',
    description:
      'De RWZI zuivert het afvalwater van 120.000 inwoners en het bedrijventerrein. Naast schoon effluent worden biogas, fosfaat en warmte teruggewonnen. De RWZI is een grondstoffenfabriek die evolueert naar een energie- en nutriëntenterugwinstation.',
    policyGoals: [
      'Energieneutrale RWZI in 2026',
      'Fosfaatterugwinning als struviet (100% doel)',
      'Microverontreinigingen verwijderen (4e trap)',
    ],
    challenges: [
      'Verwijdering opkomende stoffen (PFAS, geneesmiddelen)',
      'Schommelende influent-samenstelling',
      'Vergrijzing van de installaties',
      'Stijgende energiekosten',
    ],
    measures: [
      'Thermische drukhydrolyse voor slibgisting',
      'Aanleg 4e-traps zuivering voor microverontreinigingen',
      'Warmtepompen op teruggewonnen warmte',
      'Struvietprecipitatie uitbreiden',
    ],
    kpis: [
      { label: 'Energieterugwinning', value: '88', unit: '%', trend: 'up', good: true },
      { label: 'Fosfaatverwijdering', value: '94', unit: '%', trend: 'up', good: true },
      { label: 'Effluentkwaliteit', value: 'Goed', unit: 'KRW', trend: 'stable', good: true },
      { label: 'Capaciteit', value: '120', unit: 'k.i.e.', trend: 'stable', good: true },
    ],
    linkedElements: ['rwzi', 'effluent-pipe', 'energy-recovery'],
  },
  {
    id: 'polder-hotspot',
    x: 71,
    y: 54,
    label: 'Polder',
    themes: ['flood', 'agriculture', 'climate', 'groundwater'],
    title: 'Poldergebied — Laaglandlandbouw',
    description:
      'De polder ligt beneden zeeniveau en is volledig afhankelijk van actief waterbeheer: bemalings- en inlaatwerken houden het waterpeil op het juiste niveau voor landbouw. Klimaatverandering vergroot zowel de wateroverschotten als de tekorten.',
    policyGoals: [
      'Optimaal peilbeheer voor landbouw en ecologie',
      'Reductie bodemdaling door veenoxidatie',
      'Klimaatrobuust polderwatersysteem',
    ],
    challenges: [
      'Bodemdaling door veenoxidatie bij lage waterpeilen',
      'Zilte kwel toenemend door zeespiegelstijging',
      'Hoge energiekosten voor bemaling',
      'Zoetwaterbeschikbaarheid in droge perioden',
    ],
    measures: [
      'Peilverhoging in veengebieden (onderwaterdrainage)',
      'Zoetwaterinlaat optimaliseren',
      'Zoutmonitoring in polderwater',
      'Energielevering uit windenergie',
    ],
    kpis: [
      { label: 'Bodemdaling', value: '6', unit: 'mm/jr', trend: 'stable', good: false },
      { label: 'Chloride', value: '180', unit: 'mg/l', trend: 'up', good: false },
      { label: 'Bemalingsenergie', value: '2.4', unit: 'GWh/jr', trend: 'stable', good: false },
    ],
  },
  {
    id: 'dike-hotspot',
    x: 82,
    y: 46,
    label: 'Primaire\nwaterkering',
    themes: ['flood', 'climate', 'resilience'],
    title: 'Primaire Waterkering — Zeewering',
    description:
      'De primaire waterkering beschermt het achterliggende poldersysteem tegen overstromingen vanuit zee. Bij de huidige zeespiegelstijging worden dijken verhoogd en versterkt als onderdeel van het Hoogwaterbeschermingsprogramma (HWBP). Innovatieve dijkconcepten combineren veiligheid met ecologie.',
    policyGoals: [
      'Voldoen aan wettelijke veiligheidsnormen (Overstromingsrisicobeheer)',
      'Dijkversterking HWBP 2025-2031',
      'Meekoppelen natuur, recreatie en energieopwekking',
    ],
    challenges: [
      'Zeespiegelstijging versnelt (KNMI 2023: +1m in 2100)',
      'Dijkverzwaring in bebouwde omgeving',
      'Behoud ecologische waarden bij versterking',
      'Zettingsrisico op slappe ondergrond',
    ],
    measures: [
      'Gecombineerde kering (harde+zachte) innovatie',
      'Zandige oplossingen (zandmotor, strand supletie)',
      'Dijkvernating en biogeense oesters als oeverbescherming',
      'Realtimemonitoring waterstanden en piping',
    ],
    kpis: [
      { label: 'Veiligheidsklasse', value: '1/10.000', unit: 'jaar', trend: 'stable', good: true },
      { label: 'Faalkans', value: '< 1/300', unit: '/jr', trend: 'stable', good: true },
      { label: 'Geplande versterking', value: '18', unit: 'km', trend: 'up', good: true },
    ],
  },
  {
    id: 'pumping-station-hotspot',
    x: 73.5,
    y: 53,
    label: 'Gemaal',
    themes: ['flood', 'energy', 'resilience'],
    title: 'Hoofdgemaal — Polderboezem',
    description:
      'Het gemaal slaat polderwater over de waterkering heen naar de boezem en vervolgens naar zee of rivier. Bij extreme neerslag of hoog buitenwater is het gemaal cruciaal voor de waterafvoer. Moderne gemalen zijn uitgerust met energieopwekkende turbines bij verval.',
    policyGoals: [
      'Voldoende capaciteit bij extreme neerslag',
      'Energieneutraal gemaal door turbineopwekking',
      'Redundantie en uitwijkmogelijkheden bij uitval',
    ],
    challenges: [
      'Groter peilverschil door zeespiegelstijging',
      'Energiebehoefte stijgt bij meer extreme buien',
      'Veroudering mechanische installaties',
    ],
    measures: [
      'Capaciteitsuitbreiding gemaal +20%',
      'Plaatsing turbines voor energieopwekking',
      'Smart control op basis van weersverwachting',
      'Noodaggregaat en UPS-systeem',
    ],
    kpis: [
      { label: 'Pompercapaciteit', value: '480', unit: 'm³/min', trend: 'up', good: true },
      { label: 'Energieopwekking', value: '180', unit: 'MWh/jr', trend: 'up', good: true },
      { label: 'Beschikbaarheid', value: '99.7', unit: '%', trend: 'stable', good: true },
    ],
  },
]

export const getHotspotById = (id: string): Hotspot | undefined =>
  hotspots.find((h) => h.id === id)
