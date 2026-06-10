// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { mappers } from '../../../src/mappers/mappers.js'

// Test helpers
import { mapPersonalBusinessDetails } from '../../../src/mappers/personal-business-details-mapper.js'
import { mapAddress } from '../../../src/mappers/address-mapper.js'
import { mapCustomerName } from '../../../src/mappers/customer-name-mapper.js'

describe('mappers exports', () => {
  test('exports mapPersonalBusinessDetails', () => {
    expect(mappers.personalBusinessDetails).toBe(mapPersonalBusinessDetails)
  })

  test('exports mapAddress', () => {
    expect(mappers.address).toBe(mapAddress)
  })

  test('exports mapCustomerName', () => {
    expect(mappers.customerName).toBe(mapCustomerName)
  })
})
