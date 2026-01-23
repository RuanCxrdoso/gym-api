import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInUncheckedCreateInput } from 'generated/prisma/models.js'
import type { CheckInRepository } from '../check-in-repository.js'
import { prisma } from 'lib/prisma.js'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: { gte: startOfTheDay.toDate(), lte: endOfTheDay.toDate() },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20, //
    })

    return checkIns
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })

    return checkIn
  }

  async getCheckInsCountByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        userId,
      },
    })

    return count
  }
}
