import type { AppOpenApi } from "./types.js";
import packageJson from "../../package.json"
import { apiReference } from "@scalar/hono-api-reference";
const configureOpenApi = (app: AppOpenApi) => {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            title: packageJson.name,
            version: packageJson.version,
        },
    })

    app.get('/reference', apiReference({
        theme: 'deepSpace',
        layout: 'classic',
        defaultHttpClient: {
            targetKey: 'javascript',
            clientKey: 'fetch'
        },
        spec: {
            url: '/doc',
        }
    }))
}

export default configureOpenApi 