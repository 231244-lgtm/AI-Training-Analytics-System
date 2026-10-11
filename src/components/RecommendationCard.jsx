
import "../styles/RecommendationCard.css";

function RecommendationCard({
  priority,
  title,
  reason,
  evidence,
  action,
}) {
  const safePriority = ["High", "Medium", "Low"].includes(priority)
    ? priority
    : "Medium";

  return (
    <div className="recommendation-card">
      <div className={`priority ${safePriority.toLowerCase()}`}>
        {safePriority} Priority
      </div>

      <h2>{title}</h2>

      <p>{reason}</p>

      {evidence && (
        <div className="recommendation-evidence">
          <strong>Supporting evidence</strong>
          <p>{evidence}</p>
        </div>
      )}

      {action && (
        <div className="recommendation-action">
          <strong>Suggested action</strong>
          <p>{action}</p>
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
