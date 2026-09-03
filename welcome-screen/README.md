# ScanMenu Welcome

ScanMenu ürününü tanıtan bağımsız karşılama ve pazarlama uygulamasıdır. Müşteri QR menüsü ve yönetim panelinden ayrı geliştirilir ve ayrı bir Firebase Hosting sitesine dağıtılır.

## Uygulamalar

- Welcome: `https://www.scanmenu.com.tr`
- Müşteri QR menüsü: `https://scanmenu.com.tr/<restaurantId>`
- Yönetim paneli: `https://admin.scanmenu.com.tr`

## Teknoloji

- React 19
- Vite 8
- ESLint
- Firebase Hosting

## Yerel kurulum

```bash
npm install
npm run dev
```

## Komutlar

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Ortam değişkenleri

Bu uygulama şu anda ortam değişkeni kullanmıyor. İleride ihtiyaç oluşursa gerçek `.env` dosyalarını Git'e eklemeyin; yalnızca açıklamalı bir `.env.example` dosyası paylaşın.

## Proje yapısı

```text
src/
  assets/
  components/
  constants/
  pages/
    welcomeScreen/
      sections/
      styles/
```

Welcome uygulaması kendi bileşenlerini, sabitlerini ve stillerini kullanır; `qr-menu-react` veya `qr-menu-superadmin` içinden kod import etmez.

## Firebase Hosting kurulumu

Bu uygulama için müşteri ve yönetim panelinden ayrı bir Firebase Hosting sitesi oluşturun. Aşağıdaki `<WELCOME_SITE_ID>` değerini Firebase projenizde benzersiz bir site kimliğiyle değiştirin:

```bash
firebase login
firebase use qr-menu-database
firebase hosting:sites:create <WELCOME_SITE_ID>
firebase target:apply hosting welcome <WELCOME_SITE_ID>
```

`firebase target:apply` komutu, yerel `.firebaserc` dosyasına `welcome` hedef eşlemesini ekler. Bu eşleme yapılmadan deploy çalıştırmayın.

## Build ve deploy

```bash
npm ci
npm run lint
npm run build
firebase deploy --only hosting:welcome
```

Deploy tamamlandıktan sonra Firebase Console üzerinden `www.scanmenu.com.tr` alan adını yeni Welcome Hosting sitesine bağlayın.

## Bağlantı davranışı

- Sayfa içi CTA bağlantıları iletişim bölümüne gider.
- WhatsApp düğmesi doğrudan tanımlı iletişim hattını açar.
- Gizlilik Politikası ve KVKK sayfaları henüz bulunmadığı için Footer'da yayınlanmaz; bu sayfalar oluşturulduğunda bağlantılar yeniden eklenmelidir.
