
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, HardDrive, Clock } from "lucide-react";

const SystemStatus: React.FC = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Cpu className="h-5 w-5 text-canonical-purple" />
          System Status
        </CardTitle>
        <CardDescription>Real-time system metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">CPU Usage</span>
            <span className="text-sm text-muted-foreground">42%</span>
          </div>
          <Progress value={42} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Memory Usage</span>
            <span className="text-sm text-muted-foreground">6.2GB / 16GB</span>
          </div>
          <Progress value={38} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Disk Usage</span>
            <span className="text-sm text-muted-foreground">242GB / 512GB</span>
          </div>
          <Progress value={47} className="h-2" />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-canonical-purple" />
          <span className="font-medium">Uptime:</span>
          <span className="text-muted-foreground">15 days, 7 hours, 23 minutes</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
