'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Sparkles, Wand2 } from 'lucide-react'

const themes = [
  {
    id: 'fantastik',
    name: 'Fantastik',
    icon: '🧙‍♂️',
    color: 'from-purple-500 to-purple-600',
    description: 'Büyülü dünyalar, sihirli yaratıklar ve olağanüstü maceralar',
    characters: 'Sihirbaz, Ejderha, Peri, Büyülü Hayvanlar',
    plotHints: 'Kayıp bir büyü kitabı, gizli bir orman, unutulmuş bir krallık'
  },
  {
    id: 'gizem',
    name: 'Gizem',
    icon: '🔍',
    color: 'from-blue-500 to-blue-600',
    description: 'Gizemli olaylar, ipuçları ve heyecan verici keşifler',
    characters: 'Dedektif, Gizemli Yabancı, Şüpheli Karakterler',
    plotHints: 'Kayıp bir hazine haritası, gizli geçitler, şifreli mesajlar'
  },
  {
    id: 'bilim-kurgu',
    name: 'Bilim Kurgu',
    icon: '🚀',
    color: 'from-cyan-500 to-cyan-600',
    description: 'Gelecekteki teknolojiler, uzay yolculukları ve robotlar',
    characters: 'Astronot, Robot, Uzaylı, Bilim İnsanı',
    plotHints: 'Yeni bir gezegen keşfi, zaman makinesi, yapay zeka'
  },
  {
    id: 'macera',
    name: 'Macera',
    icon: '🗺️',
    color: 'from-green-500 to-green-600',
    description: 'Tehlikeli yolculuklar, cesur kahramanlar ve büyük zorluklar',
    characters: 'Kaşif, Savaşçı, Rehber, Yerli Halk',
    plotHints: 'Bilinmeyen bir ada, antik tapınak, tehlikeli orman'
  },
  {
    id: 'sifir-atik',
    name: 'Sıfır Atık',
    icon: '♻️',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Çevre dostu yaşam, geri dönüşüm ve doğa sevgisi',
    characters: 'Çevreci Çocuk, Geri Dönüşüm Ustası, Doğa Koruyucusu',
    plotHints: 'Çöplerden yapılan sanat, organik bahçe, temiz enerji'
  },
  {
    id: 'iklim-degisikligi',
    name: 'İklim Değişikliği',
    icon: '🌍',
    color: 'from-teal-500 to-teal-600',
    description: 'İklim sorunları, çözümler ve gelecek için umut',
    characters: 'İklim Aktivisti, Bilim İnsanı, Gelecek Çocuğu',
    plotHints: 'Yenilenebilir enerji, karbon ayak izi, yeşil teknoloji'
  }
]

export default function CreateStoryPage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [storyData, setStoryData] = useState({
    title: '',
    content: ''
  })
  const [step, setStep] = useState(1)

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTheme || !storyData.title || !storyData.content) {
      alert('Lütfen tüm alanları doldurun')
      return
    }
    
    try {
                      const response = await fetch('https://api.storychain.com.tr/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: storyData.title,
          theme: selectedTheme,
          content: storyData.content,
          authorId: 'temp-user-' + Date.now(),
          authorNickname: 'Anonim Yazar'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Story created:', data)
        alert('Hikaye başarıyla oluşturuldu!')
        // TODO: Redirect to story page
      } else {
        const error = await response.json()
        alert(error.message || 'Hikaye oluşturulamadı')
      }
    } catch (error) {
      console.error('Story creation error:', error)
      alert('Bağlantı hatası')
    }
  }

  const selectedThemeData = themes.find(t => t.id === selectedTheme)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors mr-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                StoryChain
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
          </div>
        </div>

        {/* Step 1: Theme Selection */}
        {step === 1 && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hikaye Teması Seçin</h1>
            <p className="text-xl text-gray-600 mb-8">
              Hikayenizin temasını seçin ve yaratıcılığınızı ortaya çıkarın
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 border-transparent hover:border-purple-200"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${theme.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                    {theme.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{theme.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{theme.description}</p>
                  
                  <div className="text-left">
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Karakterler:</h4>
                      <p className="text-xs text-gray-600">{theme.characters}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Hikaye İpuçları:</h4>
                      <p className="text-xs text-gray-600">{theme.plotHints}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Story Creation */}
        {step === 2 && selectedThemeData && (
          <div>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedThemeData.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {selectedThemeData.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedThemeData.name} Hikayesi</h1>
                  <p className="text-gray-600">{selectedThemeData.description}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Hikaye Başlığı
                </label>
                <input
                  type="text"
                  id="title"
                  value={storyData.title}
                  onChange={(e) => setStoryData({ ...storyData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Hikayenizin başlığını girin"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Hikaye İçeriği
                </label>
                <textarea
                  id="content"
                  value={storyData.content}
                  onChange={(e) => setStoryData({ ...storyData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Hikayenizin ilk bölümünü yazın... (En az 50 karakter)"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  {storyData.content.length}/1000 karakter
                </p>
              </div>

              {/* Theme Info */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  {selectedThemeData.name} Teması İpuçları
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Karakterler:</h4>
                    <p className="text-sm text-gray-600">{selectedThemeData.characters}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Hikaye İpuçları:</h4>
                    <p className="text-sm text-gray-600">{selectedThemeData.plotHints}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Geri Dön
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Hikayeyi Oluştur</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
