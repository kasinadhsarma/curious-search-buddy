
export interface Source {
  title: string;
  url: string;
  snippet?: string;
}

export interface SearchResult {
  id: string;
  query: string;
  content: string;
  sources: Source[];
  timestamp: Date;
}
