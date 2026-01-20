import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history.js'

export class MakeFetchUserCheckInsHistoryUseCase {
  static getInstance() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      prismaCheckInsRepository,
    )

    return fetchUserCheckInsHistoryUseCase
  }
}
