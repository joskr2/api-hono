import { NOT_FOUND } from 'stoker/http-status-phrases'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

export const notFoundSchema = createMessageObjectSchema(NOT_FOUND)
