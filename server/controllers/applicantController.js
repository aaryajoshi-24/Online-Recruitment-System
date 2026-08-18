const db = require('../config/db');

exports.getApplicantProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT id, name, email, phone, resume_url, created_at FROM applicants WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Applicant profile not found.' });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error getting applicant profile:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving profile.' });
  }
};

exports.updateApplicantProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, resume_url } = req.body;

    if (!name || !email || !phone || !resume_url) {
      return res.status(400).json({ success: false, message: 'Please provide all profile details.' });
    }

    const query = `
      UPDATE applicants 
      SET name = ?, email = ?, phone = ?, resume_url = ? 
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [name, email, phone, resume_url, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Applicant profile not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      data: { id, name, email, phone, resume_url }
    });
  } catch (error) {
    console.error('Error updating applicant profile:', error);
    return res.status(500).json({ success: false, message: 'Server error updating profile.' });
  }
};