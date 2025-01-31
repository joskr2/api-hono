import type { AppRouteHandler } from '@/lib/types.js'
import type { CreateRoute, GetOneRoute, ListRoute, UpdateRoute } from './task.routes.js'
import { db } from '@/db/index.js'
import { tasks } from '@/db/schema.js'
import { INTERNAL_SERVER_ERROR, OK, NOT_FOUND, UNPROCESSABLE_ENTITY, } from 'stoker/http-status-codes'
import { NOT_FOUND as NOT_FOUND_PHRASE } from 'stoker/http-status-phrases'
import { eq } from 'drizzle-orm'

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

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
    try {
        const { id } = c.req.valid('param')

        const task = await db.query.tasks.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, id)
            },
        })

        if (!task) {
            return c.json({ message: NOT_FOUND_PHRASE }, NOT_FOUND)
        }

        const now = new Date().toISOString()
        const formatDate = (timestamp: unknown): string => {
            if (!timestamp)
                return now
            const date = new Date(Number(timestamp))
            return date.getTime() ? date.toISOString() : now
        }

        return c.json({
            ...task,
            done: Boolean(task.done),
            createdAt: formatDate(task.createdAt),
            updatedAt: formatDate(task.updatedAt)
        }, OK)
    } catch (err) {
        console.error('Error fetching task:', err)
        return c.json({ message: 'Internal Server Error' }, INTERNAL_SERVER_ERROR)
    }
}

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
    try {
        const { id } = c.req.valid('param')
        const updates = c.req.valid('json')

        console.log('🔍 Update request for ID:', id)
        console.log('📝 Update payload:', updates)

        const exists = await db.query.tasks.findFirst({
            where: (fields, ops) => ops.eq(fields.id, id)
        })

        if (!exists) {
            console.log('❌ Task not found:', id)
            return c.json({ message: NOT_FOUND_PHRASE }, NOT_FOUND)
        }

        console.log('✨ Found existing task:', exists)

        const [updated] = await db.update(tasks)
        .set({
            title: updates.title ?? exists.title,
            description: updates.description ?? exists.description,
            done: updates.done === undefined ? exists.done : (updates.done ? 1 : 0)
        })
        .where(eq(tasks.id, id))
        .returning()

        if (!updated) {
            console.error('❌ Failed to update task')
            return c.json({ message: 'Internal Server Error' }, INTERNAL_SERVER_ERROR)
        }

        console.log('✅ Successfully updated task:', updated)

        // const formatTimestamp = (timestamp: unknown): string => {
        //     const now = new Date().toISOString()
        //     if (!timestamp) return now
        //     try {
        //         const date = new Date(Number(timestamp))
        //         return date.toISOString()
        //     } catch {
        //         return now
        //     }
        // }

        return c.json({
            ...updated,
            title: updated.title,
            description: updated.description,
            done: Boolean(updated.done),
        }, OK)
    } catch (err) {
        console.error('💥 Error updating task:', err)
        return c.json({ message: 'Internal Server Error' }, INTERNAL_SERVER_ERROR)
    }
}