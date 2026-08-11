import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "../styles/ChartCard.css";

const performanceData = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 76 },
  { month: "Mar", score: 81 },
  { month: "Apr", score: 85 },
  { month: "May", score: 90 },
  { month: "Jun", score: 95 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-month">{label}</p>
        <p className="tooltip-score">
          Score: <strong>{payload[0].value}</strong>
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
          <h3>Training Performance</h3>

          <p>
            Average trainer performance over the last 6 months
          </p>
        </div>

        <div className="chart-growth">
          <span>▲</span>
          +18%
        </div>

      </div>

      {/* CHART */}
      <div className="chart-container">

        <ResponsiveContainer width="100%" height={340}>

          <AreaChart
            data={performanceData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >

            <defs>

              <linearGradient
                id="performanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.28}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0.02}
                />

              </linearGradient>

            </defs>

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
              domain={[60, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
              width={35}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#cbd5e1",
                strokeWidth: 1,
              }}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#performanceGradient)"
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

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* FOOTER */}
      <div className="chart-footer">

        <div>
          <span className="footer-label">Starting Score</span>
          <strong>72</strong>
        </div>

        <div>
          <span className="footer-label">Current Score</span>
          <strong>95</strong>
        </div>

        <div>
          <span className="footer-label">Overall Growth</span>
          <strong className="growth-value">+23 points</strong>
        </div>

      </div>

    </div>
  );
}

export default ChartCard;