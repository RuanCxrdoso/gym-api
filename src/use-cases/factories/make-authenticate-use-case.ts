import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '../authenticate.js'

export class MakeAuthenticateUseCase {
  static getInstance() {
    const repository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(repository)

    return authenticateUseCase
  }
}
