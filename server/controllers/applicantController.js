const db = require("../config/db");

/* =====================================================
   ADMIN - GET ALL APPLICANTS
===================================================== */

const getApplicants = async (req, res) => {
  try {
    const [applicants] = await db.execute(`
      SELECT
        id,
        name,
        email,
        created_at
      FROM users
      WHERE role = 'applicant'
      ORDER BY created_at DESC
    `);

    res.json(applicants);

  } catch (error) {
    console.error("Error getting applicants:", error);

    res.status(500).json({
      message: "Failed to fetch applicants"
    });
  }
};


/* =====================================================
   ADMIN - GET APPLICANT BY ID
===================================================== */

const getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;

    const [applicants] = await db.execute(
      `
      SELECT
        id,
        name,
        email,
        created_at
      FROM users
      WHERE id = ? AND role = 'applicant'
      `,
      [id]
    );

    if (applicants.length === 0) {
      return res.status(404).json({
        message: "Applicant not found"
      });
    }

    res.json(applicants[0]);

  } catch (error) {
    console.error("Error getting applicant:", error);

    res.status(500).json({
      message: "Failed to fetch applicant"
    });
  }
};


/* =====================================================
   APPLICANT - GET PROFILE
===================================================== */

const getApplicantProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `
      SELECT
        id,
        name,
        email,
        phone,
        resume_url,
        created_at
      FROM users
      WHERE id = ? AND role = 'applicant'
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Applicant profile not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error("Error getting applicant profile:", error);

    return res.status(500).json({
      success: false,
      message: "Server error retrieving profile."
    });
  }
};


/* =====================================================
   APPLICANT - UPDATE PROFILE
===================================================== */

const updateApplicantProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      resume_url
    } = req.body;

    if (!name || !email || !phone || !resume_url) {
      return res.status(400).json({
        success: false,
        message: "Please provide all profile details."
      });
    }

    const [result] = await db.execute(
      `
      UPDATE users
      SET
        name = ?,
        email = ?,
        phone = ?,
        resume_url = ?
      WHERE id = ? AND role = 'applicant'
      `,
      [
        name,
        email,
        phone,
        resume_url,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Applicant profile not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: {
        id,
        name,
        email,
        phone,
        resume_url
      }
    });

  } catch (error) {
    console.error("Error updating applicant profile:", error);

    return res.status(500).json({
      success: false,
      message: "Server error updating profile."
    });
  }
};


/* =====================================================
   EXPORTS
===================================================== */

module.exports = {
  getApplicants,
  getApplicantById,
  getApplicantProfile,
  updateApplicantProfile
};