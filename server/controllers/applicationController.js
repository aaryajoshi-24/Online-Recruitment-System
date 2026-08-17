const db = require("../config/db");

const getApplications = async (req, res) => {
  try {
    const [applications] = await db.execute(`
      SELECT
        a.id,
        a.job_id,
        a.applicant_id,
        a.cover_letter,
        a.resume,
        a.status,
        a.applied_at,
        j.title AS job_title,
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

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const [applications] = await db.execute(
      `
      SELECT
        a.*,
        j.title AS job_title,
        j.company,
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

const createApplication = async (req, res) => {
  try {
    const {
      job_id,
      applicant_id,
      cover_letter,
      resume
    } = req.body;

    if (!job_id || !applicant_id) {
      return res.status(400).json({
        message: "Job and applicant are required"
      });
    }

    const [job] = await db.execute(
      "SELECT id FROM jobs WHERE id = ?",
      [job_id]
    );

    if (job.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const [existing] = await db.execute(
      `
      SELECT id
      FROM applications
      WHERE job_id = ? AND applicant_id = ?
      `,
      [job_id, applicant_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "You have already applied for this job"
      });
    }

    const [result] = await db.execute(
      `
      INSERT INTO applications
      (
        job_id,
        applicant_id,
        cover_letter,
        resume
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        job_id,
        applicant_id,
        cover_letter || null,
        resume || null
      ]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: result.insertId
    });
  } catch (error) {
    console.error("Create application error:", error);

    res.status(500).json({
      message: "Failed to submit application"
    });
  }
};

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
    console.error("Update application status error:", error);

    res.status(500).json({
      message: "Failed to update application status"
    });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus
};