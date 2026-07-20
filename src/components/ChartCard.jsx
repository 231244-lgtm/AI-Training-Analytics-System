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

function ChartCard() {
  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>
          <h3>Training Performance</h3>
          <p>Average trainer performance over the last 6 months</p>
        </div>

        <div className="chart-growth">
          ▲ +18%
        </div>

      </div>

      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={performanceData}>

          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">

              <stop
                offset="5%"
                stopColor="#2563EB"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#2563EB"
                stopOpacity={0}
              />

            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis dataKey="month" />

          <YAxis domain={[60, 100]} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="score"
            stroke="#2563EB"
            strokeWidth={4}
            fill="url(#colorScore)"
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ChartCard;