-- campaigns table
ALTER TABLE campaigns RENAME COLUMN "totalLeads" TO total_leads;
ALTER TABLE campaigns RENAME COLUMN "successfulLeads" TO successful_leads;
ALTER TABLE campaigns RENAME COLUMN "responseRate" TO response_rate;
ALTER TABLE campaigns RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE campaigns RENAME COLUMN "updatedAt" TO updated_at;

-- leads table
ALTER TABLE leads RENAME COLUMN "firstName" TO first_name;
ALTER TABLE leads RENAME COLUMN "lastName" TO last_name;
ALTER TABLE leads RENAME COLUMN "campaignId" TO campaign_id;
ALTER TABLE leads RENAME COLUMN "userId" TO user_id;
ALTER TABLE leads RENAME COLUMN "lastContactedAt" TO last_contacted_at;
ALTER TABLE leads RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE leads RENAME COLUMN "updatedAt" TO updated_at;

-- linkedin_accounts table
ALTER TABLE linkedin_accounts RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE linkedin_accounts RENAME COLUMN "updatedAt" TO updated_at;
ALTER TABLE linkedin_accounts RENAME COLUMN "lastRequestAt" TO last_request_at;
ALTER TABLE linkedin_accounts RENAME COLUMN "tokenExpiresAt" TO token_expires_at;

-- Add verification table
CREATE TABLE IF NOT EXISTS verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
