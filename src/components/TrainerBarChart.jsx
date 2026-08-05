import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
 Tooltip,
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

      <h2>Top Trainers</h2>

      <ResponsiveContainer width="100%" height={280}>

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="rating"
            fill="#2563EB"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TrainerBarChart;