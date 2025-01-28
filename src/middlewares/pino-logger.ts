import { pinoLogger } from "hono-pino";
import pretty from "pino-pretty"

const logger = pinoLogger({
    pino: pretty({
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        levelFirst: true,
        messageFormat: '{msg}',
        ignore: 'pid,hostname',
    }),
    http: {
        reqId: () => crypto.randomUUID(),
    }
});

export default logger;