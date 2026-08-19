const express = require("express");

const {
  register,
  registerAdmin,
  login
} = require("../controllers/authController");

const router = express.Router();


/* =====================================================
   APPLICANT REGISTER
===================================================== */

router.post(
  "/register",
  register
);


/* =====================================================
   ADMIN REGISTER
===================================================== */

router.post(
  "/admin-register",
  registerAdmin
);


/* =====================================================
   LOGIN
===================================================== */

router.post(
  "/login",
  login
);


module.exports = router;