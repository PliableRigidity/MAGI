# models.py

import json
from pathlib import Path

import requests

from config import OLLAMA_CHAT_URL, TIMEOUT_SECONDS, KEEP_ALIVE


def load_prompt(prompt_path: str) -> str:
    """Load a system prompt from a text file."""
    return Path(prompt_path).read_text(encoding="utf-8").strip()


def build_schema() -> dict:
    """Return the JSON schema the model should follow."""
    return {
        "type": "object",
        "properties": {
            "vote": {
                "type": "string",
                "enum": ["YES", "NO", "ABSTAIN"]
            },
            "confidence": {
                "type": "integer",
                "minimum": 0,
                "maximum": 100
            },
            "reason": {
                "type": "string"
            },
            "risk": {
                "type": "string"
            },
            "next_action": {
                "type": "string"
            }
        },
        "required": ["vote", "confidence", "reason", "risk", "next_action"]
    }


def build_user_message(decision: dict) -> str:
    """Convert the decision packet into a readable user message."""
    problem = decision["problem"]
    goal = decision["goal"]
    constraints = "\n".join(f"- {item}" for item in decision["constraints"])
    options = "\n".join(f"- {item}" for item in decision["options"])

    return f"""
Evaluate this decision.

Problem:
{problem}

Goal:
{goal}

Constraints:
{constraints}

Options:
{options}

Return only valid JSON.
""".strip()


def ask_ollama(model_name: str, system_prompt: str, decision: dict) -> dict:
    """
    Send one decision request to one Ollama model and return parsed JSON.
    """
    payload = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": build_user_message(decision)}
        ],
        "stream": False,
        "keep_alive": KEEP_ALIVE,
        "format": build_schema(),
    }

    response = requests.post(
        OLLAMA_CHAT_URL,
        json=payload,
        timeout=TIMEOUT_SECONDS
    )
    response.raise_for_status()

    data = response.json()

    # Ollama chat responses usually come back under:
    # data["message"]["content"]
    content = data["message"]["content"]

    try:
        parsed = json.loads(content)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Model did not return valid JSON:\n{content}") from exc

    return parsed