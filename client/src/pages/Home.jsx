import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, getApplicationsByApplicant, DEMO_APPLICANT_ID } from '../services/api';

export default function Home() {
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [myAppsCount, setMyAppsCount] = useState(0);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const jobsRes = await getJobs();
        setActiveJobsCount(jobsRes.data.data.length);

        const appsRes = await getApplicationsByApplicant(DEMO_APPLICANT_ID);
        const apps = appsRes.data.data;
        setMyAppsCount(apps.length);
        setRecentApplications(apps.slice(0, 4));
      } catch (err) {
        console.warn('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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

  return (
    <div>
      <section className="hero">
        <h1>Welcome Back, Aarav!</h1>
        <p>Explore open job roles, submit applications, and track recruitment progress live from your portal.</p>
        <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          Explore Job Openings
        </Link>
      </section>

      {/* Counter Stat Cards matching Panel 2 & Panel 12 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Job Openings</div>
          <div className="stat-value" style={{ color: '#4f46e5' }}>{loading ? '...' : activeJobsCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Applications Submitted</div>
          <div className="stat-value" style={{ color: '#059669' }}>{loading ? '...' : myAppsCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Profile Status</div>
          <div className="stat-value" style={{ color: '#0284c7' }}>Active</div>
        </div>
      </div>

      {/* Recent Applications Table matching Image Panel 2 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">My Recent Applications</h2>
          <Link to="/my-applications" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
            View All
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No recent applications found. Start browsing open job roles.</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 600 }}>{app.job_title}</td>
                    <td>{app.company}</td>
                    <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                    <td>{getStatusBadge(app.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}