import "../styles/AnalyticsCard.css";

function AnalyticsCard({ title, value, subtitle }) {
  return (
    <div className="analytics-card">

      <h4>{title}</h4>

      <h2>{value}</h2>

      <p>{subtitle}</p>

    </div>
  );
}

export default AnalyticsCard;