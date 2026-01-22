import { MakeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function checkInsHistory(req: FastifyRequest, res: FastifyReply) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  // /check-in/history?page=1
  const { page } = checkInsHistoryQuerySchema.parse(req.query)

  const fetchUserCheckInsHistoryUseCase =
    MakeFetchUserCheckInsHistoryUseCase.getInstance()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return res.status(200).send({ checkIns })
}
