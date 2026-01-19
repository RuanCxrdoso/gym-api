import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gyms test', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Fitness gym',
      lat: -42.419830921,
      long: -31.4124312,
    })

    await gymsRepository.create({
      title: 'Allp fit',
      lat: -42.419830921,
      long: -31.4124312,
    })

    const { gyms: gymsFirstResponse } = await sut.execute({
      q: 'ness',
      page: 1,
    })

    expect(gymsFirstResponse).toHaveLength(1)
    expect(gymsFirstResponse).toEqual([
      expect.objectContaining({ title: 'Fitness gym' }),
    ])

    const { gyms: gymsSecondResponse } = await sut.execute({
      q: 'fit',
      page: 1,
    })

    expect(gymsSecondResponse).toHaveLength(2)
    expect(gymsSecondResponse).toEqual([
      expect.objectContaining({ title: 'Fitness gym' }),
      expect.objectContaining({ title: 'Allp fit' }),
    ])
  })

  it('should be able to paginate gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Fitness gym ${i}`,
        lat: -42.419830921,
        long: -31.4124312,
      })
    }

    const { gyms: gymsFirstResponse } = await sut.execute({
      q: 'ness',
      page: 2,
    })

    expect(gymsFirstResponse).toHaveLength(2)
    expect(gymsFirstResponse).toEqual([
      expect.objectContaining({ title: 'Fitness gym 21' }),
      expect.objectContaining({ title: 'Fitness gym 22' }),
    ])
  })
})
