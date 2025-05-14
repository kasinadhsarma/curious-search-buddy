
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Laptop, 
  BookOpen, 
  Users, 
  Sparkles
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SearchModel = "default" | "deep" | "basic";
export type SearchDomain = "web" | "academic" | "social";

interface SearchModelSelectorProps {
  selectedModel: SearchModel;
  selectedDomain: SearchDomain;
  onModelChange: (model: SearchModel) => void;
  onDomainChange: (domain: SearchDomain) => void;
}

const SearchModelSelector: React.FC<SearchModelSelectorProps> = ({
  selectedModel,
  selectedDomain,
  onModelChange,
  onDomainChange
}) => {
  // Model display names
  const modelNames = {
    default: "Default AI",
    deep: "Deep Research",
    basic: "Basic Search"
  };

  // Domain display names
  const domainNames = {
    web: "Web",
    academic: "Academic",
    social: "Social"
  };

  return (
    <div className="flex space-x-2 justify-center mb-4">
      {/* Model Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 mr-1" />
            {modelNames[selectedModel]}
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>Search Models</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              className={selectedModel === "default" ? "bg-accent" : ""} 
              onClick={() => onModelChange("default")}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Default AI</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={selectedModel === "deep" ? "bg-accent" : ""} 
              onClick={() => onModelChange("deep")}
            >
              <Sparkles className="h-4 w-4 mr-2 text-perplexity-600" />
              <span>Deep Research</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={selectedModel === "basic" ? "bg-accent" : ""} 
              onClick={() => onModelChange("basic")}
            >
              <Laptop className="h-4 w-4 mr-2" />
              <span>Basic Search</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Domain Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            {selectedDomain === "web" && <Laptop className="h-4 w-4 mr-1" />}
            {selectedDomain === "academic" && <BookOpen className="h-4 w-4 mr-1" />}
            {selectedDomain === "social" && <Users className="h-4 w-4 mr-1" />}
            {domainNames[selectedDomain]}
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>Search Domains</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              className={selectedDomain === "web" ? "bg-accent" : ""} 
              onClick={() => onDomainChange("web")}
            >
              <Laptop className="h-4 w-4 mr-2" />
              <span>Web</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={selectedDomain === "academic" ? "bg-accent" : ""} 
              onClick={() => onDomainChange("academic")}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Academic</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={selectedDomain === "social" ? "bg-accent" : ""} 
              onClick={() => onDomainChange("social")}
            >
              <Users className="h-4 w-4 mr-2" />
              <span>Social</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchModelSelector;
