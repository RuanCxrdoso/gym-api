import type { GymUncheckedCreateInput } from 'generated/prisma/models.js'
import { faker } from '@faker-js/faker'
import { prisma } from 'lib/prisma.js'
import { randomUUID } from 'node:crypto'

export class MakeGym {
  static async create(override: Partial<GymUncheckedCreateInput> = {}) {
    const gym = await prisma.gym.create({
      data: {
        id: override.id ?? randomUUID(),
        title: override.title ?? faker.company.name(),
        description: override.description ?? faker.lorem.paragraph(),
        phone: override.phone ?? faker.phone.number(),
        lat: override.lat ?? faker.location.latitude(),
        long: override.long ?? faker.location.longitude(),
        ...override,
      },
    })

    return gym
  }
}
