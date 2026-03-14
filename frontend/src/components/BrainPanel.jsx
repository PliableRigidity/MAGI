export default function BrainPanel({ title, responses }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>{title}</h2>
      </div>
      <div className="brain-grid">
        {Object.values(responses).map((response) => (
          <article className="brain-card" key={response.brain_name}>
            <div className="brain-topline">
              <h3>{response.brain_name}</h3>
              <span>{response.selected_action}</span>
            </div>
            <p><strong>Confidence:</strong> {response.confidence}</p>
            <p><strong>Reason:</strong> {response.reason}</p>
            <p><strong>Risk:</strong> {response.risk}</p>
            <p><strong>Next:</strong> {response.next_action}</p>
            {"critique" in response ? <p><strong>Critique:</strong> {response.critique || "None"}</p> : null}
            {"changed_mind" in response ? (
              <p><strong>Changed mind:</strong> {response.changed_mind ? "Yes" : "No"}</p>
            ) : null}
            {response.error ? <p className="error-text">{response.error}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
