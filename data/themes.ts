export interface ThemeConnection {
  from: string
  to: string
  label?: string
}

export interface Theme {
  id: string
  label: string
  labelNL: string
  icon: string
  color: string
  gradient: [string, string]
  description: string
  policyGoal: string
  highlightedElements: string[]
  connections: ThemeConnection[]
}

export const themes: Theme[] = [
  {
    id: 'agriculture',
    label: 'Agriculture',
    labelNL: 'Landbouw',
    icon: '🌾',
    color: '#8BC34A',
    gradient: ['#8BC34A', '#558B2F'],
    description: 'Sustainable agriculture in balance with the water system, addressing drought stress, soil quality, and water use efficiency.',
    policyGoal: 'Viable agriculture through sustainable water management and climate adaptation.',
    highlightedElements: ['agricultural-west', 'agricultural-east', 'brook-valley', 'groundwater-zone', 'retention-basin', 'extraction-well-inland', 'groundwater-table', 'soil-topsoil', 'soil-sand'],
    connections: [
      { from: 'agricultural-west', to: 'groundwater-zone', label: 'Grondwaterafhankelijkheid' },
      { from: 'agricultural-east', to: 'retention-basin', label: 'Waterberging' },
      { from: 'brook-valley', to: 'agricultural-west', label: 'Beekpeil' },
      { from: 'extraction-well-inland', to: 'agricultural-west', label: 'Beregening' },
    ],
  },
  {
    id: 'nature',
    label: 'Nature',
    labelNL: 'Natuur',
    icon: '🌿',
    color: '#4CAF50',
    gradient: ['#66BB6A', '#2E7D32'],
    description: 'Healthy nature areas with thriving ecosystems, including brook valleys, wetlands, and riparian zones dependent on natural water dynamics.',
    policyGoal: 'Nature-inclusive water management that supports biodiversity and natural processes.',
    highlightedElements: ['nature-zone', 'brook-valley', 'brook-stream', 'groundwater-zone', 'soil-peat', 'retention-basin'],
    connections: [
      { from: 'nature-zone', to: 'brook-valley', label: 'Nat habitat' },
      { from: 'groundwater-zone', to: 'nature-zone', label: 'Kwel / seepage' },
      { from: 'brook-stream', to: 'brook-valley', label: 'Beekdynamiek' },
    ],
  },
  {
    id: 'urban',
    label: 'Urban Area',
    labelNL: 'Stedelijk',
    icon: '🏙️',
    color: '#78909C',
    gradient: ['#90A4AE', '#455A64'],
    description: 'Climate-adaptive urban areas where water is stored, infiltrated, and reused. Green-blue infrastructure prevents flooding and heat stress.',
    policyGoal: 'Climate-resilient cities with robust storm water management and reduced heat island effect.',
    highlightedElements: ['urban-area', 'rwzi', 'storm-drain', 'retention-basin', 'groundwater-zone'],
    connections: [
      { from: 'urban-area', to: 'rwzi', label: 'Afvalwater' },
      { from: 'urban-area', to: 'storm-drain', label: 'Hemelwater' },
      { from: 'storm-drain', to: 'retention-basin', label: 'Waterberging' },
    ],
  },
  {
    id: 'groundwater',
    label: 'Groundwater',
    labelNL: 'Grondwater',
    icon: '💧',
    color: '#2196F3',
    gradient: ['#42A5F5', '#0D47A1'],
    description: 'Groundwater is the foundation of our water system. Extraction, recharge, seepage, and groundwater levels affect agriculture, nature, and urban areas.',
    policyGoal: 'Healthy groundwater system with sustainable extraction and natural recharge.',
    highlightedElements: ['groundwater-zone', 'groundwater-table', 'soil-aquifer', 'soil-saturated', 'extraction-well-inland', 'extraction-well-urban', 'infiltration-zone', 'seepage-zone'],
    connections: [
      { from: 'extraction-well-inland', to: 'groundwater-zone', label: 'Onttrekking' },
      { from: 'infiltration-zone', to: 'groundwater-zone', label: 'Infiltratie' },
      { from: 'groundwater-zone', to: 'seepage-zone', label: 'Kwel' },
      { from: 'soil-aquifer', to: 'extraction-well-urban', label: 'Diepe onttrekking' },
    ],
  },
  {
    id: 'climate',
    label: 'Climate Adaptation',
    labelNL: 'Klimaatadaptatie',
    icon: '🌡️',
    color: '#FF9800',
    gradient: ['#FFA726', '#E65100'],
    description: 'Preparing for more extreme weather: prolonged droughts, intense rainfall, heat waves, and sea level rise all require adaptive measures.',
    policyGoal: 'Climate-resilient water system that can handle both extremes: drought and floods.',
    highlightedElements: ['retention-basin', 'urban-area', 'agricultural-east', 'dike', 'sea-zone', 'brook-valley', 'nature-zone', 'polder'],
    connections: [
      { from: 'sea-zone', to: 'dike', label: 'Zeespiegelstijging' },
      { from: 'retention-basin', to: 'agricultural-east', label: 'Wateropslag' },
      { from: 'urban-area', to: 'retention-basin', label: 'Waterberging stad' },
      { from: 'brook-valley', to: 'nature-zone', label: 'Natte buffer' },
    ],
  },
  {
    id: 'circularity',
    label: 'Circularity',
    labelNL: 'Circulariteit',
    icon: '♻️',
    color: '#9C27B0',
    gradient: ['#AB47BC', '#4A148C'],
    description: 'Water and nutrient circularity: from wastewater to energy recovery, nutrient recapture, water reuse, and sludge valorization.',
    policyGoal: 'Full circularity of water, energy, and nutrients within the water cycle.',
    highlightedElements: ['rwzi', 'effluent-pipe', 'brook-stream', 'energy-recovery', 'nutrient-recovery'],
    connections: [
      { from: 'urban-area', to: 'rwzi', label: 'Afvalwater input' },
      { from: 'rwzi', to: 'energy-recovery', label: 'Biogas' },
      { from: 'rwzi', to: 'nutrient-recovery', label: 'Struviet / fosfaat' },
      { from: 'rwzi', to: 'effluent-pipe', label: 'Effluent' },
      { from: 'effluent-pipe', to: 'brook-stream', label: 'Lozing' },
    ],
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    labelNL: 'Duurzaamheid',
    icon: '🌱',
    color: '#00BCD4',
    gradient: ['#26C6DA', '#006064'],
    description: 'Long-term sustainability of our water system through emission reduction, energy neutrality, nature-based solutions, and healthy soil systems.',
    policyGoal: 'Energy-neutral, climate-positive water management by 2030.',
    highlightedElements: ['rwzi', 'energy-recovery', 'nature-zone', 'agricultural-west', 'soil-topsoil', 'brook-valley'],
    connections: [
      { from: 'rwzi', to: 'energy-recovery', label: 'Energieterugwinning' },
      { from: 'nature-zone', to: 'brook-valley', label: 'NBS' },
      { from: 'agricultural-west', to: 'soil-topsoil', label: 'Bodemkwaliteit' },
    ],
  },
  {
    id: 'waterquality',
    label: 'Water Quality',
    labelNL: 'Waterkwaliteit',
    icon: '🔬',
    color: '#03A9F4',
    gradient: ['#29B6F6', '#01579B'],
    description: 'Clean water for people, nature, and agriculture. Reducing pollutants, pharmaceuticals, microplastics, nutrients, and pathogens from surface and groundwater.',
    policyGoal: 'Good ecological and chemical water quality in all water bodies (KRW targets).',
    highlightedElements: ['brook-stream', 'rwzi', 'effluent-pipe', 'polder', 'groundwater-zone', 'soil-topsoil', 'agricultural-west'],
    connections: [
      { from: 'agricultural-west', to: 'brook-stream', label: 'Uitspoeling' },
      { from: 'rwzi', to: 'effluent-pipe', label: 'Zuivering' },
      { from: 'effluent-pipe', to: 'brook-stream', label: 'Lozing' },
      { from: 'brook-stream', to: 'groundwater-zone', label: 'Infiltratie' },
    ],
  },
  {
    id: 'flood',
    label: 'Flood Protection',
    labelNL: 'Hoogwaterbescherming',
    icon: '🛡️',
    color: '#F44336',
    gradient: ['#EF5350', '#B71C1C'],
    description: 'Protecting people and assets from flooding through dikes, retention areas, flood plains, and smart water level management.',
    policyGoal: 'Flood-safe region that meets all legal safety standards and anticipates future sea level rise.',
    highlightedElements: ['dike', 'sea-zone', 'polder', 'retention-basin', 'pumping-station'],
    connections: [
      { from: 'sea-zone', to: 'dike', label: 'Golfaanval' },
      { from: 'dike', to: 'polder', label: 'Bescherming' },
      { from: 'pumping-station', to: 'sea-zone', label: 'Uitslaan' },
      { from: 'retention-basin', to: 'polder', label: 'Piekopvang' },
    ],
  },
  {
    id: 'drought',
    label: 'Drought',
    labelNL: 'Droogte',
    icon: '☀️',
    color: '#FF5722',
    gradient: ['#FF7043', '#BF360C'],
    description: 'Managing water scarcity during prolonged dry periods: priority allocation, water retention, groundwater conservation, and drought monitoring.',
    policyGoal: 'Sufficient water during drought through smart storage, priority allocation, and demand reduction.',
    highlightedElements: ['agricultural-west', 'groundwater-zone', 'groundwater-table', 'extraction-well-inland', 'brook-stream', 'retention-basin', 'soil-sand'],
    connections: [
      { from: 'groundwater-table', to: 'agricultural-west', label: 'Droogtestress' },
      { from: 'retention-basin', to: 'agricultural-east', label: 'Droogtewater' },
      { from: 'extraction-well-inland', to: 'groundwater-zone', label: 'Overonttrekking' },
      { from: 'brook-stream', to: 'agricultural-west', label: 'Laagwaterafvoer' },
    ],
  },
  {
    id: 'energy',
    label: 'Energy',
    labelNL: 'Energie',
    icon: '⚡',
    color: '#FFEB3B',
    gradient: ['#FFEE58', '#F57F17'],
    description: 'Energy recovery from wastewater, thermal energy from surface water, and energy production from hydraulic infrastructure.',
    policyGoal: 'Energy-neutral water authority by 2025 through recovery and renewable generation.',
    highlightedElements: ['rwzi', 'energy-recovery', 'pumping-station'],
    connections: [
      { from: 'rwzi', to: 'energy-recovery', label: 'Slibgisting' },
      { from: 'pumping-station', to: 'energy-recovery', label: 'Turbine' },
    ],
  },
  {
    id: 'resilience',
    label: 'Resilience',
    labelNL: 'Weerbaarheid',
    icon: '🔄',
    color: '#673AB7',
    gradient: ['#7E57C2', '#311B92'],
    description: 'System resilience integrates all themes: a robust water system that can withstand shocks, recover quickly, and adapt to long-term change.',
    policyGoal: 'A resilient, future-proof water system that serves nature, agriculture, and society.',
    highlightedElements: ['dike', 'retention-basin', 'nature-zone', 'brook-valley', 'groundwater-zone', 'urban-area', 'rwzi', 'agricultural-west', 'agricultural-east', 'polder', 'soil-aquifer'],
    connections: [
      { from: 'nature-zone', to: 'groundwater-zone', label: 'Buffering' },
      { from: 'retention-basin', to: 'agricultural-east', label: 'Droogtebuffer' },
      { from: 'dike', to: 'polder', label: 'Hoogwaterbescherming' },
      { from: 'brook-valley', to: 'nature-zone', label: 'NBS' },
      { from: 'urban-area', to: 'retention-basin', label: 'Stedelijk water' },
    ],
  },
]

export const getThemeById = (id: string): Theme | undefined =>
  themes.find((t) => t.id === id)
