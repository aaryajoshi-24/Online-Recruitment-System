import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../services/api";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJobById(id);

        // Backend returns the job object directly
        setJob(response.data);

      } catch (err) {
        console.error("Error fetching job details:", err);

        setError(
          err.response?.data?.message ||
          "Job details not found or unavailable."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "2rem"
        }}
      >
        Loading job details...
      </p>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  /* ================= NO JOB ================= */

  if (!job) {
    return (
      <div className="alert alert-danger">
        Job details are unavailable.
      </div>
    );
  }

  /* ================= JOB DETAILS ================= */

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto"
      }}
    >

      {/* Back to Jobs */}

      <Link
        to="/applicant/jobs"
        style={{
          display: "inline-block",
          marginBottom: "1rem",
          color: "#3b82f6",
          textDecoration: "none",
          fontWeight: 600
        }}
      >
        ← Back to Jobs
      </Link>


      <div className="card">

        {/* ================= HEADER ================= */}

        <div className="card-header">

          <div>

            <h1
              style={{
                fontSize: "1.75rem",
                color: "#0f172a"
              }}
            >
              {job.title}
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#3b82f6",
                fontWeight: 600
              }}
            >
              {job.company}
            </p>

          </div>


          <span
            className="badge badge-tag"
            style={{
              fontSize: "0.85rem"
            }}
          >
            {job.job_type || job.type || "Not specified"}
          </span>

        </div>


        {/* ================= JOB INFORMATION ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
            padding: "1rem",
            backgroundColor: "#f8fafc",
            borderRadius: "6px"
          }}
        >

          <div>
            <strong>Location:</strong>{" "}
            {job.location || "Not specified"}
          </div>

          <div>
            <strong>Category:</strong>{" "}
            {job.category_name || "General"}
          </div>

          <div>
            <strong>Job Type:</strong>{" "}
            {job.job_type || job.type || "Not specified"}
          </div>

          <div>
            <strong>Salary:</strong>{" "}
            {job.salary || "Not specified"}
          </div>

          <div>
            <strong>Posted Date:</strong>{" "}
            {job.created_at
              ? new Date(job.created_at).toLocaleDateString()
              : "Not available"}
          </div>

          <div>
            <strong>Deadline:</strong>{" "}
            {job.deadline
              ? new Date(job.deadline).toLocaleDateString()
              : "Not specified"}
          </div>

        </div>


        {/* ================= DESCRIPTION ================= */}

        <div
          style={{
            marginBottom: "1.5rem"
          }}
        >

          <h3
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
              color: "#0f172a"
            }}
          >
            Job Description
          </h3>

          <p
            style={{
              color: "#334155",
              whiteSpace: "pre-line"
            }}
          >
            {job.description || "No description provided."}
          </p>

        </div>


        {/* ================= REQUIREMENTS ================= */}

        <div
          style={{
            marginBottom: "2rem"
          }}
        >

          <h3
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
              color: "#0f172a"
            }}
          >
            Requirements & Skills
          </h3>

          <p
            style={{
              color: "#334155",
              whiteSpace: "pre-line"
            }}
          >
            {job.requirements || "No specific requirements provided."}
          </p>

        </div>


        {/* ================= APPLY BUTTON ================= */}

        <div
          style={{
            textAlign: "right"
          }}
        >

          <Link
            to={`/applicant/apply/${job.id}`}
            className="btn btn-primary"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem"
            }}
          >
            Apply Now
          </Link>

        </div>

      </div>

    </div>
  );
}