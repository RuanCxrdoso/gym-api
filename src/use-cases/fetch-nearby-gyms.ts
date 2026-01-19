import type { GymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from 'generated/prisma/client.js'

interface FetchNearbyGymsUseCaseRequest {
  userLat: number
  userLong: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLat,
    userLong,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      lat: userLat,
      long: userLong,
    })

    return { gyms }
  }
}
