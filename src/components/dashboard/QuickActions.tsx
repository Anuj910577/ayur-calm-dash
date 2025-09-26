import { Calendar, MessageSquare, FileText, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  action: () => void;
}

const quickActions: QuickAction[] = [
  {
    id: "reschedule",
    title: "Reschedule",
    subtitle: "Modify session",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10 hover:bg-primary/20",
    action: () => console.log("Reschedule clicked")
  },
  {
    id: "chat", 
    title: "Chat",
    subtitle: "Talk to therapist",
    icon: MessageSquare,
    color: "text-health-energy",
    bgColor: "bg-health-energy/10 hover:bg-health-energy/20", 
    action: () => console.log("Chat clicked")
  },
  {
    id: "log-health",
    title: "Log Health",
    subtitle: "Daily feedback",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10 hover:bg-primary/20",
    action: () => console.log("Log health clicked")
  },
  {
    id: "wellness",
    title: "Wellness",
    subtitle: "Tips & guidance", 
    icon: Leaf,
    color: "text-health-energy",
    bgColor: "bg-health-energy/10 hover:bg-health-energy/20",
    action: () => console.log("Wellness clicked")
  }
];

export function QuickActions() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            
            return (
              <Button
                key={action.id}
                variant="ghost"
                onClick={action.action}
                className={cn(
                  "h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200",
                  action.bgColor
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  action.bgColor.replace('/10', '/20').replace('/20', '/30')
                )}>
                  <IconComponent className={cn("w-6 h-6", action.color)} />
                </div>
                
                <div className="text-center">
                  <div className="font-medium text-foreground text-sm">
                    {action.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {action.subtitle}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}