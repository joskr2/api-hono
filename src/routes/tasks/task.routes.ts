import { insertTaskSchema, taskSchema, updateTaskSchema } from '@/db/schema.js'
import { notFoundSchema } from '@/lib/constants.js'
import { createRoute, z } from '@hono/zod-openapi'
import { INTERNAL_SERVER_ERROR, OK, UNPROCESSABLE_ENTITY, NOT_FOUND } from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

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

export const create = createRoute({
  method: 'post',
  path: '/tasks',
  request: {
    body: jsonContentRequired(insertTaskSchema, 'Tarea a crear'),
  },
  responses: {
    [INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Error interno del servidor',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTaskSchema), 'Error de validación'),
    [OK]: jsonContent(
      taskSchema,
      'Tarea creada',
    ),
  },
  tags: ['Tasks'],

})

export const getOne = createRoute({
  method: 'get',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema
  },
  responses: {
    [INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Error interno del servidor',
    ),
    [NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Tarea no encontrada',
    ),
    [OK]: jsonContent(
      taskSchema,
      'Tarea encontrada',
    ),
  },
  tags: ['Tasks'],
})

export const update = createRoute({
  method: 'put',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateTaskSchema, 'Tarea a actualizar'),
  },
  responses: {
    [INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Error interno del servidor',
    ),
    [NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Tarea no encontrada',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateTaskSchema),
      'Error de validación',
    ),
    [OK]: jsonContent(
      taskSchema,
      'Tarea actualizada',
    ),
  },
  tags: ['Tasks'],
})


export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type UpdateRoute = typeof update
