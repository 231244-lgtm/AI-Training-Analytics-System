import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import FeedbackCard from "../components/FeedbackCard";

import "../styles/Feedback.css";

function Feedback() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="feedback-page">

          <div className="feedback-header">

            <h1>Training Feedback</h1>

            <p>
              Review trainee feedback, satisfaction scores,
              and AI-powered sentiment analysis.
            </p>

          </div>

          <div className="analytics-cards">

            <AnalyticsCard
              title="Average Rating"
              value="4.8"
              subtitle="Excellent"
            />

            <AnalyticsCard
              title="Positive Feedback"
              value="82%"
              subtitle="Most responses"
            />

            <AnalyticsCard
              title="Negative Feedback"
              value="4%"
              subtitle="Needs attention"
            />

          </div>

          <div className="feedback-list">

            <FeedbackCard
              trainer="Ayesha Khan"
              rating="⭐⭐⭐⭐⭐"
              comment="Excellent communication and engaging teaching style."
              sentiment="Positive"
            />

            <FeedbackCard
              trainer="Bilal Ahmed"
              rating="⭐⭐⭐⭐"
              comment="Very informative session with practical examples."
              sentiment="Positive"
            />

            <FeedbackCard
              trainer="Fatima Noor"
              rating="⭐⭐⭐"
              comment="More hands-on activities would improve learning."
              sentiment="Neutral"
            />

            <FeedbackCard
              trainer="Ali Hassan"
              rating="⭐⭐"
              comment="Training pace was too fast for beginners."
              sentiment="Negative"
            />

          </div>

          <div className="ai-summary">

            <h2>🤖 AI Sentiment Summary</h2>

            <div className="summary-grid">

              <div className="summary-card">
                <h3>Positive</h3>
                <h1>82%</h1>
                <p>Majority of participants were satisfied.</p>
              </div>

              <div className="summary-card">
                <h3>Neutral</h3>
                <h1>14%</h1>
                <p>Minor improvements suggested.</p>
              </div>

              <div className="summary-card">
                <h3>Negative</h3>
                <h1>4%</h1>
                <p>Very few complaints received.</p>
              </div>

              <div className="summary-card">
                <h3>AI Recommendation</h3>
                <h1>Improve Practical Sessions</h1>
                <p>
                  Increase hands-on activities and interactive learning
                  to improve overall satisfaction.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Feedback;