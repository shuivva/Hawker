import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiFileText, FiShield, FiMessageSquare, FiPhone, FiUsers, FiChevronRight } from "react-icons/fi";
import PageTitle from "../../components/common/PageTitle";
import VendorLayout from "../../components/layout/VendorLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/client";

const categories = [
  "Zone Issue",
  "Payment Issue",
  "Inspector Misconduct",
  "Other Vendors",
  "License Problem",
  "Harassment / Illegal Eviction",
  "Facility Problem",
  "System / App / Website Issue",
  "Others",
];

const priorities = [
  { label: "Low", value: "low", color: "success" },
  { label: "Medium", value: "medium", color: "warning" },
  { label: "High", value: "high", color: "danger" },
];

const contactMethods = [
  "Email",
  "Phone",
  "SMS",
  "In-app Notification",
];

export default function VendorComplaintsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("new");
  const [form, setForm] = useState({
    subject: "",
    category: "Zone Issue",
    priority: "medium",
    description: "",
    contactMethod: "Email",
    anonymous: false,
  });
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [complaints, setComplaints] = useState([
    {
      id: "C-00123",
      subject: "Unauthorized vendor in my zone",
      category: "Zone Issue",
      status: "Under review",
      submittedAt: "2026-05-02",
    },
    {
      id: "C-00124",
      subject: "Inspector asked for extra fee",
      category: "Inspector Misconduct",
      status: "Action taken",
      submittedAt: "2026-04-28",
    },
    {
      id: "C-00125",
      subject: "Payment not reflected",
      category: "Payment Issue",
      status: "Pending",
      submittedAt: "2026-04-15",
    },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setEvidenceFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.subject.trim() || !form.description.trim()) {
      setError("Please enter both a subject and description.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("subject", form.subject);
      payload.append("category", form.category);
      payload.append("priority", form.priority);
      payload.append("description", form.description);
      payload.append("contactMethod", form.contactMethod);
      payload.append("anonymous", form.anonymous);
      if (evidenceFile) {
        payload.append("evidence", evidenceFile);
      }

      await api.post("/vendor/complaints", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Your complaint has been submitted successfully.");
      setForm({
        subject: "",
        category: "Zone Issue",
        priority: "medium",
        description: "",
        contactMethod: "Email",
        anonymous: false,
      });
      setEvidenceFile(null);

      setComplaints((prev) => [
        {
          id: `C-${Math.floor(10000 + Math.random() * 90000)}`,
          subject: form.subject,
          category: form.category,
          status: "Pending",
          submittedAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit the complaint. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <VendorLayout>
      <PageTitle
        title="Complaint & Grievance Management"
        subtitle="File a new complaint, track existing issues, and get fast support."
        icon={FiShield}
        className="mb-4"
      />

      <div className="card border-0 shadow-sm app-surface-card mb-4">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row align-items-stretch gap-2">
            <button
              type="button"
              className={`btn flex-fill rounded-pill ${activeTab === "new" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setActiveTab("new")}
            >
              File New Complaints
            </button>
            <button
              type="button"
              className={`btn flex-fill rounded-pill ${activeTab === "list" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setActiveTab("list")}
            >
              My Complaints ({complaints.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === "new" ? (
        <div className="card border-0 shadow-sm app-surface-card mb-4">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} className="row g-4">
              {message && (
                <div className="col-12">
                  <div className="alert alert-success">{message}</div>
                </div>
              )}
              {error && (
                <div className="col-12">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}

              <div className="col-12">
                <label className="form-label fw-semibold">Subject / Title *</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Unauthorized vendor in my zone"
                />
                <small className="text-muted">Keep it short and descriptive.</small>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Select Complaint Category *</label>
                <div className="d-flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`btn btn-outline-primary rounded-pill ${form.category === category ? "active btn-primary" : ""}`}
                      onClick={() => setForm((prev) => ({ ...prev, category }))}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Select Priority Level *</label>
                <div className="d-flex gap-3">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      className={`btn flex-fill rounded-3 btn-lg ${form.priority === priority.value ? `btn-${priority.color}` : "btn-outline-success"}`}
                      onClick={() => setForm((prev) => ({ ...prev, priority: priority.value }))}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Detailed Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  rows="6"
                  placeholder="Describe your complaint in detail. Add date, time and any relevant info."
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Upload Evidence (Optional)</label>
                <div className="border rounded-4 p-4 text-center bg-light">
                  <FiFileText className="fs-1 text-secondary mb-3" />
                  <div className="mb-2">Click to upload or drag and drop</div>
                  <div className="text-muted">Photos, videos, documents up to 5MB</div>
                  <input
                    type="file"
                    className="form-control mt-3"
                    accept="image/*,application/pdf,video/*"
                    onChange={handleFileChange}
                  />
                  {evidenceFile ? (
                    <div className="mt-3 alert alert-success d-flex align-items-center justify-content-between">
                      <div>
                        <FiCheckCircle className="me-2" />
                        {evidenceFile.name}
                      </div>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setEvidenceFile(null)}>
                        Remove
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Preferred Contact Method</label>
                <div className="d-flex flex-wrap gap-2">
                  {contactMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      className={`btn btn-outline-info rounded-pill ${form.contactMethod === method ? "active btn-info text-white" : ""}`}
                      onClick={() => setForm((prev) => ({ ...prev, contactMethod: method }))}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <div className="form-check bg-warning bg-opacity-10 border rounded-3 p-3">
                  <input
                    id="anonymous"
                    type="checkbox"
                    name="anonymous"
                    checked={form.anonymous}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="anonymous" className="form-check-label ms-2">
                    File Anonymous Complaint
                  </label>
                  <p className="mb-0 small text-muted mt-2">
                    Your identity will be kept confidential. Note: Response time may be longer for anonymous complaints.
                  </p>
                </div>
              </div>

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary btn-lg rounded-pill" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm app-surface-card mb-4">
          <div className="card-body p-4">
            <h5 className="mb-4">My Complaints</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Subject</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.subject}</td>
                      <td>{item.category}</td>
                      <td className="text-capitalize">{item.status}</td>
                      <td>{item.submittedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm app-surface-card p-4">
            <h5 className="mb-3">Tips for Filing</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">• Be specific and provide details.</li>
              <li className="mb-2">• Include dates, times, and locations.</li>
              <li className="mb-2">• Upload supporting evidence if available.</li>
              <li className="mb-2">• Choose the correct category.</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm app-surface-card p-4 bg-dark text-white">
            <h5 className="mb-3">Response Time</h5>
            <p className="mb-2">High Priority: 24 hours</p>
            <p className="mb-2">Medium Priority: 2-3 days</p>
            <p className="mb-0">Low Priority: 5-7 days</p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm app-surface-card mt-4 p-4 bg-success bg-opacity-10">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div>
            <h5 className="mb-2">Need Immediate Help?</h5>
            <p className="mb-0 text-muted">Helpline: 01712-XXX-XXX · Mon-Sat: 9 AM - 6 PM</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <a href="tel:+8801712345678" className="btn btn-primary rounded-pill px-4">
              <FiPhone className="me-2" /> Call Helpline
            </a>
            <button type="button" className="btn btn-outline-primary rounded-pill px-4">
              <FiMessageSquare className="me-2" /> Live Chat
            </button>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
