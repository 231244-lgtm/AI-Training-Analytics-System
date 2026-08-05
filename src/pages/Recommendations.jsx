import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import RecommendationCard from "../components/RecommendationCard";

import "../styles/Recommendations.css";

function Recommendations() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="recommendations-page">

          <div className="recommendations-header">

            <h1>🤖 AI Recommendation Engine</h1>

            <p>
              AI-generated recommendations based on trainer performance,
              trainee feedback, and analytics.
            </p>

          </div>

          <div className="analytics-cards">

            <AnalyticsCard
              title="AI Status"
              value="Active"
              subtitle="System Running"
            />

            <AnalyticsCard
              title="Recommendations"
              value="12"
              subtitle="Generated Today"
            />

            <AnalyticsCard
              title="AI Confidence"
              value="96%"
              subtitle="Prediction Accuracy"
            />

          </div>

          <div className="recommendation-grid">

            <RecommendationCard
              priority="High"
              title="Advanced STEM Leadership Training"
              trainer="Ayesha Khan"
              reason="Outstanding performance and consistently high trainee satisfaction scores."
              confidence="97"
            />

            <RecommendationCard
              priority="Medium"
              title="Interactive Teaching Workshop"
              trainer="Bilal Ahmed"
              reason="Increase classroom interaction to improve engagement and participation."
              confidence="88"
            />

            <RecommendationCard
              priority="High"
              title="Communication Skills Training"
              trainer="Ali Hassan"
              reason="Lower trainee satisfaction indicates communication improvements are needed."
              confidence="95"
            />

          </div>

          <div className="ai-summary">

            <h2>🧠 AI Insights</h2>

            <div className="summary-grid">

              <div className="summary-card">
                <h3>Priority Cases</h3>
                <h1>3</h1>
                <p>Three trainers require immediate attention.</p>
              </div>

              <div className="summary-card">
                <h3>Top Department</h3>
                <h1>STEM</h1>
                <p>Consistently leading in trainer performance.</p>
              </div>

              <div className="summary-card">
                <h3>Best Trainer</h3>
                <h1>Ayesha Khan</h1>
                <p>Highest overall rating and trainee satisfaction.</p>
              </div>

              <div className="summary-card">
                <h3>AI Suggestion</h3>
                <h1>Expand STEM Workshops</h1>
                <p>
                  Allocate more advanced training opportunities to STEM
                  trainers based on current performance trends.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Recommendations;