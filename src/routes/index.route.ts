import { createRouter } from "@/lib/create-app.js";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { OK } from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const router = createRouter()
    .openapi(createRoute({
        tags:['index'],
        method: "get",
        path: '/',
        responses: {
            [OK]: jsonContent(createMessageObjectSchema('Test api'), 'descripcion en 200'),
        }
    })
        , (c) => {
            return c.json({ message: "Test api doc !" }, OK);
        })

export default router;