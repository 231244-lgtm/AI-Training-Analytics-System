import "../styles/FeedbackCard.css";

function FeedbackCard({ trainer, rating, comment, sentiment }) {
  return (
    <div className="feedback-card">

      <div className="feedback-header">
        <h3>{trainer}</h3>
        <span>{rating}</span>
      </div>

      <p className="feedback-comment">
        {comment}
      </p>

      <span className={`sentiment ${sentiment.toLowerCase()}`}>
        {sentiment}
      </span>

    </div>
  );
}

export default FeedbackCard;