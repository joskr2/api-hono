import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import env from '../envSchema.js'
import * as schema from "./schema.js";

const client = createClient({
    url: env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
