import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Demo Applicant ID constant (configurable)
export const DEMO_APPLICANT_ID = 1;

export const getJobs = (params) => api.get('/jobs', { params });
export const getJobById = (id) => api.get(`/jobs/${id}`);

export const submitApplication = (data) => api.post('/applications', data);
export const getApplicationsByApplicant = (applicantId) => api.get(`/applications/applicant/${applicantId}`);
export const getApplicationById = (id) => api.get(`/applications/${id}`);

export const getApplicantProfile = (id) => api.get(`/applicants/${id}`);
export const updateApplicantProfile = (id, data) => api.put(`/applicants/${id}`, data);

export default api;