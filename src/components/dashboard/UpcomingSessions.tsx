import * as React from "react";
import { Calendar, Clock, User, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSessionsData } from "@/hooks/useSessionsData";
import { useNotifications } from "@/hooks/useNotifications";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  therapy: string;
  date: string;
  time: string;
  duration: string;
  practitioner: string;
  type: 'nasya' | 'vamana' | 'basti' | 'abhyanga' | 'shirodhara';
}



const therapyColors = {
  nasya: "border-l-therapy-nasya bg-therapy-nasya/5",
  vamana: "border-l-therapy-vamana bg-therapy-vamana/5", 
  basti: "border-l-therapy-basti bg-therapy-basti/5",
  abhyanga: "border-l-therapy-abhyanga bg-therapy-abhyanga/5",
  shirodhara: "border-l-therapy-shirodhara bg-therapy-shirodhara/5"
};

export function UpcomingSessions() {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = React.useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = React.useState(false);
  const [selectedSessionId, setSelectedSessionId] = React.useState<string | null>(null);
  const [newSession, setNewSession] = React.useState({
    therapy: '',
    date: '',
    time: '',
    duration: '60min',
    practitioner: '',
    type: 'nasya' as 'nasya' | 'vamana' | 'basti' | 'abhyanga' | 'shirodhara'
  });

  const { sessions, addSession, updateSession, deleteSession } = useSessionsData();
  const { toast } = useToast();

  const { addNotification } = useNotifications();

  const handleScheduleSession = () => {
    if (!newSession.therapy || !newSession.date || !newSession.time || !newSession.practitioner) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    addSession(newSession);

    addNotification({
      type: 'reminder',
      title: `Session Scheduled: ${newSession.therapy}`,
      message: `Your ${newSession.therapy} session with ${newSession.practitioner} is scheduled for ${newSession.date} at ${newSession.time}`,
      time: 'Just now',
      read: false,
      priority: 'medium'
    });

    setIsScheduleDialogOpen(false);
    setNewSession({
      therapy: '',
      date: '',
      time: '',
      duration: '60min',
      practitioner: '',
      type: 'nasya'
    });

    toast({
      title: "Session scheduled",
      description: "Your new session has been added to your schedule.",
    });
  };

  const handleRescheduleSession = () => {
    if (!selectedSessionId || !newSession.date || !newSession.time) {
      toast({
        title: "Missing information",
        description: "Please fill in date and time.",
        variant: "destructive"
      });
      return;
    }

    updateSession(selectedSessionId, {
      date: newSession.date,
      time: newSession.time
    });

    setIsRescheduleDialogOpen(false);
    setSelectedSessionId(null);
    setNewSession({
      therapy: '',
      date: '',
      time: '',
      duration: '60min',
      practitioner: '',
      type: 'nasya'
    });

    toast({
      title: "Session rescheduled",
      description: "Your session has been updated.",
    });
  };

  const handleDeleteSession = (sessionId: string, sessionTitle: string) => {
    deleteSession(sessionId);

    addNotification({
      type: 'general',
      title: `Session Cancelled: ${sessionTitle}`,
      message: `Your ${sessionTitle} session has been cancelled.`,
      time: 'Just now',
      read: false,
      priority: 'low'
    });

    toast({
      title: "Session cancelled",
      description: "Your session has been removed from your schedule.",
    });
  };

  const openRescheduleDialog = (session: Session) => {
    setSelectedSessionId(session.id);
    setNewSession({
      therapy: session.therapy,
      date: session.date,
      time: session.time,
      duration: session.duration,
      practitioner: session.practitioner,
      type: session.type
    });
    setIsRescheduleDialogOpen(true);
  };

  const openScheduleDialog = () => {
    setNewSession({
      therapy: '',
      date: '',
      time: '',
      duration: '60min',
      practitioner: '',
      type: 'nasya'
    });
    setIsScheduleDialogOpen(true);
  };

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
            <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-primary" onClick={openScheduleDialog}>
                  <Plus className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Session</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="therapy" className="text-right">
                      Therapy
                    </Label>
                    <Select value={newSession.type} onValueChange={(value: any) => setNewSession(prev => ({ ...prev, type: value, therapy: value.charAt(0).toUpperCase() + value.slice(1) }))}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select therapy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nasya">Nasya</SelectItem>
                        <SelectItem value="vamana">Vamana</SelectItem>
                        <SelectItem value="basti">Basti</SelectItem>
                        <SelectItem value="abhyanga">Abhyanga</SelectItem>
                        <SelectItem value="shirodhara">Shirodhara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession(prev => ({ ...prev, time: e.target.value }))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="practitioner" className="text-right">
                      Practitioner
                    </Label>
                    <Select value={newSession.practitioner} onValueChange={(value) => setNewSession(prev => ({ ...prev, practitioner: value }))}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select practitioner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Priya Sharma">Dr. Priya Sharma</SelectItem>
                        <SelectItem value="Dr. Meera Patel">Dr. Meera Patel</SelectItem>
                        <SelectItem value="Dr. Raj Kumar">Dr. Raj Kumar</SelectItem>
                        <SelectItem value="Dr. Amit Singh">Dr. Amit Singh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleScheduleSession}>
                    Schedule Session
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sessions.map((session) => (
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

              <div className="flex items-center space-x-2">
                <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => openRescheduleDialog(session)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Reschedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Reschedule Session</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reschedule-date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="reschedule-date"
                          type="date"
                          value={newSession.date}
                          onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reschedule-time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="reschedule-time"
                          type="time"
                          value={newSession.time}
                          onChange={(e) => setNewSession(prev => ({ ...prev, time: e.target.value }))}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleRescheduleSession}>
                        Reschedule
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteSession(session.id, session.therapy)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {sessions.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No upcoming sessions scheduled</p>
            <Button className="mt-3 bg-gradient-primary" onClick={openScheduleDialog}>
              <Plus className="w-4 h-4 mr-1" />
              Schedule Your First Session
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
