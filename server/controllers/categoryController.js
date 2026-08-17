const db = require("../config/db");

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
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch categories"
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const [result] = await db.execute(
      `
      INSERT INTO categories (name, description)
      VALUES (?, ?)
      `,
      [name, description || null]
    );

    res.status(201).json({
      message: "Category created successfully",
      categoryId: result.insertId
    });
  } catch (error) {
    console.error(error);

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
    console.error(error);

    res.status(500).json({
      message: "Failed to delete category"
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory
};