import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function JobPosts() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/jobs");

      setJobs(response.data);
      setError("");
    } catch (error) {
      console.error("Jobs error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/jobs/${id}`);

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job.id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to delete job."
      );
    }
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-title-section">

        <div>
          <h2>Job Posts</h2>
          <p>
            Manage your organization's job postings.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/admin/jobs/new")}
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

      {/* Jobs Card */}
      <div className="dashboard-card job-posts-card">

        <div className="card-heading">

          <div>
            <h5>All Job Posts</h5>
            <p>
              {jobs.length} job
              {jobs.length !== 1 ? "s" : ""} posted
            </p>
          </div>

        </div>

        {loading ? (

          <div className="empty-dashboard-state">
            <p>Loading jobs...</p>
          </div>

        ) : jobs.length === 0 ? (

          <div className="empty-dashboard-state">
            <i className="bi bi-briefcase"></i>

            <p>No jobs posted yet.</p>

            <button
              className="primary-button"
              onClick={() => navigate("/admin/jobs/new")}
            >
              <i className="bi bi-plus-lg"></i>
              Create Your First Job
            </button>
          </div>

        ) : (

          <div className="jobs-table-wrapper">

            <table className="jobs-table">

              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Job Type</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {jobs.map((job) => (

                  <tr key={job.id}>

                    <td>
                      <div className="job-title-cell">
                        <div className="job-icon">
                          <i className="bi bi-briefcase-fill"></i>
                        </div>

                        <strong>{job.title}</strong>
                      </div>
                    </td>

                    <td>{job.company}</td>

                    <td>
                      <i className="bi bi-geo-alt"></i>{" "}
                      {job.location}
                    </td>

                    <td>
                      <span className="job-type-badge">
                        {job.job_type}
                      </span>
                    </td>

                    <td>
                      {job.deadline
                        ? new Date(
                            job.deadline
                          ).toLocaleDateString("en-IN")
                        : "No deadline"}
                    </td>

                    <td>

                      <div className="job-actions">

                        <button
                          className="icon-action-button"
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/admin/jobs/edit/${job.id}`
                            )
                          }
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="icon-action-button delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(job.id)
                          }
                        >
                          <i className="bi bi-trash"></i>
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default JobPosts;