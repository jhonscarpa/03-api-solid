import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins-error'

let CheckInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(CheckInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-1',
      title: 'JavaScript Gym',
      description: '',
      latitude: -23.0309626,
      longitude: -45.5347522,
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should not be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -23.0309626,
      userLongitude: -45.5347522,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -23.0309626,
      userLongitude: -45.5347522,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: -23.0309626,
        userLongitude: -45.5347522,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -23.0309626,
      userLongitude: -45.5347522,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -23.0309626,
      userLongitude: -45.5347522,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-2',
      title: 'JavaScript Gym',
      description: '',
      latitude: new Decimal(-22.9799719),
      longitude: new Decimal(-45.5308905),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-2',
        userId: 'user-1',
        userLatitude: -23.0309626,
        userLongitude: -45.5347522,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
