import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, Brain, Activity, Moon, Send } from "lucide-react";
import { useHealthData } from "@/hooks/useHealthData";
import { useNotifications } from "@/hooks/useNotifications";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";

const Feedback = () => {
  const [feedback, setFeedback] = React.useState({
    energy: 5,
    stress: 5,
    digestion: 5,
    sleep: 5,
    notes: ''
  });

  const { updateHealth } = useHealthData();
  const { addNotification } = useNotifications();
  const { toast } = useToast();

  const handleSubmit = () => {
    // Update health metrics
    updateHealth('energy', feedback.energy);
    updateHealth('stress', feedback.stress);
    updateHealth('digestion', feedback.digestion);
    updateHealth('sleep', feedback.sleep);

    // Add notification for logging
    addNotification({
      type: 'general',
      title: 'Health Feedback Logged',
      message: 'Your daily health feedback has been recorded and your trends updated.',
      time: 'Just now',
      read: false,
      priority: 'low'
    });

    // Reset form
    setFeedback({
      energy: 5,
      stress: 5,
      digestion: 5,
      sleep: 5,
      notes: ''
    });

    toast({
      title: "Feedback submitted",
      description: "Your health feedback has been logged successfully.",
    });
  };

  const metrics = [
    { id: 'energy', name: 'Energy Level', icon: Zap, color: 'text-health-energy' },
    { id: 'stress', name: 'Stress Level', icon: Brain, color: 'text-health-stress' },
    { id: 'digestion', name: 'Digestion', icon: Activity, color: 'text-health-digestion' },
    { id: 'sleep', name: 'Sleep Quality', icon: Moon, color: 'text-health-sleep' }
  ];

  return (
    <div className="min-h-screen bg-gradient-wellness">
      <div className="flex w-full">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Daily Health Feedback</h1>
                <p className="text-muted-foreground">
                  Track your wellness journey by logging your daily health metrics and notes.
                </p>
              </div>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {metrics.map((metric) => {
                    const IconComponent = metric.icon;
                    const value = feedback[metric.id as keyof typeof feedback] as number;

                    return (
                      <div key={metric.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <IconComponent className={`w-5 h-5 ${metric.color}`} />
                            <Label className="font-medium">{metric.name}</Label>
                          </div>
                          <Badge variant="outline">{value}/10</Badge>
                        </div>
                        <Slider
                          value={[value]}
                          onValueChange={(newValue) => setFeedback(prev => ({
                            ...prev,
                            [metric.id]: newValue[0]
                          }))}
                          max={10}
                          min={0}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Poor</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Share any additional symptoms, observations, or notes about your health today..."
                    value={feedback.notes}
                    onChange={(e) => setFeedback(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button onClick={handleSubmit} className="bg-gradient-primary px-8">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
