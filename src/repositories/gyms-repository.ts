import type { Gym } from 'generated/prisma/client.js'

export interface GymsRepository {
  findById: (gymId: string) => Promise<Gym | null>
}
