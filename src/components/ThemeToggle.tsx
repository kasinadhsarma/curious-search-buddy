
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage or default to dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-[#1A1F2C]");
      document.body.classList.add("bg-white", "text-black");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-[#1A1F2C]", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      // Switch to light mode
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-[#1A1F2C]");
      document.body.classList.add("bg-white", "text-black");
      localStorage.setItem("theme", "light");
    } else {
      // Switch to dark mode
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-[#1A1F2C]", "text-white");
      document.body.classList.remove("bg-white", "text-black");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
