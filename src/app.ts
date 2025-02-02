import configureOpenApi from './lib/configure-open-api.js'
import createApp from './lib/create-app.js'
import index from './routes/index.route.js'
import tasks from './routes/tasks/task.index.js'

const app = createApp()

const routes = [
  index,
  tasks,
] as const 

configureOpenApi(app)

routes.forEach((route) => {
  app.route('', route)
})

export type AppType = typeof routes[number]

export default app
