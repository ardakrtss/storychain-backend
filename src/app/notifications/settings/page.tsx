'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Bell, 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNotifications } from '../../../hooks/useNotifications';

export default function NotificationSettingsPage() {
  const { settings, updateSettings, requestPermission } = useNotifications();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'default'>('default');

  const handleToggle = (key: keyof typeof settings) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
  };

  const notificationTypes = [
    {
      key: 'storyUpdates' as const,
      title: 'Hikaye Güncellemeleri',
      description: 'Hikayenizde yapılan değişiklikler hakkında bildirim alın',
      icon: '📚'
    },
    {
      key: 'newComments' as const,
      title: 'Yeni Yorumlar',
      description: 'Hikayenize yapılan yorumlar hakkında bildirim alın',
      icon: '💬'
    },
    {
      key: 'likes' as const,
      title: 'Beğeniler',
      description: 'Hikayenizin beğenilmesi hakkında bildirim alın',
      icon: '❤️'
    },
    {
      key: 'mentions' as const,
      title: 'Bahsedilmeler',
      description: 'Hikayelerde bahsedilmeniz hakkında bildirim alın',
      icon: '📢'
    },
    {
      key: 'adminNotifications' as const,
      title: 'Admin Bildirimleri',
      description: 'Sistem güncellemeleri ve önemli duyurular',
      icon: '⚙️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Geri Dön</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Bildirim Ayarları</h1>
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
        <div className="space-y-8">
          {/* Browser Permission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Tarayıcı Bildirimleri</h2>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Bildirim İzni</p>
                <p className="text-sm text-gray-600">
                  Tarayıcı bildirimlerini almak için izin vermeniz gerekiyor
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {permissionStatus === 'granted' ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">İzin Verildi</span>
                  </div>
                ) : permissionStatus === 'denied' ? (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">İzin Reddedildi</span>
                  </div>
                ) : (
                  <button
                    onClick={handleRequestPermission}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    İzin Ver
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Notification Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Bildirim Türleri</h2>
            </div>
            
            <div className="space-y-4">
              {notificationTypes.map((type, index) => (
                <motion.div
                  key={type.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{type.icon}</div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {type.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(type.key)}
                    className="flex items-center space-x-2"
                  >
                    {localSettings[type.key] ? (
                      <ToggleRight className="w-8 h-8 text-purple-600" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-400" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Notification Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bildirim Zamanlaması</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bildirim Saatleri
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="all">Tüm Saatler</option>
                  <option value="day">Sadece Gündüz (08:00-20:00)</option>
                  <option value="custom">Özel Saatler</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bildirim Sıklığı
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="immediate">Anında</option>
                  <option value="hourly">Saatlik Özet</option>
                  <option value="daily">Günlük Özet</option>
                  <option value="weekly">Haftalık Özet</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Notification History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bildirim Geçmişi</h2>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Bildirim Geçmişini Temizle</p>
                <p className="text-sm text-gray-600">
                  Tüm bildirim geçmişinizi kalıcı olarak silin
                </p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Geçmişi Temizle
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
