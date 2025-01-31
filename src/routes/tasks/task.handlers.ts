import type { AppRouteHandler } from '@/lib/types.js'
import type { CreateRoute, ListRoute } from './task.routes.js'
import { db } from '@/db/index.js'
import { tasks } from '@/db/schema.js'

export const list: AppRouteHandler<ListRoute> = async (c) => {
    try {
        const tasks = await db.query.tasks.findMany()

        const formattedTasks = tasks.map(({ createdAt, description, done, id, title, updatedAt }) => {
            const now = new Date().toISOString()
            const formatDate = (timestamp: unknown) => {
                if (!timestamp)
                    return now
                const date = new Date(Number(timestamp))
                return date.getTime() ? date.toISOString() : now
            }

            return {
                createdAt: formatDate(createdAt),
                description,
                done,
                id,
                title,
                updatedAt: formatDate(updatedAt),
            }
        })

        return c.json(formattedTasks, 200)
    }
    catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const task = c.req.valid('json')
    const [inserted] = await db.insert(tasks).values(task).returning()
    return c.json(inserted, 200)
}