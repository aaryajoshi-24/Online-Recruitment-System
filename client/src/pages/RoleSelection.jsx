import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center"
        }}
      >

        {/* ================= HEADER ================= */}

        <div style={{ marginBottom: "3rem" }}>

          <div
            style={{
              fontSize: "3rem",
              marginBottom: "0.75rem"
            }}
          >
            🛡️
          </div>

          <h1
            style={{
              fontSize: "2.2rem",
              color: "#0f172a",
              marginBottom: "0.5rem"
            }}
          >
            Welcome to JobPortal
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "1rem"
            }}
          >
            Please select how you want to continue
          </p>

        </div>


        {/* ================= ROLE CARDS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}
        >

          {/* ================= APPLICANT ================= */}

          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "2.5rem 2rem",
              boxShadow:
                "0 4px 15px rgba(15, 23, 42, 0.08)",
              border: "1px solid #e2e8f0"
            }}
          >

            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem"
              }}
            >
              👤
            </div>

            <h2
              style={{
                color: "#0f172a",
                fontSize: "1.4rem",
                marginBottom: "0.75rem"
              }}
            >
              Applicant
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
                marginBottom: "1.5rem"
              }}
            >
              Browse available jobs, apply for positions,
              track your applications and manage your profile.
            </p>

            <button
              onClick={() => navigate("/applicant")}
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                border: "none",
                borderRadius: "6px",
                background: "#3b82f6",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Continue as Applicant
            </button>

          </div>


          {/* ================= ADMIN ================= */}

          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "2.5rem 2rem",
              boxShadow:
                "0 4px 15px rgba(15, 23, 42, 0.08)",
              border: "1px solid #e2e8f0"
            }}
          >

            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem"
              }}
            >
              💼
            </div>

            <h2
              style={{
                color: "#0f172a",
                fontSize: "1.4rem",
                marginBottom: "0.75rem"
              }}
            >
              Administrator
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
                marginBottom: "1.5rem"
              }}
            >
              Manage jobs, applicants, applications,
              categories and other recruitment activities.
            </p>

            <button
              onClick={() => navigate("/admin/login")}
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                border: "none",
                borderRadius: "6px",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Continue as Admin
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}