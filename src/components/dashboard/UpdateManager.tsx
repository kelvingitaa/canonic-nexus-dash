
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UpdateLogProps {
  package: string;
  version: string;
  time: string;
  status: "success" | "pending" | "error";
}

const updateLogs: UpdateLogProps[] = [
  {
    package: "kernel-5.15.0-76",
    version: "5.15.0-76.83",
    time: "10:23 AM",
    status: "success",
  },
  {
    package: "openssl",
    version: "3.0.2-0ubuntu1.10",
    time: "10:22 AM",
    status: "success",
  },
  {
    package: "snapd",
    version: "2.58+22.04",
    time: "10:22 AM",
    status: "success",
  },
  {
    package: "docker-ce",
    version: "24.0.2-1",
    time: "10:20 AM",
    status: "pending",
  },
  {
    package: "cuda-toolkit",
    version: "11.7.0-1",
    time: "10:19 AM",
    status: "error",
  },
];

const UpdateManager: React.FC = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-canonical-purple" />
          Update Manager
        </CardTitle>
        <CardDescription>System updates progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">78%</span>
          </div>
          <Progress value={78} className="h-2" />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium mb-2">Recent Updates</h4>
          <ScrollArea className="h-[180px] pr-4">
            <div className="space-y-3">
              {updateLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-md hover:bg-accent transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{log.package}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>Version: {log.version}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{log.time}</span>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        log.status === "success"
                          ? "bg-green-500"
                          : log.status === "pending"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateManager;
