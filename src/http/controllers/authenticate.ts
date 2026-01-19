import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { MakeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateSchema.parse(req.body)

  try {
    const authenticateUseCase = MakeAuthenticateUseCase.getInstance()

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }

  return res.status(200).send()
}
