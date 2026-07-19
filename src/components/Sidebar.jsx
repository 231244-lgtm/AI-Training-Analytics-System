import "../styles/Sidebar.css";

import {
  FaHome,
  FaChalkboardTeacher,
  FaChartBar,
  FaComments,
  FaLightbulb,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h1>READ</h1>
        <h1>Foundation</h1>
        <p>Training Analytics</p>
      </div>

      <div className="divider"></div>

      <nav>

        <ul>

          <li className="active">
            <FaHome />
            <span>Dashboard</span>
          </li>

          <li>
            <FaChalkboardTeacher />
            <span>Trainer Profiles</span>
          </li>

          <li>
            <FaChartBar />
            <span>Analytics</span>
          </li>

          <li>
            <FaComments />
            <span>Feedback</span>
          </li>

          <li>
            <FaLightbulb />
            <span>Recommendations</span>
          </li>

          <li>
            <FaCog />
            <span>Settings</span>
          </li>

        </ul>

      </nav>

    </aside>
  );
}

export default Sidebar;