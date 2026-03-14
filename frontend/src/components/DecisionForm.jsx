import { useState } from "react";

export default function DecisionForm({ onSubmit, loading }) {
  const [problem, setProblem] = useState("");
  const [goal, setGoal] = useState("");
  const [constraints, setConstraints] = useState("");

  function submit(event) {
    event.preventDefault();
    onSubmit({
      problem,
      goal,
      constraints: constraints
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  }

  return (
    <form className="panel form-panel" onSubmit={submit}>
      <div className="panel-header">
        <h2>Decision Input</h2>
      </div>

      <label>
        Situation
        <textarea
          value={problem}
          onChange={(event) => setProblem(event.target.value)}
          placeholder="Describe the problem or situation."
          rows={5}
          required
        />
      </label>

      <label>
        Goal
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Optional desired outcome"
        />
      </label>

      <label>
        Constraints
        <textarea
          value={constraints}
          onChange={(event) => setConstraints(event.target.value)}
          placeholder="One constraint per line"
          rows={4}
        />
      </label>

      <button type="submit" disabled={loading || !problem.trim()}>
        {loading ? "Running deliberation..." : "Run decision engine"}
      </button>
    </form>
  );
}
