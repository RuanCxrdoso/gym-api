import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { GetUserCheckInsCountUseCase } from '../get-user-check-ins-count.js'

export class MakeGetUserCheckInsCountUseCase {
  static getInstance() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const getUserCheckInsCountUseCase = new GetUserCheckInsCountUseCase(
      prismaCheckInsRepository,
    )

    return getUserCheckInsCountUseCase
  }
}
