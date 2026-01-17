import type { GymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from 'generated/prisma/client.js'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  lat: number
  long: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    lat,
    long,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      lat,
      long,
    })

    return { gym }
  }
}
