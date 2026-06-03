<<<<<<< HEAD
import { useMemo, useState } from "react";
import { FiBell, FiCheckCircle, FiClock, FiCreditCard, FiShield, FiChevronRight } from "react-icons/fi";
import VendorLayout from "../../components/layout/VendorLayout";
import PageTitle from "../../components/common/PageTitle";

const notificationsData = [
  {
    id: 1,
    category: "Renewal",
    status: "Unread",
    title: "License Renewal Reminder",
    message:
      "Your license expires in 15 days on January 25, 2026. Renew now to avoid service interruption and get an early renewal discount of 5%.",
    date: "2026-01-10T09:30:00Z",
    action: "Renew Now",
    badge: "Renewal",
  },
  {
    id: 2,
    category: "Payment",
    status: "Read",
    title: "Payment Successful",
    message:
      "Your payment of ৳2,850 for License Application Fee has been successfully processed. Transaction ID: TXN261001.",
    date: "2026-01-09T14:20:00Z",
    action: "Download Receipt",
    badge: "Payment",
  },
  {
    id: 3,
    category: "Inspection",
    status: "Unread",
    title: "Inspection Scheduled",
    message:
      "Field inspection has been scheduled for January 12, 2026 at 10:00 AM. Inspector Rajesh Singh will visit your vending location.",
    date: "2026-01-08T08:45:00Z",
    action: "View Details",
    secondaryAction: "Contact Inspector",
    badge: "Inspection",
  },
  {
    id: 4,
    category: "License",
    status: "Read",
    title: "Application Approved",
    message:
      "Great news! Your license application (APP25001234) has been approved. Your digital license is now ready to download.",
    date: "2026-01-06T11:10:00Z",
    action: "View License",
    badge: "License",
  },
  {
    id: 5,
    category: "System",
    status: "Read",
    title: "Important: Zone Rules Update",
    message:
      "New operating hours effective from February 1, 2026: 7:00 AM - 11:00 PM. Please review updated zone regulations.",
    date: "2026-01-04T13:00:00Z",
    action: "View Rules",
    badge: "System",
  },
];

const categories = [
  { key: "All", label: "All" },
  { key: "Unread", label: "Unread" },
  { key: "License", label: "License" },
  { key: "Payment", label: "Payments" },
  { key: "Renewal", label: "Renewal" },
  { key: "Inspection", label: "Inspection" },
  { key: "System", label: "System" },
];

const preferencesInitial = {
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: false,
  renewalReminders: true,
  paymentAlerts: false,
};

export default function VendorNotificationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [preferences, setPreferences] = useState(preferencesInitial);

  const filteredNotifications = useMemo(() => {
    if (activeCategory === "All") return notificationsData;
    return notificationsData.filter((item) => item.category === activeCategory || item.status === activeCategory);
  }, [activeCategory]);

  const unreadCount = notificationsData.filter((item) => item.status === "Unread").length;
  const importantCount = notificationsData.filter((item) => ["Renewal", "Payment", "System"].includes(item.category)).length;

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <VendorLayout>
      <PageTitle
        title="Notifications"
        subtitle="View your alerts, updates, and notification preferences in one place."
=======
import { useEffect, useMemo, useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiCircle,
  FiFilter,
  FiSearch,
  FiTrash2,
  FiShield,
  FiMail,
  FiSmartphone,
  FiTool,
} from "react-icons/fi";
import api from "../../api/client";
import LoadingState from "../../components/common/LoadingState";
import PageTitle from "../../components/common/PageTitle";
import VendorLayout from "../../components/layout/VendorLayout";
import "../../styles/pages/vendor/VendorNotificationsPage.css";

const categories = [
  "All",
  "License updates",
  "Payment reminders",
  "Renewal alerts",
  "Zone changes",
  "Inspection notices",
  "System announcements",
];

const defaultPreferences = {
  email_notifications: true,
  sms_notifications: true,
  push_notifications: false,
  license_updates: true,
  payment_alerts: true,
  renewal_reminders: true,
  zone_changes: true,
  inspection_notices: true,
  system_announcements: true,
};

export default function VendorNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const params = {};
      if (currentCategory !== "All") params.category = currentCategory;
      if (searchText.trim()) params.search = searchText.trim();
      if (statusFilter === "read" || statusFilter === "unread") {
        params.status = statusFilter;
      }
      const { data } = await api.get("/vendor/notifications", { params });
      setNotifications(data.notifications || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    try {
      const { data } = await api.get("/vendor/notifications/preferences");
      setPreferences(data.preferences || defaultPreferences);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load notification preferences.");
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [currentCategory, searchText, statusFilter]);

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const savePreferences = async () => {
    try {
      setSavingPrefs(true);
      await api.put("/vendor/notifications/preferences", preferences);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save preferences.");
    } finally {
      setSavingPrefs(false);
    }
  };

  const toggleRead = async (notification) => {
    try {
      await api.patch(
        `/vendor/notifications/${notification.id}/${notification.is_read ? "unread" : "read"}`,
      );
      fetchNotifications();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update notification status.");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/vendor/notifications/${id}`);
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete notification.");
    }
  };

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.is_read).length,
    [notifications],
  );

  const categoryCounts = useMemo(() => {
    const counts = categories.reduce((map, category) => {
      if (category !== "All") map[category] = 0;
      return map;
    }, {});
    notifications.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category] += 1;
      }
    });
    return counts;
  }, [notifications]);

  return (
    <VendorLayout>
      <PageTitle
        title="Notifications Center"
        subtitle="Manage your vendor alerts, read status, filters, and preferences in one place."
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
        icon={FiBell}
        className="mb-4"
      />

<<<<<<< HEAD
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="notification-summary-card p-4 rounded-4 shadow-sm h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="notification-summary-icon bg-primary bg-opacity-15 text-primary rounded-3 p-3">
                <FiBell className="fs-4" />
              </div>
              <div>
                <h6 className="mb-1">Unread</h6>
                <p className="text-muted mb-0">New alerts waiting for you.</p>
              </div>
            </div>
            <h2>{unreadCount}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="notification-summary-card p-4 rounded-4 shadow-sm h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="notification-summary-icon bg-success bg-opacity-15 text-success rounded-3 p-3">
                <FiCheckCircle className="fs-4" />
              </div>
              <div>
                <h6 className="mb-1">Total This Week</h6>
                <p className="text-muted mb-0">Alerts received in the last 7 days.</p>
              </div>
            </div>
            <h2>{notificationsData.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="notification-summary-card p-4 rounded-4 shadow-sm h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="notification-summary-icon bg-warning bg-opacity-15 text-warning rounded-3 p-3">
                <FiClock className="fs-4" />
              </div>
              <div>
                <h6 className="mb-1">Important</h6>
                <p className="text-muted mb-0">Priority notifications for your account.</p>
              </div>
            </div>
            <h2>{importantCount}</h2>
          </div>
        </div>
      </div>

      <div className="notification-filters mb-4">
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
          <div className="filter-pill-list d-flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category.key}
                className={`btn btn-sm ${activeCategory === category.key ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setActiveCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="text-muted small">Showing {filteredNotifications.length} notifications</div>
        </div>
      </div>

      <div className="notification-list-page row g-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm notification-list-shell h-100">
            <div className="card-body p-4">
              {filteredNotifications.map((item) => (
                <div key={item.id} className="notification-card mb-3 p-4 rounded-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    <div>
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                        <span className="badge rounded-pill bg-secondary bg-opacity-15 text-secondary">
                          {item.badge}
                        </span>
                        <span className="text-muted small">{item.status}</span>
                      </div>
                      <h5 className="mb-2">{item.title}</h5>
                      <p className="mb-3 text-muted">{item.message}</p>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-start align-items-md-end">
                      <small className="text-muted">{new Date(item.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}</small>
                      <div className="d-flex flex-wrap gap-2">
                        <button type="button" className="btn btn-sm btn-primary">{item.action}</button>
                        {item.secondaryAction ? (
                          <button type="button" className="btn btn-sm btn-outline-secondary">
                            {item.secondaryAction}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm notification-preferences-card h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="notification-summary-icon bg-dark bg-opacity-10 text-dark rounded-3 p-3">
                  <FiShield className="fs-4" />
                </div>
                <div>
                  <h5 className="mb-1">Notification Preferences</h5>
                  <p className="text-muted mb-0">Manage how you receive vendor alerts.</p>
                </div>
              </div>

              <div className="d-grid gap-3">
                <div className="preference-card p-3 rounded-4 bg-white border">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <h6 className="mb-1">Email Notifications</h6>
                      <p className="text-muted mb-0">Receive notifications via email.</p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preferences.emailNotifications}
                        onChange={() => togglePreference("emailNotifications")}
                      />
                    </div>
                  </div>
                </div>
                <div className="preference-card p-3 rounded-4 bg-white border">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <h6 className="mb-1">SMS Notifications</h6>
                      <p className="text-muted mb-0">Receive important alerts via SMS.</p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preferences.smsNotifications}
                        onChange={() => togglePreference("smsNotifications")}
                      />
                    </div>
                  </div>
                </div>
                <div className="preference-card p-3 rounded-4 bg-white border">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <h6 className="mb-1">Push Notifications</h6>
                      <p className="text-muted mb-0">Browser/app push notifications.</p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preferences.pushNotifications}
                        onChange={() => togglePreference("pushNotifications")}
                      />
                    </div>
                  </div>
                </div>
                <div className="preference-card p-3 rounded-4 bg-white border">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <h6 className="mb-1">Renewal Reminders</h6>
                      <p className="text-muted mb-0">Get reminded before license expiry.</p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preferences.renewalReminders}
                        onChange={() => togglePreference("renewalReminders")}
                      />
                    </div>
                  </div>
                </div>
                <div className="preference-card p-3 rounded-4 bg-white border">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <h6 className="mb-1">Payment Alerts</h6>
                      <p className="text-muted mb-0">Transaction confirmations and receipts.</p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preferences.paymentAlerts}
                        onChange={() => togglePreference("paymentAlerts")}
                      />
                    </div>
                  </div>
                </div>
              </div>
=======
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="vendor-notifications-page">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="notifications-panel p-4 rounded-4 shadow-sm bg-white">
              <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4 gap-3">
                <div>
                  <h5 className="mb-1">Notification list</h5>
                  <div className="text-muted small">
                    Newest first 
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={fetchNotifications}
                >
                  <FiFilter className="me-1" /> Refresh
                </button>
              </div>

              <div className="row gy-3 align-items-center mb-4">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 rounded-start">
                      <FiSearch />
                    </span>
                    <input
                      type="search"
                      className="form-control border-start-0"
                      placeholder="Search notifications"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-md-end">
                  <button
                    type="button"
                    className={`btn btn-sm ${statusFilter === "all" ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => setStatusFilter("all")}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${statusFilter === "unread" ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => setStatusFilter("unread")}
                  >
                    Unread
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${statusFilter === "read" ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => setStatusFilter("read")}
                  >
                    Read
                  </button>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`btn btn-sm ${currentCategory === category ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => setCurrentCategory(category)}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="badge bg-secondary ms-2">{categoryCounts[category] || 0}</span>
                    )}
                  </button>
                ))}
              </div>

              {loading ? (
                <LoadingState label="Loading notifications..." />
              ) : notifications.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  No notifications found for this filter.
                </div>
              ) : (
                <div className="notification-list">
                  {notifications.map((note) => (
                    <div
                      key={note.id}
                      className={`notification-item ${note.is_read ? "read" : "unread"}`}
                    >
                      <div className="d-flex align-items-start justify-content-between gap-3">
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className={`notification-badge status-${note.category.replace(/\s+/g, "-").toLowerCase()}`}>
                              {note.category}
                            </span>
                            <span className="text-muted small">{new Date(note.created_at).toLocaleString()}</span>
                          </div>
                          <h6 className="mb-1">{note.title}</h6>
                          <p className="mb-2 text-muted notification-message">{note.message}</p>
                          {note.link ? (
                            <a href={note.link} className="notification-link">
                              View details
                            </a>
                          ) : null}
                        </div>
                        <div className="d-flex flex-column align-items-end gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => toggleRead(note)}
                          >
                            {note.is_read ? (
                              <><FiCircle className="me-1" /> Mark unread</>
                            ) : (
                              <><FiCheckCircle className="me-1" /> Mark read</>
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteNotification(note.id)}
                          >
                            <FiTrash2 className="me-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="preferences-panel p-4 rounded-4 shadow-sm bg-white">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FiShield className="text-primary fs-4" />
                <div>
                  <h5 className="mb-0">Notification Preferences</h5>
                  <div className="text-muted small">Control how you receive alerts and which categories are enabled.</div>
                </div>
              </div>

              <div className="preference-group mb-4">
                <div className="preference-item">
                  <div>
                    <strong>Email Notifications</strong>
                    <div className="text-muted small">Receive notifications by email.</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={preferences.email_notifications}
                      onChange={(e) => updatePreference("email_notifications", e.target.checked)}
                    />
                    <span className="slider" />
                  </label>
                </div>

                <div className="preference-item">
                  <div>
                    <strong>SMS Notifications</strong>
                    <div className="text-muted small">Receive important alerts via SMS.</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={preferences.sms_notifications}
                      onChange={(e) => updatePreference("sms_notifications", e.target.checked)}
                    />
                    <span className="slider" />
                  </label>
                </div>

                <div className="preference-item">
                  <div>
                    <strong>Push Notifications</strong>
                    <div className="text-muted small">Browser/app push notifications.</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={preferences.push_notifications}
                      onChange={(e) => updatePreference("push_notifications", e.target.checked)}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>

              <div className="category-preferences mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FiMail className="text-secondary fs-4" />
                  <h6 className="mb-0">Category alerts</h6>
                </div>
                <div className="preference-item small">
                  <label className="form-check form-switch d-flex align-items-center justify-content-between mb-3">
                    <span>License updates</span>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={preferences.license_updates}
                      onChange={(e) => updatePreference("license_updates", e.target.checked)}
                    />
                  </label>
                  <label className="form-check form-switch d-flex align-items-center justify-content-between mb-3">
                    <span>Payment alerts</span>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={preferences.payment_alerts}
                      onChange={(e) => updatePreference("payment_alerts", e.target.checked)}
                    />
                  </label>
                  <label className="form-check form-switch d-flex align-items-center justify-content-between mb-3">
                    <span>Renewal reminders</span>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={preferences.renewal_reminders}
                      onChange={(e) => updatePreference("renewal_reminders", e.target.checked)}
                    />
                  </label>
                  <label className="form-check form-switch d-flex align-items-center justify-content-between mb-3">
                    <span>Zone changes</span>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={preferences.zone_changes}
                      onChange={(e) => updatePreference("zone_changes", e.target.checked)}
                    />
                  </label>
                  <label className="form-check form-switch d-flex align-items-center justify-content-between mb-3">
                    <span>Inspection notices</span>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={preferences.inspection_notices}
                      onChange={(e) => updatePreference("inspection_notices", e.target.checked)}
                    />
                  </label>
                  <label className="form-check form-switch d-flex align-items-center justify-content-between mb-0">
                    <span>System announcements</span>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={preferences.system_announcements}
                      onChange={(e) => updatePreference("system_announcements", e.target.checked)}
                    />
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={savePreferences}
                disabled={savingPrefs}
              >
                {savingPrefs ? "Saving preferences..." : "Save Preferences"}
              </button>
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
