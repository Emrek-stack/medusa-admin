# Medusa Dashboard (medus-react)

Bu proje Medusa Admin Dashboard tabanlı bir React/Vite uygulamasıdır.

## Gereksinimler

- Node.js 18+
- Yarn (önerilen, proje `yarn@3.2.1` kullanıyor)

## Kurulum

```bash
yarn install
```

Alternatif (Yarn yoksa):

```bash
npm install
```

## Geliştirme Ortamı

```bash
yarn dev
```

Uygulama varsayılan olarak Vite ile açılır.

## Build / Preview

```bash
yarn build
yarn build:preview
yarn preview
```

## Backend Ayarları Nerede?

Backend ve diğer runtime ayarları `vite.config.ts` içindedir:

- Dosya: `vite.config.ts`
- Önemli env değişkenleri:
  - `VITE_BACKEND_URL`
  - `VITE_MEDUSA_BACKEND_URL`
  - `VITE_MEDUSA_ADMIN_BACKEND_URL`
  - `VITE_MEDUSA_STOREFRONT_URL`
  - `VITE_MEDUSA_AUTH_TYPE` (`session` / `jwt`)
  - `VITE_MEDUSA_JWT_TOKEN_STORAGE_KEY`
  - `VITE_MEDUSA_MOCK_AUTH`
  - `VITE_MEDUSA_MOCK_API`
  - `VITE_MEDUSA_MOCK_EMAIL`
  - `VITE_MEDUSA_MOCK_PASSWORD`

Backend URL çözümleme sırası:

1. `VITE_BACKEND_URL`
2. `VITE_MEDUSA_BACKEND_URL`
3. `VITE_MEDUSA_ADMIN_BACKEND_URL`
4. fallback: `http://localhost:9000`

Storefront fallback: `http://localhost:8000`

### Örnek `.env`

```env
VITE_BACKEND_URL=http://localhost:9000
VITE_MEDUSA_STOREFRONT_URL=http://localhost:8000
VITE_MEDUSA_AUTH_TYPE=session
VITE_MEDUSA_MOCK_AUTH=false
VITE_MEDUSA_MOCK_API=false
```

Not:

- Mock modları açıksa gerçek backend'e gitmeden sahte auth/api ile çalışır.
- Login testinde mock açıksa varsayılan kullanıcı:
  - `admin@medusa.local`
  - `Admin123!`

## Dil Desteği (i18n)

### i18n nereden initialize ediliyor?

- `src/components/utilities/i18n/i18n.tsx`
- Bu bileşen `src/providers/providers.tsx` içinde yüklenir.

### i18n temel ayarları nerede?

- `src/i18n/config.ts`
  - `fallbackLng: "en"`
  - dil algılama cookie/localStorage/header ile yapılır.

### Dil listesi nerede?

- `src/i18n/languages.ts`
- Dil seçici ve LTR/RTL yönü buradaki listeye göre çalışır.

### Çeviri kaynakları nerede?

- `src/i18n/translations/*.json`
- Toplu export: `src/i18n/translations/index.ts`

## Yeni Dil Nasıl Eklenir?

1. `src/i18n/translations/<kod>.json` oluştur.
2. `src/i18n/translations/index.ts` içine import ve export ekle.
3. `src/i18n/languages.ts` içine dili ekle (`code`, `display_name`, `ltr`, `date_locale`).
4. Gerekirse profil dil seçici ekranından test et:
   - `src/routes/profile/profile-edit/components/edit-profile-form/edit-profile-form.tsx`

Örnek: `az` dili eklemek için dosya + index mapping + `languages.ts` kaydı gerekir.

## Var Olan Dili Nasıl Güncellerim?

1. İlgili JSON dosyasını düzenle:
   - örn: `src/i18n/translations/tr.json`
2. Çeviri şeması/doğrulama çalıştır:

```bash
yarn i18n:schema
yarn i18n:validate
```

3. Uygulamayı yeniden başlat ve ilgili ekranlarda metinleri doğrula.

## Çoklu Dil Kullanımı (Kod İçinde)

Bileşenlerde:

```tsx
import { useTranslation } from "react-i18next"

const { t } = useTranslation()

return <span>{t("orders.domain")}</span>
```

Anahtarlar ilgili dil JSON dosyalarında aynı yapıda olmalıdır.

## Hızlı Sorun Giderme

### Login oluyor ama yönlenmiyor / sessiz kalıyor

- Mock auth açık mı kontrol et (`VITE_MEDUSA_MOCK_AUTH`).
- Backend URL doğru mu kontrol et (`VITE_BACKEND_URL`).
- Network sekmesinde `/auth` ve `/admin/users/me` çağrılarını kontrol et.

### Çok sayıda `/admin/*` 404 hatası

- Frontend yanlış origin'e istek atıyor olabilir.
- `.env` içinde backend URL'i net tanımla ve dev server'ı yeniden başlat.

### Dil değişmiyor

- `languages.ts` içine dil eklendi mi?
- `translations/index.ts` mapping eklendi mi?
- Çeviri anahtarları tüm dillerde mevcut mu?

## Önemli Dosyalar

- `vite.config.ts` -> env ve runtime define ayarları
- `src/lib/client/client.ts` -> Medusa SDK client
- `src/components/utilities/i18n/i18n.tsx` -> i18n init
- `src/i18n/config.ts` -> i18n options
- `src/i18n/languages.ts` -> desteklenen diller
- `src/i18n/translations/` -> çeviri dosyaları
- `src/providers/providers.tsx` -> provider zinciri
