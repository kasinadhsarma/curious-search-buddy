
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Image, Video } from "lucide-react";

export type SearchType = "web" | "chat" | "image" | "video";

interface SearchTypeToggleProps {
  activeType: SearchType;
  onChange: (type: SearchType) => void;
}

const SearchTypeToggle: React.FC<SearchTypeToggleProps> = ({ activeType, onChange }) => {
  return (
    <div className="flex items-center justify-center my-4 space-x-2">
      <Button
        variant={activeType === "web" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("web")}
        className="flex items-center space-x-1"
      >
        <Search className="h-4 w-4" />
        <span>Web</span>
      </Button>
      
      <Button
        variant={activeType === "chat" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("chat")}
        className="flex items-center space-x-1"
      >
        <MessageCircle className="h-4 w-4" />
        <span>Chat</span>
      </Button>
      
      <Button
        variant={activeType === "image" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("image")}
        className="flex items-center space-x-1"
      >
        <Image className="h-4 w-4" />
        <span>Images</span>
      </Button>
      
      <Button
        variant={activeType === "video" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("video")}
        className="flex items-center space-x-1"
      >
        <Video className="h-4 w-4" />
        <span>Videos</span>
      </Button>
    </div>
  );
};

export default SearchTypeToggle;
