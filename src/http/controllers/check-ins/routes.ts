import type { FastifyInstance } from 'fastify'
import { checkIn } from './check-in.js'
import { verifyJwt } from '@/middlewares/verify-jwt.js'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins', checkIn)
}
