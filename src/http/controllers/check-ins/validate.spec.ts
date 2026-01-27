import { app } from '@/app.js'
import { getAccessToken } from '@/utils/tests/get-access-token.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { MakeGym } from '@/utils/tests/make-gym.js'

describe('Check-in metrics controller E2E tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get check-ins history', async () => {
    const { access_token: token } = await getAccessToken(app, true)

    const gym = await MakeGym.create()

    const checkInResponse = await request(app.server)
      .post(`/check-ins/gyms/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        userLat: gym.lat.toString(),
        userLong: gym.long.toString(),
      })

    const id = checkInResponse.body.checkIn.id

    const response = await request(app.server)
      .patch(`/check-ins/${id}/validate`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(204)

    console.log(response.body)
    // expect(response.body.checkIn.validatedAt).toBeInstanceOf(Date)
  })
})
