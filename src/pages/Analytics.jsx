import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import PerformanceChart from "../components/PerformanceChart";
import TrainerBarChart from "../components/TrainerBarChart";
import DepartmentPieChart from "../components/DepartmentPieChart";

import {
  FaStar,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaBrain,
  FaArrowUp,
  FaLightbulb,
} from "react-icons/fa";

import "../styles/Analytics.css";

function Analytics() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <main className="analytics-page">

          {/* ================= HEADER ================= */}

          <section className="analytics-header">

            <div>

              <span className="analytics-eyebrow">
                PERFORMANCE OVERVIEW
              </span>

              <h1>
                Training Analytics
              </h1>

              <p>
                Monitor trainer performance, training outcomes,
                and organizational trends from one centralized view.
              </p>

            </div>

            <div className="analytics-status">
              <FaArrowUp />
              <span>Overall performance improving</span>
            </div>

          </section>


          {/* ================= KPI CARDS ================= */}

          <section className="kpi-section">

            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon">
                  <FaStar />
                </div>

                <span className="kpi-change">
                  +0.3
                </span>

              </div>

              <h2>
                4.8
              </h2>

              <p>
                Average Rating
              </p>

              <span className="kpi-description">
                Overall trainer rating
              </span>

            </div>


            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon">
                  <FaCheckCircle />
                </div>

                <span className="kpi-change">
                  +5%
                </span>

              </div>

              <h2>
                96%
              </h2>

              <p>
                Completion Rate
              </p>

              <span className="kpi-description">
                Training completion
              </span>

            </div>


            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon">
                  <FaUsers />
                </div>

                <span className="kpi-change">
                  Active
                </span>

              </div>

              <h2>
                156
              </h2>

              <p>
                Active Trainers
              </p>

              <span className="kpi-description">
                Trainers currently active
              </span>

            </div>


            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon">
                  <FaChartLine />
                </div>

                <span className="kpi-change">
                  +18%
                </span>

              </div>

              <h2>
                64
              </h2>

              <p>
                Performance Score
              </p>

              <span className="kpi-description">
                Current performance trend
              </span>

            </div>

          </section>


          {/* ================= PERFORMANCE ================= */}

          <section className="analytics-section-title">

            <div>

              <h2>
                Performance Trends
              </h2>

              <p>
                Average trainer performance over the last six months.
              </p>

            </div>

            <div className="section-badge">

              <FaArrowUp />

              +18% growth

            </div>

          </section>


          <section className="performance-main">

            <PerformanceChart />


            {/* AI ANALYSIS */}

            <div className="ai-analysis-card">

              <div className="ai-analysis-header">

                <div className="ai-icon">
                  <FaBrain />
                </div>

                <div>

                  <h3>
                    AI Analysis
                  </h3>

                  <p>
                    Latest performance insights
                  </p>

                </div>

              </div>


              <div className="ai-metric">

                <span>
                  Top Trainer
                </span>

                <strong>
                  Ayesha Khan
                </strong>

                <small>
                  Overall rating: 4.9 / 5
                </small>

              </div>


              <div className="ai-metric">

                <span>
                  Leading Department
                </span>

                <strong>
                  STEM
                </strong>

                <small>
                  Highest average performance
                </small>

              </div>


              <div className="ai-metric">

                <span>
                  Training Completion
                </span>

                <strong>
                  96%
                </strong>

                <small>
                  Strong completion performance
                </small>

              </div>


              <div className="ai-recommendation">

                <div className="recommendation-title">

                  <FaLightbulb />

                  <span>
                    Recommended Action
                  </span>

                </div>

                <p>
                  Expand advanced STEM training opportunities
                  based on current performance trends.
                </p>

              </div>

            </div>

          </section>


          {/* ================= TRAINER + DEPARTMENT ================= */}

          <section className="analytics-section-title secondary-title">

            <div>

              <h2>
                Training Performance
              </h2>

              <p>
                Compare trainer performance and department distribution.
              </p>

            </div>

          </section>


          <section className="charts-grid">


            <div className="chart-panel">

              <div className="chart-panel-header">

                <div>

                  <h3>
                    Top Trainers
                  </h3>

                  <p>
                    Highest performing trainers
                  </p>

                </div>

              </div>

              <TrainerBarChart />

            </div>


            <div className="chart-panel">

              <div className="chart-panel-header">

                <div>

                  <h3>
                    Department Distribution
                  </h3>

                  <p>
                    Training distribution by department
                  </p>

                </div>

              </div>

              <DepartmentPieChart />

            </div>

          </section>


          {/* ================= AI INSIGHTS ================= */}

          <section className="ai-summary-section">

            <div className="ai-summary-header">

              <div className="ai-summary-title">

                <div className="ai-summary-icon">
                  <FaBrain />
                </div>

                <div>

                  <h2>
                    AI Insights
                  </h2>

                  <p>
                    Intelligent observations from training data
                  </p>

                </div>

              </div>


              <div className="ai-ready">

                <span></span>

                Ready for analysis

              </div>

            </div>


            <div className="ai-insight-grid">


              <div className="ai-insight">

                <span className="insight-label">
                  PERFORMANCE
                </span>

                <h3>
                  STEM is the leading department.
                </h3>

                <p>
                  STEM currently represents the largest
                  share of training activity at 40%.
                </p>

              </div>


              <div className="ai-insight">

                <span className="insight-label">
                  TRAINER
                </span>

                <h3>
                  Ayesha Khan is the top performer.
                </h3>

                <p>
                  Ayesha Khan has an overall trainer
                  rating of 4.9 out of 5.
                </p>

              </div>


              <div className="ai-insight">

                <span className="insight-label">
                  RECOMMENDATION
                </span>

                <h3>
                  Expand advanced STEM training.
                </h3>

                <p>
                  Focus upcoming advanced training
                  opportunities on high-performing STEM trainers.
                </p>

              </div>


            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Analytics;