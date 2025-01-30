import type { ListRoute } from "./task.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { db } from "@/db/index.js";

interface Task {
    id: number;
    title: string;
    description: string | null;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const tasks = await db.query.tasks.findMany();
    
    const formattedTasks: Task[] = tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        done: Boolean(task.done),
        createdAt: task.createdAt?.toISOString() ?? new Date().toISOString(),
        updatedAt: task.updatedAt?.toISOString() ?? new Date().toISOString()
    }));

    return c.json(formattedTasks);
}