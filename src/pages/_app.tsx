"use client";

import { I18nProvider } from "@/I18n/I18nProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { theme } from "@/styles";
import "@/styles/globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <AppRouterCacheProvider options={{ key: "css" }}>
        <ThemeProvider theme={theme}>
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh", 
            }}
          >
            <Header />
            <main style={{ flex: 1 }}> 
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </I18nProvider>
  );
}
