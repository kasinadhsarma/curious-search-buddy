
import { SearchType } from "@/components/search/SearchTypeToggle";
import { SearchModel, SearchDomain } from "@/components/search/SearchModelSelector";

export interface Source {
  title: string;
  url: string;
}

export interface SearchResult {
  query: string;
  content: string;
  sources: Source[];
  timestamp: Date;
  searchType?: SearchType;
  searchModel?: SearchModel;
  searchDomain?: SearchDomain;
  fileContent?: {
    filename: string;
    content: string;
  };
}
