import type { UsersRepository } from '@/repositories/users-repository.js'
import type { User } from 'generated/prisma/client.js'
import { ResourcesNotFoundError } from './errors/resources-not-found-error.js'

interface GetUserProfileUseCaseRequest {
  id: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourcesNotFoundError()
    }

    return { user }
  }
}
