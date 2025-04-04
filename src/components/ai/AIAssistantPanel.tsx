
import React, { useState, useRef, useEffect } from "react";
import { Bot, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Define the message types
type MessageType = {
  id: string;
  content: string;
  sender: "ai" | "user";
  timestamp: Date;
};

// Mock AI responses
const mockResponses = [
  "Your server load is increasing — consider scaling up.",
  "2 updates available for Ubuntu 24.04.",
  "CPU usage on node-01 has exceeded 80% for the last 15 minutes.",
  "Database backup completed successfully.",
  "Memory usage is optimal across all instances.",
  "Security scan complete: No vulnerabilities detected.",
];

// Commands that the AI can respond to
const commands: Record<string, string> = {
  "check instance logs": "Fetching logs for all instances. Everything looks normal with the exception of instance-03 which shows increased error rates.",
  "show updates": "Ubuntu 24.04: Security patch (critical). Docker: Version 25.0.3 available.",
  "system status": "All systems operational. Load balancer health: 100%, Database response time: 42ms.",
  "predict resource needs": "Based on current growth pattern, you'll need 20% more storage and 15% more compute within 30 days.",
  "help": "You can ask me to check instance logs, show updates, system status, or predict resource needs.",
};

const AIAssistantPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial message when component mounts
  useEffect(() => {
    const initialMessage: MessageType = {
      id: "initial",
      content: "Hello! I'm your Canonical Nexus AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Periodically add AI insights
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      // Only add a new insight if there are fewer than 10 messages
      if (messages.length < 10) {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        addMessage(randomResponse, "ai");
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [isOpen, messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (content: string, sender: "ai" | "user") => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    addMessage(input, "user");
    
    // Generate response
    setTimeout(() => {
      let response: string;
      
      // Check for command matches
      const matchedCommand = Object.keys(commands).find(
        (cmd) => input.toLowerCase().includes(cmd.toLowerCase())
      );
      
      if (matchedCommand) {
        response = commands[matchedCommand];
      } else {
        response = "I'm not sure how to help with that. Try asking me to check instance logs, show updates, or system status.";
      }
      
      addMessage(response, "ai");
    }, 800);
    
    setInput("");
  };

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-40 transition-all duration-300",
      isOpen ? "w-80 h-[500px]" : "w-auto h-auto"
    )}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="bg-background border rounded-lg shadow-lg overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-canonical-purple" />
            <h3 className="font-medium">AI Assistant</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="flex flex-col flex-1" forceMount>
          <ScrollArea className="flex-1 p-4 h-[400px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "p-3 rounded-lg max-w-[85%]",
                    message.sender === "ai"
                      ? "bg-accent text-accent-foreground mr-auto"
                      : "bg-primary text-primary-foreground ml-auto"
                  )}
                >
                  <p>{message.content}</p>
                  <time className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AIAssistantPanel;
