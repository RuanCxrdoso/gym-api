import '@fastify/jwt'

type role = 'ADMIN' | 'MEMBER'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      exp: string | number
      role: role
    } // user type is return type of `request.user` object
  }
}
