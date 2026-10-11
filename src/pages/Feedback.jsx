
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import "../styles/Feedback.css";

const API_URL =
  "http://127.0.0.1:8000/api/read-foundation/feedback";
const SENTIMENT_API_URL =
  "http://127.0.0.1:8000/api/read-foundation/feedback/sentiment";
const THEMES_API_URL =
  "http://127.0.0.1:8000/api/read-foundation/feedback/themes";

const COMMENTS_PER_PAGE = 6;

function Feedback() {
  const [feedback, setFeedback] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [themes, setThemes] = useState(null);

  const [loading, setLoading] = useState(true);
  const [sentimentLoading, setSentimentLoading] = useState(true);
  const [themesLoading, setThemesLoading] = useState(true);

  const [error, setError] = useState("");
  const [sentimentError, setSentimentError] = useState("");
  const [themesError, setThemesError] = useState("");

  const [search, setSearch] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [criticismFilter, setCriticismFilter] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function fetchData(url, setter, setLoading, setError, message) {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(message);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (!cancelled) {
          setter(data);
        }
      } catch {
        if (!cancelled) {
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData(
      API_URL,
      setFeedback,
      setLoading,
      setError,
      "Could not load feedback analytics. Make sure the backend is running."
    );

    fetchData(
      SENTIMENT_API_URL,
      setSentiment,
      setSentimentLoading,
      setSentimentError,
      "Could not load sentiment analysis. Make sure the backend is running."
    );

    fetchData(
      THEMES_API_URL,
      setThemes,
      setThemesLoading,
      setThemesError,
      "Could not load feedback themes. Check the backend endpoint."
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const formatPercentage = (value) =>
    `${Number(value ?? 0).toFixed(2)}%`;

  const filteredComments = useMemo(() => {
    const comments = sentiment?.comments ?? [];
    const themeComments = themes?.comments ?? [];
    const query = search.trim().toLowerCase();

    const themeMap = new Map(
      themeComments.map((item) => [
        item.comment_id,
        item.themes ?? [],
      ])
    );

    return comments
      .map((item) => ({
        ...item,
        themes: themeMap.get(item.comment_id) ?? [],
      }))
      .filter((item) => {
        const matchesSearch = (item.comment ?? "")
          .toLowerCase()
          .includes(query);

        const matchesSentiment =
          sentimentFilter === "All" ||
          item.sentiment === sentimentFilter;

        const matchesCriticism =
          criticismFilter === "All" ||
          (criticismFilter === "Yes" &&
            item.constructive_criticism === true) ||
          (criticismFilter === "No" &&
            item.constructive_criticism !== true);

        return (
          matchesSearch &&
          matchesSentiment &&
          matchesCriticism
        );
      });
  }, [
    sentiment,
    themes,
    search,
    sentimentFilter,
    criticismFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredComments.length / COMMENTS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleComments = filteredComments.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  const criticismCount =
    sentiment?.constructive_criticism_count ??
    (sentiment?.comments ?? []).filter(
      (item) => item.constructive_criticism === true
    ).length;

  const criticismPercentage =
    sentiment?.constructive_criticism_percentage ??
    (sentiment?.total_comments_analyzed
      ? (criticismCount / sentiment.total_comments_analyzed) * 100
      : 0);

  function handleSearch(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handleSentimentFilter(event) {
    setSentimentFilter(event.target.value);
    setPage(1);
  }

  function handleCriticismFilter(event) {
    setCriticismFilter(event.target.value);
    setPage(1);
  }

  function getSentimentClass(value) {
    if (value === "Positive") return "sentiment-positive";
    if (value === "Negative") return "sentiment-negative";
    return "sentiment-neutral";
  }

  function retryPage() {
    window.location.reload();
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="feedback-page">
          <div className="feedback-header">
            <h1>Training Feedback</h1>
            <p>
              Explore participant feedback, assessment ratings,
              and opportunities to improve READ Foundation training.
            </p>
          </div>

          {loading && <p>Loading feedback analytics...</p>}

          {error && (
            <div className="summary-card" role="alert">
              <p>{error}</p>
              <button onClick={retryPage}>Retry</button>
            </div>
          )}

          {feedback && !loading && !error && (
            <>
              <div className="analytics-cards">
                <AnalyticsCard
                  title="Average Rating"
                  value={
                    feedback.average_rating == null
                      ? "N/A"
                      : `${feedback.average_rating}/5`
                  }
                  subtitle={`${Number(
                    feedback.total_responses ?? 0
                  ).toLocaleString()} responses`}
                />

                <AnalyticsCard
                  title="Positive Responses"
                  value={formatPercentage(
                    feedback.positive_percentage
                  )}
                  subtitle="Agree and strongly agree"
                />

                <AnalyticsCard
                  title="Negative Responses"
                  value={formatPercentage(
                    feedback.negative_percentage
                  )}
                  subtitle="Disagree and strongly disagree"
                />
              </div>

              <section className="ai-summary">
                <h2>Feedback Overview</h2>
                <p>
                  {feedback.feedback_questions} feedback questions
                  answered by {feedback.participants} participants.
                  These figures summarize rating-scale responses.
                </p>

                <div className="summary-grid">
                  {[
                    {
                      title: "Strongly Agree",
                      value: feedback.response_counts?.strongly_agree,
                      detail: "Rating 5",
                    },
                    {
                      title: "Agree",
                      value: feedback.response_counts?.agree,
                      detail: "Rating 4",
                    },
                    {
                      title: "Neutral",
                      value: feedback.response_counts?.neutral,
                      detail: formatPercentage(
                        feedback.neutral_percentage
                      ),
                    },
                    {
                      title: "Disagree",
                      value: feedback.response_counts?.disagree,
                      detail: "Rating 2",
                    },
                    {
                      title: "Strongly Disagree",
                      value: feedback.response_counts?.strongly_disagree,
                      detail: "Rating 1",
                    },
                    {
                      title: "Participant Comments",
                      value: feedback.comments_count,
                      detail: "Comments available",
                    },
                  ].map((item) => (
                    <div className="summary-card" key={item.title}>
                      <h3>{item.title}</h3>
                      <h1>
                        {Number(item.value ?? 0).toLocaleString()}
                      </h1>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="ai-summary">
                <h2>Question-wise Ratings</h2>
                <p>
                  Average score for each feedback question, from 1 to 5.
                </p>

                <div className="summary-grid">
                  {(feedback.question_summaries ?? []).map(
                    (question) => (
                      <div
                        className="summary-card question-rating-card"
                        key={question.question}
                      >
                        <h3>{question.question}</h3>
                        <h1>
                          {question.average_score == null
                            ? "N/A"
                            : `${question.average_score}/5`}
                        </h1>
                        <p>
                          {question.response_count} valid responses
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>
            </>
          )}

          {/* FEEDBACK THEME ANALYSIS */}
          <section className="ai-summary feedback-themes-section">
            <h2>Feedback Theme Analysis</h2>
            <p>
              Identify recurring topics in participant comments to
              understand what participants discuss most often and
              where improvements may be needed.
            </p>

            {themesLoading && <p>Loading feedback themes...</p>}

            {themesError && (
              <div className="summary-card" role="alert">
                <p>{themesError}</p>
              </div>
            )}

            {themes && !themesLoading && !themesError && (
              <>
                <div className="summary-grid theme-overview-grid">
                  <div className="summary-card">
                    <h3>Comments Analyzed</h3>
                    <h1>
                      {Number(
                        themes.total_comments_analyzed ?? 0
                      ).toLocaleString()}
                    </h1>
                    <p>Non-empty participant comments</p>
                  </div>

                  <div className="summary-card">
                    <h3>Comments with Themes</h3>
                    <h1>{themes.comments_with_themes ?? 0}</h1>
                    <p>Comments matched to one or more themes</p>
                  </div>

                  <div className="summary-card">
                    <h3>Comments without Themes</h3>
                    <h1>{themes.comments_without_themes ?? 0}</h1>
                    <p>No configured theme keywords matched</p>
                  </div>

                  <div className="summary-card">
                    <h3>Distinct Themes</h3>
                    <h1>{themes.theme_count ?? 0}</h1>
                    <p>Configured feedback categories detected</p>
                  </div>
                </div>

                <div className="theme-results">
                  <h3>Most Frequently Mentioned Themes</h3>

                  {themes.theme_summaries?.length > 0 ? (
                    <div className="theme-list">
                      {themes.theme_summaries.map((theme) => (
                        <div className="theme-item" key={theme.theme}>
                          <div className="theme-item-heading">
                            <span className="theme-name">
                              {theme.theme}
                            </span>
                            <span className="theme-stat">
                              {theme.comment_count} comments ·{" "}
                              {formatPercentage(
                                theme.percentage_of_comments
                              )}
                            </span>
                          </div>

                          <div
                            className="theme-progress-track"
                            role="img"
                            aria-label={`${theme.theme}: ${theme.comment_count} comments`}
                          >
                            <div
                              className="theme-progress-fill"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    Number(
                                      theme.percentage_of_comments ?? 0
                                    )
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No feedback themes were detected.</p>
                  )}
                </div>

                <p className="theme-method-note">
                  Method: {themes.method}. A comment can match multiple
                  themes, so theme percentages may add up to more than
                  100%. These are keyword-based categories, not
                  predictions from a trained machine-learning model.
                </p>
              </>
            )}
          </section>

          {/* SENTIMENT ANALYSIS */}
          <section className="ai-summary sentiment-section">
            <h2>AI Comment Sentiment Analysis</h2>
            <p>
              VADER estimates sentiment expressed in participant
              comments. These results are separate from questionnaire
              ratings and feedback theme analysis.
            </p>

            {sentimentLoading && (
              <p>Loading sentiment analysis...</p>
            )}

            {sentimentError && (
              <div className="summary-card" role="alert">
                <p>{sentimentError}</p>
              </div>
            )}

            {sentiment && !sentimentLoading && !sentimentError && (
              <>
                <div className="summary-grid sentiment-summary-grid">
                  <div className="summary-card">
                    <h3>Comments Analyzed</h3>
                    <h1>
                      {Number(
                        sentiment.total_comments_analyzed ?? 0
                      ).toLocaleString()}
                    </h1>
                    <p>Non-empty comments</p>
                  </div>

                  <div className="summary-card sentiment-positive-card">
                    <h3>Positive Sentiment</h3>
                    <h1>
                      {formatPercentage(sentiment.positive_percentage)}
                    </h1>
                    <p>{sentiment.positive_count} comments</p>
                  </div>

                  <div className="summary-card sentiment-neutral-card">
                    <h3>Neutral Sentiment</h3>
                    <h1>
                      {formatPercentage(sentiment.neutral_percentage)}
                    </h1>
                    <p>{sentiment.neutral_count} comments</p>
                  </div>

                  <div className="summary-card sentiment-negative-card">
                    <h3>Negative Sentiment</h3>
                    <h1>
                      {formatPercentage(sentiment.negative_percentage)}
                    </h1>
                    <p>{sentiment.negative_count} comments</p>
                  </div>

                  {/* NEW CONSTRUCTIVE CRITICISM CARD */}
                  <div className="summary-card criticism-summary-card">
                    <h3>Possible Constructive Criticism</h3>
                    <h1>
                      {Number(criticismCount).toLocaleString()}
                    </h1>
                    <p>
                      {formatPercentage(criticismPercentage)} of comments
                      contain possible improvement suggestions
                    </p>
                  </div>
                </div>

                <div className="sentiment-distribution">
                  <h3>Sentiment Distribution</h3>

                  <div
                    className="sentiment-bar"
                    role="img"
                    aria-label={`Positive ${sentiment.positive_percentage} percent, neutral ${sentiment.neutral_percentage} percent, negative ${sentiment.negative_percentage} percent`}
                  >
                    {sentiment.positive_percentage > 0 && (
                      <div
                        className="sentiment-bar-positive"
                        style={{
                          width: `${sentiment.positive_percentage}%`,
                        }}
                      />
                    )}

                    {sentiment.neutral_percentage > 0 && (
                      <div
                        className="sentiment-bar-neutral"
                        style={{
                          width: `${sentiment.neutral_percentage}%`,
                        }}
                      />
                    )}

                    {sentiment.negative_percentage > 0 && (
                      <div
                        className="sentiment-bar-negative"
                        style={{
                          width: `${sentiment.negative_percentage}%`,
                        }}
                      />
                    )}
                  </div>

                  <div className="sentiment-legend">
                    <span>
                      <i className="legend-dot positive-dot" />
                      Positive
                    </span>
                    <span>
                      <i className="legend-dot neutral-dot" />
                      Neutral
                    </span>
                    <span>
                      <i className="legend-dot negative-dot" />
                      Negative
                    </span>
                  </div>

                  <p className="sentiment-note">
                    Method: {sentiment.method}. Automated predictions
                    may miss context, mixed opinions, or constructive
                    criticism. Improvement suggestions are tracked
                    separately from overall sentiment.
                  </p>
                </div>
              </>
            )}
          </section>

          {/* SEARCHABLE AND FILTERABLE COMMENTS */}
          <section className="ai-summary comments-section">
            <div className="comments-heading">
              <div>
                <h2>Participant Comments</h2>
                <p>
                  Search comments, filter by predicted sentiment, and
                  find comments containing possible improvement suggestions.
                </p>
              </div>

              <span className="comments-count">
                {filteredComments.length} comments
              </span>
            </div>

            <div className="comment-controls">
              <input
                className="comment-search"
                type="search"
                placeholder="Search comments..."
                value={search}
                onChange={handleSearch}
                aria-label="Search participant comments"
              />

              <select
                className="sentiment-filter"
                value={sentimentFilter}
                onChange={handleSentimentFilter}
                aria-label="Filter comments by sentiment"
              >
                <option value="All">All sentiments</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>

              {/* NEW CONSTRUCTIVE CRITICISM FILTER */}
              <select
                className="criticism-filter"
                value={criticismFilter}
                onChange={handleCriticismFilter}
                aria-label="Filter comments by constructive criticism"
              >
                <option value="All">All suggestions</option>
                <option value="Yes">Possible improvements only</option>
                <option value="No">Without improvement flag</option>
              </select>
            </div>

            {sentimentLoading && (
              <p>Loading classified comments...</p>
            )}

            {sentiment && !sentimentLoading && (
              <>
                <div className="feedback-list">
                  {visibleComments.length > 0 ? (
                    visibleComments.map((item) => (
                      <article
                        className={`summary-card comment-card ${
                          item.constructive_criticism
                            ? "comment-card-criticism"
                            : ""
                        }`}
                        key={item.comment_id}
                      >
                        <div className="comment-card-heading">
                          <h3>Comment {item.comment_id}</h3>

                          <span
                            className={`sentiment-badge ${getSentimentClass(
                              item.sentiment
                            )}`}
                          >
                            {item.sentiment}
                          </span>
                        </div>

                        <p>{item.comment}</p>

                        <p className="sentiment-score">
                          Sentiment score:{" "}
                          {Number(item.sentiment_score ?? 0).toFixed(4)}
                        </p>

                        {/* NEW IMPROVEMENT SUGGESTION TAG */}
                        {item.constructive_criticism === true && (
                          <div className="criticism-indicator">
                            <span aria-hidden="true">↗</span>
                            <div>
                              <strong>
                                Possible improvement suggestion
                              </strong>
                              <p>
                                This comment may contain constructive
                                feedback for improving training.
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="comment-themes">
                          <strong>Detected themes:</strong>

                          {item.themes.length > 0 ? (
                            <div className="comment-theme-tags">
                              {item.themes.map((theme) => (
                                <span
                                  className="comment-theme-tag"
                                  key={theme}
                                >
                                  {theme}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="no-comment-themes">
                              No matching theme
                            </span>
                          )}
                        </div>
                      </article>
                    ))
                  ) : (
                    <p>
                      No comments match your search and filters.
                    </p>
                  )}
                </div>

                <div className="pagination">
                  <button
                    type="button"
                    onClick={() =>
                      setPage((previous) => Math.max(1, previous - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setPage((previous) =>
                        Math.min(totalPages, previous + 1)
                      )
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
