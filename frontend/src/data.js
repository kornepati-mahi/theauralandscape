/* ------------------------------------------------------------------
   Star Landscape — central content & asset registry
   All imagery is served from the official Star Landscape media library.
   ------------------------------------------------------------------- */

const MEDIA = 'https://static.wixstatic.com/media/';

export const img = (file) => `${MEDIA}${file}`;

export const BRAND = {
  name: 'The Aura Landscape Co.',
  tagline: 'Landscaping Design & Maintenance Services',
  logo: '/the-aura-logo-dark.png',
  logoWhite: '/the-aura-logo-white.png',
  logoDark: '/the-aura-logo-dark.png',
  logoMark: '/the-aura-logo-white.png',
  phone: '+91 91106 49999',
  phoneHref: 'tel:+919110649999',
  email: 'info@starlandscape.com.sg',
  emailHref: 'mailto:info@starlandscape.com.sg',
  whatsapp: 'https://wa.me/919110649999',
  whatsappNumber: '919110649999',
  address: '111 Somerset Road, #15-18, Singapore 238164',
  addressShort: '111 Somerset Road, Singapore 238164',
  rating: '5.0',
  reviews: 23,
  facebook: 'https://www.facebook.com/profile.php?id=61595705712204',
  instagram: 'https://www.instagram.com/the_auralandscape/',
  twitter: 'https://twitter.com/starlandscape25',
  awardLogo: `${MEDIA}a95b81_55d41b1636a245afb153687703f01fb1~mv2.png`,
};

/* ------------------------- Navigation drawer ------------------------- */

export const NAV_LINKS = [
  { id: 'home', label: 'Home', target: '#home' },
  { id: 'about', label: 'About Us', target: '#about' },
  { id: 'design', label: 'Landscape Design', service: 'design' },
  { id: 'maintenance', label: 'Landscape Maintenance', service: 'maintenance' },
  { id: 'paludarium', label: 'Paludarium and Terrarium', service: 'paludarium' },
  { id: 'irrigation', label: 'Irrigation Systems', service: 'irrigation' },
  { id: 'greenwall', label: 'Vertical Green Wall', service: 'greenwall' },
  { id: 'projects', label: 'Our Projects', target: '#projects' },
  { id: 'blog', label: 'Blog', target: '#blog' },
];

/* Compact top-bar links (desktop navigation) */
export const TOP_NAV = [
  { id: 'home', label: 'Home', target: '#home' },
  { id: 'about', label: 'About', target: '#about' },
  { id: 'services', label: 'Services', target: '#services' },
  { id: 'estimate', label: 'Estimate', target: '#estimate' },
  { id: 'projects', label: 'Projects', target: '#projects' },
  { id: 'testimonials', label: 'Reviews', target: '#testimonials' },
  { id: 'faq', label: 'FAQ', target: '#faq' },
];

/* ------------------------------ Hero -------------------------------- */

export const HERO = {
  badge: '#1 Rated Landscape Specialist in Singapore',
  headline: "Transform Your Outdoor Space With Singapore's Premier Landscape Company",
  subtitle:
    'Creating breathtaking natural sanctuaries, Zen meditation gardens, and lush urban biophilic spaces across Singapore.',
  background: `${MEDIA}cfa0a9_b9cf8d4d48b04de1b0a81366e8caee25~mv2.jpg`,
  highlights: [
    'BCA & NParks standard',
    '15 years in Singapore',
    '500+ gardens delivered',
  ],
};

export const STATS = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Gardens Built Island-Wide' },
  { value: 100, suffix: '%', label: 'Bespoke Design & Satisfaction' },
  { value: 5, decimals: 1, suffix: ' ★', label: 'Google Reviews Rating' },
];

/* ------------------------------ About ------------------------------- */

export const ABOUT = {
  eyebrow: 'About Star Landscape',
  title: 'Singapore’s most trusted hands in green design',
  body: [
    'Our mission at Star Landscape is simple: to provide high-quality landscaping design and maintenance services to our valued clients in Singapore. Our company goes above and beyond to cater to each project’s specific needs, offering custom designs to create the ideal garden of our client’s dreams.',
    'These are reflected by the many satisfied customers and beautiful spaces that we have designed over the years. Recognised as MediaOne’s top landscaping firm in Singapore, we look forward to serving you for many more years to come.',
  ],
  credentials: [
    'BCA Registered',
    'NParks Compliant',
    'In-house Crews',
    '5.0★ Google Rating',
  ],
  imageTall: `${MEDIA}6d6081_ab3236ec7b9640359ef316498ea1cfea~mv2.jpeg`,
  imageWide: `${MEDIA}a95b81_a95bcf2fe2c042db8eb2a492a2f29a20~mv2.jpeg`,
  gallery: [
    `${MEDIA}a95b81_a95bcf2fe2c042db8eb2a492a2f29a20~mv2.jpeg`,
    `${MEDIA}a95b81_909c936fc1d0480294128b6b4bdfb907~mv2.jpg`,
    `${MEDIA}a95b81_1ec2b81c314449af81983eabac21dd36~mv2.png`,
    `${MEDIA}a95b81_3827b6bde15043dbb0cef47d18056e5d~mv2.png`,
  ],
};

/* ---------------------------- Services ------------------------------ */

export const SERVICE_TABS = [
  { id: 'all', label: 'All Services' },
  { id: 'design', label: 'Design & Greening' },
  { id: 'build', label: 'Build & Systems' },
  { id: 'care', label: 'Care & Upkeep' },
];

/**
 * Service showcase — mirrors the live starlandscape.com.sg section:
 * a scrolling list on the left, a sticky image panel on the right.
 * `kicker` is the small SEO-style label above each title.
 */
export const SERVICES = [
  {
    id: 'design',
    tab: 'design',
    kicker: 'Singapore Landscape Company',
    title: 'Landscape Design',
    icon: 'PencilRuler',
    image: `${MEDIA}a95b81_1ec2b81c314449af81983eabac21dd36~mv2.png`,
    copy: 'By aiming to create award-winning landscaping designs that capture the client’s imaginations, we have made many beautiful thematic gardens that come included with features such as trellises, decking, and other custom & unique features.',
    points: ['Zen & Moon gardens', 'Butterfly & edible themes', '3D concept visualisation'],
    price: 'from $12 / sqft',
  },
  {
    id: 'maintenance',
    tab: 'care',
    kicker: 'Landscaping Singapore',
    title: 'Landscape Maintenance',
    icon: 'Shrub',
    image: `${MEDIA}a95b81_3827b6bde15043dbb0cef47d18056e5d~mv2.png`,
    copy: 'Landscape maintenance isn’t just about keeping weeds and pests away. It’s a delicate art that strives to do all that while keeping your landscapes healthy, safe, and attractive at the same time.',
    points: ['Fortnightly schedules', 'Tree trimming & shaping', 'Pest & soil care'],
    price: 'from $180 / month',
  },
  {
    id: 'paludarium',
    tab: 'design',
    kicker: 'Singapore Landscaping',
    title: 'Paludarium and Terrarium',
    icon: 'Waves',
    image: `${MEDIA}a95b81_ba6f1e6805334f4b8cd0d82e351fa23b~mv2.png`,
    copy: 'Have us custom design an excellent paludarium or terrarium that matches the aesthetic of your green space. These water features add unique depth that any one-of-a-kind landscape can’t do without.',
    points: ['Custom water features', 'Indoor & outdoor', 'Bespoke glasswork'],
    price: 'from $1,800',
  },
  {
    id: 'irrigation',
    tab: 'build',
    kicker: 'Landscape Company Irrigation',
    title: 'Irrigation Systems',
    icon: 'Droplets',
    image: `${MEDIA}a95b81_0df34c26aec04fc79405de7ab686c703~mv2.png`,
    copy: 'Our water management systems are second to none with excellent product performance, diverse applications, and easy installation. These create a hassle-free ecosystem that requires minimal maintenance to upkeep your pristine landscape.',
    points: ['Smart Wi-Fi timers', 'Micro-drip lines', '50% water savings'],
    price: 'from $8 / sqft',
  },
  {
    id: 'greenwall',
    tab: 'design',
    kicker: 'Landscape Company Singapore Green',
    title: 'Vertical Green Wall',
    icon: 'LayoutGrid',
    image: `${MEDIA}a95b81_1322ece0598a4951a7fc00d840eac6d0~mv2.png`,
    copy: 'Integrating nature into our modern spaces has been a theme of the 21st century, and we believe that a creatively built green wall can breathe life into an otherwise mundane vertical space. Talk to any one of our professional designers to see how we can fit one into your living space today.',
    points: ['Modular panels', 'Auto sub-irrigation', 'Indoor & outdoor'],
    price: 'from $42 / sqft',
  },
];

/* ------------------------- Process (new) ----------------------------- */

export const PROCESS_STEPS = [
  {
    id: 'visit',
    title: 'Free Site Visit',
    icon: 'MapPin',
    copy: 'We walk your space, measure it properly, and talk through what you actually want to live in — not just what looks good in a photo.',
  },
  {
    id: 'design',
    title: '3D Concept & Planting Plan',
    icon: 'PencilRuler',
    copy: 'You see scale-accurate renders, a sun/shade study and a full planting schedule before a single stone is ordered.',
  },
  {
    id: 'build',
    title: 'Fixed-Price Build',
    icon: 'Hammer',
    copy: 'One price, one crew, one timeline. Our in-house carpenters and horticulturists handle it start to finish.',
  },
  {
    id: 'care',
    title: 'Ongoing Care',
    icon: 'Sprout',
    copy: 'Fortnightly visits, seasonal pruning and WhatsApp photo updates — so your garden stays beautiful after handover.',
  },
];

/* ---------------------------- Estimator ----------------------------- */

export const PROPERTY_TYPES = [
  { id: 'landed', label: 'Landed House', multiplier: 1 },
  { id: 'condo', label: 'Condo / Balcony', multiplier: 0.85 },
  { id: 'commercial', label: 'Commercial', multiplier: 1.3 },
  { id: 'bungalow', label: 'Bungalow', multiplier: 1.25 },
];

export const ESTIMATE_SERVICES = [
  { id: 'estimate-design', label: 'Landscape Design', rate: 16, weeks: [2, 4] },
  { id: 'estimate-deck', label: 'Wooden Decking', rate: 38, weeks: [2, 3] },
  { id: 'estimate-turf', label: 'Turf / Grass', rate: 19, weeks: [1, 2] },
  { id: 'estimate-wall', label: 'Green Wall', rate: 42, weeks: [2, 4] },
  { id: 'estimate-full', label: 'Full Package', rate: 55, weeks: [4, 8] },
];

/* --------------------------- Before / After ------------------------- */

export const BEFORE_AFTER = {
  title: 'Kings Mansion — Bukit Timah',
  subtitle:
    'An overgrown roadside frontage re-landscaped with layered hedging, ixora masses and specimen trees — start to finish in 3 weeks.',
  before: `${MEDIA}cfa0a9_af74bd9486bc4c98adaa1202abc7023b~mv2.jpg`,
  after: `${MEDIA}cfa0a9_e1e2767ade3a429f8a27bf7b16a32657~mv2.jpg`,
};

/* ---------------------------- Projects ------------------------------ */

export const PROJECT_TABS = [
  { id: 'all', label: 'All' },
  { id: 'landed', label: 'Landed Estates' },
  { id: 'condo', label: 'Condo Balconies' },
  { id: 'commercial', label: 'Commercial Rooftops' },
  { id: 'deck', label: 'Wooden Decks' },
];

export const PROJECTS = [
  {
    id: 'telok-kurau',
    title: 'Telok Kurau Passage Garden',
    location: 'East Coast',
    category: 'landed',
    image: `${MEDIA}a5399d_86dd819f76b74653a0354d8f41c9fc2d~mv2.jpg`,
    note: 'Full passage re-greening with shade-tolerant understorey planting.',
  },
  {
    id: 'springleaf',
    title: 'Springleaf Drive Lawn & Hedging',
    location: 'Upper Thomson',
    category: 'landed',
    image: `${MEDIA}a5399d_bba728e1996742e69a015c68f574eb46~mv2.jpg`,
    note: 'Rolling lawn, clipped hedges and a monsoon-drained border bed.',
  },
  {
    id: 'sunset-way',
    title: 'Sunset Way Tropical Frontage',
    location: 'Clementi',
    category: 'landed',
    image: `${MEDIA}a5399d_41faf77569ec4d3fba9e7d24c180707a~mv2.jpg`,
    note: 'Layered tropical palette with year-round flowering colour.',
  },
  {
    id: 'kings-mansion',
    title: 'Kings Mansion Roadside Greenery',
    location: 'Bukit Timah',
    category: 'landed',
    image: `${MEDIA}a5399d_dfd74645e6334bc4866fb52af3d8acf2~mv2.jpg`,
    note: 'Specimen trees and ixora masses framing a grand frontage.',
  },
  {
    id: 'margate',
    title: 'MArgate Road Family Garden',
    location: 'Holland',
    category: 'landed',
    image: `${MEDIA}a5399d_77a6d1419337493e95f140d2a805556d~mv2.jpeg`,
    note: 'Soft-fall play lawn, herb pockets and low-maintenance planting.',
  },
  {
    id: 'dairy-farm',
    title: 'Dairy Farm Hill Nature Play',
    location: 'Hillview',
    category: 'landed',
    image: `${MEDIA}a5399d_00a9495292cb4287811624ab15920efc~mv2.jpg`,
    note: 'Timber climbing frame over a shaded, all-weather play lawn.',
  },
  {
    id: 'cyan-condo',
    title: 'Cyan Condo Balcony Retreat',
    location: 'River Valley',
    category: 'condo',
    image: `${MEDIA}a5399d_b64a25fc7b13473baa7b39d768636bc3~mv2.jpg`,
    note: 'Balcony micro-garden with composite deck and wall planters.',
  },
  {
    id: 'onan-road',
    title: 'Onan Road Vertical Greenery',
    location: 'Novena',
    category: 'condo',
    image: `${MEDIA}a5399d_988b0a075cc34a599376d6393a88f21e~mv2.jpg`,
    note: 'Modular living wall turning a narrow balcony into a green room.',
  },
  {
    id: 'scotts-tower',
    title: 'Scotts Tower Sky Garden',
    location: 'Orchard',
    category: 'condo',
    image: `${MEDIA}a5399d_94cb9c0e5f8a44e4960cf4352b672226~mv2.jpg`,
    note: 'High-rise planter boxes with drip-fed tropical understorey.',
  },
  {
    id: 'preschool',
    title: 'Little Big Preschool Play Garden',
    location: 'Toa Payoh',
    category: 'commercial',
    image: `${MEDIA}a5399d_aefa408a53ba4842926c5baf5ff17202~mv2.jpg`,
    note: 'Safe, durable turf and sensory planting for curious learners.',
  },
  {
    id: 'rooftop-planter',
    title: 'Rooftop Planter Box Garden',
    location: 'Tampines',
    category: 'commercial',
    image: `${MEDIA}a5399d_c42d9cfdd29e497388c84baf850da701~mv2.jpg`,
    note: 'Lightweight planter system engineered for rooftop wind loads.',
  },
  {
    id: 'clementi-woods',
    title: 'Clementi Woods Boundary Greening',
    location: 'West Region',
    category: 'commercial',
    image: `${MEDIA}a5399d_1c4e0302c81642f0904c507720fa4acf~mv2.jpg`,
    note: 'Native buffer planting stabilising a sloped site edge.',
  },
  {
    id: 'the-eden',
    title: 'The Eden Corporate Green Wall',
    location: 'Marina Bay',
    category: 'commercial',
    image: `${MEDIA}a5399d_d3df1b820aa14bc68003b2ad16a1b5f1~mv2.jpg`,
    note: 'A 40m² living wall anchoring a client’s lobby reception.',
  },
  {
    id: 'cascadia-deck',
    title: 'The Cascadia Terrace Deck',
    location: 'West Coast',
    category: 'deck',
    image: `${MEDIA}a5399d_0b7d42f5d34b4949967acfd839cc3ae1~mv2.jpg`,
    note: 'Chengal hardwood terrace with integrated planter boxes.',
  },
  {
    id: 'wpc-deck',
    title: 'Composite WPC Decking Lounge',
    location: 'Serangoon',
    category: 'deck',
    image: `${MEDIA}a5399d_cb0b4d04716a43e7a5daea8e63bee8f5~mv2.jpg`,
    note: 'Splinter-free WPC deck built for monsoon poolside wear.',
  },
  {
    id: 'sentosa-cove',
    title: 'Sentosa Cove Pool Deck',
    location: 'Sentosa',
    category: 'deck',
    image: `${MEDIA}a5399d_bcdf8eac9279458fb12585097ef86ed4~mv2.jpg`,
    note: 'Salt-resistant hardwood surround with a coastal planting palette.',
  },
];

/* ------------------------------ Blog -------------------------------- */

export const POSTS = [
  {
    id: 'decking-guide',
    category: 'Decking',
    title: 'Chengal vs WPC Decking: Which Survives the Singapore Monsoon?',
    excerpt:
      'Hardwood character or composite durability? A horticulture-and-carpentry view on what really lasts through 2,400mm of annual rain.',
    readTime: '6 min read',
    date: 'Oct 2026',
    image: `${MEDIA}6d6081_c70bd29bb7c24566b6c2dad2e066579d~mv2.jpeg`,
    body: [
      'Singapore delivers around 2,400mm of rain a year, but it arrives in bursts rather than as a steady drizzle. That single fact decides the decking question. A hardwood deck that drains well survives; one that pools water at the frame joints starts to rot from underneath long before the surface boards tell you anything is wrong.',
      'Chengal is the traditional answer — dense, oily, naturally resistant to termites and fungi, and it ages to a silver-grey that most owners come to love. The catch is the price, and the fact that it moves. Boards need to breathe, which means wider gaps, a ventilated substructure and a deck that is never sealed right up against a wall.',
      'WPC composite decking trades character for predictability. It does not rot, does not split, and does not need annual sealing, and it handles the wet-dry hammering of a monsoon month better than most tropical hardwoods. What you give up is the feel underfoot and the way the surface softens with age.',
      'Our recommendation for most landed homes: chengal for the visible deck surface, WPC for hidden framing and for anything close to the ground, and a fall of at least 1:80 across the whole platform so that water never sits still. Get the fall right and the material choice matters far less than people expect.',
    ],
  },
  {
    id: 'water-saving',
    category: 'Irrigation',
    title: '5 Water-Saving Irrigation Habits for Condo Balconies',
    excerpt:
      'Micro-drip zoning, moisture sensors and 6am watering windows — how our clients cut balcony water bills by half without a single brown leaf.',
    readTime: '4 min read',
    date: 'Sep 2026',
    image: `${MEDIA}a95b81_ba6f1e6805334f4b8cd0d82e351fa23b~mv2.png`,
    body: [
      'A balcony garden is a closed system with no natural rainfall buffer and a building manager who will notice a wet wall. Yet most balcony irrigation in Singapore is a hose on a timer, and it is the reason so many planters look either drowned or parched.',
      'Zone it properly. Group plants with the same thirst — thirsty herbs and ferns on one circuit, succulents and woody species on another — and you can water one without over-watering the other. Micro-drip lines put the water where the roots are instead of washing the potting mix off the balcony edge.',
      'Water at 6am. Wind is at its lowest, evaporation is negligible, and any leaf that does get wet has the whole day to dry before the afternoon shower arrives. A night-time schedule is the worst of both worlds: still air, no wind, maximum humidity.',
      'Finish with a moisture sensor in the largest planter and a simple rule: the system may skip a cycle, never add one. Skipping a cycle saves water without stressing the plant; adding a cycle is what kills roots. Most of our balcony clients cut their water bill by roughly half in the first year and replace almost nothing.',
    ],
  },
  {
    id: 'zen-garden',
    category: 'Design',
    title: 'Designing a Zen Meditation Garden in a Landed Backyard',
    excerpt:
      'Raked gravel, night-blooming jasmine and the moon-garden planting list that turns an HDB-era backyard into a quiet retreat.',
    readTime: '7 min read',
    date: 'Sep 2026',
    image: `${MEDIA}6d6081_ab3236ec7b9640359ef316498ea1cfea~mv2.jpeg`,
    body: [
      'A zen garden is not a style you apply to a lawn — it is a garden built around a single idea, and in Singapore the hardest part is keeping that idea intact under 2,400mm of annual rain and no winter at all.',
      'Start with the ground plane. Raked gravel or a bed of fine pebbles gives you the horizon that the rest of the design reads against, and it gives you a surface that can be re-levelled every few weeks without disturbing anything. Keep the gravel in a defined basin with a concealed drain so that monsoon runoff leaves cleanly instead of carrying fines across the garden.',
      'Plant for the light, not the mood. In our Singapore zen gardens the planting is deliberately sparse: a clipped evergreen mass, one sculptural tree, and a ground layer of ferns and mosses that tolerate shade and humidity. Anything that needs full sun and dry air simply does not belong here.',
      'Add scent at dusk and the space changes completely. Night-blooming jasmine, tuberose and a little star jasmine trained over a wall give you a garden that rewards the hour when most people are indoors. We design these to be maintained fortnightly — raked, swept, pruned — because a zen garden that is not raked is just a gravel yard.',
    ],
  },
  {
    id: 'green-wall-care',
    category: 'Vertical Green',
    title: 'How to Keep a Living Wall Alive Through Singapore Heat',
    excerpt:
      'Sub-irrigation reservoirs, pH balance and the two-hour weekly check that stops 60% of green walls from failing in year one.',
    readTime: '5 min read',
    date: 'Aug 2026',
    image: `${MEDIA}a95b81_5d45cc244e0f4660ab9839393fc2b59f~mv2.png`,
    body: [
      'A living wall fails in year one for one reason: the plants were chosen for how they look in a photograph, not for how they cope with a panel that reaches 35°C on the shaded side and loses moisture to the air on the other. Specify for the wall, not the catalogue.',
      'Sub-irrigation changes everything. A reservoir at the base of each panel stores water and wicks it upward as the felt dries, so the root zone stays evenly moist instead of swinging between bone-dry and waterlogged. It also means you are watering the wall weekly rather than daily, and that a two-day absence does not kill it.',
      'Watch the pH. Cocopeat and peat-based mixes acidify over time in our humidity, and once the pH drops below 5.5 the wall stops looking tired and starts losing species. A monthly flush with a clean, mild nutrient solution keeps the mix open and the wall growing.',
      'Then spend two hours a week looking at it. That is the real maintenance schedule, and it is why our maintenance contracts include a fortnightly photo report: wilt that starts at the top of a panel is a fertiliser or light problem, wilt that starts at the bottom is a drainage problem. Catching that difference in week three costs a bucket of water. Catching it in month six costs the panel.',
    ],
  },
  {
    id: 'turf-vs-real',
    category: 'Lawn',
    title: 'Real Grass vs Synthetic Turf: The Honest Cost Comparison',
    excerpt:
      'We install both. Here is the five-year maths — including water, labour, fertiliser and replacement — that most homeowners actually face.',
    readTime: '8 min read',
    date: 'Aug 2026',
    image: `${MEDIA}a5399d_7574f63e0f6d40b68a22d9b8173bb55a~mv2.jpg`,
    body: [
      'We install both, so here is the comparison we actually give clients — the five-year numbers, not the showroom ones.',
      'Real grass in Singapore is a maintenance contract, not a surface. It needs mowing roughly every four to five days, fertiliser six times a year, a heavy irrigation allowance through the dry months, and a team on site two or three times a week. It also needs a serious drainage plan, because turf in a wet climate fails at the roots long before it fails visibly.',
      'Synthetic turf costs far less to keep and gives you a surface that stays usable through a downpour. What it costs you is heat. A west-facing lawn in synthetic turf can reach 60°C, which means it works in the shade and fails in the sun — the opposite of how most people picture the trade-off.',
      'The honest answer depends on your household. For a family with young children and a shaded north-facing lawn, turf wins on enjoyment. For a corner terrace that is only ever used in the evening, synthetic wins on every practical measure. If you are genuinely undecided, we will show you both on a sample plot before you commit.',
    ],
  },
  {
    id: 'edible-garden',
    category: 'Edible',
    title: 'A Practical Edible Garden for Singapore’s Equatorial Sun',
    excerpt:
      'Which herbs, leafy greens and fruit trees genuinely fruit here — and the shade cloth strategy that doubles your yield.',
    readTime: '6 min read',
    date: 'Jul 2026',
    image: `${MEDIA}a95b81_1ec2b81c314449af81983eabac21dd36~mv2.png`,
    body: [
      'Most edible gardens in Singapore fail because the planting list was written for a temperate climate. The vegetables that perform here are the ones that evolved in the tropics — and they need afternoon shade that the seed packet never mentions.',
      'What genuinely fruits in Singapore: mango, starfruit, passionfruit, dragon fruit, papaya, banana, jambu and citrus in the ground; Thai basil, coriander, mint, curry leaf, pandan and Vietnamese coriander in the beds. Leafy greens need the most help — lettuce and pak choi bolt within a fortnight of a heat spike.',
      'Shade cloth is the single biggest yield lever. A 40–50% shade cloth over the beds from 11am cuts midday heat stress dramatically and can double a leafy crop. Water in the early morning, mulch with coconut coir or compost, and feed every six weeks with a balanced fertiliser.',
      'Plan the space by height, not by rows. Put the tall fruit trees on the north and west edges so they shade without shading the crops, keep the herbs in the open where they get airflow, and reserve the wettest corner for the greens. Plant in modules you can swap out every quarter, and you will keep the harvest going year-round.',
    ],
  },
];

/* --------------------------- Testimonials --------------------------- */

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Wei Ling Tan',
    context: 'Landed homeowner, Bukit Timah',
    rating: 5,
    text: 'Star Landscape turned a concrete backyard into a Zen meditation garden our whole family uses daily. The 3D concept matched the finished build almost exactly — and it was ready before the promised date.',
  },
  {
    id: 't2',
    name: 'Rajesh Menon',
    context: 'Sentosa Cove waterfront villa',
    rating: 5,
    text: 'The Chengal deck and smart irrigation they installed have survived two monsoon seasons without a single issue. Crew was punctual, tidy and genuinely knowledgeable about plants that thrive by the sea.',
  },
  {
    id: 't3',
    name: 'Claire Chua',
    context: 'Corner terrace, East Coast',
    rating: 5,
    text: 'We have used their maintenance plan for three years. Fortnightly visits without fail, WhatsApp updates after every visit, and our lawn has never looked better. Worth every dollar.',
  },
  {
    id: 't4',
    name: 'Daniel Lim',
    context: 'Rooftop office, Orchard Road',
    rating: 5,
    text: 'From NParks compliance paperwork to the final planter install, everything was handled for us. Our rooftop is now the feature clients ask about in every meeting.',
  },
  {
    id: 't5',
    name: 'Priya Raman',
    context: 'Condo balcony, Novena',
    rating: 5,
    text: 'Our 120 sqft balcony looked hopeless until they suggested a vertical green wall instead of planters. It is a jungle now, and the maintenance team keeps it that way.',
  },
  {
    id: 't6',
    name: 'Marcus Wong',
    context: 'Café owner, Tiong Bahru',
    rating: 5,
    text: 'They built our outdoor dining garden over two weekends with zero disruption to trading. Customers photograph it. Best marketing spend we never planned for.',
  },
];

export const REVIEW_META = {
  score: '5.0',
  outOf: '5.0',
  count: 23,
};

/* ------------------------------ FAQ ---------------------------------- */

export const FAQS = [
  {
    q: 'How much does a garden design cost in Singapore?',
    a: 'Most landed-home landscape projects start around $12 per square foot, while full build-out packages with decking, irrigation and planting typically run $38–$55 per square foot. Use the estimator above for an instant ballpark, then book a free site visit for a fixed-price proposal.',
  },
  {
    q: 'Is the free site visit really free, with no obligation?',
    a: 'Yes. The initial consultation is a 45-minute visit with one of our senior landscapers. We measure the space, discuss planting options and leave behind a written proposal. There is no obligation and no sales pressure — roughly a third of visitors do not proceed, and that is completely fine.',
  },
  {
    q: 'How long does a typical residential project take?',
    a: 'A frontage re-landscape is usually 2–3 weeks, a full backyard transformation 4–6 weeks, and a rooftop or commercial build 6–8 weeks. We will always give you a fixed timeline before work starts, and we have a strong track record of finishing early.',
  },
  {
    q: 'Do you handle NParks and BCA paperwork?',
    a: 'Yes. We are a BCA-registered contractor and our planting schedules comply with NParks guidelines for both private and public-facing works. We prepare and submit the paperwork on your behalf as part of the build.',
  },
  {
    q: 'Will my plants survive Singapore’s heavy rain and sun?',
    a: 'Every planting plan is designed for the equatorial climate — high-humidity species, generous drainage zones, and soil profiles matched to rainfall intensity. We also include a 90-day plant-replacement guarantee, so if anything struggles we come back and make it right.',
  },
  {
    q: 'Can you maintain a garden you did not design?',
    a: 'Absolutely. Our maintenance service works on any garden, whether we built it or not. A site visit takes about 45 minutes and we will send you a photo report and a plant-health note after every single visit.',
  },
];
