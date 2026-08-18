const db = require('../config/db');

exports.submitApplication = async (req, res) => {
  try {
    const { applicant_id, job_id, full_name, email, phone, resume_url, cover_letter } = req.body;

    if (!applicant_id || !job_id || !full_name || !email || !phone || !resume_url) {
      return res.status(400).json({ success: false, message: 'Please fill in all required application fields.' });
    }

    // Verify job exists
    const [jobCheck] = await db.execute('SELECT id, title FROM jobs WHERE id = ? AND status = "Active"', [job_id]);
    if (jobCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'The job you are applying for does not exist or is closed.' });
    }

    const query = `
      INSERT INTO applications (applicant_id, job_id, full_name, email, phone, resume_url, cover_letter, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;
    
    const [result] = await db.execute(query, [
      applicant_id,
      job_id,
      full_name,
      email,
      phone,
      resume_url,
      cover_letter || ''
    ]);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        application_id: result.insertId,
        job_title: jobCheck[0].title,
        applicant_name: full_name
      }
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ success: false, message: 'Server error while submitting application.' });
  }
};

exports.getApplicationsByApplicant = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const query = `
      SELECT a.*, j.title AS job_title, j.company, j.location, j.type AS job_type
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.applicant_id = ?
      ORDER BY a.applied_at DESC
    `;
    const [rows] = await db.execute(query, [applicantId]);
    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching applicant applications:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving applications.' });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT a.*, j.title AS job_title, j.company, j.location, j.salary, j.type AS job_type
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.id = ?
    `;
    const [rows] = await db.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Application details not found.' });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error getting application details:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching application details.' });
  }
};