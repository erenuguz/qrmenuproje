import { useState, useEffect } from 'react';

// Varsayılan kaydırma limiti 300px olarak ayarlanmıştır.
export const useScroll = (limit = 300) => {
  const [goster, setGoster] = useState(false); // Butonun görünürlük durumunu tutar

  useEffect(() => {
    // Sayfanın dikey kaydırma miktarını (scrollY) limitle kıyaslar
    const kontrolEt = () => {
      setGoster(window.scrollY > limit);
    };

    // Component mount olduğunda scroll listener'ı dinlemeye başlar
    window.addEventListener('scroll', kontrolEt);
    
    // Component unmount olduğunda bellek sızıntısını (memory leak) önlemek için event'i temizler
    return () => window.removeEventListener('scroll', kontrolEt);
  }, [limit]); // Limit değiştiğinde useEffect yeniden tetiklenir

  // Sayfanın en üstüne yumuşak bir şekilde (smooth) kaydırılmasını sağlayan fonksiyon
  const usteCik = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // İhtiyaç duyulan durumu ve fonksiyonu dışarı aktarır
  return { goster, usteCik };
};