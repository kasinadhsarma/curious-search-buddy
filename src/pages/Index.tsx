
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar, { SearchHistoryItem } from "@/components/layout/Sidebar";
import SearchBar from "@/components/search/SearchBar";
import ResultCard from "@/components/search/ResultCard";
import SearchTypeToggle, { SearchType } from "@/components/search/SearchTypeToggle";
import SearchModelSelector, { SearchModel, SearchDomain } from "@/components/search/SearchModelSelector";
import VoiceSearchInput from "@/components/search/VoiceSearchInput";
import FileUploadInput from "@/components/search/FileUploadInput";
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
  }, []);

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
        <header className="sticky top-0 z-10 w-full bg-background border-b p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 flex justify-center">
              {searchResult ? (
                <SearchBar 
                  onSearch={handleSearch} 
                  isSearching={isSearching} 
                  defaultQuery={currentQuery}
                />
              ) : (
                <div className="text-xl font-semibold text-perplexity-600">
                  Curious Search Buddy
                </div>
              )}
            </div>
            
            <div className="w-10"> {/* Empty div for alignment */}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4 md:p-8">
          {!searchResult ? (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-perplexity-500 to-perplexity-700 bg-clip-text text-transparent">
                Curious Search Buddy
              </h1>
              <p className="text-lg text-center text-muted-foreground max-w-md mb-8">
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
                  />
                  
                  <div className="flex justify-center mt-2 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleVoiceInput}
                    >
                      Voice Search
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={toggleFileUpload}
                    >
                      Upload File
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <SearchTypeToggle 
                  activeType={searchType} 
                  onChange={handleSearchTypeChange} 
                />
              </div>
              
              <SearchModelSelector
                selectedModel={searchModel}
                selectedDomain={searchDomain}
                onModelChange={handleSearchModelChange}
                onDomainChange={handleSearchDomainChange}
              />
              
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("What is Perplexity AI")}
                  className="m-1"
                >
                  What is Perplexity AI
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("How to learn programming")}
                  className="m-1"
                >
                  How to learn programming
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSearch("What is React")}
                  className="m-1"
                >
                  What is React
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="mb-4">
                <SearchTypeToggle 
                  activeType={searchType} 
                  onChange={handleSearchTypeChange} 
                />
              </div>
              
              <SearchModelSelector
                selectedModel={searchModel}
                selectedDomain={searchDomain}
                onModelChange={handleSearchModelChange}
                onDomainChange={handleSearchDomainChange}
              />
              
              {/* Loading state or results */}
              {isSearching ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <ResultCard result={searchResult} />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
