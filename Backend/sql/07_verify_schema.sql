-- Verification script to ensure all necessary columns exist in vendor_profiles
-- This script will show the current schema and help verify all data is being saved

USE hawker;

-- Show the complete vendor_profiles table structure
DESCRIBE vendor_profiles;

-- Show vendor_documents table structure
DESCRIBE vendor_documents;

-- Verify all required columns exist
SELECT 
  TABLE_NAME,
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'hawker' 
  AND TABLE_NAME = 'vendor_profiles'
ORDER BY ORDINAL_POSITION;

-- Show all profile data for verification
SELECT * FROM vendor_profiles LIMIT 1;

-- Show all document data for a user
SELECT * FROM vendor_documents LIMIT 5;

-- Check for any NULL profile_picture_url columns
SELECT COUNT(*) as total_profiles, 
       SUM(CASE WHEN profile_picture_url IS NULL THEN 1 ELSE 0 END) as without_picture
FROM vendor_profiles;

-- Verification complete message
SELECT '✓ Database schema verification complete!' AS status;
