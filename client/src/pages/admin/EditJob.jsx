import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "",
    salary: "",
    description: "",
    requirements: "",
    category_id: "",
    deadline: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchJob();
    fetchCategories();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/jobs/${id}`);

      const job = response.data;

      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        job_type: job.job_type || "",
        salary: job.salary || "",
        description: job.description || "",
        requirements: job.requirements || "",
        category_id: job.category_id || "",
        deadline: job.deadline
          ? String(job.deadline).substring(0, 10)
          : ""
      });

    } catch (error) {
      console.error("Fetch job error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load job details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      const categoryData = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];

      setCategories(categoryData);

    } catch (error) {
      console.error("Category error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.job_type ||
      !formData.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put(`/jobs/${id}`, {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        job_type: formData.job_type,
        salary: formData.salary || null,
        description: formData.description,
        requirements: formData.requirements || null,
        category_id: formData.category_id
          ? Number(formData.category_id)
          : null,
        deadline: formData.deadline || null
      });

      console.log("Job updated:", response.data);

      setSuccess(
        "Job updated successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/admin/jobs");
      }, 1200);

    } catch (error) {
      console.error("Update job error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to update job. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-card">
          <div className="empty-dashboard-state">
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-title-section">

        <div>
          <h2>Edit Job</h2>
          <p>
            Update the details of this job posting.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/admin/jobs")}
          disabled={saving}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Jobs
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

      {/* Form */}
      <div className="dashboard-card add-job-card">

        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <div className="form-section">

            <div className="form-section-heading">
              <h5>Basic Information</h5>
              <p>
                Update the main details about the job.
              </p>
            </div>

            <div className="form-grid">

              {/* Job Title */}
              <div className="form-group">
                <label htmlFor="title">
                  Job Title <span>*</span>
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Software Engineer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label htmlFor="company">
                  Company <span>*</span>
                </label>

                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="e.g. ABC Technologies"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div className="form-group">
                <label htmlFor="location">
                  Location <span>*</span>
                </label>

                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g. Pune, Maharashtra"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Job Type */}
              <div className="form-group">
                <label htmlFor="job_type">
                  Job Type <span>*</span>
                </label>

                <select
                  id="job_type"
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select job type
                  </option>

                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                  <option value="Contract">
                    Contract
                  </option>

                  <option value="Remote">
                    Remote
                  </option>
                </select>
              </div>

              {/* Salary */}
              <div className="form-group">
                <label htmlFor="salary">
                  Salary
                </label>

                <input
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="e.g. ₹6 - ₹10 LPA"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="category_id">
                  Category
                </label>

                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deadline */}
              <div className="form-group">
                <label htmlFor="deadline">
                  Application Deadline
                </label>

                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="form-section">

            <div className="form-section-heading">
              <h5>Job Description</h5>
              <p>
                Update the role and responsibilities.
              </p>
            </div>

            <div className="form-group">

              <label htmlFor="description">
                Description <span>*</span>
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Enter the job description..."
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>
          </div>

          {/* Requirements */}
          <div className="form-section">

            <div className="form-section-heading">
              <h5>Requirements</h5>
              <p>
                Update the required skills and qualifications.
              </p>
            </div>

            <div className="form-group">

              <label htmlFor="requirements">
                Requirements
              </label>

              <textarea
                id="requirements"
                name="requirements"
                rows="6"
                placeholder="e.g. JavaScript, React, Node.js..."
                value={formData.requirements}
                onChange={handleChange}
              />

            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/admin/jobs")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? (
                "Updating Job..."
              ) : (
                <>
                  <i className="bi bi-check-lg"></i>
                  Update Job
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditJob;