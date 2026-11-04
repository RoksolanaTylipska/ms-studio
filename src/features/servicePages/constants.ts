import { PriceSection } from "@/features/prices/catalog";

export type ServiceMethod = { title: string; description: string; img: string };

export type ServicePage = {
  slug: string;
  // Key under "servicePages" in translate.json
  key: "laser" | "electro" | "waxing" | "endosphere";
  // Key of the service name, as in the prices list
  name: string;
  image: string;
  imageAlt: string;
  // CSS object-position for cropped views of the photo (default: center)
  imagePosition?: string;
  methods: ServiceMethod[];
  // Where this service's prices live in the price catalog / on /prices
  priceSection: PriceSection;
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
    image: "/assets/photos/methods/alexandrite.webp",
    imageAlt: "Лазерна епіляція в студії MS STUDIO LASER у Львові",
    methods: [
      {
        title: "removalMethods.alexandrite_title",
        description: "removalMethods.alexandrite_description",
        img: "/assets/photos/methods/alexandrite.webp",
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
      title: "Електроепіляція у Львові — для світлого, сивого й темного волосся | MS STUDIO LASER",
      description:
        "Електроепіляція у Львові: працює зі світлим, сивим і рудим волоссям. Курс процедур, ціни за хвилину, підготовка, догляд і протипоказання.",
    },
  },
  {
    slug: "waxing",
    key: "waxing",
    name: "services.waxing",
    image: "/assets/photos/services/waxing.webp",
    imageAlt: "Воскова депіляція та шугаринг у студії MS STUDIO LASER у Львові",
    // Portrait photo: keep both hands and the falling wax in the crops
    imagePosition: "center 30%",
    methods: [
      {
        title: "removalMethods.sugaring_title",
        description: "removalMethods.sugaring_description",
        img: "/assets/photos/methods/sugar.webp",
      },
      {
        title: "removalMethods.wax_title",
        description: "removalMethods.wax_description",
        img: "/assets/photos/methods/waxing.webp",
      },
    ],
    priceSection: "waxing",
    priceUnit: "perZone",
    infoBlocks: [
      ["common.preparation", "preparation"],
      ["common.aftercare", "aftercare"],
      ["common.contraindications", "contraindications"],
    ],
    seo: {
      title: "Шугаринг і воскова депіляція у Львові — ціни | MS STUDIO LASER",
      description:
        "Шугаринг і воскова депіляція у Львові для жінок і чоловіків. Ціни на бікіні, пахви, ноги та обличчя, підготовка до процедури, догляд і протипоказання.",
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
export const servicePricesPath = (slug: string) => `/prices#${slug}`;
