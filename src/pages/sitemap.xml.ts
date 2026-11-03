import { ROUTES } from "@/constants/routes";
import { SITE_URL } from "@/constants/site";
import { courseDetails } from "@/features/courses/constants/courseDetails";
import { SERVICE_PAGES, servicePagePath } from "@/features/servicePages/constants";
import { GetServerSideProps } from "next";

const buildSitemap = () => {
  const paths = [
    ...Object.values(ROUTES),
    ...SERVICE_PAGES.map(({ slug }) => servicePagePath(slug)),
    ...courseDetails.map((course) => `${ROUTES.courses}/${course.link}`),
  ];

  const urls = paths
    .map((path) => {
      const priority = path === ROUTES.home ? "1.0" : "0.8";
      return `  <url><loc>${SITE_URL}${path}</loc><priority>${priority}</priority></url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.write(buildSitemap());
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
