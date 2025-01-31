import type { AppOpenApi } from './types.js'
import { apiReference } from '@scalar/hono-api-reference'
import packageJson from '../../package.json'

function configureOpenApi(app: AppOpenApi): void {
  app.doc('/doc', {
    info: {
      title: packageJson.name,
      version: packageJson.version,
    },
    openapi: '3.0.0',
  })

  app.get('/reference', apiReference({
    defaultHttpClient: {
      clientKey: 'fetch',
      targetKey: 'javascript',
    },
    layout: 'classic',
    spec: {
      url: '/doc',
    },
    theme: 'deepSpace',
  }))
}

export default configureOpenApi
