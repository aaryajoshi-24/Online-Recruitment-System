import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // ================= FETCH =================

  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchCategories = async () => {

    try {

      setLoading(true);

      const response = await api.get("/categories");

      setCategories(
        Array.isArray(response.data)
          ? response.data
          : response.data.categories || []
      );

      setError("");

    } catch (error) {

      console.error("Categories error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load categories."
      );

    } finally {

      setLoading(false);

    }
  };


  // ================= INPUT =================

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };


  // ================= SUBMIT =================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {

      setError("Category name is required.");

      return;
    }

    try {

      setSaving(true);


      // EDIT
      if (editingId) {

        await api.put(
          `/categories/${editingId}`,
          {
            name: formData.name.trim(),
            description: formData.description.trim()
          }
        );

        setSuccess(
          "Category updated successfully."
        );

      }

      // CREATE
      else {

        await api.post(
          "/categories",
          {
            name: formData.name.trim(),
            description: formData.description.trim()
          }
        );

        setSuccess(
          "Category created successfully."
        );
      }


      // Reset form
      setFormData({
        name: "",
        description: ""
      });

      setEditingId(null);

      await fetchCategories();


    } catch (error) {

      console.error("Category save error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to save category."
      );

    } finally {

      setSaving(false);

    }
  };


  // ================= EDIT =================

  const handleEdit = (category) => {

    setEditingId(category.id);

    setFormData({
      name: category.name || "",
      description: category.description || ""
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // ================= CANCEL EDIT =================

  const handleCancelEdit = () => {

    setEditingId(null);

    setFormData({
      name: "",
      description: ""
    });

    setError("");
    setSuccess("");
  };


  // ================= DELETE =================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;


    try {

      setError("");
      setSuccess("");

      await api.delete(
        `/categories/${id}`
      );

      setCategories(
        (previousCategories) =>
          previousCategories.filter(
            (category) =>
              category.id !== id
          )
      );

      // If deleting currently edited category
      if (editingId === id) {

        setEditingId(null);

        setFormData({
          name: "",
          description: ""
        });
      }

      setSuccess(
        "Category deleted successfully."
      );


    } catch (error) {

      console.error(
        "Delete category error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to delete category."
      );
    }
  };


  return (

    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <div className="page-title-section">

        <div>

          <h2>
            Categories
          </h2>

          <p>
            Manage job categories for your recruitment system.
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


      {/* ================= SUCCESS ================= */}

      {success && (

        <div className="login-success">

          <i className="bi bi-check-circle"></i>

          {" "}

          {success}

        </div>

      )}


      {/* ================= CONTENT ================= */}

      <div className="category-page-grid">


        {/* ================= ADD / EDIT ================= */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>

              <h5>
                {editingId
                  ? "Edit Category"
                  : "Add Category"}
              </h5>

              <p>
                {editingId
                  ? "Update the selected job category."
                  : "Create a new job category."}
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>


            {/* Name */}

            <div className="form-group">

              <label htmlFor="categoryName">

                Category Name{" "}

                <span>*</span>

              </label>

              <input
                type="text"
                id="categoryName"
                name="name"
                placeholder="e.g. IT & Software"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* Description */}

            <div
              className="form-group"
              style={{
                marginTop: "18px"
              }}
            >

              <label htmlFor="categoryDescription">

                Description

              </label>

              <textarea
                id="categoryDescription"
                name="description"
                rows="5"
                placeholder="Brief description of the category..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>


            {/* Buttons */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px"
              }}
            >

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >

                <i
                  className={
                    editingId
                      ? "bi bi-check-lg"
                      : "bi bi-plus-lg"
                  }
                ></i>

                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Category"
                    : "Add Category"}

              </button>


              {/* Cancel */}

              {editingId && (

                <button
                  type="button"
                  className="view-all-button"
                  onClick={handleCancelEdit}
                >

                  Cancel

                </button>

              )}

            </div>

          </form>

        </div>


        {/* ================= CATEGORY LIST ================= */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>

              <h5>
                All Categories
              </h5>

              <p>

                {categories.length} categor
                {categories.length === 1
                  ? "y"
                  : "ies"}

              </p>

            </div>

          </div>


          {/* Loading */}

          {loading ? (

            <div className="empty-dashboard-state">

              <p>
                Loading categories...
              </p>

            </div>


          ) : categories.length === 0 ? (

            /* Empty */

            <div className="empty-dashboard-state">

              <i className="bi bi-tags"></i>

              <p>
                No categories added yet.
              </p>

            </div>


          ) : (

            /* List */

            <div className="category-list">

              {categories.map(
                (category) => (

                  <div
                    className="category-item"
                    key={category.id}
                  >


                    {/* Icon */}

                    <div className="category-icon">

                      <i className="bi bi-tag-fill"></i>

                    </div>


                    {/* Info */}

                    <div className="category-info">

                      <strong>
                        {category.name}
                      </strong>

                      {category.description && (

                        <span>
                          {category.description}
                        </span>

                      )}

                    </div>


                    {/* Actions */}

                    <div className="job-actions">


                      {/* Edit */}

                      <button
                        type="button"
                        className="icon-action-button"
                        title="Edit category"
                        onClick={() =>
                          handleEdit(category)
                        }
                      >

                        <i className="bi bi-pencil"></i>

                      </button>


                      {/* Delete */}

                      <button
                        type="button"
                        className="icon-action-button delete"
                        title="Delete category"
                        onClick={() =>
                          handleDelete(category.id)
                        }
                      >

                        <i className="bi bi-trash"></i>

                      </button>


                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default Categories;