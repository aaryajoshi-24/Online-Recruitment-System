import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>{job.title}</h3>
          <span className="badge badge-tag">{job.type}</span>
        </div>
        <p style={{ fontWeight: 600, color: '#3b82f6', marginBottom: '0.5rem' }}>{job.company}</p>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
          📍 {job.location} | 📁 {job.category_name || 'General'}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600, marginBottom: '0.75rem' }}>
          💰 {job.salary}
        </p>
        <p style={{ fontSize: '0.875rem', color: '#334155', marginBottom: '1rem' }}>
          {job.description ? `${job.description.substring(0, 100)}...` : ''}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <Link to={`/jobs/${job.id}`} className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
          View Details
        </Link>
        <Link to={`/apply/${job.id}`} className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>
          Apply Now
        </Link>
      </div>
    </div>
  );
}