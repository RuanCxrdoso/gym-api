import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym.js'

let gymRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create gym tests', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create a gym', async () => {
    const gym = {
      title: 'Test Gym',
      description: null,
      phone: null,
      lat: -12.8039879,
      long: -38.3902983,
    }

    const { gym: gymResponse } = await createGymUseCase.execute(gym)

    expect(gymResponse.id).toBeTypeOf('string')
  })
})
