import fastify from 'fastify'
import { userRoutes } from './http/routes/user-routes.js'
import { ZodError, treeifyError } from 'zod'
import { env } from './env/index.js'

export const app = fastify()

app.register(userRoutes, {
  prefix: '/user',
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
