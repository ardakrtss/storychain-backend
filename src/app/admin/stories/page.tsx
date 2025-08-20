'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  CheckCircle, 
  XCircle,
  Calendar,
  User,
  BarChart3,
  ArrowLeft,
  Heart,
  MessageCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

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
  status: 'published' | 'pending' | 'rejected' | 'flagged';
  moderationNotes?: string;
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
    segments: 3,
    status: 'published'
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
    segments: 5,
    status: 'published'
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
    segments: 2,
    status: 'pending'
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
    segments: 7,
    status: 'published'
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
    segments: 4,
    status: 'flagged',
    moderationNotes: 'İçerik uygun değil - gözden geçirilmeli'
  }
];

const adminMenuItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    href: '/admin',
    active: false
  },
  {
    title: 'Kullanıcılar',
    icon: User,
    href: '/admin/users',
    active: false
  },
  {
    title: 'Hikayeler',
    icon: BookOpen,
    href: '/admin/stories',
    active: true
  },
  {
    title: 'Temalar',
    icon: BarChart3,
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

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular' | 'views'>('newest');

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.authorNickname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTheme = selectedTheme === 'all' || story.theme.toLowerCase() === selectedTheme;
    const matchesStatus = selectedStatus === 'all' || story.status === selectedStatus;
    
    return matchesSearch && matchesTheme && matchesStatus;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'popular':
        return b.likeCount - a.likeCount;
      case 'views':
        return b.viewCount - a.viewCount;
      default:
        return 0;
    }
  });

  const handleStatusChange = (storyId: string, newStatus: 'published' | 'pending' | 'rejected' | 'flagged') => {
    setStories(prev => prev.map(story => 
      story.id === storyId ? { ...story, status: newStatus } : story
    ));
  };

  const handleDeleteStory = (storyId: string) => {
    if (confirm('Bu hikayeyi silmek istediğinizden emin misiniz?')) {
      setStories(prev => prev.filter(story => story.id !== storyId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'flagged':
        return <Shield className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Geri Dön</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Hikaye Yönetimi</h1>
            </div>
            <Link
              href="/admin/stories/create"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Hikaye Ekle</span>
            </Link>
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
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Hikaye ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Tüm Temalar</option>
                  <option value="fantastik">Fantastik</option>
                  <option value="bilim kurgu">Bilim Kurgu</option>
                  <option value="çocuk">Çocuk</option>
                  <option value="macera">Macera</option>
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="published">Yayınlanmış</option>
                  <option value="pending">Beklemede</option>
                  <option value="rejected">Reddedilmiş</option>
                  <option value="flagged">İşaretlenmiş</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular' | 'views')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="newest">En Yeni</option>
                  <option value="oldest">En Eski</option>
                  <option value="popular">En Popüler</option>
                  <option value="views">En Çok Görüntülenen</option>
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
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
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
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(story.status)}`}>
                            {getStatusIcon(story.status)}
                            <span>{story.status}</span>
                          </div>
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

                    {/* Moderation Notes */}
                    {story.moderationNotes && (
                      <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-800">
                          <strong>Moderasyon Notu:</strong> {story.moderationNotes}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <select
                        value={story.status}
                        onChange={(e) => handleStatusChange(story.id, e.target.value as 'published' | 'pending' | 'rejected' | 'flagged')}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg border-0 focus:ring-2 focus:ring-purple-500 ${getStatusColor(story.status)}`}
                      >
                        <option value="published">Yayınla</option>
                        <option value="pending">Beklet</option>
                        <option value="rejected">Reddet</option>
                        <option value="flagged">İşaretle</option>
                      </select>
                      
                      <Link
                        href={`/stories/${story.id}`}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      
                      <button 
                        onClick={() => handleDeleteStory(story.id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stories.length}</div>
                  <div className="text-sm text-gray-500">Toplam Hikaye</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {stories.filter(s => s.status === 'published').length}
                  </div>
                  <div className="text-sm text-gray-500">Yayınlanmış</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stories.filter(s => s.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-500">Beklemede</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {stories.filter(s => s.status === 'flagged').length}
                  </div>
                  <div className="text-sm text-gray-500">İşaretlenmiş</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {stories.filter(s => s.status === 'rejected').length}
                  </div>
                  <div className="text-sm text-gray-500">Reddedilmiş</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
