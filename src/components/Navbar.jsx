import "../styles/Navbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="navbar">

      <div>
        <h2>Dashboard</h2>
        <p>{today}</p>
      </div>

      <div className="navbar-right">

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search trainers..."
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