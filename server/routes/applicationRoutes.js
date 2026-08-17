const express = require("express");

const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus
} = require("../controllers/applicationController");

const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin
router.get(
  "/",
  authenticateToken,
  requireAdmin,
  getApplications
);

router.get(
  "/:id",
  authenticateToken,
  requireAdmin,
  getApplicationById
);

// Applicant
router.post(
  "/",
  authenticateToken,
  createApplication
);

// Admin
router.put(
  "/:id/status",
  authenticateToken,
  requireAdmin,
  updateApplicationStatus
);

module.exports = router;