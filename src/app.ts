import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.get('/', ({ text }) => text('Hello Hono!'))

export default app
