import type { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/authenticate.js'
import { userRegister } from '../controllers/register.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)

  app.post('/sessions', authenticate)
}
