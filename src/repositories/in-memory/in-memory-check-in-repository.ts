import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInRepository } from '../check-in-repository.js'
import type { CheckInUncheckedCreateInput } from 'generated/prisma/models.js'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      createdAt: new Date(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
