import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import PerformanceChart from "../components/PerformanceChart";
import TrainerBarChart from "../components/TrainerBarChart";
import DepartmentPieChart from "../components/DepartmentPieChart";

import "../styles/Analytics.css";

function Analytics() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="analytics-page">

          <div className="analytics-header">
            <h1>Training Analytics</h1>

            <p>
              Analyze trainer performance, department statistics,
              and overall training outcomes.
            </p>
          </div>

          <div className="analytics-cards">
            <AnalyticsCard
              title="Average Rating"
              value="4.8"
              subtitle="+0.3 this month"
            />

            <AnalyticsCard
              title="Completion Rate"
              value="96%"
              subtitle="+5%"
            />

            <AnalyticsCard
              title="Top Department"
              value="STEM"
              subtitle="Highest Performance"
            />
          </div>

          <PerformanceChart />

          <div className="chart-grid">
            <TrainerBarChart />
            <DepartmentPieChart />
          </div>

          <div className="ai-summary">

            <h2>🤖 AI Summary</h2>

            <div className="summary-grid">

              <div className="summary-card">
                <h3>Top Trainer</h3>
                <h1>Ayesha Khan</h1>
                <p>Overall Rating: 4.9 / 5</p>
              </div>

              <div className="summary-card">
                <h3>Best Department</h3>
                <h1>STEM</h1>
                <p>Highest average performance score</p>
              </div>

              <div className="summary-card">
                <h3>Completion Rate</h3>
                <h1>96%</h1>
                <p>Training completion remains excellent.</p>
              </div>

              <div className="summary-card">
                <h3>AI Recommendation</h3>
                <h1>Advanced STEM Training</h1>
                <p>
                  Focus upcoming workshops on STEM trainers
                  to maximize organizational impact.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;