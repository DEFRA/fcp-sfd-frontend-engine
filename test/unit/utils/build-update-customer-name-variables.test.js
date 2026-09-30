// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateCustomerNameVariables } from '../../../src/utils/build-update-customer-name-variables.js'

describe('buildUpdateCustomerNameVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateCustomerNameVariables('John', 'Doe', 'Anthony', '1234567890')).toEqual({
      input: {
        first: 'John',
        last: 'Doe',
        middle: 'Anthony',
        crn: '1234567890'
      }
    })
  })

  describe('when a middle name is not provided', () => {
    test('it defaults to null when middle is undefined', () => {
      expect(buildUpdateCustomerNameVariables('John', 'Doe', undefined, '1234567890')).toEqual({
        input: {
          first: 'John',
          last: 'Doe',
          middle: null,
          crn: '1234567890'
        }
      })
    })

    test('it defaults to null when middle is null', () => {
      expect(buildUpdateCustomerNameVariables('John', 'Doe', null, '1234567890')).toEqual({
        input: {
          first: 'John',
          last: 'Doe',
          middle: null,
          crn: '1234567890'
        }
      })
    })
  })
})
