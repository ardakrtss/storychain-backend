'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, MessageCircle, Eye, Search, Filter } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  theme: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isCompleted: boolean;
  segments: number;
}

const mockStories: Story[] = [
  {
    id: '1',
    title: 'Sihirli Ormanın Gizemi',
    theme: 'Fantastik',
    content: 'Bir zamanlar, kimsenin gitmeye cesaret edemediği bir orman vardı...',
    authorNickname: 'Hikayeci_Ali',
    createdAt: '2024-01-15',
    likeCount: 24,
    commentCount: 8,
    viewCount: 156,
    isCompleted: false,
    segments: 3
  },
  {
    id: '2',
    title: 'Uzay Macerası',
    theme: 'Bilim Kurgu',
    content: 'Yıl 2150, insanlık artık yıldızlar arasında seyahat edebiliyordu...',
    authorNickname: 'Uzay_Yolcusu',
    createdAt: '2024-01-14',
    likeCount: 18,
    commentCount: 12,
    viewCount: 89,
    isCompleted: true,
    segments: 5
  },
  {
    id: '3',
    title: 'Küçük Prens ve Robot',
    theme: 'Çocuk',
    content: 'Küçük prens, gezegeninde yalnız yaşarken bir robot arkadaş buldu...',
    authorNickname: 'Çocuk_Yazar',
    createdAt: '2024-01-13',
    likeCount: 31,
    commentCount: 15,
    viewCount: 234,
    isCompleted: false,
    segments: 2
  },
  {
    id: '4',
    title: 'Zaman Makinesi',
    theme: 'Bilim Kurgu',
    content: 'Profesör Ahmet, laboratuvarında çalışırken tesadüfen bir zaman makinesi icat etti...',
    authorNickname: 'Bilim_Adamı',
    createdAt: '2024-01-12',
    likeCount: 42,
    commentCount: 20,
    viewCount: 312,
    isCompleted: true,
    segments: 7
  },
  {
    id: '5',
    title: 'Sihirli Kalem',
    theme: 'Fantastik',
    content: 'Ayşe, bir gün eski bir dükkânda sihirli bir kalem buldu...',
    authorNickname: 'Sihirli_Kalem',
    createdAt: '2024-01-11',
    likeCount: 28,
    commentCount: 11,
    viewCount: 178,
    isCompleted: false,
    segments: 4
  }
];

const themes = [
  { id: 'all', name: 'Tümü', color: 'bg-gray-500' },
  { id: 'fantastik', name: 'Fantastik', color: 'bg-purple-500' },
  { id: 'bilim-kurgu', name: 'Bilim Kurgu', color: 'bg-blue-500' },
  { id: 'cocuk', name: 'Çocuk', color: 'bg-green-500' },
  { id: 'macera', name: 'Macera', color: 'bg-orange-500' },
  { id: 'mizah', name: 'Mizah', color: 'bg-yellow-500' }
];

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'likes'>('newest');

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.authorNickname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTheme = selectedTheme === 'all' || story.theme.toLowerCase() === selectedTheme;
    
    return matchesSearch && matchesTheme;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.viewCount - a.viewCount;
      case 'likes':
        return b.likeCount - a.likeCount;
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Hikayeler</h1>
            <Link
              href="/stories/create"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <span>Yeni Hikaye</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Hikaye, yazar veya içerik ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Theme Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tema Filtresi</h3>
            <div className="flex flex-wrap gap-3">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 ${
                    selectedTheme === theme.id
                      ? `${theme.color} shadow-lg`
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {theme.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sırala:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'likes')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="newest">En Yeni</option>
              <option value="popular">En Popüler</option>
              <option value="likes">En Çok Beğenilen</option>
            </select>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Story Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {story.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                        story.theme === 'Fantastik' ? 'bg-purple-500' :
                        story.theme === 'Bilim Kurgu' ? 'bg-blue-500' :
                        story.theme === 'Çocuk' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`}>
                        {story.theme}
                      </span>
                      {story.isCompleted && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Tamamlandı
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Story Preview */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {story.content}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>@{story.authorNickname}</span>
                  <span>{formatDate(story.createdAt)}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{story.likeCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{story.commentCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{story.viewCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>📝</span>
                    <span>{story.segments} bölüm</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    href={`/stories/${story.id}`}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
                  >
                    Oku
                  </Link>
                  {!story.isCompleted && (
                    <Link
                      href={`/stories/${story.id}/continue`}
                      className="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors text-center"
                    >
                      Devam Et
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedStories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Hikaye bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              Arama kriterlerinize uygun hikaye bulunamadı. Farklı anahtar kelimeler deneyin.
            </p>
            <Link
              href="/stories/create"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              İlk Hikayeyi Sen Yaz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
