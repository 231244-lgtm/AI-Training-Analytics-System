
import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "../styles/PerformanceChart.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const value = Number(payload[0].value);

  return (
    <div className="performance-tooltip">
      <p className="tooltip-district">{label}</p>
      <span>Average learning gain</span>
      <strong>
        {Number.isFinite(value) ? value.toFixed(2) : "N/A"} points
      </strong>
    </div>
  );
}

function PerformanceChart() {
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchDistrictData() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/read-foundation/districts`
        );

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("The API did not return a list of districts.");
        }

        const chartData = result
          .map((item) => ({
            district: String(item.district ?? "").trim(),
            learningGain: Number(item.average_learning_gain),
          }))
          .filter(
            (item) =>
              item.district.length > 0 &&
              Number.isFinite(item.learningGain)
          );

        if (!cancelled) {
          setDistrictData(chartData);
          setError(
            chartData.length === 0
              ? "No valid district learning-gain data was returned."
              : ""
          );
        }
      } catch (err) {
        console.error("District chart error:", err);

        if (!cancelled) {
          setError(
            "Unable to load district data. Check that the backend is running."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDistrictData();

    return () => {
      cancelled = true;
    };
  }, []);

  const averageGain =
    districtData.length > 0
      ? districtData.reduce(
          (sum, item) => sum + item.learningGain,
          0
        ) / districtData.length
      : null;

  const highestDistrict =
    districtData.length > 0
      ? districtData.reduce((best, item) =>
          item.learningGain > best.learningGain ? item : best
        )
      : null;

  const lowestDistrict =
    districtData.length > 0
      ? districtData.reduce((lowest, item) =>
          item.learningGain < lowest.learningGain ? item : lowest
        )
      : null;

  return (
    <section className="performance-card">
      <div className="performance-heading">
        <div>
          <span className="performance-eyebrow">
            DISTRICT PERFORMANCE
          </span>

          <h2>Learning Gain Comparison</h2>

          <p>
            Compare average pre-test to post-test score improvements
            across READ Foundation districts.
          </p>
        </div>

        <span className="district-count">
          <span className="district-count-dot" />
          {loading ? "Loading..." : `${districtData.length} districts`}
        </span>
      </div>

      {loading ? (
        <div className="performance-message">
          Loading district performance...
        </div>
      ) : error ? (
        <div
          className="performance-message performance-error"
          role="alert"
        >
          {error}
        </div>
      ) : (
        <>
          <div className="performance-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={districtData}
                margin={{
                  top: 15,
                  right: 20,
                  bottom: 12,
                  left: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="performanceGainGradient"
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
                  height={65}
                  tickMargin={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748b",
                    fontSize: 12,
                  }}
                  width={60}
                  tickMargin={10}
                  tickFormatter={(value) =>
                    Number(value).toFixed(1)
                  }
                  domain={[
                    (min) => Math.floor(min - 1),
                    (max) => Math.ceil(max + 1),
                  ]}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#94a3b8",
                    strokeDasharray: "4 4",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="learningGain"
                  name="Average learning gain"
                  stroke="#2563eb"
                  fill="url(#performanceGainGradient)"
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

          <div className="performance-chart-footer">
            <div className="performance-summary-item">
              <span>Districts Analysed</span>
              <strong>{districtData.length}</strong>
              <small>Districts in dataset</small>
            </div>

            <div className="performance-summary-item">
              <span>Average District Gain</span>
              <strong>
                {averageGain !== null
                  ? averageGain.toFixed(2)
                  : "N/A"}{" "}
                <small>pts</small>
              </strong>
              <small>Mean of district averages</small>
            </div>

            <div className="performance-summary-item performance-highest">
              <span>Highest Learning Gain</span>
              <strong>
                {highestDistrict
                  ? highestDistrict.learningGain.toFixed(2)
                  : "N/A"}{" "}
                <small>pts</small>
              </strong>
              <small>
                {highestDistrict
                  ? highestDistrict.district
                  : "No data"}
              </small>
            </div>

            <div className="performance-summary-item performance-lowest">
              <span>Lowest Learning Gain</span>
              <strong>
                {lowestDistrict
                  ? lowestDistrict.learningGain.toFixed(2)
                  : "N/A"}{" "}
                <small>pts</small>
              </strong>
              <small>
                {lowestDistrict
                  ? lowestDistrict.district
                  : "No data"}
              </small>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default PerformanceChart;
