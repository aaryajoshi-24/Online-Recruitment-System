const express = require("express");

const {
  getApplications,
  getApplicationById,
  submitApplication,
  getApplicationsByApplicant,
  getApplicantApplicationById,
  updateApplicationStatus
} = require("../controllers/applicationController");

const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();


/* =====================================================
   ADMIN
===================================================== */

// Get all applications
router.get(
  "/",
  authenticateToken,
  requireAdmin,
  getApplications
);


// Get application details - Admin
router.get(
  "/:id",
  authenticateToken,
  requireAdmin,
  getApplicationById
);


// Update application status - Admin
router.put(
  "/:id/status",
  authenticateToken,
  requireAdmin,
  updateApplicationStatus
);


/* =====================================================
   APPLICANT
===================================================== */

// Submit application
// No authentication because current Applicant module
// uses DEMO_APPLICANT_ID.
router.post(
  "/",
  submitApplication
);


// Get applications of an applicant
router.get(
  "/applicant/:applicantId",
  getApplicationsByApplicant
);


// Get applicant-side application details
router.get(
  "/details/:id",
  getApplicantApplicationById
);


module.exports = router;