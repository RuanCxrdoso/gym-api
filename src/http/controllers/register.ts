import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterUseCase } from '@/use-cases/register.js'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'

export async function userRegister(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof Error && err.message === 'Email already exists.') {
      res.status(409).send({ error: err.message })
    }
  }

  res.status(201).send()
}
