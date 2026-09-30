// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateBusinessRegistrationNumbersVariables } from '../../../src/utils/build-update-business-registration-numbers-variables.js'

describe('buildUpdateBusinessRegistrationNumbersVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateBusinessRegistrationNumbersVariables('12345678', '1234567', '123456789')).toEqual({
      input: {
        sbi: '123456789',
        registrationNumbers: {
          companiesHouse: '12345678',
          charityCommission: '1234567'
        }
      }
    })
  })

  describe('when a registration number is not provided', () => {
    test('it defaults the missing numbers to null', () => {
      expect(buildUpdateBusinessRegistrationNumbersVariables(undefined, undefined, '123456789')).toEqual({
        input: {
          sbi: '123456789',
          registrationNumbers: {
            companiesHouse: null,
            charityCommission: null
          }
        }
      })
    })
  })
})
