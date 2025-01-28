import { createRouter } from "@/lib/create-app.js";

// Import handlers from the correct path - make sure task.handlers.ts exists
import * as handlers from "./task.handlers.js";
import * as routes from "./task.routes.js";

const router = createRouter()
    .openapi(routes.list, handlers.list)

export default router;