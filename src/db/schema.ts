import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = sqliteTable(
    'tasks',
    {
        createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
        description: text('description'),
        done: integer('done').notNull().default(0),
        id: integer('id').primaryKey({ autoIncrement: true }),
        title: text('title').notNull(),
        updatedAt: integer('updated_at', { mode: 'timestamp' })
            .default(sql`CURRENT_TIMESTAMP`)
            .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
    },
)

export const taskSchema = createSelectSchema(tasks).transform((task) => ({
    ...task,
    done: Boolean(task.done)
}))

export const insertTaskSchema = createInsertSchema(tasks,{
    done: (schema) => schema.transform((val) => Boolean(val)),
    title: (schema) => schema.min(1),
})
    .omit({
        createdAt: true,
        id: true,
        updatedAt: true,
    })
    .transform((data) => ({
        ...data,
        done: data.done ? 1 : 0
    }))