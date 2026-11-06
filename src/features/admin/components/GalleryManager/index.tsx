import {
  AdminCard,
  GhostButton,
  PrimaryButton,
  adminColors,
  bodyFont,
  headingFont,
} from "@/features/admin/ui";
import {
  GALLERY_FOLDERS,
  GalleryKey,
  MAX_DESCRIPTION_LENGTH,
  MAX_IMAGE_MB,
  MAX_VIDEO_MB,
  PHOTO_PAGES,
  videoPoster,
} from "@/features/gallery/constants";
import { cloudinaryLoader } from "@/helpers/cloudinaryLoader";
import { app } from "@/lib/firebase";
import { CloudinaryImage } from "@/types/image";
import { Alert, Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { ChangeEvent, DragEvent, useCallback, useEffect, useRef, useState } from "react";

type Upload = { id: string; name: string; progress: number; error?: string };
type Placement = { pages: string[]; hidden: boolean };

const SECTIONS: [GalleryKey, string][] = [
  ["gallery", "Галерея"],
  ["certificates", "Сертифікати"],
];

const authHeader = async () => {
  const token = await getAuth(app).currentUser?.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

// Direct browser → Cloudinary upload, signed by our API for this admin
const uploadFile = async (
  file: File,
  folder: string,
  onProgress: (percent: number) => void
): Promise<CloudinaryImage> => {
  const signRes = await fetch("/api/gallery/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify({ folder }),
  });
  if (!signRes.ok) throw new Error(signRes.status === 403 ? "Немає доступу" : "Не вдалося підготувати завантаження");
  const sign = await signRes.json();

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sign.apiKey);
  form.append("timestamp", String(sign.timestamp));
  form.append("signature", sign.signature);
  form.append("folder", sign.folder);
  form.append("context", sign.context);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      const body = JSON.parse(xhr.responseText || "{}");
      if (xhr.status >= 200 && xhr.status < 300) resolve(body);
      else reject(new Error(body?.error?.message || "Cloudinary не прийняв файл"));
    };
    xhr.onerror = () => reject(new Error("Немає з'єднання"));
    xhr.send(form);
  });
};

const tooBig = (file: File) => {
  const isVideo = file.type.startsWith("video/");
  const limit = isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB;
  return file.size > limit * 1024 * 1024 ? `Завеликий файл: до ${limit} МБ для ${isVideo ? "відео" : "фото"}` : null;
};

// Saved when the field loses focus, so there is no extra button per photo
const DescriptionField = ({
  item,
  onError,
}: {
  item: CloudinaryImage;
  onError: (message: string) => void;
}) => {
  const [value, setValue] = useState(item.description ?? "");
  const [savedValue, setSavedValue] = useState(item.description ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const save = async () => {
    const description = value.trim();
    if (description === savedValue) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/gallery/describe", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await authHeader()) },
        body: JSON.stringify({
          publicId: item.public_id,
          resourceType: item.resource_type ?? "image",
          description,
        }),
      });
      if (!res.ok) throw new Error();
      setSavedValue(description);
      setStatus("saved");
    } catch {
      setStatus("idle");
      onError("Не вдалося зберегти опис. Спробуйте ще раз.");
    }
  };

  return (
    <>
      <Box
        component="textarea"
        rows={2}
        value={value}
        maxLength={MAX_DESCRIPTION_LENGTH}
        placeholder="Що на фото?"
        aria-label="Опис фото"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          setValue(event.target.value);
          setStatus("idle");
        }}
        onBlur={save}
        sx={{
          display: "block",
          boxSizing: "border-box",
          width: "100%",
          mt: 1,
          px: 1.25,
          py: 0.75,
          border: `1px solid ${adminColors.caramel}`,
          borderRadius: "10px",
          resize: "vertical",
          fontFamily: bodyFont,
          fontSize: "13px",
          lineHeight: 1.4,
          color: adminColors.chocolate,
          backgroundColor: "#fff",
          "&:focus": { outline: `2px solid ${adminColors.camel}`, outlineOffset: -1 },
        }}
      />
      <Typography variant="inherit" sx={{ minHeight: 18, fontFamily: bodyFont, fontSize: "12px", color: adminColors.latte, mt: 0.25 }}>
        {status === "saving" ? "Зберігаю…" : status === "saved" ? "Збережено" : ""}
      </Typography>
    </>
  );
};

const CheckRow = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <Box
    component="label"
    sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, cursor: "pointer", fontFamily: bodyFont, fontSize: "13px", color: adminColors.chocolate }}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      style={{ accentColor: adminColors.camel }}
    />
    {label}
  </Box>
);

const PlacementFields = ({ value, onChange }: { value: Placement; onChange: (next: Placement) => void }) => (
  <>
    <CheckRow
      label="Показувати в загальній галереї"
      checked={!value.hidden}
      onChange={(checked) => onChange({ ...value, hidden: !checked })}
    />
    {PHOTO_PAGES.map(([id, label]) => (
      <CheckRow
        key={id}
        label={label}
        checked={value.pages.includes(id)}
        onChange={(checked) =>
          onChange({
            ...value,
            pages: checked ? [...value.pages, id] : value.pages.filter((page) => page !== id),
          })
        }
      />
    ))}
    {value.hidden && value.pages.length === 0 && (
      <Typography variant="inherit" sx={{ width: "100%", fontFamily: bodyFont, fontSize: "12px", color: adminColors.error }}>
        Таке фото ніде не показуватиметься на сайті.
      </Typography>
    )}
  </>
);

// Saved on every change, so there is no extra button per photo
const PlacementField = ({
  item,
  onError,
}: {
  item: CloudinaryImage;
  onError: (message: string) => void;
}) => {
  const [value, setValue] = useState<Placement>({ pages: item.pages ?? [], hidden: Boolean(item.hidden) });
  const [saving, setSaving] = useState(false);

  const save = async (next: Placement) => {
    const previous = value;
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch("/api/gallery/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await authHeader()) },
        body: JSON.stringify({ publicId: item.public_id, resourceType: item.resource_type ?? "image", ...next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setValue(previous);
      onError("Не вдалося зберегти, де показувати фото. Спробуйте ще раз.");
    }
    setSaving(false);
  };

  return (
    <Box component="details" sx={{ fontFamily: bodyFont, fontSize: "12px", color: adminColors.latte }}>
      <Box component="summary" sx={{ cursor: "pointer" }}>
        Де показувати{value.pages.length > 0 ? ` (сторінок: ${value.pages.length})` : ""}
        {value.hidden ? ", не в галереї" : ""}
        {saving ? " · зберігаю…" : ""}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0.5, mt: 1 }}>
        <PlacementFields value={value} onChange={save} />
      </Box>
    </Box>
  );
};

function GalleryManager() {
  const [section, setSection] = useState<GalleryKey>("gallery");
  const folder = GALLERY_FOLDERS[section];

  const [items, setItems] = useState<CloudinaryImage[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(
    async (next: string | null = null) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/cloudinary?fresh=1&folder=${encodeURIComponent(folder)}${next ? `&next_cursor=${next}` : ""}`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setItems((prev) => (next ? [...prev, ...data.resources] : data.resources));
        setCursor(data.next_cursor);
      } catch {
        setError("Не вдалося завантажити список. Оновіть сторінку.");
      }
      setLoading(false);
    },
    [folder]
  );

  useEffect(() => {
    setItems([]);
    load();
  }, [load]);

  const addFiles = (files: FileList | File[]) => {
    Array.from(files)
      .filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"))
      .forEach((file) => {
        const id = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
        const sizeError = tooBig(file);
        setUploads((prev) => [...prev, { id, name: file.name, progress: 0, error: sizeError ?? undefined }]);
        if (sizeError) return;

        const update = (patch: Partial<Upload>) =>
          setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));

        uploadFile(file, folder, (progress) => update({ progress }))
          .then((item) => {
            setItems((prev) => [item, ...prev]);
            setUploads((prev) => prev.filter((u) => u.id !== id));
          })
          .catch((e) => update({ error: e.message }));
      });
  };

  const remove = async (item: CloudinaryImage) => {
    const kind = item.resource_type === "video" ? "це відео" : "це фото";
    if (!window.confirm(`Видалити ${kind} з сайту? Відновити не вийде.`)) return;
    setDeleting(item.public_id);
    try {
      const res = await fetch("/api/gallery/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await authHeader()) },
        body: JSON.stringify({ publicId: item.public_id, resourceType: item.resource_type ?? "image" }),
      });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((i) => i.public_id !== item.public_id));
    } catch {
      setError("Не вдалося видалити. Спробуйте ще раз.");
    }
    setDeleting(null);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <AdminCard>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="inherit" sx={{ fontFamily: headingFont, fontSize: "24px", color: adminColors.chocolate, flex: 1 }}>
          Фото та відео
        </Typography>
        <Box sx={{ display: "inline-flex", backgroundColor: adminColors.beige, borderRadius: "999px", p: 0.5 }}>
          {SECTIONS.map(([key, label]) => (
            <Box
              key={key}
              component="button"
              onClick={() => setSection(key)}
              sx={{
                border: 0,
                cursor: "pointer",
                borderRadius: "999px",
                px: 2,
                py: 0.75,
                fontFamily: bodyFont,
                fontSize: "13px",
                color: section === key ? "#fff" : adminColors.chocolate,
                backgroundColor: section === key ? adminColors.camel : "transparent",
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Drop zone */}
      <Box
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        sx={{
          border: `2px dashed ${dragOver ? adminColors.camel : adminColors.gold}`,
          backgroundColor: dragOver ? adminColors.beige : "transparent",
          borderRadius: "20px",
          p: { xs: 3, sm: 4 },
          textAlign: "center",
          transition: "background-color .15s, border-color .15s",
        }}
      >
        <PrimaryButton onClick={() => inputRef.current?.click()}>Додати фото чи відео</PrimaryButton>
        <Typography variant="inherit" sx={{ fontFamily: bodyFont, fontSize: "13px", color: adminColors.latte, mt: 1.5, lineHeight: 1.7 }}>
          Або перетягніть файли сюди. Можна кілька одразу.
          <br />
          Фото до {MAX_IMAGE_MB} МБ, відео до {MAX_VIDEO_MB} МБ. На сайті з'являться протягом кількох хвилин.
        </Typography>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          hidden
          onChange={(event) => {
            if (event.target.files) addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </Box>

      {uploads.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {uploads.map((upload) => (
            <Box key={upload.id} sx={{ backgroundColor: adminColors.beige, borderRadius: "12px", px: 2, py: 1.25 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="inherit"
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    fontFamily: bodyFont,
                    fontSize: "13px",
                    color: adminColors.chocolate,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {upload.name}
                </Typography>
                {upload.error ? (
                  <GhostButton size="small" onClick={() => setUploads((p) => p.filter((u) => u.id !== upload.id))}>
                    Закрити
                  </GhostButton>
                ) : (
                  <Typography variant="inherit" sx={{ fontFamily: bodyFont, fontSize: "13px", color: adminColors.latte }}>
                    {upload.progress}%
                  </Typography>
                )}
              </Box>
              {upload.error ? (
                <Typography variant="inherit" sx={{ fontFamily: bodyFont, fontSize: "12px", color: adminColors.error, mt: 0.5 }}>
                  {upload.error}
                </Typography>
              ) : (
                <LinearProgress
                  variant="determinate"
                  value={upload.progress}
                  sx={{
                    mt: 1,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: adminColors.caramel,
                    "& .MuiLinearProgress-bar": { backgroundColor: adminColors.camel },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2, fontFamily: bodyFont }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {items.length > 0 && (
        <Typography variant="inherit" sx={{ fontFamily: bodyFont, fontSize: "13px", color: adminColors.latte, mt: 3, lineHeight: 1.7 }}>
          Опис допомагає Google зрозуміти, що на фото. Напишіть коротко й конкретно, наприклад «Кабінет лазерної епіляції».
          Зберігається автоматично, на сайті з'явиться протягом кількох хвилин.
        </Typography>
      )}

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {items.map((item) => (
          <Box key={item.public_id}>
            <Box
              sx={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: adminColors.beige,
                opacity: deleting === item.public_id ? 0.4 : 1,
              }}
            >
              {item.resource_type === "video" ? (
                <Image unoptimized src={videoPoster(item.secure_url, 400)} alt="" fill style={{ objectFit: "cover" }} />
              ) : (
                <Image
                  loader={cloudinaryLoader}
                  src={item.secure_url}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              )}
              {item.resource_type === "video" && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 8,
                    bottom: 8,
                    px: 1,
                    py: 0.25,
                    borderRadius: "999px",
                    backgroundColor: "rgba(53, 48, 45, 0.7)",
                    color: "#fff",
                    fontFamily: bodyFont,
                    fontSize: "11px",
                  }}
                >
                  ▶ Відео
                </Box>
              )}
              <Box
                component="button"
                type="button"
                aria-label="Видалити"
                disabled={deleting === item.public_id}
                onClick={() => remove(item)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 32,
                  height: 32,
                  border: 0,
                  borderRadius: "50%",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                  color: adminColors.error,
                  fontSize: "18px",
                  lineHeight: 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "&:hover": { backgroundColor: "#fff" },
                }}
              >
                ×
              </Box>
            </Box>
            <DescriptionField item={item} onError={setError} />
            {section === "gallery" && <PlacementField item={item} onError={setError} />}
          </Box>
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} sx={{ color: adminColors.camel }} />
        </Box>
      )}
      {!loading && items.length === 0 && !error && (
        <Typography variant="inherit" sx={{ fontFamily: bodyFont, fontSize: "14px", color: adminColors.latte, textAlign: "center", py: 4 }}>
          Тут поки порожньо.
        </Typography>
      )}
      {!loading && cursor && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <GhostButton onClick={() => load(cursor)} sx={{ border: `1px solid ${adminColors.caramel}` }}>
            Показати ще
          </GhostButton>
        </Box>
      )}
    </AdminCard>
  );
}

export default GalleryManager;
