const db = require("../config/db");


// ================= GET CATEGORIES =================

const getCategories = async (req, res) => {
  try {
    const [categories] = await db.execute(
      `
      SELECT *
      FROM categories
      ORDER BY name ASC
      `
    );

    res.json(categories);

  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      message: "Failed to fetch categories"
    });
  }
};


// ================= CREATE CATEGORY =================

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const [result] = await db.execute(
      `
      INSERT INTO categories
      (
        name,
        description
      )
      VALUES (?, ?)
      `,
      [
        name.trim(),
        description?.trim() || null
      ]
    );

    res.status(201).json({
      message: "Category created successfully",
      categoryId: result.insertId
    });

  } catch (error) {
    console.error("Create category error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Category already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create category"
    });
  }
};


// ================= UPDATE CATEGORY =================

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const [result] = await db.execute(
      `
      UPDATE categories
      SET
        name = ?,
        description = ?
      WHERE id = ?
      `,
      [
        name.trim(),
        description?.trim() || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json({
      message: "Category updated successfully"
    });

  } catch (error) {
    console.error("Update category error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Category already exists"
      });
    }

    res.status(500).json({
      message: "Failed to update category"
    });
  }
};


// ================= DELETE CATEGORY =================

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json({
      message: "Category deleted successfully"
    });

  } catch (error) {
    console.error("Delete category error:", error);

    res.status(500).json({
      message: "Failed to delete category"
    });
  }
};


module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};