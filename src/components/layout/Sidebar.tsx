
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Library, Search, Globe, User, Plus, Settings, Download } from "lucide-react";
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
          "fixed inset-y-0 left-0 z-50 w-56 bg-[#1A1F2C] transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative md:z-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-4 flex justify-center items-center">
            <div className="text-white font-bold text-2xl">perplexity</div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1 px-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10"
                >
                  <Home className="mr-2 h-5 w-5" />
                  <span>Home</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10"
                >
                  <Library className="mr-2 h-5 w-5" />
                  <span>Library</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10"
                >
                  <Search className="mr-2 h-5 w-5" />
                  <span>Search History</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  <span>Discover</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  <span>New Space</span>
                </Button>
              </li>
            </ul>
          </nav>
          
          {/* Search History */}
          <div className="px-4 py-2">
            <div className="text-sm font-medium text-gray-400 mb-2">Recent Searches</div>
            <ScrollArea className="h-32 pr-2">
              {searchHistory.length === 0 ? (
                <div className="text-sm text-gray-500 p-2">
                  No search history yet
                </div>
              ) : (
                <div className="space-y-1">
                  {searchHistory.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left truncate h-auto py-1 text-gray-300 hover:text-white hover:bg-white/10"
                        onClick={() => onHistoryItemClick(item.query)}
                      >
                        <span className="truncate">{item.query}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* User Profile */}
          <div className="mt-auto">
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10"
              >
                <User className="mr-2 h-5 w-5" />
                <span>Account</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10"
              >
                <Download className="mr-2 h-5 w-5" />
                <span>Install</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
