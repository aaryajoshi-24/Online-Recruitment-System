import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddJob() {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);

      const response = await api.get("/categories");

      console.log("Categories:", response.data);

      const categoryData = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];

      setCategories(categoryData);

    } catch (error) {
      console.error("Category error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load categories."
      );
    } finally {
      setCategoryLoading(false);
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
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/jobs", {
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

      console.log("Job created:", response.data);

      setSuccess(
        "Job posted successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/admin/jobs");
      }, 1200);

    } catch (error) {
      console.error("Create job error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to create job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-title-section">

        <div>
          <h2>Post New Job</h2>
          <p>
            Create a new job posting for applicants.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/admin/jobs")}
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
                Enter the main details about the job.
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
                  disabled={categoryLoading}
                >
                  <option value="">
                    {categoryLoading
                      ? "Loading categories..."
                      : "Select category"}
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

          {/* Job Description */}
          <div className="form-section">

            <div className="form-section-heading">
              <h5>Job Description</h5>
              <p>
                Describe the role and responsibilities.
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
                Mention the skills, qualifications and
                experience required.
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
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? (
                "Creating Job..."
              ) : (
                <>
                  <i className="bi bi-check-lg"></i>
                  Create Job
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddJob;