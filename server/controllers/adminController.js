const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    // Total jobs
    const [jobCount] = await db.execute(
      "SELECT COUNT(*) AS totalJobs FROM jobs"
    );

    // Total applications
    const [applicationCount] = await db.execute(
      "SELECT COUNT(*) AS totalApplications FROM applications"
    );

    // Total applicants
    const [applicantCount] = await db.execute(
      `SELECT COUNT(*) AS totalApplicants
       FROM users
       WHERE role = 'applicant'`
    );

    // Pending applications
    const [pendingCount] = await db.execute(
      `SELECT COUNT(*) AS pending
       FROM applications
       WHERE status = 'Pending'`
    );

    // Shortlisted applications
    const [shortlistedCount] = await db.execute(
      `SELECT COUNT(*) AS shortlisted
       FROM applications
       WHERE status = 'Shortlisted'`
    );

    // Selected applications
    const [selectedCount] = await db.execute(
      `SELECT COUNT(*) AS selected
       FROM applications
       WHERE status = 'Selected'`
    );

    // Rejected applications
    const [rejectedCount] = await db.execute(
      `SELECT COUNT(*) AS rejected
       FROM applications
       WHERE status = 'Rejected'`
    );

    // Recent applications
    const [recentApplications] = await db.execute(`
      SELECT
        a.id,
        a.status,
        a.applied_at,
        u.name AS applicant_name,
        u.email AS applicant_email,
        j.title AS job_title,
        j.company
      FROM applications a
      JOIN users u ON a.applicant_id = u.id
      JOIN jobs j ON a.job_id = j.id
      ORDER BY a.applied_at DESC
      LIMIT 5
    `);

    res.json({
      totalJobs: jobCount[0].totalJobs,
      totalApplications: applicationCount[0].totalApplications,
      totalApplicants: applicantCount[0].totalApplicants,
      pending: pendingCount[0].pending,
      shortlisted: shortlistedCount[0].shortlisted,
      selected: selectedCount[0].selected,
      rejected: rejectedCount[0].rejected,
      recentApplications
    });

  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics"
    });
  }
};

module.exports = {
  getDashboardStats
};