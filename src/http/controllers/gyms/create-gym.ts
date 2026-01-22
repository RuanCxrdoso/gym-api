import { MakeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function createGym(req: FastifyRequest, res: FastifyReply) {
  const createGymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    lat: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    long: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const body = createGymSchema.parse(req.body)

  const createGymUseCase = MakeCreateGymUseCase.getInstance()

  const { gym } = await createGymUseCase.execute(body)

  return res.status(201).send({ gym })
}
