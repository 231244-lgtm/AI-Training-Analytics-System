
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaStar,
  FaUsers,
  FaBookOpen,
  FaChartLine,
  FaAward,
  FaSearch,
  FaGraduationCap,
} from "react-icons/fa";
import "../styles/TrainerProfiles.css";

const API_BASE = "http://127.0.0.1:8000";
const PAGE_SIZE = 8;

function formatNumber(value, digits = 1) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(digits) : "N/A";
}

function formatRating(value) {
  const result = formatNumber(value);
  return result === "N/A" ? result : `${result} / 5`;
}

function getTrainerId(trainer) {
  return String(
    trainer.Trainer_ID ??
    trainer.trainer_id ??
    trainer.id ??
    ""
  );
}

function getTrainerName(trainer) {
  return (
    trainer.Trainer_Name ??
    trainer.trainer_name ??
    trainer.name ??
    getTrainerId(trainer) ??
    "Unnamed trainer"
  );
}

function getTrainerGain(trainer) {
  const fields = [
    trainer.Average_Pre_Post_Gain_Percentage_Points,
    trainer.average_pre_post_gain_percentage_points,
    trainer.average_learning_gain,
    trainer.learning_gain,
    trainer.gain,
  ];

  const value = fields.find(
    (item) =>
      item !== null &&
      item !== undefined &&
      item !== "" &&
      Number.isFinite(Number(item))
  );

  return value === undefined ? null : Number(value);
}

function LearningGainChart({ trainers }) {
  const chartData = useMemo(
    () =>
      trainers
        .map((trainer) => ({
          id: getTrainerId(trainer),
          name: getTrainerName(trainer),
          gain: getTrainerGain(trainer),
        }))
        .filter(
          (item) =>
            item.gain !== null && Number.isFinite(item.gain)
        )
        .sort((a, b) => b.gain - a.gain)
        .slice(0, 10),
    [trainers]
  );

  const width = 1000;
  const height = 360;
  const margin = {
    top: 30,
    right: 25,
    bottom: 100,
    left: 68,
  };

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const maxValue = Math.max(
    1,
    ...chartData.map((item) => item.gain)
  );
  const yMax = Math.ceil(maxValue / 5) * 5 || 5;
  const slotWidth = plotWidth / Math.max(chartData.length, 1);
  const barWidth = Math.min(54, slotWidth * 0.62);

  const ticks = Array.from(
    { length: 5 },
    (_, index) => (yMax / 4) * index
  );

  if (chartData.length === 0) {
    return (
      <div className="learning-chart-empty">
        <FaChartLine aria-hidden="true" />
        <strong>No learning-gain data available</strong>
        <p>
          No numeric learning-gain values were found in the
          currently filtered trainer records.
        </p>
      </div>
    );
  }

  return (
    <div className="trainer-chart-container">
      <svg
        className="learning-gain-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Top ten recorded trainer learning-gain values"
        preserveAspectRatio="xMidYMid meet"
      >
        {ticks.map((tick) => {
          const y =
            margin.top +
            plotHeight -
            (tick / yMax) * plotHeight;

          return (
            <g key={tick}>
              <line
                x1={margin.left}
                y1={y}
                x2={width - margin.right}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="5 5"
              />

              <text
                x={margin.left - 12}
                y={y + 4}
                textAnchor="end"
                fill="#71819c"
                fontSize="12"
              >
                {formatNumber(tick, 0)}
              </text>
            </g>
          );
        })}

        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + plotHeight}
          stroke="#94a3b8"
        />

        <line
          x1={margin.left}
          y1={margin.top + plotHeight}
          x2={width - margin.right}
          y2={margin.top + plotHeight}
          stroke="#94a3b8"
        />

        {chartData.map((item, index) => {
          const barHeight =
            (item.gain / yMax) * plotHeight;

          const x =
            margin.left +
            slotWidth * index +
            (slotWidth - barWidth) / 2;

          const y =
            margin.top + plotHeight - barHeight;

          const labelX =
            margin.left + slotWidth * (index + 0.5);

          const shortName =
            item.name.length > 15
              ? `${item.name.slice(0, 13)}…`
              : item.name;

          return (
            <g key={`${item.id}-${index}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(0, barHeight)}
                rx="5"
                fill="#2563eb"
              >
                <title>
                  {item.name}: {formatNumber(item.gain)} points
                </title>
              </rect>

              <text
                x={labelX}
                y={Math.max(margin.top + 14, y - 9)}
                textAnchor="middle"
                fill="#1d4ed8"
                fontSize="12"
                fontWeight="700"
              >
                {formatNumber(item.gain)}
              </text>

              <text
                x={labelX}
                y={margin.top + plotHeight + 20}
                textAnchor="end"
                transform={`rotate(-35 ${labelX} ${
                  margin.top + plotHeight + 20
                })`}
                fill="#71819c"
                fontSize="11"
              >
                {shortName}
              </text>
            </g>
          );
        })}

        <text
          x="18"
          y={margin.top + plotHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90 18 ${
            margin.top + plotHeight / 2
          })`}
          fill="#64748b"
          fontSize="12"
        >
          Learning gain (points)
        </text>
      </svg>
    </div>
  );
}

function TrainerProfiles() {
  const [trainers, setTrainers] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const [recordsResponse, summaryResponse] =
          await Promise.all([
            fetch(`${API_BASE}/api/trainers?limit=500`, {
              signal: controller.signal,
            }),
            fetch(`${API_BASE}/api/trainers/summary`, {
              signal: controller.signal,
            }),
          ]);

        if (!recordsResponse.ok) {
          throw new Error(
            `Trainer API returned HTTP ${recordsResponse.status}.`
          );
        }

        if (!summaryResponse.ok) {
          throw new Error(
            `Trainer summary returned HTTP ${summaryResponse.status}.`
          );
        }

        const recordsJson = await recordsResponse.json();
        const summaryJson = await summaryResponse.json();

        const records = Array.isArray(recordsJson)
          ? recordsJson
          : Array.isArray(recordsJson.trainers)
            ? recordsJson.trainers
            : Array.isArray(recordsJson.records)
              ? recordsJson.records
              : Array.isArray(recordsJson.data)
                ? recordsJson.data
                : [];

        setTrainers(records);
        setSummary(summaryJson);

        setSelectedTrainerId((currentId) => {
          if (
            records.some(
              (trainer) => getTrainerId(trainer) === currentId
            )
          ) {
            return currentId;
          }

          return records.length
            ? getTrainerId(records[0])
            : "";
        });

        if (records.length === 0) {
          setError(
            "The trainer API returned no records in a recognized format."
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message ||
              "Could not load trainer data. Check that the backend is running."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => controller.abort();
  }, []);

  const regions = useMemo(
    () =>
      [
        ...new Set(
          trainers.map((trainer) => trainer.Region).filter(Boolean)
        ),
      ].sort(),
    [trainers]
  );

  const districts = useMemo(
    () =>
      [
        ...new Set(
          trainers
            .filter(
              (trainer) =>
                !regionFilter || trainer.Region === regionFilter
            )
            .map((trainer) => trainer.District)
            .filter(Boolean)
        ),
      ].sort(),
    [trainers, regionFilter]
  );

  const specializations = useMemo(
    () =>
      [
        ...new Set(
          trainers.flatMap((trainer) =>
            [
              trainer.Primary_Specialization,
              trainer.Secondary_Specialization,
            ].filter(Boolean)
          )
        ),
      ].sort(),
    [trainers]
  );

  const filteredTrainers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return trainers.filter((trainer) => {
      const searchable = [
        getTrainerId(trainer),
        getTrainerName(trainer),
        trainer.Primary_Specialization,
        trainer.Secondary_Specialization,
        trainer.Highest_Qualification,
        trainer.Region,
        trainer.District,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || searchable.includes(query)) &&
        (!regionFilter || trainer.Region === regionFilter) &&
        (!districtFilter || trainer.District === districtFilter) &&
        (!specializationFilter ||
          trainer.Primary_Specialization === specializationFilter ||
          trainer.Secondary_Specialization === specializationFilter)
      );
    });
  }, [
    trainers,
    search,
    regionFilter,
    districtFilter,
    specializationFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTrainers.length / PAGE_SIZE)
  );

  const paginatedTrainers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredTrainers.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
  }, [filteredTrainers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    regionFilter,
    districtFilter,
    specializationFilter,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const selectedTrainer = useMemo(
    () =>
      trainers.find(
        (trainer) =>
          getTrainerId(trainer) === selectedTrainerId
      ) ?? null,
    [trainers, selectedTrainerId]
  );

  const clearFilters = () => {
    setSearch("");
    setRegionFilter("");
    setDistrictFilter("");
    setSpecializationFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <main className="trainer-page">
          <section className="trainer-header">
            <div>
              <span className="page-label">
                TRAINER INTELLIGENCE
              </span>
              <h1>Trainer Profiles</h1>
              <p>
                Explore trainer qualifications, experience,
                training activity, and recorded performance metrics.
              </p>
            </div>

            <div className="trainer-search-wrapper">
              <FaSearch aria-hidden="true" />
              <input
                type="search"
                className="search-trainer"
                placeholder="Search trainers..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search trainers"
              />
            </div>
          </section>

          {loading && (
            <div className="trainer-panel" role="status">
              Loading trainer records...
            </div>
          )}

          {!loading && error && (
            <div className="trainer-panel" role="alert">
              <h3>Unable to load trainer profiles</h3>
              <p>{error}</p>
              <button
                type="button"
                className="trainer-reset-button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="trainer-data-notice">
                <strong>Dataset-based metrics</strong>
                <p>
                  Figures are recorded in the supplied trainer dataset
                  and have not been independently verified.
                </p>
              </div>

              <section className="trainer-summary-grid">
                <div className="trainer-panel trainer-summary-card">
                  <FaUsers aria-hidden="true" />
                  <span>Total trainer records</span>
                  <strong>
                    {summary?.total_records ?? trainers.length}
                  </strong>
                </div>

                <div className="trainer-panel trainer-summary-card">
                  <FaGraduationCap aria-hidden="true" />
                  <span>Average experience</span>
                  <strong>
                    {formatNumber(summary?.average_experience_years)} years
                  </strong>
                </div>

                <div className="trainer-panel trainer-summary-card">
                  <FaBookOpen aria-hidden="true" />
                  <span>Average sessions delivered</span>
                  <strong>
                    {formatNumber(summary?.average_sessions_delivered)}
                  </strong>
                </div>

                <div className="trainer-panel trainer-summary-card">
                  <FaStar aria-hidden="true" />
                  <span>Recorded average rating</span>
                  <strong>
                    {formatRating(summary?.average_feedback_rating)}
                  </strong>
                </div>
              </section>

              <section className="trainer-panel trainer-filter-panel">
                <div className="panel-header">
                  <div>
                    <h3>Find a trainer</h3>
                    <p>
                      Filter records by region, district, or specialization.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="trainer-reset-button"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>
                </div>

                <div className="trainer-filter-grid">
                  <label>
                    Region
                    <select
                      value={regionFilter}
                      onChange={(event) => {
                        setRegionFilter(event.target.value);
                        setDistrictFilter("");
                      }}
                    >
                      <option value="">All regions</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    District
                    <select
                      value={districtFilter}
                      onChange={(event) =>
                        setDistrictFilter(event.target.value)
                      }
                    >
                      <option value="">All districts</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Specialization
                    <select
                      value={specializationFilter}
                      onChange={(event) =>
                        setSpecializationFilter(event.target.value)
                      }
                    >
                      <option value="">All specializations</option>
                      {specializations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <p className="trainer-result-count">
                  Showing {filteredTrainers.length} of {trainers.length} trainer records
                </p>
              </section>

              <section className="trainer-dashboard-grid">
                <div className="trainer-panel trainer-list-panel">
                  <div className="panel-header">
                    <div>
                      <h3>Trainer directory</h3>
                      <p>Select a trainer to view their profile.</p>
                    </div>
                  </div>

                  {paginatedTrainers.length === 0 ? (
                    <p>No trainers match your filters.</p>
                  ) : (
                    <div className="ranking-list">
                      {paginatedTrainers.map((trainer, index) => {
                        const id = getTrainerId(trainer);
                        const isSelected = id === selectedTrainerId;
                        const gain = getTrainerGain(trainer);

                        return (
                          <button
                            type="button"
                            key={id || index}
                            className={`ranking-row trainer-select-row ${
                              isSelected ? "selected" : ""
                            }`}
                            onClick={() => setSelectedTrainerId(id)}
                            aria-pressed={isSelected}
                          >
                            <span className="rank-avatar">
                              {getTrainerName(trainer)
                                .charAt(0)
                                .toUpperCase()}
                            </span>

                            <span className="trainer-name">
                              <strong>{getTrainerName(trainer)}</strong>
                              <span>
                                {trainer.Primary_Specialization || "Not recorded"}
                              </span>
                              <span>ID: {id || "N/A"}</span>
                            </span>

                            <span className="rank-score">
                              <strong>{formatNumber(gain)}</strong>
                              <span>Gain (points)</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {filteredTrainers.length > 0 && (
                    <div className="trainer-pagination">
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>

                      <div className="trainer-pagination-actions">
                        <button
                          type="button"
                          className="trainer-reset-button"
                          disabled={currentPage === 1}
                          onClick={() =>
                            setCurrentPage((page) => Math.max(1, page - 1))
                          }
                        >
                          Previous
                        </button>

                        <button
                          type="button"
                          className="trainer-reset-button"
                          disabled={currentPage === totalPages}
                          onClick={() =>
                            setCurrentPage((page) =>
                              Math.min(totalPages, page + 1)
                            )
                          }
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="trainer-panel selected-trainer-panel">
                  {!selectedTrainer ? (
                    <p>Select a trainer to view their profile.</p>
                  ) : (
                    <>
                      <div className="profile-main">
                        <div className="large-avatar">
                          {getTrainerName(selectedTrainer)
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <span className="profile-label">
                            TRAINER PROFILE
                          </span>
                          <h2>{getTrainerName(selectedTrainer)}</h2>
                          <p>{getTrainerId(selectedTrainer)}</p>
                          <p>
                            {selectedTrainer.District || "District not recorded"}
                            {selectedTrainer.Region
                              ? ` · ${selectedTrainer.Region}`
                              : ""}
                          </p>

                          <div className="rating-row">
                            <FaStar aria-hidden="true" />
                            <strong>
                              {formatRating(
                                selectedTrainer.Average_Feedback_Rating_Out_of_5
                              )}
                            </strong>
                            <span>Recorded rating</span>
                          </div>
                        </div>
                      </div>

                      <div className="profile-stats">
                        <div>
                          <FaBookOpen aria-hidden="true" />
                          <span>Sessions delivered</span>
                          <strong>
                            {formatNumber(
                              selectedTrainer.Training_Sessions_Delivered,
                              0
                            )}
                          </strong>
                        </div>

                        <div>
                          <FaChartLine aria-hidden="true" />
                          <span>Learning gain</span>
                          <strong>
                            {formatNumber(getTrainerGain(selectedTrainer))} points
                          </strong>
                        </div>

                        <div>
                          <FaUsers aria-hidden="true" />
                          <span>Attendance rate</span>
                          <strong>
                            {formatNumber(
                              selectedTrainer.Average_Attendance_Rate_Percent
                            )}%
                          </strong>
                        </div>

                        <div>
                          <FaAward aria-hidden="true" />
                          <span>Experience</span>
                          <strong>
                            {formatNumber(
                              selectedTrainer.Years_of_Experience,
                              0
                            )} years
                          </strong>
                        </div>
                      </div>

                      <div className="statistics-list">
                        <div className="stat-row">
                          <span>Highest qualification</span>
                          <strong>
                            {selectedTrainer.Highest_Qualification || "N/A"}
                          </strong>
                        </div>

                        <div className="stat-row">
                          <span>Primary specialization</span>
                          <strong>
                            {selectedTrainer.Primary_Specialization || "N/A"}
                          </strong>
                        </div>

                        <div className="stat-row">
                          <span>Secondary specialization</span>
                          <strong>
                            {selectedTrainer.Secondary_Specialization || "N/A"}
                          </strong>
                        </div>

                        <div className="stat-row">
                          <span>Region</span>
                          <strong>{selectedTrainer.Region || "N/A"}</strong>
                        </div>

                        <div className="stat-row">
                          <span>District</span>
                          <strong>{selectedTrainer.District || "N/A"}</strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>

              <section className="trainer-panel trainer-learning-chart">
                <div className="panel-header">
                  <div>
                    <h3>Recorded learning gain</h3>
                    <p>
                      Top ten recorded learning-gain values in the current filtered list.
                    </p>
                  </div>
                </div>

                <LearningGainChart trainers={filteredTrainers} />
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default TrainerProfiles;
