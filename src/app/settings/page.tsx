'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Camera,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  
  const [profileData, setProfileData] = useState({
    nickname: 'Hikayeci_Ali',
    email: user?.email || '',
    bio: 'Çocuklar için hikayeler yazan bir yazarım. Fantastik ve macera temalarını seviyorum.',
    avatar: '/characters/game/PNG/2048/88.png'
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'tr',
    notifications: {
      storyUpdates: true,
      newComments: true,
      likes: true,
      mentions: true
    }
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'preferences', label: 'Tercihler', icon: Palette },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'security', label: 'Güvenlik', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Geri Dön</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
            </div>
            <div className="flex items-center space-x-3">
              {saved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-green-600"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Kaydedildi!</span>
                </motion.div>
              )}
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>
                
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-purple-200"
                      />
                      <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Profil Fotoğrafı</h3>
                      <p className="text-sm text-gray-600">JPG, PNG veya GIF. Maksimum 2MB.</p>
                    </div>
                  </div>

                  {/* Nickname */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Takma Ad
                    </label>
                    <input
                      type="text"
                      value={profileData.nickname}
                      onChange={(e) => setProfileData({ ...profileData, nickname: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Takma adınızı girin"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      placeholder="E-posta adresiniz"
                    />
                    <p className="text-xs text-gray-500 mt-1">E-posta adresi değiştirilemez</p>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hakkımda
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tercihler</h2>
                
                <div className="space-y-6">
                  {/* Theme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tema
                    </label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="light">Açık Tema</option>
                      <option value="dark">Koyu Tema</option>
                      <option value="auto">Sistem</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dil
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="tr">Türkçe</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>

                  {/* Writing Preferences */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Yazma Tercihleri</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Otomatik kaydetme</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Yazım denetimi</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Kelime sayacı</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Bildirim Ayarları</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Hikaye Güncellemeleri</h3>
                      <p className="text-sm text-gray-600">Hikayenizde yapılan değişiklikler</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.storyUpdates}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          notifications: {
                            ...preferences.notifications,
                            storyUpdates: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Yeni Yorumlar</h3>
                      <p className="text-sm text-gray-600">Hikayenize yapılan yorumlar</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.newComments}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          notifications: {
                            ...preferences.notifications,
                            newComments: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Beğeniler</h3>
                      <p className="text-sm text-gray-600">Hikayenizin beğenilmesi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.likes}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          notifications: {
                            ...preferences.notifications,
                            likes: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Güvenlik</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Şifre Değiştir</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mevcut Şifre
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Mevcut şifrenizi girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yeni Şifre
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Yeni şifrenizi girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yeni Şifre (Tekrar)
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Yeni şifrenizi tekrar girin"
                        />
                      </div>
                      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Şifreyi Değiştir
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Hesap Yönetimi</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                        <div className="text-red-600 font-medium">Hesabı Sil</div>
                        <div className="text-sm text-red-500">Bu işlem geri alınamaz</div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
