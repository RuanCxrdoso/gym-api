import type { UsersRepositoryInterface } from '@/repositories/users-repository.js'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import type { User } from 'generated/prisma/client.js'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  execute: (data: RegisterUseCaseRequest) => Promise<{ user: User }>
}

export class RegisterUseCase implements RegisterUseCaseResponse {
  // Inversão de dependência, a classe RegisterUseCase agora está acoplada à interface UsersRepositoryInterface, então ela pode receber como parâmetro qualquer outra classe que implemente essa mesma interface.
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await bcrypt.hash(password, 5)

    const userEmailUnique = await this.usersRepository.findUniqueEmail(email)

    if (userEmailUnique) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}
