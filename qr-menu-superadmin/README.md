# ScanMenu Yönetim Paneli

Super Admin restoran hesaplarını yönetir. Restoran yöneticileri kendi ürünlerini, kategorilerini ve menü ayarlarını yönetir.

- Production: `https://admin.scanmenu.com.tr`
- Müşteri menüsü: `https://menu.scanmenu.com.tr/{restaurantId}`
- Firebase projesi: `qr-menu-database`
- Firebase Hosting target: `superadmin`

## Teknolojiler

- React 19
- Vite 8
- Firebase 12
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- ImgBB
- ESLint

## Proje sınırı

Bu klasör bağımsız bir uygulamadır. Komutlar `qr-menu-superadmin` klasöründe çalıştırılmalıdır. Ortam, Firestore Rules ve deploy dosyaları bu klasörde tutulur:

```text
qr-menu-superadmin/
├── .env.example
├── .firebaserc
├── .gitignore
├── firebase.json
├── firestore.rules
├── package.json
└── README.md
```

Gerçek `.env` dosyaları commit edilmez. Repoda yalnızca `.env.example` tutulur.

## Kurulum

```bash
cd qr-menu-superadmin
npm ci
```

Windows:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Ardından `.env` değerlerini doldurun ve uygulamayı başlatın:

```bash
npm run dev
```

## Ortam değişkenleri

Zorunlu:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_IMGBB_API_KEY=
```

Opsiyonel:

```env
VITE_FIREBASE_MEASUREMENT_ID=
```

`src/config/env.js` zorunlu değişkenleri uygulama açılırken doğrular. `VITE_` değişkenleri tarayıcı bundle'ına eklenir. Bu nedenle `VITE_IMGBB_API_KEY` gerçek bir backend sırrı değildir ve ImgBB hesabında kullanım sınırları uygulanmalıdır.

## Firebase yapısı

```text
restaurants/{restaurantId}
restaurants/{restaurantId}/categories/{categoryId}
restaurants/{restaurantId}/menu/{productId}
```

Aktiflik modeli için yalnızca `isInactive` kullanılır. Ürünler kategorilere `categoryId` ile bağlanır. Yeni restoranlar template restorandan oluşturulur; ürün ve kategori sayaçları restoran belgesinde tutulur.

Cloud Functions kullanılmaz. Restoran, kategori ve ürün işlemleri ilgili hook'lar üzerinden istemciden yürütülür ve Firestore Rules tarafından sınırlandırılır.

## Komutlar

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Firebase Hosting

Firebase CLI oturumu:

```bash
firebase login
```

Yönetim panelini deploy etmek için bu klasörde çalıştırın:

```bash
npm run lint
npm run build
firebase deploy --only hosting:superadmin
```

Firestore Rules değiştiğinde:

```bash
firebase deploy --only firestore:rules
```

Hosting ve kuralları birlikte deploy etmek için:

```bash
firebase deploy --only firestore:rules,hosting:superadmin
```

`.firebaserc`, `superadmin` target'ını `qr-menu-superadmin` Hosting sitesine bağlar. `firebase.json`, Firestore Rules dosyasını ve SPA rewrite kuralını tanımlar.

## Güvenlik

- Super Admin arayüzünde yalnızca restoran hesapları listelenebilir, oluşturulabilir ve silinebilir.
- Restoran sahibi yalnızca kendisine bağlı restoranı değiştirebilir.
- Pasif restoran sahibi yazma yapamaz.
- Ürün geçerli ve silinmekte olmayan bir kategoriye bağlanmalıdır.
- Güvenlik kontrolleri yalnızca arayüzde değil, `firestore.rules` içinde uygulanmalıdır.

Gerçek servis hesabı dosyaları ve `.env` varyantları commit edilmemelidir.
