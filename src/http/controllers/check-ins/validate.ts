import { CheckInLateValidateError } from '@/use-cases/errors/check-in-late-validate-error.js'
import { ResourcesNotFoundError } from '@/use-cases/errors/resources-not-found-error.js'
import { MakeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInsParamsSchema = z.object({
    checkInId: z.uuid(),
  })

  const { checkInId } = validateCheckInsParamsSchema.parse(req.params)

  const validateCheckInUseCase = MakeValidateCheckInUseCase.getInstance()

  try {
    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId,
    })

    return res.status(204).send({ checkIn })
  } catch (err) {
    if (err instanceof ResourcesNotFoundError) {
      return res.send(404).send({ message: err.message })
    }

    if (err instanceof CheckInLateValidateError) {
      return res.status(400).send({ message: err.message })
    }
    throw err
  }
}
