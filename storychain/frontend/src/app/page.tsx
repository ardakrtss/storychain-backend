'use client';
import Link from 'next/link'
import { BookOpen, Users, Sparkles, ArrowRight, Star, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">StoryChain</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Çocuklar İçin
              <span className="text-blue-600 block">İşbirlikçi Hikaye Yazma</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Çocukların hayal güçlerini birleştirerek büyüleyici hikayeler yaratın. 
              Her çocuk hikayeye kendi katkısını yapabilir ve birlikte harika maceralar yaşayabilir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/stories"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Hikayeleri Keşfet</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/characters"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Karakterler</span>
                <Sparkles className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden StoryChain?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Çocukların yaratıcılığını geliştiren, işbirliğini teşvik eden ve eğlenceli bir platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">İşbirlikçi Yazma</h3>
              <p className="text-gray-600">
                Çocuklar birlikte çalışarak hikayeleri geliştirir ve her biri kendi katkısını yapar
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Yaratıcı Karakterler</h3>
              <p className="text-gray-600">
                Özel karakterler oluşturun ve hikayelerinizi kişiselleştirin
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Güvenli Ortam</h3>
              <p className="text-gray-600">
                Çocuk dostu içerik moderasyonu ile güvenli bir yazma deneyimi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Yazılan Hikaye</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Aktif Yazar</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Karakter</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
              <div className="text-gray-600">Beğeni</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hikaye Yazmaya Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Çocuklarınızın hayal güçlerini keşfedin ve birlikte unutulmaz hikayeler yaratın
          </p>
          <Link
            href="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Ücretsiz Başla</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">StoryChain</span>
              </div>
              <p className="text-gray-400">
                Çocuklar için güvenli ve yaratıcı hikaye yazma platformu
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/stories" className="hover:text-white transition-colors">Hikayeler</Link></li>
                <li><Link href="/characters" className="hover:text-white transition-colors">Karakterler</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Yardım</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Gizlilik</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Topluluk</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Kurallar</Link></li>
                <li><Link href="/feedback" className="hover:text-white transition-colors">Geri Bildirim</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
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
