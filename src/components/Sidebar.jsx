import {
  FaHome,
  FaChalkboardTeacher,
  FaChartBar,
  FaComments,
  FaLightbulb,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">

        <h1>READ Foundation</h1>

        <p>Training Analytics</p>

      </div>

      <nav>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/trainer-profiles"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaChalkboardTeacher />
          Trainer Profiles
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaChartBar />
          Analytics
        </NavLink>

        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaComments />
          Feedback
        </NavLink>

        <NavLink
          to="/recommendations"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaLightbulb />
          Recommendations
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaCog />
          Settings
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;