import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ApplicantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplicant();
  }, [id]);

  const fetchApplicant = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/applicants/${id}`);

      setApplicant(response.data);
      setError("");
    } catch (error) {
      console.error("Applicant details error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load applicant details."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-title-section">

        <div>
          <h2>Applicant Details</h2>
          <p>
            View applicant information.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/admin/applicants")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Applicants
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="login-error">
          <i className="bi bi-exclamation-circle"></i>
          {" "}
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (

        <div className="dashboard-card">
          <div className="empty-dashboard-state">
            <p>Loading applicant details...</p>
          </div>
        </div>

      ) : applicant ? (

        <div className="dashboard-card">

          {/* Applicant Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              paddingBottom: "25px",
              borderBottom: "1px solid #e5e8f0",
              marginBottom: "25px",
            }}
          >

            <div
              className="applicant-avatar"
              style={{
                width: "70px",
                height: "70px",
                fontSize: "28px",
              }}
            >
              {applicant.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h3
                style={{
                  marginBottom: "6px",
                  color: "#18233f",
                }}
              >
                {applicant.name}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#7d8ba8",
                }}
              >
                Applicant
              </p>
            </div>

          </div>

          {/* Information */}
          <div>

            <h5
              style={{
                marginBottom: "20px",
                color: "#18233f",
                fontSize: "20px",
              }}
            >
              Personal Information
            </h5>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "20px",
              }}
            >

              {/* Name */}
              <div>
                <p
                  style={{
                    marginBottom: "6px",
                    color: "#7d8ba8",
                    fontSize: "14px",
                  }}
                >
                  Full Name
                </p>

                <strong>
                  {applicant.name}
                </strong>
              </div>

              {/* Email */}
              <div>
                <p
                  style={{
                    marginBottom: "6px",
                    color: "#7d8ba8",
                    fontSize: "14px",
                  }}
                >
                  Email Address
                </p>

                <strong>
                  {applicant.email}
                </strong>
              </div>

              {/* Registered */}
              <div>
                <p
                  style={{
                    marginBottom: "6px",
                    color: "#7d8ba8",
                    fontSize: "14px",
                  }}
                >
                  Registered On
                </p>

                <strong>
                  {formatDate(applicant.created_at)}
                </strong>
              </div>

              {/* Applicant ID */}
              <div>
                <p
                  style={{
                    marginBottom: "6px",
                    color: "#7d8ba8",
                    fontSize: "14px",
                  }}
                >
                  Applicant ID
                </p>

                <strong>
                  #{applicant.id}
                </strong>
              </div>

            </div>

          </div>

        </div>

      ) : null}

    </div>
  );
}

export default ApplicantDetails;