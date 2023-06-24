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
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
