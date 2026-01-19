import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate tests', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to auth', async () => {
    const email = 'johndoe@email.com'
    const password = '123456'
    const passwordHash = await hash(password, 5)

    const newUser = {
      name: 'John Doe',
      email,
      passwordHash,
    }

    await inMemoryUsersRepository.create(newUser)

    const { user } = await authenticateUseCase.execute({ email, password })

    expect(user.id).toBeTypeOf('string')
  })

  it('shouldnt be able to auth with invalid email', async () => {
    const email = 'johndoe@email.com'
    const password = '123456'

    await expect(() =>
      authenticateUseCase.execute({ email, password }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('shouldnt be able to auth with invalid password', async () => {
    const email = 'johndoe@email.com'
    const password = '123456'
    const passwordHash = await hash(password, 5)

    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash,
    }

    await inMemoryUsersRepository.create(user)

    await expect(() =>
      authenticateUseCase.execute({ email, password: password.concat('789') }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
