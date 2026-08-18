const db = require('../config/db');

exports.getAllJobs = async (req, res) => {
  try {
    const { search, category, location, type } = req.query;
    let query = `
      SELECT j.*, c.name AS category_name 
      FROM jobs j 
      LEFT JOIN categories c ON j.category_id = c.id 
      WHERE j.status = 'Active'
    `;
    const params = [];

    if (search) {
      query += ` AND (j.title LIKE ? OR j.company LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      query += ` AND c.name = ?`;
      params.push(category);
    }

    if (location) {
      query += ` AND j.location LIKE ?`;
      params.push(`%${location}%`);
    }

    if (type) {
      query += ` AND j.type = ?`;
      params.push(type);
    }

    query += ` ORDER BY j.created_at DESC`;

    const [rows] = await db.execute(query, params);
    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error getting jobs:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving jobs.' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT j.*, c.name AS category_name 
      FROM jobs j 
      LEFT JOIN categories c ON j.category_id = c.id 
      WHERE j.id = ? AND j.status = 'Active'
    `;
    const [rows] = await db.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Job posting not found or inactive.' });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error getting job details:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving job details.' });
  }
};