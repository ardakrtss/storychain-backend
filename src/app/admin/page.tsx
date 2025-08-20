'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Settings, 
  Shield, 
  BarChart3, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalStories: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  activeUsers: number;
}

interface RecentActivity {
  id: string;
  type: 'story_created' | 'user_registered' | 'story_liked' | 'comment_added';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const mockStats: DashboardStats = {
  totalUsers: 1247,
  totalStories: 89,
  totalViews: 15420,
  totalLikes: 3421,
  totalComments: 892,
  activeUsers: 156
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'story_created',
    title: 'Yeni Hikaye Oluşturuldu',
    description: '"Sihirli Ormanın Gizemi" hikayesi oluşturuldu',
    timestamp: '2 saat önce',
    user: 'Hikayeci_Ali'
  },
  {
    id: '2',
    type: 'user_registered',
    title: 'Yeni Kullanıcı Kaydı',
    description: 'Yeni kullanıcı sisteme katıldı',
    timestamp: '3 saat önce',
    user: 'Yeni_Yazar'
  },
  {
    id: '3',
    type: 'story_liked',
    title: 'Hikaye Beğenildi',
    description: '"Uzay Macerası" hikayesi beğenildi',
    timestamp: '4 saat önce',
    user: 'Uzay_Yolcusu'
  },
  {
    id: '4',
    type: 'comment_added',
    title: 'Yorum Eklendi',
    description: 'Hikayeye yeni yorum eklendi',
    timestamp: '5 saat önce',
    user: 'Yorumcu_123'
  }
];

const adminMenuItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    href: '/admin',
    active: true
  },
  {
    title: 'Kullanıcılar',
    icon: Users,
    href: '/admin/users',
    active: false
  },
  {
    title: 'Hikayeler',
    icon: BookOpen,
    href: '/admin/stories',
    active: false
  },
  {
    title: 'Temalar',
    icon: Settings,
    href: '/admin/themes',
    active: false
  },
  {
    title: 'Moderasyon',
    icon: Shield,
    href: '/admin/moderation',
    active: false
  }
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(mockRecentActivity);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'story_created':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'user_registered':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'story_liked':
        return <Heart className="w-4 h-4 text-red-600" />;
      case 'comment_added':
        return <MessageCircle className="w-4 h-4 text-purple-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'story_created':
        return 'bg-blue-50 border-blue-200';
      case 'user_registered':
        return 'bg-green-50 border-green-200';
      case 'story_liked':
        return 'bg-red-50 border-red-200';
      case 'comment_added':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7d">Son 7 Gün</option>
                <option value="30d">Son 30 Gün</option>
                <option value="90d">Son 90 Gün</option>
              </select>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Menü</h2>
              <nav className="space-y-2">
                {adminMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
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
                    <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12%</span>
                  <span className="text-gray-500 ml-1">geçen aya göre</span>
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
                    <p className="text-sm font-medium text-gray-600">Toplam Hikaye</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalStories}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+8%</span>
                  <span className="text-gray-500 ml-1">geçen aya göre</span>
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
                    <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+15%</span>
                  <span className="text-gray-500 ml-1">geçen aya göre</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Beğeni</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+22%</span>
                  <span className="text-gray-500 ml-1">geçen aya göre</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Yorum</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalComments}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+18%</span>
                  <span className="text-gray-500 ml-1">geçen aya göre</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+5%</span>
                  <span className="text-gray-500 ml-1">geçen aya göre</span>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Son Aktiviteler</h2>
                <Link
                  href="/admin/activities"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Tümünü Gör
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg border ${getActivityColor(activity.type)}`}
                  >
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">@{activity.user}</span>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/admin/users/create"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Kullanıcı Ekle</span>
                </Link>
                
                <Link
                  href="/admin/stories/create"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Hikaye Ekle</span>
                </Link>
                
                <Link
                  href="/admin/themes/create"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Tema Ekle</span>
                </Link>
                
                <Link
                  href="/admin/moderation"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Moderasyon</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
