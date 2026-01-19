import type { Gym } from 'generated/prisma/client.js'
import type { GymCreateInput } from 'generated/prisma/models.js'

export interface FindManyNearbyParams {
  lat: number
  long: number
}

export interface GymsRepository {
  create(data: GymCreateInput): Promise<Gym>
  findById: (gymId: string) => Promise<Gym | null>
  searchByQuery: (q: string, page: number) => Promise<Gym[]>
  findManyNearby: (params: FindManyNearbyParams) => Promise<Gym[]>
}
