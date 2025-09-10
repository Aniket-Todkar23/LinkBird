import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config(); // load variables from .env

const config: Config = {
  schema: './lib/schema.ts',       // path to your Drizzle schema
  out: './drizzle',                // folder for generated migrations
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    ssl: 'require',
  },
};

export default config;
