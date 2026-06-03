import { useMemo, useState } from "react";
import {
  FiDownload,
  FiHelpCircle,
  FiLifeBuoy,
  FiPlayCircle,
  FiSearch,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import PageTitle from "../components/common/PageTitle";
import "../styles/pages/FaqPage.css";

const faqs = [
  {
    q: "How do I register as a new vendor?",
    a: "To register as a new vendor, visit our registration page and create an account using your valid email address and a strong password. After registration, you'll receive a verification code via email. Enter this code to verify your account. Once verified, complete your profile by providing personal details, contact information, and uploading a profile photo. Your account will then be ready for license applications.",
    cat: "Registration",
  },
  {
    q: "What documents are required for license application?",
    a: "For most license applications, you'll need to provide: a copy of your National ID card, a valid trade license from the relevant authority, a recent passport-sized photograph, proof of business address (such as utility bills), and any zone-specific permits if applicable. Additional documents may be required based on your business type and location.",
    cat: "Licensing",
  },
  {
    q: "How long does it take to get license approval?",
    a: "The typical processing time for license approval is 3-5 working days after all required documents have been submitted and verified. This timeframe may vary depending on the complexity of your application, document verification requirements, and current processing volumes. You can track your application status in real-time through your vendor dashboard.",
    cat: "Licensing",
  },
  {
    q: "How can I pay license fees?",
    a: "License fees can be paid through our integrated online payment system, which supports major credit/debit cards, mobile banking, and digital wallets. Payments are processed securely, and you'll receive an instant receipt. All transactions are tracked in your dashboard, and you can download payment confirmations for your records.",
    cat: "Payments",
  },
  {
    q: "How do I renew my license?",
    a: "License renewal can be initiated from your vendor dashboard. Navigate to your application history, select the license you wish to renew, and submit a renewal request before the expiry date. You'll need to pay the renewal fee and may need to update any changed information. Renewal applications typically process faster than initial applications.",
    cat: "Renewals",
  },
  {
    q: "How do I file a complaint?",
    a: "To file a complaint, log into your vendor dashboard and navigate to the complaints section. Describe the issue in detail, including dates, locations, and any relevant reference numbers. Upload supporting evidence such as photos, documents, or screenshots. Our support team will review your complaint and respond within 24-48 hours.",
    cat: "Complaints",
  },
  {
    q: "Can I track my application status?",
    a: "Yes, you can track your application status in real-time through your vendor dashboard. Applications go through several stages: submitted, document verification, under review, approved, or rejected. You'll receive email notifications at each stage, and you can view detailed status information, including any requirements or issues that need to be addressed.",
    cat: "Licensing",
  },
  {
    q: "What are the different license types available?",
    a: "We offer various license types including food vending, merchandise sales, service provision, and special event licenses. Each type has different requirements, fees, and validity periods. You can view detailed information about each license type during the application process or on our zones page.",
    cat: "Licensing",
  },
  {
    q: "How do I update my vendor profile?",
    a: "Access your profile settings from the vendor dashboard. You can update personal information, contact details, business information, and upload new documents. Changes may require re-verification, especially for critical information like addresses or identification documents.",
    cat: "Registration",
  },
  {
    q: "What should I do if my payment fails?",
    a: "If your payment fails, check your payment method and try again. Common issues include insufficient funds, expired cards, or network problems. If the issue persists, contact our support team with your transaction reference number. We accept multiple payment methods to ensure successful transactions.",
    cat: "Payments",
  },
];

const categories = [
  "All",
  "Registration",
  "Licensing",
  "Payments",
  "Renewals",
  "Complaints",
];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const filtered = useMemo(
    () =>
      faqs.filter((item) => {
        const byCat = activeCat === "All" || item.cat === activeCat;
        const needle = query.toLowerCase();
        const byText =
          item.q.toLowerCase().includes(needle) ||
          item.a.toLowerCase().includes(needle);
        return byCat && byText;
      }),
    [query, activeCat],
  );

  return (
    <main className="public-page">
      <section className="public-hero compact">
        <div className="container py-5 text-center">
          <h1>Help Center & FAQs</h1>
          <p>Find answers to your questions and get the support you need.</p>
          <div className="faq-search mx-auto mt-3 position-relative">
            <FiSearch className="search-icon" />
            <input
              className="form-control ps-5"
              placeholder="Search help articles, tutorials, FAQs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="panel-box">
          <PageTitle
            title="Frequently Asked Questions"
            subtitle="Filter by category and quickly find answers"
            icon={FiHelpCircle}
          />
<<<<<<< HEAD
          <div className="faq-categories mb-4">
=======
          <div className="d-flex flex-wrap gap-2 mb-3 mt-4">
>>>>>>> 1a9f377ddf8816911ee9d86cda18c9b23185fb89
            {categories.map((cat) => (
              <button
                key={cat}
                className={`faq-category-btn ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {filtered.map((item, idx) => (
              <details className="faq-item" key={item.q}>
                <summary className="faq-question">
                  <span>{item.q}</span>
                  <FiChevronRight className="faq-icon" />
                </summary>
                <div className="faq-answer">
                  <p className="mb-0">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="panel-box gap-2 mb-3 mt-4">
          <PageTitle
            title="Video Tutorials"
            subtitle="Bite-sized walkthroughs for common workflows"
            icon={FiPlayCircle}
          />
          <div className="row g-3 mt-4">
            {[
              { title: "How to Register", duration: "3 mins" },
              { title: "Apply for License", duration: "5 mins" },
              { title: "Online Payment", duration: "4 mins" },
              { title: "License Renewal", duration: "3 mins" },
              { title: "Track Complaints", duration: "4 mins" },
              { title: "Using Digital License", duration: "6 mins" },
            ].map((video) => (
              <div className="col-lg-4 col-md-6" key={video.title}>
                <div className="video-item">
                  <div className="video-thumb">
                    <FiPlayCircle className="play-icon" />
                    <div className="video-duration">{video.duration}</div>
                  </div>
                  <div className="p-3">
                    <h6 className="mb-1">{video.title}</h6>
                    <small className="text-muted">Tutorial Video</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-box mt-4 live-help-wrap gap-2 mb-3">
          <PageTitle
            title="Still Need Help?"
            subtitle="Our support team is here to assist you"
            icon={FiLifeBuoy}
            className="title-light"
          />
          <p className="text-white-50">
            Choose your preferred support channel.
          </p>
          <div className="row g-3 mt-1">
            <div className="col-md-4">
              <div className="support-card">
                <div className="support-icon">
                  <FiLifeBuoy />
                </div>
                <h6>Live Chat</h6>
                <p>Chat with support in real-time</p>
                <button className="btn btn-sm btn-primary w-100">Start Chat</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="support-card">
                <div className="support-icon">
                  <FiDownload />
                </div>
                <h6>Email Support</h6>
                <p>Response within 24 hours</p>
                <button className="btn btn-sm btn-primary w-100">Send Email</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="support-card">
                <div className="support-icon">
                  <FiHelpCircle />
                </div>
                <h6>Phone Support</h6>
                <p>Call helpline: 01775234795</p>
                <button className="btn btn-sm btn-primary w-100">Call Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-box mt-4 gap-2 mb-3">
          <PageTitle
            title="Download Resources"
            subtitle="Guides, checklists, and templates for vendors"
            icon={FiDownload}
          />
          <div className="row g-2 mt-4">
            {[
              "User Manual (PDF)",
              "Application Checklist",
              "Fee Structure",
              "Vending Regulations",
              "Mobile App Guide",
              "Sample Form",
            ].map((doc) => (
              <div className="col-md-4" key={doc}>
                <div className="download-row">
                  <span>{doc}</span>
                  <button className="btn btn-sm btn-outline-primary">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
