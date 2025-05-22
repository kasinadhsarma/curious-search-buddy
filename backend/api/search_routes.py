from fastapi import APIRouter # HTTPException not used for now
from pydantic import BaseModel, Field
from typing import List
# Import Source model and google_search function
from backend.core.search_engines import google_search, Source 
from backend.core.llm import generate_answer_from_sources

router = APIRouter()

class SearchRequest(BaseModel):
    query: str = Field(..., description="The search query from the user.")
    # We can add other fields like searchType, searchModel later

# SearchResponse remains the same, using the imported Source model
class SearchResponse(BaseModel):
    query: str
    content: str
    sources: List[Source] # This will use the imported Source

@router.post("/search", response_model=SearchResponse, tags=["Search"])
async def search_endpoint(request: SearchRequest):
    """
    Orchestrates the search process:
    1. Fetches search results from Google.
    2. Generates an AI-synthesized answer based on the results.
    """
    search_results = await google_search(query=request.query)

    if not search_results:
        # Return a response indicating no results, but still conform to SearchResponse
        return SearchResponse(
            query=request.query,
            content="Could not retrieve search results for your query. Please try again or rephrase.",
            sources=[]
        )

    ai_content = await generate_answer_from_sources(query=request.query, sources=search_results)

    if not ai_content:
        # Return a response indicating AI failure, but include sources found
        return SearchResponse(
            query=request.query,
            content="Successfully fetched search results, but could not generate an AI-powered answer at this time.",
            sources=search_results
        )

    return SearchResponse(
        query=request.query,
        content=ai_content,
        sources=search_results
    )
