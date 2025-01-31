import { createRouter } from '@/lib/create-app.js'

import * as handlers from './task.handlers.js'
import * as routes from './task.routes.js'

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.update, handlers.update)

export default router
