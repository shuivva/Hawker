import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
<<<<<<< HEAD
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
=======
  FiChevronDown,
  FiShoppingBag,
} from "react-icons/fi";
import { FaRegListAlt } from "react-icons/fa";

const navigationCategories = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: FiGrid,
    path: "/vendor/dashboard",
    subItems: [],
  },
  {
    id: "account",
    title: "My Account",
    icon: FiUser,
    subItems: [
      { title: "My Profile", path: "/vendor/profile" },
      { title: "Settings & Preferences", path: "/vendor/settings" },
      { title: "Document Vault", path: "/vendor/documents" },
    ],
  },
  {
    id: "licenses",
    title: "Licenses",
    icon: FaRegListAlt,
    subItems: [
      { title: "Apply License", path: "/vendor/apply" },
      { title: "My License", path: "/vendor/my-license" },
      { title: "Renew License", path: "/vendor/renew-license" },
      { title: "Track My Application", path: "/vendor/track-application" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    icon: FiSettings,
    subItems: [
      { title: "Payments", path: "/vendor/payments" },
      { title: "My Zone", path: "/vendor/my-zone" },
      { title: "Inspection History", path: "/vendor/inspection-history" },
    ],
  },
  {
    id: "support",
    title: "Support & Communication",
    icon: FiHelpCircle,
    subItems: [
      { title: "Notifications", path: "/vendor/notifications" },
      { title: "Complaints", path: "/vendor/complaints" },
      { title: "My Complaints Tracking", path: "/vendor/complaint-tracking" },
      { title: "Help & Support", path: "/vendor/help" },
      { title: "Feedback & Suggestions", path: "/vendor/feedback" },
      { title: "Announcements", path: "/vendor/announcements" },
    ],
  },
  {
    id: "special",
    title: "Women Vendor Support",
    icon: FiUsers,
    subItems: [
      { title: "Women Vendor Support", path: "/vendor/women-support" },
    ],
  },
];
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89

export default function VendorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89

  const handleLogout = () => {
    localStorage.removeItem("hawker_token");
    localStorage.removeItem("hawker_user");
<<<<<<< HEAD
    setSidebarOpen(false);
=======
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
    navigate("/login");
  };

  return (
<<<<<<< HEAD
    <>
      <div className="vendor-sidebar-mobile-header d-flex d-lg-none align-items-center justify-content-between px-3 py-3 border-bottom">
        <Link to="/vendor/dashboard" className="text-decoration-none text-white fw-bold fs-5">
          StreetVendor
=======
    <aside className="vendor-sidebar">
      {/* Header */}
      <div className="admin-sidebar-header">
        <Link
          to="/vendor/dashboard"
          className="text-decoration-none d-flex align-items-center gap-2"
        >
          <FiShoppingBag className="text-primary fs-4" />
          <div>
            <div className="fw-bold" style={{ color: "var(--hawker-ink)" }}>
              StreetVendor
            </div>
            <small className="text-muted">Vendor Portal</small>
          </div>
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
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

<<<<<<< HEAD
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
=======
      {/* Nav */}
      <nav className="vendor-nav">
        <p className="vendor-nav-label">Main Menu</p>

        {navigationCategories.map((cat) => {
          const Icon = cat.icon;
          const isOpen = expanded[cat.id];
          const hasSubItems = cat.subItems.length > 0;
          const anySub = cat.subItems.some((s) => isActive(s.path));
          const directActive = !hasSubItems && isActive(cat.path);

          if (!hasSubItems) {
            return (
              <Link
                key={cat.id}
                to={cat.path}
                className={`admin-nav-item${directActive ? " active" : ""}`}
              >
                <Icon className="admin-nav-icon" />
                <span>{cat.title}</span>
              </Link>
            );
          }

          return (
            <div key={cat.id}>
              <button
                className={`vendor-nav-group${anySub ? " active" : ""}`}
                onClick={() => toggle(cat.id)}
                aria-expanded={isOpen}
              >
                <span className="d-flex align-items-center gap-2">
                  <Icon className="admin-nav-icon" />
                  {cat.title}
                </span>
                <FiChevronDown
                  className={`vendor-nav-chevron${isOpen ? " open" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="vendor-subnav">
                  {cat.subItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`vendor-subnav-item${isActive(item.path) ? " active" : ""}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="admin-sidebar-footer">
        <button
          className="admin-nav-item text-danger w-100 border-0 bg-transparent text-start"
          onClick={handleLogout}
        >
          <FiLogOut className="admin-nav-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
  );
}
