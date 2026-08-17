const express = require("express");

const {
  getApplicants,
  getApplicantById
} = require("../controllers/applicantController");

const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  requireAdmin,
  getApplicants
);

router.get(
  "/:id",
  authenticateToken,
  requireAdmin,
  getApplicantById
);

module.exports = router;