import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Bell, 
  MessageSquare, 
  TrendingUp, 
  MessageCircle, 
  Leaf, 
  User,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Sessions", url: "/sessions", icon: Calendar },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Progress", url: "/progress", icon: TrendingUp },
  { title: "Feedback", url: "/feedback", icon: MessageCircle },
  { title: "Wellness", url: "/wellness", icon: Leaf },
  { title: "Profile", url: "/profile", icon: User },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-gradient-wellness border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">AyurWell</h1>
                <p className="text-xs text-muted-foreground">Patient Portal</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-2"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {!collapsed && (
          <div className="mb-4 px-2">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h2>
          </div>
        )}
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive: linkActive }) =>
                  cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent/50 hover:text-accent-foreground",
                    linkActive || isActive(item.url)
                      ? "bg-primary/10 text-primary border-r-2 border-primary"
                      : "text-muted-foreground"
                  )
                }
              >
                <item.icon className={cn("w-5 h-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Patient Info */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Patient</h3>
              <p className="text-sm text-muted-foreground">Wellness Journey</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}