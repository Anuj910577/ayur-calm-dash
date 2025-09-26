import { TrendingUp, Zap, Brain, Activity, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

// Sample data for charts
const energyData = [
  { date: 'Sep 18', energy: 4.2, stress: 6.5, digestion: 4.8, sleep: 5.2 },
  { date: 'Sep 19', energy: 5.8, stress: 5.9, digestion: 5.1, sleep: 5.8 },
  { date: 'Sep 20', energy: 3.2, stress: 7.2, digestion: 4.5, sleep: 4.9 },
  { date: 'Sep 21', energy: 2.8, stress: 7.8, digestion: 4.2, sleep: 4.5 },
  { date: 'Sep 22', energy: 7.5, stress: 4.2, digestion: 6.8, sleep: 7.2 },
  { date: 'Sep 23', energy: 8.2, stress: 3.8, digestion: 7.1, sleep: 7.8 },
  { date: 'Sep 24', energy: 6.0, stress: 5.0, digestion: 5.0, sleep: 5.0 }
];

export function HealthTrends() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7' | '30'>('7');
  const [selectedMetric, setSelectedMetric] = useState<string>('energy');

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Health Trends</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant={selectedPeriod === '7' ? "default" : "outline"} 
              size="sm" 
              className={selectedPeriod === '7' ? "bg-primary" : ""}
              onClick={() => setSelectedPeriod('7')}
            >
              7 Days
            </Button>
            <Button 
              variant={selectedPeriod === '30' ? "default" : "outline"} 
              size="sm"
              className={selectedPeriod === '30' ? "bg-primary" : ""}
              onClick={() => setSelectedPeriod('30')}
            >
              30 Days
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {healthMetrics.map((metric) => {
            const IconComponent = metric.icon;
            const percentage = (metric.value / metric.maxValue) * 100;
            const isSelected = selectedMetric === metric.id;
            
            return (
              <div
                key={metric.id}
                className={cn(
                  "p-4 rounded-lg bg-gradient-card border transition-all duration-200 cursor-pointer",
                  isSelected 
                    ? "border-primary ring-2 ring-primary/20 shadow-wellness" 
                    : "border-border hover:shadow-soft hover:border-primary/30"
                )}
                onClick={() => setSelectedMetric(metric.id)}
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

        {/* Interactive Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground capitalize">
              {selectedMetric} Trend
            </h3>
            <Badge className="bg-primary/10 text-primary">
              25.0% Improving
            </Badge>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground"
                />
                <YAxis 
                  domain={[0, 10]}
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-soft)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#colorGradient)"
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              energy_level: 10
            </p>
          </div>
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