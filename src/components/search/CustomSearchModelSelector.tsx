
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Search } from "lucide-react";
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
    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 mb-4 sm:items-center justify-center">
      <div className="flex space-x-2 justify-center">
        <Button
          variant={selectedModel === "default" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onModelChange("default")}
          className="flex items-center space-x-1"
        >
          <Bot className="h-4 w-4" />
          <span className="ml-1">Default AI</span>
        </Button>
        
        <Button
          variant={selectedDomain === "web" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onDomainChange("web")}
          className="flex items-center space-x-1"
        >
          <Search className="h-4 w-4" />
          <span className="ml-1">Web</span>
        </Button>
      </div>
    </div>
  );
};

export default CustomSearchModelSelector;
