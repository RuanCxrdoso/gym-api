import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository.js'
import { CheckInUseCase } from './check-in.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.js'
import { Decimal } from '@prisma/client/runtime/index-browser'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins.js'
import { MaxDistanceError } from './errors/max-distance-error.js'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('Check-ins test', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-1',
      title: 'Fitness',
      description: 'Greatfull gym',
      phone: '71912345678',
      lat: -12.8039879,
      long: -38.3902983,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLat: -12.8039879,
      userLong: -38.3902983,
    })

    expect(checkIn.id).toBeTypeOf('string')
  })

  it('shouldnt be able to check-in two times in a day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLat: -12.8039879,
      userLong: -38.3902983,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLat: -12.8039879,
        userLong: -38.3902983,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('should be able to check-in two times in a different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLat: -12.8039879,
      userLong: -38.3902983,
    })

    vi.setSystemTime(new Date(2022, 1, 20, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLat: -12.8039879,
      userLong: -38.3902983,
    })

    expect(checkIn.id).toBeTypeOf('string')
  })

  it('shouldnt be able to check-in on distant gym', async () => {
    gymRepository.gyms.push({
      id: 'gym-2',
      title: 'Allp Fit',
      description: 'Best gym',
      phone: '71953245678',
      lat: new Decimal(-12.7991989),
      long: new Decimal(-38.3955953),
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLat: -12.8039879,
        userLong: -38.3902983,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
