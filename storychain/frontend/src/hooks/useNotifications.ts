import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  link?: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  browser: boolean;
  storyUpdates: boolean;
  comments: boolean;
  likes: boolean;
  mentions: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    browser: true,
    storyUpdates: true,
    comments: true,
    likes: true,
    mentions: true,
  });

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('storychain-notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed.map((n: { id: string; title: string; message: string; type: string; isRead: boolean; createdAt: string }) => ({
          ...n,
          createdAt: new Date(n.createdAt)
        })));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }

    // Add some mock notifications for demo
    if (!savedNotifications) {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Hoş geldiniz!',
          message: 'StoryChain\'e hoş geldiniz. İlk hikayenizi yazmaya başlayın!',
          type: 'info',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
          id: '2',
          title: 'Yeni karakter eklendi',
          message: 'Yeni karakterler eklendi. Hemen keşfedin!',
          type: 'success',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          link: '/characters',
        },
        {
          id: '3',
          title: 'Hikayeniz beğenildi',
          message: 'Hikayeniz "Macera Ormanı" 5 kişi tarafından beğenildi!',
          type: 'success',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
      ];
      setNotifications(mockNotifications);
      localStorage.setItem('storychain-notifications', JSON.stringify(mockNotifications));
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('storychain-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if enabled
    if (settings.browser && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
      });
    }
  }, [settings.browser]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const requestBrowserPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSettings({ browser: true });
      }
    }
  }, [updateSettings]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add notifications for demo purposes
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const demoNotifications = [
          {
            title: 'Yeni hikaye başladı',
            message: 'Yeni bir hikaye başladı. Katılmak ister misiniz?',
            type: 'info' as const,
          },
          {
            title: 'Hikayeniz tamamlandı',
            message: 'Hikayeniz başarıyla tamamlandı!',
            type: 'success' as const,
          },
          {
            title: 'Yeni yorum',
            message: 'Hikayenize yeni bir yorum geldi.',
            type: 'info' as const,
          },
        ];

        const randomNotification = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  return {
    notifications,
    settings,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    updateSettings,
    requestBrowserPermission,
  };
}
