export default function ActionsList({ actions }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Candidate Actions</h2>
      </div>
      <div className="action-grid">
        {actions.map((action) => (
          <article className="action-card" key={action.id}>
            <p className="action-id">{action.id}</p>
            <h3>{action.title}</h3>
            <p>{action.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
