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

        // Backend returns the application object directly
        setApp(response.data);

      } catch (err) {
        console.error('Error fetching application details:', err);

        setError(
          err.response?.data?.message ||
          'Application details not found.'
        );
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
        return (
          <span className="badge badge-selected">
            {status}
          </span>
        );

      case 'Rejected':
        return (
          <span className="badge badge-rejected">
            {status}
          </span>
        );

      case 'Under Review':
        return (
          <span className="badge badge-under-review">
            {status}
          </span>
        );

      case 'Pending':
      default:
        return (
          <span className="badge badge-pending">
            {status || 'Pending'}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <p
        style={{
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        Loading application details...
      </p>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  if (!app) {
    return (
      <div className="alert alert-danger">
        Application details could not be loaded.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >

      {/* Back Button */}
      <Link
        to="/applicant/my-applications"
        style={{
          display: 'inline-block',
          marginBottom: '1rem',
          color: '#3b82f6',
          textDecoration: 'none',
          fontWeight: 600
        }}
      >
        ← Back to My Applications
      </Link>


      {/* Main Card */}
      <div className="card">

        {/* Header */}
        <div className="card-header">
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                color: '#0f172a'
              }}
            >
              Application #{app.id}
            </h1>

            <p
              style={{
                color: '#64748b',
                fontSize: '0.9rem'
              }}
            >
              Submitted on{' '}
              {app.applied_at
                ? new Date(app.applied_at).toLocaleString()
                : 'N/A'}
            </p>
          </div>

          <div>
            {getStatusBadge(app.status)}
          </div>
        </div>


        {/* Job + Applicant Information */}
        <div
          className="grid-2"
          style={{
            marginBottom: '1.5rem'
          }}
        >

          {/* Job Details */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '6px'
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                color: '#3b82f6',
                marginBottom: '0.75rem'
              }}
            >
              Job Details
            </h3>

            <p style={{ marginBottom: '0.4rem' }}>
              <strong>Role:</strong>{' '}
              {app.job_title || 'N/A'}
            </p>

            <p style={{ marginBottom: '0.4rem' }}>
              <strong>Company:</strong>{' '}
              {app.company || 'N/A'}
            </p>

            <p style={{ marginBottom: '0.4rem' }}>
              <strong>Location:</strong>{' '}
              {app.location || 'N/A'}
            </p>

            <p style={{ marginBottom: '0.4rem' }}>
              <strong>Job Type:</strong>{' '}
              {app.job_type || 'N/A'}
            </p>

            <p>
              <strong>Salary:</strong>{' '}
              {app.salary || 'N/A'}
            </p>
          </div>


          {/* Applicant Information */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '6px'
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                color: '#3b82f6',
                marginBottom: '0.75rem'
              }}
            >
              Applicant Information
            </h3>

            <p style={{ marginBottom: '0.4rem' }}>
              <strong>Name:</strong>{' '}
              {app.applicant_name || 'N/A'}
            </p>

            <p style={{ marginBottom: '0.4rem' }}>
              <strong>Email:</strong>{' '}
              {app.applicant_email || 'N/A'}
            </p>

            <p>
              <strong>Resume:</strong>{' '}

              {app.resume ? (
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#3b82f6'
                  }}
                >
                  View Submitted Resume
                </a>
              ) : (
                <span style={{ color: '#64748b' }}>
                  No resume submitted
                </span>
              )}
            </p>
          </div>

        </div>


        {/* Cover Letter */}
        <div>
          <h3
            style={{
              fontSize: '1rem',
              color: '#0f172a',
              marginBottom: '0.5rem'
            }}
          >
            Cover Letter
          </h3>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontSize: '0.95rem',
              color: '#334155',
              minHeight: '80px',
              whiteSpace: 'pre-line'
            }}
          >
            {app.cover_letter ||
              'No cover letter was submitted.'}
          </div>
        </div>

      </div>
    </div>
  );
}