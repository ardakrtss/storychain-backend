import Link from 'next/link'
import { BookOpen, Users, Sparkles, ArrowRight, Star, Heart } from 'lucide-react'


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                StoryChain
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
                Özellikler
              </Link>
              <Link href="#themes" className="text-gray-600 hover:text-purple-600 transition-colors">
                Temalar
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">
                Hakkında
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {/* <NotificationBell /> */}
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Başla
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Çocuklar için Güvenli Hikaye Yazma Platformu</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Birlikte
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Hikaye </span>
              Yazalım
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Çocukların yaratıcılığını geliştiren, birlikte çalışma becerilerini artıran 
              interaktif hikaye yazma platformu. Her çocuk hikayenin bir bölümünü yazar, 
              sonunda harika bir hikaye ortaya çıkar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link 
                href="/stories/create" 
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                Hikaye Yazmaya Başla
              </Link>
              <Link 
                href="/stories" 
                className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-200 border border-purple-200"
              >
                Hikayeleri Keşfet
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden StoryChain?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Çocukların gelişimine katkı sağlayan özelliklerle dolu platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Birlikte Çalışma</h3>
              <p className="text-gray-600">
                5 farklı yazar bir hikayeyi birlikte tamamlar. Çocuklar takım çalışması 
                ve işbirliği becerilerini geliştirir.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Yaratıcılık</h3>
              <p className="text-gray-600">
                6 farklı tema ile çocukların hayal gücünü geliştirir. Her tema 
                farklı dünyalar keşfetmelerini sağlar.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Güvenli Ortam</h3>
              <p className="text-gray-600">
                İçerik moderasyonu ile çocuklar için güvenli bir yazma ortamı. 
                Uygun olmayan içerikler otomatik filtrelenir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hikaye Temaları
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Çocukların ilgi alanlarına göre 6 farklı tema seçeneği
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Fantastik', icon: '🧙‍♂️', color: 'from-purple-500 to-purple-600', desc: 'Büyülü dünyalar ve sihirli yaratıklar' },
              { name: 'Gizem', icon: '🔍', color: 'from-blue-500 to-blue-600', desc: 'Gizemli olaylar ve keşifler' },
              { name: 'Bilim Kurgu', icon: '🚀', color: 'from-cyan-500 to-cyan-600', desc: 'Gelecek teknolojileri ve uzay' },
              { name: 'Macera', icon: '🗺️', color: 'from-green-500 to-green-600', desc: 'Tehlikeli yolculuklar ve kahramanlar' },
              { name: 'Sıfır Atık', icon: '♻️', color: 'from-emerald-500 to-emerald-600', desc: 'Çevre dostu yaşam' },
              { name: 'İklim Değişikliği', icon: '🌍', color: 'from-teal-500 to-teal-600', desc: 'İklim sorunları ve çözümler' }
            ].map((theme, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className={`w-16 h-16 bg-gradient-to-r ${theme.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {theme.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{theme.name}</h3>
                <p className="text-gray-600">{theme.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-purple-100">Yazılan Hikaye</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-purple-100">Aktif Yazar</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-purple-100">Tamamlanan Hikaye</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-purple-100 flex items-center justify-center">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300 mr-1" />
                Kullanıcı Puanı
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StoryChain</span>
              </div>
              <p className="text-gray-400">
                Çocukların yaratıcılığını geliştiren, birlikte çalışma becerilerini 
                artıran interaktif hikaye yazma platformu.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/stories" className="hover:text-white transition-colors">Hikayeler</Link></li>
                <li><Link href="/themes" className="hover:text-white transition-colors">Temalar</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">Sıralama</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Hakkında</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Yardım</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Gizlilik</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Şartlar</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Topluluk</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">Etkinlikler</Link></li>
                <li><Link href="/feedback" className="hover:text-white transition-colors">Geri Bildirim</Link></li>
                <li><Link href="/contribute" className="hover:text-white transition-colors">Katkıda Bulun</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StoryChain. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
