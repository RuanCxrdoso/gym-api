import type { GymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from 'generated/prisma/client.js'

interface SearchGymUseCaseRequest {
  q: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    q,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchByQuery(q, page)

    return { gyms }
  }
}
