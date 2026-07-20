import {
  FaStar,
  FaBriefcase,
  FaBookOpen,
} from "react-icons/fa";

import "../styles/TrainerCard.css";

function TrainerCard({
  name,
  department,
  rating,
  experience,
  sessions,
}) {
  return (
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

      <button className="profile-btn">
        View Profile
      </button>

    </div>
  );
}

export default TrainerCard;