import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInRepository } from '@/repositories/check-in-repository.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'
import { ResourcesNotFoundError } from './errors/resources-not-found-error.js'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates.js'
import { MaxDistanceError } from './errors/max-distance-error.js'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins.js'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLat: number
  userLong: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLat,
    userLong,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourcesNotFoundError()
    }

    const dist = getDistanceBetweenCoordinates(
      { lat: userLat, long: userLong },
      { lat: Number(gym.lat), long: Number(gym.long) },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (dist > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckinsError()
    }

    const checkIn = await this.checkInRepository.create({ userId, gymId })

    return { checkIn }
  }
}
