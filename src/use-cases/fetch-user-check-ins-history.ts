import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from './../repositories/check-ins-repository'

interface IPropsFetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface IPropsFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IPropsFetchUserCheckInsHistoryUseCaseRequest): Promise<IPropsFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
