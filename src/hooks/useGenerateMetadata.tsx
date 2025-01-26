import i18n from "@/I18n/i18nConfig";
import translationEN from "../I18n/en/translate.json";
import translationUA from "../I18n/ua/translate.json";


export async function useGenerateMetadata(page: string) {
  const locale = i18n.language;
  
  const baseUrl = 'https://ms-studio.com';

  const title =
    locale === "ua"
      //@ts-ignore
      ? translationUA.titleMetaData[page]
        //@ts-ignore
      : translationEN.titleMetaData[page];

  const description =
    locale === "ua"
      //@ts-ignore
      ? translationUA.descriptionMetaData[page]
        //@ts-ignore
      : translationEN.descriptionMetaData[page];

  const imageUrl = `${baseUrl}/assets/photos/general/photo-18.webp`; 

  const defaultTitle = "Лазерна епіляція, електроепіляція, шугаринг та воскова депіляція у Львові";
  const defaultDescription = 
    "Професійні послуги лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові. Гарантуємо безпеку, якість та комфорт. Запишіться на процедуру вже сьогодні!";

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      url: baseUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: "Лазерна епіляція у Львові",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl,
    },
    robots: "index, follow",
    canonical: baseUrl,
  };
}
