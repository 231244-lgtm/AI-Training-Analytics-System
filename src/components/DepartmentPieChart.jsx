import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import "../styles/DepartmentPieChart.css";

const API_BASE_URL = "http://127.0.0.1:8000";

const COLORS = [
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#CBD5E1",
];

function DepartmentPieChart() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchFeedback() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/read-foundation/feedback`
        );

        if (!response.ok) {
          throw new Error("Unable to load feedback data.");
        }

        const data = await response.json();

        const counts = data.response_counts;

        const chartData = [
          {
            name: "Strongly Agree",
            value: Number(counts.strongly_agree) || 0,
          },
          {
            name: "Agree",
            value: Number(counts.agree) || 0,
          },
          {
            name: "Neutral",
            value: Number(counts.neutral) || 0,
          },
          {
            name: "Disagree",
            value: Number(counts.disagree) || 0,
          },
          {
            name: "Strongly Disagree",
            value: Number(counts.strongly_disagree) || 0,
          },
        ];

        if (!cancelled) {
          setFeedbackData(chartData);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to load feedback ratings. Please check the backend connection."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchFeedback();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="small-chart">
        <p>Loading feedback ratings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="small-chart">
        <p role="alert">{error}</p>
      </div>
    );
  }

  if (feedbackData.length === 0) {
    return (
      <div className="small-chart">
        <p>No feedback ratings available.</p>
      </div>
    );
  }

  const totalResponses = feedbackData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <div className="small-chart">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={feedbackData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={90}
            label={({ percent }) =>
              `${(percent * 100).toFixed(1)}%`
            }
          >
            {feedbackData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [
              `${value.toLocaleString()} responses`,
              name,
            ]}
          />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: "13px",
          marginTop: "8px",
        }}
      >
        Total feedback responses: {totalResponses.toLocaleString()}
      </p>
    </div>
  );
}

export default DepartmentPieChart;