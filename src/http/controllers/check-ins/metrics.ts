import { MakeGetUserCheckInsCountUseCase } from '@/use-cases/factories/make-get-user-check-ins-count-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function userCheckInsCount(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const getUserCheckInsCountUseCase =
    MakeGetUserCheckInsCountUseCase.getInstance()

  const { checkInsCount } = await getUserCheckInsCountUseCase.execute({
    userId: req.user.sub,
  })

  return res.status(200).send({ checkInsCount })
}
