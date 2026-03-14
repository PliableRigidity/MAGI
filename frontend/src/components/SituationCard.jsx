export default function SituationCard({ situation }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Situation Model</h2>
      </div>
      <p><strong>Summary:</strong> {situation.problem_summary}</p>
      <p><strong>Goal:</strong> {situation.goal || "Not specified"}</p>
      <ListBlock title="Constraints" items={situation.constraints} />
      <ListBlock title="Risks" items={situation.risks} />
      <ListBlock title="Unknowns" items={situation.unknowns} />
    </section>
  );
}

function ListBlock({ title, items }) {
  return (
    <div className="list-block">
      <h3>{title}</h3>
      <ul>
        {items.length ? items.map((item) => <li key={item}>{item}</li>) : <li>None</li>}
      </ul>
    </div>
  );
}
