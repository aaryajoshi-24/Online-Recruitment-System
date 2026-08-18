import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApplicationById } from '../services/api';

export default function ApplicationDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getApplicationById(id);
        setApp(response.data.data);
      } catch (err) {
        setError('Application details not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selected':
      case 'Shortlisted':
        return <span className="badge badge-selected">{status}</span>;
      case 'Under Review':
        return <span className="badge badge-under-review">{status}</span>;
      case 'Rejected':
        return <span className="badge badge-rejected">{status}</span>;
      case 'Pending':
      default:
        return <span className="badge badge-pending">{status}</span>;
    }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading application details...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!app) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/my-applications" style={{ display: 'inline-block', marginBottom: '1rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
        ← Back to My Applications
      </Link>

      <div className="card">
        <div className="card-header">
          <div>
            <h1 style={{ fontSize: '1.5rem', color: '#0f172a' }}>Application #{app.id}</h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Submitted on {new Date(app.applied_at).toLocaleString()}</p>
          </div>
          <div>{getStatusBadge(app.status)}</div>
        </div>

        <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '1rem', color: '#3b82f6', marginBottom: '0.75rem' }}>Job Details</h3>
            <p style={{ marginBottom: '0.4rem' }}><strong>Role:</strong> {app.job_title}</p>
            <p style={{ marginBottom: '0.4rem' }}><strong>Company:</strong> {app.company}</p>
            <p style={{ marginBottom: '0.4rem' }}><strong>Location:</strong> {app.location}</p>
            <p><strong>Salary Range:</strong> {app.salary}</p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '1rem', color: '#3b82f6', marginBottom: '0.75rem' }}>Applicant Information</h3>
            <p style={{ marginBottom: '0.4rem' }}><strong>Name:</strong> {app.full_name}</p>
            <p style={{ marginBottom: '0.4rem' }}><strong>Email:</strong> {app.email}</p>
            <p style={{ marginBottom: '0.4rem' }}><strong>Phone:</strong> {app.phone}</p>
            <p>
              <strong>Resume:</strong>{' '}
              <a href={app.resume_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>
                View Submitted Resume
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Cover Letter</h3>
          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px', fontSize: '0.95rem', color: '#334155', minHeight: '80px' }}>
            {app.cover_letter || 'No cover letter was submitted.'}
          </div>
        </div>
      </div>
    </div>
  );
}