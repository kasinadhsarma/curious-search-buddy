
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Search, Sparkles, GraduationCap, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchModel = "default" | "deep" | "basic";
export type SearchDomain = "web" | "academic" | "social";

interface SearchModelSelectorProps {
  selectedModel: SearchModel;
  selectedDomain: SearchDomain;
  onModelChange: (model: SearchModel) => void;
  onDomainChange: (domain: SearchDomain) => void;
}

const CustomSearchModelSelector: React.FC<SearchModelSelectorProps> = ({
  selectedModel,
  selectedDomain,
  onModelChange,
  onDomainChange,
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-2 justify-center w-full">
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <div className="bg-background/50 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-black/10 rounded-xl p-2 flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onModelChange("default")}
            className={cn(
              "rounded-lg flex items-center space-x-1 px-3 transition-all",
              selectedModel === "default" ? "bg-[#9b87f5] text-white" : "hover:bg-white/10"
            )}
          >
            <Bot className="h-4 w-4" />
            <span className="ml-1">Default</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onModelChange("deep")}
            className={cn(
              "rounded-lg flex items-center space-x-1 px-3 transition-all",
              selectedModel === "deep" ? "bg-[#9b87f5] text-white" : "hover:bg-white/10"
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span className="ml-1">Deep</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onModelChange("basic")}
            className={cn(
              "rounded-lg flex items-center space-x-1 px-3 transition-all",
              selectedModel === "basic" ? "bg-[#9b87f5] text-white" : "hover:bg-white/10"
            )}
          >
            <Bot className="h-4 w-4" />
            <span className="ml-1">Basic</span>
          </Button>
        </div>
        
        <div className="bg-background/50 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-black/10 rounded-xl p-2 flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDomainChange("web")}
            className={cn(
              "rounded-lg flex items-center space-x-1 px-3 transition-all",
              selectedDomain === "web" ? "bg-[#9b87f5] text-white" : "hover:bg-white/10"
            )}
          >
            <Search className="h-4 w-4" />
            <span className="ml-1">Web</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDomainChange("academic")}
            className={cn(
              "rounded-lg flex items-center space-x-1 px-3 transition-all",
              selectedDomain === "academic" ? "bg-[#9b87f5] text-white" : "hover:bg-white/10"
            )}
          >
            <GraduationCap className="h-4 w-4" />
            <span className="ml-1">Academic</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDomainChange("social")}
            className={cn(
              "rounded-lg flex items-center space-x-1 px-3 transition-all",
              selectedDomain === "social" ? "bg-[#9b87f5] text-white" : "hover:bg-white/10"
            )}
          >
            <Users className="h-4 w-4" />
            <span className="ml-1">Social</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomSearchModelSelector;
