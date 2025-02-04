import type { AppBindings, AppOpenApi } from './types.js'
import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'
import pinoLogger from '../middlewares/pino-logger.js'
import { cors } from 'hono/cors'

export function createRouter(): OpenAPIHono<AppBindings> {
  return new OpenAPIHono<AppBindings>({ defaultHook, strict: false })
}

function createApp(): OpenAPIHono<AppBindings> {
  const app = createRouter()
  app.use(serveEmojiFavicon('🦊'))
  app.use('*', pinoLogger)
  app.use('*', cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 600,
    credentials: true,
  }))
  app.notFound(notFound)
  app.onError(onError)
  return app
}

export function createTestApp(router: AppOpenApi) {
  const testApp = createApp()
  testApp.route('/', router)
  return testApp
}

export default createApp
