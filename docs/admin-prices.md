# Адмінка цін (`/admin`)

Студія змінює ціни на сайті сама: `www.mslaser.com.ua/admin` → «Увійти через Google» → змінити ціни → «Зберегти». Нові ціни з'являються на сайті протягом кількох хвилин.

## Як це працює

- Послуги й ціни в коді (`src/features/prices/constants/*`, `src/features/courses/constants/courseDetails.ts`) — **стандартні значення**.
- Адмінка зберігає у Firestore (`settings/prices`) **лише відмінності**: змінені ціни, нові назви, приховані й додані послуги. Кожен рядок прив'язаний до назви зони/послуги: якщо зону в коді перейменують чи переставлять, стара зміна просто перестане застосовуватися, а не потрапить на іншу зону.
- Сторінки `/`, `/prices` і `/courses/[id]` перегенеровуються сервером не частіше ніж раз на хвилину (ISR), тож зміни з'являються протягом кількох хвилин — ціни є в HTML, SEO не страждає.
- Якщо Firestore недоступний, сайт показує стандартні ціни з коду.
- Назви послуг можна змінювати, приховувати й додавати нові в межах наявних категорій прямо в адмінці (українською та англійською). Назви категорій і курсів — як і раніше, у перекладах (`src/I18n/*/translate.json`).
- Курси: лише вартість (текст). Порожнє поле — ціна на сторінці курсу не показується.

## Доступ

- Увійти може будь-хто з Google-акаунтом, але **змінювати ціни** — лише email-и з колекції `admins`.
- `role: "owner"` — власник: змінює ціни та у вкладці «Доступ» додає редакторів і забирає доступ у будь-кого, крім себе.
- `role: "editor"` — редактор: лише ціни.
- Перевірку робить Firestore на сервері (правила нижче), обійти її з браузера не можна.

## Одноразове налаштування у Firebase Console (проєкт `ms-studio-cd515`)

1. **Authentication → Sign-in method → Google** — увімкнути.
2. **Authentication → Settings → Authorized domains** — мають бути `www.mslaser.com.ua`, `mslaser.com.ua` і `localhost`.
3. **Firestore → Rules** — **додати** до наявних правил блоки нижче (наявні правила для `users`, `feedbacks`, `masters` не чіпати) і натиснути «Publish».
4. **Firestore → Data** — створити колекцію `admins`, документ з ID = email власниці малими літерами (наприклад `owner@gmail.com`), поле `role` (string) = `owner`. Решту людей власниця далі додає сама в адмінці.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function signedInEmail() {
      return request.auth != null && request.auth.token.email_verified == true
        ? request.auth.token.email.lower()
        : null;
    }
    function adminDoc() {
      return /databases/$(database)/documents/admins/$(signedInEmail());
    }
    function isAdmin() {
      return signedInEmail() != null && exists(adminDoc());
    }
    function isOwner() {
      return isAdmin() && get(adminDoc()).data.role == 'owner';
    }

    // Price overrides: public read (the site renders them), admins write
    match /settings/prices {
      allow read: if true;
      allow write: if isAdmin()
        && request.resource.data.keys().hasOnly(['data', 'updatedAt', 'updatedBy'])
        && request.resource.data.data is string
        && request.resource.data.updatedBy == signedInEmail();
    }

    // Who can edit prices: everyone may check their own entry, the owner manages the list
    match /admins/{email} {
      allow read: if signedInEmail() == email || isOwner();
      allow create, update: if isOwner()
        && request.resource.data.role == 'editor';
      // An owner can revoke anyone's access except their own
      allow delete: if isOwner() && email != signedInEmail();
    }

    // ...existing rules for users, feedbacks, masters stay here...
  }
}
```

> Власника можна призначити лише вручну в консолі (крок 4). З адмінки власник додає редакторів і може забрати доступ у будь-кого, крім себе.

## Галерея

Вкладка «Галерея» в адмінці дозволяє будь-кому з доступом (власниці й редакторам)
додавати й видаляти фото та відео в розділах «Галерея» і «Сертифікати».

- Файли вантажаться напряму в Cloudinary (ті самі `NEXT_PUBLIC_CLOUDINARY_*` і
  `CLOUDINARY_API_SECRET`, що вже є в `.env`), сервер лише підписує завантаження
  після перевірки, що людина є в колекції `admins`.
- Обмеження безкоштовного плану Cloudinary: фото до 10 МБ, відео до 100 МБ.
- Нові файли з'являються на сайті протягом ~5 хвилин (кеш списку).
- Окремих правил Firestore не потрібно: використовується вже наявне правило
  читання власного запису в `admins`.
