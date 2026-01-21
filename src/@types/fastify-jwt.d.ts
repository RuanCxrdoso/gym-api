import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { name: string } // payload type is used for signing and verifying
    user: {
      sub: string
      exp: string | number
    } // user type is return type of `request.user` object
  }
}
