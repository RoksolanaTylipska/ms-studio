import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/icons/logo-gold.png" />
        
        {/* Google Analytics – load script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4X4Y8Q1PFQ"
        ></script>

        {/* Google Analytics – config script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4X4Y8Q1PFQ');
            `,
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
