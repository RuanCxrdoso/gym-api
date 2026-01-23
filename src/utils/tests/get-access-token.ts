import { app } from '@/app.js'
import request from 'supertest'

export async function getAccessToken() {
  await request(app.server).post('/users').send({
    name: 'Ciclano',
    email: 'ciclano@email.com',
    password: '123456',
  })

  const loginResponse = await request(app.server).post('/sessions').send({
    email: 'ciclano@email.com',
    password: '123456',
  })

  const { access_token } = loginResponse.body

  return { access_token }
}
