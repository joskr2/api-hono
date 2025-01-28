import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import pinoLogger from '../middlewares/pino-logger.js'
import type { AppBindings } from './types.js'
import { defaultHook } from 'stoker/openapi'


export const createRouter = () => {
    const app = new OpenAPIHono<AppBindings>({strict:false,defaultHook})
    return app
}

const createApp = () => {
    const app = createRouter()
    app.use(serveEmojiFavicon("🦊"))
    app.use('*', pinoLogger)
    app.notFound(notFound)
    app.onError(onError)
    return app
}

export default createApp
