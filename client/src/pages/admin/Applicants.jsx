import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Applicants() {
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const response = await api.get("/applicants");

      setApplicants(response.data);
      setError("");
    } catch (error) {
      console.error("Applicants error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load applicants."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}
      <div className="page-title-section">
        <div>
          <h2>Applicants</h2>
          <p>
            View and manage registered applicants.
          </p>
        </div>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="login-error">
          <i className="bi bi-exclamation-circle"></i>
          {" "}
          {error}
        </div>
      )}

      {/* ================= APPLICANTS CARD ================= */}
      <div className="dashboard-card">

        <div className="card-heading">
          <div>
            <h5>All Applicants</h5>

            <p>
              {applicants.length} applicant
              {applicants.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (

          <div className="empty-dashboard-state">
            <p>Loading applicants...</p>
          </div>

        ) : applicants.length === 0 ? (

          /* Empty */
          <div className="empty-dashboard-state">
            <i className="bi bi-people"></i>

            <p>
              No applicants registered yet.
            </p>
          </div>

        ) : (

          /* Applicants Table */
          <div className="jobs-table-wrapper">

            <table className="jobs-table">

              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Email</th>
                  <th>Registered On</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {applicants.map((applicant) => (

                  <tr key={applicant.id}>

                    {/* Applicant */}
                    <td>
                      <div className="job-title-cell">

                        <div className="applicant-avatar">
                          {applicant.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {applicant.name}
                        </strong>

                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      {applicant.email}
                    </td>

                    {/* Registered Date */}
                    <td>
                      {formatDate(applicant.created_at)}
                    </td>

                    {/* Action */}
                    <td>
                      <div className="job-actions">

                        <button
                          type="button"
                          className="icon-action-button"
                          title="View Applicant"
                          onClick={() =>
                            navigate(
                              `/admin/applicants/${applicant.id}`
                            )
                          }
                        >
                          <i className="bi bi-eye"></i>
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

export default Applicants;