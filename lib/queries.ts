import { db } from './db'
import { campaigns, leads, users } from './schema'
import { eq, desc, and, ilike, or, count, sql } from 'drizzle-orm'

export async function getCampaigns(userId: string) {
  return await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      description: campaigns.description,
      status: campaigns.status,
      totalLeads: campaigns.totalLeads,
      successfulLeads: campaigns.successfulLeads,
      responseRate: campaigns.responseRate,
      createdAt: campaigns.createdAt,
      updatedAt: campaigns.updatedAt,
    })
    .from(campaigns)
    .where(eq(campaigns.userId, userId))
    .orderBy(desc(campaigns.createdAt))
}

export async function getLeads(
  userId: string,
  options: {
    search?: string
    campaignId?: string
    status?: string
    limit?: number
    offset?: number
  } = {}
) {
  const { search, campaignId, status, limit = 50, offset = 0 } = options
  
  let whereClause = eq(leads.userId, userId)
  
  const conditions = [whereClause]
  
  if (search) {
    conditions.push(
      or(
        ilike(leads.firstName, `%${search}%`),
        ilike(leads.lastName, `%${search}%`),
        ilike(leads.email, `%${search}%`),
        ilike(leads.company, `%${search}%`)
      )!
    )
  }
  
  if (campaignId && campaignId !== 'all') {
    conditions.push(eq(leads.campaignId, campaignId))
  }
  
  if (status && status !== 'all') {
    conditions.push(eq(leads.status, status as any))
  }
  
  const finalWhereClause = conditions.length > 1 ? and(...conditions) : conditions[0]
  
  const leadsWithCampaigns = await db
    .select({
      id: leads.id,
      firstName: leads.firstName,
      lastName: leads.lastName,
      email: leads.email,
      company: leads.company,
      position: leads.position,
      linkedinUrl: leads.linkedinUrl,
      status: leads.status,
      lastContactedAt: leads.lastContactedAt,
      notes: leads.notes,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
      campaign: {
        id: campaigns.id,
        name: campaigns.name,
        status: campaigns.status,
      }
    })
    .from(leads)
    .leftJoin(campaigns, eq(leads.campaignId, campaigns.id))
    .where(finalWhereClause)
    .orderBy(desc(leads.updatedAt))
    .limit(limit)
    .offset(offset)
  
  return leadsWithCampaigns
}

export async function getLeadById(userId: string, leadId: string) {
  const result = await db
    .select({
      id: leads.id,
      firstName: leads.firstName,
      lastName: leads.lastName,
      email: leads.email,
      company: leads.company,
      position: leads.position,
      linkedinUrl: leads.linkedinUrl,
      status: leads.status,
      lastContactedAt: leads.lastContactedAt,
      notes: leads.notes,
      metadata: leads.metadata,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
      campaign: {
        id: campaigns.id,
        name: campaigns.name,
        status: campaigns.status,
        description: campaigns.description,
      }
    })
    .from(leads)
    .leftJoin(campaigns, eq(leads.campaignId, campaigns.id))
    .where(and(eq(leads.id, leadId), eq(leads.userId, userId)))
    .limit(1)
  
  return result[0] || null
}

export async function getDashboardStats(userId: string) {
  const campaignStats = await db
    .select({
      total: count(),
      active: sql<number>`count(case when ${campaigns.status} = 'active' then 1 end)`,
      paused: sql<number>`count(case when ${campaigns.status} = 'paused' then 1 end)`,
      completed: sql<number>`count(case when ${campaigns.status} = 'completed' then 1 end)`,
    })
    .from(campaigns)
    .where(eq(campaigns.userId, userId))
  
  const leadStats = await db
    .select({
      total: count(),
      pending: sql<number>`count(case when ${leads.status} = 'pending' then 1 end)`,
      contacted: sql<number>`count(case when ${leads.status} = 'contacted' then 1 end)`,
      responded: sql<number>`count(case when ${leads.status} = 'responded' then 1 end)`,
      converted: sql<number>`count(case when ${leads.status} = 'converted' then 1 end)`,
    })
    .from(leads)
    .where(eq(leads.userId, userId))
  
  return {
    campaigns: campaignStats[0],
    leads: leadStats[0],
  }
}

export async function getRecentActivity(userId: string, limit: number = 10) {
  return await db
    .select({
      id: leads.id,
      firstName: leads.firstName,
      lastName: leads.lastName,
      email: leads.email,
      company: leads.company,
      position: leads.position,
      status: leads.status,
      lastContactedAt: leads.lastContactedAt,
      updatedAt: leads.updatedAt,
      campaign: {
        name: campaigns.name,
      }
    })
    .from(leads)
    .leftJoin(campaigns, eq(leads.campaignId, campaigns.id))
    .where(eq(leads.userId, userId))
    .orderBy(desc(leads.updatedAt))
    .limit(limit)
}