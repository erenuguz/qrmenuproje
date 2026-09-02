# ScanMenu Müşteri Menüsü

Restoranların kategori ve ürünlerini QR kod üzerinden gösteren React uygulamasıdır.

- Production: `https://scanmenu.com.tr/{restaurantId}`
- Yönetim paneli: `https://admin.scanmenu.com.tr`
- Firebase projesi: `qr-menu-database`

## Teknolojiler

- React 19
- Vite 8
- Firebase 12
- Cloud Firestore
- Firebase Hosting
- ESLint

## Proje sınırı

Bu klasör bağımsız bir uygulamadır. Komutlar `qr-menu-react` klasöründe çalıştırılmalıdır. Ortam ve deploy dosyaları bu klasörde tutulur:

```text
qr-menu-react/
├── .env.example
├── .firebaserc
├── .gitignore
├── firebase.json
├── package.json
└── README.md
```

Gerçek `.env` dosyaları commit edilmez. Repoda yalnızca `.env.example` tutulur.

## Kurulum

```bash
cd qr-menu-react
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

Ardından `.env` içindeki Firebase değerlerini doldurun ve uygulamayı başlatın:

```bash
npm run dev
```

- Ana ekran: `http://localhost:5173`
- Restoran menüsü: `http://localhost:5173/{restaurantId}`

## Ortam değişkenleri

Zorunlu:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Opsiyonel:

```env
VITE_FIREBASE_MEASUREMENT_ID=
```

`VITE_` değişkenleri tarayıcı bundle'ına eklenir; gizli anahtar saklamak için kullanılmamalıdır. Uygulama açılırken `src/config/env.js` zorunlu değişkenleri doğrular.

## URL ve veri modeli

Restoran ID'si URL yolundan alınır:

```text
restaurants/{restaurantId}
restaurants/{restaurantId}/categories/{categoryId}
restaurants/{restaurantId}/menu/{productId}
```

Aktiflik için `isActive` değil, yalnızca `isInactive` kullanılır. Ürün-kategori ilişkisi `categoryId` ile kurulur. Müşteri uygulaması Firestore verilerini okur; yönetim işlemleri SuperAdmin uygulamasında yapılır.

## Komutlar

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Firebase Hosting

Önce Firebase CLI oturumu açın:

```bash
firebase login
```

Deploy işlemini bu klasörde çalıştırın:

```bash
npm run lint
npm run build
firebase deploy --only hosting
```

`firebase.json`, bütün URL yollarını `index.html` dosyasına yönlendirir. Böylece `/{restaurantId}` adresleri doğrudan açılabilir.

## Güvenlik

Müşteri uygulamasında yazma arayüzü olmaması tek başına güvenlik sağlamaz. Yazma izinleri Firestore Rules ile restoran sahibi ve Super Admin hesaplarıyla sınırlandırılmalıdır.

Cloud Functions kullanılmaz. `WelcomeScreen` bağımsız tutulur.
