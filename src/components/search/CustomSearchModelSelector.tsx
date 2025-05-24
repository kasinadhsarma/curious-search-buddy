
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Search, Sparkles, GraduationCap, Users, Zap } from "lucide-react";
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
    <div className="flex flex-col lg:flex-row gap-6 justify-center w-full items-center">
      {/* Enhanced Model Selection */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex gap-2 shadow-2xl">
        <div className="text-xs font-medium text-muted-foreground px-3 py-2 flex items-center">
          <Zap className="h-3 w-3 mr-1" />
          Model
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onModelChange("default")}
          className={cn(
            "rounded-xl flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:scale-105",
            selectedModel === "default" 
              ? "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white shadow-lg transform scale-105" 
              : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
          )}
        >
          <Bot className="h-4 w-4" />
          <span className="font-medium">Default</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onModelChange("deep")}
          className={cn(
            "rounded-xl flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:scale-105",
            selectedModel === "deep" 
              ? "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white shadow-lg transform scale-105" 
              : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">Deep</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onModelChange("basic")}
          className={cn(
            "rounded-xl flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:scale-105",
            selectedModel === "basic" 
              ? "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white shadow-lg transform scale-105" 
              : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
          )}
        >
          <Bot className="h-4 w-4" />
          <span className="font-medium">Basic</span>
        </Button>
      </div>
      
      {/* Enhanced Domain Selection */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex gap-2 shadow-2xl">
        <div className="text-xs font-medium text-muted-foreground px-3 py-2 flex items-center">
          <Search className="h-3 w-3 mr-1" />
          Domain
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDomainChange("web")}
          className={cn(
            "rounded-xl flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:scale-105",
            selectedDomain === "web" 
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform scale-105" 
              : "hover:bg-blue-500/10 text-muted-foreground hover:text-blue-400 border border-transparent hover:border-blue-500/30"
          )}
        >
          <Search className="h-4 w-4" />
          <span className="font-medium">Web</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDomainChange("academic")}
          className={cn(
            "rounded-xl flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:scale-105",
            selectedDomain === "academic" 
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform scale-105" 
              : "hover:bg-blue-500/10 text-muted-foreground hover:text-blue-400 border border-transparent hover:border-blue-500/30"
          )}
        >
          <GraduationCap className="h-4 w-4" />
          <span className="font-medium">Academic</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDomainChange("social")}
          className={cn(
            "rounded-xl flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:scale-105",
            selectedDomain === "social" 
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform scale-105" 
              : "hover:bg-blue-500/10 text-muted-foreground hover:text-blue-400 border border-transparent hover:border-blue-500/30"
          )}
        >
          <Users className="h-4 w-4" />
          <span className="font-medium">Social</span>
        </Button>
      </div>
    </div>
  );
};

export default CustomSearchModelSelector;
