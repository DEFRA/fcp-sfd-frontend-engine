// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateCustomerEmailVariables } from '../../../src/utils/build-update-customer-email-variables.js'

describe('buildUpdateCustomerEmailVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateCustomerEmailVariables('name@test.com', '1234567890')).toEqual({
      input: {
        email: { address: 'name@test.com' },
        crn: '1234567890'
      }
    })
  })
})
