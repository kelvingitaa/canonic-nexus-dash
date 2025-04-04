
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import SystemStatus from "@/components/dashboard/SystemStatus";
import CloudInstances from "@/components/dashboard/CloudInstances";
import UpdateManager from "@/components/dashboard/UpdateManager";
import AIAssistantPanel from "@/components/ai/AIAssistantPanel";
import { RefreshCw, Cloud, Laptop, Settings } from "lucide-react";

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-background p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to Canonical Nexus Dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SystemStatus />
              <CloudInstances />
              <UpdateManager />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="dashboard-card p-6">
                <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 bg-accent hover:bg-accent/80 rounded-md transition-colors flex flex-col items-center justify-center gap-2">
                    <RefreshCw className="h-6 w-6 text-canonical-purple" />
                    <span className="text-sm">Run Updates</span>
                  </button>
                  <button className="p-4 bg-accent hover:bg-accent/80 rounded-md transition-colors flex flex-col items-center justify-center gap-2">
                    <Cloud className="h-6 w-6 text-canonical-purple" />
                    <span className="text-sm">Deploy Server</span>
                  </button>
                  <button className="p-4 bg-accent hover:bg-accent/80 rounded-md transition-colors flex flex-col items-center justify-center gap-2">
                    <Laptop className="h-6 w-6 text-canonical-purple" />
                    <span className="text-sm">Add Device</span>
                  </button>
                  <button className="p-4 bg-accent hover:bg-accent/80 rounded-md transition-colors flex flex-col items-center justify-center gap-2">
                    <Settings className="h-6 w-6 text-canonical-purple" />
                    <span className="text-sm">System Config</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <AIAssistantPanel />
      </div>
    </ThemeProvider>
  );
};

export default Index;
