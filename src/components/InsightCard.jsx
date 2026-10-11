
import { useEffect, useState } from "react";

import {
  FaUserTie,
  FaSmile,
  FaShieldAlt,
  FaLightbulb,
  FaBrain,
} from "react-icons/fa";

import "../styles/InsightCard.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function InsightCard() {
  const [learning, setLearning] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchInsights() {
      try {
        const responses = await Promise.all([
          fetch(`${API_BASE_URL}/api/read-foundation/learning-gain`),
          fetch(`${API_BASE_URL}/api/read-foundation/attendance`),
          fetch(`${API_BASE_URL}/api/read-foundation/districts`),
        ]);

        if (responses.some((response) => !response.ok)) {
          throw new Error("Unable to load analytics.");
        }

        const [learningData, attendanceData, districtData] =
          await Promise.all(responses.map((response) => response.json()));

        if (!cancelled) {
          setLearning(learningData);
          setAttendance(attendanceData);
          setDistricts(districtData);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load READ Foundation insights.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchInsights();

    return () => {
      cancelled = true;
    };
  }, []);

  const highestDistrict =
    districts.length > 0
      ? districts.reduce((best, current) =>
          current.average_learning_gain > best.average_learning_gain
            ? current
            : best
        )
      : null;

  const lowestDistrict =
    districts.length > 0
      ? districts.reduce((lowest, current) =>
          current.average_learning_gain < lowest.average_learning_gain
            ? current
            : lowest
        )
      : null;

  const improvementRate =
    learning && learning.total_participants > 0
      ? (
          (learning.participants_improved / learning.total_participants) *
          100
        ).toFixed(1)
      : null;

  return (
    <div className="insight-card">
      <div className="insight-title">
        <div className="insight-heading">
          <div className="insight-main-icon">
            <FaBrain />
          </div>

          <div>
            <h3>Training Insights</h3>
            <p>READ Foundation dataset analysis</p>
          </div>
        </div>

        <span className="insight-status">
          <span className="status-dot"></span>
          {loading ? "Loading" : error ? "Unavailable" : "Data available"}
        </span>
      </div>

      {error ? (
        <p role="alert">{error}</p>
      ) : loading ? (
        <p>Calculating insights...</p>
      ) : (
        <>
          <div className="insight-box">
            <div className="insight-icon trainer-icon">
              <FaUserTie />
            </div>

            <div>
              <span>Participants Improved</span>
              <h4>
                {learning.participants_improved} /{" "}
                {learning.total_participants}
              </h4>
            </div>
          </div>

          <div className="insight-box">
            <div className="insight-icon satisfaction-icon">
              <FaSmile />
            </div>

            <div>
              <span>Participants Who Improved</span>
              <h4>{improvementRate}%</h4>
            </div>
          </div>

          <div className="insight-box">
            <div className="insight-icon risk-icon">
              <FaShieldAlt />
            </div>

            <div>
              <span>Attendance Rate</span>
              <h4>{attendance.present_or_late_rate_percent}%</h4>
            </div>
          </div>

          <div className="recommendation">
            <div className="recommendation-header">
              <FaLightbulb />

              <div>
                <span>Data-Based Observation</span>
                <h4>Learning Performance</h4>
              </div>
            </div>

            {highestDistrict && lowestDistrict ? (
              <p>
                {highestDistrict.district} has the highest average learning
                gain at {highestDistrict.average_learning_gain} points.
                {" "}
                {lowestDistrict.district} has the lowest at{" "}
                {lowestDistrict.average_learning_gain} points. These results
                can help identify districts for further review.
              </p>
            ) : (
              <p>District comparisons are not currently available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default InsightCard;
