// Test framework
import { describe, test, expect } from 'vitest'

// Test helpers
import { buildManualAddress, buildUprnAddress } from '../../../src/services/build-address-variables-service.js'

// Things under test
import { buildUpdateBusinessAddressVariables } from '../../../src/utils/build-update-business-address-variables.js'

describe('buildUpdateBusinessAddressVariables', () => {
  describe('when the address was selected via postcode lookup', () => {
    const change = { uprn: '123456789', city: 'London', postcode: 'SW1A 1AA', country: 'England' }

    test('it wraps the UPRN address in withUprn', () => {
      expect(buildUpdateBusinessAddressVariables(change, '123456789')).toEqual({
        input: {
          sbi: '123456789',
          address: { withUprn: buildUprnAddress(change) }
        }
      })
    })
  })

  describe('when the address was entered manually', () => {
    const change = { address1: '10 Test Street', city: 'London', postcode: 'SW1A 1AA', country: 'England' }

    test('it wraps the manual address in withoutUprn', () => {
      expect(buildUpdateBusinessAddressVariables(change, '123456789')).toEqual({
        input: {
          sbi: '123456789',
          address: { withoutUprn: buildManualAddress(change) }
        }
      })
    })
  })
})
