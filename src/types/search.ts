
import { SearchType } from "@/components/search/SearchTypeToggle";

export interface Source {
  title: string;
  url: string;
}

export interface SearchResult {
  query: string;
  content: string;
  sources: Source[];
  timestamp: Date;
  searchType?: SearchType; // Added to track what type of search was performed
}
