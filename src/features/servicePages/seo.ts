import i18n from "@/I18n/i18nConfig";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { PriceCatalog, PriceSection, collectPriceRows } from "@/features/prices/catalog";
import { SERVICE_PAGES, ServicePage, servicePagePath } from "@/features/servicePages/constants";

export type FaqItem = { q: string; a: string };
type Lng = "ua" | "en";

// Studio facts shared by the structured data and llms.txt
export const STUDIO = {
  name: SITE_NAME,
  phone: "+380980303093",
  phoneDisplay: "+380 98 030 3093",
  street: "вул. Олени Степанівни, 8",
  city: "Львів",
  postalCode: "79000",
  latitude: 49.8442009,
  longitude: 24.0097199,
  opens: "09:00",
  closes: "20:00",
  hoursDisplay: "щодня з 9:00 до 20:00",
  instagram: "https://www.instagram.com/ms_studio_laser",
  tiktok: "https://www.tiktok.com/@ms_studio_epil",
  googleMaps: "https://www.google.com/maps?cid=16386841920656184017",
};

// Lowest/highest price currently on the site for a service (after /admin edits)
export const servicePriceRange = (catalog: PriceCatalog, section: PriceSection) => {
  const prices = collectPriceRows(catalog)
    .filter((row) => row.section === section && Array.isArray(row.value))
    .flatMap((row) => row.value as number[])
    // 0 marks a price that doesn't apply (e.g. diode laser, neck: [0, 500])
    .filter((price) => price > 0);
  return prices.length > 0 ? { min: Math.min(...prices), max: Math.max(...prices) } : null;
};

// Lowest price of one session: zone rows list [10 sessions, 1 session]
export const singleSessionMinPrice = (catalog: PriceCatalog, section: PriceSection) => {
  const prices = collectPriceRows(catalog)
    .filter((row) => row.section === section && Array.isArray(row.value))
    .map((row) => (row.value as number[])[(row.value as number[]).length - 1])
    .filter((price) => price > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
};

export const serviceFaq = (page: ServicePage, lng: Lng, minPrice?: number): FaqItem[] => {
  const t = (key: string, opts?: object) => i18n.t(key, { lng, ...opts });
  const items = t(`servicePages.${page.key}.faq`, { returnObjects: true }) as unknown as FaqItem[];
  const withPrice = (text: string) =>
    minPrice === undefined ? text : text.replace(/\{\{min\}\}/g, String(minPrice));
  return [
    ...(Array.isArray(items) ? items : []).map(({ q, a }) => ({ q, a: withPrice(a) })),
    { q: t("servicePages.common.faqLocationQ"), a: t("servicePages.common.faqLocationA") },
  ];
};

export const beautySalonSchema = () => ({
  "@type": "BeautySalon",
  "@id": `${SITE_URL}/#studio`,
  name: STUDIO.name,
  url: `${SITE_URL}/`,
  telephone: STUDIO.phone,
  image: `${SITE_URL}/assets/photos/carousel_1.webp`,
  logo: `${SITE_URL}/assets/icons/logo-black.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: STUDIO.street,
    addressLocality: STUDIO.city,
    postalCode: STUDIO.postalCode,
    addressCountry: "UA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: STUDIO.latitude,
    longitude: STUDIO.longitude,
  },
  hasMap: STUDIO.googleMaps,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: STUDIO.opens,
    closes: STUDIO.closes,
  },
  priceRange: "₴₴",
  sameAs: [STUDIO.instagram, STUDIO.tiktok, STUDIO.googleMaps],
});

const breadcrumbSchema = (...crumbs: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Головна", url: `${SITE_URL}/` }, ...crumbs].map(
    ({ name, url }, index) => ({ "@type": "ListItem", position: index + 1, name, item: url })
  ),
});

export const servicePageSchema = (page: ServicePage, catalog: PriceCatalog) => {
  const path = servicePagePath(page.slug);
  const url = `${SITE_URL}${path}`;
  const name = i18n.t(`servicePages.${page.key}.title`, { lng: "ua" });
  const range = servicePriceRange(catalog, page.priceSection);
  const faq = serviceFaq(page, "ua", range?.min);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      serviceType: i18n.t(page.name, { lng: "ua" }),
      description: page.seo.description,
      url,
      image: `${SITE_URL}${page.image}`,
      areaServed: { "@type": "City", name: STUDIO.city },
      provider: beautySalonSchema(),
      ...(range && {
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "UAH",
          lowPrice: range.min,
          highPrice: range.max,
          url: `${SITE_URL}/prices#${page.slug}`,
        },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    breadcrumbSchema({ name: "Послуги", url: `${SITE_URL}/services` }, { name, url }),
  ];
};

export const pricesPageSchema = (catalog: PriceCatalog) => {
  const url = `${SITE_URL}/prices`;

  return [
    {
      "@context": "https://schema.org",
      ...beautySalonSchema(),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Ціни на послуги",
        url,
        itemListElement: SERVICE_PAGES.flatMap((page) => {
          const range = servicePriceRange(catalog, page.priceSection);
          if (!range) return [];
          return [
            {
              "@type": "AggregateOffer",
              priceCurrency: "UAH",
              lowPrice: range.min,
              highPrice: range.max,
              url: `${url}#${page.slug}`,
              itemOffered: {
                "@type": "Service",
                name: i18n.t(page.name, { lng: "ua" }),
                url: `${SITE_URL}${servicePagePath(page.slug)}`,
              },
            },
          ];
        }),
      },
    },
    breadcrumbSchema({ name: "Ціни", url }),
  ];
};

// Only a single amount fits an Offer; ranges and hourly rates are left out
const courseOffer = (price: string, url: string) => {
  const text = i18n.exists(price) ? i18n.t(price, { lng: "ua" }) : price;
  const match = text.match(/^(\d[\d\s]*)\s*(\$|грн)$/);
  if (!match) return null;
  return {
    "@type": "Offer",
    price: match[1].replace(/\s/g, ""),
    priceCurrency: match[2] === "$" ? "USD" : "UAH",
    url,
  };
};

export const coursePageSchema = ({
  name,
  description,
  path,
  price = "",
}: {
  name: string;
  description: string;
  path: string;
  price?: string;
}) => {
  const url = `${SITE_URL}${path}`;
  const offer = courseOffer(price, url);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name,
      description,
      url,
      inLanguage: "uk",
      provider: beautySalonSchema(),
      ...(offer && { offers: offer }),
    },
    breadcrumbSchema({ name: "Курси", url: `${SITE_URL}/courses` }, { name, url }),
  ];
};

export const contactsPageSchema = () => {
  const url = `${SITE_URL}/contacts`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Контакти",
      url,
      mainEntity: beautySalonSchema(),
    },
    breadcrumbSchema({ name: "Контакти", url }),
  ];
};

export const galleryPageSchema = () => {
  const url = `${SITE_URL}/gallery`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Галерея студії та робіт майстрів",
      url,
      about: { "@id": `${SITE_URL}/#studio` },
    },
    breadcrumbSchema({ name: "Галерея", url }),
  ];
};
