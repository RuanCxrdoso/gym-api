import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history.js'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('User check-ins fetch test', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch all your check-ins', async () => {
    await checkInsRepository.create({
      userId: 'user-1',
      gymId: 'gym-01',
    })

    await checkInsRepository.create({
      userId: 'user-1',
      gymId: 'gym-02',
    })

    const { checkIns } = await sut.execute({ userId: 'user-1', page: 1 })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able to fetch all check-ins paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        userId: 'user-1',
        gymId: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-1', page: 2 })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})
