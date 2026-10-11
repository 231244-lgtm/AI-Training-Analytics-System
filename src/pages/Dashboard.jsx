import { useEffect, useState } from "react";

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

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "../styles/Dashboard.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function DistrictTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const value = Number(payload[0].value);

  return (
    <div className="dashboard-chart-tooltip">
      <p>{label}</p>
      <span>Average learning gain</span>
      <strong>
        {Number.isFinite(value) ? `${value.toFixed(2)} points` : "N/A"}
      </strong>
    </div>
  );
}

function Dashboard() {
  const [learningGain, setLearningGain] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchReadAnalytics() {
      try {
        setLoading(true);
        setError("");

        const [
          learningResponse,
          districtResponse,
          attendanceResponse,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/api/read-foundation/learning-gain`),
          fetch(`${API_BASE_URL}/api/read-foundation/districts`),
          fetch(`${API_BASE_URL}/api/read-foundation/attendance`),
        ]);

        if (
          !learningResponse.ok ||
          !districtResponse.ok ||
          !attendanceResponse.ok
        ) {
          throw new Error("The backend could not return all READ analytics.");
        }

        const [
          learningData,
          districtData,
          attendanceData,
        ] = await Promise.all([
          learningResponse.json(),
          districtResponse.json(),
          attendanceResponse.json(),
        ]);

        if (
          !Array.isArray(districtData) ||
          typeof learningData !== "object" ||
          learningData === null ||
          typeof attendanceData !== "object" ||
          attendanceData === null
        ) {
          throw new Error("The backend returned an unexpected data format.");
        }

        if (!cancelled) {
          setLearningGain(learningData);
          setDistricts(districtData);
          setAttendance(attendanceData);
        }
      } catch (err) {
        console.error("Dashboard analytics error:", err);

        if (!cancelled) {
          setError(
            "Unable to load READ Foundation analytics. Make sure the backend is running."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReadAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  const validDistricts = districts
    .map((district) => ({
      ...district,
      average_learning_gain: Number(district.average_learning_gain),
    }))
    .filter(
      (district) =>
        district.district &&
        Number.isFinite(district.average_learning_gain)
    );

  const bestDistrict =
    validDistricts.length > 0
      ? validDistricts.reduce((best, current) =>
          current.average_learning_gain > best.average_learning_gain
            ? current
            : best
        )
      : null;

  const lowestDistrict =
    validDistricts.length > 0
      ? validDistricts.reduce((lowest, current) =>
          current.average_learning_gain < lowest.average_learning_gain
            ? current
            : lowest
        )
      : null;

  const averageDistrictGain =
    validDistricts.length > 0
      ? validDistricts.reduce(
          (total, district) => total + district.average_learning_gain,
          0
        ) / validDistricts.length
      : null;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <section className="hero-card">
            <div className="hero-left">
              <span className="welcome-text">
                Good Evening, Administrator
              </span>

              <h1>AI-Driven Training Analytics Dashboard</h1>

              <p>
                Monitor training outcomes, explore district-level results,
                and review learning improvements using READ Foundation data.
              </p>

              <div className="hero-status">
                <div className="status-card">
                  <FaDatabase />

                  <div>
                    <span>Dataset Status</span>
                    <h4>
                      {loading
                        ? "Loading dataset..."
                        : error
                          ? "Connection unavailable"
                          : `${
                              learningGain?.total_participants ?? 0
                            } participants loaded`}
                    </h4>
                  </div>
                </div>

                <div className="status-card">
                  <FaBrain />

                  <div>
                    <span>Analytics Status</span>
                    <h4>
                      {loading
                        ? "Loading analytics..."
                        : error
                          ? "Awaiting connection"
                          : "Training analytics ready"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="ai-chip">
                <span>●</span> Analytics Connected
              </div>

              <button
                className="hero-btn primary"
                onClick={() =>
                  document
                    .getElementById("read-district-analytics")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FaUpload />
                View Districts
              </button>

              <button
                className="hero-btn secondary"
                onClick={() => window.location.reload()}
              >
                <FaPlay />
                Refresh Analysis
              </button>

              <button
                className="hero-btn secondary"
                onClick={() => window.print()}
              >
                <FaFileAlt />
                Print Report
              </button>
            </div>
          </section>

          {error && (
            <div role="alert" className="dashboard-error">
              {error}
            </div>
          )}

          <section className="stats-grid">
            <StatCard
              title="Participants"
              value={
                loading
                  ? "..."
                  : learningGain?.total_participants ?? "N/A"
              }
              change="READ Foundation"
              icon={<FaChalkboardTeacher />}
            />

            <StatCard
              title="Average Learning Gain"
              value={
                loading
                  ? "..."
                  : learningGain
                    ? `${learningGain.average_learning_gain} points`
                    : "N/A"
              }
              change="Post-test minus pre-test"
              icon={<FaBookOpen />}
            />

            <StatCard
              title="Average Post-Test"
              value={
                loading
                  ? "..."
                  : learningGain
                    ? `${learningGain.average_posttest}/100`
                    : "N/A"
              }
              change="Assessment score"
              icon={<FaStar />}
            />

            <StatCard
              title="Attendance Rate"
              value={
                loading
                  ? "..."
                  : attendance
                    ? `${attendance.present_or_late_rate_percent}%`
                    : "N/A"
              }
              change="Present or late"
              icon={<FaExclamationTriangle />}
            />
          </section>

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <h2>Learning Outcomes</h2>
                <p>
                  Actual pre-assessment and post-assessment results.
                </p>
              </div>
            </div>

            <div className="distribution-grid">
              <div className="distribution-card">
                <span>Average Pre-Test</span>
                <strong>
                  {loading
                    ? "..."
                    : learningGain
                      ? learningGain.average_pretest
                      : "N/A"}
                </strong>
              </div>

              <div className="distribution-card">
                <span>Participants Improved</span>
                <strong>
                  {loading
                    ? "..."
                    : learningGain
                      ? learningGain.participants_improved
                      : "N/A"}
                </strong>
              </div>

              <div className="distribution-card">
                <span>No Score Change</span>
                <strong>
                  {loading
                    ? "..."
                    : learningGain
                      ? learningGain.participants_unchanged
                      : "N/A"}
                </strong>
              </div>

              <div className="distribution-card">
                <span>Participants Decreased</span>
                <strong>
                  {loading
                    ? "..."
                    : learningGain
                      ? learningGain.participants_decreased
                      : "N/A"}
                </strong>
              </div>
            </div>
          </section>

          <section
            className="dashboard-section"
            id="read-district-analytics"
          >
            <div className="section-heading">
              <div>
                <h2>District Learning Performance</h2>
                <p>
                  Average learning gain for each district in the dataset.
                </p>
              </div>
            </div>

            {loading ? (
              <p>Loading district results...</p>
            ) : validDistricts.length > 0 ? (
              <>
                <div className="dashboard-district-chart-card">
                  <div className="dashboard-district-chart-header">
                    <div>
                      <span className="dashboard-chart-eyebrow">
                        DISTRICT PERFORMANCE
                      </span>

                      <h3>Learning Gain Comparison</h3>

                      <p>
                        Compare average pre-test to post-test score
                        improvements across READ Foundation districts.
                      </p>
                    </div>

                    <span className="dashboard-district-count">
                      <span className="dashboard-count-dot" />
                      {validDistricts.length} districts
                    </span>
                  </div>

                  {/* The duplicate axis title has been removed. */}

                  <div className="dashboard-district-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={validDistricts}
                        margin={{
                          top: 12,
                          right: 18,
                          left: 8,
                          bottom: 12,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="dashboardDistrictGainGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#2563eb"
                              stopOpacity={0.18}
                            />
                            <stop
                              offset="95%"
                              stopColor="#2563eb"
                              stopOpacity={0.01}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid
                          stroke="#e2e8f0"
                          strokeDasharray="4 5"
                          vertical={false}
                        />

                        <XAxis
                          dataKey="district"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#64748b",
                            fontSize: 12,
                          }}
                          angle={-20}
                          textAnchor="end"
                          interval={0}
                          height={58}
                          tickMargin={8}
                        />

                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#64748b",
                            fontSize: 12,
                          }}
                          width={65}
                          tickMargin={10}
                          tickFormatter={(value) =>
                            Number(value).toFixed(1)
                          }
                          domain={[
                            (dataMin) => Math.floor(dataMin - 1),
                            (dataMax) => Math.ceil(dataMax + 1),
                          ]}
                        />

                        <Tooltip
                          content={<DistrictTooltip />}
                          cursor={{
                            stroke: "#94a3b8",
                            strokeDasharray: "4 4",
                          }}
                        />

                        <Area
                          type="monotone"
                          dataKey="average_learning_gain"
                          name="Average learning gain"
                          stroke="#2563eb"
                          fill="url(#dashboardDistrictGainGradient)"
                          strokeWidth={3}
                          dot={{
                            r: 4,
                            fill: "#2563eb",
                            stroke: "#ffffff",
                            strokeWidth: 2,
                          }}
                          activeDot={{
                            r: 6,
                            fill: "#2563eb",
                            stroke: "#ffffff",
                            strokeWidth: 2,
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="dashboard-district-summary">
                    <div className="dashboard-summary-item">
                      <span>Districts Analysed</span>
                      <strong>{validDistricts.length}</strong>
                      <small>Districts in dataset</small>
                    </div>

                    <div className="dashboard-summary-item">
                      <span>Average District Gain</span>
                      <strong>
                        {averageDistrictGain?.toFixed(2) ?? "N/A"}{" "}
                        <small>pts</small>
                      </strong>
                      <small>Mean of district averages</small>
                    </div>

                    <div className="dashboard-summary-item highest">
                      <span>Highest Learning Gain</span>
                      <strong>
                        {bestDistrict
                          ? bestDistrict.average_learning_gain.toFixed(2)
                          : "N/A"}{" "}
                        <small>pts</small>
                      </strong>
                      <small>{bestDistrict?.district ?? "N/A"}</small>
                    </div>

                    <div className="dashboard-summary-item lowest">
                      <span>Lowest Learning Gain</span>
                      <strong>
                        {lowestDistrict
                          ? lowestDistrict.average_learning_gain.toFixed(2)
                          : "N/A"}{" "}
                        <small>pts</small>
                      </strong>
                      <small>{lowestDistrict?.district ?? "N/A"}</small>
                    </div>
                  </div>
                </div>

                <div className="activity-table">
                  <div className="activity-row activity-header">
                    <span>District</span>
                    <span>Participants</span>
                    <span>Average Post-Test</span>
                    <span>Average Learning Gain</span>
                  </div>

                  {validDistricts.map((district) => (
                    <div
                      className="activity-row"
                      key={district.district}
                    >
                      <strong>{district.district}</strong>
                      <span>{district.participant_count ?? "N/A"}</span>
                      <span>{district.average_posttest ?? "N/A"}</span>
                      <span>
                        {district.average_learning_gain.toFixed(2)} points
                      </span>
                    </div>
                  ))}
                </div>

                {bestDistrict && (
                  <p className="district-highlight">
                    Highest average learning gain:{" "}
                    <strong>{bestDistrict.district}</strong>{" "}
                    ({bestDistrict.average_learning_gain.toFixed(2)} points).
                  </p>
                )}
              </>
            ) : (
              <p>No district data available.</p>
            )}
          </section>

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <h2>Attendance Overview</h2>
                <p>
                  Attendance records across the three training days.
                </p>
              </div>
            </div>

            {loading ? (
              <p>Loading attendance...</p>
            ) : attendance ? (
              <div className="distribution-grid">
                <div className="distribution-card">
                  <span>Present</span>
                  <strong>{attendance.present ?? 0}</strong>
                </div>

                <div className="distribution-card">
                  <span>Late</span>
                  <strong>{attendance.late ?? 0}</strong>
                </div>

                <div className="distribution-card">
                  <span>Absent</span>
                  <strong>{attendance.absent ?? 0}</strong>
                </div>

                <div className="distribution-card">
                  <span>Leave</span>
                  <strong>{attendance.leave ?? 0}</strong>
                </div>
              </div>
            ) : (
              <p>No attendance data available.</p>
            )}

            {attendance && (
              <p className="district-highlight">
                Present-only rate:{" "}
                <strong>
                  {attendance.present_only_rate_percent ?? "N/A"}%
                </strong>
                {" | "}
                Present-or-late rate:{" "}
                <strong>
                  {attendance.present_or_late_rate_percent ?? "N/A"}%
                </strong>
              </p>
            )}
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