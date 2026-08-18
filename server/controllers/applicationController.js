const db = require("../config/db");


/* =====================================================
   ADMIN - GET ALL APPLICATIONS
===================================================== */

const getApplications = async (req, res) => {
  try {
    const [applications] = await db.execute(`
      SELECT
        a.*,
        j.title AS job_title,
        j.company,
        u.name AS applicant_name,
        u.email AS applicant_email
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      JOIN users u ON a.applicant_id = u.id
      ORDER BY a.applied_at DESC
    `);

    res.json(applications);
  } catch (error) {
    console.error("Get applications error:", error);

    res.status(500).json({
      message: "Failed to fetch applications"
    });
  }
};


/* =====================================================
   ADMIN - GET APPLICATION BY ID
===================================================== */

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const [applications] = await db.execute(
      `
      SELECT
        a.*,
        j.title AS job_title,
        j.company,
        j.location,
        j.salary,
        u.name AS applicant_name,
        u.email AS applicant_email
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      JOIN users u ON a.applicant_id = u.id
      WHERE a.id = ?
      `,
      [id]
    );

    if (applications.length === 0) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(applications[0]);
  } catch (error) {
    console.error("Get application error:", error);

    res.status(500).json({
      message: "Failed to fetch application"
    });
  }
};


/* =====================================================
   APPLICANT - SUBMIT APPLICATION
===================================================== */

const submitApplication = async (req, res) => {
  try {
    const {
      applicant_id,
      job_id,
      full_name,
      email,
      phone,
      resume_url,
      cover_letter
    } = req.body;

    if (
      !applicant_id ||
      !job_id ||
      !full_name ||
      !email ||
      !phone ||
      !resume_url
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required application fields."
      });
    }

    // Check whether the job exists and is active
    const [jobCheck] = await db.execute(
      `
      SELECT id, title
      FROM jobs
      WHERE id = ?
      AND status = "Active"
      `,
      [job_id]
    );

    if (jobCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "The job you are applying for does not exist or is closed."
      });
    }

    // Prevent duplicate application
    const [existing] = await db.execute(
      `
      SELECT id
      FROM applications
      WHERE applicant_id = ?
      AND job_id = ?
      `,
      [applicant_id, job_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job."
      });
    }

    const query = `
      INSERT INTO applications
      (
        applicant_id,
        job_id,
        full_name,
        email,
        phone,
        resume_url,
        cover_letter,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;

    const [result] = await db.execute(query, [
      applicant_id,
      job_id,
      full_name,
      email,
      phone,
      resume_url,
      cover_letter || ""
    ]);

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: {
        application_id: result.insertId,
        job_title: jobCheck[0].title,
        applicant_name: full_name
      }
    });

  } catch (error) {
    console.error("Error submitting application:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting application."
    });
  }
};


/* =====================================================
   APPLICANT - GET MY APPLICATIONS
===================================================== */

const getApplicationsByApplicant = async (req, res) => {
  try {
    const { applicantId } = req.params;

    const query = `
      SELECT
        a.*,
        j.title AS job_title,
        j.company,
        j.location,
        j.salary,
        j.type AS job_type
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.applicant_id = ?
      ORDER BY a.applied_at DESC
    `;

    const [rows] = await db.execute(
      query,
      [applicantId]
    );

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error(
      "Error fetching applicant applications:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error retrieving applications."
    });
  }
};


/* =====================================================
   APPLICANT - GET APPLICATION DETAILS
===================================================== */

const getApplicantApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT
        a.*,
        j.title AS job_title,
        j.company,
        j.location,
        j.salary,
        j.type AS job_type
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.id = ?
    `;

    const [rows] = await db.execute(
      query,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application details not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error(
      "Error getting application details:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error fetching application details."
    });
  }
};


/* =====================================================
   ADMIN - UPDATE APPLICATION STATUS
===================================================== */

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Shortlisted",
      "Rejected",
      "Selected"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status"
      });
    }

    const [result] = await db.execute(
      `
      UPDATE applications
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application status updated successfully"
    });

  } catch (error) {
    console.error(
      "Update application status error:",
      error
    );

    res.status(500).json({
      message: "Failed to update application status"
    });
  }
};


/* =====================================================
   EXPORTS
===================================================== */

module.exports = {
  getApplications,
  getApplicationById,
  submitApplication,
  getApplicationsByApplicant,
  getApplicantApplicationById,
  updateApplicationStatus
};