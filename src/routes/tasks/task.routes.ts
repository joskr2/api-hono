import { createRoute, z } from "@hono/zod-openapi";
import { OK } from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

export const list = createRoute({
    tags: ["Tasks"],
    path: "/tasks",
    method: "get",
    responses: {
        [OK]: jsonContent(z.array(z.object({
            id: z.number(),
            title: z.string(),
            description: z.string().nullable(),
            done: z.boolean()
        })),
            "Lista de tareas"
        )
    }
})

export type ListRoute = typeof list;