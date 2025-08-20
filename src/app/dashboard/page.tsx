'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Eye, 
  Plus, 
  TrendingUp, 
  Calendar,
  User,
  Star,
  Award,
  PenTool,
  Settings
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserStats {
  totalStories: number;
  totalLikes: number;
  totalComments: number;
  totalViews: number;
  completedStories: number;
  averageRating: number;
}

interface RecentStory {
  id: string;
  title: string;
  theme: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isCompleted: boolean;
}

const mockUserStats: UserStats = {
  totalStories: 8,
  totalLikes: 156,
  totalComments: 42,
  totalViews: 892,
  completedStories: 3,
  averageRating: 4.7
};

const mockRecentStories: RecentStory[] = [
  {
    id: '1',
    title: 'Sihirli Ormanın Gizemi',
    theme: 'Fantastik',
    createdAt: '2024-01-15',
    likeCount: 24,
    commentCount: 8,
    viewCount: 156,
    isCompleted: false
  },
  {
    id: '2',
    title: 'Uzay Macerası',
    theme: 'Bilim Kurgu',
    createdAt: '2024-01-14',
    likeCount: 18,
    commentCount: 12,
    viewCount: 89,
    isCompleted: true
  },
  {
    id: '3',
    title: 'Küçük Prens ve Robot',
    theme: 'Çocuk',
    createdAt: '2024-01-13',
    likeCount: 31,
    commentCount: 15,
    viewCount: 234,
    isCompleted: false
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>(mockUserStats);
  const [recentStories, setRecentStories] = useState<RecentStory[]>(mockRecentStories);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'Fantastik':
        return 'bg-purple-100 text-purple-800';
      case 'Bilim Kurgu':
        return 'bg-blue-100 text-blue-800';
      case 'Çocuk':
        return 'bg-green-100 text-green-800';
      case 'Macera':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/settings"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.email || 'Kullanıcı'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Hoş geldin, {user?.email?.split('@')[0] || 'Hikayeci'}! 👋
                  </h2>
                  <p className="text-gray-600">
                    Bugün hangi hikayeyi yazmaya devam edeceksin?
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Date().toLocaleDateString('tr-TR', { weekday: 'long' })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('tr-TR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Hikaye</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalStories}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+2</span>
                  <span className="text-gray-500 ml-1">bu ay</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Beğeni</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalLikes}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12</span>
                  <span className="text-gray-500 ml-1">bu hafta</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Görüntülenme</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+45</span>
                  <span className="text-gray-500 ml-1">bugün</span>
                </div>
              </motion.div>
            </div>

            {/* Recent Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Son Hikayelerin</h2>
                <Link
                  href="/stories"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Tümünü Gör
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{story.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor(story.theme)}`}>
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
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
              
              <div className="space-y-3">
                <Link
                  href="/stories/create"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Yeni Hikaye</span>
                </Link>
                
                <Link
                  href="/characters"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <User className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Karakter Seç</span>
                </Link>
                
                <Link
                  href="/stories"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Hikayeleri Gör</span>
                </Link>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Başarılar</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">İlk Hikaye</p>
                    <p className="text-sm text-gray-500">İlk hikayeni yazdın!</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Popüler Yazar</p>
                    <p className="text-sm text-gray-500">100+ beğeni aldın!</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Hikaye Tamamlayıcı</p>
                    <p className="text-sm text-gray-500">3 hikaye tamamladın!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tamamlanan Hikaye</span>
                  <span className="font-medium">{stats.completedStories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ortalama Puan</span>
                  <span className="font-medium">{stats.averageRating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Toplam Yorum</span>
                  <span className="font-medium">{stats.totalComments}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
