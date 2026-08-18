import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalApplicants: 0,
    pending: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
    recentApplications: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/dashboard");

      setDashboardData(response.data);
      setError("");

    } catch (error) {
      console.error("Dashboard error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Jobs",
      value: dashboardData.totalJobs,
      icon: "bi-briefcase-fill",
      change: "Live"
    },
    {
      title: "Applications",
      value: dashboardData.totalApplications,
      icon: "bi-file-earmark-text-fill",
      change: "Live"
    },
    {
      title: "Applicants",
      value: dashboardData.totalApplicants,
      icon: "bi-people-fill",
      change: "Live"
    },
    {
      title: "Shortlisted",
      value: dashboardData.shortlisted,
      icon: "bi-person-check-fill",
      change: "Live"
    }
  ];

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-title-section">
        <div>
          <h2>Dashboard</h2>
          <p>
            Here's what's happening with your recruitment system.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/admin/jobs")}
        >
          <i className="bi bi-plus-lg"></i>
          Post New Job
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="login-error">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="stats-grid">

        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>

            <div className="stat-card-top">

              <div className="stat-icon">
                <i className={`bi ${stat.icon}`}></i>
              </div>

              <span className="stat-change">
                {loading ? "..." : stat.change}
              </span>

            </div>

            <h3>
              {loading ? "..." : stat.value}
            </h3>

            <p>{stat.title}</p>

          </div>
        ))}

      </div>

      {/* Dashboard Bottom */}
      <div className="dashboard-grid">

        {/* Recent Applications */}
        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <h5>Recent Applications</h5>
              <p>Latest applications received</p>
            </div>

            <button
              className="view-all-button"
              onClick={() => navigate("/admin/applications")}
            >
              View All
            </button>

          </div>

          {loading ? (
            <div className="empty-dashboard-state">
              <p>Loading applications...</p>
            </div>
          ) : dashboardData.recentApplications.length === 0 ? (

            <div className="empty-dashboard-state">
              <i className="bi bi-file-earmark-text"></i>
              <p>
                No applications received yet.
              </p>
            </div>

          ) : (

            <div className="recent-applications-list">

              {dashboardData.recentApplications.map(
                (application) => (

                  <div
                    className="recent-application-item"
                    key={application.id}
                  >

                    <div className="applicant-avatar">
                      {application.applicant_name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="application-info">

                      <strong>
                        {application.applicant_name}
                      </strong>

                      <span>
                        {application.job_title}
                      </span>

                    </div>

                    <div className="application-meta">

                      <span
                        className={`application-status ${application.status.toLowerCase()}`}
                      >
                        {application.status}
                      </span>

                      <small>
                        {formatDate(application.applied_at)}
                      </small>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* Application Status */}
        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <h5>Application Status</h5>
              <p>Current application overview</p>
            </div>

          </div>

          <div className="status-placeholder">

            <div>
              <strong>Pending</strong>
              <span>
                Applications waiting for review
              </span>
            </div>

            <b>
              {loading ? "..." : dashboardData.pending}
            </b>

          </div>

          <div className="status-placeholder">

            <div>
              <strong>Shortlisted</strong>
              <span>
                Applicants shortlisted
              </span>
            </div>

            <b>
              {loading ? "..." : dashboardData.shortlisted}
            </b>

          </div>

          <div className="status-placeholder">

            <div>
              <strong>Selected</strong>
              <span>
                Applicants selected
              </span>
            </div>

            <b>
              {loading ? "..." : dashboardData.selected}
            </b>

          </div>

          <div className="status-placeholder">

            <div>
              <strong>Rejected</strong>
              <span>
                Applications rejected
              </span>
            </div>

            <b>
              {loading ? "..." : dashboardData.rejected}
            </b>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;