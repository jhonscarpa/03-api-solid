import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IPropsGetUserProfileUseCaseRequest {
  userId: string
}

interface IPropsGetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: IPropsGetUserProfileUseCaseRequest): Promise<IPropsGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
