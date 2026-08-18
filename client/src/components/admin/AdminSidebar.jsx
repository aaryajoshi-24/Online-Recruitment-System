import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: "bi-grid-1x2-fill",
    path: "/admin/dashboard"
  },
  {
    label: "Job Posts",
    icon: "bi-briefcase-fill",
    path: "/admin/jobs"
  },
  {
    label: "Applications",
    icon: "bi-file-earmark-text-fill",
    path: "/admin/applications"
  },
  {
    label: "Applicants",
    icon: "bi-people-fill",
    path: "/admin/applicants"
  },
  {
    label: "Categories",
    icon: "bi-tags-fill",
    path: "/admin/categories"
  },
  {
    label: "Users",
    icon: "bi-person-badge-fill",
    path: "/admin/users"
  },
  {
    label: "Reports",
    icon: "bi-bar-chart-fill",
    path: "/admin/reports"
  },
  {
    label: "Settings",
    icon: "bi-gear-fill",
    path: "/admin/settings"
  }
];

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="brand-icon">
          <i className="bi bi-briefcase-fill"></i>
        </div>

        <div>
          <h5>JobPortal</h5>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="admin-navigation">
        <p className="nav-section-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="logout-button">
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;