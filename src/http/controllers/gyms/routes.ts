import type { FastifyInstance } from 'fastify'
import { createGym } from './create-gym.js'
import { verifyJwt } from '@/middlewares/verify-jwt.js'
import { searchGyms } from './search-gyms.js'
import { fetchNearbyGyms } from './fetch-nearby-gyms.js'
import { verifyUserRole } from '@/middlewares/verify-user-role.js'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
  app.get('/search', searchGyms)
  app.get('/nearby', fetchNearbyGyms)
}
