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

    const { user } = await authenticateUseCase.execute({ email, password })

    const jwtToken = await res.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const jwtRefreshToken = await res.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return res
      .status(200)
      .setCookie('refresh_token', jwtRefreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ access_token: jwtToken })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }
}
