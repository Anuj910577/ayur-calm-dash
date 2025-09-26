import { Bell, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const currentTime = new Date();
  const greeting = currentTime.getHours() < 12 ? "Good Morning" : 
                  currentTime.getHours() < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {greeting}, Anuj
          </h1>
          <p className="text-muted-foreground">
            Welcome to your personalized Panchakarma wellness journey
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Quick Stats */}
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-sm font-medium text-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Next Session</span>
              </div>
              <p className="text-xs text-muted-foreground">Sep 2, 15:18</p>
            </div>
            
            <div className="w-px h-8 bg-border" />
            
            <div className="text-center">
              <div className="flex items-center space-x-1 text-sm font-medium text-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Progress</span>
              </div>
              <p className="text-xs text-muted-foreground">68% Complete</p>
            </div>
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-primary">
              2
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}