import { TrendingUp, Target, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProgressPhase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  progress: number;
  sessions: {
    completed: number;
    total: number;
  };
}

const therapyPhases: ProgressPhase[] = [
  {
    id: "preparation",
    name: "Preparation Phase",
    description: "Initial consultation & body preparation",
    status: "completed",
    progress: 100,
    sessions: { completed: 3, total: 3 }
  },
  {
    id: "main-therapy", 
    name: "Main Therapy Phase",
    description: "Active Panchakarma procedures",
    status: "current",
    progress: 68,
    sessions: { completed: 5, total: 8 }
  },
  {
    id: "recovery",
    name: "Recovery Phase", 
    description: "Post-therapy rehabilitation & lifestyle guidance",
    status: "upcoming",
    progress: 0,
    sessions: { completed: 0, total: 4 }
  }
];

const overallProgress = 68;
const nextMilestone = "Complete Basti therapy series";
const estimatedCompletion = "Sep 15, 2025";

export function TherapyProgress() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <span>Therapy Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Overall Completion</span>
            <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Started: Aug 1, 2025</span>
            <span>Est. Completion: {estimatedCompletion}</span>
          </div>
        </div>

        {/* Phase Breakdown */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Treatment Phases</h3>
          
          {therapyPhases.map((phase, index) => (
            <div key={phase.id} className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                  phase.status === 'completed' ? "bg-primary text-white" :
                  phase.status === 'current' ? "bg-primary/20 text-primary ring-2 ring-primary/20" :
                  "bg-muted text-muted-foreground"
                )}>
                  {phase.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : phase.status === 'current' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{phase.name}</h4>
                    <Badge 
                      variant={
                        phase.status === 'completed' ? 'default' :
                        phase.status === 'current' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {phase.status === 'completed' ? 'Complete' :
                       phase.status === 'current' ? 'In Progress' : 'Upcoming'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {phase.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Sessions: {phase.sessions.completed}/{phase.sessions.total}
                      </span>
                      <span className="font-medium text-foreground">
                        {phase.progress}%
                      </span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>
                </div>
              </div>
              
              {index < therapyPhases.length - 1 && (
                <div className="ml-4 w-px h-4 bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Next Milestone */}
        <div className="p-4 bg-accent/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Next Milestone</h4>
              <p className="text-sm text-muted-foreground">{nextMilestone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}