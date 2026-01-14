import type { UsersRepositoryInterface } from '@/repositories/users-repository.js'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // Inversão de dependência, a clase RegisterUseCase agora está acoplada à interface UsersRepositoryInterface, então ela pode receber como parâmetro qualquer outra classe que implemente essa mesma interface.
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
