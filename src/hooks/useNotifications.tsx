import * as React from "react";

interface Notification {
  id: string;
  type: 'reminder' | 'preparation' | 'followup' | 'general' | 'health';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  relatedId?: string; // e.g., session id
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "preparation",
    title: "Pre-Nasya Preparation",
    message: "Please avoid heavy meals 2 hours before your session tomorrow at 15:18",
    time: "2 hours ago",
    read: false,
    priority: "high"
  },
  {
    id: "2",
    type: "reminder",
    title: "Daily Wellness Check",
    message: "Don't forget to log your daily symptoms and energy levels",
    time: "6 hours ago",
    read: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "followup",
    title: "Post-Vamana Care",
    message: "Follow light diet recommendations for next 24 hours",
    time: "1 day ago",
    read: true,
    priority: "medium"
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>(defaultNotifications);

  React.useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (newNotification: Omit<Notification, 'id'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString()
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    getUnreadCount
  };
};
