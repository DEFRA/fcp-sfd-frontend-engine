// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { buildUpdateBusinessEmailVariables } from '../../../src/utils/build-update-business-email-variables.js'

describe('buildUpdateBusinessEmailVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateBusinessEmailVariables('new@example.com', '123456789')).toEqual({
      input: {
        email: { address: 'new@example.com' },
        sbi: '123456789'
      }
    })
  })
})
