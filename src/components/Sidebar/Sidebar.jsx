import { useState } from "react";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const handleNavigation = (page) => {
    onNavigate(page);

    // Close sidebar on mobile after navigation
    setIsOpen(false);
  };

  return (
    <>
      {/* =========================
          Mobile Header
      ========================= */}

      <div className="mobile-header">
        <button
          className="menu-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className="mobile-logo">
          <div className="logo-icon">T</div>
          <span>TaskFlow</span>
        </div>
      </div>

      {/* =========================
          Overlay
      ========================= */}

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {/* =========================
          Sidebar
      ========================= */}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">T</div>

          <span>TaskFlow</span>

          {/* Mobile close button */}
          <button
            className="close-sidebar-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <p className="nav-title">MAIN MENU</p>

          {/* Dashboard */}
          <button
            className={`nav-item ${
              currentPage === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleNavigation("dashboard")}
          >
            <span className="nav-icon">⌂</span>

            <span>Dashboard</span>
          </button>

          {/* Today */}
          <button
            className={`nav-item ${currentPage === "today" ? "active" : ""}`}
            onClick={() => handleNavigation("today")}
          >
            <span className="nav-icon">📅</span>

            <span>Today</span>
          </button>

          {/* Projects */}
          <button
            className={`nav-item ${currentPage === "projects" ? "active" : ""}`}
            onClick={() => handleNavigation("projects")}
          >
            <span className="nav-icon">▣</span>

            <span>Projects</span>
          </button>

          {/* Tasks */}
          <button
            className={`nav-item ${currentPage === "tasks" ? "active" : ""}`}
            onClick={() => handleNavigation("tasks")}
          >
            <span className="nav-icon">✓</span>

            <span>Tasks</span>
          </button>

          {/* Calendar */}
          <button
            className={`nav-item ${currentPage === "calendar" ? "active" : ""}`}
            onClick={() => handleNavigation("calendar")}
          >
            <span className="nav-icon">▣</span>

            <span>Calendar</span>
          </button>

          {/* Analytics */}
          <button
            className={`nav-item ${
              currentPage === "analytics" ? "active" : ""
            }`}
            onClick={() => handleNavigation("analytics")}
          >
            <span className="nav-icon">▥</span>

            <span>Analytics</span>
          </button>

          {/* General */}
          <p className="nav-title settings-title">GENERAL</p>

          {/* Settings */}
          <button
            className={`nav-item ${currentPage === "settings" ? "active" : ""}`}
            onClick={() => handleNavigation("settings")}
          >
            <span className="nav-icon">⚙</span>

            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom */}
        <div className="sidebar-bottom">
          <button className="logout-button">
            <span className="nav-icon">↪</span>

            <span onClick={logout}>
                Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
