import { ROUTES } from "@/constants/routes";
import { SITE_URL } from "@/constants/site";
import { courseDetails } from "@/features/courses/constants/courseDetails";
import { GALLERY_FOLDERS } from "@/features/gallery/constants";
import { SERVICE_PAGES, servicePagePath } from "@/features/servicePages/constants";
import { fetchGalleryImages, fetchPagePhotos } from "@/lib/galleryImages";
import { GetServerSideProps } from "next";

const galleryImageUrls = async (folder: string) => {
  const { resources } = await fetchGalleryImages(folder);
  return resources
    .filter(({ resource_type }) => resource_type === "image")
    .map(({ secure_url }) => secure_url);
};

const pagePhotoUrls = async (page: string) =>
  (await fetchPagePhotos(page))
    .filter(({ resource_type }) => resource_type === "image")
    .map(({ secure_url }) => secure_url);

const buildSitemap = async () => {
  const [gallery, certificates, coursePhotos, servicePhotos] = await Promise.all([
    galleryImageUrls(GALLERY_FOLDERS.gallery),
    galleryImageUrls(GALLERY_FOLDERS.certificates),
    pagePhotoUrls("courses"),
    Promise.all(SERVICE_PAGES.map(({ slug }) => pagePhotoUrls(slug))),
  ]);
  const pageImages: Record<string, string[]> = {
    [ROUTES.gallery]: gallery,
    [ROUTES.certificates]: certificates,
    [ROUTES.courses]: coursePhotos,
    ...Object.fromEntries(
      SERVICE_PAGES.map(({ slug, image }, index) => [
        servicePagePath(slug),
        [`${SITE_URL}${image}`, ...servicePhotos[index]],
      ])
    ),
  };

  const paths = [
    ...Object.values(ROUTES),
    ...SERVICE_PAGES.map(({ slug }) => servicePagePath(slug)),
    ...courseDetails.map((course) => `${ROUTES.courses}/${course.link}`),
  ];

  const urls = paths
    .map((path) => {
      const priority = path === ROUTES.home ? "1.0" : "0.8";
      const images = (pageImages[path] ?? [])
        .map((url) => `<image:image><image:loc>${url}</image:loc></image:image>`)
        .join("");
      return `  <url><loc>${SITE_URL}${path}</loc><priority>${priority}</priority>${images}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.write(await buildSitemap());
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
