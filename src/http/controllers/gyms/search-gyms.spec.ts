import { app } from '@/app.js'
import { getAccessToken } from '@/utils/tests/get-access-token.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Search gyms E2E tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const { access_token: token } = await getAccessToken()

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Fitness gym',
        description: null,
        phone: null,
        lat: -42.419830921,
        long: -31.4124312,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Allp Fit',
        description: null,
        phone: null,
        lat: -42.419830921,
        long: -31.4124312,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'gym',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.gyms[0]).toEqual(
      expect.objectContaining({ title: 'Fitness gym' }),
    )

    const secondResponse = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Fit',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(secondResponse.body.gyms).toHaveLength(2)
  })
})
