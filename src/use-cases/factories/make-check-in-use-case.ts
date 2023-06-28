import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function MakeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return useCase
}
