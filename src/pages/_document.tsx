import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo-gold_withoutText.png" />
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

        {/* Binotel – load script */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, w, s) {
                var widgetHash = 'n4bcvh5gnl6q2q4khp2x', gcw = d.createElement(s); 
                gcw.type = 'text/javascript'; 
                gcw.async = true;
                gcw.src = '//widgets.binotel.com/getcall/widgets/' + widgetHash + '.js';
                var sn = d.getElementsByTagName(s)[0]; 
                sn.parentNode.insertBefore(gcw, sn);
              })(document, window, 'script');
            `,
          }}
        /> */}
      </body>
    </Html>
  );
}
