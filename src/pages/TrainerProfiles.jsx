import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  FaStar,
  FaUsers,
  FaBookOpen,
  FaChartLine,
  FaAward,
} from "react-icons/fa";

import "../styles/TrainerProfiles.css";

function TrainerProfiles() {

  const trainers = [
    {
      name: "Ayesha Khan",
      department: "STEM",
      score: 98,
      rating: "4.9",
    },
    {
      name: "Fatima Noor",
      department: "Mathematics",
      score: 94,
      rating: "4.8",
    },
    {
      name: "Bilal Ahmed",
      department: "Science",
      score: 91,
      rating: "4.6",
    },
    {
      name: "Ali Hassan",
      department: "English",
      score: 88,
      rating: "4.7",
    },
    {
      name: "Sarah Ahmed",
      department: "Education",
      score: 85,
      rating: "4.5",
    },
  ];

  const skillsData = [
    { skill: "Communication", score: 88 },
    { skill: "Subject Knowledge", score: 94 },
    { skill: "Delivery", score: 86 },
    { skill: "Engagement", score: 91 },
    { skill: "Leadership", score: 84 },
  ];

  const performanceData = [
    { month: "Jan", score: 82 },
    { month: "Feb", score: 84 },
    { month: "Mar", score: 85 },
    { month: "Apr", score: 88 },
    { month: "May", score: 91 },
    { month: "Jun", score: 94 },
  ];

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <main className="trainer-page">

          {/* HEADER */}

          <section className="trainer-header">

            <div>

              <span className="page-label">
                TRAINER INTELLIGENCE
              </span>

              <h1>
                Trainer Performance
              </h1>

              <p>
                Explore trainer rankings, performance trends,
                skills, and training statistics.
              </p>

            </div>

            <input
              type="text"
              placeholder="Search trainer..."
              className="search-trainer"
            />

          </section>


          {/* SELECTED TRAINER */}

          <section className="trainer-profile-card">

            <div className="profile-main">

              <div className="large-avatar">
                A
              </div>

              <div>

                <span className="profile-label">
                  TOP PERFORMING TRAINER
                </span>

                <h2>
                  Ayesha Khan
                </h2>

                <p>
                  STEM Department
                </p>

                <div className="rating-row">

                  <FaStar />

                  <strong>
                    4.9 / 5
                  </strong>

                  <span>
                    Excellent Performance
                  </span>

                </div>

              </div>

            </div>


            <div className="profile-stats">

              <div>
                <FaBookOpen />
                <span>Total Sessions</span>
                <strong>31</strong>
              </div>

              <div>
                <FaChartLine />
                <span>Performance</span>
                <strong>94%</strong>
              </div>

              <div>
                <FaUsers />
                <span>Satisfaction</span>
                <strong>96%</strong>
              </div>

              <div>
                <FaAward />
                <span>Experience</span>
                <strong>10 Years</strong>
              </div>

            </div>

          </section>


          {/* TRAINER DASHBOARD */}

          <section className="trainer-dashboard-grid">


            {/* TOP TRAINERS */}

            <div className="trainer-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Top Performing Trainers
                  </h3>

                  <p>
                    Performance ranking across trainers
                  </p>

                </div>

              </div>


              <div className="ranking-list">

                {trainers.map((trainer, index) => (

                  <div
                    className="ranking-row"
                    key={trainer.name}
                  >

                    <span className="rank">
                      {index + 1}
                    </span>

                    <div className="rank-avatar">
                      {trainer.name.charAt(0)}
                    </div>

                    <div className="trainer-name">

                      <strong>
                        {trainer.name}
                      </strong>

                      <span>
                        {trainer.department}
                      </span>

                    </div>

                    <div className="rank-score">

                      <strong>
                        {trainer.score}%
                      </strong>

                      <span>
                        Rating {trainer.rating}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* SKILLS */}

            <div className="trainer-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Skills Assessment
                  </h3>

                  <p>
                    Performance across key dimensions
                  </p>

                </div>

              </div>


              <div className="radar-container">

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <RadarChart data={skillsData}>

                    <PolarGrid />

                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{
                        fill: "#64748b",
                        fontSize: 11,
                      }}
                    />

                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{
                        fill: "#94a3b8",
                        fontSize: 9,
                      }}
                    />

                    <Radar
                      name="Ayesha Khan"
                      dataKey="score"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.25}
                    />

                  </RadarChart>

                </ResponsiveContainer>

              </div>

            </div>


            {/* PERFORMANCE TREND */}

            <div className="trainer-panel trend-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Performance Trend
                  </h3>

                  <p>
                    Trainer performance over time
                  </p>

                </div>

                <span className="growth-badge">
                  +12%
                </span>

              </div>


              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart data={performanceData}>

                  <CartesianGrid
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    domain={[70, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#2563eb",
                    }}
                    activeDot={{
                      r: 7,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>


            {/* STATISTICS */}

            <div className="trainer-panel statistics-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Trainer Statistics
                  </h3>

                  <p>
                    Detailed performance overview
                  </p>

                </div>

              </div>


              <div className="statistics-list">

                <div className="stat-row">
                  <span>Total Sessions</span>
                  <strong>31</strong>
                </div>

                <div className="stat-row">
                  <span>Average Rating</span>
                  <strong>4.9 / 5</strong>
                </div>

                <div className="stat-row">
                  <span>Topics Covered</span>
                  <strong>12</strong>
                </div>

                <div className="stat-row">
                  <span>Participant Satisfaction</span>
                  <strong>96%</strong>
                </div>

                <div className="stat-row">
                  <span>Training Experience</span>
                  <strong>10 Years</strong>
                </div>

                <div className="specialization">

                  <span>
                    Specializations
                  </span>

                  <div>

                    <span>STEM</span>
                    <span>Leadership</span>
                    <span>Digital Learning</span>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default TrainerProfiles;