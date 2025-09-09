import { pgTable, text, integer, timestamp, boolean, uuid, serial, jsonb } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { relations } from 'drizzle-orm'
import { z } from 'zod'

// Users table (Better Auth will handle this)
export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

// Sessions table (Better Auth will handle this)
export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
})

// Accounts table (Better Auth will handle this)
export const accounts = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

// Verification table (Better Auth will handle this)
export const verifications = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

// Campaigns table
export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status', { enum: ['draft', 'active', 'paused', 'completed'] }).notNull().default('draft'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  totalLeads: integer('total_leads').default(0),
  successfulLeads: integer('successful_leads').default(0),
  responseRate: integer('response_rate').default(0), // stored as percentage * 100
  settings: jsonb('settings'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Leads table
export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  position: text('position'),
  linkedinUrl: text('linkedin_url'),
  campaignId: uuid('campaign_id').notNull().references(() => campaigns.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { 
    enum: ['pending', 'contacted', 'responded', 'converted', 'do_not_contact'] 
  }).notNull().default('pending'),
  lastContactedAt: timestamp('last_contacted_at'),
  notes: text('notes'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// LinkedIn Accounts table
export const linkedinAccounts = pgTable('linkedin_accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  profileUrl: text('profile_url'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['connected', 'disconnected', 'error'] }).notNull().default('disconnected'),
  dailyLimit: integer('daily_limit').default(30),
  requestsToday: integer('requests_today').default(0),
  lastRequestAt: timestamp('last_request_at'),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  campaigns: many(campaigns),
  leads: many(leads),
  linkedinAccounts: many(linkedinAccounts),
  sessions: many(sessions),
  accounts: many(accounts),
}))

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id],
  }),
  leads: many(leads),
}))

export const leadsRelations = relations(leads, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [leads.campaignId],
    references: [campaigns.id],
  }),
  user: one(users, {
    fields: [leads.userId],
    references: [users.id],
  }),
}))

export const linkedinAccountsRelations = relations(linkedinAccounts, ({ one }) => ({
  user: one(users, {
    fields: [linkedinAccounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

// Zod schemas
export const insertCampaignSchema = createInsertSchema(campaigns)
export const selectCampaignSchema = createSelectSchema(campaigns)
export const insertLeadSchema = createInsertSchema(leads)
export const selectLeadSchema = createSelectSchema(leads)
export const insertLinkedinAccountSchema = createInsertSchema(linkedinAccounts)
export const selectLinkedinAccountSchema = createSelectSchema(linkedinAccounts)

export type InsertCampaign = z.infer<typeof insertCampaignSchema>
export type SelectCampaign = z.infer<typeof selectCampaignSchema>
export type InsertLead = z.infer<typeof insertLeadSchema>
export type SelectLead = z.infer<typeof selectLeadSchema>
export type InsertLinkedinAccount = z.infer<typeof insertLinkedinAccountSchema>
export type SelectLinkedinAccount = z.infer<typeof selectLinkedinAccountSchema>