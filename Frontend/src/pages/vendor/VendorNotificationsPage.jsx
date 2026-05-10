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
        icon={FiBell}
        className="mb-4"
      />

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
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
