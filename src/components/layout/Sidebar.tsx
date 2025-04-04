
import React, { useState } from "react";
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
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  collapsed = false,
}) => {
  return (
    <li>
      <a
        href="#"
        className={cn("sidebar-item", active && "active")}
      >
        {icon}
        {!collapsed && <span>{text}</span>}
      </a>
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
              active={true}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Cloud className="h-5 w-5" />}
              text="Cloud"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Zap className="h-5 w-5" />}
              text="AI Models"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Laptop className="h-5 w-5" />}
              text="IoT Devices"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<RefreshCw className="h-5 w-5" />}
              text="Updates"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              text="Settings"
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
