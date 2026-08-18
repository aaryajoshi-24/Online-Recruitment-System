import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
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
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      const { token, user } = response.data;

      

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
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
          <h3>Welcome Back!</h3>
          <p>
            Sign in to manage your recruitment system.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="login-error">
            <i className="bi bi-exclamation-circle"></i>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="login-options">

            <label>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-password"
            >
              Forgot Password?
            </button>

          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}

            {!loading && (
              <i className="bi bi-arrow-right"></i>
            )}
          </button>

        </form>

        {/* Create Account */}
        <div className="create-account-link">
          <span>Don't have an account?</span>

          <button
            type="button"
            onClick={() => navigate("/applicant/register")}
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <span>Online Recruitment System</span>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;