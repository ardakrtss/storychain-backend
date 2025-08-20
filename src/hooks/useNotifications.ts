import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export interface NotificationSettings {
  storyUpdates: boolean;
  newComments: boolean;
  likes: boolean;
  mentions: boolean;
  adminNotifications: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [settings, setSettings] = useState<NotificationSettings>({
    storyUpdates: true,
    newComments: true,
    likes: true,
    mentions: true,
    adminNotifications: false
  });

  // Add new notification
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  }, []);

  // Delete notification
  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        setUnreadCount(count => Math.max(0, count - 1));
      }
      return prev.filter(n => n.id !== notificationId);
    });
  }, []);

  // Update notification settings
  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }, []);

  // Simulate real-time notifications (in real app, this would be WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random notifications
      const random = Math.random();
      if (random < 0.1) { // 10% chance every 30 seconds
        const types: Notification['type'][] = ['success', 'info', 'warning'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        addNotification({
          type: randomType,
          title: 'Yeni Aktivite',
          message: 'Hikayenizde yeni bir yorum var!',
          action: {
            label: 'Görüntüle',
            url: '/stories/1'
          }
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  // Calculate unread count
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    settings,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updateSettings,
    requestPermission
  };
}
