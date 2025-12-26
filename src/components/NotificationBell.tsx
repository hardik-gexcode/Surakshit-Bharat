import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, AlertTriangle, Shield, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { useNavigate } from 'react-router-dom';

export default function NotificationBell() {
  const { user } = useRoleAuth();
  const { getNotificationsForRole, getUnreadCount, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!user || (user.role !== 'police' && user.role !== 'company')) {
    return null;
  }

  const notifications = getNotificationsForRole(user.role);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'sos':
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      case 'risk':
        return <Shield className="w-5 h-5 text-warning" />;
      case 'incident':
        return <AlertCircle className="w-5 h-5 text-primary" />;
      default:
        return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-danger/10 border-danger';
      case 'high':
        return 'bg-warning/10 border-warning';
      case 'medium':
        return 'bg-primary/10 border-primary';
      default:
        return 'bg-muted border-border';
    }
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.workerId) {
      if (user.role === 'police') {
        navigate(`/police/person/${notification.workerId}`);
      } else {
        navigate(`/profile/${notification.workerId}`);
      }
      setOpen(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-danger text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'No new notifications'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${
                  getSeverityColor(notification.severity)
                } ${!notification.read ? 'font-semibold' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.read ? 'font-bold' : 'font-semibold'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    {notification.location && (
                      <p className="text-xs text-muted-foreground mt-1">
                        📍 {notification.location}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-danger rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
