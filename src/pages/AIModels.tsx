
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Play, Pause, BarChart, Search, Database, Zap, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIModels: React.FC = () => {
  const { toast } = useToast();
  
  const handleRunModel = (name: string) => {
    toast({
      title: "Model Started",
      description: `${name} is now processing data`,
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
              <h1 className="text-2xl font-bold">AI Models</h1>
              <p className="text-muted-foreground">Deploy, train and manage machine learning models</p>
            </div>

            <Tabs defaultValue="models" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="models">My Models</TabsTrigger>
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
              </TabsList>
              
              <TabsContent value="models" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Deployed Models</h2>
                  <Button>
                    <Zap className="mr-2 h-4 w-4" />
                    Deploy New Model
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      name: "Text Classification", 
                      type: "NLP", 
                      status: "Active", 
                      accuracy: 95.7, 
                      requests: "1.2M/month", 
                      usage: 78 
                    },
                    { 
                      name: "Image Recognition", 
                      type: "Computer Vision", 
                      status: "Active", 
                      accuracy: 92.3, 
                      requests: "3.4M/month", 
                      usage: 64 
                    },
                    { 
                      name: "Sentiment Analysis", 
                      type: "NLP", 
                      status: "Inactive", 
                      accuracy: 88.9, 
                      requests: "0/month", 
                      usage: 0 
                    },
                    { 
                      name: "Recommendation Engine", 
                      type: "Recommendation", 
                      status: "Active", 
                      accuracy: 87.1, 
                      requests: "5.7M/month", 
                      usage: 92 
                    },
                  ].map((model) => (
                    <Card key={model.name}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{model.name}</CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${model.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {model.status}
                          </span>
                        </div>
                        <CardDescription>{model.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Accuracy</span>
                          <span className="font-medium">{model.accuracy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Requests</span>
                          <span className="font-medium">{model.requests}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Resource Usage</span>
                            <span className="font-medium">{model.usage}%</span>
                          </div>
                          <Progress value={model.usage} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {model.status === "Active" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast({
                              title: "Model Paused",
                              description: `${model.name} has been paused`,
                            })}
                          >
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRunModel(model.name)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <BarChart className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="marketplace" className="space-y-4">
                <div className="flex mb-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search models..."
                      className="w-full rounded-md border border-input pl-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      name: "GPT-4", 
                      provider: "OpenAI", 
                      type: "Large Language Model", 
                      rating: 4.9,
                      downloads: "2.3M"
                    },
                    { 
                      name: "DALL-E 3", 
                      provider: "OpenAI", 
                      type: "Image Generation", 
                      rating: 4.8,
                      downloads: "1.5M"
                    },
                    { 
                      name: "Stable Diffusion", 
                      provider: "Stability AI", 
                      type: "Image Generation", 
                      rating: 4.7,
                      downloads: "3.8M"
                    },
                    { 
                      name: "LLaMA-2", 
                      provider: "Meta", 
                      type: "Large Language Model", 
                      rating: 4.5,
                      downloads: "1.9M"
                    },
                    { 
                      name: "Gemini Pro", 
                      provider: "Google", 
                      type: "Large Language Model", 
                      rating: 4.6,
                      downloads: "982K"
                    },
                    { 
                      name: "Whisper", 
                      provider: "OpenAI", 
                      type: "Speech Recognition", 
                      rating: 4.7,
                      downloads: "1.1M"
                    },
                  ].map((model) => (
                    <Card key={model.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          {model.name}
                        </CardTitle>
                        <CardDescription>{model.provider} • {model.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center">
                          {Array(5).fill(0).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(model.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">{model.rating}/5</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Downloads: </span>
                          <span>{model.downloads}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Model
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="training" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Training Jobs</h2>
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    New Training Job
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { 
                          name: "Customer Churn Prediction", 
                          status: "In Progress", 
                          progress: 67, 
                          eta: "2h 15m", 
                          dataset: "customer_data.csv", 
                          datapoints: "2.3M"
                        },
                        { 
                          name: "Product Recommendation", 
                          status: "Queued", 
                          progress: 0, 
                          eta: "Waiting", 
                          dataset: "transaction_history.csv", 
                          datapoints: "5.7M"
                        },
                        { 
                          name: "Fraud Detection", 
                          status: "Completed", 
                          progress: 100, 
                          eta: "0m", 
                          dataset: "financial_transactions.csv", 
                          datapoints: "1.8M"
                        },
                        { 
                          name: "Image Classification", 
                          status: "Failed", 
                          progress: 43, 
                          eta: "Error", 
                          dataset: "product_images.zip", 
                          datapoints: "450K"
                        },
                      ].map((job, index) => (
                        <div key={index} className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{job.name}</div>
                              <div className="text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <Database className="h-3 w-3 mr-1" />
                                  {job.dataset} • {job.datapoints} records
                                </span>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              job.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                              job.status === "Completed" ? "bg-green-100 text-green-800" :
                              job.status === "Failed" ? "bg-red-100 text-red-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{job.progress}% • {job.eta}</span>
                            </div>
                            <Progress value={job.progress} className="h-2" />
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

export default AIModels;
