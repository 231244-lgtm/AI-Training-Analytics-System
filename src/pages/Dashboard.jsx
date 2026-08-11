import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import InsightCard from "../components/InsightCard";

import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaStar,
  FaSmile,
  FaUpload,
  FaPlay,
  FaFileAlt,
  FaDatabase,
  FaBrain,
  FaArrowUp,
  FaChartLine,
  FaCircle,
} from "react-icons/fa";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <main className="dashboard-body">

          {/* HERO SECTION */}
          <section className="hero-card">

            <div className="hero-left">

              <div className="hero-label">
                <span className="hero-label-dot"></span>
                TRAINING INTELLIGENCE
              </div>

              <h1>
                Training performance,
                <br />
                powered by intelligence.
              </h1>

              <p>
                Monitor trainer performance, evaluate training outcomes,
                and turn organizational data into actionable insights.
              </p>

              <div className="hero-status">

                <div className="status-card">
                  <div className="status-icon">
                    <FaDatabase />
                  </div>

                  <div>
                    <span>DATASET STATUS</span>
                    <h4>No dataset uploaded</h4>
                  </div>
                </div>

                <div className="status-card">
                  <div className="status-icon ai-icon">
                    <FaBrain />
                  </div>

                  <div>
                    <span>AI ANALYSIS</span>
                    <h4>Awaiting data</h4>
                  </div>
                </div>

              </div>

            </div>

            <div className="hero-right">

              <div className="ai-status">

                <FaCircle />

                <span>AI ENGINE</span>

                <strong>Ready</strong>

              </div>

              <button className="hero-btn primary">
                <FaUpload />
                Upload Dataset
              </button>

              <button className="hero-btn secondary">
                <FaPlay />
                Run Analysis
              </button>

              <button className="hero-btn secondary">
                <FaFileAlt />
                Export Report
              </button>

            </div>

          </section>


          {/* KPI SECTION */}
          <section className="section-heading">

            <div>
              <h2>Performance Overview</h2>

              <p>
                Key indicators across the training program.
              </p>
            </div>

            <div className="trend-indicator">
              <FaArrowUp />
              <span>Overall performance improving</span>
            </div>

          </section>


          <section className="stats-grid">

            <StatCard
              title="Total Trainers"
              value="148"
              change="+12%"
              icon={<FaChalkboardTeacher />}
            />

            <StatCard
              title="Trainings Conducted"
              value="1,256"
              change="+8%"
              icon={<FaBookOpen />}
            />

            <StatCard
              title="Average Rating"
              value="4.8"
              change="+0.4"
              icon={<FaStar />}
            />

            <StatCard
              title="Satisfaction Rate"
              value="96%"
              change="+5%"
              icon={<FaSmile />}
            />

          </section>


          {/* ANALYTICS SECTION */}
          <section className="section-heading analytics-heading">

            <div>
              <h2>Training Analytics</h2>

              <p>
                Performance trends and organizational insights.
              </p>
            </div>

            <button className="view-all-btn">
              View Analytics
              <FaChartLine />
            </button>

          </section>


          <section className="analytics-section">

            <ChartCard />

            <InsightCard />

          </section>


          {/* AI INSIGHTS */}
          <section className="ai-overview">

            <div className="ai-overview-header">

              <div className="ai-title">

                <div className="ai-title-icon">
                  <FaBrain />
                </div>

                <div>
                  <h2>AI Insights</h2>

                  <p>
                    Intelligent observations from training performance data.
                  </p>
                </div>

              </div>

              <span className="ai-ready">
                <FaCircle />
                Ready for analysis
              </span>

            </div>


            <div className="ai-insight-grid">

              <div className="ai-insight">

                <span className="insight-label">
                  PERFORMANCE
                </span>

                <h3>
                  STEM training is currently leading.
                </h3>

                <p>
                  The STEM department shows the strongest overall
                  training performance in the current dataset.
                </p>

              </div>


              <div className="ai-insight">

                <span className="insight-label">
                  SATISFACTION
                </span>

                <h3>
                  Overall trainee satisfaction is strong.
                </h3>

                <p>
                  The current satisfaction rate indicates consistently
                  positive training experiences.
                </p>

              </div>


              <div className="ai-insight">

                <span className="insight-label">
                  RECOMMENDATION
                </span>

                <h3>
                  Upload data to generate recommendations.
                </h3>

                <p>
                  AI recommendations will become available after
                  training data is uploaded and analyzed.
                </p>

              </div>

            </div>

          </section>

        </main>

      </div>
    </div>
  );
}

export default Dashboard;