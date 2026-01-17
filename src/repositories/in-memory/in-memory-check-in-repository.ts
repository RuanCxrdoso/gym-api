import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInRepository } from '../check-in-repository.js'
import type { CheckInUncheckedCreateInput } from 'generated/prisma/models.js'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

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

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)

      if (
        checkIn.userId === userId &&
        checkInDate.isAfter(startOfTheDay) &&
        checkInDate.isBefore(endOfTheDay)
      ) {
        return checkIn
      }

      return false
    })

    if (!checkIn) return null

    return checkIn
  }
}
