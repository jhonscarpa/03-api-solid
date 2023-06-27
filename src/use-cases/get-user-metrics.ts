import { CheckInsRepository } from './../repositories/check-ins-repository'

interface IPropsGetUserMetricsUseCaseRequest {
  userId: string
}

interface IPropsGetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: IPropsGetUserMetricsUseCaseRequest): Promise<IPropsGetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
