"use client";

import { I18nProvider } from "@/I18n/I18nProvider";
import { Footer, ModalWindow, PhoneAppointment } from "@/components";
import { ModalWindowProvider } from "@/context/ModalContext";
import Header from "@/features/header";
import { theme } from "@/styles";
import "@/styles/globals.css";
import { useMediaQuery } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

const GA_ID = "G-4X4Y8Q1PFQ";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Firebase Analytics must run on every page (ad landing pages included),
  // but is loaded after hydration so it doesn't block rendering
  useEffect(() => {
    import("@/lib/firebase");
  }, []);

  return (
    <I18nProvider>
      <AppCacheProvider {...props}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* Google Analytics – loaded after hydration so it doesn't block rendering */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <ThemeProvider theme={theme}>
          <ModalWindowProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header />
              <ModalWindow />
              <main style={{ flex: 1 }}>
                <Component {...pageProps} />
                {isMobile && <PhoneAppointment />}
              </main>
              <Footer />
            </div>
          </ModalWindowProvider>
        </ThemeProvider>
      </AppCacheProvider>
    </I18nProvider>
  );
}
