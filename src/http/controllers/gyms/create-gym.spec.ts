import { app } from '@/app.js'
import { getAccessToken } from '@/utils/tests/get-access-token.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create gym E2E tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { access_token: token } = await getAccessToken(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym test',
        description: 'Description gym test',
        phone: '71986944657',
        lat: -12.7951427,
        long: -38.3932509,
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      gym: expect.objectContaining({ title: 'Gym test' }),
    })
  })
})
