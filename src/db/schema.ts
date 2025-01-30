import { sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { integer, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable(
    "tasks",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        title: text("title").notNull(),
        description: text("description"),
        done: integer("done").default(0),
        createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
        updatedAt: integer("updated_at", { mode: "timestamp" })
            .default(sql`CURRENT_TIMESTAMP`)
            .$onUpdate(()=>sql`CURRENT_TIMESTAMP`),
    }
);