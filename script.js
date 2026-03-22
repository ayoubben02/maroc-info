const NEWS_CONFIG = {
  politique: {
    label: "Politique",
    icon: "bi-bank2",
    query: 'morocco (government OR parliament OR diplomacy OR reform OR policy)',
    fallback: "posts.json"
  },
  societe: {
    label: "Societe",
    icon: "bi-people",
    query: 'morocco (society OR education OR health OR housing OR social OR justice OR youth)'
  },
  economie: {
    label: "Economie",
    icon: "bi-graph-up-arrow",
    query: 'morocco (economy OR investment OR business OR finance OR industry OR market)'
  },
  sport: {
    label: "Sport",
    icon: "bi-trophy",
    query: 'morocco (sport OR football OR club OR tournament OR athlete)'
  },
  culture: {
    label: "Culture",
    icon: "bi-palette",
    query: 'morocco (culture OR festival OR heritage OR art OR cinema OR music)'
  },
  monde: {
    label: "Monde",
    icon: "bi-globe-europe-africa",
    query: 'morocco (international OR africa OR europe OR diplomacy OR global OR foreign affairs)'
  },
  regions: {
    label: "Regions",
    icon: "bi-geo-alt",
    query: 'morocco (casablanca OR rabat OR tangier OR marrakech OR fes OR agadir OR dakhla OR region)'
  },
  technologie: {
    label: "Technologie",
    icon: "bi-cpu",
    query: 'morocco (technology OR startup OR digital OR innovation OR AI OR telecom)'
  }
};

const LOCAL_FALLBACKS = {
  economie: [
    {
      title: "Investissements et dynamique industrielle",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Le flux API n'est pas disponible pour le moment. Cette carte de secours garde une presentation propre en attendant le prochain chargement."
    },
    {
      title: "Emploi, confiance et signaux de marche",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "La rubrique economie est prete a recevoir des articles en direct des qu'une reponse API valide est disponible."
    }
  ],
  sport: [
    {
      title: "Grandes competitions et audience populaire",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Le site essaie de charger des actualites sportives automatisees et bascule sur ce contenu de secours en cas d'echec."
    },
    {
      title: "Clubs, talents et rayonnement",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Cette carte sera remplacee automatiquement par des articles reels quand la source publique repondra."
    }
  ],
  culture: [
    {
      title: "Patrimoine, festivals et creation",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Le flux culture est automatise, avec un contenu local de repli pour eviter les pages vides."
    },
    {
      title: "Le recit culturel du Maroc",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Quand l'API est accessible, cette rubrique se met a jour sans intervention manuelle."
    }
  ],
  societe: [
    {
      title: "Education, sante et cohesion sociale",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "La rubrique societe garde une presence editoriale meme si les flux externes ralentissent."
    },
    {
      title: "Jeunesse, justice et services publics",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Cette carte de secours maintient la page active pendant les prochaines mises a jour."
    }
  ],
  monde: [
    {
      title: "Le Maroc dans les equilibres regionaux",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "La page monde suit la position du Maroc en Afrique, en Europe et sur les grands dossiers internationaux."
    },
    {
      title: "Diplomatie et partenariats globaux",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Du contenu de secours garde la rubrique visible lorsque les flux sont temporairement lents."
    }
  ],
  regions: [
    {
      title: "Territoires, villes et projets locaux",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "La rubrique regions met en avant les dynamiques locales, l'investissement territorial et la vie des grandes villes."
    },
    {
      title: "De Casablanca a Dakhla",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Le site reste lisible meme si une mise a jour distante prend un peu plus de temps."
    }
  ],
  technologie: [
    {
      title: "Innovation et transformation digitale",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "La rubrique technologie charge les dernieres actualites automatiquement et garde ce contenu en secours si besoin."
    },
    {
      title: "Startups, IA et services numeriques",
      url: "#",
      sourceLabel: "Mode local",
      dateLabel: "Base de secours",
      description: "Le projet est maintenant prepare pour une alimentation live sans edition manuelle des cartes."
    }
  ]
};

const API_BASE_URL = resolveApiBaseUrl();
const NEWS_REFRESH_INTERVAL_MS = 10 * 60 * 1000;
const INITIAL_FEED_LIMIT = 8;
const FEED_INCREMENT = 8;
const MAX_FEED_LIMIT = 40;
const DEFAULT_LANGUAGE = "fr";
const SUPPORTED_LANGUAGES = ["fr", "en", "ar"];
const SMART_STORAGE_KEY = "maroc-info-smart-profile";
let currentLanguage = getSavedLanguage();

const TRANSLATIONS = {
  fr: {
    common: {
      brandAria: "Maroc Info - Accueil",
      brandSubtitle: "Regards clairs sur l'actualite marocaine",
      openMenu: "Ouvrir le menu",
      language: "Langue",
      guest: "Invite",
      connected: "Connecte",
      account: "Mon compte",
      login: "Connexion",
      logout: "Deconnexion",
      sessionActive: "Votre session est active sur ce navigateur.",
      noSession: "Aucune session active pour le moment.",
      verifySession: "Verification de la session en cours...",
      verifySessionFailed: "Impossible de verifier la session.",
      activeSession: "Session active",
      name: "Nom",
      email: "Email",
      createdAt: "Compte cree",
      status: "Statut",
      accountEmpty: "Connectez-vous ou creez un compte pour afficher vos informations ici.",
      authCreated: "Compte cree et session ouverte.",
      authLoggedIn: "Connexion reussie.",
      authLoggedOut: "Vous etes maintenant deconnecte.",
      authLogoutFailed: "La deconnexion a echoue."
    },
    nav: {
      home: "Accueil",
      politique: "Politique",
      societe: "Societe",
      economie: "Economie",
      sport: "Sport",
      culture: "Culture",
      monde: "Monde",
      regions: "Regions",
      technologie: "Technologie"
    },
    news: {
      loadingTitle: "Chargement des actualites...",
      loadingCopy: "Connexion a la source publique en cours.",
      loadedTitle: "Actualites chargees automatiquement",
      fallbackTitle: "Mode secours actif",
      fallbackCopy: "Le site affiche un contenu local de repli car la source publique n'a pas repondu.",
      sourceLocal: "Source locale",
      modeLocal: "Mode local",
      fallbackDate: "Contenu de secours",
      readSource: "Lire la source",
      noContent: "Aucun contenu n'est disponible pour le moment.",
      loadMore: "Charger plus d'articles",
      loadingButton: "Chargement...",
      retry: "Reessayer",
      homepageLoadedTitle: "Dernieres actualites du Maroc",
      homepageLoadedCopy: "Selection automatique depuis les flux du projet pour rendre les mises a jour visibles des l'accueil.",
      homepageFallbackCopy: "La page d'accueil n'a pas pu construire sa selection en direct pour le moment.",
      homepageOpen: "Ouvrir",
      sourceMoroccan: "Source: sites marocains via le collecteur Python. Derniere recuperation: {date}.",
      sourceHybrid: "Source: sites marocains via Python, completes par GDELT. Derniere recuperation: {date}.",
      sourceGdelt: "Source: API locale du projet. Derniere recuperation en direct: {date}.",
      sourceCache: "Source: cache local du projet. Derniere mise a jour disponible: {date}.",
      sourceUnknown: "Source: API locale du projet. Derniere mise a jour connue: {date}."
    },
    pages: {
      home: { title: "Maroc Info | L'actualite marocaine, claire et structuree", description: "Maroc Info propose une lecture claire de l'actualite marocaine en politique, economie, sport, culture et technologie." },
      auth: { title: "Connexion | Maroc Info", description: "Connectez-vous ou creez un compte Maroc Info pour personnaliser votre experience." },
      politique: { title: "Politique | Maroc Info", description: "Lecture politique du Maroc: institutions, reformes, diplomatie et grands arbitrages publics." },
      economie: { title: "Economie | Maroc Info", description: "Croissance, investissement, finance, industrie et transformation productive au Maroc." },
      sport: { title: "Sport | Maroc Info", description: "Football, grands rendez-vous, talents et rayonnement sportif du Maroc." },
      culture: { title: "Culture | Maroc Info", description: "Patrimoine, creation, festivals, cinema, musique et scenes culturelles du Maroc." },
      technologie: { title: "Technologie | Maroc Info", description: "Innovation, startups, telecoms, services numeriques et transformation digitale au Maroc." },
      societe: { title: "Societe | Maroc Info", description: "Education, sante, justice, jeunesse et transformations sociales au Maroc." },
      monde: { title: "Monde | Maroc Info", description: "Le Maroc dans le monde: diplomatie, Afrique, Europe et grands equilibres internationaux." },
      regions: { title: "Regions | Maroc Info", description: "Casablanca, Rabat, Tanger, Marrakech, Agadir, Fes, Dakhla: l'actualite des territoires marocains." }
    }
  },
  en: {
    common: {
      brandAria: "Maroc Info - Home",
      brandSubtitle: "Sharper views on Moroccan news",
      openMenu: "Open menu",
      language: "Language",
      guest: "Guest",
      connected: "Signed in",
      account: "My account",
      login: "Sign in",
      logout: "Log out",
      sessionActive: "Your session is active in this browser.",
      noSession: "No active session right now.",
      verifySession: "Checking current session...",
      verifySessionFailed: "Unable to verify the session.",
      activeSession: "Active session",
      name: "Name",
      email: "Email",
      createdAt: "Created",
      status: "Status",
      accountEmpty: "Sign in or create an account to display your information here.",
      authCreated: "Account created and session opened.",
      authLoggedIn: "Signed in successfully.",
      authLoggedOut: "You are now signed out.",
      authLogoutFailed: "Sign out failed."
    },
    nav: {
      home: "Home",
      politique: "Politics",
      societe: "Society",
      economie: "Economy",
      sport: "Sport",
      culture: "Culture",
      monde: "World",
      regions: "Regions",
      technologie: "Technology"
    },
    news: {
      loadingTitle: "Loading news...",
      loadingCopy: "Connecting to the live source.",
      loadedTitle: "News loaded automatically",
      fallbackTitle: "Fallback mode active",
      fallbackCopy: "The site is showing local fallback content because the live source did not respond.",
      sourceLocal: "Local source",
      modeLocal: "Local mode",
      fallbackDate: "Fallback content",
      readSource: "Read source",
      noContent: "No content is available right now.",
      loadMore: "Load more articles",
      loadingButton: "Loading...",
      retry: "Retry",
      homepageLoadedTitle: "Latest news from Morocco",
      homepageLoadedCopy: "Automatic project selection to make updates visible right from the homepage.",
      homepageFallbackCopy: "The homepage could not build its live selection right now.",
      homepageOpen: "Open",
      sourceMoroccan: "Source: Moroccan websites via the Python collector. Last fetch: {date}.",
      sourceHybrid: "Source: Moroccan websites via Python, completed with GDELT. Last fetch: {date}.",
      sourceGdelt: "Source: local project API. Last live fetch: {date}.",
      sourceCache: "Source: local project cache. Last available update: {date}.",
      sourceUnknown: "Source: local project API. Last known update: {date}."
    },
    pages: {
      home: { title: "Maroc Info | Moroccan news, clearer and more structured", description: "Maroc Info offers a clearer reading of Moroccan news across politics, economy, sport, culture and technology." },
      auth: { title: "Account | Maroc Info", description: "Sign in or create a Maroc Info account to personalize your experience." },
      politique: { title: "Politics | Maroc Info", description: "Morocco politics: institutions, reforms, diplomacy and major public decisions." },
      economie: { title: "Economy | Maroc Info", description: "Growth, investment, finance, industry and Morocco's productive transformation." },
      sport: { title: "Sport | Maroc Info", description: "Football, major events, talent and Morocco's sporting reach." },
      culture: { title: "Culture | Maroc Info", description: "Heritage, creation, festivals, cinema, music and Moroccan cultural scenes." },
      technologie: { title: "Technology | Maroc Info", description: "Innovation, startups, telecom, digital services and Morocco's digital transition." },
      societe: { title: "Society | Maroc Info", description: "Education, health, justice, youth and social change in Morocco." },
      monde: { title: "World | Maroc Info", description: "Morocco in the world: diplomacy, Africa, Europe and global balances." },
      regions: { title: "Regions | Maroc Info", description: "Casablanca, Rabat, Tangier, Marrakech, Agadir, Fez, Dakhla: news from Moroccan regions." }
    }
  },
  ar: {
    common: {
      brandAria: "مغرب إنفو - الرئيسية",
      brandSubtitle: "قراءة أوضح للأخبار المغربية",
      openMenu: "فتح القائمة",
      language: "اللغة",
      guest: "زائر",
      connected: "متصل",
      account: "حسابي",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      sessionActive: "جلستك مفعلة في هذا المتصفح.",
      noSession: "لا توجد جلسة نشطة حاليا.",
      verifySession: "جار التحقق من الجلسة الحالية...",
      verifySessionFailed: "تعذر التحقق من الجلسة.",
      activeSession: "جلسة نشطة",
      name: "الاسم",
      email: "البريد الإلكتروني",
      createdAt: "تاريخ الإنشاء",
      status: "الحالة",
      accountEmpty: "سجل الدخول أو أنشئ حسابا لعرض معلوماتك هنا.",
      authCreated: "تم إنشاء الحساب وفتح الجلسة.",
      authLoggedIn: "تم تسجيل الدخول بنجاح.",
      authLoggedOut: "تم تسجيل الخروج.",
      authLogoutFailed: "فشل تسجيل الخروج."
    },
    nav: {
      home: "الرئيسية",
      politique: "السياسة",
      societe: "المجتمع",
      economie: "الاقتصاد",
      sport: "الرياضة",
      culture: "الثقافة",
      monde: "العالم",
      regions: "الجهات",
      technologie: "التكنولوجيا"
    },
    news: {
      loadingTitle: "جاري تحميل الأخبار...",
      loadingCopy: "جار الاتصال بالمصدر المباشر.",
      loadedTitle: "تم تحميل الأخبار تلقائيا",
      fallbackTitle: "تم تفعيل الوضع الاحتياطي",
      fallbackCopy: "يعرض الموقع محتوى محليا احتياطيا لأن المصدر المباشر لم يستجب.",
      sourceLocal: "مصدر محلي",
      modeLocal: "وضع محلي",
      fallbackDate: "محتوى احتياطي",
      readSource: "اقرأ المصدر",
      noContent: "لا يوجد محتوى متاح حاليا.",
      loadMore: "تحميل المزيد من المقالات",
      loadingButton: "جاري التحميل...",
      retry: "إعادة المحاولة",
      homepageLoadedTitle: "آخر أخبار المغرب",
      homepageLoadedCopy: "اختيار تلقائي من تدفقات المشروع لإظهار التحديثات مباشرة من الصفحة الرئيسية.",
      homepageFallbackCopy: "تعذر على الصفحة الرئيسية بناء اختيارها المباشر حاليا.",
      homepageOpen: "فتح",
      sourceMoroccan: "المصدر: مواقع مغربية عبر مجمّع بايثون. آخر جلب: {date}.",
      sourceHybrid: "المصدر: مواقع مغربية عبر بايثون مع استكمال من GDELT. آخر جلب: {date}.",
      sourceGdelt: "المصدر: واجهة المشروع المحلية. آخر جلب مباشر: {date}.",
      sourceCache: "المصدر: الذاكرة المحلية للمشروع. آخر تحديث متاح: {date}.",
      sourceUnknown: "المصدر: واجهة المشروع المحلية. آخر تحديث معروف: {date}."
    },
    pages: {
      home: { title: "مغرب إنفو | الأخبار المغربية بشكل أوضح وأكثر تنظيما", description: "يقدم مغرب إنفو قراءة أوضح للأخبار المغربية في السياسة والاقتصاد والرياضة والثقافة والتكنولوجيا." },
      auth: { title: "الحساب | مغرب إنفو", description: "سجل الدخول أو أنشئ حساب مغرب إنفو لتخصيص تجربتك." },
      politique: { title: "السياسة | مغرب إنفو", description: "سياسة المغرب: المؤسسات والإصلاحات والدبلوماسية والقرارات العمومية الكبرى." },
      economie: { title: "الاقتصاد | مغرب إنفو", description: "النمو والاستثمار والمالية والصناعة والتحول الإنتاجي في المغرب." },
      sport: { title: "الرياضة | مغرب إنفو", description: "كرة القدم والمواعيد الكبرى والمواهب والإشعاع الرياضي للمغرب." },
      culture: { title: "الثقافة | مغرب إنفو", description: "التراث والإبداع والمهرجانات والسينما والموسيقى والمشاهد الثقافية في المغرب." },
      technologie: { title: "التكنولوجيا | مغرب إنفو", description: "الابتكار والشركات الناشئة والاتصالات والخدمات الرقمية والتحول الرقمي في المغرب." },
      societe: { title: "المجتمع | مغرب إنفو", description: "التعليم والصحة والعدالة والشباب والتحولات الاجتماعية في المغرب." },
      monde: { title: "العالم | مغرب إنفو", description: "المغرب في العالم: الدبلوماسية وأفريقيا وأوروبا والتوازنات الدولية." },
      regions: { title: "الجهات | مغرب إنفو", description: "الدار البيضاء والرباط وطنجة ومراكش وأكادير وفاس والداخلة: أخبار الجهات المغربية." }
    }
  }
};

const PAGE_TEXT = {
  fr: {
    home: {
      heroEyebrow: "Salle de redaction",
      heroTitle: "Le Maroc en tension, en mouvement et en profondeur.",
      heroCopy: "Un front page pense comme un magazine vivant: plus d'angles, plus de contraste visuel, et une lecture qui passe du signal rapide au dossier fort sans tomber dans le layout attendu.",
      heroCtaPrimary: "Entrer dans l'edition",
      heroCtaSecondary: "Explorer les rubriques",
      heroManifestoSmall: "Edition du jour",
      heroManifestoTag: "Maroc Info / Front Page",
      heroManifestoTitle: "Un site d'actus qui respire comme une une, pas comme une grille generique.",
      heroManifestoCopy: "Le but n'est pas seulement d'afficher des cartes. Le but est de fabriquer du rythme: une ouverture forte, un radar nerveux, des respirations editoriales et des entres distinctes.",
      heroBand1: "institutions",
      heroBand2: "chantiers",
      heroBand3: "terrain",
      heroBand4: "diplomatie",
      heroMetric1: "angles editoriaux qui structurent maintenant l'ensemble du site.",
      heroMetric2Value: "Fast",
      heroMetric2: "cache, chargement progressif et blocs plus denses sur l'accueil.",
      heroMetric3Value: "Live",
      heroMetric3: "une page d'accueil qui ressemble davantage a une edition qu'a un simple hub.",
      pulseTitle: "Pulse",
      pulseCopy: "Cette zone doit donner l'impression d'un front nerveux: plus de contraste, plus de densite, et des points d'entree moins sages.",
      headlineTitle: "A la une",
      headlineCopy: "Les sujets les plus visibles du moment, servis depuis le cache du projet.",
      radarTitle: "Radar rapide",
      radarCopy: "Un balayage dense pour donner au site une impression de flux continu.",
      spotlightTitle: "Le point fort du moment",
      spotlightCopy: "Une selection plus visuelle pour donner de la profondeur a la page d'accueil.",
      spotlightCta: "Explorer les grands dossiers",
      manifestoTitle: "Une lecture plus nette de l'actualite marocaine",
      manifestoCopy: "Le Maroc avance sur plusieurs fronts a la fois: reformes institutionnelles, transition economique, diplomatie, creation culturelle et acceleration numerique. Un site d'information utile doit rendre ces dynamiques comprehensibles d'un seul coup d'oeil.",
      manifestoPoint1: "Des pages coherentes, avec une hierarchie editoriale plus credibile.",
      manifestoPoint2: "Des cartes et sections homogenes pour faciliter le balayage visuel.",
      manifestoPoint3: "Une identite plus premium inspiree de la presse magazine et institutionnelle.",
      featurePolitique: "Institutions, diplomatie, gouvernance et execution des grandes reformes.",
      featureEconomie: "Croissance, investissement, emploi et signaux de transformation productive.",
      featureSport: "Performances, grands rendez-vous et poids croissant du sport dans l'image du pays.",
      featureTechnologie: "Innovation, numerique public, startups et nouveaux usages.",
      memberTitle: "Nouveau: espace membre",
      memberCopy: "Le projet dispose maintenant d'une authentification locale avec inscription, connexion, session persistante et interface compte. C'est une bonne base pour ajouter des favoris, des preferences ou une administration plus tard.",
      memberCtaTitle: "Compte utilisateur",
      memberCtaCopy: "Accedez a la page de connexion et testez le nouveau flux membre.",
      memberCtaButton: "Ouvrir l'espace membre",
      sectionsTitle: "Les rubriques du site",
      sectionsCopy: "Le site couvre des angles plus larges pour paraitre plus riche, plus utile et plus rapide a parcourir.",
      sectionsCta: "Nouvelle rubrique territoriale",
      editorial1Title: "Une promesse editoriale simple",
      editorial1Copy: "Faire gagner du temps au lecteur avec une presentation plus serieuse, plus claire et plus stable d'une page a l'autre.",
      editorial2Title: "Un langage visuel commun",
      editorial2Copy: "Navigation, headers, cartes et footer parlent enfin la meme langue graphique sur tout le projet.",
      editorial3Title: "Une base plus solide pour la suite",
      editorial3Copy: "Le site est maintenant pret pour accueillir davantage de contenus ou une integration de donnees plus riche.",
      footerNote: "Une vitrine plus professionnelle pour presenter l'actualite marocaine avec clarte, rythme et coherence."
    },
    auth: {
      heroEyebrow: "Espace membre",
      heroTitle: "Connectez-vous pour retrouver une experience plus personnelle",
      heroCopy: "Cette premiere version ajoute une authentification locale simple et propre: creation de compte, connexion, session persistante et affichage de l'etat utilisateur dans l'interface.",
      briefSmall: "Ce qui est deja pret",
      briefTitle: "Base solide pour la suite",
      briefCopy: "Cette fondation pourra ensuite accueillir favoris, preferences, historique de lecture ou espace admin.",
      registerTitle: "Creer un compte",
      registerCopy: "Inscription rapide avec nom, email et mot de passe.",
      loginTitle: "Se connecter",
      loginCopy: "Utilisez votre email et votre mot de passe pour ouvrir votre session.",
      sessionTitle: "Etat de la session",
      footerTitle: "Authentification",
      footerNote: "Connexion locale, session securisee par cookie et base utilisateur persistante dans le projet."
    }
  },
  en: {
    home: {
      heroEyebrow: "Newsroom",
      heroTitle: "Morocco under pressure, in motion, and in depth.",
      heroCopy: "A front page designed like a living magazine: more angles, more visual contrast, and a reading flow that moves from quick signal to major story without falling into a predictable layout.",
      heroCtaPrimary: "Enter the edition",
      heroCtaSecondary: "Explore sections",
      heroManifestoSmall: "Edition of the day",
      heroManifestoTag: "Maroc Info / Front Page",
      heroManifestoTitle: "A news site that breathes like a front page, not like a generic grid.",
      heroManifestoCopy: "The goal is not just to display cards. The goal is to create rhythm: a strong opening, a nervous radar, editorial breathing room, and distinct points of entry.",
      heroBand1: "institutions",
      heroBand2: "projects",
      heroBand3: "ground",
      heroBand4: "diplomacy",
      heroMetric1: "editorial angles now structuring the whole site.",
      heroMetric2Value: "Fast",
      heroMetric2: "cache, progressive loading, and denser blocks on the homepage.",
      heroMetric3Value: "Live",
      heroMetric3: "a homepage that feels more like an edition than a simple hub.",
      pulseTitle: "Pulse",
      pulseCopy: "This zone should feel like a nervous front page: more contrast, more density, and less conventional entry points.",
      headlineTitle: "Top stories",
      headlineCopy: "The most visible stories of the moment, served from the project cache.",
      radarTitle: "Quick radar",
      radarCopy: "A dense scan that gives the site the feeling of a continuous flow.",
      spotlightTitle: "Spotlight now",
      spotlightCopy: "A more visual selection to give the homepage greater depth.",
      spotlightCta: "Explore major stories",
      manifestoTitle: "A clearer reading of Moroccan news",
      manifestoCopy: "Morocco is moving on several fronts at once: institutional reform, economic transition, diplomacy, cultural creation, and digital acceleration. A useful news site must make these dynamics understandable at a glance.",
      manifestoPoint1: "Consistent pages with a more credible editorial hierarchy.",
      manifestoPoint2: "Consistent cards and sections to improve visual scanning.",
      manifestoPoint3: "A more premium identity inspired by magazine and institutional media.",
      featurePolitique: "Institutions, diplomacy, governance, and the execution of major reforms.",
      featureEconomie: "Growth, investment, jobs, and signs of productive transformation.",
      featureSport: "Performance, major events, and the growing weight of sport in Morocco's image.",
      featureTechnologie: "Innovation, public digital services, startups, and new uses.",
      memberTitle: "New: member area",
      memberCopy: "The project now includes local authentication with sign-up, sign-in, persistent sessions, and an account interface. It is a strong base for favorites, preferences, or administration later on.",
      memberCtaTitle: "User account",
      memberCtaCopy: "Open the account page and try the new member flow.",
      memberCtaButton: "Open member area",
      sectionsTitle: "Site sections",
      sectionsCopy: "The site now covers broader angles to feel richer, more useful, and faster to browse.",
      sectionsCta: "New regional section",
      editorial1Title: "A simple editorial promise",
      editorial1Copy: "Save readers time with a more serious, clearer, and more stable presentation from page to page.",
      editorial2Title: "A shared visual language",
      editorial2Copy: "Navigation, headers, cards, and footer now speak the same graphic language across the project.",
      editorial3Title: "A stronger base for what comes next",
      editorial3Copy: "The site is now ready for more content and richer data integration.",
      footerNote: "A more professional showcase for Moroccan news, with clarity, pace, and cohesion."
    },
    auth: {
      heroEyebrow: "Member area",
      heroTitle: "Sign in for a more personal experience",
      heroCopy: "This first version adds simple and clean local authentication: account creation, sign in, persistent session, and visible user state in the interface.",
      briefSmall: "Already ready",
      briefTitle: "Strong base for what comes next",
      briefCopy: "This foundation can later host favorites, preferences, reading history, or an admin area.",
      registerTitle: "Create an account",
      registerCopy: "Quick sign-up with name, email, and password.",
      loginTitle: "Sign in",
      loginCopy: "Use your email and password to open your session.",
      sessionTitle: "Session status",
      footerTitle: "Authentication",
      footerNote: "Local sign-in, cookie-based session, and persistent user storage inside the project."
    }
  },
  ar: {
    home: {
      heroEyebrow: "غرفة الأخبار",
      heroTitle: "المغرب تحت الضغط، في الحركة، وفي العمق.",
      heroCopy: "واجهة رئيسية مصممة مثل مجلة حية: زوايا أكثر، تباين بصري أقوى، وقراءة تنتقل من الإشارة السريعة إلى الملف القوي من دون الوقوع في تخطيط متوقع.",
      heroCtaPrimary: "ادخل إلى النسخة",
      heroCtaSecondary: "استكشف الأقسام",
      heroManifestoSmall: "نسخة اليوم",
      heroManifestoTag: "مغرب إنفو / الواجهة",
      heroManifestoTitle: "موقع أخبار يتنفس مثل الصفحة الأولى، لا مثل شبكة بطاقات عادية.",
      heroManifestoCopy: "الهدف ليس فقط عرض البطاقات. الهدف هو صناعة الإيقاع: افتتاحية قوية، رادار سريع، مساحات تحريرية، ومداخل مختلفة وواضحة.",
      heroBand1: "المؤسسات",
      heroBand2: "الأوراش",
      heroBand3: "الميدان",
      heroBand4: "الدبلوماسية",
      heroMetric1: "زوايا تحريرية أصبحت تنظّم الموقع كله.",
      heroMetric2Value: "سريع",
      heroMetric2: "ذاكرة مؤقتة، تحميل تدريجي، وكتل أكثر كثافة في الصفحة الرئيسية.",
      heroMetric3Value: "مباشر",
      heroMetric3: "صفحة رئيسية تشبه عددا صحفيا أكثر من كونها مجرد بوابة.",
      pulseTitle: "النبض",
      pulseCopy: "يجب أن تعطي هذه المساحة إحساسا بواجهة عصبية: تباين أكثر، كثافة أعلى، ومداخل أقل تقليدية.",
      headlineTitle: "العناوين الكبرى",
      headlineCopy: "أبرز المواضيع في اللحظة، مقدمة من ذاكرة المشروع المؤقتة.",
      radarTitle: "رادار سريع",
      radarCopy: "مسح كثيف يمنح الموقع إحساسا بتدفق متواصل.",
      spotlightTitle: "الملف الأبرز الآن",
      spotlightCopy: "اختيار بصري أقوى يمنح الصفحة الرئيسية عمقا أكبر.",
      spotlightCta: "استكشف الملفات الكبرى",
      manifestoTitle: "قراءة أوضح للأخبار المغربية",
      manifestoCopy: "يتحرك المغرب في عدة جبهات في الوقت نفسه: الإصلاح المؤسسي، التحول الاقتصادي، الدبلوماسية، الإبداع الثقافي، والتسارع الرقمي. يجب أن يجعل الموقع الإخباري الجيد هذه الديناميات مفهومة من النظرة الأولى.",
      manifestoPoint1: "صفحات متماسكة بهرمية تحريرية أكثر مصداقية.",
      manifestoPoint2: "بطاقات وأقسام منسجمة لتسهيل القراءة البصرية.",
      manifestoPoint3: "هوية أكثر رقيّا مستلهمة من الصحافة المجلاتية والمؤسساتية.",
      featurePolitique: "المؤسسات والدبلوماسية والحكامة وتنفيذ الإصلاحات الكبرى.",
      featureEconomie: "النمو والاستثمار والتشغيل وإشارات التحول الإنتاجي.",
      featureSport: "الأداء والمواعيد الكبرى والوزن المتزايد للرياضة في صورة المغرب.",
      featureTechnologie: "الابتكار والخدمات الرقمية العمومية والشركات الناشئة والاستعمالات الجديدة.",
      memberTitle: "جديد: فضاء الأعضاء",
      memberCopy: "يتضمن المشروع الآن مصادقة محلية مع التسجيل والدخول والجلسات المستمرة وواجهة حساب. إنها قاعدة قوية لإضافة المفضلات أو التفضيلات أو الإدارة لاحقا.",
      memberCtaTitle: "حساب المستخدم",
      memberCtaCopy: "افتح صفحة الحساب وجرب مسار العضوية الجديد.",
      memberCtaButton: "افتح فضاء الأعضاء",
      sectionsTitle: "أقسام الموقع",
      sectionsCopy: "يغطي الموقع الآن زوايا أوسع ليبدو أغنى وأكثر فائدة وأسرع في التصفح.",
      sectionsCta: "القسم الجهوي الجديد",
      editorial1Title: "وعد تحريري بسيط",
      editorial1Copy: "توفير الوقت للقارئ من خلال عرض أكثر جدية ووضوحا واستقرارا من صفحة إلى أخرى.",
      editorial2Title: "لغة بصرية مشتركة",
      editorial2Copy: "أصبحت الملاحة والعناوين والبطاقات والتذييل تتكلم اللغة البصرية نفسها في كامل المشروع.",
      editorial3Title: "قاعدة أقوى لما بعد",
      editorial3Copy: "أصبح الموقع جاهزا لاستقبال محتوى أكثر وتكامل بيانات أغنى.",
      footerNote: "واجهة أكثر احترافية لتقديم الأخبار المغربية بوضوح وإيقاع وتماسك."
    },
    auth: {
      heroEyebrow: "فضاء الأعضاء",
      heroTitle: "سجل الدخول لاستعادة تجربة أكثر شخصية",
      heroCopy: "تضيف هذه النسخة الأولى مصادقة محلية بسيطة ونظيفة: إنشاء حساب، تسجيل الدخول، جلسة مستمرة، وعرض حالة المستخدم داخل الواجهة.",
      briefSmall: "ما هو جاهز بالفعل",
      briefTitle: "قاعدة صلبة لما بعد",
      briefCopy: "يمكن لهذه القاعدة لاحقا أن تستضيف المفضلات والتفضيلات وسجل القراءة أو فضاء الإدارة.",
      registerTitle: "إنشاء حساب",
      registerCopy: "تسجيل سريع بالاسم والبريد الإلكتروني وكلمة المرور.",
      loginTitle: "تسجيل الدخول",
      loginCopy: "استعمل بريدك الإلكتروني وكلمة المرور لفتح جلستك.",
      sessionTitle: "حالة الجلسة",
      footerTitle: "المصادقة",
      footerNote: "تسجيل دخول محلي، جلسة مؤمنة بملف تعريف الارتباط، وقاعدة مستخدمين محفوظة داخل المشروع."
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  applyLanguage();
  await loadNavbar();
  bindLanguageSwitcher();
  applyLanguage();
  ensureSmartShell();
  await hydrateAuthUi();
  await renderHomepageNews();
  await renderAutomatedNews();
  renderSmartExperience();
  bindAuthForms();
});

async function loadNavbar() {
  const navbarMount = document.getElementById("navbar");

  if (!navbarMount) {
    return;
  }

  try {
    const response = await fetch("navbar.html");
    const html = await response.text();
    navbarMount.innerHTML = `<div class="topbar-wrap">${html}</div>`;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });

    syncLanguageSwitcher();
  } catch (error) {
    console.error("Impossible de charger la navigation.", error);
  }
}

function bindLanguageSwitcher() {
  const languageSwitcher = document.getElementById("language-switcher");

  if (!languageSwitcher || languageSwitcher.dataset.bound === "true") {
    return;
  }

  languageSwitcher.dataset.bound = "true";
  languageSwitcher.addEventListener("change", async (event) => {
    setLanguage(event.target.value);
    applyLanguage();
    await hydrateAuthUi();
    await renderHomepageNews();
    await renderAutomatedNews();
  });
}

function syncLanguageSwitcher() {
  const languageSwitcher = document.getElementById("language-switcher");

  if (languageSwitcher) {
    languageSwitcher.value = currentLanguage;
  }
}

function getSavedLanguage() {
  try {
    const saved = window.localStorage.getItem("maroc-info-language");
    return SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function setLanguage(language) {
  currentLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;

  try {
    window.localStorage.setItem("maroc-info-language", currentLanguage);
  } catch {
    // Ignore local storage write failures.
  }
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  applyMetaTranslations();
  applyDataTranslations();
  applyPageTranslations();
}

function applyMetaTranslations() {
  const pageKey = getCurrentPageKey();
  const titleValue = t(`pages.${pageKey}.title`, document.title);
  const descriptionValue = t(`pages.${pageKey}.description`, "");
  document.title = titleValue;

  const descriptionNode = document.querySelector('meta[name="description"]');
  if (descriptionNode && descriptionValue) {
    descriptionNode.setAttribute("content", descriptionValue);
  }
}

function applyDataTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n, node.textContent);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel, node.getAttribute("aria-label") || ""));
  });
}

function rememberOriginalText(node, key = "originalText") {
  if (node && node.dataset[key] == null) {
    node.dataset[key] = node.textContent;
  }
}

function setNodeText(node, value) {
  if (!node) {
    return;
  }

  rememberOriginalText(node);
  node.textContent = value ?? node.dataset.originalText ?? node.textContent;
}

function setNodeIconText(node, value) {
  if (!node) {
    return;
  }

  if (node.dataset.originalIconText == null) {
    const icon = node.querySelector("i");
    const originalLabel = node.textContent.replace(icon?.textContent || "", "").trim();
    node.dataset.originalIconText = originalLabel;
  }

  const icon = node.querySelector("i");
  const label = value ?? node.dataset.originalIconText ?? "";

  if (!icon) {
    node.textContent = label;
    return;
  }

  node.innerHTML = "";
  node.appendChild(icon);
  node.appendChild(document.createTextNode(` ${label}`));
}

function setText(selector, value, root = document) {
  setNodeText(root.querySelector(selector), value);
}

function setIconText(selector, value, root = document) {
  setNodeIconText(root.querySelector(selector), value);
}

function setMany(selector, values, root = document) {
  root.querySelectorAll(selector).forEach((node, index) => {
    setNodeText(node, values?.[index]);
  });
}

function applyPageTranslations() {
  const pageKey = getCurrentPageKey();

  applyFooterLinkTranslations();

  if (pageKey === "home") {
    applyHomePageTranslations();
    return;
  }

  if (pageKey === "auth") {
    applyAuthPageTranslations();
    return;
  }

  applyCategoryPageTranslations(pageKey);
}

function applyFooterLinkTranslations() {
  const linkMap = {
    "index.html": t("nav.home"),
    "politique.html": t("nav.politique"),
    "societe.html": t("nav.societe"),
    "economie.html": t("nav.economie"),
    "sport.html": t("nav.sport"),
    "culture.html": t("nav.culture"),
    "monde.html": t("nav.monde"),
    "regions.html": t("nav.regions"),
    "technologie.html": t("nav.technologie"),
    "auth.html": t("common.account")
  };

  document.querySelectorAll(".footer-links a").forEach((link) => {
    setNodeText(link, linkMap[link.getAttribute("href")]);
  });
}

function applyHomePageTranslations() {
  const copy = currentLanguage === "en"
    ? {
        heroEyebrow: "Newsroom",
        heroTitle: "Morocco under pressure, in motion, and in depth.",
        heroCopy: "A front page designed like a living magazine: more angles, more visual contrast, and a reading flow that moves from quick signal to major story without feeling predictable.",
        heroPrimary: "Enter the edition",
        heroSecondary: "Explore sections",
        manifestoSmall: "Edition of the day",
        manifestoTitle: "A news site that breathes like a front page, not like a generic grid.",
        manifestoCopy: "The goal is not just to display cards. The goal is to create rhythm: a strong opening, a nervous radar, editorial breathing room, and distinct points of entry.",
        bands: ["Politics", "Economy", "Society", "World"],
        bandStrong: ["institutions", "projects", "ground", "diplomacy"],
        metricLabels: [
          "editorial angles now structuring the whole site.",
          "cache, progressive loading, and denser blocks on the homepage.",
          "a homepage that feels more like an edition than a simple hub."
        ],
        pulseTitle: "Pulse",
        pulseCopy: "This zone should feel like a nervous front page: more contrast, more density, and less conventional entry points.",
        headlineTitle: "Top stories",
        headlineCopy: "The most visible stories of the moment, served from the project cache.",
        radarTitle: "Quick radar",
        radarCopy: "A dense scan that gives the site the feeling of a continuous flow.",
        spotlightTitle: "Spotlight now",
        spotlightCopy: "A more visual selection to give the homepage greater depth.",
        spotlightButton: "Explore major stories",
        manifesto2Title: "A clearer reading of Moroccan news",
        manifesto2Copy: "Morocco is moving on several fronts at once: institutional reform, economic transition, diplomacy, cultural creation, and digital acceleration.",
        manifestoPoints: [
          "Consistent pages with a more credible editorial hierarchy.",
          "Consistent cards and sections to improve visual scanning.",
          "A more premium identity inspired by magazine and institutional media."
        ],
        featureCopies: [
          "Institutions, diplomacy, governance, and the execution of major reforms.",
          "Growth, investment, jobs, and signs of productive transformation.",
          "Performance, major events, and the growing weight of sport in Morocco's image.",
          "Innovation, public digital services, startups, and new uses."
        ],
        categoryTitles: [
          "Understand institutions and public trade-offs",
          "Track signals of growth and transformation",
          "Follow education, health, and everyday issues",
          "Measure the impact of major competitions and Moroccan talent",
          "Read Morocco's place in major international balances",
          "Highlight scenes, traditions, and cultural imagination",
          "Give more space to cities, projects, and territories",
          "Watch innovation changing habits in Morocco"
        ],
        categoryCopies: [
          "A section centered on decisions, diplomacy, and the pace of public action.",
          "Investment, industry, jobs, finance, and structuring projects.",
          "A section that gives the site and Moroccan news more social depth.",
          "Football, elite sport, major events, and international reach.",
          "Diplomacy, Africa, Europe, trade, and strategic partnerships.",
          "Heritage, contemporary creation, festivals, and ways of life.",
          "Casablanca, Rabat, Tangier, Marrakech, Agadir, Fez, Dakhla, and signals from the field.",
          "Digital services, startups, AI, and organizational change."
        ],
        memberTitle: "New: member area",
        memberCopy: "The project now includes local authentication with sign-up, sign-in, persistent sessions, and an account interface.",
        memberCtaTitle: "User account",
        memberCtaCopy: "Open the account page and try the new member flow.",
        memberButton: "Open member area",
        sectionsTitle: "Site sections",
        sectionsCopy: "The site now covers broader angles to feel richer, more useful, and faster to browse.",
        sectionsButton: "New regional section",
        editorialTitles: [
          "A simple editorial promise",
          "A shared visual language",
          "A stronger base for what comes next"
        ],
        editorialCopies: [
          "Save readers time with a more serious, clearer, and more stable presentation from page to page.",
          "Navigation, headers, cards, and footer now speak the same graphic language across the project.",
          "The site is now ready for more content and richer data integration."
        ],
        footerNote: "A more professional showcase for Moroccan news, with clarity, pace, and cohesion."
      }
    : currentLanguage === "ar"
      ? {
          heroEyebrow: "\u063a\u0631\u0641\u0629 \u0627\u0644\u0623\u062e\u0628\u0627\u0631",
          heroTitle: "\u0627\u0644\u0645\u063a\u0631\u0628 \u062a\u062d\u062a \u0627\u0644\u0636\u063a\u0637\u060c \u0641\u064a \u0627\u0644\u062d\u0631\u0643\u0629\u060c \u0648\u0641\u064a \u0627\u0644\u0639\u0645\u0642.",
          heroCopy: "\u0648\u0627\u062c\u0647\u0629 \u0631\u0626\u064a\u0633\u064a\u0629 \u0645\u0635\u0645\u0645\u0629 \u0643\u0645\u062c\u0644\u0629 \u062d\u064a\u0629: \u0632\u0648\u0627\u064a\u0627 \u0623\u0643\u062b\u0631\u060c \u062a\u0628\u0627\u064a\u0646 \u0628\u0635\u0631\u064a \u0623\u0642\u0648\u0649\u060c \u0648\u0645\u0633\u0627\u0631 \u0642\u0631\u0627\u0621\u0629 \u0645\u0646 \u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0627\u0644\u0633\u0631\u064a\u0639\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0642\u0648\u0649.",
          heroPrimary: "\u0627\u062f\u062e\u0644 \u0625\u0644\u0649 \u0627\u0644\u0646\u0633\u062e\u0629",
          heroSecondary: "\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u0623\u0642\u0633\u0627\u0645",
          manifestoSmall: "\u0646\u0633\u062e\u0629 \u0627\u0644\u064a\u0648\u0645",
          manifestoTitle: "\u0645\u0648\u0642\u0639 \u0623\u062e\u0628\u0627\u0631 \u064a\u062a\u0646\u0641\u0633 \u0643\u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0627 \u0643\u0634\u0628\u0643\u0629 \u0639\u0627\u062f\u064a\u0629.",
          manifestoCopy: "\u0627\u0644\u0647\u062f\u0641 \u0644\u064a\u0633 \u0641\u0642\u0637 \u0639\u0631\u0636 \u0628\u0637\u0627\u0642\u0627\u062a. \u0627\u0644\u0647\u062f\u0641 \u0647\u0648 \u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0625\u064a\u0642\u0627\u0639: \u0627\u0641\u062a\u062a\u0627\u062d\u064a\u0629 \u0642\u0648\u064a\u0629\u060c \u0631\u0627\u062f\u0627\u0631 \u0633\u0631\u064a\u0639\u060c \u0648\u0645\u062f\u0627\u062e\u0644 \u0645\u062e\u062a\u0644\u0641\u0629.",
          bands: ["\u0627\u0644\u0633\u064a\u0627\u0633\u0629", "\u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f", "\u0627\u0644\u0645\u062c\u062a\u0645\u0639", "\u0627\u0644\u0639\u0627\u0644\u0645"],
          bandStrong: ["\u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a", "\u0627\u0644\u0623\u0648\u0631\u0627\u0634", "\u0627\u0644\u0645\u064a\u062f\u0627\u0646", "\u0627\u0644\u062f\u0628\u0644\u0648\u0645\u0627\u0633\u064a\u0629"],
          metricLabels: [
            "\u0632\u0648\u0627\u064a\u0627 \u062a\u062d\u0631\u064a\u0631\u064a\u0629 \u0623\u0635\u0628\u062d\u062a \u062a\u0646\u0638\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0643\u0644\u0647.",
            "\u0630\u0627\u0643\u0631\u0629 \u0645\u0624\u0642\u062a\u0629 \u0648\u062a\u062d\u0645\u064a\u0644 \u062a\u062f\u0631\u064a\u062c\u064a \u0648\u0643\u062a\u0644 \u0623\u0643\u062b\u0631 \u0643\u062b\u0627\u0641\u0629 \u0641\u064a \u0627\u0644\u0648\u0627\u062c\u0647\u0629.",
            "\u0635\u0641\u062d\u0629 \u0631\u0626\u064a\u0633\u064a\u0629 \u062a\u0634\u0628\u0647 \u0639\u062f\u062f\u0627 \u0635\u062d\u0641\u064a\u0627 \u0623\u0643\u062b\u0631 \u0645\u0646 \u0628\u0648\u0627\u0628\u0629."
          ],
          pulseTitle: "\u0627\u0644\u0646\u0628\u0636",
          pulseCopy: "\u0647\u0630\u0647 \u0627\u0644\u0645\u0633\u0627\u062d\u0629 \u064a\u062c\u0628 \u0623\u0646 \u062a\u0634\u0639\u0631 \u0643\u0648\u0627\u062c\u0647\u0629 \u0639\u0635\u0628\u064a\u0629: \u062a\u0628\u0627\u064a\u0646 \u0623\u0642\u0648\u0649 \u0648\u0643\u062b\u0627\u0641\u0629 \u0623\u0639\u0644\u0649.",
          headlineTitle: "\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646 \u0627\u0644\u0643\u0628\u0631\u0649",
          headlineCopy: "\u0623\u0643\u062b\u0631 \u0627\u0644\u0645\u0648\u0627\u0636\u064a\u0639 \u0628\u0631\u0648\u0632\u0627 \u0641\u064a \u0627\u0644\u0644\u062d\u0638\u0629.",
          radarTitle: "\u0631\u0627\u062f\u0627\u0631 \u0633\u0631\u064a\u0639",
          radarCopy: "\u0645\u0633\u062d \u0643\u062b\u064a\u0641 \u064a\u0645\u0646\u062d \u0627\u0644\u0645\u0648\u0642\u0639 \u0625\u062d\u0633\u0627\u0633\u0627 \u0628\u062a\u062f\u0641\u0642 \u0645\u062a\u0648\u0627\u0635\u0644.",
          spotlightTitle: "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0628\u0631\u0632 \u0627\u0644\u0622\u0646",
          spotlightCopy: "\u0627\u062e\u062a\u064a\u0627\u0631 \u0623\u0643\u062b\u0631 \u0628\u0635\u0631\u064a\u0629 \u0644\u0645\u0646\u062d \u0627\u0644\u0648\u0627\u062c\u0647\u0629 \u0639\u0645\u0642\u0627 \u0623\u0643\u0628\u0631.",
          spotlightButton: "\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0627\u0644\u0643\u0628\u0631\u0649",
          manifesto2Title: "\u0642\u0631\u0627\u0621\u0629 \u0623\u0648\u0636\u062d \u0644\u0644\u0623\u062e\u0628\u0627\u0631 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629",
          manifesto2Copy: "\u064a\u062a\u062d\u0631\u0643 \u0627\u0644\u0645\u063a\u0631\u0628 \u0641\u064a \u062c\u0628\u0647\u0627\u062a \u0645\u062a\u0639\u062f\u062f\u0629: \u0625\u0635\u0644\u0627\u062d \u0645\u0624\u0633\u0633\u064a \u0648\u062a\u062d\u0648\u0644 \u0627\u0642\u062a\u0635\u0627\u062f\u064a \u0648\u062f\u0628\u0644\u0648\u0645\u0627\u0633\u064a\u0629 \u0648\u0627\u0628\u062a\u0643\u0627\u0631 \u0631\u0642\u0645\u064a.",
          manifestoPoints: [
            "\u0635\u0641\u062d\u0627\u062a \u0645\u062a\u0645\u0627\u0633\u0643\u0629 \u0628\u0647\u0631\u0645\u064a\u0629 \u062a\u062d\u0631\u064a\u0631\u064a\u0629 \u0623\u0643\u062b\u0631 \u0645\u0635\u062f\u0627\u0642\u064a\u0629.",
            "\u0628\u0637\u0627\u0642\u0627\u062a \u0648\u0623\u0642\u0633\u0627\u0645 \u0645\u0646\u0633\u062c\u0645\u0629 \u0644\u062a\u0633\u0647\u064a\u0644 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u0635\u0631\u064a\u0629.",
            "\u0647\u0648\u064a\u0629 \u0623\u0643\u062b\u0631 \u0631\u0642\u064a\u0627 \u0645\u0633\u062a\u0644\u0647\u0645\u0629 \u0645\u0646 \u0627\u0644\u0635\u062d\u0627\u0641\u0629."
          ],
          featureCopies: [
            "\u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a \u0648\u0627\u0644\u062f\u0628\u0644\u0648\u0645\u0627\u0633\u064a\u0629 \u0648\u0627\u0644\u062d\u0643\u0627\u0645\u0629 \u0648\u062a\u0646\u0641\u064a\u0630 \u0627\u0644\u0625\u0635\u0644\u0627\u062d\u0627\u062a.",
            "\u0627\u0644\u0646\u0645\u0648 \u0648\u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0648\u0627\u0644\u0634\u063a\u0644 \u0648\u0625\u0634\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u062d\u0648\u0644.",
            "\u0627\u0644\u0623\u062f\u0627\u0621 \u0648\u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f \u0627\u0644\u0643\u0628\u0631\u0649 \u0648\u0627\u0644\u0648\u0632\u0646 \u0627\u0644\u0631\u064a\u0627\u0636\u064a.",
            "\u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631 \u0648\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0646\u0627\u0634\u0626\u0629."
          ],
          categoryTitles: [
            "\u0641\u0647\u0645 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a \u0648\u0627\u0644\u062a\u062d\u0643\u064a\u0645\u0627\u062a \u0627\u0644\u0639\u0645\u0648\u0645\u064a\u0629",
            "\u062a\u062a\u0628\u0639 \u0625\u0634\u0627\u0631\u0627\u062a \u0627\u0644\u0646\u0645\u0648 \u0648\u0627\u0644\u062a\u062d\u0648\u0644",
            "\u062a\u062a\u0628\u0639 \u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0648\u0627\u0644\u0635\u062d\u0629 \u0648\u0642\u0636\u0627\u064a\u0627 \u0627\u0644\u064a\u0648\u0645\u064a",
            "\u0642\u064a\u0627\u0633 \u0623\u062b\u0631 \u0627\u0644\u0645\u0646\u0627\u0641\u0633\u0627\u062a \u0627\u0644\u0643\u0628\u0631\u0649 \u0648\u0627\u0644\u0645\u0648\u0627\u0647\u0628 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629",
            "\u0642\u0631\u0627\u0621\u0629 \u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u063a\u0631\u0628 \u0641\u064a \u0627\u0644\u062a\u0648\u0627\u0632\u0646\u0627\u062a \u0627\u0644\u062f\u0648\u0644\u064a\u0629",
            "\u0625\u0628\u0631\u0627\u0632 \u0627\u0644\u0645\u0634\u0627\u0647\u062f \u0648\u0627\u0644\u062a\u0642\u0627\u0644\u064a\u062f \u0648\u0627\u0644\u0645\u062e\u064a\u0627\u0644",
            "\u0645\u0646\u062d \u062d\u064a\u0632 \u0623\u0643\u0628\u0631 \u0644\u0644\u0645\u062f\u0646 \u0648\u0627\u0644\u0623\u0648\u0631\u0627\u0634 \u0648\u0627\u0644\u0645\u062c\u0627\u0644\u0627\u062a",
            "\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631 \u0627\u0644\u0630\u064a \u064a\u063a\u064a\u0631 \u0627\u0644\u0627\u0633\u062a\u0639\u0645\u0627\u0644\u0627\u062a"
          ],
          categoryCopies: [
            "\u0642\u0633\u0645 \u064a\u0631\u0643\u0632 \u0639\u0644\u0649 \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062a \u0648\u0627\u0644\u062f\u0628\u0644\u0648\u0645\u0627\u0633\u064a\u0629 \u0648\u0625\u064a\u0642\u0627\u0639 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0639\u0645\u0648\u0645\u064a.",
            "\u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0648\u0627\u0644\u0635\u0646\u0627\u0639\u0629 \u0648\u0627\u0644\u0634\u063a\u0644 \u0648\u0627\u0644\u0645\u0627\u0644\u064a\u0629.",
            "\u0642\u0633\u0645 \u064a\u0645\u0646\u062d \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0645\u0642\u0627 \u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0627 \u0623\u0643\u0628\u0631.",
            "\u0643\u0631\u0629 \u0627\u0644\u0642\u062f\u0645 \u0648\u0627\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0639\u0627\u0644\u064a \u0648\u0627\u0644\u0623\u062d\u062f\u0627\u062b.",
            "\u0627\u0644\u062f\u0628\u0644\u0648\u0645\u0627\u0633\u064a\u0629 \u0648\u0625\u0641\u0631\u064a\u0642\u064a\u0627 \u0648\u0623\u0648\u0631\u0648\u0628\u0627 \u0648\u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062a.",
            "\u0627\u0644\u062a\u0631\u0627\u062b \u0648\u0627\u0644\u0625\u0628\u062f\u0627\u0639 \u0648\u0627\u0644\u0645\u0647\u0631\u062c\u0627\u0646\u0627\u062a \u0648\u0641\u0646\u0648\u0646 \u0627\u0644\u0639\u064a\u0634.",
            "\u0627\u0644\u062f\u0627\u0631 \u0627\u0644\u0628\u064a\u0636\u0627\u0621 \u0648\u0627\u0644\u0631\u0628\u0627\u0637 \u0648\u0637\u0646\u062c\u0629 \u0648\u0645\u0631\u0627\u0643\u0634 \u0648\u0627\u0644\u062f\u0627\u062e\u0644\u0629.",
            "\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0646\u0627\u0634\u0626\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a."
          ],
          memberTitle: "\u062c\u062f\u064a\u062f: \u0641\u0636\u0627\u0621 \u0627\u0644\u0623\u0639\u0636\u0627\u0621",
          memberCopy: "\u064a\u062a\u0636\u0645\u0646 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0622\u0644\u064a\u0629 \u062a\u0633\u062c\u064a\u0644 \u0648\u062f\u062e\u0648\u0644 \u0648\u062c\u0644\u0633\u0627\u062a \u0645\u0633\u062a\u0645\u0631\u0629 \u0648\u0648\u0627\u062c\u0647\u0629 \u062d\u0633\u0627\u0628.",
          memberCtaTitle: "\u062d\u0633\u0627\u0628 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",
          memberCtaCopy: "\u0627\u0641\u062a\u062d \u0635\u0641\u062d\u0629 \u0627\u0644\u062d\u0633\u0627\u0628 \u0648\u062c\u0631\u0628 \u0645\u0633\u0627\u0631 \u0627\u0644\u0639\u0636\u0648\u064a\u0629.",
          memberButton: "\u0627\u0641\u062a\u062d \u0641\u0636\u0627\u0621 \u0627\u0644\u0623\u0639\u0636\u0627\u0621",
          sectionsTitle: "\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0645\u0648\u0642\u0639",
          sectionsCopy: "\u064a\u063a\u0637\u064a \u0627\u0644\u0645\u0648\u0642\u0639 \u0632\u0648\u0627\u064a\u0627 \u0623\u0648\u0633\u0639 \u0644\u064a\u0628\u062f\u0648 \u0623\u063a\u0646\u0649 \u0648\u0623\u0633\u0631\u0639 \u0641\u064a \u0627\u0644\u062a\u0635\u0641\u062d.",
          sectionsButton: "\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062c\u0647\u0648\u064a \u0627\u0644\u062c\u062f\u064a\u062f",
          editorialTitles: [
            "\u0648\u0639\u062f \u062a\u062d\u0631\u064a\u0631\u064a \u0628\u0633\u064a\u0637",
            "\u0644\u063a\u0629 \u0628\u0635\u0631\u064a\u0629 \u0645\u0634\u062a\u0631\u0643\u0629",
            "\u0642\u0627\u0639\u062f\u0629 \u0623\u0642\u0648\u0649 \u0644\u0645\u0627 \u0628\u0639\u062f"
          ],
          editorialCopies: [
            "\u062a\u0648\u0641\u064a\u0631 \u0627\u0644\u0648\u0642\u062a \u0644\u0644\u0642\u0627\u0631\u0626 \u0628\u0639\u0631\u0636 \u0623\u0648\u0636\u062d \u0648\u0623\u0643\u062b\u0631 \u0627\u0633\u062a\u0642\u0631\u0627\u0631\u0627.",
            "\u0627\u0644\u0645\u0644\u0627\u062d\u0629 \u0648\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646 \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0648\u0627\u0644\u062a\u0630\u064a\u064a\u0644 \u062a\u062a\u0643\u0644\u0645 \u0627\u0644\u0644\u063a\u0629 \u0646\u0641\u0633\u0647\u0627.",
            "\u0627\u0644\u0645\u0648\u0642\u0639 \u062c\u0627\u0647\u0632 \u0644\u0645\u062d\u062a\u0648\u0649 \u0623\u0643\u062b\u0631 \u0648\u0628\u064a\u0627\u0646\u0627\u062a \u0623\u063a\u0646\u0649."
          ],
          footerNote: "\u0648\u0627\u062c\u0647\u0629 \u0623\u0643\u062b\u0631 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 \u0644\u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629 \u0628\u0648\u0636\u0648\u062d \u0648\u0625\u064a\u0642\u0627\u0639 \u0648\u062a\u0645\u0627\u0633\u0643."
        }
      : null;

  setIconText(".hero-copy-stack .eyebrow", copy?.heroEyebrow);
  setText(".hero-title", copy?.heroTitle);
  setText(".hero-copy", copy?.heroCopy);
  setText(".hero-actions a[href=\"#home-headline-feed\"]", copy?.heroPrimary);
  setText(".hero-actions a[href=\"#rubriques\"]", copy?.heroSecondary);
  setText(".hero-manifesto-top small", copy?.manifestoSmall);
  setText(".hero-manifesto h2", copy?.manifestoTitle);
  setText(".hero-manifesto p", copy?.manifestoCopy);
  setMany(".hero-bands .hero-band span", copy?.bands);
  setMany(".hero-bands .hero-band strong", copy?.bandStrong);
  setMany(".hero-metrics .metric-label", copy?.metricLabels);
  setText(".pulse-panel h3", copy?.pulseTitle);
  setText(".pulse-panel p", copy?.pulseCopy);
  setText(".headline-shell .section-title", copy?.headlineTitle);
  setText(".headline-shell .section-copy", copy?.headlineCopy);
  setText(".radar-shell .section-title", copy?.radarTitle);
  setText(".radar-shell .section-copy", copy?.radarCopy);
  const spotlightSection = document.querySelector("#home-spotlight-feed")?.closest(".section-block");
  if (spotlightSection) {
    setText(".section-title", copy?.spotlightTitle, spotlightSection);
    setText(".section-copy", copy?.spotlightCopy, spotlightSection);
    setText(".btn", copy?.spotlightButton, spotlightSection);
  }
  setText(".manifesto-panel .section-title", copy?.manifesto2Title);
  setText(".manifesto-panel .section-copy", copy?.manifesto2Copy);
  setMany(".manifesto-panel .list-clean span", copy?.manifestoPoints);
  setMany(".feature-tower .feature-card h3", currentLanguage === "fr" ? null : [t("nav.politique"), t("nav.economie"), t("nav.sport"), t("nav.technologie")]);
  setMany(".feature-tower .feature-card p", copy?.featureCopies);
  setText(".member-panel .section-title", copy?.memberTitle);
  setText(".member-panel .section-copy", copy?.memberCopy);
  setText(".member-cta h3", copy?.memberCtaTitle);
  setText(".member-cta p", copy?.memberCtaCopy);
  setText(".member-cta a", copy?.memberButton);
  const sectionsBlock = document.querySelector("#rubriques");
  if (sectionsBlock) {
    setText(".section-title", copy?.sectionsTitle, sectionsBlock);
    setText(".section-copy", copy?.sectionsCopy, sectionsBlock);
    setText(".btn", copy?.sectionsButton, sectionsBlock);
  }
  setMany(".category-card .category-label", currentLanguage === "fr" ? null : [t("nav.politique"), t("nav.economie"), t("nav.societe"), t("nav.sport"), t("nav.monde"), t("nav.culture"), t("nav.regions"), t("nav.technologie")]);
  setMany(".category-card h3", copy?.categoryTitles);
  setMany(".category-card p", copy?.categoryCopies);
  setMany(".editorial-card h3", copy?.editorialTitles);
  setMany(".editorial-card p", copy?.editorialCopies);
  setText(".footer-panel .footer-note", copy?.footerNote);
}

function applyAuthPageTranslations() {
  const copy = currentLanguage === "en"
    ? {
        eyebrow: "Member area",
        title: "Sign in for a more personal experience",
        copy: "This first version adds simple local authentication: account creation, sign in, persistent session, and visible user state in the interface.",
        briefSmall: "Already ready",
        briefTitle: "Strong base for what comes next",
        briefCopy: "This foundation can later host favorites, preferences, reading history, or an admin area.",
        registerTitle: "Create an account",
        registerCopy: "Quick sign-up with name, email, and password.",
        loginTitle: "Sign in",
        loginCopy: "Use your email and password to open your session.",
        sessionTitle: "Session status",
        password: "Password",
        createButton: "Create my account",
        footerTitle: "Authentication",
        footerNote: "Local sign-in, cookie-based session, and persistent user storage inside the project."
      }
    : currentLanguage === "ar"
      ? {
          eyebrow: "\u0641\u0636\u0627\u0621 \u0627\u0644\u0623\u0639\u0636\u0627\u0621",
          title: "\u0633\u062c\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0644\u062a\u062c\u0631\u0628\u0629 \u0623\u0643\u062b\u0631 \u0634\u062e\u0635\u064a\u0629",
          copy: "\u062a\u0636\u064a\u0641 \u0647\u0630\u0647 \u0627\u0644\u0646\u0633\u062e\u0629 \u0645\u0635\u0627\u062f\u0642\u0629 \u0645\u062d\u0644\u064a\u0629 \u0628\u0633\u064a\u0637\u0629: \u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628\u060c \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644\u060c \u062c\u0644\u0633\u0629 \u0645\u0633\u062a\u0645\u0631\u0629\u060c \u0648\u0638\u0647\u0648\u0631 \u062d\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645.",
          briefSmall: "\u0645\u0627 \u0647\u0648 \u062c\u0627\u0647\u0632",
          briefTitle: "\u0642\u0627\u0639\u062f\u0629 \u0635\u0644\u0628\u0629 \u0644\u0644\u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629",
          briefCopy: "\u064a\u0645\u0643\u0646 \u0644\u0647\u0630\u0647 \u0627\u0644\u0642\u0627\u0639\u062f\u0629 \u0623\u0646 \u062a\u0633\u062a\u0636\u064a\u0641 \u0627\u0644\u0645\u0641\u0636\u0644\u0627\u062a \u0648\u0627\u0644\u062a\u0641\u0636\u064a\u0644\u0627\u062a \u0648\u0633\u062c\u0644 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0644\u0627\u062d\u0642\u0627.",
          registerTitle: "\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628",
          registerCopy: "\u062a\u0633\u062c\u064a\u0644 \u0633\u0631\u064a\u0639 \u0628\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0648\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631.",
          loginTitle: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644",
          loginCopy: "\u0627\u0633\u062a\u0639\u0645\u0644 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0648\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0644\u0641\u062a\u062d \u062c\u0644\u0633\u062a\u0643.",
          sessionTitle: "\u062d\u0627\u0644\u0629 \u0627\u0644\u062c\u0644\u0633\u0629",
          password: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
          createButton: "\u0623\u0646\u0634\u0626 \u062d\u0633\u0627\u0628\u064a",
          footerTitle: "\u0627\u0644\u0645\u0635\u0627\u062f\u0642\u0629",
          footerNote: "\u062a\u0633\u062c\u064a\u0644 \u062f\u062e\u0648\u0644 \u0645\u062d\u0644\u064a \u0648\u062c\u0644\u0633\u0629 \u0645\u062d\u0645\u064a\u0629 \u0628\u0643\u0648\u0643\u064a \u0648\u0642\u0627\u0639\u062f\u0629 \u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646 \u0645\u062d\u0641\u0648\u0638\u0629."
        }
      : null;

  setIconText(".page-hero .eyebrow", copy?.eyebrow);
  setText(".page-title", copy?.title);
  setText(".page-copy", copy?.copy);
  setText(".brief-card small", copy?.briefSmall);
  setText(".brief-card h2", copy?.briefTitle);
  setText(".brief-card p", copy?.briefCopy);

  const panels = document.querySelectorAll(".section-block .content-panel");
  if (panels[0]) {
    setText(".section-title", copy?.registerTitle, panels[0]);
    setText(".section-copy", copy?.registerCopy, panels[0]);
  }
  if (panels[1]) {
    setText(".section-title", copy?.loginTitle, panels[1]);
    setText(".section-copy", copy?.loginCopy, panels[1]);
  }
  if (panels[2]) {
    setText(".section-title", copy?.sessionTitle, panels[2]);
  }

  const registerLabels = document.querySelectorAll("#register-form .auth-label");
  setNodeText(registerLabels[0], t("common.name"));
  setNodeText(registerLabels[1], t("common.email"));
  setNodeText(registerLabels[2], copy?.password);

  const loginLabels = document.querySelectorAll("#login-form .auth-label");
  setNodeText(loginLabels[0], t("common.email"));
  setNodeText(loginLabels[1], copy?.password);

  setText("#register-form button", copy?.createButton);
  setText("#login-form button", currentLanguage === "fr" ? null : t("common.login"));
  setText(".footer-panel h2", copy?.footerTitle);
  setText(".footer-panel .footer-note", copy?.footerNote);
}

function applyCategoryPageTranslations(pageKey) {
  const byLanguage = {
    en: {
      politique: {
        eyebrow: "Politics section",
        title: "Institutions, diplomacy, and the execution of public action",
        copy: "This section gathers the subjects shaping Moroccan public life: political trade-offs, reforms, diplomatic influence, and the ability of institutions to deliver results.",
        briefSmall: "Editorial angle",
        briefTitle: "Read beyond the announcement",
        briefCopy: "We focus on the political meaning of decisions, but also on their concrete execution and impact.",
        metrics: ["deep articles to launch the section.", "unified presentation with dynamic content loading.", "degree reading of institutions, diplomatic signals, and reforms."],
        mainTitle: "What we follow here",
        mainCopy: "Political issues do not stop at statements. This page highlights the topics shaping the Kingdom's trajectory: institutional quality, government priorities, strategic diplomacy, and implementation follow-through.",
        sideTitle: "Guiding line",
        sideCopy: "Spot the decisions that change how the country is read, not only the ones dominating the media cycle.",
        autoTitle: "Automation",
        autoCopy: "The cards below update automatically for this category.",
        footerTitle: "Politics",
        footerCopy: "A calmer, more serious presentation of Morocco's public and institutional issues."
      },
      economie: { eyebrow: "Economy section", title: "Growth, investment, and signals of the Kingdom's transformation", copy: "Morocco's economy is read over time: jobs, capital flows, business confidence, strategic sectors, and the pace of major projects.", briefSmall: "Reading of the moment", briefTitle: "See numbers in context", briefCopy: "A statistic becomes more useful when it is connected to public decisions, sectors, and real uses.", featureTitles: ["Investment", "Jobs", "Financing"], featureCopies: ["Attraction capacity, structuring projects, and capital flowing toward leading sectors.", "The labor market remains a key indicator for measuring the strength of economic momentum.", "Savings, funding needs, and the smoothness of trust channels."], autoTitle: "Automation", autoCopy: "The cards below update automatically for this category.", footerTitle: "Economy", footerCopy: "A stronger section for tracking growth drivers and the weak points of Morocco's economy." },
      sport: { eyebrow: "Sport section", title: "Moroccan sport between performance, public energy, and influence", copy: "This section follows the sporting events that matter, the rise of Moroccan talent, and the impact of major competitions on the country's image and public enthusiasm.", briefSmall: "Reading of the moment", briefTitle: "Sport says more than the score", briefCopy: "Access to events, club attractiveness, and Morocco's symbolic capital are also major subjects.", autoTitle: "Automation", autoCopy: "The cards below update automatically for this category.", footerTitle: "Sport", footerCopy: "A sharper section for tracking sports performance, its audiences, and its impact on Morocco's image." },
      culture: { eyebrow: "Culture section", title: "Living heritage, contemporary creation, and Moroccan imaginaries", copy: "Moroccan culture cannot be reduced to heritage or the contemporary scene: it moves between both, between tradition, transmission, reinterpretation, and new forms of creation.", briefSmall: "Editorial angle", briefTitle: "Tell the country differently", briefCopy: "The culture section highlights the places, gestures, and events that give depth to the national story.", autoTitle: "Automation", autoCopy: "The cards below update automatically for this category.", footerTitle: "Culture", footerCopy: "A more elegant section to highlight heritage, artistic scenes, and Moroccan cultural imagination." },
      technologie: { eyebrow: "Technology section", title: "Innovation, digital services, and new uses in Morocco", copy: "Morocco's digital landscape is being built at several speeds: administration, startups, infrastructure, AI, and skills.", briefSmall: "Reading of the moment", briefTitle: "Watch what becomes concrete", briefCopy: "Innovation only matters when it transforms services, businesses, or the citizen experience.", autoTitle: "Automation", autoCopy: "The cards below update automatically for this category.", footerTitle: "Technology", footerCopy: "A more contemporary section for tracking useful innovation, startups, and Morocco's digital transformation." },
      societe: { eyebrow: "Society section", title: "Education, health, youth, and social life", copy: "This section follows concrete daily-life changes: school, youth employment, public services, social justice, and quality of life.", briefSmall: "Editorial angle", briefTitle: "Read the real impact", briefCopy: "We track the decisions that genuinely change the lives of residents and territories.", metrics: ["monitoring of social issues and public services.", "articles displayed quickly with progressive loading.", "degree reading of health, education, justice, and inclusion issues."], autoTitle: "Automation", autoCopy: "The cards below update automatically for this category.", footerTitle: "Society", footerCopy: "A clearer reading of social dynamics, from education to health." },
      monde: { eyebrow: "World section", title: "Morocco within regional and global balances", copy: "Africa, Europe, the Gulf, multilateral diplomacy, and strategic partnerships: this page follows the Kingdom's international projection.", briefSmall: "Editorial angle", briefTitle: "Connect the local to the global", briefCopy: "We follow the files where international shifts change the reading of Morocco and its priorities.", metrics: ["focus on strategic neighborhoods and useful alliances.", "articles sorted quickly and served from the project cache.", "diplomacy, trade, security, and partnerships."], autoTitle: "Automation", autoCopy: "The cards refresh from the most relevant international feeds.", footerTitle: "World", footerCopy: "Morocco's international relations, read with more context and pace." },
      regions: { eyebrow: "Regions section", title: "The dynamics of Moroccan cities and territories", copy: "This page follows what is moving in the regions: local investment, major projects, mobility, urban life, and signals coming from the ground.", briefSmall: "Editorial angle", briefTitle: "Read the country through its territories", briefCopy: "From Casablanca to Dakhla, regions often reveal real change faster.", metrics: ["cities and regions covered in the project's editorial watch.", "articles visible quickly with progressive loading.", "infrastructure, local initiatives, territorial economy, and mobility."], autoTitle: "Automation", autoCopy: "The cards below give the site deeper territorial coverage.", footerTitle: "Regions", footerCopy: "A more concrete way to read Morocco through its cities, infrastructure, and local projects." }
    },
    ar: {
      politique: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u0633\u064a\u0627\u0633\u0629", title: "\u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a \u0648\u0627\u0644\u062f\u0628\u0644\u0648\u0645\u0627\u0633\u064a\u0629 \u0648\u062a\u0646\u0641\u064a\u0630 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0639\u0645\u0648\u0645\u064a", copy: "\u064a\u062c\u0645\u0639 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0636\u064a\u0639 \u0627\u0644\u062a\u064a \u062a\u0634\u0643\u0644 \u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u0639\u0645\u0648\u0645\u064a\u0629 \u0641\u064a \u0627\u0644\u0645\u063a\u0631\u0628.", briefSmall: "\u0632\u0627\u0648\u064a\u0629 \u062a\u062d\u0631\u064a\u0631\u064a\u0629", briefTitle: "\u0627\u0642\u0631\u0623 \u0645\u0627 \u0628\u0639\u062f \u0627\u0644\u0625\u0639\u0644\u0627\u0646", briefCopy: "\u0646\u0631\u0643\u0632 \u0639\u0644\u0649 \u0645\u0639\u0646\u0649 \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062a \u0648\u062a\u0646\u0641\u064a\u0630\u0647\u0627 \u0648\u0623\u062b\u0631\u0647\u0627.", metrics: ["\u0645\u0642\u0627\u0644\u0627\u062a \u062a\u062d\u0644\u064a\u0644\u064a\u0629 \u0644\u0628\u062f\u0621 \u0627\u0644\u0642\u0633\u0645.", "\u0639\u0631\u0636 \u0645\u0648\u062d\u062f \u0645\u0639 \u062a\u062d\u0645\u064a\u0644 \u062f\u064a\u0646\u0627\u0645\u064a\u0643\u064a.", "\u0642\u0631\u0627\u0621\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u0644\u0645\u0624\u0633\u0633\u0627\u062a \u0648\u0627\u0644\u0625\u0635\u0644\u0627\u062d\u0627\u062a."], mainTitle: "\u0645\u0627 \u0627\u0644\u0630\u064a \u0646\u062a\u0627\u0628\u0639\u0647 \u0647\u0646\u0627", mainCopy: "\u062a\u0628\u0631\u0632 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0645\u0648\u0627\u0636\u064a\u0639 \u0627\u0644\u062a\u064a \u062a\u0631\u0633\u0645 \u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0645\u0644\u0643\u0629.", sideTitle: "\u0627\u0644\u062e\u064a\u0637 \u0627\u0644\u0646\u0627\u0638\u0645", sideCopy: "\u0631\u0635\u062f \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u063a\u064a\u0631 \u0641\u0647\u0645 \u0627\u0644\u0628\u0644\u062f.", autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u062a\u062d\u062f\u062b \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0623\u062f\u0646\u0627\u0647 \u062a\u0644\u0642\u0627\u0626\u064a\u0627.", footerTitle: "\u0627\u0644\u0633\u064a\u0627\u0633\u0629", footerCopy: "\u0639\u0631\u0636 \u0623\u0647\u062f\u0623 \u0648\u0623\u0643\u062b\u0631 \u062c\u062f\u064a\u0629 \u0644\u0644\u0642\u0636\u0627\u064a\u0627 \u0627\u0644\u0639\u0645\u0648\u0645\u064a\u0629." },
      economie: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f", title: "\u0627\u0644\u0646\u0645\u0648 \u0648\u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0648\u0625\u0634\u0627\u0631\u0627\u062a \u062a\u062d\u0648\u0644 \u0627\u0644\u0645\u0645\u0644\u0643\u0629", copy: "\u064a\u064f\u0642\u0631\u0623 \u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f \u0627\u0644\u0645\u063a\u0631\u0628\u064a \u0639\u0644\u0649 \u0627\u0644\u0645\u062f\u0649 \u0627\u0644\u0628\u0639\u064a\u062f.", briefSmall: "\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0644\u062d\u0638\u0629", briefTitle: "\u0636\u0639 \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0641\u064a \u0633\u064a\u0627\u0642\u0647\u0627", briefCopy: "\u062a\u0635\u0628\u062d \u0627\u0644\u0625\u062d\u0635\u0627\u0621\u0627\u062a \u0623\u0641\u064a\u062f \u0639\u0646\u062f\u0645\u0627 \u062a\u0631\u062a\u0628\u0637 \u0628\u0627\u0644\u0648\u0627\u0642\u0639.", featureTitles: ["\u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631", "\u0627\u0644\u0634\u063a\u0644", "\u0627\u0644\u062a\u0645\u0648\u064a\u0644"], featureCopies: ["\u0627\u0644\u0642\u062f\u0631\u0629 \u0639\u0644\u0649 \u062c\u0630\u0628 \u0627\u0644\u0631\u0623\u0633\u0645\u0627\u0644 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0645\u0647\u064a\u0643\u0644\u0629.", "\u064a\u0628\u0642\u0649 \u0633\u0648\u0642 \u0627\u0644\u0634\u063a\u0644 \u0645\u0624\u0634\u0631\u0627 \u062d\u0627\u0633\u0645\u0627.", "\u0627\u0644\u0627\u062f\u062e\u0627\u0631 \u0648\u062d\u0627\u062c\u064a\u0627\u062a \u0627\u0644\u062a\u0645\u0648\u064a\u0644 \u0648\u0627\u0644\u062b\u0642\u0629."], autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u062a\u062d\u062f\u062b \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0623\u062f\u0646\u0627\u0647 \u062a\u0644\u0642\u0627\u0626\u064a\u0627.", footerTitle: "\u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f", footerCopy: "\u0642\u0633\u0645 \u0623\u0642\u0648\u0649 \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0645\u062d\u0631\u0643\u0627\u062a \u0627\u0644\u0646\u0645\u0648." },
      sport: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u0631\u064a\u0627\u0636\u0629", title: "\u0627\u0644\u0631\u064a\u0627\u0636\u0629 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629 \u0628\u064a\u0646 \u0627\u0644\u0623\u062f\u0627\u0621 \u0648\u0627\u0644\u062c\u0645\u0647\u0648\u0631", copy: "\u064a\u062a\u0627\u0628\u0639 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f \u0627\u0644\u0631\u064a\u0627\u0636\u064a\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0647\u0628 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629.", briefSmall: "\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0644\u062d\u0638\u0629", briefTitle: "\u0627\u0644\u0631\u064a\u0627\u0636\u0629 \u0623\u0643\u062b\u0631 \u0645\u0646 \u0646\u062a\u064a\u062c\u0629", briefCopy: "\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062a \u0648\u062c\u0627\u0630\u0628\u064a\u0629 \u0627\u0644\u0623\u0646\u062f\u064a\u0629 \u0645\u0648\u0627\u0636\u064a\u0639 \u0645\u0647\u0645\u0629.", autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u062a\u062d\u062f\u062b \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0623\u062f\u0646\u0627\u0647 \u062a\u0644\u0642\u0627\u0626\u064a\u0627.", footerTitle: "\u0627\u0644\u0631\u064a\u0627\u0636\u0629", footerCopy: "\u0642\u0633\u0645 \u0623\u0648\u0636\u062d \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u062f\u0627\u0621 \u0627\u0644\u0631\u064a\u0627\u0636\u064a." },
      culture: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u062b\u0642\u0627\u0641\u0629", title: "\u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0648\u0627\u0644\u0625\u0628\u062f\u0627\u0639 \u0627\u0644\u0645\u0639\u0627\u0635\u0631", copy: "\u062a\u062a\u062d\u0631\u0643 \u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629 \u0628\u064a\u0646 \u0627\u0644\u062a\u0631\u0627\u062b \u0648\u0627\u0644\u062d\u062f\u0627\u062b\u0629.", briefSmall: "\u0632\u0627\u0648\u064a\u0629 \u062a\u062d\u0631\u064a\u0631\u064a\u0629", briefTitle: "\u0627\u0644\u0628\u0644\u062f \u0628\u0631\u0648\u0627\u064a\u0629 \u0623\u062e\u0631\u0649", briefCopy: "\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0648\u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0627\u062a \u0648\u0627\u0644\u0623\u062d\u062f\u0627\u062b \u062a\u0645\u0646\u062d \u0627\u0644\u0633\u0631\u062f \u0639\u0645\u0642\u0627.", autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u062a\u062d\u062f\u062b \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0623\u062f\u0646\u0627\u0647 \u062a\u0644\u0642\u0627\u0626\u064a\u0627.", footerTitle: "\u0627\u0644\u062b\u0642\u0627\u0641\u0629", footerCopy: "\u0642\u0633\u0645 \u0623\u0643\u062b\u0631 \u0623\u0646\u0627\u0642\u0629 \u0644\u0625\u0628\u0631\u0627\u0632 \u0627\u0644\u062a\u0631\u0627\u062b \u0648\u0627\u0644\u0645\u0634\u0627\u0647\u062f \u0627\u0644\u0641\u0646\u064a\u0629." },
      technologie: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627", title: "\u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631 \u0648\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0641\u064a \u0627\u0644\u0645\u063a\u0631\u0628", copy: "\u064a\u062a\u0634\u0643\u0644 \u0627\u0644\u0645\u0634\u0647\u062f \u0627\u0644\u0631\u0642\u0645\u064a \u0628\u0633\u0631\u0639\u0627\u062a \u0645\u062a\u0639\u062f\u062f\u0629.", briefSmall: "\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0644\u062d\u0638\u0629", briefTitle: "\u0631\u0627\u0642\u0628 \u0645\u0627 \u064a\u0635\u0628\u062d \u0645\u0644\u0645\u0648\u0633\u0627", briefCopy: "\u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631 \u064a\u0647\u0645 \u0639\u0646\u062f\u0645\u0627 \u064a\u063a\u064a\u0631 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0648\u0627\u0644\u062a\u062c\u0631\u0628\u0629.", autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u062a\u062d\u062f\u062b \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0623\u062f\u0646\u0627\u0647 \u062a\u0644\u0642\u0627\u0626\u064a\u0627.", footerTitle: "\u0627\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627", footerCopy: "\u0642\u0633\u0645 \u0639\u0635\u0631\u064a \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0646\u0627\u0634\u0626\u0629." },
      societe: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u0645\u062c\u062a\u0645\u0639", title: "\u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0648\u0627\u0644\u0635\u062d\u0629 \u0648\u0627\u0644\u0634\u0628\u0627\u0628 \u0648\u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629", copy: "\u064a\u062a\u0627\u0628\u0639 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u062a\u062d\u0648\u0644\u0627\u062a \u0627\u0644\u064a\u0648\u0645\u064a \u0627\u0644\u0645\u0644\u0645\u0648\u0633\u0629.", briefSmall: "\u0632\u0627\u0648\u064a\u0629 \u062a\u062d\u0631\u064a\u0631\u064a\u0629", briefTitle: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0623\u062b\u0631 \u0627\u0644\u0645\u0644\u0645\u0648\u0633", briefCopy: "\u0646\u062a\u0627\u0628\u0639 \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u063a\u064a\u0631 \u0627\u0644\u062d\u064a\u0627\u0629 \u0641\u0639\u0644\u064a\u0627.", metrics: ["\u064a\u0642\u0638\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0636\u064a\u0639 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629.", "\u0645\u0642\u0627\u0644\u0627\u062a \u062a\u0638\u0647\u0631 \u0628\u0633\u0631\u0639\u0629.", "\u0642\u0631\u0627\u0621\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u0644\u062a\u0639\u0644\u064a\u0645 \u0648\u0627\u0644\u0635\u062d\u0629 \u0648\u0627\u0644\u0639\u062f\u0627\u0644\u0629."], autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u062a\u062d\u062f\u062b \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0623\u062f\u0646\u0627\u0647 \u062a\u0644\u0642\u0627\u0626\u064a\u0627.", footerTitle: "\u0627\u0644\u0645\u062c\u062a\u0645\u0639", footerCopy: "\u0642\u0631\u0627\u0621\u0629 \u0623\u0648\u0636\u062d \u0644\u0644\u062f\u064a\u0646\u0627\u0645\u064a\u0627\u062a \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629." },
      monde: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u0639\u0627\u0644\u0645", title: "\u0627\u0644\u0645\u063a\u0631\u0628 \u0641\u064a \u0627\u0644\u062a\u0648\u0627\u0632\u0646\u0627\u062a \u0627\u0644\u0625\u0642\u0644\u064a\u0645\u064a\u0629 \u0648\u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629", copy: "\u062a\u062a\u0628\u0639 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u062d\u0636\u0648\u0631 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u062f\u0648\u0644\u064a\u0627.", briefSmall: "\u0632\u0627\u0648\u064a\u0629 \u062a\u062d\u0631\u064a\u0631\u064a\u0629", briefTitle: "\u0635\u0644 \u0627\u0644\u0645\u062d\u0644\u064a \u0628\u0627\u0644\u0639\u0627\u0644\u0645\u064a", briefCopy: "\u0646\u062a\u0627\u0628\u0639 \u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u063a\u064a\u0631 \u0642\u0631\u0627\u0621\u0629 \u0623\u0648\u0644\u0648\u064a\u0627\u062a \u0627\u0644\u0645\u063a\u0631\u0628.", metrics: ["\u062a\u0631\u0643\u064a\u0632 \u0639\u0644\u0649 \u0627\u0644\u062c\u0648\u0627\u0631 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a.", "\u0645\u0642\u0627\u0644\u0627\u062a \u062a\u0641\u0631\u0632 \u0628\u0633\u0631\u0639\u0629.", "\u062f\u0628\u0644\u0648\u0645\u0627\u0633\u064a\u0629 \u0648\u062a\u062c\u0627\u0631\u0629 \u0648\u0623\u0645\u0646."], autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u062a\u062c\u062f\u062f \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0645\u0646 \u0623\u0643\u062b\u0631 \u0627\u0644\u062a\u062f\u0641\u0642\u0627\u062a \u0645\u0644\u0627\u0621\u0645\u0629.", footerTitle: "\u0627\u0644\u0639\u0627\u0644\u0645", footerCopy: "\u0639\u0644\u0627\u0642\u0627\u062a \u0627\u0644\u0645\u063a\u0631\u0628 \u0627\u0644\u062f\u0648\u0644\u064a\u0629 \u0628\u0642\u0631\u0627\u0621\u0629 \u0623\u0643\u062b\u0631 \u0633\u064a\u0627\u0642\u0627." },
      regions: { eyebrow: "\u0642\u0633\u0645 \u0627\u0644\u062c\u0647\u0627\u062a", title: "\u062f\u064a\u0646\u0627\u0645\u064a\u0627\u062a \u0627\u0644\u0645\u062f\u0646 \u0648\u0627\u0644\u0645\u062c\u0627\u0644\u0627\u062a \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629", copy: "\u062a\u062a\u0628\u0639 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u0645\u0627 \u064a\u062a\u062d\u0631\u0643 \u0641\u064a \u0627\u0644\u062c\u0647\u0627\u062a: \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0648\u0627\u0644\u0623\u0648\u0631\u0627\u0634 \u0648\u0627\u0644\u0645\u064a\u062f\u0627\u0646.", briefSmall: "\u0632\u0627\u0648\u064a\u0629 \u062a\u062d\u0631\u064a\u0631\u064a\u0629", briefTitle: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0628\u0644\u062f \u0645\u0646 \u062c\u0647\u0627\u062a\u0647", briefCopy: "\u062a\u0643\u0634\u0641 \u0627\u0644\u062c\u0647\u0627\u062a \u0627\u0644\u062a\u063a\u064a\u0631 \u0627\u0644\u062d\u0642\u064a\u0642\u064a \u0628\u0633\u0631\u0639\u0629.", metrics: ["\u0645\u062f\u0646 \u0648\u062c\u0647\u0627\u062a \u062f\u0627\u062e\u0644 \u0627\u0644\u064a\u0642\u0638\u0629.", "\u0645\u0642\u0627\u0644\u0627\u062a \u062a\u0638\u0647\u0631 \u0628\u0633\u0631\u0639\u0629.", "\u0628\u0646\u064a\u0627\u062a \u062a\u062d\u062a\u064a\u0629 \u0648\u0645\u0628\u0627\u062f\u0631\u0627\u062a \u0645\u062d\u0644\u064a\u0629 \u0648\u062a\u0646\u0642\u0644."], autoTitle: "\u0627\u0644\u0623\u062a\u0645\u062a\u0629", autoCopy: "\u062a\u0645\u0646\u062d \u0647\u0630\u0647 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0645\u0642\u0627 \u062a\u0631\u0627\u0628\u064a\u0627.", footerTitle: "\u0627\u0644\u062c\u0647\u0627\u062a", footerCopy: "\u0637\u0631\u064a\u0642\u0629 \u0623\u0643\u062b\u0631 \u0645\u0644\u0645\u0648\u0633\u064a\u0629 \u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u063a\u0631\u0628 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0645\u062f\u0646\u0647." }
    }
  };

  const copy = byLanguage[currentLanguage]?.[pageKey];

  setIconText(".page-hero .eyebrow", copy?.eyebrow);
  setText(".page-title", copy?.title);
  setText(".page-copy", copy?.copy);
  setText(".brief-card small", copy?.briefSmall);
  setText(".brief-card h2", copy?.briefTitle);
  setText(".brief-card p", copy?.briefCopy);
  setMany(".page-metrics .metric-label", copy?.metrics);
  setText(".section-block .content-panel .section-title", copy?.mainTitle);
  setText(".section-block .content-panel .section-copy", copy?.mainCopy);
  setText(".section-block .spotlight-card h3", copy?.sideTitle);
  setText(".section-block .spotlight-card p", copy?.sideCopy);
  setMany(".feature-card h2", copy?.featureTitles);
  setMany(".feature-card p", copy?.featureCopies);
  const autoBlock = document.querySelector("#feed-status-title")?.closest(".section-block")?.querySelector(".spotlight-card");
  if (autoBlock) {
    setText("h3", copy?.autoTitle, autoBlock);
    setText("p", copy?.autoCopy, autoBlock);
  }
  setText(".footer-panel h2", copy?.footerTitle);
  setText(".footer-panel .footer-note", copy?.footerCopy);
}

function getCurrentPageKey() {
  if (document.body.dataset.page) {
    return document.body.dataset.page;
  }

  if (document.body.dataset.newsPage) {
    return document.body.dataset.newsPage;
  }

  if (document.body.dataset.homeNews === "true") {
    return "home";
  }

  return "home";
}

function t(key, fallback = "") {
  const value = key.split(".").reduce((accumulator, part) => accumulator?.[part], TRANSLATIONS[currentLanguage]);
  const frenchFallback = key.split(".").reduce((accumulator, part) => accumulator?.[part], TRANSLATIONS.fr);
  return value ?? frenchFallback ?? fallback;
}

function tf(key, values = {}, fallback = "") {
  let message = t(key, fallback);

  Object.entries(values).forEach(([name, value]) => {
    message = message.replace(`{${name}}`, value);
  });

  return message;
}

async function hydrateAuthUi() {
  try {
    const response = await fetchApi("/api/auth/me");
    const payload = await response.json();
    renderNavbarAuth(payload.user || null);
    renderAccountCard(payload.user || null);
  } catch (error) {
    console.error("Impossible de recuperer l'etat de session.", error);
    renderNavbarAuth(null);
    renderAccountCard(null, t("common.verifySessionFailed"));
  }
}

function bindAuthForms() {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);

      await submitAuthForm("/api/auth/register", {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
      }, "common.authCreated");

      registerForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);

      await submitAuthForm("/api/auth/login", {
        email: formData.get("email"),
        password: formData.get("password")
      }, "common.authLoggedIn");

      loginForm.reset();
    });
  }

  document.addEventListener("click", async (event) => {
    const logoutButton = event.target.closest("[data-auth-action='logout']");
    const loadMoreButton = event.target.closest("[data-news-action='load-more']");
    const favoriteButton = event.target.closest("[data-smart-action='favorite']");
    const articleLink = event.target.closest("[data-article-open='true']");

    if (loadMoreButton) {
      event.preventDefault();
      await handleLoadMoreNews(loadMoreButton);
      return;
    }

    if (favoriteButton) {
      event.preventDefault();
      handleFavoriteToggle(favoriteButton);
      return;
    }

    if (articleLink) {
      recordArticleOpenFromNode(articleLink);
    }

    if (!logoutButton) {
      return;
    }

    event.preventDefault();

    try {
      await fetchApi("/api/auth/logout", {
        method: "POST"
      });
      setAuthMessage(t("common.authLoggedOut"));
      await hydrateAuthUi();
    } catch (error) {
      console.error("La deconnexion a echoue.", error);
      setAuthMessage(t("common.authLogoutFailed"));
    }
  });
}

async function submitAuthForm(url, payload, successMessageKey) {
  try {
    const response = await fetchApi(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Une erreur est survenue.");
    }

    setAuthMessage(t(successMessageKey));
    await hydrateAuthUi();
  } catch (error) {
    console.error("La requete d'authentification a echoue.", error);
    setAuthMessage(error.message || "La requete d'authentification a echoue.");
  }
}

function renderNavbarAuth(user) {
  const authNav = document.getElementById("auth-nav");

  if (!authNav) {
    return;
  }

  if (user) {
    authNav.innerHTML = `
      <div class="auth-pill">
        <div>
          <strong class="d-block">${escapeHtml(user.name)}</strong>
          <span>${escapeHtml(t("common.connected"))}</span>
        </div>
        <a class="btn btn-outline-brand btn-sm" href="auth.html">${escapeHtml(t("common.account"))}</a>
        <button class="btn btn-brand btn-sm" type="button" data-auth-action="logout">${escapeHtml(t("common.logout"))}</button>
      </div>
    `;
    return;
  }

  authNav.innerHTML = `
    <div class="auth-pill">
      <span class="text-muted">Invité</span>
      <a class="btn btn-outline-brand btn-sm" href="auth.html">Connexion</a>
    </div>
  `;
  const guestNode = authNav.querySelector(".text-muted");
  const loginNode = authNav.querySelector("a");

  if (guestNode) {
    guestNode.textContent = t("common.guest");
  }

  if (loginNode) {
    loginNode.textContent = t("common.login");
  }
}

function renderAccountCard(user, overrideMessage = "") {
  const accountCard = document.getElementById("auth-account-card");
  const statusCopy = document.getElementById("auth-status-copy");

  if (!accountCard && !statusCopy) {
    return;
  }

  if (statusCopy) {
    statusCopy.textContent = overrideMessage || (
      user
        ? t("common.sessionActive")
        : t("common.noSession")
    );
  }

  if (!accountCard) {
    return;
  }

  if (!user) {
    accountCard.innerHTML = `
      <div class="account-card-empty">
        <i class="bi bi-person-circle"></i>
        <p class="mb-0">${escapeHtml(t("common.accountEmpty"))}</p>
      </div>
    `;
    return;
  }

  accountCard.innerHTML = `
    <div class="account-card-grid">
      <div class="account-card-item">
        <small>${escapeHtml(t("common.name"))}</small>
        <strong>${escapeHtml(user.name)}</strong>
      </div>
      <div class="account-card-item">
        <small>${escapeHtml(t("common.email"))}</small>
        <strong>${escapeHtml(user.email)}</strong>
      </div>
      <div class="account-card-item">
        <small>${escapeHtml(t("common.createdAt"))}</small>
        <strong>${formatDate(user.createdAt)}</strong>
      </div>
      <div class="account-card-item">
        <small>${escapeHtml(t("common.status"))}</small>
        <strong>${escapeHtml(t("common.activeSession"))}</strong>
      </div>
    </div>
  `;
}

function setAuthMessage(message) {
  const statusCopy = document.getElementById("auth-status-copy");

  if (statusCopy) {
    statusCopy.textContent = message;
  }
}

async function renderAutomatedNews() {
  const feed = document.getElementById("news-feed");

  if (!feed) {
    return;
  }

  const category = document.body.dataset.newsPage;
  const categoryConfig = NEWS_CONFIG[category];

  if (!categoryConfig) {
    return;
  }

  updateFeedMeta(t("news.loadingTitle"), t("news.loadingCopy"));

  try {
    const { articles, fetchedAt, source, totalArticles } = await fetchProjectNews(category, {
      limit: INITIAL_FEED_LIMIT
    });

    if (!articles.length) {
      throw new Error("Aucun article trouve.");
    }

    storeFeedState(category, articles, INITIAL_FEED_LIMIT);
    renderNewsCards(feed, articles, categoryConfig, {
      category,
      canLoadMore: totalArticles > articles.length
    });
    markNewsRefresh(category);
    updateFeedMeta(
      t("news.loadedTitle"),
      buildNewsStatusCopy(source, fetchedAt)
    );
    renderSmartExperience();
  } catch (error) {
    console.error(`Impossible de charger la rubrique ${category}.`, error);
    const fallbackArticles = await loadFallbackArticles(category, categoryConfig);
    renderNewsCards(feed, fallbackArticles, categoryConfig);
    updateFeedMeta(
      t("news.fallbackTitle"),
      t("news.fallbackCopy")
    );
    renderSmartExperience();
  }
}

async function renderHomepageNews() {
  const feed = document.getElementById("home-news-feed");
  const headlineFeed = document.getElementById("home-headline-feed");
  const latestList = document.getElementById("home-latest-list");
  const spotlightFeed = document.getElementById("home-spotlight-feed");

  if (!feed || !headlineFeed || !latestList || !spotlightFeed || document.body.dataset.homeNews !== "true") {
    return;
  }

  updateGenericFeedMeta(
    "home-feed-status-title",
    "home-feed-status-copy",
    t("news.loadingTitle"),
    t("news.loadingCopy")
  );

  try {
    const overview = await fetchHomepageOverview();
    const articles = Object.entries(overview.sections)
      .flatMap(([category, payload]) =>
        (payload.articles || []).slice(0, 1).map((article) => ({
          ...article,
          category,
          categoryConfig: NEWS_CONFIG[category]
        }))
      )
      .slice(0, 6);

    if (!articles.length) {
      throw new Error("Aucun article de page d'accueil.");
    }

    renderHomepageCards(feed, articles);
    renderHeadlineCards(
      headlineFeed,
      (overview.headline || []).map((article) => ({
        ...article,
        categoryConfig: NEWS_CONFIG[article.category]
      }))
    );
    renderLatestList(
      latestList,
      (overview.latest || []).map((article) => ({
        ...article,
        categoryConfig: NEWS_CONFIG[article.category]
      }))
    );
    renderSpotlightCards(
      spotlightFeed,
      (overview.spotlight || []).map((article) => ({
        ...article,
        categoryConfig: NEWS_CONFIG[article.category]
      }))
    );
    updateGenericFeedMeta(
      "home-feed-status-title",
      "home-feed-status-copy",
      t("news.homepageLoadedTitle"),
      t("news.homepageLoadedCopy")
    );
    renderSmartExperience();
  } catch (error) {
    console.error("Impossible de charger les actualites de la page d'accueil.", error);
    feed.innerHTML = `
      <div class="col-12">
        <div class="content-panel">
          <p class="mb-0 text-muted">${escapeHtml(t("news.fallbackCopy"))}</p>
        </div>
      </div>
    `;
    updateGenericFeedMeta(
      "home-feed-status-title",
      "home-feed-status-copy",
      t("news.fallbackTitle"),
      t("news.homepageFallbackCopy")
    );
    renderSmartExperience();
  }
}

async function fetchHomepageOverview() {
  const response = await fetchApi("/api/overview");

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  return response.json();
}

async function fetchProjectNews(category, options = {}) {
  const { allowForceRefresh = true, limit = 12 } = options;
  const params = new URLSearchParams({ category });
  params.set("limit", String(limit));
  if (allowForceRefresh && shouldForceNewsRefresh(category)) {
    params.set("refresh", "1");
  }

  const response = await fetchApi(`/api/news?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data?.articles)) {
    throw new Error("Format de reponse invalide.");
  }

  return {
    source: data.source || "unknown",
    fetchedAt: data.fetchedAt || null,
    totalArticles: Number(data.totalArticles || 0),
    articles: data.articles.map((item) => ({
      title: item.title,
      url: item.url,
      image: item.image || "",
      sourceLabel: item.sourceLabel || "Source",
      dateLabel: item.dateLabel ? formatDate(item.dateLabel) : "Date inconnue",
      description: item.description || "Cliquez pour ouvrir l'article d'origine."
    }))
  };
}

async function loadFallbackArticles(category, categoryConfig) {
  if (categoryConfig.fallback) {
    try {
      const response = await fetch(categoryConfig.fallback);
      const posts = await response.json();
      const filteredPosts = posts.filter((post) => post.category === category);

      if (filteredPosts.length) {
        return filteredPosts.map((post) => ({
          title: post.title,
          url: "#",
          image: post.image || "",
          sourceLabel: t("news.sourceLocal"),
          dateLabel: t("news.fallbackDate"),
          description: post.content || post.full || ""
        }));
      }
    } catch (error) {
      console.error("Le fichier de secours local n'a pas pu etre charge.", error);
    }
  }

  return LOCAL_FALLBACKS[category] || [];
}

function ensureSmartShell() {
  const main = document.querySelector("main.container");
  if (!main) {
    return;
  }

  if (document.body.dataset.homeNews === "true" && !document.getElementById("smart-newsroom")) {
    const smartSection = document.createElement("section");
    smartSection.className = "section-block pt-0";
    smartSection.id = "smart-newsroom";
    smartSection.innerHTML = `
      <div class="smart-grid">
        <div class="content-panel smart-panel">
          <div class="smart-panel-head">
            <div>
              <span class="eyebrow"><i class="bi bi-cpu"></i>Smart Desk</span>
              <h2 class="section-title mb-2" id="smart-title">Smart Desk</h2>
              <p class="section-copy mb-0" id="smart-copy">Le site apprend ce que vous lisez et fait remonter un digest plus personnel.</p>
            </div>
            <div class="smart-stats" id="smart-stats"></div>
          </div>
        </div>
        <div class="content-panel smart-reco-panel">
          <h3 class="h4 mb-2" id="smart-reco-title">Radar personnel</h3>
          <div class="smart-chip-row" id="smart-chips"></div>
          <div class="smart-list" id="smart-list"></div>
        </div>
      </div>
    `;
    main.insertBefore(smartSection, document.getElementById("rubriques"));
  }

  if (document.body.dataset.newsPage && !document.getElementById("category-smart-note")) {
    const feedSection = document.querySelector("#news-feed")?.closest(".section-block");
    if (!feedSection) {
      return;
    }

    const note = document.createElement("div");
    note.className = "content-panel smart-inline-panel mb-4";
    note.id = "category-smart-note";
    feedSection.insertBefore(note, feedSection.firstChild);
  }
}

function getSmartCopy() {
  if (currentLanguage === "en") {
    return {
      title: "Smart Desk",
      copy: "The site learns what you read and lifts a more personal digest to the surface.",
      reco: "Personal radar",
      statsFavorites: "favorites",
      statsReads: "reads",
      statsCategory: "top beat",
      fallback: "Start opening articles or save a few stories and the site will shape a sharper radar for you.",
      picks: "Suggested sections",
      saved: "Saved stories",
      forYou: "For you",
      categoryCopy: "This page now adapts to your reading habits and saved stories.",
      openSaved: "Open saved story",
      save: "Save",
      savedAction: "Saved",
      readTime: "min read"
    };
  }

  if (currentLanguage === "ar") {
    return {
      title: "\u0645\u0643\u062a\u0628 \u0630\u0643\u064a",
      copy: "\u064a\u062a\u0639\u0644\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0645\u0627 \u062a\u0642\u0631\u0624\u0647 \u0648\u064a\u0628\u0631\u0632 \u0645\u0644\u062e\u0635\u0627 \u0623\u0642\u0631\u0628 \u0625\u0644\u0649 \u0627\u0647\u062a\u0645\u0627\u0645\u0643.",
      reco: "\u0631\u0627\u062f\u0627\u0631 \u0634\u062e\u0635\u064a",
      statsFavorites: "\u0645\u0641\u0636\u0644\u0627\u062a",
      statsReads: "\u0642\u0631\u0627\u0621\u0627\u062a",
      statsCategory: "\u0627\u0644\u0645\u062c\u0627\u0644 \u0627\u0644\u0623\u0642\u0648\u0649",
      fallback: "\u0627\u0628\u062f\u0623 \u0628\u0641\u062a\u062d \u0628\u0639\u0636 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a \u0623\u0648 \u062d\u0641\u0638 \u0642\u0635\u0635 \u0648\u0633\u064a\u0634\u0643\u0644 \u0627\u0644\u0645\u0648\u0642\u0639 \u0631\u0627\u062f\u0627\u0631\u0627 \u0623\u0630\u0643\u0649.",
      picks: "\u0623\u0642\u0633\u0627\u0645 \u0645\u0642\u062a\u0631\u062d\u0629",
      saved: "\u0645\u0642\u0627\u0644\u0627\u062a \u0645\u062d\u0641\u0648\u0638\u0629",
      forYou: "\u0644\u0643",
      categoryCopy: "\u062a\u062a\u0643\u064a\u0641 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0622\u0646 \u0645\u0639 \u0639\u0627\u062f\u0627\u062a \u0642\u0631\u0627\u0621\u062a\u0643 \u0648\u0645\u0642\u0627\u0644\u0627\u062a\u0643 \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629.",
      openSaved: "\u0627\u0641\u062a\u062d \u0627\u0644\u0645\u0642\u0627\u0644 \u0627\u0644\u0645\u062d\u0641\u0648\u0638",
      save: "\u062d\u0641\u0638",
      savedAction: "\u0645\u062d\u0641\u0648\u0638",
      readTime: "\u062f\u0642\u064a\u0642\u0629"
    };
  }

  return {
    title: "Smart Desk",
    copy: "Le site apprend ce que vous lisez et fait remonter un digest plus personnel.",
    reco: "Radar personnel",
    statsFavorites: "favoris",
    statsReads: "lectures",
    statsCategory: "rubrique forte",
    fallback: "Ouvrez quelques articles ou sauvegardez des histoires et le site commencera a vous proposer un radar plus utile.",
    picks: "Rubriques suggerees",
    saved: "Histoires sauvegardees",
    forYou: "Pour vous",
    categoryCopy: "Cette page s'adapte maintenant a vos habitudes de lecture et a vos articles enregistres.",
    openSaved: "Ouvrir l'article sauvegarde",
    save: "Sauvegarder",
    savedAction: "Sauvegarde",
    readTime: "min de lecture"
  };
}

function getSmartProfile() {
  try {
    const raw = window.localStorage.getItem(SMART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      favorites: parsed?.favorites || [],
      recentReads: parsed?.recentReads || [],
      categoryReads: parsed?.categoryReads || {}
    };
  } catch {
    return { favorites: [], recentReads: [], categoryReads: {} };
  }
}

function saveSmartProfile(profile) {
  try {
    window.localStorage.setItem(SMART_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage write failures.
  }
}

function createArticleKey(article) {
  return `${article.category || "general"}::${article.url || article.title}`;
}

function normalizeArticle(article, categoryConfig = null, category = "") {
  const resolvedCategory = article.category || category || "";
  const resolvedConfig = article.categoryConfig || categoryConfig || NEWS_CONFIG[resolvedCategory] || null;
  return {
    ...article,
    category: resolvedCategory,
    categoryConfig: resolvedConfig,
    key: createArticleKey({ ...article, category: resolvedCategory })
  };
}

function rememberRenderedArticles(articles) {
  window.__marocInfoSmartArticles = window.__marocInfoSmartArticles || [];
  const combined = [...window.__marocInfoSmartArticles, ...articles.map((article) => normalizeArticle(article, article.categoryConfig, article.category))];
  const deduped = [];
  const seen = new Set();

  combined.reverse().forEach((article) => {
    if (!seen.has(article.key)) {
      seen.add(article.key);
      deduped.push(article);
    }
  });

  window.__marocInfoSmartArticles = deduped.reverse().slice(-60);
}

function estimateReadTime(article) {
  const text = `${article.title || ""} ${article.description || ""}`.trim();
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 38));
}

function getFavoriteMarkup(article) {
  const smartCopy = getSmartCopy();
  const profile = getSmartProfile();
  const isSaved = profile.favorites.some((item) => item.key === article.key);
  return `
    <button class="smart-save-btn ${isSaved ? "is-saved" : ""}" type="button"
      data-smart-action="favorite"
      data-article-key="${escapeHtml(article.key)}"
      aria-label="${escapeHtml(isSaved ? smartCopy.savedAction : smartCopy.save)}">
      <i class="bi ${isSaved ? "bi-bookmark-heart-fill" : "bi-bookmark-plus"}"></i>
      <span>${escapeHtml(isSaved ? smartCopy.savedAction : smartCopy.save)}</span>
    </button>
  `;
}

function getSignalMarkup(article) {
  const smartCopy = getSmartCopy();
  return `
    <div class="smart-signals">
      <span class="smart-signal"><i class="bi bi-lightning-charge"></i>${escapeHtml(`${estimateReadTime(article)} ${smartCopy.readTime}`)}</span>
      <span class="smart-signal"><i class="bi bi-stars"></i>${escapeHtml((article.categoryConfig?.label || "News"))}</span>
    </div>
  `;
}

function getArticleLinkAttributes(article) {
  return `
    data-article-open="true"
    data-article-key="${escapeHtml(article.key)}"
    data-article-category="${escapeHtml(article.category || "")}"
    data-article-title="${escapeHtml(article.title || "")}"
  `;
}

function recordArticleOpenFromNode(node) {
  const profile = getSmartProfile();
  const key = node.dataset.articleKey;
  const category = node.dataset.articleCategory || "general";
  const title = node.dataset.articleTitle || "";
  profile.recentReads = [{ key, category, title, at: new Date().toISOString() }, ...profile.recentReads.filter((item) => item.key !== key)].slice(0, 18);
  profile.categoryReads[category] = (profile.categoryReads[category] || 0) + 1;
  saveSmartProfile(profile);
  renderSmartExperience();
}

function handleFavoriteToggle(button) {
  const key = button.dataset.articleKey;
  const profile = getSmartProfile();
  const article = (window.__marocInfoSmartArticles || []).find((item) => item.key === key);

  if (!article) {
    return;
  }

  const exists = profile.favorites.some((item) => item.key === key);
  profile.favorites = exists
    ? profile.favorites.filter((item) => item.key !== key)
    : [article, ...profile.favorites.filter((item) => item.key !== key)].slice(0, 12);

  saveSmartProfile(profile);
  renderSmartExperience();
  document.querySelectorAll(`[data-smart-action='favorite'][data-article-key="${CSS.escape(key)}"]`).forEach((node) => {
    const updated = getFavoriteMarkup(article);
    node.outerHTML = updated;
  });
}

function renderSmartExperience() {
  renderSmartHomepage();
  renderCategorySmartNote();
}

function renderSmartHomepage() {
  const section = document.getElementById("smart-newsroom");
  if (!section) {
    return;
  }

  const smartCopy = getSmartCopy();
  const profile = getSmartProfile();
  const statsNode = document.getElementById("smart-stats");
  const chipsNode = document.getElementById("smart-chips");
  const listNode = document.getElementById("smart-list");
  const topCategory = Object.entries(profile.categoryReads).sort((a, b) => b[1] - a[1])[0]?.[0];
  const suggested = Object.keys(NEWS_CONFIG)
    .sort((left, right) => (profile.categoryReads[right] || 0) - (profile.categoryReads[left] || 0))
    .slice(0, 4);

  setText("#smart-title", smartCopy.title, section);
  setText("#smart-copy", smartCopy.copy, section);
  setText("#smart-reco-title", smartCopy.reco, section);

  statsNode.innerHTML = `
    <div class="smart-stat"><strong>${profile.favorites.length}</strong><span>${escapeHtml(smartCopy.statsFavorites)}</span></div>
    <div class="smart-stat"><strong>${profile.recentReads.length}</strong><span>${escapeHtml(smartCopy.statsReads)}</span></div>
    <div class="smart-stat"><strong>${escapeHtml(NEWS_CONFIG[topCategory]?.label || "-")}</strong><span>${escapeHtml(smartCopy.statsCategory)}</span></div>
  `;

  chipsNode.innerHTML = suggested.map((category) => `
    <a class="smart-chip" href="${escapeHtml(category)}.html">
      <i class="bi ${escapeHtml(NEWS_CONFIG[category].icon)}"></i>
      <span>${escapeHtml(NEWS_CONFIG[category].label)}</span>
    </a>
  `).join("");

  const listArticles = profile.favorites.length
    ? profile.favorites.slice(0, 3)
    : (window.__marocInfoSmartArticles || []).filter((article) => suggested.includes(article.category)).slice(0, 3);

  listNode.innerHTML = listArticles.length
    ? listArticles.map((article) => `
        <article class="smart-story">
          <span class="news-tag"><i class="bi ${escapeHtml(article.categoryConfig?.icon || "bi-newspaper")}"></i>${escapeHtml(article.categoryConfig?.label || article.category || "News")}</span>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.description || "")}</p>
          <a class="latest-link" href="${escapeHtml(article.url)}" ${getArticleLinkAttributes(article)} target="_blank" rel="noopener noreferrer">${escapeHtml(smartCopy.openSaved)}</a>
        </article>
      `).join("")
    : `<p class="text-muted mb-0">${escapeHtml(smartCopy.fallback)}</p>`;
}

function renderCategorySmartNote() {
  const panel = document.getElementById("category-smart-note");
  if (!panel) {
    return;
  }

  const smartCopy = getSmartCopy();
  const profile = getSmartProfile();
  const currentCategory = document.body.dataset.newsPage;
  const currentReads = profile.categoryReads[currentCategory] || 0;
  const savedForCategory = profile.favorites.filter((item) => item.category === currentCategory).length;

  panel.innerHTML = `
    <div class="smart-inline-head">
      <span class="eyebrow"><i class="bi bi-stars"></i>${escapeHtml(smartCopy.forYou)}</span>
      <h2 class="section-title mb-2">${escapeHtml(NEWS_CONFIG[currentCategory]?.label || smartCopy.forYou)}</h2>
      <p class="section-copy mb-3">${escapeHtml(smartCopy.categoryCopy)}</p>
    </div>
    <div class="smart-inline-stats">
      <div class="smart-stat"><strong>${currentReads}</strong><span>${escapeHtml(smartCopy.statsReads)}</span></div>
      <div class="smart-stat"><strong>${savedForCategory}</strong><span>${escapeHtml(smartCopy.statsFavorites)}</span></div>
      <div class="smart-stat"><strong>${escapeHtml(profile.recentReads[0]?.title ? "Live" : "-")}</strong><span>${escapeHtml(smartCopy.statsCategory)}</span></div>
    </div>
  `;
}

function renderNewsCards(container, articles, categoryConfig, options = {}) {
  const { category = "", canLoadMore = false } = options;
  const smartArticles = articles.map((article) => normalizeArticle(article, categoryConfig, category));
  rememberRenderedArticles(smartArticles);
  container.innerHTML = articles
    .map(
      (article, index) => {
        const smartArticle = smartArticles[index];
        return `
        <div class="col-lg-6">
          <article class="news-card h-100">
            ${article.image ? `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">` : ""}
            <div class="card-body">
              <div class="news-card-top">
                <span class="news-tag">
                  <i class="bi ${categoryConfig.icon}"></i>
                  ${escapeHtml(categoryConfig.label)}
                </span>
                ${getFavoriteMarkup(smartArticle)}
              </div>
              <h2 class="card-title">${escapeHtml(article.title)}</h2>
              <p class="card-text">${escapeHtml(article.description)}</p>
              ${getSignalMarkup(smartArticle)}
            </div>
            <div class="card-footer">
              <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <div class="story-meta">
                  <span>${escapeHtml(article.sourceLabel)}</span>
                  <span>${escapeHtml(article.dateLabel)}</span>
                </div>
                <a
                  class="btn btn-brand"
                  href="${escapeHtml(article.url)}"
                  ${getArticleLinkAttributes(smartArticle)}
                  ${article.url === "#" ? "" : 'target="_blank" rel="noopener noreferrer"'}
                >
                  ${escapeHtml(t("news.readSource"))}
                </a>
              </div>
            </div>
          </article>
        </div>
      `;
      }
    )
    .join("");

  if (!articles.length) {
    container.innerHTML = `
      <div class="col-12">
        <div class="content-panel">
          <p class="mb-0 text-muted">${escapeHtml(t("news.noContent"))}</p>
        </div>
      </div>
    `;
    return;
  }

  if (canLoadMore && category) {
    container.insertAdjacentHTML("beforeend", `
      <div class="col-12">
        <div class="load-more-wrap">
          <button class="btn btn-outline-brand" type="button" data-news-action="load-more" data-category="${escapeHtml(category)}">
            ${escapeHtml(t("news.loadMore"))}
          </button>
        </div>
      </div>
    `);
  }
}

function updateFeedMeta(title, description) {
  updateGenericFeedMeta("feed-status-title", "feed-status-copy", title, description);
}

function updateGenericFeedMeta(titleId, descriptionId, title, description) {
  const titleNode = document.getElementById(titleId);
  const descNode = document.getElementById(descriptionId);

  if (titleNode) {
    titleNode.textContent = title;
  }

  if (descNode) {
    descNode.textContent = description;
  }
}

function renderHomepageCards(container, articles) {
  const smartArticles = articles.map((article) => normalizeArticle(article, article.categoryConfig, article.category));
  rememberRenderedArticles(smartArticles);
  container.innerHTML = articles
    .map(
      (article, index) => `
        <div class="col-md-6 col-xl-4">
          <article class="news-card h-100">
            ${article.image ? `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">` : ""}
            <div class="card-body">
              <div class="news-card-top">
                <span class="news-tag">
                  <i class="bi ${article.categoryConfig.icon}"></i>
                  ${escapeHtml(article.categoryConfig.label)}
                </span>
                ${getFavoriteMarkup(smartArticles[index])}
              </div>
              <h2 class="card-title">${escapeHtml(article.title)}</h2>
              <p class="card-text">${escapeHtml(article.description)}</p>
              ${getSignalMarkup(smartArticles[index])}
            </div>
            <div class="card-footer">
              <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <div class="story-meta">
                  <span>${escapeHtml(article.sourceLabel)}</span>
                  <span>${escapeHtml(article.dateLabel)}</span>
                </div>
                <a
                  class="btn btn-brand"
                  href="${escapeHtml(article.url)}"
                  ${getArticleLinkAttributes(smartArticles[index])}
                  ${article.url === "#" ? "" : 'target="_blank" rel="noopener noreferrer"'}
                >
                  ${escapeHtml(t("news.readSource"))}
                </a>
              </div>
            </div>
          </article>
        </div>
      `
    )
    .join("");
}

function renderHeadlineCards(container, articles) {
  const smartArticles = articles.map((article) => normalizeArticle(article, article.categoryConfig, article.category));
  rememberRenderedArticles(smartArticles);
  container.innerHTML = articles
    .slice(0, 3)
    .map(
      (article, index) => `
        <div class="${index === 0 ? "col-12" : "col-md-6"}">
          <article class="news-card h-100 ${index === 0 ? "headline-card" : ""}">
            ${article.image ? `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">` : ""}
            <div class="card-body">
              <div class="news-card-top">
                <span class="news-tag">
                  <i class="bi ${article.categoryConfig?.icon || "bi-newspaper"}"></i>
                  ${escapeHtml(article.categoryConfig?.label || "Actualite")}
                </span>
                ${getFavoriteMarkup(smartArticles[index])}
              </div>
              <h2 class="card-title">${escapeHtml(article.title)}</h2>
              <p class="card-text">${escapeHtml(article.description)}</p>
              ${getSignalMarkup(smartArticles[index])}
            </div>
            <div class="card-footer">
              <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <div class="story-meta">
                  <span>${escapeHtml(article.sourceLabel)}</span>
                  <span>${escapeHtml(article.dateLabel)}</span>
                </div>
                <a class="btn btn-brand" href="${escapeHtml(article.url)}" ${getArticleLinkAttributes(smartArticles[index])} target="_blank" rel="noopener noreferrer">${escapeHtml(t("news.readSource"))}</a>
              </div>
            </div>
          </article>
        </div>
      `
    )
    .join("");
}

function renderLatestList(container, articles) {
  const smartArticles = articles.map((article) => normalizeArticle(article, article.categoryConfig, article.category));
  rememberRenderedArticles(smartArticles);
  container.innerHTML = articles
    .slice(0, 8)
    .map(
      (article, index) => `
        <article class="latest-item">
          <span class="news-tag">
            <i class="bi ${article.categoryConfig?.icon || "bi-newspaper"}"></i>
            ${escapeHtml(article.categoryConfig?.label || "Actualite")}
          </span>
          <h3 class="latest-title">${escapeHtml(article.title)}</h3>
          <div class="story-meta mb-2">
            <span>${escapeHtml(article.sourceLabel)}</span>
            <span>${escapeHtml(article.dateLabel)}</span>
          </div>
          <a class="latest-link" href="${escapeHtml(article.url)}" ${getArticleLinkAttributes(smartArticles[index])} target="_blank" rel="noopener noreferrer">${escapeHtml(t("news.homepageOpen"))}</a>
        </article>
      `
    )
    .join("");
}

function renderSpotlightCards(container, articles) {
  const smartArticles = articles.map((article) => normalizeArticle(article, article.categoryConfig, article.category));
  rememberRenderedArticles(smartArticles);
  container.innerHTML = articles
    .slice(0, 6)
    .map(
      (article, index) => `
        <div class="col-md-6 col-xl-4">
          <article class="news-card h-100">
            ${article.image ? `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">` : ""}
            <div class="card-body">
              <div class="news-card-top">
                <span class="news-tag">
                  <i class="bi ${article.categoryConfig?.icon || "bi-newspaper"}"></i>
                  ${escapeHtml(article.categoryConfig?.label || "Actualite")}
                </span>
                ${getFavoriteMarkup(smartArticles[index])}
              </div>
              <h2 class="card-title">${escapeHtml(article.title)}</h2>
              <p class="card-text">${escapeHtml(article.description)}</p>
              ${getSignalMarkup(smartArticles[index])}
            </div>
            <div class="card-footer">
              <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <div class="story-meta">
                  <span>${escapeHtml(article.sourceLabel)}</span>
                  <span>${escapeHtml(article.dateLabel)}</span>
                </div>
                <a class="btn btn-brand" href="${escapeHtml(article.url)}" ${getArticleLinkAttributes(smartArticles[index])} target="_blank" rel="noopener noreferrer">${escapeHtml(t("news.readSource"))}</a>
              </div>
            </div>
          </article>
        </div>
      `
    )
    .join("");
}

async function handleLoadMoreNews(button) {
  const category = button.dataset.category;
  const categoryConfig = NEWS_CONFIG[category];
  const feed = document.getElementById("news-feed");

  if (!category || !categoryConfig || !feed) {
    return;
  }

  const currentState = getFeedState(category);
  const nextLimit = Math.min((currentState.limit || INITIAL_FEED_LIMIT) + FEED_INCREMENT, MAX_FEED_LIMIT);

  button.disabled = true;
  button.textContent = t("news.loadingButton");

  try {
    const { articles, totalArticles } = await fetchProjectNews(category, {
      allowForceRefresh: false,
      limit: nextLimit
    });

    storeFeedState(category, articles, nextLimit);
    renderNewsCards(feed, articles, categoryConfig, {
      category,
      canLoadMore: totalArticles > articles.length && nextLimit < MAX_FEED_LIMIT
    });
    renderSmartExperience();
  } catch (error) {
    console.error(`Impossible de charger plus d'articles pour ${category}.`, error);
    button.disabled = false;
    button.textContent = t("news.retry");
  }
}

function storeFeedState(category, articles, limit) {
  window.__marocInfoFeedState = window.__marocInfoFeedState || {};
  window.__marocInfoFeedState[category] = { articles, limit };
}

function getFeedState(category) {
  return window.__marocInfoFeedState?.[category] || { articles: [], limit: INITIAL_FEED_LIMIT };
}

function shouldForceNewsRefresh(category) {
  try {
    const lastRefresh = window.localStorage.getItem(getNewsRefreshKey(category));

    if (!lastRefresh) {
      return true;
    }

    const lastRefreshTime = Number(lastRefresh);
    if (!Number.isFinite(lastRefreshTime)) {
      return true;
    }

    return Date.now() - lastRefreshTime >= NEWS_REFRESH_INTERVAL_MS;
  } catch {
    return true;
  }
}

function markNewsRefresh(category) {
  try {
    window.localStorage.setItem(getNewsRefreshKey(category), String(Date.now()));
  } catch {
    // Ignore local storage write failures and keep the news flow working.
  }
}

function getNewsRefreshKey(category) {
  return `maroc-info:last-news-refresh:${category}`;
}

function buildNewsStatusCopy(source, fetchedAt) {
  const fetchedLabel = fetchedAt ? formatDate(fetchedAt) : "Date inconnue";

  if (source === "moroccan-sites") {
    return tf("news.sourceMoroccan", { date: fetchedLabel });
  }

  if (source === "moroccan-sites+gdelt") {
    return tf("news.sourceHybrid", { date: fetchedLabel });
  }

  if (source === "gdelt") {
    return tf("news.sourceGdelt", { date: fetchedLabel });
  }

  if (source === "cache" || source === "cache-fallback") {
    return tf("news.sourceCache", { date: fetchedLabel });
  }

  return tf("news.sourceUnknown", { date: fetchedLabel });
}

function formatDate(value) {
  if (!value) {
    return "Date inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function resolveApiBaseUrl() {
  const { hostname, port, protocol } = window.location;

  if (protocol === "file:") {
    return "http://localhost:3000";
  }

  if (["localhost", "127.0.0.1"].includes(hostname) && port && port !== "3000") {
    return `${window.location.protocol}//${hostname}:3000`;
  }

  return "";
}

function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

function fetchApi(path, options = {}) {
  return fetch(buildApiUrl(path), {
    credentials: "include",
    ...options
  });
}
