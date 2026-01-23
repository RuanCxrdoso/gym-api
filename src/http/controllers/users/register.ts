import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { MakeRegisterUseCase } from '@/use-cases/factories/make-register-use-case.js'

export async function userRegister(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const registerUseCase = MakeRegisterUseCase.getInstance()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      res.status(409).send({ message: err.message })
    }

    throw err
  }

  res.status(201).send()
}
