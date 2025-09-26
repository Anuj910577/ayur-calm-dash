import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { UpcomingSessions } from "@/components/dashboard/UpcomingSessions";
import { HealthTrends } from "@/components/dashboard/HealthTrends";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TherapyProgress } from "@/components/dashboard/TherapyProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-wellness">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Top Row - Upcoming Sessions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <UpcomingSessions />
                </div>
                <div className="space-y-6">
                  <NotificationPanel />
                  <QuickActions />
                </div>
              </div>
              
              {/* Middle Row - Health Trends */}
              <HealthTrends />
              
              {/* Bottom Row - Progress Tracking */}
              <TherapyProgress />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
