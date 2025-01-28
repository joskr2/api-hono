import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError } from 'stoker/middlewares'
import pinoLogger from './middlewares/pino-logger.js'

const app = new OpenAPIHono()

app.use('*', pinoLogger)

app.get('/', ({ text }) => text('Hello Hono!'))
app.notFound(notFound)
app.onError(onError)

export default app
