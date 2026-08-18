function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <h4>Admin Dashboard</h4>
        <p>Manage your recruitment system</p>
      </div>

      <div className="admin-header-actions">
        <button className="header-icon-button">
          <i className="bi bi-bell"></i>
          <span className="notification-dot"></span>
        </button>

        <div className="admin-profile">
          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;