export const CONTACT_EMAIL = 'erenn.uguz@gmail.com';
export const CONTACT_PHONE = '+90 541 534 01 87';
export const WHATSAPP_LINK = `https://wa.me/905415340187?text=${encodeURIComponent('Merhaba, QR menü hakkında bilgi almak istiyorum.')}`;

export const MENU_ITEMS = [
    {
        icon: '⚡',
        title: 'Hızlı Kurulum',
        desc: 'Uygulama indirmeden, sadece kamerayla QR okutarak menünüze anında ulaşılır.',
    },
    {
        icon: '🔄',
        title: 'Anında Güncelleme',
        desc: 'Fiyat ve ürünleri panelden değiştirin, baskı masrafı ve bekleme süresi olmadan.',
    },
    {
        icon: '🎨',
        title: 'Markanıza Özel Tasarım',
        desc: 'Logo ve renklerinizle uyumlu, göz yormayan şık bir dijital menü arayüzü.',
    },
    {
        icon: '📊',
        title: 'Görüntülenme İstatistikleri',
        desc: 'Kaç kişinin menünüzü açtığını takip edin ve müşteri eğilimlerini analiz edin.',
    },
];

export const HOW_IT_WORKS_STEPS = [
    {
        num: '01',
        title: 'Kayıt Olun',
        desc: 'Sisteme saniyeler içinde işletme hesabınızı açın ve giriş yapın.',
    },
    {
        num: '02',
        title: 'Menünüzü Ekleyin',
        desc: 'Kategori, ürün, açıklama ve fiyatlarınızı yönetim panelinden hızlıca girin.',
    },
    {
        num: '03',
        title: 'QR Kodunuzu Alın',
        desc: 'Size özel oluşturulan QR kodunu anında yüksek çözünürlüklü indirin.',
    },
    {
        num: '04',
        title: 'Sipariş Almaya Başla',
        desc: 'QR kodunu masalarınıza yerleştirin ve anında dijitalleşmenin keyfini çıkarın.',
    },
];

export const PRICING_PLANS = [
    {
        name: 'ERKEN ERİŞİM',
        price: '0',
        currency: '₺',
        period: '/ay',
        oldPrice: '349',
        badge: 'SINIRLI SAYIDA İŞLETMEYE ÖZEL 🎯',
        popular: true,
        features: [
            'Tamamen ücretsiz, kredi kartı bilgisi gerekmez',
            'Sınırsız ürün & kategori yönetimi',
            'Sistemin tüm özelliklerine tam erişim',
            'Birebir kurulum ve entegrasyon desteği',
        ],
        btnText: "WhatsApp'tan Başvur →",
        btnLink: `https://wa.me/${CONTACT_PHONE.replace(/\D/g, '')}?text=${encodeURIComponent('Merhaba, QR menü erken erişim kampanyası için başvurmak istiyorum.')}`,
    },
    {
        name: 'STANDART (YAKINDA)',
        price: '-',
        currency: '₺',
        period: '/ay',
        oldPrice: null,
        badge: 'ÇOK YAKINDA',
        popular: false,
        features: [
            'Sınırsız ürün & kategori',
            'Anında fiyat & içerik güncelleme',
            'QR kod yönetimi',
            'Müşteri destek hattı',
        ],
        btnText: 'Şu An Satışa Kapalı',
        btnLink: '#',
    },
];

export const FAQS = [
    {
        q: 'Sistemi kullanmak için ekstra bir cihaza ihtiyacım var mı?',
        a: 'Hayır, menünüzü yönetmek için akıllı telefonunuz veya bilgisayarınız yeterlidir. Müşterileriniz de kendi telefonlarının kamerasını kullanır.',
    },
    {
        q: 'Ürün fiyatlarını değiştirdiğimde menüye ne zaman yansır?',
        a: 'Yönetim panelinden yaptığınız her değişiklik saniyeler içinde anında canlı menünüze yansır.',
    },
    {
        q: 'Kaç masam olursa olsun tek fiyat mı?',
        a: 'Evet, masa sayınıza veya menünüzü okutan müşteri sayısına göre fiyat kesinlikle değişmez. Sınırsız kullanım hakkınız vardır.',
    },
    {
        q: 'İnternetsiz menü çalışır mı?',
        a: 'Menünün yüklenebilmesi için müşterilerinizin akıllı telefonlarının internete bağlı olması gerekmektedir.',
    },
    {
        q: 'Sözleşme var mı, istediğimde iptal edebilir miyim?',
        a: 'Hiçbir taahhüt veya bağlayıcı uzun süreli sözleşme yoktur. İstediğiniz zaman panel üzerinden aboneliğinizi tek tıkla iptal edebilirsiniz.',
    },
];

export const DEMO_INFO = {
    adminUrl: 'https://admin.scanmenu.com.tr',
    adminEmail: 'erenuguz301@outlook.com',
    adminPass: '12345678',
    menuUrl: 'https://menu.scanmenu.com.tr/demo',
    menuName: 'Örnek İşletme',
};
