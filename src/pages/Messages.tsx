import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { TherapistChat } from "@/components/chat/TherapistChat";

const Messages = () => {
  return (
    <div className="min-h-screen bg-gradient-wellness">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Messages
                </h1>
                <p className="text-muted-foreground">
                  Connect with your healthcare team
                </p>
              </div>
              
              <TherapistChat />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages;