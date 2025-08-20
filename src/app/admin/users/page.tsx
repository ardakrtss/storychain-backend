'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  UserCheck, 
  UserX,
  Calendar,
  Mail,
  Phone,
  BarChart3,
  ArrowLeft,
  BookOpen,
  MessageCircle,
  Heart
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'banned';
  createdAt: string;
  lastLogin: string;
  storiesCount: number;
  commentsCount: number;
  likesCount: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin1',
    email: 'admin@storychain.com',
    nickname: 'Admin',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-20 14:30',
    storiesCount: 5,
    commentsCount: 23,
    likesCount: 156
  },
  {
    id: '2',
    username: 'hikayeci_ali',
    email: 'ali@example.com',
    nickname: 'Hikayeci_Ali',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-20 12:15',
    storiesCount: 3,
    commentsCount: 15,
    likesCount: 89
  },
  {
    id: '3',
    username: 'uzay_yolcusu',
    email: 'uzay@example.com',
    nickname: 'Uzay_Yolcusu',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-08',
    lastLogin: '2024-01-19 18:45',
    storiesCount: 2,
    commentsCount: 8,
    likesCount: 45
  },
  {
    id: '4',
    username: 'moderator1',
    email: 'mod@storychain.com',
    nickname: 'Moderator',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-01-02',
    lastLogin: '2024-01-20 10:20',
    storiesCount: 1,
    commentsCount: 12,
    likesCount: 67
  },
  {
    id: '5',
    username: 'spam_user',
    email: 'spam@example.com',
    nickname: 'Spam_User',
    role: 'user',
    status: 'suspended',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-18 09:30',
    storiesCount: 0,
    commentsCount: 0,
    likesCount: 0
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
    icon: Users,
    href: '/admin/users',
    active: true
  },
  {
    title: 'Hikayeler',
    icon: BarChart3,
    href: '/admin/stories',
    active: false
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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'activity'>('newest');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'name':
        return a.username.localeCompare(b.username);
      case 'activity':
        return b.storiesCount - a.storiesCount;
      default:
        return 0;
    }
  });

  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended' | 'banned') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleRoleChange = (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
            </div>
            <Link
              href="/admin/users/create"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Kullanıcı Ekle</span>
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
                    placeholder="Kullanıcı ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Tüm Roller</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="user">Kullanıcı</option>
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="active">Aktif</option>
                  <option value="suspended">Askıya Alınmış</option>
                  <option value="banned">Yasaklı</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name' | 'activity')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="newest">En Yeni</option>
                  <option value="oldest">En Eski</option>
                  <option value="name">İsme Göre</option>
                  <option value="activity">Aktiviteye Göre</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kullanıcı
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İstatistikler
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Son Giriş
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-600">
                                {user.nickname.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.nickname}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                              <div className="text-xs text-gray-400">
                                @{user.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as 'user' | 'moderator' | 'admin')}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)} border-0 focus:ring-2 focus:ring-purple-500`}
                          >
                            <option value="user">Kullanıcı</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.status}
                            onChange={(e) => handleStatusChange(user.id, e.target.value as 'active' | 'suspended' | 'banned')}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)} border-0 focus:ring-2 focus:ring-purple-500`}
                          >
                            <option value="active">Aktif</option>
                            <option value="suspended">Askıya Alınmış</option>
                            <option value="banned">Yasaklı</option>
                          </select>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-3 h-3 text-blue-500" />
                              <span>{user.storiesCount} hikaye</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-3 h-3 text-green-500" />
                              <span>{user.commentsCount} yorum</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Heart className="w-3 h-3 text-red-500" />
                              <span>{user.likesCount} beğeni</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-purple-600 hover:text-purple-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                  <div className="text-sm text-gray-500">Toplam Kullanıcı</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {users.filter(u => u.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-500">Aktif Kullanıcı</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {users.filter(u => u.status === 'suspended').length}
                  </div>
                  <div className="text-sm text-gray-500">Askıya Alınmış</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {users.filter(u => u.status === 'banned').length}
                  </div>
                  <div className="text-sm text-gray-500">Yasaklı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
