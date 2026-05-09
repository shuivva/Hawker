const pool = require("../config/db");
const ApiError = require("../utils/apiError");

async function upsertProfile(req, res, next) {
  try {
    const {
      first_name,
      last_name,
      phone,
      national_id,
      date_of_birth,
      address,
      business_name,
      business_type,
      vending_zone,
    } = req.body;

    const userId = req.user.id;

    console.log(`[PROFILE_SAVE] User ${userId} saving profile:`, {
      first_name,
      last_name,
      phone,
      national_id,
      date_of_birth,
      address,
      business_name,
      business_type,
      vending_zone,
    });

    const result = await pool.query(
      `INSERT INTO vendor_profiles (
        user_id, first_name, last_name, phone, national_id, date_of_birth,
        address, business_name, business_type, vending_zone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        phone = VALUES(phone),
        national_id = VALUES(national_id),
        date_of_birth = VALUES(date_of_birth),
        address = VALUES(address),
        business_name = VALUES(business_name),
        business_type = VALUES(business_type),
        vending_zone = VALUES(vending_zone),
        updated_at = CURRENT_TIMESTAMP`,
      [
        userId,
        first_name || null,
        last_name || null,
        phone || null,
        national_id || null,
        date_of_birth || null,
        address || null,
        business_name || null,
        business_type || null,
        vending_zone || null,
      ],
    );

    console.log(`[PROFILE_SAVE] User ${userId} profile saved successfully. Rows affected: ${result[0]?.affectedRows || 0}`);

    res.json({ message: "Vendor profile updated successfully" });
  } catch (err) {
    console.error(`[PROFILE_SAVE_ERROR] User ${req.user?.id} failed to save profile:`, err.message);
    next(err);
  }
}

async function uploadDocuments(req, res, next) {
  try {
    const userId = req.user.id;
    const files = req.files || [];

    if (files.length === 0) {
      throw new ApiError(400, "Please upload at least one document");
    }

    const values = files.map((file) => [
      userId,
      file.fieldname,
      file.originalname,
      file.filename,
      file.mimetype,
      file.size,
    ]);

    await pool.query(
      `INSERT INTO vendor_documents
      (user_id, document_type, original_name, stored_name, mime_type, file_size)
      VALUES ?`,
      [values],
    );

    res.status(201).json({
      message: "Documents uploaded successfully",
      files: files.map((f) => ({
        type: f.fieldname,
        name: f.originalname,
      })),
    });
  } catch (err) {
    next(err);
  }
}

async function uploadProfilePicture(req, res, next) {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      throw new ApiError(400, "Please upload a profile picture");
    }

    // Save the file path to database
    const profilePictureUrl = `/uploads/profile-pictures/${file.filename}`;
    
    await pool.query(
      `UPDATE vendor_profiles 
       SET profile_picture_url = ?, profile_picture_uploaded_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      [profilePictureUrl, userId],
    );

    res.json({
      message: "Profile picture uploaded successfully",
      profile_picture_url: profilePictureUrl,
    });
  } catch (err) {
    next(err);
  }
}

async function getDashboard(req, res, next) {
  try {
    const userId = req.user.id;

    const [[profile]] = await pool.query(
      `SELECT first_name, last_name, phone, national_id, date_of_birth, address, business_name, business_type, vending_zone, profile_picture_url
       FROM vendor_profiles WHERE user_id = ?`,
      [userId],
    );

    const [docs] = await pool.query(
      `SELECT id, document_type, original_name, uploaded_at
       FROM vendor_documents WHERE user_id = ? ORDER BY uploaded_at DESC`,
      [userId],
    );

    const [applications] = await pool.query(
      `SELECT id, application_ref, desired_zone, stall_type, status, submitted_at, reviewed_at
       FROM license_applications
       WHERE user_id = ?
       ORDER BY submitted_at DESC`,
      [userId],
    );

    res.json({
      profile: profile || null,
      documents: docs,
      applications,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  upsertProfile,
  uploadDocuments,
  uploadProfilePicture, 
  getDashboard,
};
