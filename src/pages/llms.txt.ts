import i18n from "@/I18n/i18nConfig";
import { ROUTES } from "@/constants/routes";
import { SITE_URL } from "@/constants/site";
import { applyPriceSettings } from "@/features/prices/catalog";
import { SERVICE_PAGES, servicePagePath } from "@/features/servicePages/constants";
import { STUDIO, servicePriceRange } from "@/features/servicePages/seo";
import { fetchPriceSettings } from "@/lib/priceOverrides";
import { GetServerSideProps } from "next";

// Plain-text summary of the studio for AI assistants and LLM crawlers (llmstxt.org)
const buildLlmsTxt = async () => {
  const { catalog } = applyPriceSettings(await fetchPriceSettings());
  const ua = (key: string) => i18n.t(key, { lng: "ua" });

  const services = SERVICE_PAGES.map((page) => {
    const range = servicePriceRange(catalog, page.priceSection);
    const price = range ? ` Ціна: від ${range.min} ₴ ${ua(`servicePages.common.${page.priceUnit}`)}.` : "";
    return `- [${ua(`servicePages.${page.key}.title`)}](${SITE_URL}${servicePagePath(page.slug)}): ${ua(`servicePages.${page.key}.intro`)}${price}`;
  }).join("\n");

  return `# ${STUDIO.name}

> Студія лазерної епіляції, електроепіляції, шугарингу, воскової депіляції та ендосфера-терапії у Львові. Працює з жінками та чоловіками, також проводить навчальні курси для майстрів.

- Адреса: ${STUDIO.street}, ${STUDIO.city}, ${STUDIO.postalCode}, Україна
- Графік: ${STUDIO.hoursDisplay}, без вихідних
- Телефон: ${STUDIO.phoneDisplay}
- Запис: форма на сайті ${SITE_URL}/ або за телефоном
- Instagram: ${STUDIO.instagram}

## Послуги

${services}

## Інше

- [Ціни на всі послуги](${SITE_URL}${ROUTES.prices})
- [Курси для майстрів](${SITE_URL}${ROUTES.courses})
- [Контакти](${SITE_URL}${ROUTES.contacts})
`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(await buildLlmsTxt());
  res.end();
  return { props: {} };
};

export default function LlmsTxt() {
  return null;
}
