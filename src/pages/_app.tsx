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

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <I18nProvider>
      <AppCacheProvider {...props}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
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
