import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInUncheckedCreateInput } from 'generated/prisma/models.js'

export interface CheckInRepository {
  create: (data: CheckInUncheckedCreateInput) => Promise<CheckIn>
  save: (checkIn: CheckIn) => Promise<CheckIn>
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
  findById: (checkInId: string) => Promise<CheckIn | null>
  getCheckInsCountByUserId: (userId: string) => Promise<number>
}
