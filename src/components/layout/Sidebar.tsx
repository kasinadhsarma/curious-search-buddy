
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Home, Trash2, User, Settings, FileUp, Mic, Laptop } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  searchHistory: SearchHistoryItem[];
  onHistoryItemClick: (query: string) => void;
  clearHistory: () => void;
  deleteHistoryItem: (id: string) => void;
};

export type SearchHistoryItem = {
  id: string;
  query: string;
  timestamp: Date;
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  searchHistory,
  onHistoryItemClick,
  clearHistory,
  deleteHistoryItem,
}) => {
  const isMobile = useIsMobile();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleClearHistory = () => {
    if (searchHistory.length === 0) {
      toast.info("No search history to clear");
      return;
    }
    
    clearHistory();
    toast.success("Search history cleared");
  };
  
  return (
    <>
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative md:z-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* User Profile Section */}
          <div className="flex items-center space-x-2 mb-6 p-2 rounded-lg hover:bg-muted cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium">Guest User</div>
              <div className="text-xs text-muted-foreground">Basic Plan</div>
            </div>
          </div>
          
          {/* User Menu (collapsible) */}
          {showUserMenu && (
            <div className="bg-muted rounded-lg p-2 mb-4 text-sm space-y-2">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Laptop className="mr-2 h-4 w-4" />
                Developer Settings
              </Button>
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full mb-4 justify-start"
            onClick={() => window.location.reload()}
          >
            <Search className="mr-2 h-4 w-4" />
            New Search
          </Button>
          
          <div className="flex items-center space-x-2 mb-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex-1 h-8 px-2 text-muted-foreground"
            >
              <FileUp className="h-4 w-4 mr-1" />
              Upload File
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="flex-1 h-8 px-2 text-muted-foreground"
            >
              <Mic className="h-4 w-4 mr-1" />
              Voice Search
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-muted-foreground">
              Search History
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-muted-foreground hover:text-destructive"
              onClick={handleClearHistory}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 -mr-4 pr-4">
            {searchHistory.length === 0 ? (
              <div className="text-sm text-muted-foreground p-2">
                No search history yet
              </div>
            ) : (
              <div className="space-y-1">
                {searchHistory.map((item) => (
                  <div key={item.id} className="flex items-center group">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left truncate h-auto py-2 pr-8"
                      onClick={() => onHistoryItemClick(item.query)}
                    >
                      <span className="truncate">{item.query}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 absolute right-4 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(item.id);
                        toast.success("Search removed from history");
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          <div className="pt-4 border-t mt-4">
            <div className="text-xs text-muted-foreground">
              Curious Search Buddy © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
