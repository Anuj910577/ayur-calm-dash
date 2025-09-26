import { TrendingUp, Zap, Brain, Activity, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  maxValue: number;
  icon: React.ElementType;
  color: string;
  trend: "up" | "down" | "stable";
  change: string;
}

const healthMetrics: HealthMetric[] = [
  {
    id: "energy",
    name: "Energy",
    value: 6.0,
    maxValue: 10,
    icon: Zap,
    color: "text-health-energy",
    trend: "up",
    change: "+0.5"
  },
  {
    id: "stress",
    name: "Stress",
    value: 5.0,
    maxValue: 10,
    icon: Brain,
    color: "text-health-stress", 
    trend: "down",
    change: "-0.3"
  },
  {
    id: "digestion",
    name: "Digestion", 
    value: 5.0,
    maxValue: 10,
    icon: Activity,
    color: "text-health-digestion",
    trend: "stable",
    change: "0.0"
  },
  {
    id: "sleep",
    name: "Sleep",
    value: 5.0, 
    maxValue: 10,
    icon: Moon,
    color: "text-health-sleep",
    trend: "up",
    change: "+0.2"
  }
];

export function HealthTrends() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Health Trends</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="default" size="sm" className="bg-primary">
              7 Days
            </Button>
            <Button variant="outline" size="sm">
              30 Days
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric) => {
            const IconComponent = metric.icon;
            const percentage = (metric.value / metric.maxValue) * 100;
            
            return (
              <div
                key={metric.id}
                className="p-4 rounded-lg bg-gradient-card border border-border hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className={cn("w-5 h-5", metric.color)} />
                  <Badge 
                    variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {metric.name}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {metric.value.toFixed(1)}
                    </span>
                  </div>
                  
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-end">
                    <Badge variant="outline" className="text-xs">
                      {percentage.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-accent/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            📊 Your wellness metrics show steady improvement over the past week. 
            Energy levels are trending upward, while stress indicators are decreasing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}