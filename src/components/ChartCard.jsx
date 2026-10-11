
import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "../styles/ChartCard.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="custom-tooltip">
      <p className="tooltip-month">{label}</p>

      <p className="tooltip-score">
        Average learning gain:{" "}
        <strong>{payload[0]?.value} points</strong>
      </p>
    </div>
  );
}

function ChartCard() {
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
          throw new Error("Could not load district analytics.");
        }

        const data = await response.json();

        if (!cancelled) {
          const chartData = data.map((district) => ({
            district: district.district,
            learningGain: Number(district.average_learning_gain),
          }));

          setDistrictData(chartData);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load district learning-gain data.");
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

  const firstDistrict = districtData[0];
  const lastDistrict = districtData[districtData.length - 1];

  const averageGain =
    districtData.length > 0
      ? districtData.reduce(
          (total, district) => total + district.learningGain,
          0
        ) / districtData.length
      : null;

  const highestDistrict =
    districtData.length > 0
      ? districtData.reduce((best, current) =>
          current.learningGain > best.learningGain ? current : best
        )
      : null;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>District Learning-Gain Comparison</h3>
          <p>
            Average improvement between pre-assessment and
            post-assessment scores across districts
          </p>
        </div>
      </div>

      <div className="chart-container">
        {loading ? (
          <p>Loading district chart...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : districtData.length === 0 ? (
          <p>No district data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={340}>
            <LineChart
              data={districtData}
              margin={{
                top: 10,
                right: 15,
                left: 0,
                bottom: 15,
              }}
            >
              <CartesianGrid
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="district"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                angle={-25}
                textAnchor="end"
                interval={0}
                height={65}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 13 }}
                width={40}
                domain={["auto", "auto"]}
                label={{
                  value: "Learning gain (points)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#64748b", fontSize: 12 },
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#cbd5e1",
                  strokeWidth: 1,
                }}
              />

              <Line
                type="monotone"
                dataKey="learningGain"
                name="Average learning gain"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#2563eb",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: "#2563eb",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="chart-footer">
        <div>
          <span className="footer-label">Districts Analysed</span>
          <strong>{loading ? "..." : districtData.length}</strong>
        </div>

        <div>
          <span className="footer-label">Average District Gain</span>
          <strong>
            {averageGain === null ? "N/A" : `${averageGain.toFixed(2)} points`}
          </strong>
        </div>

        <div>
          <span className="footer-label">Highest Average Gain</span>
          <strong className="growth-value">
            {highestDistrict
              ? `${highestDistrict.district}: ${highestDistrict.learningGain}`
              : "N/A"}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default ChartCard;
