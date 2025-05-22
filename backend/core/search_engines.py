import os
import requests
from dotenv import load_dotenv
from typing import List, Optional # Dict removed
from pydantic import BaseModel # Added as per instruction
import asyncio # Added as per instruction

# Load environment variables from .env file, if present
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_CSE_ID = os.getenv("GOOGLE_CSE_ID")

class Source(BaseModel): # Renamed from SearchResultItem, inherits from BaseModel
    title: str
    url: str # 'link' in google search, 'url' in our model

async def google_search(query: str, num_results: int = 5) -> Optional[List[Source]]: # Uses Source, is async
    """
    Performs a Google Custom Search and returns a list of search result items.
    Requires GOOGLE_API_KEY and GOOGLE_CSE_ID environment variables.
    """
    if not GOOGLE_API_KEY or not GOOGLE_CSE_ID:
        print("Error: GOOGLE_API_KEY or GOOGLE_CSE_ID environment variables not set.")
        return None

    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": query,
        "num": num_results,
    }

    try:
        # For an async function, consider using an async HTTP client like httpx in a real app
        # Using 'requests' here for simplicity as per earlier implications
        response = requests.get(search_url, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4XX or 5XX)
        search_results = response.json()

        items = []
        if "items" in search_results:
            for item in search_results["items"]:
                title = item.get("title")
                link = item.get("link")
                # Ensure title and link are not None and are strings before passing to Pydantic model
                if isinstance(title, str) and isinstance(link, str):
                    items.append(Source(title=title, url=link))
                else:
                    # Optionally handle cases where title or link might be missing or not strings
                    print(f"Warning: Missing or invalid title/link in search result item: {item}")
        return items
    except requests.exceptions.RequestException as e:
        print(f"Error during Google Search API request: {e}")
        return None
    except KeyError as e:
        print(f"Error parsing Google Search API response: {e}") # Should be less likely with .get()
        return None
    except Exception as e: # Catch any other unexpected errors
        print(f"An unexpected error occurred during google_search: {e}")
        return None

# Example usage (for testing this module directly)
if __name__ == "__main__":
    async def main(): # main needs to be async to await google_search
        if not GOOGLE_API_KEY or not GOOGLE_CSE_ID:
            print("Please set GOOGLE_API_KEY and GOOGLE_CSE_ID environment variables to test.")
            print("You can copy backend/.env.example to backend/.env and fill in your keys.")
        else:
            test_query = "FastAPI benefits"
            print(f"Testing Google Search with query: '{test_query}'")
            results = await google_search(test_query) # Call async function with await
            if results:
                for result in results:
                    print(f"- {result.title}: {result.url}")
            else:
                print("No results found or error occurred.")
    
    asyncio.run(main()) # Run the async main function
