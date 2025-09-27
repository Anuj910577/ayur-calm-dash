import { Bell, AlertCircle, CheckCircle, Clock, Calendar, Check, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";

const typeIcons = {
  reminder: Clock,
  preparation: AlertCircle,
  followup: CheckCircle,
  general: Bell
};

const priorityColors = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-primary bg-primary/5", 
  low: "border-l-muted-foreground bg-muted/5"
};

export function NotificationPanel() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount } = useNotifications();
  const unreadCount = getUnreadCount();

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-primary">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-1" />
                Mark All Read
              </Button>
            )}
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.slice(0, 3).map((notification) => {
              const IconComponent = typeIcons[notification.type as keyof typeof typeIcons];

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-soft cursor-pointer",
                    priorityColors[notification.priority],
                    !notification.read && "ring-1 ring-primary/20"
                  )}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className="w-5 h-5 mt-0.5 text-muted-foreground" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={cn(
                          "font-medium text-sm",
                          !notification.read ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        <Badge
                          variant={notification.priority === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">You're all caught up!</p>
            <p className="text-sm text-muted-foreground">No new notifications.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
