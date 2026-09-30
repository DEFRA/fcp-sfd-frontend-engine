// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateCustomerPhoneVariables } from '../../../src/utils/build-update-customer-phone-variables.js'

describe('buildUpdateCustomerPhoneVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateCustomerPhoneVariables('01234 567891', '07123 456789', '1234567890')).toEqual({
      input: {
        phone: {
          landline: '01234 567891',
          mobile: '07123 456789'
        },
        crn: '1234567890'
      }
    })
  })

  describe('when a phone number is not provided', () => {
    test('it defaults to null when landline is undefined', () => {
      expect(buildUpdateCustomerPhoneVariables(undefined, '07123 456789', '1234567890')).toEqual({
        input: {
          phone: {
            landline: null,
            mobile: '07123 456789'
          },
          crn: '1234567890'
        }
      })
    })

    test('it defaults to null when mobile is undefined', () => {
      expect(buildUpdateCustomerPhoneVariables('01234 567891', undefined, '1234567890')).toEqual({
        input: {
          phone: {
            landline: '01234 567891',
            mobile: null
          },
          crn: '1234567890'
        }
      })
    })

    test('it defaults to null when both are null', () => {
      expect(buildUpdateCustomerPhoneVariables(null, null, '1234567890')).toEqual({
        input: {
          phone: {
            landline: null,
            mobile: null
          },
          crn: '1234567890'
        }
      })
    })
  })
})
