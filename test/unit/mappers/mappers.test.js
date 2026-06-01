// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { mappers } from '../../../src/mappers/mappers.js'

// Test helpers
import { mapPersonalBusinessDetails } from '../../../src/mappers/personal-business-details-mapper.js'

describe('mappers exports', () => {
  test('exports mapPersonalBusinessDetails', () => {
    expect(mappers.mapPersonalBusinessDetails).toBe(mapPersonalBusinessDetails)
  })
})
