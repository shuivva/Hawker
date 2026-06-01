import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiDownload,
  FiPrinter,
  FiShare2,
  FiAlertTriangle,
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiHash,
} from "react-icons/fi";
import QRCode from "qrcode";
import api from "../../api/client";
import LoadingState from "../../components/common/LoadingState";
import PageTitle from "../../components/common/PageTitle";
import VendorLayout from "../../components/layout/VendorLayout";
import "../../styles/pages/vendor/VendorMyLicensePage.css";

export default function VendorMyLicensePage() {
  const navigate = useNavigate();
  const licenseCardRef = useRef(null);
  const qrCodeRef = useRef(null);

  const [data, setData] = useState({
    profile: null,
    license: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reportModal, setReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("lost");
  const [reportMessage, setReportMessage] = useState("");

  useEffect(() => {
    async function loadLicense() {
      try {
        const res = await api.get("/license/my-license");
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load license");
      } finally {
        setLoading(false);
      }
    }

    loadLicense();
  }, []);

  // Generate QR code when license data is available
  useEffect(() => {
    if (data.license && qrCodeRef.current) {
      const qrValue = `LIC-${data.license?.license_number}-${data.license?.id}`;
      QRCode.toCanvas(qrCodeRef.current, qrValue, {
        errorCorrectionLevel: "H",
        type: "image/png",
        quality: 0.95,
        margin: 1,
        width: 120,
        color: {
          dark: "#0f3d82",
          light: "#ffffff",
        },
      });
    }
  }, [data.license]);

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import of html2canvas and jspdf
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");

      const element = licenseCardRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`License-${data.license?.license_number || "License"}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=500,width=800");
    const element = licenseCardRef.current;
    printWindow.document.write("<html><head><title>Print License</title>");
    printWindow.document.write(
      "<style>body { font-family: Arial, sans-serif; padding: 20px; }"
    );
    printWindow.document.write(
      "@media print { body { margin: 0; padding: 0; } }</style></head>"
    );
    printWindow.document.write("<body>");
    printWindow.document.write(element.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = async () => {
    try {
      const shareText = `I have successfully received my digital vendor license!\n\nLicense #: ${data.license?.license_number}\nVending Zone: ${data.license?.zone_name}\nValidity: ${new Date(data.license?.issued_at).toLocaleDateString()} - ${new Date(data.license?.expires_at).toLocaleDateString()}`;

      if (navigator.share) {
        await navigator.share({
          title: "My Digital Vendor License",
          text: shareText,
          url: window.location.href,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareText);
        alert("License details copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to share:", err);
    }
  };

  const handleReportLost = async () => {
    try {
      await api.post(`/license/report-lost/${data.license?.id}`, {
        reason: reportReason,
        message: reportMessage,
      });
      setReportModal(false);
      alert(
        "License reported as " +
          reportReason +
          ". Admin will be notified shortly."
      );
    } catch (err) {
      console.error("Failed to report license:", err);
      alert("Failed to report license. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <VendorLayout>
        <LoadingState label="Loading your license..." />
      </VendorLayout>
    );
  }

  if (error || !data.license) {
    return (
      <VendorLayout>
        <PageTitle
          title="My Digital License"
          subtitle="View and manage your digital vendor license"
          icon={FiHash}
        />
        <div className="alert alert-warning mt-4">
          <FiAlertTriangle className="me-2" />
          {error ||
            "You do not have an approved license yet. Please apply for a license first."}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/vendor/apply")}
        >
          <FiArrowLeft className="me-2" />
          Apply for License
        </button>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <PageTitle
        title="My Digital License"
        subtitle="Your approved digital vendor license"
        icon={FiHash}
      />

      {/* License Card */}
      <div className="license-card-container">
        <div className="license-card" ref={licenseCardRef}>
          {/* Card Header */}
          <div className="license-card-header">
            <div className="header-left">
              <div className="city-name">Hawker System</div>
              <div className="license-type">
                {data.license?.license_type_name} License
              </div>
            </div>
            <div className="header-right">
              <div className="status-badge approved">
                <span>✓</span> Approved
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="license-card-content">
            {/* Vendor Info Section */}
            <div className="vendor-section">
              <div className="vendor-photo-container">
                {data.profile?.profile_picture_url ? (
                  <img
                    src={data.profile.profile_picture_url}
                    alt="Vendor"
                    className="vendor-photo"
                  />
                ) : (
                  <div className="vendor-photo-placeholder">
                    <FiUser size={48} />
                  </div>
                )}
              </div>

              <div className="vendor-info">
                <div className="vendor-name">
                  {data.profile?.first_name} {data.profile?.last_name}
                </div>
                <div className="business-name">
                  {data.profile?.business_name || "N/A"}
                </div>
                <div className="vendor-phone">{data.profile?.phone}</div>
              </div>

              {/* QR Code */}
              <div className="qr-code-container">
                <canvas ref={qrCodeRef}></canvas>
              </div>
            </div>

            {/* License Details Grid */}
            <div className="license-details-grid">
              {/* License Number */}
              <div className="detail-item">
                <div className="detail-label">License Number</div>
                <div className="detail-value">{data.license?.license_number}</div>
              </div>

              {/* Reference Number */}
              <div className="detail-item">
                <div className="detail-label">Reference Number</div>
                <div className="detail-value">
                  {data.license?.application_ref}
                </div>
              </div>

              {/* License Type & Category */}
              <div className="detail-item">
                <div className="detail-label">License Type & Category</div>
                <div className="detail-value">
                  {data.license?.license_type_name}
                  {data.license?.license_category &&
                    ` / ${data.license.license_category}`}
                </div>
              </div>

              {/* Vending Zone */}
              <div className="detail-item">
                <div className="detail-label">Allocated Zone</div>
                <div className="detail-value">
                  <FiMapPin className="icon-inline" />
                  {data.license?.zone_name} ({data.license?.zone_code})
                </div>
              </div>

              {/* Zone Location */}
              <div className="detail-item">
                <div className="detail-label">Zone Location</div>
                <div className="detail-value">{data.license?.zone_location}</div>
              </div>

              {/* Goods Authorized */}
              <div className="detail-item">
                <div className="detail-label">Goods Authorized</div>
                <div className="detail-value">
                  {data.license?.goods_authorized || "As per business category"}
                </div>
              </div>

              {/* Issued Date */}
              <div className="detail-item">
                <div className="detail-label">Issued Date</div>
                <div className="detail-value">
                  <FiCalendar className="icon-inline" />
                  {formatDate(data.license?.issued_at)}
                </div>
              </div>

              {/* Validity Period */}
              <div className="detail-item">
                <div className="detail-label">Valid Until</div>
                <div className="detail-value">
                  <FiCalendar className="icon-inline" />
                  {formatDate(data.license?.expires_at)}
                </div>
              </div>

              {/* Business Category */}
              <div className="detail-item">
                <div className="detail-label">Business Category</div>
                <div className="detail-value">
                  {data.license?.business_category}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="license-card-footer">
              <div className="footer-text">
                This is an official digital vendor license issued by the Hawker
                Urban Vending System
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="license-actions">
        <button
          className="btn btn-primary btn-action"
          onClick={handleDownloadPDF}
        >
          <FiDownload /> Download as PDF
        </button>
        <button
          className="btn btn-outline-primary btn-action"
          onClick={handlePrint}
        >
          <FiPrinter /> Print
        </button>
        <button
          className="btn btn-outline-primary btn-action"
          onClick={handleShare}
        >
          <FiShare2 /> Share Digitally
        </button>
        <button
          className="btn btn-outline-danger btn-action"
          onClick={() => setReportModal(true)}
        >
          <FiAlertTriangle /> Report Lost/Damaged
        </button>
      </div>

      {/* Report Modal */}
      {reportModal && (
        <div className="modal-overlay" onClick={() => setReportModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="modal-title">Report License as Lost or Damaged</h5>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label htmlFor="reportReason">Reason:</label>
                <select
                  id="reportReason"
                  className="form-control"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value="lost">Lost</option>
                  <option value="damaged">Damaged</option>
                  <option value="stolen">Stolen</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="reportMessage">Additional Message:</label>
                <textarea
                  id="reportMessage"
                  className="form-control"
                  rows="4"
                  value={reportMessage}
                  onChange={(e) => setReportMessage(e.target.value)}
                  placeholder="Provide details about the incident..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setReportModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleReportLost}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </VendorLayout>
  );
}
