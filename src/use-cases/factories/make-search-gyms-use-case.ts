import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { SearchGymUseCase } from '../search-gyms.js'

export class MakeSearchGymsUseCase {
  static getInstance() {
    const prismaGymsRepository = new PrismaGymsRepository()
    const searchGymsUseCase = new SearchGymUseCase(prismaGymsRepository)

    return searchGymsUseCase
  }
}
