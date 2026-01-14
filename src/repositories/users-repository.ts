import type { User } from 'generated/prisma/client.js'
import type { UserCreateInput } from 'generated/prisma/models/User.js'

export interface UsersRepositoryInterface {
  findUniqueEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}
