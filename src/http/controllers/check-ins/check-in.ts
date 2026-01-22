import { MaxDistanceError } from '@/use-cases/errors/max-distance-error.js'
import { MaxNumberOfCheckinsError } from '@/use-cases/errors/max-number-of-check-ins.js'
import { ResourcesNotFoundError } from '@/use-cases/errors/resources-not-found-error.js'
import { MakeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function checkIn(req: FastifyRequest, res: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.uuid(),
  })

  const checkInSchema = z.object({
    userLat: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLong: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = checkInParamsSchema.parse(req.params)
  const { userLat, userLong } = checkInSchema.parse(req.body)

  const checkInUseCase = MakeCheckInUseCase.getInstance()

  try {
    const { checkIn } = await checkInUseCase.execute({
      userId: req.user.sub,
      gymId,
      userLat,
      userLong,
    })

    return res.status(201).send({ checkIn })
  } catch (err) {
    if (err instanceof ResourcesNotFoundError) {
      return res.send(404).send({ message: err.message })
    }

    if (err instanceof MaxDistanceError) {
      return res.status(400).send({ message: err.message })
    }

    if (err instanceof MaxNumberOfCheckinsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }
}
