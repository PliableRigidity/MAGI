# main.py

from config import LOGICAL_MODEL, TEST_DECISION
from models import ask_ollama, load_prompt


def main() -> None:
    system_prompt = load_prompt("prompts/logical.txt")

    result = ask_ollama(
        model_name=LOGICAL_MODEL,
        system_prompt=system_prompt,
        decision=TEST_DECISION,
    )

    print("Model result:")
    print(result)


if __name__ == "__main__":
    main()