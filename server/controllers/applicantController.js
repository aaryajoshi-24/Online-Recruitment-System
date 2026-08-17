const db = require("../config/db");

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
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch applicants"
    });
  }
};

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
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch applicant"
    });
  }
};

module.exports = {
  getApplicants,
  getApplicantById
};