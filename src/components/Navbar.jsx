import "../styles/Navbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const pageTitles = {
    "/": "Dashboard",
    "/trainer-profiles": "Trainer Profiles",
    "/analytics": "Analytics",
    "/feedback": "Feedback",
    "/recommendations": "Recommendations",
    "/settings": "Settings",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="navbar">
      <div>
        <h2>{currentTitle}</h2>
        <p>{today}</p>
      </div>

      <div className="navbar-right">

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button className="icon-btn">
          <FaBell />
        </button>

        <div className="profile">
          <FaUserCircle />
          <div>
            <h4>Admin</h4>
            <span>READ Foundation</span>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;