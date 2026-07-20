import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TrainerCard from "../components/TrainerCard";

import "../styles/TrainerProfiles.css";

function TrainerProfiles() {
  const trainers = [
    {
      name: "Ayesha Khan",
      department: "STEM Department",
      rating: "4.8 / 5",
      experience: "8 Years",
      sessions: "24 Sessions",
    },
    {
      name: "Bilal Ahmed",
      department: "Science Department",
      rating: "4.6 / 5",
      experience: "6 Years",
      sessions: "19 Sessions",
    },
    {
      name: "Fatima Noor",
      department: "Mathematics",
      rating: "4.9 / 5",
      experience: "10 Years",
      sessions: "31 Sessions",
    },
    {
      name: "Ali Hassan",
      department: "English Department",
      rating: "4.7 / 5",
      experience: "7 Years",
      sessions: "22 Sessions",
    },
  ];

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="trainer-page">

          <div className="trainer-header">

            <div>
              <h1>Trainer Profiles</h1>

              <p>
                Browse trainer information, performance summary,
                and professional details.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search trainer..."
              className="search-trainer"
            />

          </div>

          <div className="trainer-grid">

            {trainers.map((trainer, index) => (
              <TrainerCard
                key={index}
                name={trainer.name}
                department={trainer.department}
                rating={trainer.rating}
                experience={trainer.experience}
                sessions={trainer.sessions}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default TrainerProfiles;