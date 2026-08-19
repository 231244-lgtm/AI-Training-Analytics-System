import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import InsightCard from "../components/InsightCard";

import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaStar,
  FaExclamationTriangle,
  FaUpload,
  FaPlay,
  FaFileAlt,
  FaDatabase,
  FaBrain,
} from "react-icons/fa";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-body">

          {/* ================= HERO ================= */}

          <section className="hero-card">

            <div className="hero-left">

              <span className="welcome-text">
                Good Evening, Administrator
              </span>

              <h1>
                AI-Driven Training Analytics Dashboard
              </h1>

              <p>
                Monitor trainer performance, evaluate training outcomes,
                and generate intelligent AI-powered recommendations from
                one centralized platform.
              </p>

              <div className="hero-status">

                <div className="status-card">

                  <FaDatabase />

                  <div>
                    <span>Dataset Status</span>
                    <h4>No dataset uploaded</h4>
                  </div>

                </div>

                <div className="status-card">

                  <FaBrain />

                  <div>
                    <span>AI Analysis</span>
                    <h4>Awaiting data</h4>
                  </div>

                </div>

              </div>

            </div>

            <div className="hero-right">

              <div className="ai-chip">
                <span>●</span> AI Engine Ready
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


          {/* ================= PERFORMANCE OVERVIEW ================= */}

          <section className="stats-grid">

            <StatCard
              title="Active Trainers"
              value="156"
              change="+12%"
              icon={<FaChalkboardTeacher />}
            />

            <StatCard
              title="Total Sessions"
              value="328"
              change="+8%"
              icon={<FaBookOpen />}
            />

            <StatCard
              title="Average Performance"
              value="4.4/5"
              change="+0.3"
              icon={<FaStar />}
            />

            <StatCard
              title="At-Risk Trainers"
              value="8"
              change="Needs Attention"
              icon={<FaExclamationTriangle />}
            />

          </section>


          {/* ================= TRAINING ANALYTICS ================= */}

          <section className="analytics-section">

            <ChartCard />

            <InsightCard />

          </section>


          {/* ================= RECENT TRAINER ACTIVITY ================= */}

          <section className="dashboard-section">

            <div className="section-heading">

              <div>
                <h2>Recent Trainer Activity</h2>

                <p>
                  Latest training sessions and trainer activity.
                </p>
              </div>

              <button className="view-btn">
                View All
              </button>

            </div>


            <div className="activity-table">

              <div className="activity-row activity-header">

                <span>Trainer</span>
                <span>Training Topic</span>
                <span>Region</span>
                <span>Status</span>

              </div>


              <div className="activity-row">

                <strong>Sarah Ahmed</strong>

                <span>Classroom Management</span>

                <span>Bhimber</span>

                <span className="status-completed">
                  Completed
                </span>

              </div>


              <div className="activity-row">

                <strong>Ali Hassan</strong>

                <span>Literacy Development</span>

                <span>Chotagala</span>

                <span className="status-completed">
                  Completed
                </span>

              </div>


              <div className="activity-row">

                <strong>Fatima Khan</strong>

                <span>Digital Teaching Tools</span>

                <span>Khurrata</span>

                <span className="status-progress">
                  In Progress
                </span>

              </div>


              <div className="activity-row">

                <strong>Ayesha Malik</strong>

                <span>Classroom Management</span>

                <span>Mallot</span>

                <span className="status-completed">
                  Completed
                </span>

              </div>

            </div>

          </section>


          {/* ================= PERFORMANCE DISTRIBUTION ================= */}

          <section className="dashboard-section">

            <div className="section-heading">

              <div>
                <h2>Performance Distribution</h2>

                <p>
                  Overview of trainer performance levels.
                </p>
              </div>

            </div>


            <div className="distribution-grid">

              <div className="distribution-card">

                <span>Excellent</span>

                <strong>45%</strong>

                <div className="distribution-bar">

                  <div
                    className="distribution-fill excellent"
                    style={{ width: "45%" }}
                  ></div>

                </div>

              </div>


              <div className="distribution-card">

                <span>Good</span>

                <strong>35%</strong>

                <div className="distribution-bar">

                  <div
                    className="distribution-fill good"
                    style={{ width: "35%" }}
                  ></div>

                </div>

              </div>


              <div className="distribution-card">

                <span>Average</span>

                <strong>15%</strong>

                <div className="distribution-bar">

                  <div
                    className="distribution-fill average"
                    style={{ width: "15%" }}
                  ></div>

                </div>

              </div>


              <div className="distribution-card">

                <span>Needs Improvement</span>

                <strong>5%</strong>

                <div className="distribution-bar">

                  <div
                    className="distribution-fill needs-improvement"
                    style={{ width: "5%" }}
                  ></div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;