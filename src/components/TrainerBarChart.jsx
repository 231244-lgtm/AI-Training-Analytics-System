import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "../styles/TrainerBarChart.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function TrainerBarChart() {
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchDistricts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/read-foundation/districts`
        );

        if (!response.ok) {
          throw new Error("Unable to load district data.");
        }

        const data = await response.json();

        if (!cancelled) {
          const chartData = data.map((district) => ({
            district: district.district,
            learningGain: Number(district.average_learning_gain),
          }));

          setDistrictData(chartData);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load district learning gains. Please check your backend connection.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDistricts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="small-chart">
      {loading ? (
        <p>Loading district results...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : districtData.length === 0 ? (
        <p>No district data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={districtData}
            margin={{
              top: 10,
              right: 10,
              left: 5,
              bottom: 35,
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
              angle={-30}
              textAnchor="end"
              interval={0}
              height={55}
            />

            <YAxis
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={40}
              label={{
                value: "Learning gain (points)",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#64748b",
                  fontSize: 11,
                },
              }}
            />

            <Tooltip
              formatter={(value) => [
                `${value} points`,
                "Average learning gain",
              ]}
            />

            <Bar
              dataKey="learningGain"
              name="Average learning gain"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TrainerBarChart;