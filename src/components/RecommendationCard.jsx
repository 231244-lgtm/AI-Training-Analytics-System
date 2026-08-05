import "../styles/RecommendationCard.css";

function RecommendationCard({
  priority,
  title,
  trainer,
  reason,
  confidence,
}) {
  return (
    <div className="recommendation-card">

      <div className={`priority ${priority.toLowerCase()}`}>
        {priority} Priority
      </div>

      <h2>{title}</h2>

      <h3>{trainer}</h3>

      <p>{reason}</p>

      <div className="confidence">

        <span>AI Confidence</span>

        <strong>{confidence}%</strong>

      </div>

      <button>Approve Recommendation</button>

    </div>
  );
}

export default RecommendationCard;