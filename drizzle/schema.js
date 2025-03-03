import { pgTable, serial, uuid, text, integer, decimal, timestamp, date, boolean } from 'drizzle-orm/pg-core';

export const marketingData = pgTable('marketing_data', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  platform: text('platform').notNull(),
  campaignId: text('campaign_id').notNull(),
  campaignName: text('campaign_name').notNull(),
  date: date('date').notNull(),
  impressions: integer('impressions').notNull(),
  clicks: integer('clicks').notNull(),
  spend: decimal('spend', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const appEvents = pgTable('app_events', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  eventName: text('event_name').notNull(),
  eventCount: integer('event_count').notNull(),
  uniqueUsers: integer('unique_users').notNull(),
  date: date('date').notNull(),
  source: text('source'),
  createdAt: timestamp('created_at').defaultNow()
});

export const userIntegrations = pgTable('user_integrations', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  platform: text('platform').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at'),
  isConnected: boolean('is_connected').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});