-- Add license fields to license_applications table for issued licenses
-- Run this after application approval to store license details

USE hawker;

-- Check if columns exist before adding them
SET @dbname = 'hawker';
SET @tablename = 'license_applications';
SET @columnname1 = 'license_number';
SET @columnname2 = 'issued_at';
SET @columnname3 = 'expires_at';
SET @columnname4 = 'qr_code_data';
SET @columnname5 = 'goods_authorized';
SET @columnname6 = 'license_category';

-- Add license_number if it doesn't exist
SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname1) > 0,
  "License number already exists",
  ALTER TABLE license_applications 
  ADD COLUMN license_number VARCHAR(50) NULL UNIQUE AFTER application_ref
) AS `license_number_check`;

-- Add issued_at if it doesn't exist
SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname2) > 0,
  "Issued at already exists",
  ALTER TABLE license_applications 
  ADD COLUMN issued_at DATETIME NULL AFTER reviewed_at
) AS `issued_at_check`;

-- Add expires_at if it doesn't exist
SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname3) > 0,
  "Expires at already exists",
  ALTER TABLE license_applications 
  ADD COLUMN expires_at DATETIME NULL AFTER issued_at
) AS `expires_at_check`;

-- Add qr_code_data if it doesn't exist
SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname4) > 0,
  "QR code data already exists",
  ALTER TABLE license_applications 
  ADD COLUMN qr_code_data LONGTEXT NULL AFTER expires_at
) AS `qr_code_data_check`;

-- Add goods_authorized if it doesn't exist
SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname5) > 0,
  "Goods authorized already exists",
  ALTER TABLE license_applications 
  ADD COLUMN goods_authorized VARCHAR(500) NULL AFTER qr_code_data
) AS `goods_authorized_check`;

-- Add license_category if it doesn't exist
SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname6) > 0,
  "License category already exists",
  ALTER TABLE license_applications 
  ADD COLUMN license_category VARCHAR(100) NULL AFTER goods_authorized
) AS `license_category_check`;

-- Add index for license_number
ALTER TABLE license_applications 
ADD INDEX IF NOT EXISTS idx_license_number (license_number);

-- Add index for issued_at
ALTER TABLE license_applications 
ADD INDEX IF NOT EXISTS idx_issued_at (issued_at);
