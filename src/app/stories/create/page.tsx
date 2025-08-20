'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

const storyThemes = [
  { id: 'fantastik', name: 'Fantastik', icon: '🐉', description: 'Büyülü dünyalar ve yaratıklar' },
  { id: 'bilim-kurgu', name: 'Bilim Kurgu', icon: '🚀', description: 'Gelecek ve teknoloji' },
  { id: 'macera', name: 'Macera', icon: '🗺️', description: 'Heyecan dolu yolculuklar' },
  { id: 'komedi', name: 'Komedi', icon: '😄', description: 'Eğlenceli ve gülünç hikayeler' },
  { id: 'gizem', name: 'Gizem', icon: '🔍', description: 'Gizemli olaylar ve çözümler' },
  { id: 'dostluk', name: 'Dostluk', icon: '🤝', description: 'Arkadaşlık ve dayanışma' }
];

export default function CreateStoryPage() {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateStory = async () => {
    if (!selectedTheme || !storyTitle || !storyContent) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    setIsCreating(true);
    
    try {
      // Basit bir story objesi oluştur
      const story = {
        id: Date.now().toString(),
        title: storyTitle,
        theme: selectedTheme,
        content: storyContent,
        createdAt: new Date().toISOString(),
        author: 'Anonim',
        likeCount: 0,
        commentCount: 0
      };

      // localStorage'a kaydet
      const existingStories = JSON.parse(localStorage.getItem('storychain-stories') || '[]');
      existingStories.push(story);
      localStorage.setItem('storychain-stories', JSON.stringify(existingStories));

      // Başarı mesajı göster
      alert('Hikaye başarıyla oluşturuldu!');
      
      // Ana sayfaya yönlendir
      window.location.href = '/';
      
    } catch (error) {
      console.error('Hikaye oluşturma hatası:', error);
      alert('Hikaye oluşturulurken bir hata oluştu.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Yeni Hikaye Oluştur</h1>
            </div>
            <div className="text-sm text-gray-500">
              Hayal gücünü kullan, harika bir hikaye yaz!
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Creation Form */}
        <div className="space-y-8">
          {/* Theme Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hikaye Teması Seç</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {storyThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedTheme === theme.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{theme.icon}</div>
                  <div className="font-medium text-gray-900">{theme.name}</div>
                  <div className="text-sm text-gray-600">{theme.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Story Title */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hikaye Başlığı</h2>
            <input
              type="text"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="Hikayenin başlığını yaz..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              maxLength={100}
            />
            <div className="text-sm text-gray-500 mt-2">
              {storyTitle.length}/100 karakter
            </div>
          </div>

          {/* Story Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hikaye İçeriği</h2>
            <textarea
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              placeholder="Hikayenin ilk bölümünü yazmaya başla..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[200px] resize-vertical"
              maxLength={1000}
            />
            <div className="text-sm text-gray-500 mt-2">
              {storyContent.length}/1000 karakter
            </div>
          </div>

          {/* Create Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCreateStory}
              disabled={isCreating || !selectedTheme || !storyTitle || !storyContent}
              className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                isCreating || !selectedTheme || !storyTitle || !storyContent
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
              }`}
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Hikayeyi Oluştur</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
