import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms-repository'

interface IPropsFetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface IPropsFetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IPropsFetchNearbyGymsUseCaseRequest): Promise<IPropsFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
