import type { UserCreateInput } from 'generated/prisma/models.js'
import { prisma } from 'lib/prisma.js'
import type { UsersRepositoryInterface } from '../users-repository.js'

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async findUniqueEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
