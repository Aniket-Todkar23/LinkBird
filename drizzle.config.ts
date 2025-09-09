import 'dotenv/config';
import type { Config } from 'drizzle-kit'

const config: Config = {
  schema: './lib/schema.ts',    // Path to your Drizzle schema
  out: './drizzle',             // Migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://postgres:aniket%4023@localhost:5432/linkbird", // Must be set in .env.local
  },
}

export default config
