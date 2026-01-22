import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'

describe('Authenticate tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Ruan',
      email: 'ruan@email.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'ruan@email.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body.access_token).toBeTypeOf('string')
  })
})
