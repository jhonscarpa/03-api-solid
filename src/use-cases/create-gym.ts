import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms-repository'

interface IPropsCreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface IPropsCreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: IPropsCreateGymUseCaseRequest): Promise<IPropsCreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
