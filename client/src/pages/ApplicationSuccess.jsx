import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ApplicationSuccess() {
  const location = useLocation();
  const info = location.state || {
    application_id: 'N/A',
    job_title: 'Submitted Position',
    applicant_name: 'Applicant'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ color: '#0f172a', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          Application Submitted Successfully!
        </h1>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Thank you, <strong>{info.applicant_name}</strong>. Your job application has been recorded.
        </p>

        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px', textAlign: 'left', marginBottom: '2rem' }}>
          <p style={{ marginBottom: '0.4rem' }}><strong>Application ID:</strong> #{info.application_id}</p>
          <p style={{ marginBottom: '0.4rem' }}><strong>Applied Job Title:</strong> {info.job_title}</p>
          <p><strong>Current Status:</strong> <span className="badge badge-pending">Pending</span></p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/my-applications" className="btn btn-primary">
            View My Applications
          </Link>
          <Link to="/jobs" className="btn btn-outline">
            Browse More Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}