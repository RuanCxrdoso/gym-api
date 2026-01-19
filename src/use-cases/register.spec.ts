import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import bcrypt from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Testing user register module', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password', async () => {
    const { user } = await sut.execute({
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

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
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

    const { user: userCreateResponse } = await sut.execute(user)

    expect(userCreateResponse.id).toBeTypeOf('string')
  })
})
