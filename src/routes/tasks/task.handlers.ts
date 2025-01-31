import type { AppRouteHandler } from '@/lib/types.js'
import type { CreateRoute, ListRoute } from './task.routes.js'
import { db } from '@/db/index.js'
import { tasks } from '@/db/schema.js'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/http-status-codes'

export const list: AppRouteHandler<ListRoute> = async (c) => {
    try {
      const tasks = await db.query.tasks.findMany()
  
      const formattedTasks = tasks.map(({ createdAt, description, done, id, title, updatedAt }) => {
        const now = new Date().toISOString()
        const formatDate = (timestamp: unknown): string => {
          if (!timestamp)
            return now
          const date = new Date(Number(timestamp))
          return date.getTime() ? date.toISOString() : now
        }
  
        return {
          createdAt: formatDate(createdAt),
          description,
          done: Boolean(done),
          id,
          title,
          updatedAt: formatDate(updatedAt),
        }
      })
  
      return c.json(formattedTasks, OK)
    }
    catch (err) {
      console.error('Error fetching tasks:', err)
      return c.json({ error: 'Internal Server Error' }, INTERNAL_SERVER_ERROR)
    }
  }
  
  export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const task = c.req.valid('json')
    const [inserted] = await db.insert(tasks).values({
      ...task,
      done: task.done ? 1 : 0
    }).returning()
    
    return c.json({
      ...inserted,
      done: Boolean(inserted.done)
    }, OK)
  }
