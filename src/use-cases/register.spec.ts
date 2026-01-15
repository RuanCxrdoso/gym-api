import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import bcrypt from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

describe('Testing user register module', () => {
  it('should hash user password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const isPasswordCorretlyHashed = await bcrypt.compare(
      '123456',
      user.passwordHash,
    )

    expect(isPasswordCorretlyHashed).toBe(true)
  })

  it('shouldnt be able to register when the email already in use', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'johndoe@email.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    }

    const { user: userCreateResponse } = await registerUseCase.execute(user)

    expect(userCreateResponse.id).toBeTypeOf('string')
  })
})
