
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import RecommendationCard from "../components/RecommendationCard";

import "../styles/Recommendations.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Recommendations() {
  const [districts, setDistricts] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [feedbackThemes, setFeedbackThemes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchRecommendationData() {
      try {
        setLoading(true);
        setError("");

        const endpoints = [
          `${API_BASE_URL}/api/read-foundation/districts`,
          `${API_BASE_URL}/api/read-foundation/attendance`,
          `${API_BASE_URL}/api/read-foundation/feedback/themes`,
        ];

        const responses = await Promise.all(
          endpoints.map((url) => fetch(url))
        );

        if (responses.some((response) => !response.ok)) {
          throw new Error("One or more analytics endpoints failed.");
        }

        const [districtData, attendanceData, themeData] =
          await Promise.all(responses.map((response) => response.json()));

        if (
          !Array.isArray(districtData) ||
          !attendanceData ||
          typeof attendanceData !== "object" ||
          !themeData ||
          typeof themeData !== "object"
        ) {
          throw new Error("The backend returned an unexpected data format.");
        }

        if (!cancelled) {
          setDistricts(
            districtData
              .map((district) => ({
                ...district,
                average_learning_gain: Number(
                  district.average_learning_gain
                ),
              }))
              .filter(
                (district) =>
                  district.district &&
                  Number.isFinite(district.average_learning_gain)
              )
          );

          setAttendance(attendanceData);
          setFeedbackThemes(themeData);
        }
      } catch (err) {
        console.error("Recommendation data error:", err);

        if (!cancelled) {
          setError(
            "Unable to load recommendations. Check that the backend is running."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRecommendationData();

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

  const themes = Array.isArray(feedbackThemes?.theme_summaries)
    ? feedbackThemes.theme_summaries
    : [];

  const mostMentionedTheme =
    themes.length > 0
      ? themes.reduce((best, current) =>
          Number(current.comment_count) > Number(best.comment_count)
            ? current
            : best
        )
      : null;

  const recommendations = [];

  if (lowestDistrict) {
    recommendations.push({
      priority: "High",
      title: `Review learning outcomes in ${lowestDistrict.district}`,
      reason:
        "This district has the lowest average learning gain among the districts currently in the dataset.",
      evidence: `Average learning gain: ${lowestDistrict.average_learning_gain.toFixed(2)} points, compared with ${highestDistrict.average_learning_gain.toFixed(2)} points in ${highestDistrict.district}.`,
      action:
        "Review training delivery, assessment results, and local context before deciding on targeted support.",
    });
  }

  if (attendance) {
    const absent = Number(attendance.absent) || 0;
    const late = Number(attendance.late) || 0;
    const leave = Number(attendance.leave) || 0;
    const presentOnlyRate = Number(attendance.present_only_rate_percent);

    recommendations.push({
      priority:
        absent + late > 0 ? "Medium" : "Low",
      title: "Review attendance barriers",
      reason:
        "Attendance records include absences and late arrivals. Understanding their causes may help improve participation in future training.",
      evidence: `${absent} absent records, ${late} late records, and ${leave} leave records. Present-only rate: ${
        Number.isFinite(presentOnlyRate)
          ? `${presentOnlyRate.toFixed(2)}%`
          : "not available"
      }.`,
      action:
        "Ask participants about scheduling, transport, or other barriers, then compare attendance patterns across training days.",
    });
  }

  if (mostMentionedTheme) {
    recommendations.push({
      priority: "High",
      title: `Review feedback about ${mostMentionedTheme.theme}`,
      reason:
        "This is the most frequently identified theme in the current keyword-based feedback analysis. Frequency alone does not indicate whether the feedback is positive or negative.",
      evidence: `${mostMentionedTheme.comment_count} comments (${Number(mostMentionedTheme.percentage_of_comments).toFixed(2)}% of the analysed comments) mention this theme.`,
      action:
        "Read the comments associated with this theme and determine which specific practices should be maintained or improved.",
    });
  }

  const commentCount = Number(feedbackThemes?.total_comments_analyzed);
  const themeCount = Number(feedbackThemes?.theme_count);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="recommendations-page">
          <div className="recommendations-header">
            <h1> Training Recommendations</h1>
            <p>
              Evidence-based suggestions from READ Foundation district
              performance, attendance records, and trainee feedback.
            </p>
          </div>

          {error && (
            <div role="alert" className="recommendations-error">
              {error}
            </div>
          )}

          <div className="analytics-cards">
            <AnalyticsCard
              title="Data Status"
              value={loading ? "Loading..." : error ? "Unavailable" : "Connected"}
              subtitle="READ Foundation analytics"
            />

            <AnalyticsCard
              title="Districts Analysed"
              value={loading ? "..." : districts.length}
              subtitle="District learning outcomes"
            />

            <AnalyticsCard
              title="Feedback Comments"
              value={
                loading
                  ? "..."
                  : Number.isFinite(commentCount)
                    ? commentCount
                    : "N/A"
              }
              subtitle={
                Number.isFinite(themeCount)
                  ? `${themeCount} themes identified`
                  : "Theme summary unavailable"
              }
            />
          </div>

          <div className="recommendations-section">
            <h2>Recommended Actions</h2>
            <p>
              Recommendations are generated from observed dataset patterns.
              They are not trainer-level predictions.
            </p>

            {loading ? (
              <p>Analysing READ Foundation data...</p>
            ) : error ? (
              <p>Recommendations will appear when the backend is available.</p>
            ) : recommendations.length > 0 ? (
              <div className="recommendation-grid">
                {recommendations.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.title}
                    {...recommendation}
                  />
                ))}
              </div>
            ) : (
              <p>
                There is not enough data to generate recommendations yet.
              </p>
            )}
          </div>

          <div className="ai-summary">
            <h2> Data Insights</h2>

            <div className="summary-grid">
              <div className="summary-card">
                <h3>Districts Compared</h3>
                <h1>{loading ? "..." : districts.length}</h1>
                <p>
                  District-level average learning gains available for review.
                </p>
              </div>

              <div className="summary-card">
                <h3>Highest Learning Gain</h3>
                <h1>
                  {loading
                    ? "..."
                    : highestDistrict
                      ? highestDistrict.district
                      : "N/A"}
                </h1>
                <p>
                  {highestDistrict
                    ? `${highestDistrict.average_learning_gain.toFixed(2)} points average gain.`
                    : "District data unavailable."}
                </p>
              </div>

              <div className="summary-card">
                <h3>Lowest Learning Gain</h3>
                <h1>
                  {loading
                    ? "..."
                    : lowestDistrict
                      ? lowestDistrict.district
                      : "N/A"}
                </h1>
                <p>
                  {lowestDistrict
                    ? `${lowestDistrict.average_learning_gain.toFixed(2)} points average gain.`
                    : "District data unavailable."}
                </p>
              </div>

              <div className="summary-card">
                <h3>Most Mentioned Theme</h3>
                <h1>
                  {loading
                    ? "..."
                    : mostMentionedTheme
                      ? mostMentionedTheme.theme
                      : "N/A"}
                </h1>
                <p>
                  {mostMentionedTheme
                    ? `${mostMentionedTheme.comment_count} comments mention this theme.`
                    : "Feedback theme data unavailable."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
