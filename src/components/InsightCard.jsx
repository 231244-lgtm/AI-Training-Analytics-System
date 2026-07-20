import {
  FaUserTie,
  FaSmile,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

import "../styles/InsightCard.css";

function InsightCard() {
  return (
    <div className="insight-card">

      <div className="insight-title">
        <h3>🤖 AI Insights</h3>
        <p>Latest analysis summary</p>
      </div>

      <div className="insight-box">

        <div className="insight-icon">
          <FaUserTie />
        </div>

        <div>
          <span>Top Trainer</span>
          <h4>Ayesha Khan</h4>
        </div>

      </div>

      <div className="insight-box">

        <div className="insight-icon">
          <FaSmile />
        </div>

        <div>
          <span>Satisfaction</span>
          <h4>96%</h4>
        </div>

      </div>

      <div className="insight-box">

        <div className="insight-icon">
          <FaShieldAlt />
        </div>

        <div>
          <span>Risk Level</span>
          <h4>Low</h4>
        </div>

      </div>

      <div className="recommendation">

        <div className="recommendation-header">
          <FaLightbulb />
          <h4>AI Recommendation</h4>
        </div>

        <p>
          Based on current performance trends, Ayesha Khan is recommended
          for advanced leadership and STEM training programs.
        </p>

      </div>

    </div>
  );
}

export default InsightCard;