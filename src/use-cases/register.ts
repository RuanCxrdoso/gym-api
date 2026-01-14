import type { UsersRepositoryInterface } from '@/repositories/users-repository.js'
import bcrypt from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await bcrypt.hash(password, 5)

    const userEmailUnique = await this.usersRepository.findUniqueEmail(email)

    if (userEmailUnique) {
      throw new Error('Email already exists.')
    }

    await this.usersRepository.create({ name, email, passwordHash })

    return
  }
}
