import { drizzle } from 'drizzle-orm/neon-http'; // 1. Import the necessary function to create a Drizzle ORM instance for Neon
import { neon } from '@neondatabase/serverless'; // 2. Import the Neon client for serverless environments

// 3. Create a Neon client using the connection string from environment variables

const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql);
