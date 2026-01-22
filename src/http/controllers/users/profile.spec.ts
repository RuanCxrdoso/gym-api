import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Profile E2E tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    })

    const loginResponse = await request(app.server).post('/sessions').send({
      email: 'fulano@email.com',
      password: '123456',
    })

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({ name: 'Fulano', email: 'fulano@email.com' }),
    )
  })
})
