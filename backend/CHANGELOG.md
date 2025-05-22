# Changelog - AI Search Backend

## [Unreleased] - 2025-05-20

### Added

*   **Initial Backend Setup:**
    *   Initialized a FastAPI application for the AI search backend.
    *   Structured the project into `core/` for business logic and `api/` for routes.
    *   Added `requirements.txt` with dependencies: `fastapi`, `uvicorn`, `requests`, `openai`, `python-dotenv`.
*   **Core Search API Endpoint (`/api/v1/search`):**
    *   Created a POST endpoint that accepts a user query.
    *   Orchestrates calls to a search engine and an LLM to provide answers.
*   **Google Custom Search Integration:**
    *   Integrated Google Custom Search API to fetch relevant web page snippets and URLs based on the user query.
    *   Requires `GOOGLE_API_KEY` and `GOOGLE_CSE_ID` environment variables.
*   **OpenAI GPT Integration:**
    *   Integrated OpenAI API (specifically `gpt-3.5-turbo`) to generate comprehensive answers.
    *   The AI is prompted to synthesize information based *only* on the search results from Google and to cite sources.
    *   Requires `OPENAI_API_KEY` environment variable.
*   **Configuration and Documentation:**
    *   Added `.env.example` to guide environment variable setup.
    *   Created `README.md` with detailed setup, configuration, and run instructions for the backend.
*   **Error Handling:**
    *   Basic error handling for missing API keys and external API call failures.
    *   The API endpoint returns informative messages in the response body for such cases.
