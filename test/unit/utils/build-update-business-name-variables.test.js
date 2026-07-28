// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { buildUpdateBusinessNameVariables } from '../../../src/utils/build-update-business-name-variables.js'

describe('buildUpdateBusinessNameVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateBusinessNameVariables('New Name Ltd', '123456789')).toEqual({
      input: {
        name: 'New Name Ltd',
        sbi: '123456789'
      }
    })
  })
})
