import type { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/authenticate.js'
import { userRegister } from '../controllers/register.js'
import { profile } from '../controllers/profile.js'
import { verifyJwt } from '@/middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
