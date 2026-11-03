import i18n from "@/I18n/i18nConfig";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { PriceCatalog, PriceSection, collectPriceRows } from "@/features/prices/catalog";
import { ServicePage, servicePagePath } from "@/features/servicePages/constants";

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
  hours: "Mo-Su 09:00-20:00",
  hoursDisplay: "щодня з 9:00 до 20:00",
  instagram: "https://www.instagram.com/ms_studio_laser",
  tiktok: "https://www.tiktok.com/@ms_studio_epil",
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
  address: {
    "@type": "PostalAddress",
    streetAddress: STUDIO.street,
    addressLocality: STUDIO.city,
    postalCode: STUDIO.postalCode,
    addressCountry: "UA",
  },
  openingHours: STUDIO.hours,
  priceRange: "₴₴",
  sameAs: [STUDIO.instagram, STUDIO.tiktok],
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Головна", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Послуги", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name, item: url },
      ],
    },
  ];
};
