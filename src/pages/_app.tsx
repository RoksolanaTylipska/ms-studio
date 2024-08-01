import Header from "@/components/Header";
import { I18nProvider } from "@/I18n/I18nProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <main className={`${montserrat.className} ${playfair.className}`}>
          <Header />
          <Component {...pageProps} />
        </main>
    </I18nProvider>
  );
}
