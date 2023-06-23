import { CheckInsRepository } from './../repositories/check-ins-repository'

import { CheckIn } from '@prisma/client'

interface IPropsCheckInCaseRequest {
  userId: string
  gymId: string
}

interface IPropsCheckInCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: IPropsCheckInCaseRequest): Promise<IPropsCheckInCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
