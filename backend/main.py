from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.orchestrator import run_pipeline
from backend.schemas import FinalDecision, RawUserInput

app = FastAPI(title="MAGI Decision Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/decide", response_model=FinalDecision)
def decide(payload: RawUserInput) -> FinalDecision:
    try:
        return run_pipeline(payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
