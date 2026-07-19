import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaUpload } from "react-icons/fa";

import "../styles/Dashboard.css";

function Dashboard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <main className="dashboard-main">
          <section className="hero-card">

            <div className="hero-left">

              <span className="hero-greeting">
                👋 {greeting}, Administrator
              </span>

              <h1>
                Welcome back!
              </h1>

              <h2>
                Training Analytics & AI Recommendation System
              </h2>

              <p>
                Monitor trainer performance, analyze training outcomes,
                evaluate feedback, and generate AI-powered recommendations
                from one intelligent platform.
              </p>

            </div>

            <div className="hero-right">

              <button className="upload-btn">
                <FaUpload />
                Upload Dataset
              </button>

            </div>

          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;