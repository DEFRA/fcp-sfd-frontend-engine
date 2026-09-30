// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateCustomerDobVariables } from '../../../src/utils/build-update-customer-dob-variables.js'

describe('buildUpdateCustomerDobVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateCustomerDobVariables('15', '11', '1990', '1234567890')).toEqual({
      input: {
        dateOfBirth: '1990-11-15',
        crn: '1234567890'
      }
    })
  })

  describe('when the date parts are numbers', () => {
    test('it zero pads the day and month', () => {
      expect(buildUpdateCustomerDobVariables(5, 4, 1990, '1234567890')).toEqual({
        input: {
          dateOfBirth: '1990-04-05',
          crn: '1234567890'
        }
      })
    })
  })

  describe('when the year is fewer than four digits', () => {
    test('it zero pads the year', () => {
      expect(buildUpdateCustomerDobVariables(5, 4, 990, '1234567890')).toEqual({
        input: {
          dateOfBirth: '0990-04-05',
          crn: '1234567890'
        }
      })
    })
  })
})
