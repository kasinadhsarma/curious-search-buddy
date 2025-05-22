# AI Search Backend

This backend service provides AI-powered search capabilities by integrating with Google Search and an OpenAI language model. It's built with FastAPI.

## Setup

### 1. Python Environment

It's recommended to use a Python virtual environment.

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment (e.g., named .venv)
python -m venv .venv

# Activate the virtual environment
# On macOS and Linux:
source .venv/bin/activate
# On Windows:
# .venv\Scripts\activate
```

### 2. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

This service requires API keys for Google Custom Search and OpenAI.

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Edit the `.env` file and add your actual API keys:

    ```dotenv
    GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"
    GOOGLE_CSE_ID="YOUR_GOOGLE_CSE_ID_HERE" # Your Google Custom Search Engine ID
    OPENAI_API_KEY="YOUR_OPENAI_API_KEY_HERE"
    ```

    *   **GOOGLE_API_KEY**: You can get this from the [Google Cloud Console](https://console.cloud.google.com/). You'll need to enable the "Custom Search API".
    *   **GOOGLE_CSE_ID**: You can get this after creating a Custom Search Engine [here](https://programmablesearchengine.google.com/). Make sure it's configured to search the entire web or the sites you need.
    *   **OPENAI_API_KEY**: You can get this from your [OpenAI Dashboard](https://platform.openai.com/account/api-keys).

**Important**: Keep your `.env` file secure and do not commit it to version control.

## Running the Backend Server

Once the setup is complete, you can run the FastAPI development server:

```bash
# Ensure your virtual environment is activated and you are in the backend/ directory
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will then be accessible at `http://localhost:8000`.
The main search endpoint is `POST /api/v1/search`.
A health check endpoint is available at `GET /health`.

## Frontend Integration

The existing frontend application (in the root directory) is configured to proxy requests to this backend server when run via `npm run dev` (due to `vite.config.ts` proxy settings). Ensure both the frontend and backend servers are running concurrently during development.
