# medus-react

Standalone Medusa Admin UI tabanlı React uygulaması.

Bu proje **Medusa backend'e bağlı çalışmaz**. Uygulama, Medusa'nın admin UI bileşenlerini kullanır ve veri akışını local mock katmanı ile sağlar.

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Teknolojiler](#teknolojiler)
- [Gereksinimler](#gereksinimler)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Konfigürasyon](#konfigürasyon)
- [Kullanım](#kullanım)
- [ASP.NET Core SPA Proxy](#aspnet-core-spa-proxy)
- [Mock Veri ve Kimlik Doğrulama](#mock-veri-ve-kimlik-doğrulama)
- [Dil Desteği (i18n)](#dil-desteği-i18n)
- [Scriptler](#scriptler)
- [Proje Yapısı](#proje-yapısı)
- [Sorun Giderme](#sorun-giderme)

## Genel Bakış

- Standalone admin web app (Vite + React + TypeScript)
- Medusa admin görünüm/bileşen yapısı korunur
- Backend bağımlılığı olmadan mock API ile çalışır
- Çoklu dil desteği (i18next)
- Dark/Light tema desteği
- React Query Devtools (sadece development)

## Teknolojiler

- React 18
- TypeScript
- Vite 5
- React Router 6
- TanStack Query
- Medusa UI (`@medusajs/ui`, `@medusajs/icons`)
- TailwindCSS
- i18next + react-i18next

## Gereksinimler

- Node.js 18+
- Paket yöneticisi:
  - `yarn@3.2.1` (önerilen)
  - veya `npm`
- Development HTTPS sertifikası için:
  - `.NET SDK` (Vite config, `dotnet dev-certs` ile sertifika üretir)

## Hızlı Başlangıç

### 1) Kurulum

```bash
yarn install
```

veya

```bash
npm install
```

### 2) Development

```bash
yarn dev
```

veya

```bash
npm run dev
```

Varsayılan development adresi:
- `https://localhost:5175`

### 3) Login (Mock)

Varsayılan mock kullanıcı:
- E-posta: `admin@medusa.local`
- Şifre: `Admin123!`

## Konfigürasyon

Ana config dosyası:
- `vite.config.ts`

Bu projede backend URL / storefront URL gibi Medusa bağlantı değişkenleri kullanılmaz.

### Kullanılan ortam değişkenleri

- `VITE_DEV_SERVER_PORT`
  - Vite portu (ör. `5175`)
- `DEV_SERVER_PORT`
  - `VITE_DEV_SERVER_PORT` için process-level alternatif
- `VITE_ASPNET_CERT_NAME`
  - ASP.NET dev cert dosya adı (default: `medus-react.client`)
- `ASPNETCORE_HTTPS_PORT`
  - Vite proxy hedefi için öncelikli ASP.NET HTTPS portu
- `ASPNETCORE_URLS`
  - Proxy hedefi için alternatif kaynak
- `VITE_MOCK_AUTH`
  - `true/false` (mock login akışı)
- `VITE_MOCK_EMAIL`
  - mock login e-posta override
- `VITE_MOCK_PASSWORD`
  - mock login şifre override

Geriye dönük (legacy) alias'lar da tanımlı:
- `VITE_MEDUSA_MOCK_AUTH`
- `VITE_MEDUSA_MOCK_API`
- `VITE_MEDUSA_MOCK_EMAIL`
- `VITE_MEDUSA_MOCK_PASSWORD`

Notlar:
- Mock auth default davranışı: env verilmezse aktif (`true`).
- Mock API katmanı uygulamada aktif kullanımdadır (`src/lib/client/client.ts` içinden `createMockApiFetch`).

### Örnek `.env`

```env
VITE_DEV_SERVER_PORT=5175
VITE_MOCK_AUTH=true
VITE_MOCK_EMAIL=admin@medusa.local
VITE_MOCK_PASSWORD=Admin123!
VITE_ASPNET_CERT_NAME=medus-react.client
```

## Kullanım

1. Uygulamayı başlatın (`yarn dev`).
2. Login ekranında mock kullanıcı ile giriş yapın.
3. Sol menüden domain sayfalarına geçin:
   - Products
   - Categories
   - Collections
   - Customers
   - Customer Groups
   - Inventory
   - Orders
   - Promotions
   - Price Lists
4. Liste ekranlarında arama, filtreleme, sıralama ve detay/edit akışlarını test edin.
5. Sağ üstteki tema butonuyla dark/light geçişini kullanın.
6. Development modda sağ altta React Query Devtools ile query/mutation akışlarını inceleyin.

Not:
- Veri kalıcılığı memory tabanlı mock katmandadır; sayfa yenilemede veya server restart'ta başlangıç verisine dönülür.

## ASP.NET Core SPA Proxy

Bu proje ASP.NET Core API ile birlikte çalıştırılacak şekilde hazırlanmıştır.

Vite proxy ayarı:
- `^/api` istekleri ASP.NET backend'e yönlenir.
- Hedef çözüm sırası:
  1. `ASPNETCORE_HTTPS_PORT` -> `https://localhost:<port>`
  2. `ASPNETCORE_URLS` içindeki ilk URL
  3. fallback: `https://localhost:7245`

Önemli:
- `/admin/*` istekleri bu projede mock API tarafından karşılanır.
- `/api/*` isteklerini kendi ASP.NET endpoint'leriniz için kullanabilirsiniz (ör. NSwag ile üretilen client).

## Mock Veri ve Kimlik Doğrulama

Mock API dosyası:
- `src/lib/mock-api.ts`

Mock auth dosyası:
- `src/lib/mock-auth.ts`

### Mock kapsamı

Özel handler'lar mevcut:
- Products
- Categories
- Collections
- Customers
- Customer Groups
- Inventory
- Orders
- Promotions
- Price Lists

Ek listeler:
- Store / Stores
- Sales Channels
- Product Types
- Product Tags
- Current User (`/admin/users/me`)

Desteklenmeyen endpoint'ler için generic fallback response üretilir (list/object/delete pattern).

## Dil Desteği (i18n)

### Nerede yönetiliyor?

- i18n init: `src/components/utilities/i18n/i18n.tsx`
- i18n config: `src/i18n/config.ts`
- Dil listesi: `src/i18n/languages.ts`
- Çeviri kaynakları: `src/i18n/translations/*.json`
- Kaynak index: `src/i18n/translations/index.ts`
- Provider: `src/providers/i18n-provider/i18n-provider.tsx`

### Yeni dil ekleme

1. `src/i18n/translations/<lang>.json` oluştur.
2. `src/i18n/translations/index.ts` içine import + export ekle.
3. `src/i18n/languages.ts` içine dil kaydını ekle:
   - `code`
   - `display_name`
   - `ltr`
   - `date_locale`
4. Uygulamayı yeniden başlatıp test et.

### Mevcut dili güncelleme

1. İlgili JSON dosyasını düzenle.
2. Şema üret:

```bash
yarn i18n:schema
```

3. Dosya doğrulama (tek dosya):

```bash
node scripts/i18n/validate-translation.js tr.json
```

## Scriptler

- `yarn dev` / `npm run dev`
  - Development server
- `yarn build` / `npm run build`
  - Production build
- `yarn preview` / `npm run preview`
  - Build preview
- `yarn test` / `npm run test`
  - Testleri çalıştırır
- `yarn lint` / `npm run lint`
  - ESLint
- `yarn i18n:schema`
  - i18n JSON schema üretir
- `yarn i18n:validate`
  - i18n doğrulama scripti (dosya argümanı ile kullanılmalı)
  - örnek: `yarn i18n:validate tr.json`
- `yarn generate:static`
  - currency statik verisini üretir

## Proje Yapısı

```text
src/
  components/        # UI bileşenleri (forms, inputs, layout, modals, table...)
  routes/            # Sayfa ve route modülleri
  hooks/             # React Query tabanlı API hook'ları
  lib/
    client/          # SDK/client adapter
    mock-api.ts      # Mock backend davranışı
    mock-auth.ts     # Mock login oturumu
  providers/         # App provider zinciri (Query, Theme, i18n, vb.)
  i18n/              # Dil config + çeviri dosyaları
  dashboard-app/     # Route/map ve extension kompozisyonu
```

## Sorun Giderme

### 1) `Outdated Optimize Dep` / 504

Vite cache'i temizleyin:

```bash
rm -rf node_modules/.vite
```

Sonra dev server'ı yeniden başlatın.

### 2) `Failed to fetch dynamically imported module`

- Çoğunlukla dev server restart sırasında veya port değişiminde görülür.
- Çözüm:
  - Dev server'ı kapatıp yeniden açın.
  - Tarayıcıyı hard refresh yapın.
  - Gerekirse `node_modules/.vite` temizleyin.

### 3) Login olmuyor

- `VITE_MOCK_AUTH=true` olduğundan emin olun.
- Mock credential kullanın (`admin@medusa.local` / `Admin123!`).
- `localStorage` temizleyip tekrar deneyin.

### 4) HTTPS sertifika hatası

- `dotnet dev-certs https --trust` çalıştırın.
- Gerekirse `VITE_ASPNET_CERT_NAME` ile farklı cert adı kullanın.

### 5) Çok sayıda `/admin/*` 404 hatası

- Bu proje mock API ile çalışır; `src/lib/client/client.ts` içindeki mock fetch akışının değiştirilmediğini doğrulayın.
- Gerçek backend'e geçiş yapacaksanız client katmanını ayrıca uyarlamanız gerekir.
