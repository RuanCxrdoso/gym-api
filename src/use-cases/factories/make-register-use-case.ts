import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { RegisterUseCase } from '../register.js'

export class MakeRegisterUseCase {
  static getInstance() {
    const repository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(repository)

    return registerUseCase
  }
}
