# ScanMenu Yönetim Paneli

ScanMenu Yönetim Paneli, birden fazla restoranın QR menü verilerini yönetmek için geliştirilmiş React ve Firebase tabanlı yönetim uygulamasıdır.

Uygulama iki kullanıcı tipini destekler:

- Super Admin: Restoran oluşturabilir, restoranları yönetebilir ve silebilir.
- Restoran sahibi: Yalnızca kendisine bağlı restoranın kategori, ürün ve ayarlarını yönetebilir.

## Production adresi

```text
https://admin.scanmenu.com.tr
```

Müşteri menüleri ayrı React uygulamasında yayınlanır:

```text
https://scanmenu.com.tr/{restaurantId}
```

Örnek:

```text
https://scanmenu.com.tr/ornek-restoran
```

## Kullanılan teknolojiler

- React
- Vite
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- ImgBB görsel yükleme servisi
- ESLint

## Gereksinimler

Projeyi çalıştırmak için aşağıdakiler gereklidir:

- Node.js
- npm
- Bir Firebase projesi
- Firebase CLI
- ImgBB API anahtarı

Firebase CLI kurulumu:

```bash
npm install -g firebase-tools
```

## Kurulum

Projeyi indirdikten sonra bağımlılıkları yükleyin:

```bash
npm ci
```

`.env.example` dosyasını `.env` adıyla kopyalayın ve gerekli değerleri doldurun.

Development sunucusunu başlatın:

```bash
npm run dev
```

## Ortam değişkenleri

Proje aşağıdaki environment değişkenlerini kullanır:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_IMGBB_API_KEY=
```

`VITE_` ile başlayan değişkenler tarayıcı bundle’ına eklenir ve gizli kabul edilmemelidir.

Gerçek `.env` dosyası GitHub’a gönderilmemelidir.

## Firebase servisleri

Uygulamada aşağıdaki Firebase servisleri kullanılmaktadır:

- Authentication: Super Admin ve restoran sahibi oturumları
- Cloud Firestore: Restoran, kategori ve ürün verileri
- Hosting: Yönetim panelinin yayınlanması

Cloud Functions kullanılmamaktadır.

## Firestore veri modeli

Ana koleksiyon:

```text
restaurants/{restaurantId}
```

Restoran belgesinin temel alanları:

```js
{
    name: string,
    adminEmail: string,
    userId: string,
    logo: string,
    isInactive: boolean,
    productCount: number,
    categoryCount: number,
    createdAt: Timestamp,
    updatedAt: Timestamp
}
```

Kategori alt koleksiyonu:

```text
restaurants/{restaurantId}/categories/{categoryId}
```

Temel kategori alanları:

```js
{
    name: string,
    image: string,
    order: number,
    isInactive: boolean,
    createdAt: Timestamp,
    updatedAt: Timestamp
}
```

`isActive` kullanılmaz. Aktiflik durumu yalnızca `isInactive` alanıyla yönetilir.

Ürün alt koleksiyonu:

```text
restaurants/{restaurantId}/menu/{productId}
```

Temel ürün alanları:

```js
{
    name: string,
    description: string,
    price: number,
    image: string,
    categoryId: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
}
```

## Template restoran mantığı

Yeni restoranlar, sistemde bulunan template restoranın kategori, ürün ve genel ayarları kullanılarak oluşturulur.

Template restoran ID’si şu dosyada tanımlıdır:

```text
src/hooks/useRestaurantActions.js
```

Oluşturma işlemi sırasında:

1. Restoran ID’sinin daha önce kullanılmadığı kontrol edilir.
2. Template restoran, kategori ve ürün belgeleri okunur.
3. Yeni Firebase Auth kullanıcısı oluşturulur.
4. Kategoriler için yeni belge ID’leri hazırlanır.
5. Ürünlerin eski kategori ID’leri yeni kategori ID’leriyle eşleştirilir.
6. Geçersiz kategori referansı varsa restoran oluşturma iptal edilir.
7. Restoran, kategori ve ürünler batch işlemiyle kaydedilir.
8. Kullanıcıya şifre sıfırlama e-postası gönderilir.

Firestore kaydı başarısız olursa yeni oluşturulan Auth kullanıcısı silinerek rollback uygulanır.

Firestore batch sınırı aşılıyorsa işlem durdurulur.

## Sayaç politikası

Restoran belgelerinde şu sayaçlar tutulur:

```js
productCount;
categoryCount;
```

Yeni restoran oluşturulurken sayaçlar template içeriğine göre oluşturulur.

Ürün ve kategori ekleme/silme işlemlerinde sayaçlar atomik olarak güncellenmelidir.

Sayaçlar sıfırın altına düşmemelidir. Olmayan bir belgeyi silme girişimi sayacı değiştirmemelidir.

Eski restoran belgelerinde bu alanlar bulunmayabilir. Sayaç sistemi esas olarak yeni oluşturulan restoranlar için uygulanmaktadır.

## Restoran silme

Restoran silme işlemi Cloud Functions kullanmadan doğrudan:

```text
src/hooks/useRestaurantActions.js
```

içindeki `deleteRestaurant` fonksiyonu tarafından gerçekleştirilir.

Silme sırasında:

1. Template restoranın silinmesi engellenir.
2. Kullanıcıdan onay alınır.
3. Restoranın kategori belgeleri silinir.
4. Restoranın ürün belgeleri silinir.
5. Restoran belgesi silinir.

Firestore’da bir üst belgeyi silmek alt koleksiyonları otomatik silmediği için kategori ve ürün alt koleksiyonlarının ayrıca temizlenmesi gerekir.

`deletionStatus`, `pending`, `deletedAt` ve zamanlanmış Cloud Function akışı kullanılmaz.

Mevcut restoran sahibinin Firebase Authentication hesabı, istemci tarafından otomatik olarak silinmez. Restoran belgesi silindiğinde kullanıcı giriş yapsa bile kendisine bağlı restoran bulamaz.

## Güvenlik

Firestore kuralları aşağıdaki temel prensiplere uygun olmalıdır:

- Restoran verileri müşteri menüsü tarafından okunabilir.
- Restoran sahibi yalnızca kendi restoranını değiştirebilir.
- Super Admin bütün restoranları yönetebilir.
- Bir restoran sahibi başka restoranın ürün ve kategorilerine yazamaz.

Güvenlik yalnızca arayüz kontrollerine bırakılmamalı; Firestore Rules tarafından uygulanmalıdır.

## Proje yapısı

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── categoryTab/
│   ├── productTab/
│   ├── restaurantTab/
│   └── settingsTab/
├── context/
├── hooks/
├── pages/
├── styles/
├── utils/
├── firebaseConfig.js
├── App.jsx
└── main.jsx
```

Tekrar kullanılan UI parçaları `components/common` altında tutulur.

Tema değerleri ve tasarım tokenları `styles` altında yönetilir.

Firebase veri işlemleri mümkün olduğunca ilgili hook’larda tutulur.

## Kod kontrolü

Lint çalıştırmak için:

```bash
npm run lint
```

Production build almak için:

```bash
npm run build
```

Build sonucunu yerelde kontrol etmek için:

```bash
npm run preview
```

## Deployment

Önce production build alın:

```bash
npm run build
```

Ardından SuperAdmin hosting target’ına deploy edin:

```bash
firebase deploy --only hosting:superadmin
```

Deploy öncesinde lint ve build komutlarının başarılı olduğu kontrol edilmelidir:

```bash
npm run lint
npm run build
```

## Önemli notlar

- `WelcomeScreen`, müşteri projesine özel ve ayrı kapsamda tutulmaktadır.
- Cloud Functions kullanılmamaktadır.
- `isActive` yerine `isInactive` kullanılır.
- Görsel URL’leri Firestore’da tutulur; büyük base64 verileri saklanmamalıdır.
- `VITE_IMGBB_API_KEY` gerçek bir backend sırrı değildir ve istemci bundle’ında görülebilir.
