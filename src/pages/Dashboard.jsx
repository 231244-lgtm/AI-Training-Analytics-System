import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaStar,
  FaSmile,
} from "react-icons/fa";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-body">

          <section className="hero-card">

            <div>

              <span className="welcome-text">
                👋 Good Evening, Administrator
              </span>

              <h1>Welcome back!</h1>

              <h2>
                Training Analytics & AI Recommendation System
              </h2>

              <p>
                Monitor trainer performance, analyze training outcomes,
                evaluate feedback, and generate AI-powered recommendations
                from one intelligent platform.
              </p>

            </div>

            <button className="upload-btn">
              Upload Dataset
            </button>

          </section>

          <section className="stats-grid">

            <StatCard
              title="Total Trainers"
              value="148"
              change="+12%"
              icon={<FaChalkboardTeacher />}
            />

            <StatCard
              title="Trainings Conducted"
              value="1,256"
              change="+8%"
              icon={<FaBookOpen />}
            />

            <StatCard
              title="Average Rating"
              value="4.8"
              change="+0.4"
              icon={<FaStar />}
            />

            <StatCard
              title="Satisfaction Rate"
              value="96%"
              change="+5%"
              icon={<FaSmile />}
            />

          </section>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;