
import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RefreshCw, Download, Clock, Check, AlertTriangle, 
  ShieldCheck, ArrowUpCircle, Server, Zap, Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Updates: React.FC = () => {
  const { toast } = useToast();
  const [installing, setInstalling] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateInstall = (name: string) => {
    setInstalling(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setInstalling(false);
          toast({
            title: "Update Completed",
            description: `${name} has been successfully installed`,
          });
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-background p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Updates</h1>
              <p className="text-muted-foreground">Manage system and security updates</p>
            </div>

            <div className="mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                    <div>
                      <CardTitle>System Status</CardTitle>
                      <CardDescription>Last checked: Today at 09:45 AM</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-md bg-accent">
                      <ArrowUpCircle className="h-6 w-6 mb-2 mx-auto text-amber-500" />
                      <div className="text-lg font-semibold">3</div>
                      <div className="text-sm text-muted-foreground">Updates Available</div>
                    </div>
                    <div className="p-4 rounded-md bg-accent">
                      <Server className="h-6 w-6 mb-2 mx-auto text-blue-500" />
                      <div className="text-lg font-semibold">47</div>
                      <div className="text-sm text-muted-foreground">Components</div>
                    </div>
                    <div className="p-4 rounded-md bg-accent">
                      <Shield className="h-6 w-6 mb-2 mx-auto text-green-500" />
                      <div className="text-lg font-semibold">14 days</div>
                      <div className="text-sm text-muted-foreground">Since Last Update</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="mr-2" onClick={() => {
                    toast({
                      title: "Checking for updates",
                      description: "Scanning for the latest software updates...",
                    });
                  }}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Check for Updates
                  </Button>
                  <Button variant="outline" onClick={() => {
                    simulateInstall("All system updates");
                  }} disabled={installing}>
                    <Download className="mr-2 h-4 w-4" />
                    Update All
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {installing && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Installing updates...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="available" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="available">Available Updates</TabsTrigger>
                <TabsTrigger value="history">Update History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { 
                          name: "Security Patch KB284756", 
                          type: "Security Update", 
                          severity: "Critical",
                          size: "45.8 MB",
                          releaseDate: "Yesterday"
                        },
                        { 
                          name: "System Core Services", 
                          type: "Feature Update", 
                          severity: "Recommended",
                          size: "112.4 MB",
                          releaseDate: "3 days ago"
                        },
                        { 
                          name: "Device Drivers Package", 
                          type: "Driver Update", 
                          severity: "Optional",
                          size: "78.2 MB",
                          releaseDate: "1 week ago"
                        },
                      ].map((update, index) => (
                        <div key={index} className="p-4 flex items-center justify-between">
                          <div>
                            <div className="font-medium">{update.name}</div>
                            <div className="text-sm text-muted-foreground">{update.type} • {update.size}</div>
                            <div className="text-xs text-muted-foreground">Released: {update.releaseDate}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              update.severity === "Critical" ? "bg-red-100 text-red-800" : 
                              update.severity === "Recommended" ? "bg-amber-100 text-amber-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {update.severity}
                            </span>
                            <Button size="sm" onClick={() => simulateInstall(update.name)} disabled={installing}>
                              Install
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { 
                          name: "Firmware Update v2.3.1", 
                          date: "2 weeks ago", 
                          status: "Successful",
                          details: "Updated system firmware to improve stability and performance"
                        },
                        { 
                          name: "Security Patch KB284601", 
                          date: "1 month ago", 
                          status: "Successful",
                          details: "Critical security update addressing vulnerabilities in network stack"
                        },
                        { 
                          name: "Feature Update v2.2.0", 
                          date: "2 months ago", 
                          status: "Successful",
                          details: "Added new dashboard features and improved resource monitoring"
                        },
                        { 
                          name: "Driver Update Package", 
                          date: "3 months ago", 
                          status: "Failed",
                          details: "Installation interrupted due to power failure"
                        },
                        { 
                          name: "System Core Update v2.1.5", 
                          date: "3 months ago", 
                          status: "Successful",
                          details: "Performance improvements and bug fixes"
                        },
                      ].map((update, index) => (
                        <div key={index} className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">{update.name}</div>
                            <div className="flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              {update.date}
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            {update.status === "Successful" ? (
                              <Check className="h-4 w-4 text-green-600 mr-1" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
                            )}
                            <span className={`text-xs ${
                              update.status === "Successful" ? "text-green-600" : "text-amber-600"
                            }`}>
                              {update.status}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {update.details}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Update Settings</CardTitle>
                    <CardDescription>Configure how system updates are handled</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Automatic Updates</div>
                        <div className="text-sm text-muted-foreground">Automatically download and install updates</div>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Security Updates Only</div>
                        <div className="text-sm text-muted-foreground">Only install critical security updates automatically</div>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Update Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive notifications about available updates</div>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Update Schedule</div>
                      <div className="text-sm text-muted-foreground">Schedule when updates will be installed</div>
                      <select className="w-full p-2 rounded-md border border-input bg-transparent">
                        <option>Daily (Recommended)</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Manual only</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => {
                      toast({
                        title: "Settings Saved",
                        description: "Your update preferences have been updated",
                      });
                    }}>
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Updates;
