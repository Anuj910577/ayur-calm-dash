import { Calendar, Clock, User, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  therapy: string;
  date: string;
  time: string;
  duration: string;
  practitioner: string;
  type: 'nasya' | 'vamana' | 'basti' | 'abhyanga' | 'shirodhara';
}

const upcomingSessions: Session[] = [
  {
    id: "1",
    therapy: "Nasya",
    date: "Sep 2, 2025",
    time: "15:18",
    duration: "60min",
    practitioner: "Dr. Priya Sharma",
    type: "nasya"
  },
  {
    id: "2", 
    therapy: "Vamana",
    date: "Sep 5, 2025",
    time: "15:27",
    duration: "60min", 
    practitioner: "Dr. Meera Patel",
    type: "vamana"
  },
  {
    id: "3",
    therapy: "Basti", 
    date: "Sep 7, 2025",
    time: "16:39",
    duration: "60min",
    practitioner: "Dr. Raj Kumar",
    type: "basti"
  }
];

const therapyColors = {
  nasya: "border-l-therapy-nasya bg-therapy-nasya/5",
  vamana: "border-l-therapy-vamana bg-therapy-vamana/5", 
  basti: "border-l-therapy-basti bg-therapy-basti/5",
  abhyanga: "border-l-therapy-abhyanga bg-therapy-abhyanga/5",
  shirodhara: "border-l-therapy-shirodhara bg-therapy-shirodhara/5"
};

export function UpcomingSessions() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Upcoming Sessions</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              View All
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-1" />
              Schedule
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-soft cursor-pointer",
              therapyColors[session.type]
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground">{session.therapy}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {session.duration}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{session.practitioner}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Reschedule
              </Button>
            </div>
          </div>
        ))}
        
        {upcomingSessions.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No upcoming sessions scheduled</p>
            <Button className="mt-3 bg-gradient-primary">
              <Plus className="w-4 h-4 mr-1" />
              Schedule Your First Session
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}