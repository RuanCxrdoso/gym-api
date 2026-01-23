import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { CreateGymUseCase } from '../create-gym.js'

export class MakeCreateGymUseCase {
  static getInstance() {
    const prismaGymsRepository = new PrismaGymsRepository()
    const createGymUseCase = new CreateGymUseCase(prismaGymsRepository)

    return createGymUseCase
  }
}
