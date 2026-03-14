import { useState } from "react";
import ActionsList from "./components/ActionsList";
import BrainPanel from "./components/BrainPanel";
import DecisionForm from "./components/DecisionForm";
import FinalDecisionCard from "./components/FinalDecisionCard";
import SituationCard from "./components/SituationCard";

const API_URL = "http://localhost:8000/api/decide";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(payload) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Decision request failed.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Unknown error");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">MAGI-style Deliberation Engine</p>
        <h1>Structured local reasoning with autonomous action generation</h1>
        <p className="hero-copy">
          Describe a situation. The system models it, generates candidate actions,
          runs two rounds of agent deliberation, counts votes in Python, and lets
          VIVEKA explain the result.
        </p>
      </header>

      <DecisionForm onSubmit={handleSubmit} loading={loading} />

      {error ? <div className="error-banner">{error}</div> : null}

      {result ? (
        <main className="dashboard">
          <SituationCard situation={result.situation_model} />
          <ActionsList actions={result.actions} />
          <BrainPanel title="First Round" responses={result.first_round} />
          <BrainPanel title="Final Votes" responses={result.final_votes} />
          <FinalDecisionCard
            majorityDecision={result.majority_decision}
            voteCounts={result.vote_counts}
            chairSummary={result.chair_summary}
          />
        </main>
      ) : null}
    </div>
  );
}
