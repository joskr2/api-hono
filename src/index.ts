import { serve } from '@hono/node-server'
import app from './app.js'

const port = 8000

const honoServer = {
  fetch: app.fetch,
  port,
}

serve(honoServer)
