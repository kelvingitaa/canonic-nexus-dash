
import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laptop, Signal, Battery, WifiOff, RefreshCw, Settings, Plus, AlertTriangle, Activity, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const IoTDevices: React.FC = () => {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Devices Refreshed",
        description: "All devices information has been updated",
      });
    }, 1500);
  };

  const temperatureData = [
    { time: '00:00', temp: 21.2 },
    { time: '03:00', temp: 20.8 },
    { time: '06:00', temp: 20.5 },
    { time: '09:00', temp: 22.1 },
    { time: '12:00', temp: 23.4 },
    { time: '15:00', temp: 23.8 },
    { time: '18:00', temp: 22.5 },
    { time: '21:00', temp: 21.9 },
  ];

  const usageData = [
    { name: 'Mon', energy: 42 },
    { name: 'Tue', energy: 38 },
    { name: 'Wed', energy: 45 },
    { name: 'Thu', energy: 39 },
    { name: 'Fri', energy: 50 },
    { name: 'Sat', energy: 36 },
    { name: 'Sun', energy: 28 },
  ];

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-background p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">IoT Devices</h1>
                <p className="text-muted-foreground">Monitor and manage your connected devices</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Device
                </Button>
              </div>
            </div>

            <Tabs defaultValue="devices" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="automation">Automation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="devices" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      name: "Living Room Thermostat", 
                      type: "Temperature Sensor", 
                      status: "Online", 
                      battery: 72, 
                      signal: 85,
                      lastData: "21.5°C • 43% humidity",
                      lastUpdate: "2 minutes ago"
                    },
                    { 
                      name: "Front Door Camera", 
                      type: "Security Camera", 
                      status: "Online", 
                      battery: 100, 
                      signal: 92,
                      lastData: "No motion detected",
                      lastUpdate: "45 seconds ago"
                    },
                    { 
                      name: "Kitchen Smart Plug", 
                      type: "Power Sensor", 
                      status: "Online", 
                      battery: null, 
                      signal: 78,
                      lastData: "3.2 kWh today",
                      lastUpdate: "5 minutes ago"
                    },
                    { 
                      name: "Garage Door Sensor", 
                      type: "Contact Sensor", 
                      status: "Offline", 
                      battery: 15, 
                      signal: 0,
                      lastData: "Closed",
                      lastUpdate: "2 days ago"
                    },
                    { 
                      name: "Bedroom Air Quality", 
                      type: "Air Quality Monitor", 
                      status: "Online", 
                      battery: 54, 
                      signal: 62,
                      lastData: "Good • 87 AQI",
                      lastUpdate: "10 minutes ago"
                    },
                    { 
                      name: "Backyard Motion Sensor", 
                      type: "Motion Sensor", 
                      status: "Warning", 
                      battery: 27, 
                      signal: 45,
                      lastData: "Motion detected at 18:32",
                      lastUpdate: "30 minutes ago"
                    },
                  ].map((device) => (
                    <Card key={device.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            device.status === "Online" ? "bg-green-100 text-green-800" : 
                            device.status === "Warning" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {device.status}
                          </span>
                        </div>
                        <CardDescription>{device.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">{device.lastData}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            {device.status === "Online" ? (
                              <Signal className="h-3 w-3 mr-1" />
                            ) : (
                              <WifiOff className="h-3 w-3 mr-1" />
                            )}
                            {device.signal}%
                          </div>
                          {device.battery !== null && (
                            <div className="flex items-center">
                              <Battery className="h-3 w-3 mr-1" />
                              {device.battery}%
                            </div>
                          )}
                          <div>{device.lastUpdate}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Connected to device",
                            description: `Now managing ${device.name}`,
                          });
                        }}>
                          Manage
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Temperature Trends (Last 24h)</CardTitle>
                      <CardDescription>Living Room Thermostat</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={temperatureData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[20, 25]} />
                            <Tooltip />
                            <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Energy Consumption (Weekly)</CardTitle>
                      <CardDescription>All Smart Plugs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={usageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="energy" fill="#82ca9d" name="Energy (kWh)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Device Status Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center p-4 bg-green-50 rounded-lg">
                          <div className="rounded-full bg-green-100 p-3 mr-4">
                            <Signal className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">4</div>
                            <div className="text-green-700">Online Devices</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                          <div className="rounded-full bg-yellow-100 p-3 mr-4">
                            <AlertTriangle className="h-6 w-6 text-yellow-700" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">1</div>
                            <div className="text-yellow-700">Warning</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-4 bg-red-50 rounded-lg">
                          <div className="rounded-full bg-red-100 p-3 mr-4">
                            <WifiOff className="h-6 w-6 text-red-700" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">1</div>
                            <div className="text-red-700">Offline Devices</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="automation" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Active Automations</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Automation
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { 
                          name: "Morning Routine", 
                          trigger: "Time: 7:00 AM", 
                          actions: ["Turn on Kitchen lights", "Adjust Thermostat to 22°C"],
                          status: "Active",
                          lastRun: "Today at 7:00 AM"
                        },
                        { 
                          name: "Away Mode", 
                          trigger: "Geofence: All users leave home", 
                          actions: ["Turn off all lights", "Set Thermostat to eco mode", "Arm security system"],
                          status: "Active",
                          lastRun: "Yesterday at 8:45 AM"
                        },
                        { 
                          name: "Night Mode", 
                          trigger: "Time: 11:00 PM", 
                          actions: ["Dim Living Room lights to 30%", "Lock all doors", "Adjust Thermostat to 19°C"],
                          status: "Active",
                          lastRun: "Yesterday at 11:00 PM"
                        },
                        { 
                          name: "Motion Alert", 
                          trigger: "Backyard Motion Sensor: Motion detected", 
                          actions: ["Turn on Backyard lights", "Send notification", "Record camera footage"],
                          status: "Paused",
                          lastRun: "3 days ago"
                        },
                      ].map((automation, index) => (
                        <div key={index} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{automation.name}</h3>
                            <div className="flex items-center">
                              <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                                automation.status === "Active" ? "bg-green-100 text-green-800" : 
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {automation.status}
                              </span>
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground mb-1">Trigger</div>
                              <div>{automation.trigger}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground mb-1">Actions</div>
                              <ul className="space-y-1">
                                {automation.actions.map((action, i) => (
                                  <li key={i} className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Last run: {automation.lastRun}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default IoTDevices;
