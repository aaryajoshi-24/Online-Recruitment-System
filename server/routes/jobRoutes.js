const express = require("express");

const {
  getJobs,
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();


/* ================= APPLICANT + ADMIN ================= */

// Get jobs
router.get(
  "/",
  getAllJobs
);

// Get job details
router.get(
  "/:id",
  getJobById
);


/* ================= ADMIN ONLY ================= */

// Create job
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  createJob
);

// Update job
router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  updateJob
);

// Delete job
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteJob
);


module.exports = router;