import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { CheckInUseCase } from '../check-in.js'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'

export class MakeCheckInUseCase {
  static getInstance() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const prismaGymsRepository = new PrismaGymsRepository()
    const checkInUseCase = new CheckInUseCase(
      prismaCheckInsRepository,
      prismaGymsRepository,
    )

    return checkInUseCase
  }
}
