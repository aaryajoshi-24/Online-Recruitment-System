const express = require("express");

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();


// ================= GET =================

// Applicant + Admin
router.get(
  "/",
  getCategories
);


// ================= CREATE =================

// Admin only
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  createCategory
);


// ================= UPDATE =================

// Admin only
router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  updateCategory
);


// ================= DELETE =================

// Admin only
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteCategory
);


module.exports = router;