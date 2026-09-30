// Test framework
import { describe, test, expect } from 'vitest'

// Test helpers
import { buildManualAddress, buildUprnAddress } from '../../../src/services/build-address-variables-service.js'

// Things under test
import { buildUpdateCustomerAddressVariables } from '../../../src/utils/build-update-customer-address-variables.js'

describe('buildUpdateCustomerAddressVariables', () => {
  describe('when the address was selected via postcode lookup', () => {
    const change = { uprn: '123456789', city: 'London', postcode: 'SW1A 1AA', country: 'England' }

    test('it builds the mutation variables with the UPRN address', () => {
      expect(buildUpdateCustomerAddressVariables(change, '1234567890')).toEqual({
        input: {
          crn: '1234567890',
          address: buildUprnAddress(change)
        }
      })
    })
  })

  describe('when the address was entered manually', () => {
    const change = { address1: '10 Test Street', city: 'London', postcode: 'SW1A 1AA', country: 'England' }

    test('it builds the mutation variables with the manual address', () => {
      expect(buildUpdateCustomerAddressVariables(change, '1234567890')).toEqual({
        input: {
          crn: '1234567890',
          address: buildManualAddress(change)
        }
      })
    })
  })
})
