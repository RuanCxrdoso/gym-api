import { app } from '@/app.js'
import { getAccessToken } from '@/utils/tests/get-access-token.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { MakeGym } from '@/utils/tests/make-gym.js'

describe('Check-in controller E2E tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { access_token: token } = await getAccessToken(app)

    const gym = await MakeGym.create()

    const response = await request(app.server)
      .post(`/check-ins/gyms/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        userLat: gym.lat.toString(),
        userLong: gym.long.toString(),
      })

    expect(response.status).toEqual(201)
    expect(response.body.checkIn.id).toBeTypeOf('string')
  })
})
