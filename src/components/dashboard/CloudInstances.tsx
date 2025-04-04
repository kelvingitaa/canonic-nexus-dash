
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Server, Check, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CloudInstanceProps {
  name: string;
  type: string;
  status: "running" | "warning" | "stopped";
  region: string;
  ip: string;
}

const instances: CloudInstanceProps[] = [
  {
    name: "web-server-01",
    type: "t3.medium",
    status: "running",
    region: "us-east-1",
    ip: "10.0.1.123",
  },
  {
    name: "app-server-02",
    type: "c5.xlarge",
    status: "running",
    region: "eu-west-1",
    ip: "10.0.2.54",
  },
  {
    name: "db-server-primary",
    type: "r5.large",
    status: "warning",
    region: "us-west-2",
    ip: "10.0.3.210",
  },
  {
    name: "worker-01",
    type: "t3.small",
    status: "running",
    region: "ap-southeast-1",
    ip: "10.0.1.85",
  },
  {
    name: "analytics-01",
    type: "m5.large",
    status: "stopped",
    region: "eu-central-1",
    ip: "10.0.4.16",
  },
];

const statusIcons = {
  running: <Check className="h-4 w-4 text-green-500" />,
  warning: <AlertCircle className="h-4 w-4 text-amber-500" />,
  stopped: <AlertCircle className="h-4 w-4 text-red-500" />,
};

const CloudInstances: React.FC = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Cloud className="h-5 w-5 text-canonical-purple" />
          Cloud Instances
        </CardTitle>
        <CardDescription>Active cloud servers</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[260px] pr-4">
          <div className="space-y-3">
            {instances.map((instance) => (
              <div key={instance.name} className="flex items-center gap-3 p-2 border rounded-md hover:bg-accent transition-colors">
                <div className="flex-shrink-0">
                  <Server className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{instance.name}</p>
                    <Badge variant={instance.status === "running" ? "default" : instance.status === "warning" ? "outline" : "destructive"} className="h-5 px-1 text-xs">
                      {instance.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span>{instance.type}</span>
                    <span>{instance.region}</span>
                    <span>{instance.ip}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {statusIcons[instance.status]}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CloudInstances;
