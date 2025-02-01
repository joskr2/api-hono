import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = sqliteTable(
    'tasks',
    {
        createdAt: text('created_at').default(sql`(datetime('now'))`),
        description: text('description'),
        done: integer('done').notNull().default(0),
        id: integer('id').primaryKey({ autoIncrement: true }),
        title: text('title').notNull(),
        updatedAt: text('updated_at')
            .default(sql`(datetime('now'))`)
            .$onUpdate(() => sql`(datetime('now'))`),
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

 export const updateTaskSchema = insertTaskSchema.partial()   
 export const patchTaskSchema = insertTaskSchema.partial()