# Відгуки з Google на сайті

Головна сторінка показує рейтинг студії в Google Картах і останні відгуки звідти
(до 5 — стільки віддає Google; решта — за посиланням «Усі відгуки в Google») разом із відгуками, залишеними на сайті.
Дані оновлюються автоматично, приблизно раз на добу.

Поки змінні нижче не задані, блок працює як раніше — лише з відгуками із сайту.

## Налаштування

1. Відкрийте [Google Cloud Console](https://console.cloud.google.com/) і виберіть
   проєкт (можна той самий, що для Firebase).
2. **APIs & Services → Library** → увімкніть **Places API (New)**.
   Google попросить підключити платіжний акаунт; актуальний безкоштовний ліміт
   дивіться на сторінці цін Google Maps Platform.
3. **APIs & Services → Credentials → Create credentials → API key.**
   В налаштуваннях ключа: *API restrictions* → лише **Places API (New)**.
4. Знайдіть ID місця студії: https://developers.google.com/maps/documentation/places/web-service/place-id
   (у пошуку на карті введіть назву студії, скопіюйте `Place ID`, він починається з `ChIJ`).
5. Додайте у `.env` (локально) і в змінні середовища хостингу:

   ```
   GOOGLE_PLACES_API_KEY=ваш_ключ
   GOOGLE_PLACE_ID=ChIJ...
   ```

6. **Google Maps Platform → Quotas → Places API (New)**: поставте `GetPlaceRequest per day` = 30.
   Сайт робить кілька запитів на добу (відповідь кешує Vercel), тож 30 на день не
   перевищить безкоштовний ліміт; коли ліміт вичерпано, сайт показує свої відгуки.
7. Перезапустіть / передеплойте сайт (у Vercel: Settings → Environment Variables, потім Redeploy).

Ключ використовується тільки на сервері й не потрапляє в браузер.
