import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms test', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to featch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Nearby Gym',
      lat: -12.8039879,
      long: -38.3902983,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      lat: -12.9541752,
      long: -38.4235475,
    })

    const { gyms } = await sut.execute({
      userLat: -12.8039879,
      userLong: -38.3902983,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nearby Gym' })])
  })
})
