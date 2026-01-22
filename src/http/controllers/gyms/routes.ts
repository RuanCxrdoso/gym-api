import type { FastifyInstance } from 'fastify'
import { createGym } from './create-gym.js'
import { verifyJwt } from '@/middlewares/verify-jwt.js'
import { searchGyms } from './search-gyms.js'
import { fetchNearbyGyms } from './fetch-nearby-gyms.js'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/', createGym)
  app.get('/search', searchGyms)
  app.get('/nearby', fetchNearbyGyms)
}
