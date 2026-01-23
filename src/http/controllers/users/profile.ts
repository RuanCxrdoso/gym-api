import { ResourcesNotFoundError } from '@/use-cases/errors/resources-not-found-error.js'
import { MakeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getProfileUseCase = MakeGetUserProfileUseCase.getInstance()

  try {
    const userId = req.user.sub

    const { user } = await getProfileUseCase.execute({ id: userId })

    return res.status(200).send({ user })
  } catch (error) {
    if (error instanceof ResourcesNotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    throw error
  }
}
