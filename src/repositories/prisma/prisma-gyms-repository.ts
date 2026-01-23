import type { GymCreateInput } from 'generated/prisma/models.js'
import type {
  FindManyNearbyParams,
  GymsRepository,
} from '../gyms-repository.js'
import { prisma } from 'lib/prisma.js'
import type { Gym } from 'generated/prisma/client.js'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async searchByQuery(q: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: { contains: q },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({ lat, long }: FindManyNearbyParams) {
    const gyms: Gym[] = await prisma.$queryRaw`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( lat ) ) * cos( radians( long ) - radians(${long}) ) + sin( radians(${lat}) ) * sin( radians( lat ) ) ) ) <= 10
    `

    return gyms
  }
}
