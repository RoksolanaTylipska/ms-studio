import Head from "next/head";

export const JsonLd = ({ id, data }: { id: string; data: object }) => (
  <Head>
    <script
      key={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  </Head>
);
