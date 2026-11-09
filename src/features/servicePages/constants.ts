import { PriceSection } from "@/features/prices/catalog";

export type ServiceMethod = { title: string; description: string; img: string };

export type ServicePage = {
  slug: string;
  // Key under "servicePages" in translate.json
  key: "laser" | "alexandrite" | "diode" | "electro" | "sugaring" | "waxing" | "endosphere";
  // Page whose preparation/aftercare/contraindications lists are shared with this one
  listsFrom?: ServicePage["key"];
  // Key of the service name, as in the prices list
  name: string;
  image: string;
  imageAlt: string;
  // CSS object-position for cropped views of the photo (default: center)
  imagePosition?: string;
  methods: ServiceMethod[];
  // Where this service's prices live in the price catalog / on /prices
  priceSection: PriceSection;
  // Label that narrows the prices down when a section covers several services
  priceLabel?: string;
  // Accordion on /prices, when it is not the page's own slug
  pricesAnchor?: string;
  // Title of the accordion on /prices that this page's slug opens
  pricesTitle?: string;
  // General page: reachable by link, but not listed among the service cards
  overview?: boolean;
  // What one price is for, e.g. "за зону" (key under servicePages.common)
  priceUnit: "perZone" | "perMinute" | "perSession";
  // Card lists under the intro: [title key, items key] (both under servicePages)
  infoBlocks: [string, string][];
  seo: { title: string; description: string };
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "laser-epilation",
    key: "laser",
    name: "services.lazer",
    overview: true,
    image: "/assets/photos/methods/alexandrite-moveo.webp",
    imageAlt: "Лазерна епіляція в студії MS STUDIO LASER у Львові",
    methods: [
      {
        title: "removalMethods.alexandrite_title",
        description: "removalMethods.alexandrite_description",
        img: "/assets/photos/methods/alexandrite-moveo.webp",
      },
      {
        title: "removalMethods.diode_title",
        description: "removalMethods.diode_description",
        img: "/assets/photos/methods/diode.webp",
      },
    ],
    priceSection: "lazerEpilation",
    priceUnit: "perZone",
    infoBlocks: [
      ["common.preparation", "preparation"],
      ["common.aftercare", "aftercare"],
      ["common.contraindications", "contraindications"],
    ],
    seo: {
      title: "Лазерна епіляція у Львові — ціни, олександрит і діод | MS STUDIO LASER",
      description:
        "Лазерна епіляція у Львові на олександритовому лазері DEKA Motus AX та діодному Alvi Prague. Ціни на зони та комплекси, підготовка, догляд і протипоказання.",
    },
  },
  {
    slug: "alexandrite-laser",
    key: "alexandrite",
    listsFrom: "laser",
    name: "services.lazer_oleksandryt",
    // Wide crop with the laser in the middle, for the card and the page
    image: "/assets/photos/methods/alexandrite-moveo-wide.webp",
    imageAlt: "Лазерна епіляція олександритовим лазером у студії MS STUDIO LASER у Львові",
    methods: [],
    priceSection: "lazerEpilation",
    priceLabel: "services.lazer_oleksandryt_name",
    pricesAnchor: "laser-epilation",
    priceUnit: "perZone",
    infoBlocks: [
      ["common.preparation", "preparation"],
      ["common.aftercare", "aftercare"],
      ["common.contraindications", "contraindications"],
    ],
    seo: {
      title: "Олександритова лазерна епіляція DEKA Motus AX у Львові | MS STUDIO LASER",
      description:
        "Лазерна епіляція на олександритовому лазері DEKA Motus AX із технологією Moveo у Львові. Як проходить процедура, ціни, підготовка, догляд і протипоказання.",
    },
  },
  {
    slug: "diode-laser",
    key: "diode",
    listsFrom: "laser",
    name: "services.lazer_diod",
    image: "/assets/photos/methods/diode.webp",
    imageAlt: "Лазерна епіляція діодним лазером у студії MS STUDIO LASER у Львові",
    methods: [],
    priceSection: "lazerEpilation",
    priceLabel: "services.lazer_diod_name",
    pricesAnchor: "laser-epilation",
    priceUnit: "perZone",
    infoBlocks: [
      ["common.preparation", "preparation"],
      ["common.aftercare", "aftercare"],
      ["common.contraindications", "contraindications"],
    ],
    seo: {
      title: "Діодна епіляція Львів — Alvi Prague DL-7000 | MS STUDIO LASER",
      description:
        "Діодна лазерна епіляція Alvi Prague DL-7000 у Львові для жінок і чоловіків. Бікіні, пахви, ноги, спина та інші зони. Ціни й запис у MS STUDIO LASER.",
    },
  },
  {
    slug: "electroepilation",
    key: "electro",
    name: "services.electroepilation",
    image: "/assets/photos/services/electroepilation.webp",
    imageAlt: "Електроепіляція в студії MS STUDIO LASER у Львові",
    // Portrait photo: keep the face and the needle in the square/4:3 crops
    imagePosition: "center 15%",
    // The only method card would repeat the intro, so there is no devices block
    methods: [],
    priceSection: "electroepilation",
    priceUnit: "perMinute",
    infoBlocks: [
      ["common.preparation", "preparation"],
      ["common.aftercare", "aftercare"],
      ["common.contraindications", "contraindications"],
    ],
    seo: {
      title: "Електроепіляція Львів — жіноча та чоловіча | MS STUDIO LASER",
      description:
        "Жіноча та чоловіча електроепіляція у Львові. Видалення світлого, сивого й темного волосся назавжди. Обличчя, бікіні та тіло. Ціни й запис у MS STUDIO LASER.",
    },
  },
  {
    slug: "sugaring",
    key: "sugaring",
    listsFrom: "waxing",
    name: "removalMethods.sugaring_title",
    image: "/assets/photos/methods/sugar.webp",
    imageAlt: "Шугаринг у студії MS STUDIO LASER у Львові",
    methods: [],
    priceSection: "waxing",
    pricesAnchor: "waxing",
    priceUnit: "perZone",
    infoBlocks: [
      ["common.preparation", "preparation"],
      ["common.aftercare", "aftercare"],
      ["common.contraindications", "contraindications"],
    ],
    seo: {
      title: "Шугаринг у Львові — жіночий і чоловічий | MS STUDIO LASER",
      description:
        "Жіночий і чоловічий шугаринг у Львові в MS STUDIO LASER. Цукрова депіляція глибокого бікіні, пахв, ніг, рук і спини. Перегляньте ціни та запишіться.",
    },
  },
  {
    slug: "waxing",
    key: "waxing",
    name: "removalMethods.wax_title",
    image: "/assets/photos/services/waxing.webp",
    imageAlt: "Воскова депіляція у студії MS STUDIO LASER у Львові",
    // Portrait photo: keep both hands and the falling wax in the crops
    imagePosition: "center 30%",
    methods: [],
    priceSection: "waxing",
    pricesTitle: "services.waxing",
    priceUnit: "perZone",
    infoBlocks: [
      ["common.preparation", "preparation"],
      ["common.aftercare", "aftercare"],
      ["common.contraindications", "contraindications"],
    ],
    seo: {
      title: "Воскова депіляція Львів — жіноча та чоловіча | MS STUDIO LASER",
      description:
        "Жіноча та чоловіча воскова депіляція у Львові в MS STUDIO LASER. Глибоке бікіні, пахви, ноги, руки та спина. Перегляньте ціни й запишіться на процедуру.",
    },
  },
  {
    slug: "endosphere",
    key: "endosphere",
    name: "services.endosphere",
    image: "/assets/photos/carousel_3.webp",
    imageAlt: "Ендосфера-терапія в студії MS STUDIO LASER у Львові",
    methods: [],
    priceSection: "endosphere",
    priceUnit: "perSession",
    infoBlocks: [
      ["common.procedureTitle", "procedure"],
      ["common.forWhomTitle", "forWhom"],
      ["common.resultsTitle", "results"],
    ],
    seo: {
      title: "Ендосфера-терапія у Львові — ціни на курси | MS STUDIO LASER",
      description:
        "Ендосфера-терапія у Львові: мікровібрація та лімфодренаж проти набряків і целюліту. Легкість після першого сеансу, курс 6–12 процедур. Ціни на зони.",
    },
  },
];

export const servicePagePath = (slug: string) => `/services/${slug}`;

// Link to /prices with this service's accordion opened
export const servicePricesPath = (page: ServicePage) => `/prices#${page.pricesAnchor ?? page.slug}`;
