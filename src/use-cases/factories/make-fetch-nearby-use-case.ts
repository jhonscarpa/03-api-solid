import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function MakeFetchNearbyUseCase() {
  const gymsRepository = new PrismaGymRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
