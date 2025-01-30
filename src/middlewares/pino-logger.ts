import env from '@/envSchema.js'
import { pinoLogger } from 'hono-pino'
import pretty from 'pino-pretty'

const logger = pinoLogger({
  http: {
    reqId: () => crypto.randomUUID(),
  },
  pino: env.NODE_ENV === 'production'
    ? undefined
    : pretty({
        colorize: true,
        ignore: 'pid,hostname',
        levelFirst: true,
        messageFormat: '{msg}',
        translateTime: 'yyyy-mm-dd HH:MM:ss',
      }),
})

export default logger
