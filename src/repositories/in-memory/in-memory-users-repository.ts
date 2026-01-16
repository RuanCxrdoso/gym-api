import type { UserCreateInput } from 'generated/prisma/models.js'
import type { UsersRepository } from '../users-repository.js'
import type { User } from 'generated/prisma/client.js'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email) || null

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id) || null

    return user
  }

  async create({ name, email, passwordHash }: UserCreateInput) {
    const user = {
      id: 'user-1',
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }
}
