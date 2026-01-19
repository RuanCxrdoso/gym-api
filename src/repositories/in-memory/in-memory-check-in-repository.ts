import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInRepository } from '../check-in-repository.js'
import type { CheckInUncheckedCreateInput } from 'generated/prisma/models.js'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = {
      id: data.id ?? randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      createdAt: new Date(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (checkInDB) => checkInDB.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

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

  async findManyByUserId(userId: string, page: number) {
    const start = (page - 1) * 20
    const end = page * 20

    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.userId === userId)
      .slice(start, end)

    return checkIns
  }

  async getCheckInsCountByUserId(userId: string) {
    const checkInsCount = this.checkIns.filter(
      (checkIn) => checkIn.userId === userId,
    ).length

    return checkInsCount
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id)

    if (!checkIn) return null

    return checkIn
  }
}
