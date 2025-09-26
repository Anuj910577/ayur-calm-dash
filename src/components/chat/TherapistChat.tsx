import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: 'patient' | 'therapist';
  content: string;
  timestamp: Date;
  read: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "therapist",
    content: "Hello Anuj! How are you feeling today? Ready for your Nasya session tomorrow?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: true
  },
  {
    id: "2", 
    sender: "patient",
    content: "Hi Dr. Priya! I'm feeling good. Should I avoid anything before the session?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    read: true
  },
  {
    id: "3",
    sender: "therapist", 
    content: "Great to hear! Please avoid heavy meals 2 hours before the session. Light, warm food is recommended. Also, try to get a good night's sleep.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    read: true
  },
  {
    id: "4",
    sender: "patient",
    content: "Perfect, thank you! I'll make sure to follow that.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: true
  },
  {
    id: "5",
    sender: "therapist",
    content: "You're welcome! Feel free to reach out if you have any questions or concerns. Looking forward to seeing you tomorrow at 15:18. 🌿",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    read: true
  }
];

export function TherapistChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "patient",
      content: newMessage,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    
    // Simulate therapist typing and response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. I'll make a note in your file.",
        "That's great progress! Keep up the good work with your wellness routine.",
        "I understand. Let's discuss this during your next session.",
        "Thanks for letting me know. I'll adjust your treatment plan accordingly.",
        "Perfect! Remember to stay hydrated and get plenty of rest."
      ];
      
      const therapistResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "therapist",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prev => [...prev, therapistResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-wellness">
      <CardHeader className="flex-shrink-0 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" alt="Dr. Priya Sharma" />
              <AvatarFallback className="bg-primary/10 text-primary">PS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Dr. Priya Sharma</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Panchakarma Specialist
                </Badge>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "patient" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3 text-sm",
                  message.sender === "patient"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                <p className="break-words">{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1 opacity-70",
                    message.sender === "patient" ? "text-right" : "text-left"
                  )}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg p-3 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                  </div>
                  <span className="text-muted-foreground">Dr. Priya is typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex-shrink-0 p-4 border-t border-border">
          <div className="flex items-end space-x-2">
            <Button variant="ghost" size="sm" className="mb-2">
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="min-h-[40px] resize-none"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="mb-2">
              <Smile className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="mb-2 bg-gradient-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}