import * as React from "react";
import { TrendingUp, Zap, Brain, Activity, Moon, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useHealthData } from "@/hooks/useHealthData";
import { useToast } from "@/hooks/use-toast";

const iconMap = {
  energy: Zap,
  stress: Brain,
  digestion: Activity,
  sleep: Moon
};

export function HealthTrends() {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'7' | '30'>('7');
  const [selectedMetric, setSelectedMetric] = React.useState<string>('energy');

  const { metrics, getChartDataForMetric } = useHealthData();

  const chartData = getChartDataForMetric(selectedMetric);

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
      <CardContent className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const IconComponent = iconMap[metric.id as keyof typeof iconMap];

            return (
              <div
                key={metric.id}
                className="p-4 rounded-lg border border-border hover:shadow-soft hover:border-primary/30 transition-all duration-200 cursor-pointer"
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
                </div>
              </div>
            );
          })}
        </div>

        {/* Line Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground capitalize">
              {selectedMetric} Trend
            </h3>
            <Badge className="bg-primary/10 text-primary">
              25.0% Improving
            </Badge>
          </div>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-4 bg-accent/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            📊 Your wellness metrics show steady improvement over the past week. 
            Energy levels are trending upward, while stress indicators are decreasing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
