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
} from "react-icons/fa";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">

          <section className="hero-card">

            <div className="hero-left">

              <span className="welcome-text">
                👋 Good Evening, Administrator
              </span>

              <h1>AI-Driven Training Analytics Dashboard</h1>

              <p>
                Monitor trainer performance, evaluate training outcomes,
                and generate intelligent AI-powered recommendations from
                one centralized platform.
              </p>

              <div className="hero-status">

                <div className="status-card">

                  <FaDatabase />

                  <div>
                    <span>Last Upload</span>
                    <h4>No dataset uploaded</h4>
                  </div>

                </div>

                <div className="status-card">

                  <FaBrain />

                  <div>
                    <span>AI Model</span>
                    <h4>Awaiting Analysis</h4>
                  </div>

                </div>

              </div>

            </div>

            <div className="hero-right">

              <div className="ai-chip">
                🟢 AI Status
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

          <section className="analytics-section">

            <ChartCard />

            <InsightCard />

          </section>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;