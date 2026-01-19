import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { GetUserProfileUseCase } from '../get-user-profile.js'

export class MakeProfileUserCase {
  static getInstance() {
    const usersRepository = new PrismaUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

    return getUserProfileUseCase
  }
}
