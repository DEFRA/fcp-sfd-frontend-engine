// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { buildUpdatePersonalDobVariables } from '../../../src/utils/build-update-personal-dob-variables.js'

describe('buildUpdatePersonalDobVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdatePersonalDobVariables({ day: '5', month: '4', year: '1990' }, '1234567890')).toEqual({
      input: {
        dateOfBirth: '1990-04-05',
        crn: '1234567890'
      }
    })
  })
})
