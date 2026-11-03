import { AdminRole } from "@/features/admin/hooks/useAdminAuth";
import {
  AdminCard,
  IconAction,
  PrimaryButton,
  TextInput,
  adminColors,
  bodyFont,
  headingFont,
} from "@/features/admin/ui";
import { db } from "@/lib/firebase";
import { DeleteOutline, ErrorOutline } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Tooltip, Typography, alpha } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { FormEvent, useCallback, useEffect, useState } from "react";

type Admin = { email: string; role: AdminRole };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AdminsManager({ currentEmail }: { currentEmail: string }) {
  const [admins, setAdmins] = useState<Admin[] | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const snap = await getDocs(collection(db, "admins"));
    const list = snap.docs.map((d) => ({ email: d.id, role: d.data().role as AdminRole }));
    // Owners first, then alphabetically
    list.sort((a, b) => (a.role === b.role ? a.email.localeCompare(b.email) : a.role === "owner" ? -1 : 1));
    setAdmins(list);
  }, []);

  useEffect(() => {
    load().catch(() => setError("Не вдалося завантажити список доступів."));
  }, [load]);

  const addAdmin = async (e: FormEvent) => {
    e.preventDefault();
    const email = newEmail.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      setError("Введіть коректний email.");
      return;
    }
    if (admins?.some((a) => a.email === email)) {
      setError("Цей email уже має доступ.");
      return;
    }
    setAdding(true);
    try {
      await setDoc(doc(db, "admins", email), {
        role: "editor",
        addedBy: currentEmail,
        addedAt: serverTimestamp(),
      });
      setNewEmail("");
      setError(null);
      await load();
    } catch {
      setError("Не вдалося додати доступ.");
    } finally {
      setAdding(false);
    }
  };

  const removeAdmin = async (email: string) => {
    if (email === currentEmail) return;
    if (!window.confirm(`Забрати доступ у ${email}?`)) return;
    try {
      await deleteDoc(doc(db, "admins", email));
      await load();
    } catch {
      setError("Не вдалося забрати доступ.");
    }
  };

  return (
    <AdminCard>
      <Typography
        component="h2"
        sx={{
          fontFamily: headingFont,
          fontSize: { xs: "20px", sm: "24px" },
          lineHeight: 1.3,
          color: adminColors.chocolate,
          mb: 1.5,
        }}
      >
        Хто може змінювати ціни
      </Typography>
      <Typography sx={{ fontFamily: bodyFont, fontSize: "13px", color: adminColors.latte, mb: 3, lineHeight: 1.7 }}>
        Додайте Gmail — і людина одразу зможе ввійти в адмінку.
      </Typography>

      <Box
        component="form"
        onSubmit={addAdmin}
        sx={{ display: "flex", gap: 1.5, alignItems: "flex-end", flexWrap: { xs: "wrap", sm: "nowrap" }, mb: 3 }}
      >
        <TextInput
          label="Email (Google-акаунт)"
          ariaLabel="Email нового редактора"
          type="email"
          value={newEmail}
          onChange={(v) => {
            setNewEmail(v);
            setError(null);
          }}
        />
        <PrimaryButton type="submit" disabled={adding || !newEmail.trim()} sx={{ flexShrink: 0, width: { xs: "100%", sm: "auto" } }}>
          {adding ? "Додаю…" : "Дати доступ"}
        </PrimaryButton>
      </Box>

      {error && (
        <Box
          role="alert"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            color: adminColors.error,
            backgroundColor: alpha(adminColors.error, 0.06),
            borderRadius: "12px",
            px: 2,
            py: 1.25,
            mb: 2,
          }}
        >
          <ErrorOutline fontSize="small" />
          <Typography sx={{ fontFamily: bodyFont, fontSize: "13px" }}>{error}</Typography>
        </Box>
      )}

      {admins === null ? (
        !error && <CircularProgress size={24} sx={{ color: adminColors.camel }} />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {admins.map(({ email, role }) => (
            <Box
              key={email}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: "16px",
                "&:hover": { backgroundColor: adminColors.beige },
              }}
            >
              <Avatar sx={{ width: 36, height: 36, fontSize: 14, bgcolor: role === "owner" ? adminColors.chocolate : adminColors.gold, color: role === "owner" ? "#fff" : adminColors.chocolate }}>
                {email[0]?.toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: bodyFont,
                    fontSize: "14px",
                    color: adminColors.chocolate,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {email}
                  {email === currentEmail && (
                    <Box component="span" sx={{ color: adminColors.latte }}> (ви)</Box>
                  )}
                </Typography>
              </Box>
              <Box
                component="span"
                sx={{
                  flexShrink: 0,
                  fontFamily: bodyFont,
                  fontSize: "11px",
                  borderRadius: "999px",
                  px: 1.25,
                  py: 0.5,
                  backgroundColor: role === "owner" ? adminColors.chocolate : adminColors.caramel,
                  color: role === "owner" ? "#fff" : adminColors.chocolate,
                }}
              >
                {role === "owner" ? "Власник" : "Редактор"}
              </Box>
              {email !== currentEmail ? (
                <Tooltip title="Забрати доступ">
                  <IconAction
                    aria-label={`Забрати доступ у ${email}`}
                    onClick={() => removeAdmin(email)}
                    sx={{ "&:hover": { color: adminColors.error, backgroundColor: alpha(adminColors.error, 0.08) } }}
                  >
                    <DeleteOutline fontSize="small" />
                  </IconAction>
                </Tooltip>
              ) : (
                <Box sx={{ width: 36, flexShrink: 0 }} />
              )}
            </Box>
          ))}
        </Box>
      )}
    </AdminCard>
  );
}

export default AdminsManager;
