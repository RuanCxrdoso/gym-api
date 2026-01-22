import type { FastifyInstance } from 'fastify'
import { createGym } from './create-gym.js'
import { verifyJwt } from '@/middlewares/verify-jwt.js'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/create', createGym)
}
