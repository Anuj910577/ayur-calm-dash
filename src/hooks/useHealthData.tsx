import * as React from "react";

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

interface DailyData {
  date: string;
  energy: number;
  stress: number;
  digestion: number;
  sleep: number;
}

const defaultMetrics: HealthMetric[] = [
  {
    id: "energy",
    name: "Energy",
    value: 6.0,
    maxValue: 10,
    icon: () => null, // Will be imported in component
    color: "text-health-energy",
    trend: "up",
    change: "+0.5"
  },
  {
    id: "stress",
    name: "Stress",
    value: 5.0,
    maxValue: 10,
    icon: () => null,
    color: "text-health-stress", 
    trend: "down",
    change: "-0.3"
  },
  {
    id: "digestion",
    name: "Digestion", 
    value: 5.0,
    maxValue: 10,
    icon: () => null,
    color: "text-health-digestion",
    trend: "stable",
    change: "0.0"
  },
  {
    id: "sleep",
    name: "Sleep",
    value: 5.0, 
    maxValue: 10,
    icon: () => null,
    color: "text-health-sleep",
    trend: "up",
    change: "+0.2"
  }
];

const defaultHistory: DailyData[] = [
  { date: 'Sep 18', energy: 4.2, stress: 6.5, digestion: 4.8, sleep: 5.2 },
  { date: 'Sep 19', energy: 5.8, stress: 5.9, digestion: 5.1, sleep: 5.8 },
  { date: 'Sep 20', energy: 3.2, stress: 7.2, digestion: 4.5, sleep: 4.9 },
  { date: 'Sep 21', energy: 2.8, stress: 7.8, digestion: 4.2, sleep: 4.5 },
  { date: 'Sep 22', energy: 7.5, stress: 4.2, digestion: 6.8, sleep: 7.2 },
  { date: 'Sep 23', energy: 8.2, stress: 3.8, digestion: 7.1, sleep: 7.8 },
  { date: 'Sep 24', energy: 6.0, stress: 5.0, digestion: 5.0, sleep: 5.0 }
];

export const useHealthData = () => {
  const [metrics, setMetrics] = React.useState<HealthMetric[]>(defaultMetrics);
  const [history, setHistory] = React.useState<DailyData[]>(defaultHistory);

  React.useEffect(() => {
    const savedMetrics = localStorage.getItem('healthMetrics');
    const savedHistory = localStorage.getItem('healthHistory');

    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('healthMetrics', JSON.stringify(metrics));
    localStorage.setItem('healthHistory', JSON.stringify(history));
  }, [metrics, history]);

  const updateHealth = (metricId: string, newValue: number) => {
    setMetrics(prevMetrics => {
      const updated = prevMetrics.map(metric => {
        if (metric.id === metricId) {
          const oldValue = metric.value;
          const change = newValue - oldValue;
          let trend: "up" | "down" | "stable" = "stable";
          let changeStr = "0.0";
          
          if (change > 0.1) {
            trend = "up";
            changeStr = `+${change.toFixed(1)}`;
          } else if (change < -0.1) {
            trend = "down";
            changeStr = `${change.toFixed(1)}`;
          }
          
          return { ...metric, value: newValue, trend, change: changeStr };
        }
        return metric;
      });

      // Update history: shift old data and add new point
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const newDataPoint: DailyData = {
        date: today,
        energy: updated.find(m => m.id === 'energy')?.value || 5,
        stress: updated.find(m => m.id === 'stress')?.value || 5,
        digestion: updated.find(m => m.id === 'digestion')?.value || 5,
        sleep: updated.find(m => m.id === 'sleep')?.value || 5,
      };

      let newHistory = [...history.slice(1), newDataPoint]; // Shift and add new
      if (newHistory.length > 7) {
        newHistory = newHistory.slice(-7);
      }

      setHistory(newHistory);
      return updated;
    });
  };

  const getChartDataForMetric = (metricId: string) => {
    return history.map(day => ({
      date: day.date,
      [metricId]: day[metricId as keyof DailyData] as number
    }));
  };

  return {
    metrics,
    history,
    updateHealth,
    getChartDataForMetric
  };
};
