import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import { prisma } from 'lib/prisma.js'
import request from 'supertest'

export async function getAccessToken(app: FastifyInstance, isAdmin = false) {
  // await request(app.server).post('/users').send({
  //   name: 'Ciclano',
  //   email: 'ciclano@email.com',
  //   password: '123456',
  // })

  const user = await prisma.user.create({
    data: {
      name: 'Coro de rato do teste E2E',
      email: 'coroderatodoteste2e@gmail.com',
      passwordHash: await hash('123456', 5),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const loginResponse = await request(app.server).post('/sessions').send({
    email: user.email,
    password: '123456',
  })

  const { access_token } = loginResponse.body
  const cookies = loginResponse.get('Set-Cookie') ?? ['']

  return { access_token, cookies }
}
