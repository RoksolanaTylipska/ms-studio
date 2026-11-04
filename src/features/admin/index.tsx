import AdminsManager from "@/features/admin/components/AdminsManager";
import GalleryManager from "@/features/admin/components/GalleryManager";
import PriceEditor, { PriceEditorView } from "@/features/admin/components/PriceEditor";
import { useAdminAuth } from "@/features/admin/hooks/useAdminAuth";
import {
  AdminCard,
  GhostButton,
  PrimaryButton,
  adminColors,
  bodyFont,
  headingFont,
} from "@/features/admin/ui";
import { Alert, Avatar, Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode, useState } from "react";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const CenteredCard = ({ children }: { children: ReactNode }) => (
  <AdminCard sx={{ maxWidth: 440, mx: "auto", textAlign: "center" }}>
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <Image src="/assets/icons/logo-black.png" alt="MS Laser" width={72} height={72} />
    </Box>
    {children}
  </AdminCard>
);

const Title = ({ children }: { children: ReactNode }) => (
  <Typography
    component="h1"
    sx={{
      fontFamily: headingFont,
      fontSize: { xs: "26px", sm: "32px" },
      lineHeight: 1.25,
      color: adminColors.chocolate,
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
);

const Muted = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontFamily: bodyFont, fontSize: "14px", color: adminColors.latte, lineHeight: 1.7 }}>
    {children}
  </Typography>
);

function AdminPanel() {
  const { state, signIn, logOut } = useAdminAuth();
  const [tab, setTab] = useState<PriceEditorView | "gallery" | "access">("services");
  const [signInError, setSignInError] = useState<string | null>(null);

  const handleSignIn = () => {
    setSignInError(null);
    signIn().catch((error) => {
      if (error?.code === "auth/popup-closed-by-user") return;
      setSignInError("Не вдалося увійти. Спробуйте ще раз.");
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 1080,
        minHeight: "70vh",
        mx: "auto",
        px: { xs: 2, sm: 3 },
        // Clear the fixed 84px site header
        pt: { xs: "110px", md: "140px" },
        pb: { xs: 6, md: 10 },
      }}
    >
      {state.status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: adminColors.camel }} />
        </Box>
      )}

      {state.status === "signedOut" && (
        <CenteredCard>
          <Title>Адмінка</Title>
          <Muted>Тут можна змінювати ціни й галерею на сайті. Увійдіть через Google-акаунт, якому надали доступ.</Muted>
          <PrimaryButton
            onClick={handleSignIn}
            startIcon={
              <Box sx={{ display: "flex", backgroundColor: "#fff", borderRadius: "50%", p: 0.5 }}>
                <GoogleIcon />
              </Box>
            }
            sx={{ mt: 3, py: 1, pl: 1.25 }}
          >
            Увійти через Google
          </PrimaryButton>
          {signInError && (
            <Alert severity="error" sx={{ mt: 3, textAlign: "left", fontFamily: bodyFont }}>
              {signInError}
            </Alert>
          )}
        </CenteredCard>
      )}

      {state.status === "noAccess" && (
        <CenteredCard>
          <Title>Немає доступу</Title>
          <Muted>
            Акаунт <b>{state.user.email}</b> не має доступу до адмінки. Попросіть власницю студії
            додати цей email у вкладці «Доступ».
          </Muted>
          <GhostButton onClick={logOut} sx={{ mt: 3, border: `1px solid ${adminColors.caramel}` }}>
            Увійти з іншим акаунтом
          </GhostButton>
        </CenteredCard>
      )}

      {state.status === "ready" && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Title>Адмінка</Title>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "#fff",
                borderRadius: "999px",
                pl: 0.75,
                pr: 0.5,
                py: 0.5,
                maxWidth: "100%",
              }}
            >
              <Avatar
                src={state.user.photoURL ?? undefined}
                sx={{ width: 32, height: 32, bgcolor: adminColors.camel, fontSize: 14 }}
              >
                {state.email[0]?.toUpperCase()}
              </Avatar>
              <Typography
                sx={{
                  fontFamily: bodyFont,
                  fontSize: "13px",
                  color: adminColors.chocolate,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {state.email}
              </Typography>
              <GhostButton onClick={logOut} size="small">
                Вийти
              </GhostButton>
            </Box>
          </Box>

          <Box
            role="tablist"
            sx={{
              display: "inline-flex",
              maxWidth: "100%",
              overflowX: "auto",
              backgroundColor: adminColors.caramel,
              borderRadius: "999px",
              p: 0.5,
              mb: 3,
            }}
          >
            {(
              [
                ["services", "Послуги"],
                ["courses", "Курси"],
                ["gallery", "Галерея"],
                ...(state.role === "owner" ? [["access", "Доступ"]] : []),
              ] as [PriceEditorView | "gallery" | "access", string][]
            ).map(([value, label]) => (
              <Box
                key={value}
                component="button"
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                sx={{
                  border: 0,
                  cursor: "pointer",
                  borderRadius: "999px",
                  px: { xs: 2.5, sm: 3 },
                  py: 1,
                  fontFamily: bodyFont,
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  color: tab === value ? "#fff" : adminColors.chocolate,
                  backgroundColor: tab === value ? adminColors.chocolate : "transparent",
                  transition: "background-color .2s, color .2s",
                }}
              >
                {label}
              </Box>
            ))}
          </Box>

          {/* Kept mounted on other tabs so unsaved price edits survive switching */}
          <Box sx={{ display: tab === "services" || tab === "courses" ? "block" : "none" }}>
            <PriceEditor email={state.email} view={tab === "courses" ? "courses" : "services"} />
          </Box>
          {tab === "gallery" && <GalleryManager />}
          {tab === "access" && state.role === "owner" && <AdminsManager currentEmail={state.email} />}
        </>
      )}
    </Box>
  );
}

export default AdminPanel;
