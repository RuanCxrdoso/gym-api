import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository.js'
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in.js'
import { ResourcesNotFoundError } from './errors/resources-not-found-error.js'
import { CheckInLateValidateError } from './errors/check-in-late-validate-error.js'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate check-in test', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const checkIn = await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    const { checkIn: checkInResponse } = await sut.execute({
      checkInId: checkIn.id,
    })

    expect(checkInResponse.validatedAt).toBeInstanceOf(Date)
    expect(checkInRepository.checkIns[0]?.validatedAt).toBeInstanceOf(Date)
  })

  it('shouldnt be able to validate inexistent check-in', async () => {
    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await expect(() =>
      sut.execute({
        checkInId: 'id-com-certeza-invalido',
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })

  it('shouldnt be able to validate check-in after 20 min', async () => {
    vi.setSystemTime(new Date(2026, 0, 10, 8, 0, 0))

    const checkIn = await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    const timeInMinutes = 1000 * 60 * 21 // 21 min

    vi.advanceTimersByTime(timeInMinutes)

    await expect(() =>
      sut.execute({ checkInId: checkIn.id }),
    ).rejects.toBeInstanceOf(CheckInLateValidateError)
  })
})
