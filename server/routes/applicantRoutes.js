const express = require("express");

const {
  getApplicants,
  getApplicantById,
  getApplicantProfile,
  updateApplicantProfile
} = require("../controllers/applicantController");

const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();


/* =====================================================
   ADMIN APPLICANT MANAGEMENT
===================================================== */

// Get all applicants
router.get(
  "/",
  authenticateToken,
  requireAdmin,
  getApplicants
);


// Get applicant details by ID
router.get(
  "/:id",
  authenticateToken,
  requireAdmin,
  getApplicantById
);


/* =====================================================
   APPLICANT PROFILE
===================================================== */

// Get applicant profile
router.get(
  "/profile/:id",
  getApplicantProfile
);


// Update applicant profile
router.put(
  "/profile/:id",
  updateApplicantProfile
);


module.exports = router;