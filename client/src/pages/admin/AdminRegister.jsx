import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/admin-register",
        formData
      );

      setSuccess(
        response.data.message ||
        "Admin account created successfully."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: ""
      });

      // Go to login after a short delay
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);

    } catch (error) {
      console.error("Admin registration error:", error);

      setError(
        error.response?.data?.message ||
        "Admin registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* Brand */}
        <div className="login-brand">

          <div className="login-brand-icon">
            <i className="bi bi-briefcase-fill"></i>
          </div>

          <h2>JobPortal</h2>

          <p>Admin Panel</p>

        </div>


        {/* Heading */}
        <div className="login-heading">

          <h3>Create Admin Account</h3>

          <p>
            Create an account to manage the recruitment system.
          </p>

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
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              padding: "0.75rem",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "0.9rem"
            }}
          >
            <i
              className="bi bi-check-circle"
              style={{ marginRight: "0.5rem" }}
            ></i>

            {success}
          </div>
        )}


        {/* Registration Form */}
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <div className="input-wrapper">

              <i className="bi bi-person"></i>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <div className="input-wrapper">

              <i className="bi bi-envelope"></i>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrapper">

              <i className="bi bi-lock"></i>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Create Account */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Admin Account"
            }

            {!loading && (
              <i className="bi bi-arrow-right"></i>
            )}
          </button>

        </form>


        {/* Back to Login */}
        <div className="create-account-link">

          <span>
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
          >
            Sign In
          </button>

        </div>


        {/* Footer */}
        <div className="login-footer">

          <span>
            Online Recruitment System
          </span>

        </div>

      </div>

    </div>
  );
}

export default AdminRegister;