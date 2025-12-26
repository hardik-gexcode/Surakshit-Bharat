import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'sos' | 'risk' | 'incident' | 'info';
  title: string;
  message: string;
  workerId?: string;
  workerName?: string;
  location?: string;
  timestamp: string;
  read: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  targetRoles: ('police' | 'company')[];
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  getUnreadCount: () => number;
  getNotificationsForRole: (role: 'police' | 'company') => Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Store in localStorage for persistence
    const stored = localStorage.getItem('surakshit_notifications');
    const existing = stored ? JSON.parse(stored) : [];
    localStorage.setItem('surakshit_notifications', JSON.stringify([newNotification, ...existing]));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    localStorage.removeItem('surakshit_notifications');
  }, []);

  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const getNotificationsForRole = useCallback((role: 'police' | 'company') => {
    return notifications.filter(n => n.targetRoles.includes(role));
  }, [notifications]);

  // Load notifications from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('surakshit_notifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed);
      } catch (e) {
        console.error('Failed to parse notifications:', e);
      }
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      clearNotifications,
      getUnreadCount,
      getNotificationsForRole
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
