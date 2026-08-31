# ScanMenu Müşteri Menüsü

ScanMenu Müşteri Menüsü, restoranların kategori ve ürünlerini QR kod üzerinden ziyaretçilere gösteren React ve Firebase tabanlı web uygulamasıdır.

Her restoran kendine ait URL ile açılır:

```text
https://scanmenu.com.tr/{restaurantId}
```

Örnek:

```text
https://scanmenu.com.tr/ornek-restoran
```

Yönetim işlemleri ayrı uygulamada yapılır:

```text
https://admin.scanmenu.com.tr
```

## Kullanılan teknolojiler

- React
- Vite
- Cloud Firestore
- Firebase Hosting
- ESLint

## URL yapısı

Uygulama restoran ID’sini URL yolundan alır.

Ana adres:

```text
https://scanmenu.com.tr
```

Ana adres açıldığında `WelcomeScreen` gösterilir.

Restoran adresi:

```text
https://scanmenu.com.tr/{restaurantId}
```

Restoran ID’si Firestore’daki restoran belge ID’siyle aynı olmalıdır:

```text
restaurants/{restaurantId}
```

Restoran bulunamazsa veya `isInactive` değeri `true` ise kullanıcıya restoranın bulunamadığı bilgisi gösterilir.

## Gereksinimler

Projeyi çalıştırmak için aşağıdakiler gereklidir:

- Node.js
- npm
- Bir Firebase projesi
- Firebase CLI

Firebase CLI kurulumu:

```bash
npm install -g firebase-tools
```

## Kurulum

Bağımlılıkları yükleyin:

```bash
npm ci
```

`.env.example` dosyasını `.env` adıyla kopyalayın ve Firebase değerlerini doldurun.

Development sunucusunu başlatın:

```bash
npm run dev
```

Ana ekranı açmak için:

```text
http://localhost:5173
```

Belirli bir restoranı açmak için:

```text
http://localhost:5173/{restaurantId}
```

Örnek:

```text
http://localhost:5173/ornek-restoran
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
```

Gerçek `.env` dosyası GitHub’a gönderilmemelidir.

`VITE_` ile başlayan değerlerin tarayıcı bundle’ına eklendiği ve gizli olmadığı unutulmamalıdır.

## Firebase servisleri

Uygulamada aşağıdaki Firebase servisleri kullanılmaktadır:

- Cloud Firestore: Restoran, kategori ve ürün verilerinin okunması
- Firebase Hosting: Uygulamanın yayınlanması

Cloud Functions kullanılmamaktadır.

Müşteri uygulaması veri oluşturmaz, güncellemez veya silmez. Yönetim işlemleri SuperAdmin uygulaması üzerinden gerçekleştirilir.

## Firestore veri modeli

Ana restoran belgesi:

```text
restaurants/{restaurantId}
```

Müşteri uygulamasının kullandığı temel restoran alanları:

```js
{
    name: string,
    logo: string,
    isInactive: boolean,
    wifiNetworkName: string,
    wifiPassword: string,
    instagram: string,
    whatsapp: string
}
```

Bazı sosyal medya veya Wi-Fi alanları restoran tercihine göre boş olabilir.

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
    isInactive: boolean
}
```

Kategori sıralaması `order` alanına göre yapılır.

`isActive` kullanılmaz. Aktiflik modeli için yalnızca `isInactive` alanı kullanılır.

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
    categoryId: string
}
```

Ürünlerin kategori bağlantısı `categoryId` üzerinden kurulur.

Eski `kategoriId` alanı yeni kayıtlarda kullanılmaz.

## Veri akışı

Restoran sayfası açıldığında aşağıdaki sıra izlenir:

1. Restoran ID’si URL’den alınır.
2. `useRestaurantDoc` restoran belgesini dinler.
3. Restoran yoksa hata durumu gösterilir.
4. Restoranın `isInactive` değeri `true` ise menü kapalı gösterilir.
5. `useCategories` kategorileri gerçek zamanlı olarak dinler.
6. `useMenu` ürünleri gerçek zamanlı olarak dinler.
7. Ürünler `categoryId` değerine göre kategorilere gruplanır.
8. Firestore snapshot hataları kullanıcıya hata ekranı olarak gösterilir.

Hook’lar restoran değiştiğinde eski restorana ait verileri göstermez. Yeni snapshot gelene kadar loading durumu döndürülür.

## Menü görünümü

Müşteri menüsü iki temel görünüm destekler:

- Kategori görünümü
- Ürün listesi görünümü

Kategori ve ürün ilişkisi şu alan üzerinden sağlanır:

```js
product.categoryId === category.id;
```

Ürünler kategori başına tekrar tekrar filtrelenmek yerine önceden gruplanmış veri yapısından okunmalıdır.

## Scroll-spy

Kategori çubuğundaki aktif kategori takibi `IntersectionObserver` kullanılarak yapılır.

Bu yapı:

- Her scroll sırasında bütün kategorileri dolaşmaz.
- DOM ölçümlerini sürekli tekrarlamaz.
- Aktif kategori butonunu görünür alanda tutar.
- Kullanıcının kategori seçimiyle yapılan smooth scroll işlemini destekler.

## Tema sistemi

Ortak tasarım değerleri `src/styles` altında tutulur.

Tema sistemi aşağıdaki değerleri yönetir:

- Renkler
- Font değerleri
- Radius değerleri
- Spacing değerleri
- Z-index katmanları
- Motion süreleri
- Form kontrol yükseklikleri
- Breakpoint değerleri

Tek kullanımlık bileşen ölçülerinin tamamının token yapılması zorunlu değildir. Yalnızca gerçekten tekrar eden değerler merkezileştirilir.

## Proje yapısı

```text
src/
├── components/
│   ├── common/
│   ├── customerMenu/
│   └── layout/
├── context/
├── hooks/
├── styles/
├── firebaseConfig.js
├── App.jsx
└── main.jsx
```

Tekrar kullanılan UI bileşenleri `components/common` altında tutulur.

Firebase snapshot işlemleri ilgili hook’larda yönetilir.

`WelcomeScreen` bağımsız tutulur ve genel refaktör kapsamına dahil edilmez.

## Güvenlik

Müşteri menüsünün restoran, kategori ve ürün verilerini okuyabilmesi için Firestore read kuralları herkese açık olabilir.

Yazma izinleri yalnızca:

- Restoran sahibi
- Super Admin

ile sınırlandırılmalıdır.

Arayüzde yazma butonu bulunmaması güvenlik sağlamaz. Asıl güvenlik Firestore Rules tarafından uygulanmalıdır.

## Kod kontrolü

Lint çalıştırmak için:

```bash
npm run lint
```

Production build almak için:

```bash
npm run build
```

Production build’i yerelde önizlemek için:

```bash
npm run preview
```

## Deployment

Önce lint ve production build kontrolü yapılır:

```bash
npm run lint
npm run build
```

Ardından Firebase Hosting deploy işlemi yapılır:

```bash
firebase deploy --only hosting
```

Firebase Hosting yapılandırmasında bütün URL yolları `index.html` dosyasına yönlendirilir. Böylece:

```text
/{restaurantId}
```

adresleri doğrudan açıldığında React uygulaması çalışmaya devam eder.

## Önemli notlar

- Cloud Functions kullanılmaz.
- `WelcomeScreen` genel refaktör kapsamı dışındadır.
- Restoran aktifliği `isInactive` alanıyla yönetilir.
- `isActive` kullanılmaz.
- Ürün kategori alanı olarak `categoryId` kullanılır.
- Büyük base64 görseller Firestore belgelerinde tutulmamalıdır.
- Görsel alanlarında URL saklanmalıdır.
- Müşteri uygulamasında ImgBB API anahtarına ihtiyaç yoktur.
