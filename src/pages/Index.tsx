import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { UpcomingSessions } from "@/components/dashboard/UpcomingSessions";
import { HealthTrends } from "@/components/dashboard/HealthTrends";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TherapyProgress } from "@/components/dashboard/TherapyProgress";
import { WellnessTips } from "@/components/wellness/WellnessTips";
import { ProfileSummary } from "@/components/dashboard/ProfileSummary";
import * as React from "react";

type ViewType = 'dashboard' | 'sessions' | 'notifications' | 'progress' | 'profile';

const Index = () => {
  const [currentView, setCurrentView] = React.useState<ViewType>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'sessions':
        return <UpcomingSessions />;
      case 'notifications':
        return (
          <div className="space-y-6">
            <NotificationPanel />
            <div className="text-center py-8">
              <p className="text-muted-foreground">All notifications displayed above</p>
            </div>
          </div>
        );
      case 'progress':
        return <TherapyProgress />;
      case 'profile':
        return <ProfileSummary />;
      default:
        return (
          <div className="space-y-6">
            {/* Top Row - Upcoming Sessions and Right Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <UpcomingSessions />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <NotificationPanel />
                <QuickActions />
              </div>
            </div>

            {/* Full Width Health Trends */}
            <HealthTrends />

            {/* Additional Wellness Section to fill space */}
            <WellnessTips />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-wellness">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 z-50 bg-sidebar-background border-r border-sidebar-border">
        <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderCurrentView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
