import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  connectionString:"postgresql://postgres:aniket%4023@localhost:5432/linkbird",
})

export const db = drizzle(pool, { schema })