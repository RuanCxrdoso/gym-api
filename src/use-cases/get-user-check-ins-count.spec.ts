import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserCheckInsCountUseCase } from './get-user-check-ins-count.js'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository.js'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserCheckInsCountUseCase

describe('User check-ins count test', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new GetUserCheckInsCountUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count', async () => {
    await checkInsRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await checkInsRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await checkInsRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-1',
    })

    expect(checkInsCount).toBe(3)
  })
})
