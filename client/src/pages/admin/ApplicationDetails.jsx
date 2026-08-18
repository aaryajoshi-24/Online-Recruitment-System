import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/applications/${id}`);

      setApplication(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error("Application details error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load application details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!status) {
      return;
    }

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      await api.put(`/applications/${id}/status`, {
        status
      });

      setSuccess("Application status updated successfully.");

      setApplication({
        ...application,
        status
      });
    } catch (error) {
      console.error("Status update error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to update application status."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">

        <div className="page-title-section">
          <div>
            <h2>Application Details</h2>
            <p>Loading application information...</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="empty-dashboard-state">
            <p>Loading...</p>
          </div>
        </div>

      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="dashboard-page">

        <div className="page-title-section">

          <div>
            <h2>Application Details</h2>
            <p>Unable to load application.</p>
          </div>

        </div>

        <div className="login-error">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </div>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/admin/applications")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Applications
        </button>

      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-title-section">

        <div>
          <h2>Application Details</h2>
          <p>
            Review applicant information and manage application status.
          </p>
        </div>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/admin/applications")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Applications
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="login-error">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="login-success">
          <i className="bi bi-check-circle"></i>
          {success}
        </div>
      )}

      {/* Applicant Information */}
      <div className="dashboard-card application-details-card">

        <div className="details-card-header">
          <div className="details-applicant">

            <div className="large-applicant-avatar">
              {application.applicant_name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div>
              <h3>{application.applicant_name}</h3>
              <p>{application.applicant_email}</p>
            </div>

          </div>

          <span
            className={`status-badge ${application.status
              ?.toLowerCase()
              .replace(" ", "-")}`}
          >
            {application.status}
          </span>
        </div>

        <div className="details-divider"></div>

        {/* Job Information */}
        <div className="details-section">

          <h4>
            <i className="bi bi-briefcase"></i>
            Job Information
          </h4>

          <div className="details-grid">

            <div className="detail-item">
              <span>Job Title</span>
              <strong>{application.job_title || "—"}</strong>
            </div>

            <div className="detail-item">
              <span>Company</span>
              <strong>{application.company || "—"}</strong>
            </div>

            <div className="detail-item">
              <span>Applied On</span>
              <strong>
                {application.applied_at
                  ? new Date(
                      application.applied_at
                    ).toLocaleDateString("en-IN")
                  : "—"}
              </strong>
            </div>

          </div>

        </div>

        {/* Cover Letter */}
        <div className="details-section">

          <h4>
            <i className="bi bi-file-text"></i>
            Cover Letter
          </h4>

          <div className="cover-letter-box">
            {application.cover_letter || "No cover letter provided."}
          </div>

        </div>

        {/* Resume */}
        <div className="details-section">

          <h4>
            <i className="bi bi-file-earmark-person"></i>
            Resume
          </h4>

          {application.resume ? (

            <div className="resume-box">

              <div className="resume-icon">
                <i className="bi bi-file-earmark-pdf"></i>
              </div>

              <div className="resume-info">
                <strong>{application.resume}</strong>
                <span>Uploaded resume</span>
              </div>

            </div>

          ) : (

            <p className="no-data-text">
              No resume provided.
            </p>

          )}

        </div>

        {/* Status Management */}
        <div className="details-section status-management">

          <h4>
            <i className="bi bi-arrow-repeat"></i>
            Update Application Status
          </h4>

          <div className="status-update-row">

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="status-select"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Shortlisted">
                Shortlisted
              </option>

              <option value="Rejected">
                Rejected
              </option>

              <option value="Selected">
                Selected
              </option>
            </select>

            <button
              type="button"
              className="login-button update-status-button"
              onClick={handleStatusUpdate}
              disabled={updating || status === application.status}
            >
              {updating
                ? "Updating..."
                : "Update Status"}

              {!updating && (
                <i className="bi bi-check2"></i>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ApplicationDetails;