import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository.js'
import { CheckInUseCase } from './check-in.js'

let checkInRepository: InMemoryCheckInRepository
let checkInUseCase: CheckInUseCase

describe('Testing user register module', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn.id).toBeTypeOf('string')
  })
})
