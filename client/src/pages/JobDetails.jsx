import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/api';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data.data);
      } catch (err) {
        setError('Job details not found or unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading job details...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!job) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/jobs" style={{ display: 'inline-block', marginBottom: '1rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
        ← Back to Jobs
      </Link>

      <div className="card">
        <div className="card-header">
          <div>
            <h1 style={{ fontSize: '1.75rem', color: '#0f172a' }}>{job.title}</h1>
            <p style={{ fontSize: '1.1rem', color: '#3b82f6', fontWeight: 600 }}>{job.company}</p>
          </div>
          <span className="badge badge-tag" style={{ fontSize: '0.85rem' }}>{job.type}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <div><strong>Location:</strong> {job.location}</div>
          <div><strong>Category:</strong> {job.category_name || 'General'}</div>
          <div><strong>Salary:</strong> {job.salary}</div>
          <div><strong>Posted Date:</strong> {new Date(job.created_at).toLocaleDateString()}</div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Job Description</h3>
          <p style={{ color: '#334155', whiteSpace: 'pre-line' }}>{job.description}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Key Responsibilities</h3>
          <p style={{ color: '#334155', whiteSpace: 'pre-line' }}>{job.responsibilities}</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Requirements & Skills</h3>
          <p style={{ color: '#334155', whiteSpace: 'pre-line' }}>{job.requirements}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <Link to={`/apply/${job.id}`} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}