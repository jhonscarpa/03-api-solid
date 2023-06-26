import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from './../repositories/check-ins-repository'

interface IPropsFetchUserCheckInsHistoryUseCaseRequest {
  userId: string
}

interface IPropsFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: IPropsFetchUserCheckInsHistoryUseCaseRequest): Promise<IPropsFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)

    return {
      checkIns,
    }
  }
}
