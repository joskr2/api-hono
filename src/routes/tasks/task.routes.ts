import { taskSchema } from '@/db/schema.js'
import { createRoute, z } from '@hono/zod-openapi'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'

export const list = createRoute({
  method: 'get',
  path: '/tasks',
  responses: {
    [INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Error interno del servidor',
    ),
    [OK]: jsonContent(
      z.array(taskSchema),
      'Lista de tareas',
    ),
  },
  tags: ['Tasks'],
})

export type ListRoute = typeof list
