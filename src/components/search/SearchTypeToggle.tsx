
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Image, Video, Bot } from "lucide-react";
import CuriousSearchBuddyIcon from "../icons/CuriousSearchBuddyIcon";
import { cn } from "@/lib/utils";

export type SearchType = "web" | "chat" | "image" | "video";

interface SearchTypeToggleProps {
  activeType: SearchType;
  onChange: (type: SearchType) => void;
}

const SearchTypeToggle: React.FC<SearchTypeToggleProps> = ({ activeType, onChange }) => {
  return (
    <div className="flex items-center justify-center my-4 space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange("web")}
        className={cn(
          "rounded-full",
          activeType === "web" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
        title="Web Search"
      >
        <CuriousSearchBuddyIcon className="h-5 w-5" />
        <span className="sr-only">Web</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange("chat")}
        className={cn(
          "rounded-full",
          activeType === "chat" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
        title="Chat"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="sr-only">Chat</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange("image")}
        className={cn(
          "rounded-full",
          activeType === "image" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
        title="Images"
      >
        <Image className="h-5 w-5" />
        <span className="sr-only">Images</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange("video")}
        className={cn(
          "rounded-full",
          activeType === "video" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
        title="Videos"
      >
        <Video className="h-5 w-5" />
        <span className="sr-only">Videos</span>
      </Button>
    </div>
  );
};

export default SearchTypeToggle;
