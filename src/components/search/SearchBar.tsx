
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, FileUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  defaultQuery?: string;
  onToggleVoiceInput?: () => void;
  onToggleFileUpload?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  isSearching, 
  defaultQuery = "",
  onToggleVoiceInput,
  onToggleFileUpload
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
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-lg">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask anything..."
          className="pr-36 pl-4 py-6 text-base rounded-xl bg-transparent border-none focus-visible:ring-0 text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {onToggleVoiceInput && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={onToggleVoiceInput}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
          
          {onToggleFileUpload && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={onToggleFileUpload}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            >
              <FileUp className="h-5 w-5" />
            </Button>
          )}
          
          <Button
            type="submit"
            size="sm"
            disabled={!query.trim() || isSearching}
            className="bg-[#33C3F0] hover:bg-[#33C3F0]/80 text-white rounded-lg px-4"
          >
            {isSearching ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Searching</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                <span>Search</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
