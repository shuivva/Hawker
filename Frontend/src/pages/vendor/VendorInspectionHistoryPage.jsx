import { useState } from "react";
import {
  FiCheckCircle,
  FiShield,
  FiClock,
  FiDownload,
  FiCamera,
  FiArrowRight,
} from "react-icons/fi";
import PageTitle from "../../components/common/PageTitle";
import VendorLayout from "../../components/layout/VendorLayout";

const inspections = [
  {
    id: "INS-2026-001",
    title: "Upcoming Inspection Scheduled",
    date: "January 7, 2026 at 11:00 AM",
    inspector: "Asif Nazrul",
    inspectorRole: "Field Inspector",
    status: "Passed",
    badges: ["License Displayed Properly", "Safety Compliance", "Zone Boundaries Respected", "Authorized Goods Only", "Hygiene Standards Met", "Operating Hours Compliance"],
    comment:
      "The vending setup meets all compliance requirements. The area is clean and well-maintained. License is properly displayed. No violations observed. Good hygiene practices are being followed. Keep up the good work!",
    photos: [1, 2, 3, 4],
    reportLink: "/vendor/inspection-history/report-2026-001.pdf",
  },
  {
    id: "INS-2025-009",
    title: "License Verification Inspection",
    date: "December 15, 2025 at 2:00 PM",
    inspector: "Motahar Chowdhury",
    inspectorRole: "Lead Inspector",
    status: "Passed (Minor Issue)",
    badges: ["License Displayed", "Safety Standards", "Zone Boundaries", "Authorized Products", "Operating Hours", "Cleanliness (Minor Issue)"],
    comment:
      "The vending area is good. License verification successful. Some waste accumulation around the vending area was noted, advised to maintain better cleanliness. Recommendation: install a small dustbin for customer waste.",
    photos: [1, 2, 3],
    reportLink: "/vendor/inspection-history/report-2025-009.pdf",
  },
  {
    id: "INS-2025-003",
    title: "Initial Setup Inspection",
    date: "October 1, 2025 at 9:00 AM",
    inspector: "Amit Saha",
    inspectorRole: "Field Inspector",
    status: "Passed",
    badges: ["License Displayed", "Safety Standards", "Zone Boundaries", "Authorized Products", "Operating Hours"],
    comment:
      "Initial setup inspection completed successfully. All requirements for license approval are met. The vending location is appropriate and all safety standards are in place.",
    photos: [1],
    reportLink: "/vendor/inspection-history/report-2025-003.pdf",
  },
];

export default function VendorInspectionHistoryPage() {
  const [uploadedPhotos, setUploadedPhotos] = useState({});

  const handlePhotoUpload = (inspectionId, fileList) => {
    const files = Array.from(fileList);
    setUploadedPhotos((prev) => {
      const current = prev[inspectionId] || [];
      return {
        ...prev,
        [inspectionId]: [...current, ...files],
      };
    });
  };

  const handleRemovePhoto = (inspectionId, index) => {
    setUploadedPhotos((prev) => {
      const current = prev[inspectionId] || [];
      return {
        ...prev,
        [inspectionId]: current.filter((_, idx) => idx !== index),
      };
    });
  };

  return (
    <VendorLayout>
      <PageTitle
        title="Inspection History"
        subtitle="Review past inspections, compliance status, and action items for your vending license."
        icon={FiClock}
        className="mb-4"
      />

      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm app-surface-card p-4 text-center">
            <div className="badge bg-success rounded-pill mb-3">1</div>
            <p className="text-muted mb-1">Total Inspections</p>
            <h3>1</h3>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm app-surface-card p-4 text-center">
            <div className="badge bg-success rounded-pill mb-3">4</div>
            <p className="text-muted mb-1">Passed</p>
            <h3>4</h3>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm app-surface-card p-4 text-center">
            <div className="badge bg-danger rounded-pill mb-3">4</div>
            <p className="text-muted mb-1">Warnings</p>
            <h3>4</h3>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm app-surface-card p-4 text-center">
            <div className="badge bg-primary rounded-pill mb-3">100%</div>
            <p className="text-muted mb-1">Compliance Rate</p>
            <h3>100%</h3>
          </div>
        </div>
      </div>

      {inspections.map((inspection) => (
        <div key={inspection.id} className="card border-0 shadow-sm app-surface-card mb-4">
          <div className="card-body p-4">
            <div className="row g-4 align-items-start">
              <div className="col-lg-4">
                <div className="mb-3">
                  <h5 className="mb-1">{inspection.title}</h5>
                  <small className="text-muted">Conducted on: {inspection.date}</small>
                </div>
                <div className="bg-light rounded-4 p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="rounded-circle bg-white shadow-sm p-3">
                      <FiShield className="fs-4 text-primary" />
                    </div>
                    <div>
                      <h6 className="mb-1">{inspection.inspector}</h6>
                      <p className="mb-0 text-muted">{inspection.inspectorRole}</p>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline-primary w-100 mb-2">
                    Contact Inspector
                  </button>
                  <span className="badge bg-success text-white py-2 px-3">{inspection.status}</span>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="d-grid gap-2">
                  {inspection.badges.map((badge, index) => (
                    <div key={`${inspection.id}-${index}`} className="d-flex align-items-center justify-content-between bg-success bg-opacity-10 rounded-3 px-3 py-2">
                      <span>{badge}</span>
                      <FiCheckCircle className="text-success" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 bg-primary bg-opacity-10 text-dark h-100">
                  <div className="card-body">
                    <h6>Inspector&apos;s Comments</h6>
                    <p className="mb-0">{inspection.comment}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3 mt-4 align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2">
                  <FiCamera className="fs-4 text-secondary" />
                  <span>Inspection Photo Upload</span>
                </div>
                <div className="mt-3">
                  <label htmlFor={`photo-upload-${inspection.id}`} className="inspection-upload-portal d-flex align-items-center justify-content-center rounded-3 border border-dashed border-secondary bg-light text-secondary" style={{ width: "100%", minHeight: 120, cursor: "pointer" }}>
                    <div className="text-center">
                      <FiCamera className="fs-2 mb-2" />
                      <div>Click to upload or drag and drop</div>
                      <div className="text-muted small">Photos up to 5MB</div>
                    </div>
                  </label>
                  <input
                    id={`photo-upload-${inspection.id}`}
                    type="file"
                    accept="image/*"
                    multiple
                    className="d-none"
                    onChange={(event) => handlePhotoUpload(inspection.id, event.target.files)}
                  />
                </div>
                {uploadedPhotos[inspection.id] && uploadedPhotos[inspection.id].length > 0 ? (
                  <div className="mt-3 row g-2">
                    {uploadedPhotos[inspection.id].map((file, fileIndex) => (
                      <div key={`${inspection.id}-uploaded-${fileIndex}`} className="col-auto">
                        <div className="uploaded-photo-box position-relative rounded-3 border bg-white" style={{ width: 90, height: 90 }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="img-fluid rounded-3"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle"
                            style={{ transform: "translate(25%,-25%)" }}
                            onClick={() => handleRemovePhoto(inspection.id, fileIndex)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="col-md-6 text-md-end">
                <a className="btn btn-outline-dark rounded-pill me-2" href={inspection.reportLink}>
                  <FiDownload className="me-2" /> Download Report (pdf)
                </a>
                <button className="btn btn-primary rounded-pill">
                  <FiArrowRight className="me-2" /> View Photos
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </VendorLayout>
  );
}
