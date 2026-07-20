import "../styles/StatCard.css";

function StatCard({ title, value, change, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span className="stat-change">
          {change}
        </span>

      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default StatCard;