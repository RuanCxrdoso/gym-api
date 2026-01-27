import { app } from '@/app.js'
import { getAccessToken } from '@/utils/tests/get-access-token.js'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { MakeGym } from '@/utils/tests/make-gym.js'

describe('Check-in metrics controller E2E tests', () => {
  beforeAll(async () => {
    await app.ready()

    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()

    vi.useRealTimers()
  })

  it('should be able to get check-ins history', async () => {
    const { access_token: token } = await getAccessToken(app)

    const gym = await MakeGym.create()

    vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

    await request(app.server)
      .post(`/check-ins/gyms/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        userLat: gym.lat.toString(),
        userLong: gym.long.toString(),
      })

    vi.setSystemTime(new Date(2026, 0, 21, 8, 0, 0))

    await request(app.server)
      .post(`/check-ins/gyms/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        userLat: gym.lat.toString(),
        userLong: gym.long.toString(),
      })

    vi.setSystemTime(new Date(2026, 0, 22, 8, 0, 0))

    await request(app.server)
      .post(`/check-ins/gyms/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        userLat: gym.lat.toString(),
        userLong: gym.long.toString(),
      })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.checkInsCount).toEqual(3)
  })
})
