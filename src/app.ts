import configureOpenApi from './lib/configure-open-api.js';
import createApp from './lib/create-app.js';
import index from './routes/index.route.js';

const app = createApp();

// app.get('/', (c) => {
//     return c.text('Hello Hono!')
// })

// app.get('/error', (c) => {
//     c.status(422)
//     c.var.logger.debug("debug")
//     throw new Error("Error")
// })

const routes = [
    index
]

configureOpenApi(app);

routes.forEach((route) => {
    app.route('/', route)
})

export default app
