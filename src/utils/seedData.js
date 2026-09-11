// Données de démarrage : reprend exactement le contenu actuellement en dur
// dans le frontend (vehicles.js, Services.jsx) pour que la bascule vers la
// base de données ne perde aucune information.
//
// Les images pointent vers les fichiers déjà déployés sur
// https://terratransport-sa.com/images/... (ceux qui sont dans public/images
// sur le frontend). Une fois la base de données en place, tu pourras
// remplacer chacune individuellement par un upload Cloudinary depuis
// l'admin, à ton rythme — rien ne casse en attendant.

const BASE = 'https://terratransport-sa.com'

const camionNames = {
  1: 'Sinotruk Howo — Benne 8x4',
  2: 'Shacman — Benne longue',
  3: 'Shacman F3000 — Tracteur benne',
  4: 'Sinotruk Howo — Cabine avant',
  5: 'Shacman — Benne (vue latérale)',
  6: 'Sinotruk Howo NX — Benne',
  7: 'Sinotruk Howo — Benne (vue arrière)',
  8: 'Sinotruk Howo — Benne acier',
}

export function buildSeedVehicles() {
  const vehicles = []

  // 22 camions bennes
  for (let i = 1; i <= 22; i++) {
    const idx = String(i).padStart(2, '0')
    vehicles.push({
      name: camionNames[i] || `Camion Terratransport — Modèle ${i}`,
      category: 'camions',
      image: `${BASE}/images/camions/camion-${idx}.jpg`,
      specs: ['Benne', 'Flotte Terratransport'],
      order: i,
    })
  }

  // Camions citernes gasoil
  const citernesGasoil = [
    {
      n: 1,
      title: 'Camion citerne gasoil — 35 000 L',
      desc: "Une configuration pensée pour les grands volumes sur les axes principaux. Sa capacité élevée et sa robustesse en font une solution adaptée aux rotations longue distance et à l'approvisionnement régulier des dépôts et plateformes logistiques.",
      specs: ['Gasoil', '35 000 L', '8x4', 'Euro 3 / Euro 5'],
    },
    {
      n: 2,
      title: 'Camion citerne gasoil — 24 000 L / 10 T',
      desc: "Une configuration intermédiaire, équilibrée entre capacité de chargement et souplesse d'exploitation. Idéale pour desservir les stations-service et les sites industriels sur des itinéraires réguliers.",
      specs: ['Gasoil', '24 000 L', '10 T', '8x4'],
    },
    {
      n: 3,
      title: 'Camion citerne gasoil — 22 000 L / 10 T',
      desc: 'Une configuration compacte à haut débit de déchargement, particulièrement adaptée à la distribution locale et aux livraisons fréquentes sur des sites aux accès plus contraints.',
      specs: ['Gasoil', '22 000 L', '10 T', '6x4 · 12 roues'],
    },
    {
      n: 4,
      title: 'Camion citerne gasoil — 45 000 L / 13 T',
      desc: 'La configuration la plus volumineuse de notre flotte, conçue pour les opérations de grande envergure — approvisionnement de sites miniers isolés, centrales industrielles et contrats dédiés nécessitant des volumes importants par rotation.',
      specs: ['Gasoil', '45 000 L', '13 T', '8x4'],
    },
  ]
  for (const c of citernesGasoil) {
    const idx = String(c.n).padStart(2, '0')
    vehicles.push({
      name: c.title,
      category: 'citernes',
      product: 'Gasoil',
      description: c.desc,
      image: `${BASE}/images/citernes/citerne-${idx}.jpg`,
      specs: c.specs,
      order: c.n,
    })
  }

  // Camions citernes fioul
  vehicles.push(
    {
      name: 'Camion citerne fioul',
      category: 'citernes',
      product: 'Fioul',
      image: `${BASE}/images/citernes/citerne-05.jpg`,
      specs: ['Fioul', 'Semi-remorque citerne'],
      order: 5,
    },
    {
      name: 'Camion citerne fioul (vue arrière)',
      category: 'citernes',
      product: 'Fioul',
      image: `${BASE}/images/citernes/citerne-06.jpg`,
      specs: ['Fioul', 'Semi-remorque citerne'],
      order: 6,
    }
  )

  // Autocars
  const bus = [
    { n: 1, name: 'Yutong — Autocar grand tourisme', specs: ['Sièges inclinables', 'Climatisation'] },
    { n: 2, name: 'Yutong — Autocar 33 places', specs: ['33 places', 'Confort longue distance'] },
    { n: 3, name: 'Yutong — Autocar (vue 3/4)', specs: ['Porte automatique', 'Vitres teintées'] },
    { n: 4, name: 'Yutong — Autocar 53 places', specs: ['53 places', 'Toilettes à bord'] },
    { n: 5, name: 'Yutong — Autocar (façade)', specs: ['Châssis surbaissé', 'Rétroviseurs chauffants'] },
    { n: 6, name: 'Yutong — Autocar rouge', specs: ['Livrée disponible', 'Grande soute à bagages'] },
  ]
  for (const b of bus) {
    const idx = String(b.n).padStart(2, '0')
    vehicles.push({
      name: b.name,
      category: 'bus',
      image: `${BASE}/images/bus/bus-${idx}.jpg`,
      specs: b.specs,
      order: b.n,
    })
  }

  return vehicles
}

export function buildSeedServices() {
  return [
    {
      title: 'Industrie mobile & exploitation minière',
      description:
        "Camions bennes renforcés, engins et véhicules robustes pensés pour les sites miniers et les chantiers du continent — le cœur de notre activité : une industrie mobile fiable pour l'exploitation minière en Afrique.",
      image: `${BASE}/images/camions/camion-01.jpg`,
      icon: 'Mountain',
      order: 1,
    },
    {
      title: "Transport d'hydrocarbures",
      description:
        "Camions citernes spécialisés — essence, gasoil, kérosène — conçus autour de trois exigences : sécurité renforcée, fiabilité opérationnelle et grands volumes sur des trajets exigeants en Afrique de l'Ouest.",
      image: `${BASE}/images/citernes/citerne-01.jpg`,
      icon: 'Fuel',
      link: '/hydrocarbures',
      linkLabel: 'Voir le dossier technique',
      order: 2,
    },
    {
      title: 'Vente de véhicules',
      description:
        'Camions bennes, autocars et véhicules particuliers, sélectionnés pour leur fiabilité et adaptés aux réalités du terrain africain, miniers comme routiers.',
      image: `${BASE}/images/camions/camion-04.jpg`,
      icon: 'Truck',
      order: 3,
    },
    {
      title: 'Solutions intermodales',
      description:
        'Mer, rail, route : nous coordonnons chaque maillon du transport pour que votre matériel ou votre marchandise arrive à destination sans rupture de charge.',
      image: `${BASE}/images/bus/bus-04.jpg`,
      icon: 'Ship',
      order: 4,
    },
    {
      title: 'Logistique personnalisée',
      description:
        "De la commande à la livraison, nous concevons un parcours logistique adapté à votre exploitation, votre volume et vos délais, partout où votre activité opère en Afrique.",
      image: `${BASE}/images/camions/camion-02.jpg`,
      icon: 'Route',
      order: 5,
    },
  ]
}

export function buildSeedContent() {
  return [
    {
      key: 'home.hero.title',
      page: 'home',
      label: 'Titre principal (hero)',
      type: 'text',
      value: "Terratransport, une industrie mobile pour l'exploitation minière en Afrique.",
    },
    {
      key: 'home.hero.subtitle',
      page: 'home',
      label: 'Sous-titre (hero)',
      type: 'richtext',
      value:
        "Camions, engins et véhicules pensés pour l'exploitation minière et les chantiers du continent — vente, location et solutions logistiques, au service des opérateurs miniers et industriels africains.",
    },
    {
      key: 'home.mission.text',
      page: 'home',
      label: 'Mission',
      type: 'richtext',
      value:
        "Mettre une industrie mobile fiable — camions, engins et équipements — au service de l'exploitation minière en Afrique, avec un accompagnement logistique de bout en bout, de la sélection du matériel jusqu'à sa mise en exploitation sur site.",
    },
    {
      key: 'home.vision.text',
      page: 'home',
      label: 'Vision',
      type: 'richtext',
      value:
        "Devenir l'industrie mobile de référence pour l'exploitation minière à travers le continent africain — le partenaire vers qui se tournent naturellement les opérateurs miniers qui ont besoin de matériel solide et d'un service qui tient ses engagements.",
    },
    {
      key: 'home.objectifs.text',
      page: 'home',
      label: 'Objectifs',
      type: 'richtext',
      value:
        "Élargir notre réseau auprès des sociétés minières du continent, diversifier notre flotte de camions et d'équipements dédiés à l'exploitation minière, et renforcer nos capacités de financement et d'acheminement pour accompagner nos clients, site après site, pays après pays.",
    },
    {
      key: 'about.mission.paragraph1',
      page: 'about',
      label: 'À propos — Mission, paragraphe 1',
      type: 'richtext',
      value:
        "Terratransport & Industrie Mobile met une industrie mobile fiable — camions, engins et équipements — au service de l'exploitation minière en Afrique. Nous accompagnons les opérateurs miniers, ainsi que les entreprises de BTP et de transport, dans l'acquisition et l'exploitation de leur matériel, et dans la mise en place de solutions logistiques adaptées au terrain africain.",
    },
    {
      key: 'hydrocarbures.hero.title',
      page: 'hydrocarbures',
      label: 'Titre principal',
      type: 'text',
      value: "L'énergie en mouvement, au Sénégal et dans la sous-région.",
    },
    {
      key: 'hydrocarbures.intro.paragraph1',
      page: 'hydrocarbures',
      label: 'Introduction, paragraphe 1',
      type: 'richtext',
      value:
        "Terratransport est une entreprise spécialisée dans le transport routier et la logistique des produits pétroliers et hydrocarbures, avec une ambition claire : devenir un partenaire de référence pour l'approvisionnement en carburants au Sénégal et la desserte des marchés de la sous-région ouest-africaine.",
    },
  ]
}
