
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cloud from "./pages/Cloud";
import AIModels from "./pages/AIModels";
import IoTDevices from "./pages/IoTDevices";
import Updates from "./pages/Updates";
import Settings from "./pages/Settings";
import AIAssistantPanel from "./components/ai/AIAssistantPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cloud" element={<Cloud />} />
          <Route path="/ai-models" element={<AIModels />} />
          <Route path="/iot-devices" element={<IoTDevices />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* The AI Assistant will be present on all pages except the Index page 
            since that one already has it included in the component */}
        <Routes>
          <Route path="/cloud" element={<AIAssistantPanel />} />
          <Route path="/ai-models" element={<AIAssistantPanel />} />
          <Route path="/iot-devices" element={<AIAssistantPanel />} />
          <Route path="/updates" element={<AIAssistantPanel />} />
          <Route path="/settings" element={<AIAssistantPanel />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
