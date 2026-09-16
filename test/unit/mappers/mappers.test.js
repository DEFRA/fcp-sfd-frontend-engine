// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { mappers } from '../../../src/mappers/mappers.js'

// Test helpers
import { mapAddress } from '../../../src/mappers/address-mapper.js'
import { mapBusinessDetails } from '../../../src/mappers/business-details-mapper.js'
import { mapCustomerName } from '../../../src/mappers/customer-name-mapper.js'
import { mapPersonalBusinessDetails } from '../../../src/mappers/personal-business-details-mapper.js'
import { mapPersonalDetails } from '../../../src/mappers/personal-details-mapper.js'

describe('mappers exports', () => {
  test('exports mapAddress', () => {
    expect(mappers.address).toBe(mapAddress)
  })

  test('exports mapBusinessDetails', () => {
    expect(mappers.businessDetails).toBe(mapBusinessDetails)
  })

  test('exports mapCustomerName', () => {
    expect(mappers.customerName).toBe(mapCustomerName)
  })

  test('exports mapPersonalBusinessDetails', () => {
    expect(mappers.personalBusinessDetails).toBe(mapPersonalBusinessDetails)
  })

  test('exports mapPersonalDetails', () => {
    expect(mappers.personalDetails).toBe(mapPersonalDetails)
  })
})
