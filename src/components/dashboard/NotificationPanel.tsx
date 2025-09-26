import { Bell, AlertCircle, CheckCircle, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'reminder' | 'preparation' | 'followup' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const notifications: Notification[] = [
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
  const unreadCount = notifications.filter(n => !n.read).length;

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
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.slice(0, 3).map((notification) => {
              const IconComponent = typeIcons[notification.type];
              
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-soft cursor-pointer",
                    priorityColors[notification.priority],
                    !notification.read && "ring-1 ring-primary/20"
                  )}
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
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
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