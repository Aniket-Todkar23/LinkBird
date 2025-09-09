import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './lib/schema.ts',           // path to your Drizzle schema
  out: './drizzle',     // folder for generated migrations
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-billowing-bush-a1r8iykd-pooler.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    user: 'neondb_owner',
    password: 'npg_C8FnPtqToh9f',
    ssl: 'require',
  },
};

export default config;
