import { createRouter } from '@/lib/create-app.js'

import * as handlers from './task.handlers.js'
import * as routes from './task.routes.js'

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)

export default router
