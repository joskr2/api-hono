import type { AppBindings, AppOpenApi } from './types.js'
import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'
import pinoLogger from '../middlewares/pino-logger.js'

export function createRouter(): OpenAPIHono<AppBindings> {
  return new OpenAPIHono<AppBindings>({ defaultHook, strict: false })
}

function createApp(): OpenAPIHono<AppBindings> {
  const app = createRouter()
  app.use(serveEmojiFavicon('🦊'))
  app.use('*', pinoLogger)
  app.notFound(notFound)
  app.onError(onError)
  return app
}

export function createTestApp(router:AppOpenApi){
  const testApp = createApp()
  testApp.route('/', router)
  return testApp
}

export default createApp
