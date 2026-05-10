import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiFileText,
  FiCreditCard,
  FiMapPin,
  FiBell,
  FiRefreshCcw,
  FiClock,
  FiFolder,
  FiMessageSquare,
  FiSpeaker,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function VendorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const menuItems = [
    { title: "Dashboard", path: "/vendor/dashboard", icon: FiGrid },
    { title: "My Profile", path: "/vendor/profile", icon: FiUser },
    { title: "Apply License", path: "/vendor/apply", icon: FiFileText },
    { title: "My License", path: "/vendor/my-license", icon: FiFolder },
    { title: "Renew License", path: "/vendor/renew-license", icon: FiRefreshCcw },
    { title: "Payments", path: "/vendor/payments", icon: FiCreditCard },
    { title: "My Zone", path: "/vendor/my-zone", icon: FiMapPin },
    { title: "Complaints", path: "/vendor/complaints", icon: FiBell },
    { title: "Notifications", path: "/vendor/notifications", icon: FiBell },
    { title: "Help and Support", path: "/vendor/help", icon: FiHelpCircle },
    { title: "Settings", path: "/vendor/settings", icon: FiSettings },
    { title: "Track My Application", path: "/vendor/track-application", icon: FiMapPin },
    { title: "Inspection History", path: "/vendor/inspection-history", icon: FiClock },
    { title: "My Documents Vault", path: "/vendor/documents", icon: FiFolder },
    { title: "Feedback & Suggestion", path: "/vendor/feedback", icon: FiMessageSquare },
    { title: "Announcements", path: "/vendor/announcements", icon: FiSpeaker },
    { title: "Women Vendor Support", path: "/vendor/women-support", icon: FiUsers },
  ];

  const handleLogout = () => {
    localStorage.removeItem("hawker_token");
    localStorage.removeItem("hawker_user");
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className="vendor-sidebar-mobile-header d-flex d-lg-none align-items-center justify-content-between px-3 py-3 border-bottom">
        <Link to="/vendor/dashboard" className="text-decoration-none text-white fw-bold fs-5">
          StreetVendor
        </Link>
        <button
          type="button"
          className="btn btn-outline-light btn-sm"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>
      </div>

      <aside className={`vendor-sidebar d-flex flex-column h-100 ${sidebarOpen ? "show" : ""}`}>
        <div className="sidebar-top d-flex align-items-center justify-content-between px-3 py-3 border-bottom d-none d-lg-flex">
          <Link to="/vendor/dashboard" className="text-decoration-none text-white fw-bold fs-5">
            <span className="d-flex align-items-center gap-2">
              <i className="bi bi-shop fs-4 text-warning" />
              StreetVendor
            </span>
          </Link>
        </div>

        <div className="flex-grow-1 overflow-auto px-3 py-3">
          <h6 className="vendor-section-title">Main Menu</h6>
          <nav className="d-grid gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`vendor-menu-item ${isActive(item.path) ? "active" : ""}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="vendor-menu-icon" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-top">
          <button className="btn btn-danger w-100 text-start d-flex align-items-center gap-2" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="vendor-sidebar-overlay d-lg-none" onClick={() => setSidebarOpen(false)} />}
    </>
  );
}
