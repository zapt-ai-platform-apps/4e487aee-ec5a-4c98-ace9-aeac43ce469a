CREATE TABLE IF NOT EXISTS "marketing_data" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "platform" TEXT NOT NULL,
  "campaign_id" TEXT NOT NULL,
  "campaign_name" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "impressions" INTEGER NOT NULL,
  "clicks" INTEGER NOT NULL,
  "spend" DECIMAL(10, 2) NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "app_events" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "event_name" TEXT NOT NULL,
  "event_count" INTEGER NOT NULL,
  "unique_users" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "source" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "user_integrations" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "platform" TEXT NOT NULL,
  "access_token" TEXT,
  "refresh_token" TEXT,
  "token_expires_at" TIMESTAMP,
  "is_connected" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);