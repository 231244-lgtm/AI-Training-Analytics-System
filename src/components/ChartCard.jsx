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

const performanceData = [
  { month: "Jan", performance: 45, sessions: 4.5 },
  { month: "Feb", performance: 52, sessions: 5.2 },
  { month: "Mar", performance: 48, sessions: 4.8 },
  { month: "Apr", performance: 61, sessions: 6.1 },
  { month: "May", performance: 58, sessions: 5.8 },
  { month: "Jun", performance: 64, sessions: 6.4 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">

        <p className="tooltip-month">
          {label}
        </p>

        <p className="tooltip-score">
          Performance:{" "}
          <strong>
            {payload[0]?.value}
          </strong>
        </p>

        <p className="tooltip-score">
          Sessions:{" "}
          <strong>
            {payload[1]?.value}
          </strong>
        </p>

      </div>
    );
  }

  return null;
}

function ChartCard() {
  return (
    <div className="chart-card">

      {/* HEADER */}

      <div className="chart-header">

        <div>

          <h3>
            Training Sessions & Performance Trend
          </h3>

          <p>
            Monthly training activity and performance trends
          </p>

        </div>

      </div>


      {/* CHART */}

      <div className="chart-container">

        <ResponsiveContainer width="100%" height={340}>

          <LineChart
            data={performanceData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />


            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
              dy={10}
            />


            <YAxis
              yAxisId="performance"
              domain={[0, 80]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
              width={35}
            />


            <YAxis
              yAxisId="sessions"
              orientation="right"
              domain={[0, 8]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
              width={30}
            />


            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#cbd5e1",
                strokeWidth: 1,
              }}
            />


            <Line
              yAxisId="performance"
              type="monotone"
              dataKey="performance"
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


            <Line
              yAxisId="sessions"
              type="monotone"
              dataKey="sessions"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#16a34a",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#16a34a",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* FOOTER */}

      <div className="chart-footer">

        <div>
          <span className="footer-label">
            Starting Performance
          </span>

          <strong>
            45
          </strong>
        </div>


        <div>
          <span className="footer-label">
            Current Performance
          </span>

          <strong>
            64
          </strong>
        </div>


        <div>
          <span className="footer-label">
            Performance Growth
          </span>

          <strong className="growth-value">
            +19 points
          </strong>
        </div>

      </div>

    </div>
  );
}

export default ChartCard;