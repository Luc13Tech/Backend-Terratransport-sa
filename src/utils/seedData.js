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

export function buildSeedPartners() {
  return [
    { name: 'Sinotruk', order: 1 },
    { name: 'Shacman', order: 2 },
    { name: 'Yutong', order: 3 },
    { name: 'HOWO', order: 4 },
  ]
}

export function buildSeedContent() {
  return [
    // --- HOME ---
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
      key: 'home.route.depart',
      page: 'home',
      label: 'Parcours — Départ (Votre demande)',
      type: 'richtext',
      value:
        "Vous nous décrivez votre besoin — type de camion ou d'engin, tonnage, site minier ou chantier de destination, contraintes de terrain. Que vous soyez opérateur minier, entreprise de BTP ou transporteur, nous prenons le temps de comprendre votre exploitation avant de vous répondre.",
    },
    {
      key: 'home.route.transit',
      page: 'home',
      label: 'Parcours — Transit (Notre expertise)',
      type: 'richtext',
      value:
        "Nous sélectionnons le véhicule ou l'équipement le plus adapté à votre exploitation réelle, puis nous structurons le financement, les formalités et l'acheminement jusqu'à votre site.",
    },
    {
      key: 'home.route.arrivee',
      page: 'home',
      label: 'Parcours — Arrivée (Livraison)',
      type: 'richtext',
      value:
        "Le suivi ne s'arrête pas à la remise des clés. Nous restons disponibles après la livraison pour répondre à toute question d'exploitation, où que vous soyez sur le continent.",
    },

    // --- ABOUT ---
    {
      key: 'about.hero.title',
      page: 'about',
      label: 'Titre principal',
      type: 'text',
      value: "Terratransport — une industrie mobile pour l'exploitation minière en Afrique.",
    },
    {
      key: 'about.mission.paragraph1',
      page: 'about',
      label: 'Mission — paragraphe 1',
      type: 'richtext',
      value:
        "Terratransport & Industrie Mobile met une industrie mobile fiable — camions, engins et équipements — au service de l'exploitation minière en Afrique. Nous accompagnons les opérateurs miniers, ainsi que les entreprises de BTP et de transport, dans l'acquisition et l'exploitation de leur matériel, et dans la mise en place de solutions logistiques adaptées au terrain africain.",
    },
    {
      key: 'about.mission.paragraph2',
      page: 'about',
      label: 'Mission — paragraphe 2',
      type: 'richtext',
      value:
        "Notre ambition est simple : être reconnus partout où l'exploitation minière a besoin d'un partenaire fiable pour son industrie mobile — pas seulement dans un pays, mais à l'échelle du continent.",
    },
    {
      key: 'about.energie.title',
      page: 'about',
      label: "L'énergie en mouvement — titre",
      type: 'text',
      value: "L'énergie en mouvement, au Sénégal et dans la sous-région.",
    },
    {
      key: 'about.energie.paragraph1',
      page: 'about',
      label: "L'énergie en mouvement — paragraphe 1",
      type: 'richtext',
      value:
        "Terratransport est également spécialisée dans le transport routier et la logistique des produits pétroliers et hydrocarbures, avec une ambition claire : devenir un partenaire de référence pour l'approvisionnement en carburants au Sénégal et la desserte des marchés de la sous-région ouest-africaine.",
    },
    {
      key: 'about.energie.paragraph2',
      page: 'about',
      label: "L'énergie en mouvement — paragraphe 2",
      type: 'richtext',
      value:
        "Grâce à une approche fondée sur la sécurité, la fiabilité, la ponctualité et la performance logistique, nous accompagnons les distributeurs pétroliers, sociétés minières, industriels, entreprises de BTP, opérateurs énergétiques, stations-service et grands consommateurs dans leurs besoins d'acheminement de carburants.",
    },
    {
      key: 'about.couverture.paragraph1',
      page: 'about',
      label: 'Couverture régionale — paragraphe',
      type: 'richtext',
      value:
        "Notre activité couvre le transport et l'acheminement de produits pétroliers depuis les points de chargement, dépôts et plateformes logistiques vers les sites de consommation et de distribution. Au Sénégal, Terratransport ambitionne de développer une couverture nationale permettant de desservir efficacement les principaux pôles économiques, industriels, miniers et énergétiques. Notre stratégie s'étend également aux corridors internationaux reliant le Sénégal aux principaux marchés de la sous-région.",
    },
    {
      key: 'about.couverture.corridor',
      page: 'about',
      label: 'Couverture régionale — note corridor',
      type: 'richtext',
      value:
        "Le corridor Dakar–Mali constitue un axe stratégique pour les échanges régionaux et l'approvisionnement du Mali, pays enclavé.",
    },
    {
      key: 'about.engagement.title',
      page: 'about',
      label: 'Engagement — titre',
      type: 'text',
      value: 'Sécurité, traçabilité et performance.',
    },
    {
      key: 'about.engagement.paragraph1',
      page: 'about',
      label: 'Engagement — paragraphe 1',
      type: 'richtext',
      value:
        "Le transport d'hydrocarbures exige un niveau élevé de maîtrise opérationnelle. Chez Terratransport, nous plaçons la sécurité des personnes, des produits, des véhicules et des opérations — ainsi que la protection de l'environnement — au cœur de notre organisation.",
    },
    {
      key: 'about.engagement.paragraph2',
      page: 'about',
      label: 'Engagement — paragraphe 2',
      type: 'richtext',
      value:
        "Au Sénégal, les dispositions applicables au transport des produits pétroliers prévoient notamment des exigences de licence et de traçabilité des livraisons. Terratransport inscrit donc son développement dans une démarche de conformité avec les exigences réglementaires et les standards de sécurité applicables.",
    },
    {
      key: 'about.vision.paragraph1',
      page: 'about',
      label: 'Vision — paragraphe',
      type: 'richtext',
      value:
        "Notre ambition est de construire progressivement un réseau logistique reliant le Sénégal aux principaux marchés de la sous-région, en nous appuyant sur une flotte performante, des équipes qualifiées, des partenaires fiables et une organisation orientée vers la sécurité et la satisfaction client.",
    },
    {
      key: 'about.valeur.reactivite',
      page: 'about',
      label: 'Valeur — Réactivité',
      type: 'text',
      value: 'Une demande, une réponse rapide — sans intermédiaire superflu.',
    },
    {
      key: 'about.valeur.reseau',
      page: 'about',
      label: 'Valeur — Réseau',
      type: 'text',
      value: 'Un ancrage panafricain, pensé pour accompagner nos clients où que leur activité les mène sur le continent.',
    },
    {
      key: 'about.valeur.tracabilite',
      page: 'about',
      label: 'Valeur — Traçabilité',
      type: 'text',
      value: "Un suivi clair de votre commande, du premier échange à la livraison.",
    },

    // --- HYDROCARBURES ---
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
      label: 'Introduction — paragraphe 1',
      type: 'richtext',
      value:
        "Terratransport est une entreprise spécialisée dans le transport routier et la logistique des produits pétroliers et hydrocarbures, avec une ambition claire : devenir un partenaire de référence pour l'approvisionnement en carburants au Sénégal et la desserte des marchés de la sous-région ouest-africaine.",
    },
    {
      key: 'hydrocarbures.intro.paragraph2',
      page: 'hydrocarbures',
      label: 'Introduction — paragraphe 2',
      type: 'richtext',
      value:
        "Grâce à une approche fondée sur la sécurité, la fiabilité, la ponctualité et la performance logistique, nous accompagnons les distributeurs pétroliers, sociétés minières, industriels, entreprises de BTP, opérateurs énergétiques, stations-service et grands consommateurs dans leurs besoins d'acheminement de carburants.",
    },
    {
      key: 'hydrocarbures.couverture.title',
      page: 'hydrocarbures',
      label: 'Couverture régionale — titre',
      type: 'text',
      value: "Une logistique pensée pour les enjeux énergétiques de l'Afrique de l'Ouest.",
    },
    {
      key: 'hydrocarbures.couverture.paragraph1',
      page: 'hydrocarbures',
      label: 'Couverture régionale — paragraphe 1',
      type: 'richtext',
      value:
        "Notre activité couvre le transport et l'acheminement de produits pétroliers depuis les points de chargement, dépôts et plateformes logistiques vers les sites de consommation et de distribution. Au Sénégal, Terratransport ambitionne de développer une couverture nationale permettant de desservir efficacement les principaux pôles économiques, industriels, miniers et énergétiques.",
    },
    {
      key: 'hydrocarbures.solutions.carburants',
      page: 'hydrocarbures',
      label: 'Solution — Transport de carburants',
      type: 'richtext',
      value:
        "Des solutions de transport par camions-citernes hydrocarbures, adaptées aux différents volumes et aux contraintes opérationnelles des clients.",
    },
    {
      key: 'hydrocarbures.solutions.minier',
      page: 'hydrocarbures',
      label: 'Solution — Logistique minière',
      type: 'richtext',
      value:
        "Des solutions dédiées aux mines, carrières et grands projets industriels, avec des plans de transport adaptés aux contraintes des sites isolés, aux longues distances et aux besoins réguliers en carburant.",
    },
    {
      key: 'hydrocarbures.solutions.transfrontalier',
      page: 'hydrocarbures',
      label: 'Solution — Transport transfrontalier',
      type: 'richtext',
      value:
        "Renforcer les corridors logistiques entre le Sénégal et les pays voisins pour faciliter la circulation des produits énergétiques dans la sous-région.",
    },
    {
      key: 'hydrocarbures.engagement.paragraph1',
      page: 'hydrocarbures',
      label: 'Engagement sécurité — paragraphe',
      type: 'richtext',
      value:
        "Le transport d'hydrocarbures exige un niveau élevé de maîtrise opérationnelle. Chez Terratransport, nous plaçons la sécurité au cœur de notre organisation.",
    },
    {
      key: 'hydrocarbures.vision.paragraph1',
      page: 'hydrocarbures',
      label: 'Vision — paragraphe',
      type: 'richtext',
      value:
        "Notre ambition est de construire progressivement un réseau logistique reliant le Sénégal aux principaux marchés de la sous-région, en nous appuyant sur une flotte performante, des équipes qualifiées, des partenaires fiables et une organisation orientée vers la sécurité et la satisfaction client.",
    },

    // --- PARTNERS ---
    {
      key: 'partners.intro.paragraph1',
      page: 'partners',
      label: 'Introduction',
      type: 'richtext',
      value:
        "Terratransport travaille avec des constructeurs et partenaires financiers sélectionnés pour la fiabilité de leurs véhicules et la qualité de leur accompagnement.",
    },
    {
      key: 'partners.devenir.paragraph1',
      page: 'partners',
      label: 'Devenir partenaire',
      type: 'richtext',
      value:
        "Vous représentez une flotte ou un réseau de distribution ? Parlons d'une collaboration adaptée à votre marché.",
    },
  ]
}

