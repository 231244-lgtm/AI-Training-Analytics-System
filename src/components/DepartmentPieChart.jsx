import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import "../styles/DepartmentPieChart.css";

const data = [
  { name: "STEM", value: 40 },
  { name: "Science", value: 25 },
  { name: "Math", value: 20 },
  { name: "English", value: 15 },
];

const COLORS = [
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
];

function DepartmentPieChart() {
  return (
    <div className="small-chart">

      <h2>Department Distribution</h2>

      <ResponsiveContainer width="100%" height={280}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DepartmentPieChart;