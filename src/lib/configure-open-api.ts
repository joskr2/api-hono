import type { AppOpenApi } from "./types.js";
import packageJson from "../../package.json" 
const configureOpenApi = (app:AppOpenApi) => {
app.doc('/doc',{
    openapi: '3.0.0',
    info: {
        title: packageJson.name,
        version: packageJson.version,
    },
})
}

export default configureOpenApi 