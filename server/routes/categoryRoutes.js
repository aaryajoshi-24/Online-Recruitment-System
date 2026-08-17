const express = require("express");

const {
  getCategories,
  createCategory,
  deleteCategory
} = require("../controllers/categoryController");

const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// Applicant + Admin
router.get("/", getCategories);

// Admin only
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  createCategory
);

router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteCategory
);

module.exports = router;