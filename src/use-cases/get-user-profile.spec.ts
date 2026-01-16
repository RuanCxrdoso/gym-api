import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { describe, expect, it, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { hash } from 'bcryptjs'
import { ResourcesNotFoundError } from './errors/resources-not-found-error.js'

let inMemoryUsersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get user profiles tests', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able o get their profile', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash: await hash('123456', 5),
    })

    const { user } = await getUserProfileUseCase.execute({ id: 'user-1' })

    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('johndoe@email.com')
  })

  it('shouldnt be able to get profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({ id: '123456' }),
    ).rejects.instanceOf(ResourcesNotFoundError)
  })
})
