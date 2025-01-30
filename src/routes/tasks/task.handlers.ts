import type { AppRouteHandler } from '@/lib/types.js'
import type { ListRoute } from './task.routes.js'
import { db } from '@/db/index.js'

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
