"use client";

import { I18nProvider } from "@/I18n/I18nProvider";
import { Footer, Loader, ModalWindow } from "@/components";
import { PhoneAppointment } from "@/components/PhoneAppointment";
import { ModalWindowProvider } from "@/context/ModalContext";
import Header from "@/features/header";
import { theme } from "@/styles";
import "@/styles/globals.css";
import { Box, useMediaQuery } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

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
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <Loader />
                </Box>
              ) : (
                <>
                  {" "}
                  <Header />
                  <ModalWindow />
                  <main style={{ flex: 1 }}>
                    <Component {...pageProps} />
                    {isMobile && <PhoneAppointment />}
                  </main>
                  <Footer />
                </>
              )}
            </div>
          </ModalWindowProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </I18nProvider>
  );
}
