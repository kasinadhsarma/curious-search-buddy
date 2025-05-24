
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Trash2, Menu, X, Settings, History, Sparkles, Crown, Users, Zap } from "lucide-react";
import { toast } from "sonner";
import UserProfile from "@/components/user/UserProfile";

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
      {/* Enhanced Overlay for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r transition-all duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isMobile ? "md:translate-x-0" : "",
          "dark:bg-gradient-to-b dark:from-[#1a1625] dark:via-[#211E2E] dark:to-[#2a2639] dark:border-white/10",
          "light:bg-gradient-to-b light:from-white light:via-gray-50 light:to-gray-100 light:border-black/10",
          "shadow-2xl backdrop-blur-xl"
        )}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Enhanced animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Enhanced Toggle button for mobile */}
          {isMobile && (
            <div className="absolute right-0 top-4 transform translate-x-full z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "dark:bg-gradient-to-r dark:from-[#211E2E] dark:via-[#2A2639] dark:to-[#211E2E] dark:text-white dark:hover:from-[#2A2639] dark:hover:via-[#33304a] dark:hover:to-[#2A2639]",
                  "light:bg-gradient-to-r light:from-white light:via-gray-50 light:to-white light:text-black light:hover:from-gray-50 light:hover:via-gray-100 light:hover:to-gray-50",
                  "rounded-l-none h-12 w-10 flex items-center justify-center shadow-xl border border-l-0 dark:border-white/10 light:border-black/10",
                  "transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                )}
              >
                {isOpen ? (
                  <X className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                )}
              </Button>
            </div>
          )}

          {/* Enhanced Desktop close button */}
          {!isMobile && (
            <div className="absolute right-3 top-3 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-9 w-9 p-0 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:rotate-90 backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Enhanced Header */}
          <div className="p-6 border-b dark:border-white/10 light:border-black/10 relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                Search Buddy
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full justify-start bg-gradient-to-r from-white/5 to-white/10 dark:border-white/20 dark:hover:from-white/10 dark:hover:to-white/15 dark:text-white light:border-black/20 light:hover:from-black/5 light:hover:to-black/10 light:text-black backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-xl"
              onClick={() => window.location.reload()}
            >
              <Search className="mr-3 h-4 w-4" />
              New Search
              <Zap className="ml-auto h-3 w-3 opacity-60" />
            </Button>
          </div>
          
          {/* Enhanced Search History */}
          <div className="flex-1 overflow-hidden relative z-10">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="h-4 w-4 dark:text-gray-400 light:text-gray-600" />
                <span className="text-sm font-medium dark:text-gray-300 light:text-gray-700">Search History</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-400/10 light:text-gray-600 light:hover:text-red-600 light:hover:bg-red-500/10 rounded-lg transition-all duration-300 hover:scale-110"
                onClick={handleClearHistory}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100%-4rem)] pr-2">
              <div className="px-6">
                {searchHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Search className="h-6 w-6 dark:text-gray-400 light:text-gray-600" />
                    </div>
                    <div className="text-sm dark:text-gray-400 light:text-gray-600 italic">
                      No search history yet
                    </div>
                    <div className="text-xs dark:text-gray-500 light:text-gray-500 mt-1">
                      Your searches will appear here
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <div key={item.id} className="flex items-center group relative">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left truncate py-3 px-4 h-auto dark:text-gray-300 dark:hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-white/5 dark:hover:to-white/10 light:text-gray-700 light:hover:text-black light:hover:bg-gradient-to-r light:hover:from-black/5 light:hover:to-black/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md backdrop-blur-sm"
                          onClick={() => onHistoryItemClick(item.query)}
                        >
                          <div className="flex items-center space-x-3 w-full">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                            <span className="truncate text-sm font-medium">{item.query}</span>
                          </div>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 absolute right-2 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-400/10 light:text-gray-600 light:hover:text-red-600 light:hover:bg-red-500/10 rounded-lg transition-all duration-300 hover:scale-110"
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
          
          {/* Enhanced Plans Section */}
          <div className="mt-auto border-t dark:border-white/10 light:border-black/10 p-6 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Crown className="h-4 w-4 text-[#9b87f5]" />
                <div className="text-sm font-medium dark:text-gray-300 light:text-gray-700">Subscription Plans</div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gradient-to-r from-[#9b87f5]/10 to-[#7E69AB]/10 dark:border-[#9b87f5]/30 dark:text-[#9b87f5] dark:hover:from-[#9b87f5]/20 dark:hover:to-[#7E69AB]/20 dark:hover:border-[#9b87f5]/50 light:border-[#9b87f5]/40 light:text-[#9b87f5] light:hover:from-[#9b87f5]/15 light:hover:to-[#7E69AB]/15 light:hover:border-[#9b87f5]/60 justify-start rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full mr-2"></div>
                  Basic Plan
                  <div className="ml-auto text-xs bg-[#9b87f5]/20 px-2 py-1 rounded-full">Active</div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gradient-to-r from-white/5 to-white/10 dark:border-white/20 dark:text-gray-400 dark:hover:from-white/10 dark:hover:to-white/15 dark:hover:text-gray-300 light:border-black/20 light:text-gray-600 light:hover:from-black/5 light:hover:to-black/10 light:hover:text-gray-800 justify-start rounded-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm opacity-70 hover:opacity-100"
                >
                  <Sparkles className="h-3 w-3 mr-2" />
                  Pro Plan
                  <div className="ml-auto text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full">Soon</div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gradient-to-r from-white/5 to-white/10 dark:border-white/20 dark:text-gray-400 dark:hover:from-white/10 dark:hover:to-white/15 dark:hover:text-gray-300 light:border-black/20 light:text-gray-600 light:hover:from-black/5 light:hover:to-black/10 light:hover:text-gray-800 justify-start rounded-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm opacity-70 hover:opacity-100"
                >
                  <Users className="h-3 w-3 mr-2" />
                  Team Plan
                  <div className="ml-auto text-xs bg-blue-500/20 text-blue-600 px-2 py-1 rounded-full">Soon</div>
                </Button>
              </div>
            </div>
            
            {/* Enhanced User Profile Section */}
            <div className="mt-6 pt-6 border-t dark:border-white/10 light:border-black/10">
              <UserProfile />
            </div>
            
            {/* Enhanced Footer */}
            <div className="mt-6 pt-4 border-t dark:border-white/10 light:border-black/10">
              <div className="text-xs dark:text-gray-500 light:text-gray-600 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-3 w-3" />
                  <span>Curious Search Buddy © {new Date().getFullYear()}</span>
                </div>
                <div className="mt-1 opacity-75">Powered by Advanced AI</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
