import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/verify-jwt.js'
import { userRegister } from './register.js'
import { authenticate } from './authenticate.js'
import { profile } from './profile.js'
import { refresh } from './refresh.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
