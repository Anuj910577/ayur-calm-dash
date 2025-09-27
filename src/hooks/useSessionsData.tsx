import * as React from "react";

interface Session {
  id: string;
  therapy: string;
  date: string;
  time: string;
  duration: string;
  practitioner: string;
  type: 'nasya' | 'vamana' | 'basti' | 'abhyanga' | 'shirodhara';
}

const defaultSessions: Session[] = [
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

export const useSessionsData = () => {
  const [sessions, setSessions] = React.useState<Session[]>(defaultSessions);

  React.useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (newSession: Omit<Session, 'id'>) => {
    const session: Session = {
      ...newSession,
      id: Date.now().toString()
    };
    setSessions(prev => [...prev, session]);
  };

  const updateSession = (id: string, updatedSession: Partial<Session>) => {
    setSessions(prev => prev.map(session =>
      session.id === id ? { ...session, ...updatedSession } : session
    ));
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  return {
    sessions,
    addSession,
    updateSession,
    deleteSession
  };
};
