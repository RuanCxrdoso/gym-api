import { MakeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function fetchNearbyGyms(req: FastifyRequest, res: FastifyReply) {
  const fetchNearbyGymsSchema = z.object({
    userLat: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLong: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLat, userLong } = fetchNearbyGymsSchema.parse(req.query)

  const fetchNearbyGymsUseCase = MakeFetchNearbyGymsUseCase.getInstance()

  const { gyms } = await fetchNearbyGymsUseCase.execute({ userLat, userLong })

  return res.status(200).send({ gyms })
}
