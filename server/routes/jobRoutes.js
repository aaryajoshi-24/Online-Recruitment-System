const express = require("express");

const {
  getJobs,
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

// Applicant + Admin
router.get("/", getJobs);

router.get("/:id", getJobById);

// Admin only
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  createJob
);

router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  updateJob
);

router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteJob
);

module.exports = router;