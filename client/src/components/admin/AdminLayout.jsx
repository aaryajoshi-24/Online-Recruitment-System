import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "bi-grid-fill",
    },
    {
      name: "Job Posts",
      path: "/admin/jobs",
      icon: "bi-briefcase-fill",
    },
    {
      name: "Applications",
      path: "/admin/applications",
      icon: "bi-file-earmark-text-fill",
    },
    {
      name: "Applicants",
      path: "/admin/applicants",
      icon: "bi-people-fill",
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: "bi-tags-fill",
    },
  
    
  ];

  return (
    <div className="admin-layout">

      {/* ================= SIDEBAR ================= */}
      <aside className="admin-sidebar">

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <i className="bi bi-briefcase-fill"></i>
          </div>

          <div>
            <h2>JobPortal</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        {/* Menu Title */}
        <div className="sidebar-title">
          MAIN MENU
        </div>

        {/* Menu */}
        <nav className="sidebar-menu">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>

        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">

          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your recruitment system</p>
          </div>

          <div className="admin-header-right">

            {/* Notification */}
            <button
              type="button"
              className="notification-button"
            >
              <i className="bi bi-bell"></i>

              <span className="notification-dot"></span>
            </button>

            {/* Admin Profile */}
            <div className="admin-profile">

              <div className="admin-avatar">
                A
              </div>

              <div>
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>

            </div>

          </div>

        </header>

        {/* Page Content */}
        <section className="admin-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default AdminLayout;