
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Cloud as CloudIcon, Plus, Power, RefreshCw, ExternalLink, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cloud: React.FC = () => {
  const { toast } = useToast();

  const handleStartServer = (name: string) => {
    toast({
      title: "Server Started",
      description: `${name} is now running`,
    });
  };

  const handleStopServer = (name: string) => {
    toast({
      title: "Server Stopped",
      description: `${name} has been stopped`,
    });
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-background p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Cloud Management</h1>
              <p className="text-muted-foreground">Manage your cloud instances and deployments</p>
            </div>

            <Tabs defaultValue="instances" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="instances">Instances</TabsTrigger>
                <TabsTrigger value="deployments">Deployments</TabsTrigger>
                <TabsTrigger value="storage">Storage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="instances" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Active Instances</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Instance
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Production Server", type: "t2.medium", status: "Running", region: "us-east-1", uptime: "4d 7h 32m" },
                    { name: "Development Server", type: "t2.micro", status: "Running", region: "us-west-2", uptime: "12h 15m" },
                    { name: "Staging Environment", type: "t2.small", status: "Stopped", region: "eu-west-1", uptime: "0m" },
                    { name: "Database Cluster", type: "m5.large", status: "Running", region: "us-east-1", uptime: "12d 3h 45m" },
                  ].map((server) => (
                    <Card key={server.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{server.name}</CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${server.status === "Running" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {server.status}
                          </span>
                        </div>
                        <CardDescription>{server.type} • {server.region}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Uptime:</span>
                          <span>{server.uptime}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {server.status === "Running" ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleStopServer(server.name)}
                          >
                            <Power className="h-4 w-4 mr-1" />
                            Stop
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleStartServer(server.name)}
                          >
                            <Power className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="deployments" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Deployments</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Deployment
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { app: "Frontend App", env: "Production", status: "Success", time: "Today at 14:25", commit: "a7d3fc2" },
                        { app: "API Server", env: "Staging", status: "Success", time: "Yesterday at 18:03", commit: "b1e4d23" },
                        { app: "Database Migration", env: "Production", status: "Failed", time: "3 days ago", commit: "c8f5a1b" },
                        { app: "Authentication Service", env: "Development", status: "Success", time: "4 days ago", commit: "d2e7c9f" },
                      ].map((deploy, index) => (
                        <div key={index} className="flex items-center justify-between p-4">
                          <div>
                            <div className="font-medium">{deploy.app}</div>
                            <div className="text-sm text-muted-foreground">{deploy.env} • {deploy.commit}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${deploy.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {deploy.status}
                            </span>
                            <div className="text-sm text-muted-foreground">{deploy.time}</div>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="storage" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Storage Buckets</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Bucket
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "User Uploads", region: "us-east-1", size: "1.24 TB", files: 12367 },
                    { name: "Application Logs", region: "us-west-2", size: "567 GB", files: 5432 },
                    { name: "Static Assets", region: "eu-west-1", size: "89 GB", files: 2134 },
                    { name: "Database Backups", region: "us-east-1", size: "4.1 TB", files: 45 },
                  ].map((bucket) => (
                    <Card key={bucket.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CloudIcon className="h-5 w-5" />
                          {bucket.name}
                        </CardTitle>
                        <CardDescription>{bucket.region}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="text-muted-foreground">Size</div>
                            <div className="font-medium">{bucket.size}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Files</div>
                            <div className="font-medium">{bucket.files.toLocaleString()}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Files
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Cloud;
