import { Link } from "react-router-dom";
import {
  FiPhoneCall,
  FiShield,
  FiUsers,
  FiDownload,
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiMessageCircle,
} from "react-icons/fi";
import PageTitle from "../../components/common/PageTitle";
import VendorLayout from "../../components/layout/VendorLayout";

export default function WomenSupportPage() {
  return (
    <VendorLayout>
      <PageTitle
        title="Women Vendor Support"
        subtitle="Safety, subsidies, mentorship and community resources for women street vendors."
        icon={FiUsers}
        className="mb-4"
      />

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm app-surface-card overflow-hidden">
            <div className="bg-success bg-opacity-10 p-4 rounded-4">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h3 className="mb-2">Emergency SOS</h3>
                  <p className="mb-3 text-muted">
                    24/7 women safety helpline with direct access to police, support teams, and helplines.
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <a className="btn btn-light btn-lg rounded-pill px-4" href="tel:+8801123456789">
                      <FiPhoneCall className="me-2" /> Contact Police
                    </a>
                    <a className="btn btn-light btn-lg rounded-pill px-4" href="tel:+8801999999999">
                      <FiPhoneCall className="me-2" /> Women Helpline
                    </a>
                    <a className="btn btn-light btn-lg rounded-pill px-4" href="tel:+8801777777777">
                      <FiPhoneCall className="me-2" /> Contact Support
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                  <span className="badge rounded-pill bg-success bg-opacity-75 text-white py-2 px-4">
                    Immediate Help Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm app-surface-card h-100 p-4">
            <div className="d-flex align-items-center mb-3">
              <FiAward className="fs-3 text-primary me-3" />
              <div>
                <span className="text-muted small">Scheme</span>
                <h5 className="mb-0">Women Entrepreneur Grant 2026</h5>
              </div>
            </div>
            <p>Receive up to ৳25,000 to grow your vending business with supplies, safety gear, and coaching.</p>
            <Link className="btn btn-sm btn-primary rounded-pill" to="/vendor/apply">
              Apply Now <FiArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm app-surface-card h-100 p-4">
            <div className="d-flex align-items-center mb-3">
              <FiShield className="fs-3 text-info me-3" />
              <div>
                <span className="text-muted small">Subsidy</span>
                <h5 className="mb-0">License Fee Subsidy</h5>
              </div>
            </div>
            <p>Get 50% off your license fee to make compliance affordable for women vendors.</p>
            <Link className="btn btn-sm btn-outline-primary rounded-pill" to="/vendor/applications">
              Check Eligibility <FiArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm app-surface-card h-100 p-4">
            <div className="d-flex align-items-center mb-3">
              <FiMessageCircle className="fs-3 text-warning me-3" />
              <div>
                <span className="text-muted small">Program</span>
                <h5 className="mb-0">Business Training</h5>
              </div>
            </div>
            <p>Free business training sessions for women vendors to boost sales and build confidence.</p>
            <Link className="btn btn-sm btn-warning rounded-pill" to="/faq">
              Register <FiArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm app-surface-card p-4">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
              <div>
                <h5 className="mb-2">Mentorship Program</h5>
                <p className="mb-0 text-muted">
                  Connect with experienced women mentors to improve your business skills and grow your income.
                </p>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <Link className="btn btn-primary rounded-pill px-4" to="/vendor/notifications">
                  Connect With Mentor
                </Link>
                <Link className="btn btn-outline-secondary rounded-pill px-4" to="/vendor/applications">
                  View All Mentors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm app-surface-card p-4 bg-light">
            <div className="d-flex align-items-center mb-3">
              <FiUsers className="fs-3 text-success me-3" />
              <div>
                <h6 className="mb-1">Afiya Tasnim</h6>
                <small className="text-muted">Handicrafts</small>
              </div>
            </div>
            <p className="mb-2">৳ 1 Lac/month</p>
            <Link className="text-decoration-none" to="/faq">
              Read Story &rarr;
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm app-surface-card p-4 bg-light">
            <div className="d-flex align-items-center mb-3">
              <FiUsers className="fs-3 text-success me-3" />
              <div>
                <h6 className="mb-1">Razia Sultana</h6>
                <small className="text-muted">Street Food</small>
              </div>
            </div>
            <p className="mb-2">৳ 1.5 Lac/month</p>
            <Link className="text-decoration-none" to="/faq">
              Read Story &rarr;
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm app-surface-card p-4 bg-light">
            <div className="d-flex align-items-center mb-3">
              <FiUsers className="fs-3 text-success me-3" />
              <div>
                <h6 className="mb-1">Srabonti Das</h6>
                <small className="text-muted">Jewelry</small>
              </div>
            </div>
            <p className="mb-2">৳ 2 Lac/month</p>
            <Link className="text-decoration-none" to="/faq">
              Read Story &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm app-surface-card p-4">
            <h5 className="mb-3">Women Vendor Community</h5>
            <p className="text-muted mb-4">
              Connect with 1,247 women vendors across the city for peer support, shared learning, and local events.
            </p>
            <Link className="btn btn-primary rounded-pill px-4" to="/vendor/notifications">
              Join Community Forum
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm app-surface-card p-4">
            <h5 className="mb-3">Safety Guidelines</h5>
            <p className="text-muted mb-4">
              Essential safety tips for women vendors to help you stay safe while working in the field.
            </p>
            <a
              className="btn btn-warning rounded-pill px-4"
              href="/docs/women-vendor-safety-guide.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Download Guide (pdf) <FiDownload className="ms-2" />
            </a>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm app-surface-card p-4">
            <div className="d-flex align-items-center justify-content-between flex-column flex-sm-row gap-3">
              <div>
                <h5 className="mb-2">Need help right now?</h5>
                <p className="text-muted mb-0">Our women support team is available to help you with applications, safety, and mentorship.</p>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <a className="btn btn-outline-success rounded-pill px-4" href="tel:+8801123456789">
                  Emergency Call
                </a>
                <Link className="btn btn-success rounded-pill px-4" to="/vendor/dashboard">
                  Back to Dashboard <FiArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
