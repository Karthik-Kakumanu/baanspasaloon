// Centralized Asset Manifest for BAAN Salon, Beauty & Spa
// High-resolution, appropriately licensed imagery selected to match the reference composition

const unsplash = (id: string, width = 1200, height?: number) => {
  const hParam = height ? `&h=${height}` : '';
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}${hParam}&q=85`;
};

export const IMAGES = {
  // Brand Logo
  logo: '/images/baanb-logo.png',

  // Hero Section
  heroSpaTreatment: unsplash('photo-1544161515-4ab6ce6db874', 1200, 800), // Calm massage with warm lighting
  heroVideoPoster: unsplash('photo-1600334089648-b0d9d3028eb2', 1200, 800), // Quiet luxury spa arrival

  // Atmospheric Section Breaks
  oceanWaveBanner: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&h=600&q=85', // Coastal waves aerial shot matching reference
  oceanWaveAlternative: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&h=600&q=85',

  // About Page Photography
  aboutHero: unsplash('photo-1540555700478-4be289fbecef', 1200, 800),
  aboutTrio1: unsplash('photo-1515377905703-c4788e51af15', 800, 1200), // Therapist hands / preparation
  aboutTrio2: unsplash('photo-1556760544-74068565f05c', 800, 1200), // Aromatic warm oil bottles
  aboutTrio3: unsplash('photo-1570172619644-dfd03ed5d881', 800, 1200), // Serene herbal treatment
  aboutVideoPoster: unsplash('photo-1560066984-138dadb4c035', 1200, 700),

  // Services Page Photography
  servicesHero: unsplash('photo-1540555700478-4be289fbecef', 1200, 800),
  
  // Specific Treatment Cards (High fidelity matching reference cards)
  treatments: {
    volcanoStone: unsplash('photo-1600334129128-685c5582fd35', 800, 550), // Hot volcanic stones
    swedishBliss: unsplash('photo-1544161515-4ab6ce6db874', 800, 550), // Deep massage
    deepRejuvenation: unsplash('photo-1519823551278-64ac92734fb1', 800, 550), // Deep tissue relief
    tropicalWrap: unsplash('photo-1552693673-1bf958298935', 800, 550), // Body scrub & polish
    coupleEscape: unsplash('photo-1540555700478-4be289fbecef', 800, 550), // Couple candles & retreat
    kansaHealing: unsplash('photo-1512290900672-1f5be1c66f6c', 800, 550), // Foot / herbal ritual
    islandGlowFacial: unsplash('photo-1570172619644-dfd03ed5d881', 800, 550), // Radiant facial
    herbalKizhi: unsplash('photo-1506126613408-eca07ce68773', 800, 550), // Warm herbal poultice
    headNeckSoul: unsplash('photo-1522337360788-8b13dee7a37e', 800, 550), // Head & scalp therapy
    footReflexology: unsplash('photo-1515377905703-c4788e51af15', 800, 550), // Foot reflexology
    bambooVitality: unsplash('photo-1544161515-4ab6ce6db874', 800, 550), // Bamboo body therapy
    signatureHair: unsplash('photo-1560066984-138dadb4c035', 800, 550), // Couture hair design
    botanicalKeratin: unsplash('photo-1522337360788-8b13dee7a37e', 800, 550), // Hair smoothing ritual
    handsFeetRenewal: unsplash('photo-1604654894610-df63bc536371', 800, 550), // Manicure & pedicure
    aromaticEssence: unsplash('photo-1608248597359-29170a4bcfa2', 800, 550), // Aromatherapy oils
  },

  // Membership Page Photography
  membershipHero: unsplash('photo-1519823551278-64ac92734fb1', 1200, 800),

  // Franchise Page Photography
  franchiseHero: unsplash('photo-1560066984-138dadb4c035', 1200, 800),

  // Virtual Tour & Spaces Gallery
  virtualTourHero: unsplash('photo-1540555700478-4be289fbecef', 1200, 800),
  spaces: [
    { title: 'The Reception & Welcome Lounge', category: 'Spaces', image: unsplash('photo-1600334089648-b0d9d3028eb2', 1200, 800) },
    { title: 'Signature Couple Therapy Suite', category: 'Suites', image: unsplash('photo-1540555700478-4be289fbecef', 1200, 800) },
    { title: 'Aromatic Steam & Hydrotherapy Room', category: 'Wellness', image: unsplash('photo-1583416750470-965b2707b355', 1200, 800) },
    { title: 'Bespoke Hair Styling Atelier', category: 'Salon', image: unsplash('photo-1560066984-138dadb4c035', 1200, 800) },
    { title: 'Quiet Relaxation Terrace', category: 'Spaces', image: unsplash('photo-1515377905703-c4788e51af15', 1200, 800) },
    { title: 'Ayurvedic Treatment Chamber', category: 'Suites', image: unsplash('photo-1544161515-4ab6ce6db874', 1200, 800) },
  ],

  // Contact Page
  contactHero: unsplash('photo-1570172619644-dfd03ed5d881', 1200, 800),
  contactOilPour: unsplash('photo-1608248597359-29170a4bcfa2', 800, 1000), // Warm oil pouring close-up

  // Blog Photography
  blog: {
    matchingTherapies: unsplash('photo-1544161515-4ab6ce6db874', 800, 500),
    spaCostGuide: unsplash('photo-1540555700478-4be289fbecef', 800, 500),
    aromatherapyVsHotOil: unsplash('photo-1608248597359-29170a4bcfa2', 800, 500),
  }
};
