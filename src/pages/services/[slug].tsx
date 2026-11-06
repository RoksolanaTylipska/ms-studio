import { Seo } from "@/components/Seo";
import { fetchPagePhotos } from "@/lib/galleryImages";
import { PriceSettings, applyPriceSettings } from "@/features/prices/catalog";
import ServicePageContent from "@/features/servicePages/components/ServicePageContent";
import { SERVICE_PAGES, servicePagePath } from "@/features/servicePages/constants";
import { servicePageSchema } from "@/features/servicePages/seo";
import { fetchPriceSettings } from "@/lib/priceOverrides";
import { CloudinaryImage } from "@/types/image";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type Props = { slug: string; priceSettings: PriceSettings; photos: CloudinaryImage[] };

export default function ServicePage({ slug, priceSettings, photos }: Props) {
  const page = SERVICE_PAGES.find((p) => p.slug === slug)!;
  const structuredData = servicePageSchema(page, applyPriceSettings(priceSettings).catalog);

  return (
    <>
      <Seo
        title={page.seo.title}
        description={page.seo.description}
        path={servicePagePath(slug)}
        image={page.image}
      />
      <Head>
        <script
          key="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <ServicePageContent page={page} photos={photos} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: SERVICE_PAGES.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug);
  if (!SERVICE_PAGES.some((p) => p.slug === slug)) return { notFound: true };

  return {
    props: { slug, priceSettings: await fetchPriceSettings(), photos: await fetchPagePhotos(slug) },
    // Prices and photos from /admin show up within minutes without hitting
    // Cloudinary's rate-limited Search API on every visit
    revalidate: 300,
  };
};
