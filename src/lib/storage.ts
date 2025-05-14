
import { SearchResult } from "@/types/search";
import { SearchHistoryItem } from "@/components/layout/Sidebar";

const SEARCH_HISTORY_KEY = "curious_search_history";
const SEARCH_RESULTS_KEY = "curious_search_results";

// Search History Functions
export const getSearchHistory = (): SearchHistoryItem[] => {
  try {
    const historyString = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!historyString) return [];
    return JSON.parse(historyString);
  } catch (error) {
    console.error("Failed to load search history:", error);
    return [];
  }
};

export const addSearchToHistory = (query: string): SearchHistoryItem => {
  try {
    const history = getSearchHistory();
    
    // Check if this query already exists in history
    const existingIndex = history.findIndex(
      (item) => item.query.toLowerCase() === query.toLowerCase()
    );
    
    // If exists, remove it (to add it back at the top)
    if (existingIndex >= 0) {
      history.splice(existingIndex, 1);
    }
    
    // Create new history item
    const newItem = {
      id: Date.now().toString(),
      query,
      timestamp: new Date(),
    };
    
    // Add to beginning of history array (most recent first)
    const updatedHistory = [newItem, ...history].slice(0, 20); // Keep only 20 most recent
    
    // Save to localStorage
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    
    return newItem;
  } catch (error) {
    console.error("Failed to add search to history:", error);
    return {
      id: Date.now().toString(),
      query,
      timestamp: new Date(),
    };
  }
};

// Search Results Functions
export const getSearchResults = (): SearchResult[] => {
  try {
    const resultsString = localStorage.getItem(SEARCH_RESULTS_KEY);
    if (!resultsString) return [];
    
    const results = JSON.parse(resultsString);
    
    // Convert string dates back to Date objects
    return results.map((result: any) => ({
      ...result,
      timestamp: new Date(result.timestamp),
    }));
  } catch (error) {
    console.error("Failed to load search results:", error);
    return [];
  }
};

export const addSearchResult = (result: SearchResult): void => {
  try {
    const results = getSearchResults();
    
    // Check if result for this query already exists
    const existingIndex = results.findIndex(
      (r) => r.query.toLowerCase() === result.query.toLowerCase()
    );
    
    // If exists, remove it
    if (existingIndex >= 0) {
      results.splice(existingIndex, 1);
    }
    
    // Add new result to beginning
    const updatedResults = [result, ...results].slice(0, 20); // Keep only 20 most recent
    
    // Save to localStorage
    localStorage.setItem(SEARCH_RESULTS_KEY, JSON.stringify(updatedResults));
  } catch (error) {
    console.error("Failed to add search result:", error);
  }
};

export const getSearchResultByQuery = (query: string): SearchResult | undefined => {
  try {
    const results = getSearchResults();
    return results.find(
      (r) => r.query.toLowerCase() === query.toLowerCase()
    );
  } catch (error) {
    console.error("Failed to get search result by query:", error);
    return undefined;
  }
};
