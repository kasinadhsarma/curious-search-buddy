
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, FileUp } from "lucide-react";

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
    // Focus the input when the component mounts
    if (inputRef.current && !defaultQuery) {
      inputRef.current.focus();
    }
  }, [defaultQuery]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask anything..."
          className="pl-12 pr-36 py-6 text-base rounded-full border-2 border-border focus:border-perplexity-400 focus-visible:ring-perplexity-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 flex gap-2">
          {onVoiceSearchClick && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onVoiceSearchClick}
              className="text-gray-400 hover:text-perplexity-600 hover:bg-transparent"
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">Voice Search</span>
            </Button>
          )}
          {onFileUploadClick && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onFileUploadClick}
              className="text-gray-400 hover:text-perplexity-600 hover:bg-transparent"
            >
              <FileUp className="h-5 w-5" />
              <span className="sr-only">Upload File</span>
            </Button>
          )}
        </div>
        <Button
          type="submit"
          size="sm"
          disabled={!query.trim() || isSearching}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-perplexity-600 hover:bg-perplexity-700 text-white rounded-full px-4"
        >
          {isSearching ? (
            <div className="flex items-center">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Searching</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span>Search</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
