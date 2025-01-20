"use client";

import { I18nProvider } from "@/I18n/I18nProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalWindow from "@/components/ModalWindow";
import { ModalWindowProvider } from "@/context/ModalContext";
import { theme } from "@/styles";
import "@/styles/globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <I18nProvider>
      <AppRouterCacheProvider options={{ key: "css" }}>
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
            </main>
            <Footer />
          </div>
          </ModalWindowProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </I18nProvider>
  );
}
