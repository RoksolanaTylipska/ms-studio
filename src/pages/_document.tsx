import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";
import {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="uk">
      <Head>
        <DocumentHeadTags {...props} />
        <link rel="icon" href="/favicon-48.png" sizes="48x48" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
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

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
