import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInRepository } from '@/repositories/check-in-repository.js'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({ userId, gymId })

    return { checkIn }
  }
}
