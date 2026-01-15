import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import bcrypt from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Testing user register module', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should hash user password', async () => {
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
    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    }

    const { user: userCreateResponse } = await registerUseCase.execute(user)

    expect(userCreateResponse.id).toBeTypeOf('string')
  })
})
