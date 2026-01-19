import type { CheckInRepository } from '@/repositories/check-in-repository.js'

interface GetUserCheckInsCountRequest {
  userId: string
}

interface GetUserCheckInsCountResponse {
  checkInsCount: number
}

export class GetUserCheckInsCountUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserCheckInsCountRequest): Promise<GetUserCheckInsCountResponse> {
    const checkInsCount =
      await this.checkInsRepository.getCheckInsCountByUserId(userId)

    return { checkInsCount }
  }
}
