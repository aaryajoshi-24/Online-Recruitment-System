import React, { useState, useEffect } from 'react';
import { getJobs } from '../services/api';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getJobs({ search, category, location, type });
      setJobs(response.data.data);
    } catch (err) {
      setError('Unable to load jobs. Please ensure the server is running and database is connected.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Browse Active Jobs</h1>

      <form className="filter-panel" onSubmit={handleSearchSubmit}>
        <div>
          <label className="form-group" style={{ marginBottom: '0.2rem', fontSize: '0.85rem' }}>Search Title / Company</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Developer, TechNova"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label className="form-group" style={{ marginBottom: '0.2rem', fontSize: '0.85rem' }}>Category</label>
          <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="IT Operations">IT Operations</option>
          </select>
        </div>

        <div>
          <label className="form-group" style={{ marginBottom: '0.2rem', fontSize: '0.85rem' }}>Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Chennai, Bengaluru"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label className="form-group" style={{ marginBottom: '0.2rem', fontSize: '0.85rem' }}>Job Type</label>
          <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Filter Jobs
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading active job postings...</p>
      ) : jobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No jobs found</h3>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Try clearing or adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}