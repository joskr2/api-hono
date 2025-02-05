import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

const EnvSchema = z.object({
  DATABASE_AUTH_TOKEN: z.string().optional(),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8080),
}).superRefine((val, ctx) => {
  if (val.NODE_ENV === 'production' && !val.DATABASE_AUTH_TOKEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'DATABASE_AUTH_TOKEN is required in production',
    })
  }
})

export type env = z.infer<typeof EnvSchema>

const myEnv = EnvSchema.parse(process.env)

export default myEnv
