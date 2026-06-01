-- Add license fields to license_applications table for issued licenses
USE hawker;

-- Add columns for license details
ALTER TABLE license_applications 
ADD COLUMN license_number VARCHAR(50) UNIQUE NULL AFTER application_ref,
ADD COLUMN issued_at DATETIME NULL AFTER reviewed_at,
ADD COLUMN expires_at DATETIME NULL AFTER issued_at,
ADD COLUMN qr_code_data LONGTEXT NULL AFTER expires_at,
ADD COLUMN goods_authorized VARCHAR(500) NULL AFTER qr_code_data,
ADD COLUMN license_category VARCHAR(100) NULL AFTER goods_authorized;

-- Add indexes
ALTER TABLE license_applications 
ADD INDEX idx_license_number (license_number),
ADD INDEX idx_issued_at (issued_at);
