// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateBusinessPhoneNumbersVariables } from '../../../src/utils/build-update-business-phone-numbers-variables.js'

describe('buildUpdateBusinessPhoneNumbersVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateBusinessPhoneNumbersVariables('01234 567891', '04321 987650', '123456789')).toEqual({
      input: {
        phone: {
          landline: '01234 567891',
          mobile: '04321 987650'
        },
        sbi: '123456789'
      }
    })
  })

  describe('when a phone number is not provided', () => {
    test('it defaults to null when landline is undefined', () => {
      expect(buildUpdateBusinessPhoneNumbersVariables(undefined, '07123456789', '123456789')).toEqual({
        input: {
          phone: {
            landline: null,
            mobile: '07123456789'
          },
          sbi: '123456789'
        }
      })
    })

    test('it defaults to null when mobile is undefined', () => {
      expect(buildUpdateBusinessPhoneNumbersVariables('01234567890', undefined, '123456789')).toEqual({
        input: {
          phone: {
            landline: '01234567890',
            mobile: null
          },
          sbi: '123456789'
        }
      })
    })

    test('it defaults to null when both are undefined', () => {
      expect(buildUpdateBusinessPhoneNumbersVariables(undefined, undefined, '123456789')).toEqual({
        input: {
          phone: {
            landline: null,
            mobile: null
          },
          sbi: '123456789'
        }
      })
    })


    test('it defaults to null when both are null', () => {
      expect(buildUpdateBusinessPhoneNumbersVariables(null, null, '123456789')).toEqual({
        input: {
          phone: {
            landline: null,
            mobile: null
          },
          sbi: '123456789'
        }
      })
    })

    test('it defaults to null when both are empty strings', () => {
      expect(buildUpdateBusinessPhoneNumbersVariables('', '', '123456789')).toEqual({
        input: {
          phone: {
            landline: '',
            mobile: ''
          },
          sbi: '123456789'
        }
      })
    })
  })
})
