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

const data = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 76 },
  { month: "Mar", score: 81 },
  { month: "Apr", score: 85 },
  { month: "May", score: 90 },
  { month: "Jun", score: 95 },
];

function PerformanceChart() {
  return (
    <div className="performance-card">

      <div className="chart-header">

        <h2>Monthly Training Performance</h2>

        <span>+18%</span>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="score"
            stroke="#2563EB"
            fill="#DBEAFE"
            strokeWidth={4}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PerformanceChart;