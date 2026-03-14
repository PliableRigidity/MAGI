export default function FinalDecisionCard({ majorityDecision, voteCounts, chairSummary }) {
  return (
    <section className="panel final-panel">
      <div className="panel-header">
        <h2>Final Decision</h2>
      </div>
      <p className="decision-pill">{majorityDecision}</p>

      <div className="vote-counts">
        {Object.entries(voteCounts).map(([key, value]) => (
          <div className="vote-chip" key={key}>
            <span>{key}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="chair-summary">
        <h3>VIVEKA Summary</h3>
        <p><strong>Dominant reasoning:</strong> {chairSummary.dominant_reasoning}</p>
        <p><strong>Summary:</strong> {chairSummary.summary}</p>
        <p><strong>Recommended action:</strong> {chairSummary.recommended_action}</p>
      </div>
    </section>
  );
}
