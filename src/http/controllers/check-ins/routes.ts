import type { FastifyInstance } from 'fastify'
import { checkIn } from './check-in.js'
import { verifyJwt } from '@/middlewares/verify-jwt.js'
import { validate } from './validate.js'
import { checkInsHistory } from './history.js'
import { userCheckInsCount } from './metrics.js'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/history', checkInsHistory)
  app.get('/metrics', userCheckInsCount)
  app.post('/gyms/:gymId/check-ins', checkIn)
  app.patch('/:checkInId/validate', validate)
}
