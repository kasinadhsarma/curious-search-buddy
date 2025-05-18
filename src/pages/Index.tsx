import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle, Image, Video } from "lucide-react";
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
    <div className="flex min-h-screen bg-background">
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 w-full bg-background border-b dark:border-white/10 light:border-black/10 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hover:bg-accent mr-2"
              >
                {sidebarOpen && isMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              {searchResult ? null : (
                <div className="text-xl font-semibold text-[#9b87f5] hidden sm:block">
                  Curious Search Buddy
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
            
            <ThemeToggle className="hover:bg-accent" />
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center">
          {!searchResult ? (
            <div className="flex flex-col items-center justify-center max-w-3xl w-full mx-auto mt-10">
              <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                Curious Search Buddy
              </h1>
              <p className="text-lg text-center text-gray-300 dark:text-gray-300 max-w-md mb-8">
                Your AI-powered search companion. Ask anything and get comprehensive answers with sources.
              </p>
              
              {showVoiceInput ? (
                <VoiceSearchInput onTranscription={handleVoiceTranscription} />
              ) : showFileUpload ? (
                <FileUploadInput onFileContent={handleFileContent} />
              ) : (
                <div className="w-full max-w-2xl">
                  <SearchBar 
                    onSearch={handleSearch} 
                    isSearching={isSearching}
                    onVoiceSearchClick={toggleVoiceInput}
                    onFileUploadClick={toggleFileUpload}
                  />
                  
                  <div className="flex justify-center mt-6 space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-full bg-transparent border border-white/20 hover:bg-white/10"
                      onClick={() => handleSearchTypeChange("web")}
                    >
                      <CuriousSearchBuddyIcon className="h-5 w-5" />
                      <span className="sr-only">Web Search</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-full bg-transparent border border-white/20 hover:bg-white/10"
                      onClick={() => handleSearchTypeChange("chat")}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="sr-only">Chat</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-full bg-transparent border border-white/20 hover:bg-white/10"
                      onClick={() => handleSearchTypeChange("image")}
                    >
                      <Image className="h-5 w-5" />
                      <span className="sr-only">Images</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-full bg-transparent border border-white/20 hover:bg-white/10"
                      onClick={() => handleSearchTypeChange("video")}
                    >
                      <Video className="h-5 w-5" />
                      <span className="sr-only">Videos</span>
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <CustomSearchModelSelector
                  selectedModel={searchModel}
                  selectedDomain={searchDomain}
                  onModelChange={handleSearchModelChange}
                  onDomainChange={handleSearchDomainChange}
                />
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("What is Perplexity AI")}
                  className="bg-transparent border border-white/20 hover:bg-white/10 text-foreground"
                >
                  What is Perplexity AI
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("How to learn programming")}
                  className="bg-transparent border border-white/20 hover:bg-white/10 text-foreground"
                >
                  How to learn programming
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("What is React")}
                  className="bg-transparent border border-white/20 hover:bg-white/10 text-foreground"
                >
                  What is React
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full">
              <div className="mb-4">
                <SearchTypeToggle 
                  activeType={searchType} 
                  onChange={handleSearchTypeChange} 
                />
              </div>
              
              <CustomSearchModelSelector
                selectedModel={searchModel}
                selectedDomain={searchDomain}
                onModelChange={handleSearchModelChange}
                onDomainChange={handleSearchDomainChange}
              />
              
              {/* Loading state or results */}
              {isSearching ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-white/10 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/10 rounded"></div>
                    <div className="h-4 bg-white/10 rounded"></div>
                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/10 rounded"></div>
                    <div className="h-4 bg-white/10 rounded w-4/6"></div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <ResultCard result={searchResult} />
                </div>
              )}
            </div>
          )}
          
          <div className="mt-auto text-xs text-center text-gray-500 py-4">
            Curious Search Buddy © {new Date().getFullYear()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
