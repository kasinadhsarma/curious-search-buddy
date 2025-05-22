from fastapi import FastAPI
from backend.api import search_routes  # Import the new router

app = FastAPI(title="Search AI Backend")

# Include the search API router
app.include_router(search_routes.router, prefix="/api/v1")

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Simple health check endpoint.
    """
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
