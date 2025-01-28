import type { ListRoute } from "./task.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";

export const list: AppRouteHandler<ListRoute> = async (c) => {
    return c.json([
        {
            id: 1,
            title: "Task 1",
            description: "Description 1",
            done: false
        },
        {
            id: 2,
            title: "Task 2",
            description: "Description 2",
            done: true
        }
    ], 200);
}