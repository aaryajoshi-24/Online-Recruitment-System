import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/applications");

      console.log("Applications:", response.data);

      const applicationData = Array.isArray(response.data)
        ? response.data
        : response.data.applications || [];

      setApplications(applicationData);
    } catch (error) {
      console.error("Applications error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-badge pending";

      case "Shortlisted":
        return "status-badge shortlisted";

      case "Selected":
        return "status-badge selected";

      case "Rejected":
        return "status-badge rejected";

      default:
        return "status-badge";
    }
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-title-section">

        <div>
          <h2>Applications</h2>
          <p>
            Review and manage job applications.
          </p>
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="login-error">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </div>
      )}

      {/* Applications Card */}
      <div className="dashboard-card applications-card">

        <div className="card-heading">

          <div>
            <h5>All Applications</h5>

            <p>
              {applications.length} application
              {applications.length !== 1 ? "s" : ""}
            </p>
          </div>

        </div>

        {loading ? (

          <div className="empty-dashboard-state">
            <p>Loading applications...</p>
          </div>

        ) : applications.length === 0 ? (

          <div className="empty-dashboard-state">

            <i className="bi bi-file-earmark-text"></i>

            <p>No applications received yet.</p>

          </div>

        ) : (

          <div className="applications-table-wrapper">

            <table className="applications-table">

              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Job</th>
                  <th>Email</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {applications.map((application) => (

                  <tr key={application.id}>

                    {/* Applicant */}
                    <td>
                      <div className="applicant-cell">

                        <div className="applicant-avatar">
                          {application.applicant_name
                            ?.charAt(0)
                            ?.toUpperCase() || "A"}
                        </div>

                        <div>
                          <strong>
                            {application.applicant_name}
                          </strong>
                        </div>

                      </div>
                    </td>

                    {/* Job */}
                    <td>
                      <strong>
                        {application.job_title}
                      </strong>
                    </td>

                    {/* Email */}
                    <td>
                      {application.applicant_email}
                    </td>

                    {/* Date */}
                    <td>
                      {application.applied_at
                        ? new Date(
                            application.applied_at
                          ).toLocaleDateString("en-IN")
                        : "—"}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={getStatusClass(
                          application.status
                        )}
                      >
                        {application.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td>

                      <button
                        type="button"
                        className="view-application-button"
                        onClick={() =>
                          navigate(
                            `/admin/applications/${application.id}`
                          )
                        }
                      >
                        <i className="bi bi-eye"></i>
                        View
                      </button>

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

export default Applications;