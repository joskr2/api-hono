import { serve } from '@hono/node-server'
import app from './app.js'
import env from './envSchema.js'

const port = env.PORT

const honoServer = {
  fetch: app.fetch,
  port,
}

serve(honoServer)
