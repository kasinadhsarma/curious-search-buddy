
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Trash2, FileUp, Mic } from "lucide-react";
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
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#211E2E] border-r border-white/10 transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative md:z-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-8 w-8 rounded bg-[#9b87f5]/20 text-[#9b87f5]">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-white">Guest User</div>
                <div className="text-xs text-gray-400">Basic Plan</div>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent border border-white/20 hover:bg-white/10 text-white"
              onClick={() => window.location.reload()}
            >
              <Search className="mr-2 h-4 w-4" />
              New Search
            </Button>
          </div>
          
          {/* Search History */}
          <div className="flex-1 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">Search History</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-transparent"
                onClick={handleClearHistory}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100%-3.5rem)] pr-2">
              <div className="px-4">
                {searchHistory.length === 0 ? (
                  <div className="text-sm text-gray-400 italic py-2">
                    No search history yet
                  </div>
                ) : (
                  <div className="space-y-1">
                    {searchHistory.map((item) => (
                      <div key={item.id} className="flex items-center group">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left truncate py-2 px-3 h-auto text-gray-300 hover:text-white hover:bg-white/5 rounded"
                          onClick={() => onHistoryItemClick(item.query)}
                        >
                          <span className="truncate text-sm">{item.query}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 absolute right-4 text-gray-400 hover:text-red-400 hover:bg-transparent"
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
              </div>
            </ScrollArea>
          </div>
          
          {/* Sidebar Footer - Plans */}
          <div className="mt-auto border-t border-white/10 p-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-300">Plans</div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border border-[#9b87f5]/50 text-[#9b87f5] hover:bg-[#9b87f5]/10 hover:text-[#9b87f5] justify-start"
                >
                  Basic Plan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border border-white/20 text-gray-300 hover:bg-white/5 hover:text-white justify-start opacity-60"
                >
                  Pro Plan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border border-white/20 text-gray-300 hover:bg-white/5 hover:text-white justify-start opacity-60"
                >
                  Team Plan
                </Button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-gray-400">
                Curious Search Buddy © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
