
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  defaultQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching, defaultQuery = "" }) => {
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
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask anything..."
          className="pr-24 pl-4 py-6 text-base rounded-full border-2 border-border focus:border-perplexity-400 focus-visible:ring-perplexity-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
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
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
