
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Bell, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-card border-b h-16 flex items-center px-4">
      <div className="flex-1 flex items-center">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256">
            <path fill="#E95420" d="M128 28c55.228 0 100 44.772 100 100s-44.772 100-100 100S28 183.228 28 128S72.772 28 128 28" />
            <path fill="#FFF" d="M87.5 151.13c-12.767 0-23.13-10.363-23.13-23.13c0-12.767 10.363-23.13 23.13-23.13c12.767 0 23.13 10.363 23.13 23.13c0 12.767-10.363 23.13-23.13 23.13m104.77-19.62c0 6.378-5.175 11.553-11.553 11.553c-6.378 0-11.553-5.175-11.553-11.553c0-6.378 5.175-11.553 11.553-11.553c6.378 0 11.553 5.175 11.553 11.553M95.967 87.5c0 8.65-13.246 15.676-29.6 15.676S36.77 96.15 36.77 87.5c0-8.65 13.246-15.676 29.6-15.676S95.966 78.85 95.966 87.5M158.433 128c0-5.175-.862-10.124-2.475-14.749l20.953-15.677c4.535 9.4 7.072 19.946 7.072 31.11c0 11.225-2.53 21.85-7.073 31.31l-20.95-15.679A54.62 54.62 0 0 0 158.433 128M108.5 89.01l-27.238-20.087c8.912-10.61 21.316-18.347 35.555-21.53l6.628 33.073c-5.985 1.942-11.162 4.912-14.945 8.544M77.863 128c0-5.245.935-10.277 2.652-14.945l-27.238-20.087c-4.652 9.514-7.27 20.187-7.27 31.515c0 11.387 2.638 22.115 7.334 31.672l27.176-20.278A54.767 54.767 0 0 1 77.863 128m30.637 38.99a35.98 35.98 0 0 1-14.945-8.544l-27.238 20.087c8.912 10.61 21.316 18.347 35.555 21.53l6.628-33.073Z" />
          </svg>
          <span className="font-bold text-lg">Canonical Nexus</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Jane Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
