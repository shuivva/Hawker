const express = require("express");
const router = express.Router();
const {
  getLicenseTypes,
  getVendingZones,
  createApplication,
  updateApplicationStep,
  getApplication,
  getUserApplications,
  getMyLicense,
  reportLostLicense
} = require("../controllers/licenseApplicationController");
const { requireAuth } = require("../middleware/auth");

// Get license types and zones (public routes)
router.get("/license-types", getLicenseTypes);
router.get("/vending-zones", getVendingZones);

// Protected routes
router.use(requireAuth);

// Application management
router.post("/applications", createApplication);
router.get("/applications", getUserApplications);
router.get("/applications/:applicationId", getApplication);
router.put("/applications/:applicationId/steps/:step", updateApplicationStep);

// Get vendor's approved license (My License page)
router.get("/my-license", getMyLicense);

// Report lost or damaged license
router.post("/report-lost/:applicationId", reportLostLicense);

module.exports = router;
