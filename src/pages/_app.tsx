"use client";

import { I18nProvider } from "@/I18n/I18nProvider";
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
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </I18nProvider>
  );
}
