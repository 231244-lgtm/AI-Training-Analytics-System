import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import PerformanceChart from "../components/PerformanceChart";
import DepartmentPieChart from "../components/DepartmentPieChart";

import {
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaBrain,
  FaLightbulb,
} from "react-icons/fa";

import "../styles/Analytics.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Analytics() {
  const [learningData, setLearningData] = useState(null);
  const [teachingMethods, setTeachingMethods] = useState([]);
  const [schoolSettings, setSchoolSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchAnalytics() {
      try {
        setLoading(true);
        setError("");

        const responses = await Promise.all([
          fetch(`${API_BASE_URL}/api/read-foundation/learning-gain`),
          fetch(`${API_BASE_URL}/api/analytics/teaching-methods`),
          fetch(`${API_BASE_URL}/api/analytics/school-settings`),
        ]);

        if (responses.some((response) => !response.ok)) {
          throw new Error("Unable to load analytics.");
        }

        const [
          readFoundationData,
          teachingMethodData,
          schoolSettingData,
        ] = await Promise.all(
          responses.map((response) => response.json())
        );

        if (!cancelled) {
          setLearningData(readFoundationData);
          setTeachingMethods(teachingMethodData);
          setSchoolSettings(schoolSettingData);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to load analytics. Please check that the backend is running."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  const improvedPercentage =
    learningData && learningData.total_participants > 0
      ? (
          (learningData.participants_improved /
            learningData.total_participants) *
          100
        ).toFixed(1)
      : null;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <main className="analytics-page">
          {/* HEADER */}

          <section className="analytics-header">
            <div>
              <span className="analytics-eyebrow">
                READ FOUNDATION ANALYTICS
              </span>

              <h1>Training Analytics</h1>

              <p>
                Explore training outcomes, participant improvement,
                district learning gains, and feedback-related analytics.
              </p>
            </div>

            <div className="analytics-status">
              <FaCheckCircle />
              <span>
                {loading
                  ? "Loading analytics"
                  : error
                    ? "Analytics unavailable"
                    : "Analytics loaded"}
              </span>
            </div>
          </section>

          {error && (
            <p className="analytics-error" role="alert">
              {error}
            </p>
          )}

          {/* KPI CARDS */}

          <section className="kpi-section">
            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon">
                  <FaUsers />
                </div>
                <span className="kpi-change">Dataset</span>
              </div>

              <h2>
                {loading
                  ? "..."
                  : learningData?.total_participants ?? "N/A"}
              </h2>

              <p>Participants</p>

              <span className="kpi-description">
                READ Foundation training records
              </span>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon">
                  <FaChartLine />
                </div>
                <span className="kpi-change">Learning</span>
              </div>

              <h2>
                {loading
                  ? "..."
                  : learningData
                    ? `${learningData.average_learning_gain} points`
                    : "N/A"}
              </h2>

              <p>Average Learning Gain</p>

              <span className="kpi-description">
                Average post-test minus pre-test score
              </span>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon">
                  <FaCheckCircle />
                </div>
                <span className="kpi-change">Assessment</span>
              </div>

              <h2>
                {loading
                  ? "..."
                  : learningData?.average_posttest ?? "N/A"}
              </h2>

              <p>Average Post-Test</p>

              <span className="kpi-description">
                Average assessment score
              </span>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon">
                  <FaUsers />
                </div>
                <span className="kpi-change">Outcome</span>
              </div>

              <h2>
                {loading
                  ? "..."
                  : improvedPercentage !== null
                    ? `${improvedPercentage}%`
                    : "N/A"}
              </h2>

              <p>Participants Improved</p>

              <span className="kpi-description">
                Participants whose post-test score increased
              </span>
            </div>
          </section>

          {/* LEARNING OUTCOMES */}

          <section className="analytics-section-title">
            <div>
              <h2>Learning Outcomes</h2>
              <p>
                Pre-assessment and post-assessment results from
                READ Foundation training.
              </p>
            </div>
          </section>

          <section className="charts-grid">
            <div className="chart-panel">
              <div className="chart-panel-header">
                <div>
                  <h3>Average Pre-Test</h3>
                  <p>Starting assessment performance</p>
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <h2>
                  {loading
                    ? "..."
                    : learningData?.average_pretest ?? "N/A"}
                </h2>

                <p>Average pre-assessment score</p>
              </div>
            </div>

            <div className="chart-panel">
              <div className="chart-panel-header">
                <div>
                  <h3>Participant Outcomes</h3>
                  <p>Changes between pre-test and post-test</p>
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <p>
                  Improved:{" "}
                  <strong>
                    {loading
                      ? "..."
                      : learningData?.participants_improved ?? "N/A"}
                  </strong>
                </p>

                <p>
                  Unchanged:{" "}
                  <strong>
                    {loading
                      ? "..."
                      : learningData?.participants_unchanged ?? "N/A"}
                  </strong>
                </p>

                <p>
                  Decreased:{" "}
                  <strong>
                    {loading
                      ? "..."
                      : learningData?.participants_decreased ?? "N/A"}
                  </strong>
                </p>
              </div>
            </div>
          </section>

          {/* LEARNING GAIN BY DISTRICT */}

          <section className="analytics-section-title secondary-title">
            <div>
              <h2>District Learning Gain</h2>
              <p>
                Average learning improvement across READ Foundation
                districts.
              </p>
            </div>
          </section>

          <section className="district-learning-section">
            <div className="chart-panel district-learning-panel">
              <div className="chart-panel-header">
                <div>
                  <h3>District Learning Gain Comparison</h3>
                  <p>
                    Average improvement in assessment scores by district.
                  </p>
                </div>
              </div>

              <PerformanceChart />
            </div>
          </section>

          {/* LEARNING GAIN BY TEACHING METHOD */}

          <section className="analytics-section-title secondary-title">
            <div>
              <h2>Learning Gain by Teaching Method</h2>
              <p>
                Results from the separate test_scores.csv dataset,
                not the READ Foundation participant dataset.
              </p>
            </div>
          </section>

          <section className="charts-grid">
            {teachingMethods.map((method) => (
              <div
                className="chart-panel"
                key={method.teaching_method}
              >
                <div className="chart-panel-header">
                  <div>
                    <h3>{method.teaching_method}</h3>
                    <p>{method.student_count} student records</p>
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <h2>{method.average_learning_gain} points</h2>
                  <p>Average learning gain</p>
                </div>
              </div>
            ))}

            {!loading && teachingMethods.length === 0 && (
              <p>No teaching-method results are available.</p>
            )}
          </section>

          {/* LEARNING GAIN BY SCHOOL SETTING */}

          <section className="analytics-section-title secondary-title">
            <div>
              <h2>Learning Gain by School Setting</h2>
              <p>
                Results from the separate test_scores.csv dataset,
                not the READ Foundation participant dataset.
              </p>
            </div>
          </section>

          <section className="charts-grid">
            {schoolSettings.map((setting) => (
              <div
                className="chart-panel"
                key={setting.school_setting}
              >
                <div className="chart-panel-header">
                  <div>
                    <h3>{setting.school_setting}</h3>
                    <p>{setting.student_count} student records</p>
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <h2>{setting.average_learning_gain} points</h2>
                  <p>Average learning gain</p>
                </div>
              </div>
            ))}

            {!loading && schoolSettings.length === 0 && (
              <p>No school-setting results are available.</p>
            )}
          </section>

          {/* FEEDBACK AND TRAINING INSIGHTS */}

          <section className="analytics-section-title secondary-title">
            <div>
              <h2>Feedback Analytics</h2>
              <p>
                Review the actual participant feedback distribution
                and training outcomes.
              </p>
            </div>
          </section>

          <section className="charts-grid">
            <div className="chart-panel">
              <div className="chart-panel-header">
                <div>
                  <h3>Feedback Rating Distribution</h3>
                  <p>
                    Distribution of READ Foundation feedback responses
                  </p>
                </div>
              </div>

              <DepartmentPieChart />
            </div>

            <div className="chart-panel">
              <div className="chart-panel-header">
                <div>
                  <h3>Data-Based Observation</h3>
                  <p>Learning outcome summary</p>
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <div className="kpi-icon">
                  <FaBrain />
                </div>

                <h3>Participant Learning Improvement</h3>

                <p>
                  {loading
                    ? "Calculating results..."
                    : learningData
                      ? `${learningData.participants_improved} of ${learningData.total_participants} participants improved their assessment scores.`
                      : "Learning outcome data is unavailable."}
                </p>

                <div className="recommendation-title">
                  <FaLightbulb />
                  <span>Suggested area for review</span>
                </div>

                <p>
                  Review participants whose scores stayed the same
                  or decreased to identify potential topics for
                  additional support. This is a data-based suggestion,
                  not an AI-generated prediction.
                </p>
              </div>
            </div>
          </section>

          {/* DATA LIMITATIONS */}

          <section className="ai-summary-section">
            <div className="ai-summary-header">
              <div className="ai-summary-title">
                <div className="ai-summary-icon">
                  <FaBrain />
                </div>

                <div>
                  <h2>Analytics Notes</h2>
                  <p>Interpretation and data-source transparency</p>
                </div>
              </div>

              <div className="ai-ready">
                <span></span>
                Data-based analysis
              </div>
            </div>

            <div className="ai-insight-grid">
              <div className="ai-insight">
                <span className="insight-label">LEARNING</span>
                <h3>Measure improvement</h3>
                <p>
                  Compare pre-test and post-test scores to understand
                  changes in participant assessment performance.
                </p>
              </div>

              <div className="ai-insight">
                <span className="insight-label">FEEDBACK</span>
                <h3>Review participant responses</h3>
                <p>
                  Use feedback ratings and comments to identify
                  areas that may need further investigation.
                </p>
              </div>

              <div className="ai-insight">
                <span className="insight-label">DATA LIMITATION</span>
                <h3>Individual trainer rankings unavailable</h3>
                <p>
                  The available READ Foundation dataset does not
                  identify which trainer conducted each session.
                  Individual trainer rankings cannot be calculated
                  from these records alone.
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