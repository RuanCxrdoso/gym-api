import type { FastifyInstance } from 'fastify'
import { userRegister } from '../controllers/register.js'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', userRegister)
}
