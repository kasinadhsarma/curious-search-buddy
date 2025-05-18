
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme from localStorage or default to dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-[#1A1F2C]", "text-white");
      document.body.classList.add("bg-white", "text-black");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-[#1A1F2C]", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    }
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setIsDark(!isDark);
    
    if (isDark) {
      // Switch to light mode
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-[#1A1F2C]", "text-white");
      document.body.classList.add("bg-white", "text-black");
      localStorage.setItem("theme", "light");
      toast.success("Light mode activated", {
        icon: <Sun className="h-4 w-4 text-yellow-500" />,
        position: "top-center",
        duration: 1500,
      });
    } else {
      // Switch to dark mode
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-[#1A1F2C]", "text-white");
      document.body.classList.remove("bg-white", "text-black");
      localStorage.setItem("theme", "dark");
      toast.success("Dark mode activated", {
        icon: <Moon className="h-4 w-4 text-blue-400" />,
        position: "top-center",
        duration: 1500,
      });
    }
    
    // Add delay to allow transition animation to complete
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`transition-all duration-300 ${className} ${isTransitioning ? 'rotate-180' : ''}`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={isTransitioning}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
