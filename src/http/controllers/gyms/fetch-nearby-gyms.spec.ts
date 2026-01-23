import { app } from '@/app.js'
import { getAccessToken } from '@/utils/tests/get-access-token.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch nearby gyms test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
    const { access_token: token } = await getAccessToken()

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Nearby Gym',
        description: null,
        phone: null,
        lat: -12.8039879,
        long: -38.3902983,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: null,
        phone: null,
        lat: -12.9541752,
        long: -38.4235475,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        userLat: '-12.8039879',
        userLong: '-38.3902983',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.gyms[0]).toEqual(
      expect.objectContaining({ title: 'Nearby Gym' }),
    )
  })
})
