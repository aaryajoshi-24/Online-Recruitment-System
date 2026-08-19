import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

/* ================= AUTH TOKEN ================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


/* ================= APPLICANT API ================= */

// Demo Applicant ID
export const DEMO_APPLICANT_ID = 1;

export const getJobs = (params) =>
  api.get("/jobs", { params });

export const getJobById = (id) =>
  api.get(`/jobs/${id}`);

export const submitApplication = (data) =>
  api.post("/applications", data);

export const getApplicationsByApplicant = (applicantId) =>
  api.get(`/applications/applicant/${applicantId}`);

// Applicant-side application details
export const getApplicationById = (id) =>
  api.get(`/applications/details/${id}`);

// Applicant Profile
export const getApplicantProfile = (id) =>
  api.get(`/applicants/profile/${id}`);

export const updateApplicantProfile = (id, data) =>
  api.put(`/applicants/profile/${id}`, data);


/* ================= EXPORT ================= */

export default api;