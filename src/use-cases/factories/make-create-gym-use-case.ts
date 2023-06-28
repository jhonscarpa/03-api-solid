import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function MakeCreateGymUseCase() {
  const gymsRepository = new PrismaGymRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
