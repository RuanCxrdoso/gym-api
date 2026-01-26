import { app } from '@/app.js'
import { getAccessToken } from '@/utils/tests/get-access-token.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'

describe('Refresh token tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh your token', async () => {
    const { cookies } = await getAccessToken()

    const response = await supertest(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refresh_token='),
    ])
  })
})
