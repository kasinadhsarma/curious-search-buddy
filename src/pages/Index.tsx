import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle, Image, Video, Sparkles } from "lucide-react";
import Sidebar, { SearchHistoryItem } from "@/components/layout/Sidebar";
import SearchBar from "@/components/search/SearchBar";
import ResultCard from "@/components/search/ResultCard";
import SearchTypeToggle, { SearchType } from "@/components/search/SearchTypeToggle";
import CustomSearchModelSelector from "@/components/search/CustomSearchModelSelector";
import { SearchModel, SearchDomain } from "@/components/search/SearchModelSelector";
import VoiceSearchInput from "@/components/search/VoiceSearchInput";
import FileUploadInput from "@/components/search/FileUploadInput";
import ThemeToggle from "@/components/ThemeToggle";
import { performSearch } from "@/services/searchService";
import { SearchResult } from "@/types/search";
import { 
  getSearchHistory, 
  addSearchToHistory, 
  getSearchResultByQuery, 
  addSearchResult,
  clearSearchHistory,
  deleteSearchHistoryItem
} from "@/lib/storage";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import CuriousSearchBuddyIcon from "@/components/icons/CuriousSearchBuddyIcon";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searchType, setSearchType] = useState<SearchType>("web");
  const [searchModel, setSearchModel] = useState<SearchModel>("default");
  const [searchDomain, setSearchDomain] = useState<SearchDomain>("web");
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [fileContent, setFileContent] = useState<{ filename: string; content: string } | undefined>(undefined);
  const isMobile = useIsMobile();

  // Load search history from localStorage on component mount
  useEffect(() => {
    const history = getSearchHistory();
    setSearchHistory(history);
    
    // Initialize sidebar based on screen size
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleSearch = async (query: string) => {
    if (isSearching) return;

    setIsSearching(true);
    setCurrentQuery(query);
    
    // Check if we already have results for this query
    const existingResult = getSearchResultByQuery(query);
    
    if (existingResult) {
      // Use existing result if available
      setSearchResult(existingResult);
      
      // Still update the history to bring this query to the top
      const historyItem = addSearchToHistory(query);
      setSearchHistory(prev => {
        // Remove existing entry if present
        const filtered = prev.filter(item => item.query.toLowerCase() !== query.toLowerCase());
        // Add to beginning
        return [historyItem, ...filtered];
      });
      
      setIsSearching(false);
    } else {
      try {
        // Perform the search
        const result = await performSearch(query, searchType, searchModel, searchDomain, fileContent);
        
        // Save result and update history
        addSearchResult(result);
        const historyItem = addSearchToHistory(query);
        
        setSearchResult(result);
        setSearchHistory(prev => {
          // Remove existing entry if present
          const filtered = prev.filter(item => item.query.toLowerCase() !== query.toLowerCase());
          // Add to beginning
          return [historyItem, ...filtered];
        });
      } catch (error) {
        console.error("Search error:", error);
        toast.error("Failed to perform search. Please try again.");
      } finally {
        setIsSearching(false);
      }
    }
    
    // Reset voice and file upload UI
    setShowVoiceInput(false);
    setShowFileUpload(false);
    setFileContent(undefined);
    
    // Close sidebar on mobile after search
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleHistoryItemClick = (query: string) => {
    handleSearch(query);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    deleteSearchHistoryItem(id);
    setSearchHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    if (currentQuery && searchResult) {
      // If we already have a query, search again with new type
      handleSearch(currentQuery);
    }
  };

  const handleSearchModelChange = (model: SearchModel) => {
    setSearchModel(model);
    if (currentQuery && searchResult) {
      // If we already have a query, search again with new model
      handleSearch(currentQuery);
    }
  };

  const handleSearchDomainChange = (domain: SearchDomain) => {
    setSearchDomain(domain);
    if (currentQuery && searchResult) {
      // If we already have a query, search again with new domain
      handleSearch(currentQuery);
    }
  };

  const handleVoiceTranscription = (text: string) => {
    handleSearch(text);
  };

  const handleFileContent = (content: string, filename: string) => {
    setFileContent({ content, filename });
    toast.success(`File "${filename}" ready for search`);
  };

  const toggleVoiceInput = () => {
    setShowVoiceInput(!showVoiceInput);
    setShowFileUpload(false);
  };

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
    setShowVoiceInput(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#9b87f5]/10 to-[#7E69AB]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        searchHistory={searchHistory}
        onHistoryItemClick={handleHistoryItemClick}
        clearHistory={handleClearHistory}
        deleteHistoryItem={handleDeleteHistoryItem}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hover:bg-accent mr-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                {sidebarOpen && isMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              {searchResult ? null : (
                <div className="flex items-center space-x-2 hidden sm:flex">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                    Curious Search Buddy
                  </div>
                </div>
              )}
            </div>
            
            {searchResult && (
              <div className="flex-1 flex justify-center max-w-2xl mx-auto">
                <SearchBar 
                  onSearch={handleSearch} 
                  isSearching={isSearching} 
                  defaultQuery={currentQuery}
                  onVoiceSearchClick={toggleVoiceInput}
                  onFileUploadClick={toggleFileUpload}
                />
              </div>
            )}
            
            <ThemeToggle className="hover:bg-accent rounded-xl transition-all duration-300 hover:scale-105" />
          </div>
        </header>
        
        {/* Enhanced Main Content */}
        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center relative">
          {!searchResult ? (
            <div className="flex flex-col items-center justify-center max-w-4xl w-full mx-auto mt-10 space-y-8">
              {/* Enhanced Hero Section */}
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 animate-pulse">
                      <CuriousSearchBuddyIcon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-[#9b87f5] via-[#7E69AB] to-[#9b87f5] bg-clip-text text-transparent animate-gradient bg-300% leading-tight">
                  Curious Search Buddy
                </h1>
                
                <p className="text-xl text-center text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                  Your AI-powered search companion with advanced intelligence. 
                  <span className="block mt-2 text-lg bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent font-semibold">
                    Ask anything and get comprehensive answers with sources.
                  </span>
                </p>
              </div>
              
              {/* Enhanced Search Interface */}
              {showVoiceInput ? (
                <div className="w-full max-w-2xl">
                  <VoiceSearchInput onTranscription={handleVoiceTranscription} />
                </div>
              ) : showFileUpload ? (
                <div className="w-full max-w-2xl">
                  <FileUploadInput onFileContent={handleFileContent} />
                </div>
              ) : (
                <div className="w-full max-w-2xl space-y-8">
                  <div className="relative">
                    <SearchBar 
                      onSearch={handleSearch} 
                      isSearching={isSearching}
                      onVoiceSearchClick={toggleVoiceInput}
                      onFileUploadClick={toggleFileUpload}
                    />
                    
                    {/* Search type buttons with enhanced styling */}
                    <div className="flex justify-center mt-8 space-x-3">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-2xl bg-white/5 border border-white/20 hover:bg-gradient-to-br hover:from-[#9b87f5]/20 hover:to-[#7E69AB]/20 hover:border-[#9b87f5]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                        onClick={() => handleSearchTypeChange("web")}
                      >
                        <CuriousSearchBuddyIcon className="h-5 w-5" />
                        <span className="sr-only">Web Search</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-2xl bg-white/5 border border-white/20 hover:bg-gradient-to-br hover:from-[#9b87f5]/20 hover:to-[#7E69AB]/20 hover:border-[#9b87f5]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                        onClick={() => handleSearchTypeChange("chat")}
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span className="sr-only">Chat</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-2xl bg-white/5 border border-white/20 hover:bg-gradient-to-br hover:from-[#9b87f5]/20 hover:to-[#7E69AB]/20 hover:border-[#9b87f5]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                        onClick={() => handleSearchTypeChange("image")}
                      >
                        <Image className="h-5 w-5" />
                        <span className="sr-only">Images</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-2xl bg-white/5 border border-white/20 hover:bg-gradient-to-br hover:from-[#9b87f5]/20 hover:to-[#7E69AB]/20 hover:border-[#9b87f5]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                        onClick={() => handleSearchTypeChange("video")}
                      >
                        <Video className="h-5 w-5" />
                        <span className="sr-only">Videos</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Enhanced Model Selector */}
              <div className="w-full max-w-4xl">
                <CustomSearchModelSelector
                  selectedModel={searchModel}
                  selectedDomain={searchDomain}
                  onModelChange={handleSearchModelChange}
                  onDomainChange={handleSearchDomainChange}
                />
              </div>
              
              {/* Enhanced Quick Search Buttons */}
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("What is Perplexity AI")}
                  className="bg-white/5 border border-white/20 hover:bg-gradient-to-r hover:from-[#9b87f5]/20 hover:to-[#7E69AB]/20 hover:border-[#9b87f5]/50 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm rounded-2xl px-6 py-3"
                >
                  What is Perplexity AI
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("How to learn programming")}
                  className="bg-white/5 border border-white/20 hover:bg-gradient-to-r hover:from-[#9b87f5]/20 hover:to-[#7E69AB]/20 hover:border-[#9b87f5]/50 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm rounded-2xl px-6 py-3"
                >
                  How to learn programming
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("What is React")}
                  className="bg-white/5 border border-white/20 hover:bg-gradient-to-r hover:from-[#9b87f5]/20 hover:to-[#7E69AB]/20 hover:border-[#9b87f5]/50 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm rounded-2xl px-6 py-3"
                >
                  What is React
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-6">
                <SearchTypeToggle 
                  activeType={searchType} 
                  onChange={handleSearchTypeChange} 
                />
              </div>
              
              <div className="mb-6">
                <CustomSearchModelSelector
                  selectedModel={searchModel}
                  selectedDomain={searchDomain}
                  onModelChange={handleSearchModelChange}
                  onDomainChange={handleSearchDomainChange}
                />
              </div>
              
              {isSearching ? (
                <div className="animate-pulse space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
                  <div className="h-10 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-2xl w-3/4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded-xl"></div>
                    <div className="h-4 bg-white/10 rounded-xl"></div>
                    <div className="h-4 bg-white/10 rounded-xl w-5/6"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded-xl"></div>
                    <div className="h-4 bg-white/10 rounded-xl w-4/6"></div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <ResultCard result={searchResult} />
                </div>
              )}
            </div>
          )}
          
          {/* Enhanced Footer */}
          <div className="mt-auto text-center py-8">
            <div className="text-sm text-muted-foreground/70 mb-2">
              Curious Search Buddy © {new Date().getFullYear()}
            </div>
            <div className="text-xs text-muted-foreground/50">
              Powered by Advanced AI Technology
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
