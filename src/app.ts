import fastify from 'fastify'
import 'dotenv/config'
import { ZodError, treeifyError } from 'zod'
import { env } from './env/index.js'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes.js'
import { gymsRoutes } from './http/controllers/gyms/routes.js'
import { checkInRoutes } from './http/controllers/check-ins/routes.js'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
})

app.register(usersRoutes)

app.register(gymsRoutes, {
  prefix: '/gyms',
})

app.register(checkInRoutes, {
  prefix: '/check-ins',
})

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: treeifyError(error) })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Send the error to sentry + grafana
  }

  return res.status(500).send({ message: 'Internal server error.' })
})
