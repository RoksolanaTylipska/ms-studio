"use client";

import { I18nProvider } from "@/I18n/I18nProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalWindow from "@/components/ModalWindow";
import { PhoneAppointment } from "@/components/PhoneAppointment";
import { ModalWindowProvider } from "@/context/ModalContext";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { theme } from "@/styles";
import "@/styles/globals.css";
import { useMediaQuery } from "@mui/material";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import type { AppProps } from "next/app";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
                {isMobile && (
                  <PhoneAppointment />
                )}
              </main>
              <Footer />
            </div>
          </ModalWindowProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </I18nProvider>
  );
}
