
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Trash2, Menu, X } from "lucide-react";
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
      {/* Overlay for mobile only when sidebar is open */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isMobile ? "md:translate-x-0" : "",
          "dark:bg-[#211E2E] dark:border-white/10",
          "light:bg-white light:border-black/10"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button for mobile */}
          {isMobile && (
            <div className="absolute right-0 top-4 transform translate-x-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="dark:bg-[#211E2E] dark:text-white dark:hover:bg-[#2A2639] light:bg-white light:text-black light:hover:bg-gray-100 rounded-l-none h-10 w-8 flex items-center justify-center"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          )}

          {/* Desktop close button */}
          {!isMobile && (
            <div className="absolute right-2 top-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* New Search Button */}
          <div className="p-4 border-b dark:border-white/10 light:border-black/10">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent dark:border-white/20 dark:hover:bg-white/10 dark:text-white light:border-black/20 light:hover:bg-black/5 light:text-black"
              onClick={() => window.location.reload()}
            >
              <Search className="mr-2 h-4 w-4" />
              New Search
            </Button>
          </div>
          
          {/* Search History */}
          <div className="flex-1 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium dark:text-gray-400 light:text-gray-600">Search History</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 dark:text-gray-400 dark:hover:text-red-400 light:text-gray-600 light:hover:text-red-600 hover:bg-transparent"
                onClick={handleClearHistory}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100%-3.5rem)] pr-2">
              <div className="px-4">
                {searchHistory.length === 0 ? (
                  <div className="text-sm dark:text-gray-400 light:text-gray-600 italic py-2">
                    No search history yet
                  </div>
                ) : (
                  <div className="space-y-1">
                    {searchHistory.map((item) => (
                      <div key={item.id} className="flex items-center group">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left truncate py-2 px-3 h-auto dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 light:text-gray-700 light:hover:text-black light:hover:bg-black/5 rounded"
                          onClick={() => onHistoryItemClick(item.query)}
                        >
                          <span className="truncate text-sm">{item.query}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 absolute right-4 dark:text-gray-400 dark:hover:text-red-400 light:text-gray-600 light:hover:text-red-600 hover:bg-transparent"
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
          
          {/* User Profile Section (At bottom) */}
          <div className="mt-auto border-t dark:border-white/10 light:border-black/10 p-4">
            <div className="space-y-3">
              <div className="text-sm font-medium dark:text-gray-300 light:text-gray-700">Plans</div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent dark:border-[#9b87f5]/50 dark:text-[#9b87f5] dark:hover:bg-[#9b87f5]/10 dark:hover:text-[#9b87f5] light:border-[#9b87f5]/70 light:text-[#9b87f5] light:hover:bg-[#9b87f5]/10 light:hover:text-[#9b87f5] justify-start"
                >
                  Basic Plan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent dark:border-white/20 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white light:border-black/20 light:text-gray-700 light:hover:bg-black/5 light:hover:text-black justify-start opacity-60"
                >
                  Pro Plan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent dark:border-white/20 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white light:border-black/20 light:text-gray-700 light:hover:bg-black/5 light:hover:text-black justify-start opacity-60"
                >
                  Team Plan
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 pt-4 border-t dark:border-white/10 light:border-black/10">
              <Avatar className="h-8 w-8 rounded dark:bg-[#9b87f5]/20 dark:text-[#9b87f5] light:bg-[#9b87f5]/10 light:text-[#9b87f5]">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium dark:text-white light:text-black">Guest User</div>
                <div className="text-xs dark:text-gray-400 light:text-gray-600">Basic Plan</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t dark:border-white/10 light:border-black/10">
              <div className="text-xs dark:text-gray-400 light:text-gray-600">
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
