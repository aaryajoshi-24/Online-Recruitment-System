import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getApplicationsByApplicant,
  DEMO_APPLICANT_ID
} from "../services/api";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log(
          "Fetching applications for applicant:",
          DEMO_APPLICANT_ID
        );

        const response = await getApplicationsByApplicant(
          DEMO_APPLICANT_ID
        );

        console.log("Applications API response:", response);
        console.log("Applications data:", response.data);

        if (response.data && response.data.success) {
          setApplications(response.data.data || []);
        } else {
          setApplications([]);
          setError(
            response.data?.message ||
            "Failed to fetch your applications."
          );
        }

      } catch (err) {
        console.error("APPLICATION FETCH ERROR:", err);

        console.error(
          "Response:",
          err.response
        );

        console.error(
          "Request:",
          err.request
        );

        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch your applications."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Selected":
      case "Shortlisted":
        return (
          <span className="badge badge-selected">
            {status}
          </span>
        );

      case "Under Review":
        return (
          <span className="badge badge-under-review">
            {status}
          </span>
        );

      case "Rejected":
        return (
          <span className="badge badge-rejected">
            {status}
          </span>
        );

      case "Pending":
      default:
        return (
          <span className="badge badge-pending">
            {status || "Pending"}
          </span>
        );
    }
  };


  /* ================= LOADING ================= */

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "2rem"
        }}
      >
        Loading submitted applications...
      </p>
    );
  }


  /* ================= PAGE ================= */

  return (
    <div>

      <div
        className="card-header"
        style={{
          marginBottom: "1.5rem"
        }}
      >
        <h1
          style={{
            fontSize: "1.75rem",
            color: "#0f172a"
          }}
        >
          My Applications
        </h1>
      </div>


      {/* ERROR */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {/* NO APPLICATIONS */}

      {!error && applications.length === 0 && (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "3rem"
          }}
        >
          <h3>
            No applications submitted yet
          </h3>

          <p
            style={{
              color: "#64748b",
              margin: "0.5rem 0 1.5rem 0"
            }}
          >
            Explore available opportunities and
            start applying.
          </p>

          <Link
            to="/applicant/jobs"
            className="btn btn-primary"
          >
            Browse Open Jobs
          </Link>
        </div>
      )}


      {/* APPLICATION TABLE */}

      {!error && applications.length > 0 && (
        <div className="table-responsive">

          <table className="data-table">

            <thead>
              <tr>
                <th>App ID</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {applications.map((app) => (

                <tr key={app.id}>

                  <td
                    style={{
                      fontWeight: 600
                    }}
                  >
                    #{app.id}
                  </td>


                  <td
                    style={{
                      fontWeight: 600,
                      color: "#0f172a"
                    }}
                  >
                    {app.job_title}
                  </td>


                  <td>
                    {app.company}
                  </td>


                  <td>
                    {app.location || "-"}
                  </td>


                  <td>
                    {app.job_type || "-"}
                  </td>


                  <td>
                    {app.applied_at
                      ? new Date(
                          app.applied_at
                        ).toLocaleDateString()
                      : "-"}
                  </td>


                  <td>
                    {getStatusBadge(
                      app.status
                    )}
                  </td>


                  <td>

                    <Link
                      to={`/applicant/applications/${app.id}`}
                      className="btn btn-outline"
                      style={{
                        padding:
                          "0.35rem 0.75rem",
                        fontSize: "0.8rem"
                      }}
                    >
                      View Details
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}