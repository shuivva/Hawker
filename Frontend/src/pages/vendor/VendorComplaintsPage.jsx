<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiUploadCloud,
  FiDownload,
  FiFile,
  FiFlag,
  FiMessageSquare,
  FiRefreshCw,
} from "react-icons/fi";
import api from "../../api/client";
import LoadingState from "../../components/common/LoadingState";
import PageTitle from "../../components/common/PageTitle";
import VendorLayout from "../../components/layout/VendorLayout";
import "../../styles/pages/vendor/VendorComplaintsPage.css";

const complaintCategories = [
  "Zone issue",
  "License problem",
  "Payment issue",
  "Harassment",
  "Illegal eviction",
  "Others",
];

export default function VendorComplaintsPage() {
  const [section, setSection] = useState("file");
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    is_anonymous: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/vendor/complaints");
      setComplaints(data.complaints || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

<<<<<<< HEAD
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
=======
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [
      ...prev,
      ...files.map((f) => ({
        file: f,
        id: `${Date.now()}-${Math.random()}`,
      })),
    ]);
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      if (!formData.subject || !formData.category || !formData.description) {
        setError("Subject, category, and description are required");
        return;
      }

      setSubmitting(true);
      setError("");

      const response = await api.post("/vendor/complaints", formData);
      const complaintId = response.data.complaint_id;
      const complaintRef = response.data.complaint_ref;

      // Upload evidence files if any
      if (uploadedFiles.length > 0) {
        const evidenceForm = new FormData();
        uploadedFiles.forEach((item) => {
          evidenceForm.append("evidence", item.file);
        });
        await api.post(`/vendor/complaints/${complaintId}/evidence`, evidenceForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSuccess(`Complaint filed successfully! Your reference number is: ${complaintRef}`);
      setFormData({
        subject: "",
        category: "",
        priority: "medium",
        description: "",
        is_anonymous: false,
      });
      setUploadedFiles([]);
      fetchComplaints();

      setTimeout(() => {
        setSuccess("");
        setSection("my");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
    } finally {
      setSubmitting(false);
    }
  };

<<<<<<< HEAD
=======
  const getStatusBadge = (status) => {
    const variants = {
      new: { bg: "bg-info", icon: FiAlertCircle, label: "New" },
      in_progress: { bg: "bg-warning", icon: FiClock, label: "In Progress" },
      resolved: { bg: "bg-success", icon: FiCheckCircle, label: "Resolved" },
      closed: { bg: "bg-secondary", icon: FiCheckCircle, label: "Closed" },
    };
    const variant = variants[status] || variants.new;
    const Icon = variant.icon;
    return (
      <span className={`badge ${variant.bg} d-inline-flex align-items-center gap-1`}>
        <Icon className="fs-6" /> {variant.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      low: "badge-secondary",
      medium: "badge-warning",
      high: "badge-danger",
    };
    return (
      <span className={`badge ${variants[priority] || "badge-secondary"}`}>
        <FiFlag className="me-1" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
  return (
    <VendorLayout>
      <PageTitle
        title="Complaint & Grievance Management"
<<<<<<< HEAD
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
=======
        subtitle="File new complaints and track the status of your existing grievances."
        icon={FiMessageSquare}
        className="mb-4"
      />

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="vendor-complaints-page">
        <div className="mb-4 d-flex gap-2">
          <button
            type="button"
            className={`btn btn-lg rounded-3 ${section === "file" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSection("file")}
          >
            <FiMessageSquare className="me-2" /> File New Complaints
          </button>
          <button
            type="button"
            className={`btn btn-lg rounded-3 ${section === "my" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSection("my")}
          >
            <FiUploadCloud className="me-2" /> My Complaints ({complaints.length})
          </button>
        </div>

        {section === "file" ? (
          <div className="file-complaint-section p-4 rounded-4 shadow-sm bg-white">
            <h5 className="mb-3">File a Complaint</h5>
            <p className="text-muted small mb-4">
              Keep it short and descriptive (e.g., "Unauthorized vendor in my zone"). Include
              dates, times, and locations. Upload supporting evidence if available. Choose the correct
              category.
            </p>

            <form onSubmit={submitComplaint}>
              <div className="mb-4">
                <label className="form-label fw-bold">
                  Subject/Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Brief title of your complaint"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Select Complaint Category <span className="text-danger">*</span>
                </label>
                <div className="complaint-categories">
                  {complaintCategories.map((cat) => (
                    <label key={cat} className="complaint-category-btn">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={formData.category === cat}
                        onChange={handleFormChange}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Select Priority Level <span className="text-danger">*</span>
                </label>
                <div className="priority-buttons">
                  {["low", "medium", "high"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`priority-btn priority-${level} ${
                        formData.priority === level ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, priority: level }))
                      }
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
                    </button>
                  ))}
                </div>
              </div>

<<<<<<< HEAD
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
=======
              <div className="mb-4">
                <label className="form-label fw-bold">
                  Detailed Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control rounded-3"
                  placeholder="Describe your complaint in detail. Add dates, times, and relevant information"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleFormChange}
                />
                <div className="text-muted small mt-1">
                  Minimum 10 characters
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Upload Evidence (Optional)</label>
                <div className="upload-evidence-zone rounded-3 border-2 border-dashed p-4 text-center">
                  <FiUploadCloud className="fs-1 text-muted mb-2" />
                  <p className="text-muted mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-muted small mb-3">
                    Photos, video, documents or PDF (Max 5 files, 10 MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="upload-input"
                    accept="image/*,video/*,.pdf"
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="uploaded-files mt-3">
                    <h6>Uploaded Files ({uploadedFiles.length})</h6>
                    <ul className="list-group">
                      {uploadedFiles.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>
                            <FiFile className="me-2" />
                            {item.file.name}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFile(item.id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mb-4 p-3 bg-warning bg-opacity-10 rounded-3 border border-warning border-opacity-25">
                <label className="form-check d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="is_anonymous"
                    checked={formData.is_anonymous}
                    onChange={handleFormChange}
                  />
                  <span>
                    <strong>File Anonymous Complaint</strong>
                    <div className="text-muted small">
                      Your identity will not be disclosed. Note: We may still need to contact you for
                      more information on anonymous complaints.
                    </div>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100 rounded-3"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
          </div>
        ) : (
          <div className="my-complaints-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5>My Complaints</h5>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={fetchComplaints}
              >
                <FiRefreshCw className="me-1" /> Refresh
              </button>
            </div>

            {loading ? (
              <LoadingState label="Loading complaints..." />
            ) : complaints.length === 0 ? (
              <div className="alert alert-info rounded-3">
                <FiAlertCircle className="me-2" />
                No complaints filed yet. Start by clicking "File New Complaints" to lodge a grievance.
              </div>
            ) : (
              <div className="complaints-grid">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="complaint-card p-4 rounded-4 bg-white shadow-sm">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h6 className="mb-1">{complaint.subject}</h6>
                        <p className="text-muted small mb-0">{complaint.complaint_ref}</p>
                      </div>
                      <div className="text-end">
                        {getStatusBadge(complaint.status)}
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="badge bg-light text-dark">
                        {complaint.category}
                      </span>
                      {getPriorityBadge(complaint.priority)}
                    </div>

                    <p className="complaint-description text-muted small mb-3">
                      {complaint.description}
                    </p>

                    <div className="complaint-meta text-muted small mb-3">
                      <div>
                        <strong>Filed:</strong> {new Date(complaint.created_at).toLocaleDateString()}
                      </div>
                      {complaint.resolved_at && (
                        <div>
                          <strong>Resolved:</strong> {new Date(complaint.resolved_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary w-100"
                      onClick={() => {
                        /* Open details modal or expand */
                      }}
                    >
                      <FiDownload className="me-1" /> View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
      </div>
    </VendorLayout>
  );
}
