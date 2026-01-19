import type { Gym } from 'generated/prisma/client.js'
import type { GymsRepository } from '../gyms-repository.js'
import type { GymCreateInput } from 'generated/prisma/models.js'
import { Decimal } from '@prisma/client/runtime/index-browser'
import { randomUUID } from 'node:crypto'
import { getPaginateIndex } from '@/utils/get-paginate-index.js'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async create(data: GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      lat: new Decimal(Number(data.lat)),
      long: new Decimal(Number(data.long)),
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    if (!gym) return null

    return gym
  }

  async searchByQuery(q: string, page: number) {
    const { start, end } = getPaginateIndex(page, 20)

    const gyms = this.gyms
      .filter((gym) => gym.title.toLowerCase().includes(q.toLowerCase()))
      .slice(start, end)

    return gyms
  }
}
