# config.py

OLLAMA_BASE_URL = "http://localhost:11434"
OLLAMA_CHAT_URL = f"{OLLAMA_BASE_URL}/api/chat"

# Start with just one model first
SARASWATI = "phi4-mini-reasoning:latest" #logical model: Scientist 
LAKSHMI = "gemma2:2b" #emotional model: Mother
DURGA = "qwen2.5:3b" #intuitive model: Woman
VIVEKA = "phi3:mini" ##Chair
# Request settings
TIMEOUT_SECONDS = 120
KEEP_ALIVE = -1  # keep model loaded in memory

# Output schema you want the model to follow
VOTE_OPTIONS = {"YES", "NO", "ABSTAIN"}

# Simple test decision packet
TEST_DECISION = {
    "problem": "I have two project ideas and only one week.",
    "goal": "Choose the one with the best short-term payoff.",
    "constraints": [
        "Limited time",
        "Limited budget",
        "Need something achievable"
    ],
    "options": [
        "Build a small robotics prototype",
        "Build a polished UI demo"
    ]
}