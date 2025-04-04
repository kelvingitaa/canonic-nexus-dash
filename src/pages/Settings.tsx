
import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, Mail, Shield, Bell, Globe, Moon, Sun, 
  Languages, Key, Smartphone, LogOut, Save, AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = (section: string) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings Saved",
        description: `Your ${section.toLowerCase()} settings have been updated`,
      });
    }, 1000);
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-background p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and application preferences</p>
            </div>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your account details and public profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-xl font-medium">
                        JD
                      </div>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="Senior Systems Administrator" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Canonical Systems Inc." />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleSave("Profile")} disabled={saving}>
                      {saving ? (
                        <>
                          <span className="animate-spin mr-2">◌</span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Language & Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select 
                        id="language" 
                        className="w-full p-2 rounded-md border border-input bg-transparent"
                      >
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <select 
                        id="timezone" 
                        className="w-full p-2 rounded-md border border-input bg-transparent"
                      >
                        <option>UTC-08:00 Pacific Time</option>
                        <option>UTC-05:00 Eastern Time</option>
                        <option>UTC+00:00 Greenwich Mean Time</option>
                        <option>UTC+01:00 Central European Time</option>
                        <option>UTC+09:00 Japan Standard Time</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <select 
                        id="dateFormat" 
                        className="w-full p-2 rounded-md border border-input bg-transparent"
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleSave("Language")} variant="outline">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5" />
                      Theme & Display
                    </CardTitle>
                    <CardDescription>
                      Customize how the application looks and behaves
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Application Theme</Label>
                          <p className="text-sm text-muted-foreground">
                            Select a theme for the dashboard interface
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border border-primary rounded-lg p-2 cursor-pointer bg-background">
                          <div className="space-y-2">
                            <div className="h-2 w-8 bg-primary rounded"></div>
                            <div className="h-2 w-12 bg-secondary rounded"></div>
                          </div>
                          <div className="mt-2 text-center text-xs font-medium">Light</div>
                        </div>
                        
                        <div className="border rounded-lg p-2 cursor-pointer bg-zinc-950">
                          <div className="space-y-2">
                            <div className="h-2 w-8 bg-white rounded"></div>
                            <div className="h-2 w-12 bg-zinc-800 rounded"></div>
                          </div>
                          <div className="mt-2 text-center text-xs font-medium text-white">Dark</div>
                        </div>
                        
                        <div className="border rounded-lg p-2 cursor-pointer bg-gradient-to-r from-background to-zinc-950">
                          <div className="space-y-2">
                            <div className="h-2 w-8 bg-primary rounded"></div>
                            <div className="h-2 w-12 bg-secondary rounded"></div>
                          </div>
                          <div className="mt-2 text-center text-xs font-medium">System</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <Label>Interface Density</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3 cursor-pointer">
                          <div className="space-y-3">
                            <div className="h-3 w-20 bg-secondary rounded"></div>
                            <div className="h-3 w-16 bg-secondary rounded"></div>
                            <div className="h-3 w-24 bg-secondary rounded"></div>
                          </div>
                          <div className="mt-3 text-center text-xs font-medium">Compact</div>
                        </div>
                        
                        <div className="border border-primary rounded-lg p-4 cursor-pointer">
                          <div className="space-y-4">
                            <div className="h-3 w-20 bg-secondary rounded"></div>
                            <div className="h-3 w-16 bg-secondary rounded"></div>
                            <div className="h-3 w-24 bg-secondary rounded"></div>
                          </div>
                          <div className="mt-4 text-center text-xs font-medium">Default</div>
                        </div>
                        
                        <div className="border rounded-lg p-5 cursor-pointer">
                          <div className="space-y-5">
                            <div className="h-3 w-20 bg-secondary rounded"></div>
                            <div className="h-3 w-16 bg-secondary rounded"></div>
                            <div className="h-3 w-24 bg-secondary rounded"></div>
                          </div>
                          <div className="mt-5 text-center text-xs font-medium">Comfortable</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="animations">Interface Animations</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable animations for a smoother experience
                          </p>
                        </div>
                        <Switch id="animations" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sidebar">Collapse Sidebar by Default</Label>
                          <p className="text-sm text-muted-foreground">
                            Start with sidebar collapsed to maximize workspace
                          </p>
                        </div>
                        <Switch id="sidebar" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleSave("Appearance")}>
                      Apply Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Control what, when and how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-system">System Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Critical security and system status updates
                          </p>
                        </div>
                        <Switch id="email-system" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-updates">Product Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            New features and improvements
                          </p>
                        </div>
                        <Switch id="email-updates" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-marketing">Marketing</Label>
                          <p className="text-sm text-muted-foreground">
                            Product tips, special offers and surveys
                          </p>
                        </div>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Push Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-security">Security Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Unusual login attempts and security events
                          </p>
                        </div>
                        <Switch id="push-security" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-updates">System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Notification when updates are available
                          </p>
                        </div>
                        <Switch id="push-updates" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-devices">Device Status</Label>
                          <p className="text-sm text-muted-foreground">
                            When devices go offline or report errors
                          </p>
                        </div>
                        <Switch id="push-devices" defaultChecked />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="notification-schedule">Quiet Hours</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Don't send notifications during these hours
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-time">From</Label>
                          <Input id="start-time" type="time" defaultValue="22:00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time">To</Label>
                          <Input id="end-time" type="time" defaultValue="07:00" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleSave("Notification")}>
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      Password & Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Password must be at least 8 characters and include a number, a symbol, a lowercase and an uppercase letter.
                    </div>
                    
                    <Button onClick={() => {
                      toast({
                        title: "Password Updated",
                        description: "Your password has been changed successfully",
                      });
                    }} className="mt-2">
                      Change Password
                    </Button>
                    
                    <Separator className="my-6" />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication
                      </p>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Authenticator App</div>
                            <div className="text-sm text-muted-foreground">
                              Use an authenticator app to generate verification codes
                            </div>
                          </div>
                        </div>
                        <Button variant="outline">Setup</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Email Authentication</div>
                            <div className="text-sm text-muted-foreground">
                              Receive verification codes via email
                            </div>
                          </div>
                        </div>
                        <Button variant="outline">Setup</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-destructive rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Sign Out From All Devices</h3>
                          <p className="text-sm text-muted-foreground">
                            This will sign you out from all devices except this one
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Signed Out",
                            description: "You've been signed out from all other devices",
                          });
                        }}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-destructive rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-destructive">Delete Account</h3>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all associated data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => {
                          toast({
                            title: "Action Required",
                            description: "Please contact an administrator to delete your account",
                            variant: "destructive",
                          });
                        }}>
                          Delete Account
                        </Button>
                      </div>
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

export default Settings;
