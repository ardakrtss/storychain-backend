# StoryChain Backend API

StoryChain için backend API servisi. Çocukların birlikte hikaye yazabilecekleri platformun API katmanı.

## 🚀 Deployment

Bu API Render platformunda deploy edilmiştir:
- **Production URL:** https://storychain-api.onrender.com
- **Health Check:** https://storychain-api.onrender.com/api/health

## 📋 API Endpoints

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

## 🔧 Teknolojiler

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **JWT** - JSON Web Tokens
- **Content Moderation** - İçerik filtreleme

## 🛠️ Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme modunda çalıştır
npm run dev

# Production modunda çalıştır
npm start
```

## 🔒 Güvenlik

- İçerik moderasyonu ile uygun olmayan içerikler filtrelenir
- JWT token tabanlı kimlik doğrulama
- CORS koruması
- Input validation

## 📊 Veritabanı

Şu anda mock veriler kullanılmaktadır. Gelecekte Firebase Firestore entegrasyonu planlanmaktadır.

## 🌐 Frontend

Frontend uygulaması Netlify'da deploy edilmiştir:
- **URL:** https://storychain-frontend.netlify.app
