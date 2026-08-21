import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-title">
        <h2>Training Analytics</h2>
        <p>Wednesday, August 19</p>
      </div>

      <div className="navbar-right">

        <div className="navbar-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="admin-profile">

          <FaUserCircle className="admin-icon" />

          <div>
            <strong>Admin</strong>
            <span>READ Foundation</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;