import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.js'

export class MakeFetchNearbyGymsUseCase {
  static getInstance() {
    const prismaGymsRepository = new PrismaGymsRepository()
    const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(
      prismaGymsRepository,
    )

    return fetchNearbyGymsUseCase
  }
}
