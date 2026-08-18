import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApplicationsByApplicant, DEMO_APPLICANT_ID } from '../services/api';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplicationsByApplicant(DEMO_APPLICANT_ID);
        setApplications(response.data.data);
      } catch (err) {
        setError('Failed to fetch your applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

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

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading submitted applications...</p>;

  return (
    <div>
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#0f172a' }}>My Applications</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No applications submitted yet</h3>
          <p style={{ color: '#64748b', margin: '0.5rem 0 1.5rem 0' }}>Explore available opportunities and start applying.</p>
          <Link to="/jobs" className="btn btn-primary">Browse Open Jobs</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 600 }}>#{app.id}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{app.job_title}</td>
                  <td>{app.company}</td>
                  <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <Link to={`/applications/${app.id}`} className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}