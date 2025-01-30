import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = sqliteTable(
  'tasks',
  {
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    description: text('description'),
    done: integer('done').default(0),
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
)

export const taskSchema = createSelectSchema(tasks)
export const insertTaskSchema = createInsertSchema(tasks)
