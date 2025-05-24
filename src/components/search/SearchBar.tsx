
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, FileUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  defaultQuery?: string;
  onVoiceSearchClick?: () => void;
  onFileUploadClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isSearching,
  defaultQuery = "",
  onVoiceSearchClick,
  onFileUploadClick
}) => {
  const [query, setQuery] = useState(defaultQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (defaultQuery) {
      setQuery(defaultQuery);
    }
  }, [defaultQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isSearching) {
      onSearch(query.trim());
    }
  };

  useEffect(() => {
    // Focus the input when the component mounts (but not on mobile to avoid keyboard popup)
    if (inputRef.current && !defaultQuery && !isMobile) {
      inputRef.current.focus();
    }
  }, [defaultQuery, isMobile]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask anything..."
          className={`
            pl-10 md:pl-12 
            ${isMobile ? 'pr-20 py-4 text-sm' : 'pr-36 py-6 text-base'} 
            rounded-full border-2 border-border 
            focus:border-perplexity-400 focus-visible:ring-perplexity-400
            bg-white/5 backdrop-blur-sm
            transition-all duration-300 hover:bg-white/10
          `}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        
        {/* Action buttons - Mobile optimized */}
        <div className={`absolute ${isMobile ? 'right-12' : 'right-20'} top-1/2 transform -translate-y-1/2 flex gap-1`}>
          {onVoiceSearchClick && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onVoiceSearchClick}
              className={`text-gray-400 hover:text-perplexity-600 hover:bg-transparent ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`}
            >
              <Mic className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              <span className="sr-only">Voice Search</span>
            </Button>
          )}
          {onFileUploadClick && !isMobile && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onFileUploadClick}
              className="text-gray-400 hover:text-perplexity-600 hover:bg-transparent h-10 w-10"
            >
              <FileUp className="h-5 w-5" />
              <span className="sr-only">Upload File</span>
            </Button>
          )}
        </div>
        
        <Button
          type="submit"
          size={isMobile ? "sm" : "default"}
          disabled={!query.trim() || isSearching}
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2 
            bg-perplexity-600 hover:bg-perplexity-700 text-white rounded-full
            ${isMobile ? 'px-3 h-8 text-xs' : 'px-4 h-10 text-sm'}
            transition-all duration-300 hover:scale-105
          `}
        >
          {isSearching ? (
            <div className="flex items-center">
              <div className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} border-2 border-white border-t-transparent rounded-full animate-spin ${!isMobile ? 'mr-2' : ''}`}></div>
              {!isMobile && <span>Searching</span>}
            </div>
          ) : (
            <div className="flex items-center">
              <span>{isMobile ? 'Go' : 'Search'}</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
