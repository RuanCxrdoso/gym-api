import fastify from 'fastify'
import { userRoutes } from './http/routes/user-routes.js'

export const app = fastify()

app.register(userRoutes, {
  prefix: '/user',
})
