import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/verify-jwt.js'
import { userRegister } from './register.js'
import { authenticate } from './authenticate.js'
import { profile } from './profile.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
