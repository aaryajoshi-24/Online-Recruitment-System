const db = require("../config/db");


/* =====================================================
   ADMIN - GET ALL JOBS
===================================================== */

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
      LEFT JOIN categories c
        ON j.category_id = c.id
      ORDER BY j.created_at DESC
    `);

    res.json(jobs);

  } catch (error) {
    console.error("Get jobs error:", error);

    res.status(500).json({
      message: "Failed to fetch jobs"
    });
  }
};


/* =====================================================
   APPLICANT - GET JOBS
   Supports search, category, location and type filters
===================================================== */

const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      category,
      location,
      type
    } = req.query;

    let query = `
      SELECT
        j.*,
        j.job_type AS type,
        c.name AS category_name
      FROM jobs j
      LEFT JOIN categories c
        ON j.category_id = c.id
      WHERE 1 = 1
    `;

    const params = [];

    if (search) {
      query += `
        AND (
          j.title LIKE ?
          OR j.company LIKE ?
        )
      `;

      params.push(
        `%${search}%`,
        `%${search}%`
      );
    }

    if (category) {
      query += `
        AND c.name = ?
      `;

      params.push(category);
    }

    if (location) {
      query += `
        AND j.location LIKE ?
      `;

      params.push(`%${location}%`);
    }

    if (type) {
      query += `
        AND j.job_type = ?
      `;

      params.push(type);
    }

    query += `
      ORDER BY j.created_at DESC
    `;

    const [rows] = await db.execute(
      query,
      params
    );

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error(
      "Error getting jobs:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error retrieving jobs."
    });
  }
};


/* =====================================================
   GET JOB BY ID
   Used by both Admin and Applicant
===================================================== */

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const [jobs] = await db.execute(
      `
      SELECT
        j.*,
        j.job_type AS type,
        c.name AS category,
        c.name AS category_name
      FROM jobs j
      LEFT JOIN categories c
        ON j.category_id = c.id
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
    console.error(
      "Get job error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch job"
    });
  }
};


/* =====================================================
   ADMIN - CREATE JOB
===================================================== */

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

    if (
      !title ||
      !company ||
      !location ||
      !job_type ||
      !description
    ) {
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
    console.error(
      "Create job error:",
      error
    );

    res.status(500).json({
      message: "Failed to create job"
    });
  }
};


/* =====================================================
   ADMIN - UPDATE JOB
===================================================== */

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
    console.error(
      "Update job error:",
      error
    );

    res.status(500).json({
      message: "Failed to update job"
    });
  }
};


/* =====================================================
   ADMIN - DELETE JOB
===================================================== */

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
    console.error(
      "Delete job error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete job"
    });
  }
};


/* =====================================================
   EXPORTS
===================================================== */

module.exports = {
  getJobs,
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};