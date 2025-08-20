# StoryChain 📚

StoryChain, çocukların birlikte hikaye yazabilecekleri interaktif bir platformdur. Her çocuk hikayenin bir bölümünü yazar ve sonunda ortaya harika bir hikaye çıkar.

## 🌟 Özellikler

- **Birlikte Hikaye Yazma**: 5 farklı yazar bir hikayeyi birlikte tamamlar
- **6 Farklı Tema**: Fantastik, Gizem, Bilim Kurgu, Macera, Sıfır Atık, İklim Değişikliği
- **İçerik Moderasyonu**: Uygun olmayan içerikler otomatik olarak filtrelenir
- **Admin Paneli**: Hikayeleri ve kullanıcıları yönetme
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Backend Kurulumu
```bash
cd storychain/backend
npm install
npm start
```

### Frontend Kurulumu
```bash
cd storychain/frontend
npm install
npm run dev
```

## 📁 Proje Yapısı

```
storychain/
├── backend/
│   ├── test-server.js          # Ana API sunucusu
│   └── contentModeration.js    # İçerik moderasyon modülü
└── frontend/
    ├── pages/                  # Next.js sayfaları
    ├── components/             # React bileşenleri
    └── styles/                 # CSS dosyaları
```

## 🔧 API Endpoints

### Kullanıcı İşlemleri
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/themes` - Tema listesi
- `GET /api/themes/:id` - Tema detayı

### Hikaye İşlemleri
- `GET /api/stories/available` - Devam edilebilir hikayeler
- `GET /api/stories/random` - Rastgele hikaye
- `POST /api/stories` - Yeni hikaye oluşturma
- `POST /api/stories/:id/continue` - Hikayeye devam etme

### Admin İşlemleri
- `GET /api/admin/stories` - Tüm hikayeler
- `GET /api/admin/users` - Tüm kullanıcılar
- `GET /api/admin/stats` - İstatistikler
- `DELETE /api/admin/stories/:id` - Hikaye silme
- `PUT /api/admin/stories/:id/approve` - Hikaye onaylama

## 🎨 Temalar

1. **Fantastik** 🧙‍♂️ - Büyülü dünyalar ve sihirli yaratıklar
2. **Gizem** 🔍 - Gizemli olaylar ve keşifler
3. **Bilim Kurgu** 🚀 - Gelecek teknolojileri ve uzay
4. **Macera** 🗺️ - Tehlikeli yolculuklar ve kahramanlar
5. **Sıfır Atık** ♻️ - Çevre dostu yaşam
6. **İklim Değişikliği** 🌍 - İklim sorunları ve çözümler

## 🔒 Güvenlik

- İçerik moderasyonu ile uygun olmayan içerikler filtrelenir
- JWT token tabanlı kimlik doğrulama
- Admin paneli güvenli erişim

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Geliştirici

StoryChain, çocukların yaratıcılığını geliştirmek ve birlikte çalışma becerilerini artırmak amacıyla geliştirilmiştir.

---

**Not**: Bu proje şu anda geliştirme aşamasındadır. Test verileri kullanılmaktadır.
