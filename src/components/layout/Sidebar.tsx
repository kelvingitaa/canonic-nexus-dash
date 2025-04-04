
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Cpu,
  Home,
  Laptop,
  RefreshCw,
  Settings,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  path,
  collapsed = false,
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <li>
      <Link
        to={path}
        className={cn(
          "sidebar-item flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground",
          collapsed && "justify-center"
        )}
      >
        <span className="flex-shrink-0">{icon}</span>
        {!collapsed && <span className="truncate">{text}</span>}
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground h-[calc(100vh-4rem)] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        <nav className="flex-1 px-3 py-2">
          <ul className="space-y-1">
            <SidebarItem
              icon={<Home className="h-5 w-5" />}
              text="Dashboard"
              path="/"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Cloud className="h-5 w-5" />}
              text="Cloud"
              path="/cloud"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Zap className="h-5 w-5" />}
              text="AI Models"
              path="/ai-models"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Laptop className="h-5 w-5" />}
              text="IoT Devices"
              path="/iot-devices"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<RefreshCw className="h-5 w-5" />}
              text="Updates"
              path="/updates"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              text="Settings"
              path="/settings"
              collapsed={collapsed}
            />
          </ul>
        </nav>

        <div className="px-3 py-4">
          <div className={cn(
            "flex items-center px-3 py-2 text-xs bg-sidebar-accent rounded-md",
            collapsed && "justify-center"
          )}>
            <Cpu className="h-4 w-4 mr-2" />
            {!collapsed && <span>Nexus v2.4.1</span>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
