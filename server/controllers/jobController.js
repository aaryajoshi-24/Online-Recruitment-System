const db = require("../config/db");

const getJobs = async (req, res) => {
  try {
    const [jobs] = await db.execute(`
      SELECT
        j.id,
        j.title,
        j.company,
        j.location,
        j.job_type,
        j.salary,
        j.description,
        j.requirements,
        j.category_id,
        c.name AS category,
        j.deadline,
        j.created_at,
        j.updated_at
      FROM jobs j
      LEFT JOIN categories c ON j.category_id = c.id
      ORDER BY j.created_at DESC
    `);

    res.json(jobs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch jobs"
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const [jobs] = await db.execute(
      `
      SELECT
        j.*,
        c.name AS category
      FROM jobs j
      LEFT JOIN categories c ON j.category_id = c.id
      WHERE j.id = ?
      `,
      [id]
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(jobs[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch job"
    });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      job_type,
      salary,
      description,
      requirements,
      category_id,
      deadline
    } = req.body;

    if (!title || !company || !location || !job_type || !description) {
      return res.status(400).json({
        message: "Required job fields are missing"
      });
    }

    const [result] = await db.execute(
      `
      INSERT INTO jobs
      (
        title,
        company,
        location,
        job_type,
        salary,
        description,
        requirements,
        category_id,
        deadline
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        company,
        location,
        job_type,
        salary || null,
        description,
        requirements || null,
        category_id || null,
        deadline || null
      ]
    );

    res.status(201).json({
      message: "Job created successfully",
      jobId: result.insertId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create job"
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      company,
      location,
      job_type,
      salary,
      description,
      requirements,
      category_id,
      deadline
    } = req.body;

    const [result] = await db.execute(
      `
      UPDATE jobs
      SET
        title = ?,
        company = ?,
        location = ?,
        job_type = ?,
        salary = ?,
        description = ?,
        requirements = ?,
        category_id = ?,
        deadline = ?
      WHERE id = ?
      `,
      [
        title,
        company,
        location,
        job_type,
        salary || null,
        description,
        requirements || null,
        category_id || null,
        deadline || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json({
      message: "Job updated successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update job"
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM jobs WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json({
      message: "Job deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete job"
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};