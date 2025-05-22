import os
import openai # Corrected import
from dotenv import load_dotenv
from typing import List, Optional
from backend.core.search_engines import Source # Assuming Source is defined here

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Note: Client initialization is now within the function as per refined instructions.

async def generate_answer_from_sources(query: str, sources: List[Source]) -> Optional[str]:
    """
    Generates an answer to a query using OpenAI's GPT model, based on provided search sources.
    Requires OPENAI_API_KEY environment variable.
    """
    if not OPENAI_API_KEY:
        print("Error: OPENAI_API_KEY environment variable not set.")
        return None
    
    client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)

    if not sources:
        # Return a specific message if no sources are found to provide an answer.
        return "I couldn't find any specific information on that topic using the available search results. Please try a different query or broaden your search terms."

    formatted_sources = "\n\n".join(
        [f"Source [{idx+1}] Title: {s.title}\nURL: {s.url}" for idx, s in enumerate(sources)]
    )

    system_prompt = (
        "You are an AI assistant that answers user queries based *only* on the provided sources. "
        "Do not use any external knowledge. "
        "Synthesize the information from the sources into a coherent answer. "
        "Clearly cite the sources used for different parts of your answer using their number, e.g., [Source 1], [Source 2]. "
        "If the provided sources do not contain enough information to answer the query, you must explicitly state that the provided sources do not offer an answer. Do not try to infer or make up information."
    )
    
    user_prompt = (
        f"Here are the search results:\n\n{formatted_sources}\n\n"
        f"Based *only* on these sources, please answer the following query: '{query}'"
    )

    try:
        completion = await client.chat.completions.create(
            model="gpt-3.5-turbo", # A common and effective model
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.2,  # Lower temperature for more factual, less creative responses
            max_tokens=1500   # Max tokens for the generated answer
        )
        if completion.choices and completion.choices[0].message and completion.choices[0].message.content:
            return completion.choices[0].message.content.strip()
        else:
            # This case might indicate an issue with the response structure or an empty message
            print("Error: No response content or unexpected response structure from OpenAI.")
            return "Error: Could not retrieve a valid response from the AI model."
    except openai.APIError as e:
        print(f"OpenAI API Error: {e}")
        return f"An error occurred while communicating with the AI model: {e}"
    except Exception as e: # Catch any other unexpected errors
        print(f"An unexpected error occurred in generate_answer_from_sources: {e}")
        return "An unexpected error occurred while attempting to generate an answer."


if __name__ == "__main__":
    import asyncio
    
    # This example requires API keys and the Source object definition to run.
    async def main():
        if not OPENAI_API_KEY:
            print("Please set the OPENAI_API_KEY environment variable to test the OpenAI integration.")
            print("You can copy backend/.env.example to backend/.env and fill in your keys.")
            return

        print("Testing OpenAI integration (generate_answer_from_sources)...")
        
        # Create dummy/mock Source objects for testing
        # Ensure this matches the Source Pydantic model structure in search_engines.py
        dummy_sources = [
            Source(title="FastAPI Official Documentation Overview", url="https://fastapi.tiangolo.com/"),
            Source(title="Python Language Official Website", url="https://www.python.org/"),
            Source(title="Uvicorn ASGI Server Homepage", url="https://www.uvicorn.org/")
        ]
        
        test_query_1 = "What are the main features of FastAPI according to its documentation?"
        print(f"\nTest Query 1: {test_query_1}")
        answer_1 = await generate_answer_from_sources(test_query_1, dummy_sources)
        if answer_1:
            print(f"Answer 1:\n{answer_1}")
        else:
            print("Failed to get an answer for Test Query 1.")

        test_query_2 = "Does uvicorn support type hints?" # This might not be in the dummy sources
        print(f"\nTest Query 2: {test_query_2}")
        answer_2 = await generate_answer_from_sources(test_query_2, dummy_sources)
        if answer_2:
            print(f"Answer 2:\n{answer_2}")
        else:
            print("Failed to get an answer for Test Query 2.")

        test_query_3 = "What is the capital of France?" # This should not be answerable from sources
        print(f"\nTest Query 3: {test_query_3}")
        answer_3 = await generate_answer_from_sources(test_query_3, dummy_sources)
        if answer_3:
            print(f"Answer 3:\n{answer_3}")
        else:
            print("Failed to get an answer for Test Query 3.")
            
        print("\nTesting with no sources:")
        answer_no_sources = await generate_answer_from_sources("Any query", [])
        if answer_no_sources:
            print(f"Answer (no sources):\n{answer_no_sources}")
        else:
            print("Failed to get an answer when no sources are provided.")

    asyncio.run(main())
