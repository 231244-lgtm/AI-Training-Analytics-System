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

const data = [
  { name: "Ayesha", rating: 96 },
  { name: "Ali", rating: 91 },
  { name: "Fatima", rating: 88 },
  { name: "Bilal", rating: 84 },
];

function TrainerBarChart() {
  return (
    <div className="small-chart">

      <ResponsiveContainer width="100%" height={280}>

        <BarChart
          data={data}
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
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 13 }}
          />

          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 13 }}
          />

          <Tooltip />

          <Bar
            dataKey="rating"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
            barSize={42}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TrainerBarChart;