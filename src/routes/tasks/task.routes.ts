import { taskSchema } from "@/db/schema.js";
import { createRoute, z } from "@hono/zod-openapi";
import { OK, INTERNAL_SERVER_ERROR } from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";


export const list = createRoute({
    tags: ["Tasks"],
    path: "/tasks",
    method: "get",
    responses: {
        [OK]: jsonContent(
            z.array(taskSchema),
            "Lista de tareas"
        ),
        [INTERNAL_SERVER_ERROR]: jsonContent(
            z.object({
                error: z.string()
            }),
            "Error interno del servidor"
        )
    }
});

export type ListRoute = typeof list;