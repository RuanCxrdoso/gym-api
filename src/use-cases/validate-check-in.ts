import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInRepository } from '@/repositories/check-in-repository.js'
import { ResourcesNotFoundError } from './errors/resources-not-found-error.js'
import dayjs from 'dayjs'
import { CheckInLateValidateError } from './errors/check-in-late-validate-error.js'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourcesNotFoundError()
    }

    const differenceInMinutos = dayjs().diff(checkIn.createdAt, 'minute')

    if (differenceInMinutos > 20) {
      throw new CheckInLateValidateError()
    }

    checkIn.validatedAt = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
