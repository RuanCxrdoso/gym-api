import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { ValidateCheckInUseCase } from '../validate-check-in.js'

export class MakeValidateCheckInUseCase {
  static getInstance() {
    const prismaCheckInRepository = new PrismaCheckInsRepository()
    const validateCheckInUseCase = new ValidateCheckInUseCase(
      prismaCheckInRepository,
    )

    return validateCheckInUseCase
  }
}
