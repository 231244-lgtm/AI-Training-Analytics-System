import {
  FaUserTie,
  FaSmile,
  FaShieldAlt,
  FaLightbulb,
  FaBrain,
} from "react-icons/fa";

import "../styles/InsightCard.css";

function InsightCard() {
  return (
    <div className="insight-card">

      <div className="insight-title">
        <div className="insight-heading">
          <div className="insight-main-icon">
            <FaBrain />
          </div>

          <div>
            <h3>AI Insights</h3>
            <p>Latest analysis summary</p>
          </div>
        </div>

        <span className="insight-status">
          <span className="status-dot"></span>
          Ready for analysis
        </span>
      </div>

      <div className="insight-box">

        <div className="insight-icon trainer-icon">
          <FaUserTie />
        </div>

        <div>
          <span>Top Trainer</span>
          <h4>Ayesha Khan</h4>
        </div>

      </div>

      <div className="insight-box">

        <div className="insight-icon satisfaction-icon">
          <FaSmile />
        </div>

        <div>
          <span>Satisfaction</span>
          <h4>96%</h4>
        </div>

      </div>

      <div className="insight-box">

        <div className="insight-icon risk-icon">
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

          <div>
            <span>AI Recommendation</span>
            <h4>Recommended Action</h4>
          </div>
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