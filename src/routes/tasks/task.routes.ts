import { insertTaskSchema, patchTaskSchema, taskSchema, updateTaskSchema } from '@/db/schema.js'
import { notFoundSchema } from '@/lib/constants.js'
import { createRoute, z } from '@hono/zod-openapi'
import { INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from 'stoker/http-status-codes'
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
    [OK]: jsonContent(
      taskSchema,
      'Tarea creada',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({
        error: createErrorSchema(insertTaskSchema),
        success: z.boolean(),
      }),
      'Error de validación',
    ),
  },
  tags: ['Tasks'],

})

export const getOne = createRoute({
  method: 'get',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema,
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
    body: jsonContentRequired(updateTaskSchema, 'Tarea a actualizar'),
    params: IdParamsSchema,
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
      'Tarea actualizada',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({
        error: createErrorSchema(updateTaskSchema),
        success: z.boolean(),
      }),
      'Error de validación',
    ),
  },
  tags: ['Tasks'],
})

export const patch = createRoute({
  method: 'patch',
  path: '/tasks/{id}',
  request: {
    body: jsonContentRequired(patchTaskSchema, 'Tarea a actualizar'),
    params: IdParamsSchema,
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
      'Tarea actualizada',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        z.object({
          error: createErrorSchema(patchTaskSchema),
          success: z.boolean(),
        }),
        z.object({
          error: createErrorSchema(IdParamsSchema),
          success: z.boolean(),
        }),
      ],
      'Error de validación',
    ),
  },
  tags: ['Tasks'],
})

export const remove = createRoute({
  method: 'delete',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Error interno del servidor',
    ),
    [NO_CONTENT]: {
      description: 'Tarea eliminada',
    },
    [NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Tarea no encontrada',
    ),
  },
  tags: ['Tasks'],
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type UpdateRoute = typeof update
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
