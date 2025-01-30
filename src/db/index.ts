import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import env from '../envSchema.js'
import * as schema from './schema.js'

const client = createClient({
  authToken: process.env.TURSO_AUTH_TOKEN,
  url: env.DATABASE_URL,
})

export const db = drizzle(client, { schema })
