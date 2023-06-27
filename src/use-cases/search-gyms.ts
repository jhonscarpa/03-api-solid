import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms-repository'

interface IPropsSearchGymsUseCaseRequest {
  query: string
  page: number
}

interface IPropsSearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: IPropsSearchGymsUseCaseRequest): Promise<IPropsSearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
