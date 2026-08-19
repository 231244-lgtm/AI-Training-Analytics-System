import { useState } from "react";

import {
  FaStar,
  FaBriefcase,
  FaBookOpen,
  FaTimes,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

import "../styles/TrainerCard.css";

function TrainerCard({
  name,
  department,
  rating,
  experience,
  sessions,
}) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="trainer-card">

        <div className="trainer-avatar">
          {name.charAt(0)}
        </div>

        <h3>{name}</h3>

        <p className="department">
          {department}
        </p>

        <div className="trainer-info">

          <div>
            <FaStar />
            <span>{rating}</span>
          </div>

          <div>
            <FaBriefcase />
            <span>{experience}</span>
          </div>

          <div>
            <FaBookOpen />
            <span>{sessions}</span>
          </div>

        </div>

        <button
          className="profile-btn"
          onClick={() => setShowProfile(true)}
        >
          View Profile
        </button>

      </div>


      {/* PROFILE MODAL */}

      {showProfile && (
        <div
          className="profile-overlay"
          onClick={() => setShowProfile(false)}
        >

          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="profile-close"
              onClick={() => setShowProfile(false)}
            >
              <FaTimes />
            </button>


            <div className="profile-modal-avatar">
              {name.charAt(0)}
            </div>


            <h2>{name}</h2>

            <p className="profile-modal-department">
              {department}
            </p>


            <div className="profile-modal-stats">

              <div className="profile-stat">
                <FaStar />
                <span>Rating</span>
                <strong>{rating}</strong>
              </div>

              <div className="profile-stat">
                <FaBriefcase />
                <span>Experience</span>
                <strong>{experience}</strong>
              </div>

              <div className="profile-stat">
                <FaBookOpen />
                <span>Total Sessions</span>
                <strong>{sessions}</strong>
              </div>

            </div>


            <div className="profile-summary">

              <h3>
                <FaChartLine />
                Performance Summary
              </h3>

              <p>
                This trainer profile provides an overview of
                training experience, session activity, and
                overall performance.
              </p>

            </div>


            <div className="profile-summary">

              <h3>
                <FaUsers />
                Training Information
              </h3>

              <p>
                Department: <strong>{department}</strong>
              </p>

              <p>
                Training Experience: <strong>{experience}</strong>
              </p>

              <p>
                Completed Sessions: <strong>{sessions}</strong>
              </p>

            </div>


            <button
              className="profile-modal-btn"
              onClick={() => setShowProfile(false)}
            >
              Close Profile
            </button>

          </div>

        </div>
      )}

    </>
  );
}

export default TrainerCard;