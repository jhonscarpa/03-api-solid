import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  // it('should hash user password upon registration', async () => {
  //   const UsersRepository = new InMemoryUsersRepository()
  //   const registerUseCase = new RegisterUseCase(UsersRepository)

  //   const { user } = await registerUseCase.execute({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: '123456',
  //   })

  //   const isPasswordCorrectlyHashed = await compare(
  //     '123456',
  //     user.password_hash,
  //   )

  //   expect(isPasswordCorrectlyHashed).toBe(true)
  // })
})
