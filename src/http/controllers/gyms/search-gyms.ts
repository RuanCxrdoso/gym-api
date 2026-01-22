import { MakeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function searchGyms(req: FastifyRequest, res: FastifyReply) {
  const searchGymsSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsSchema.parse(req.body)

  const searchGymsUseCase = MakeSearchGymsUseCase.getInstance()

  const { gyms } = await searchGymsUseCase.execute({ q, page })

  return res.status(200).send({ gyms })
}
