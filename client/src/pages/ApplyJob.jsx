import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, getApplicantProfile, submitApplication, DEMO_APPLICANT_ID } from '../services/api';

export default function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    resume_url: '',
    cover_letter: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const jobRes = await getJobById(jobId);
        setJob(jobRes.data);

        // Pre-fill demo applicant details
        try {
          const applicantRes = await getApplicantProfile(DEMO_APPLICANT_ID);
          const appData = applicantRes.data.data;
          setFormData((prev) => ({
            ...prev,
            full_name: appData.name || '',
            email: appData.email || '',
            phone: appData.phone || '',
            resume_url: appData.resume_url || ''
          }));
        } catch (e) {
          console.warn('Demo applicant profile not pre-filled.');
        }
      } catch (err) {
        setError('Job details could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.phone || !formData.resume_url) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        applicant_id: DEMO_APPLICANT_ID,
        job_id: jobId,
        ...formData
      };
      const response = await submitApplication(payload);
      navigate('/application-success', { state: response.data.data });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading application form...</p>;
  if (error && !job) return <div className="alert alert-danger">{error}</div>;

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <div className="card">
        <div className="card-header">
          <div>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a' }}>Application Form</h2>
            <p style={{ color: '#3b82f6', fontWeight: 600, fontSize: '1rem', marginTop: '0.25rem' }}>
              Applying for: {job?.title} ({job?.company})
            </p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="full_name"
              className="form-control"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Resume Link / Document URL *</label>
            <input
              type="url"
              name="resume_url"
              className="form-control"
              placeholder="https://example.com/resumes/my_resume.pdf"
              value={formData.resume_url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cover Letter (Optional)</label>
            <textarea
              name="cover_letter"
              className="form-control"
              rows="4"
              placeholder="Introduce yourself and state why you are a great fit for this position..."
              value={formData.cover_letter}
              onChange={handleChange}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ flex: 2 }}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}