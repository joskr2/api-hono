import { createRouter } from '@/lib/create-app.js'
import { createRoute } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

const router = createRouter()
  .openapi(createRoute({
    method: 'get',
    path: '/',
    responses: {
      [OK]: jsonContent(createMessageObjectSchema('Test api'), 'descripcion en 200'),
    },
    tags: ['index'],
  }), (c) => {
    return c.json({ message: 'Test api doc !' }, OK)
  })

export default router
