const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();


/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Online Recruitment System API is running"
  });
});


/* ================= API ROUTES ================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/applicants",
  applicantRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);


/* ================= 404 HANDLER ================= */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message:
      err.message ||
      "Internal server error"
  });
});


/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});