// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateBusinessLegalStatusVariables } from '../../../src/utils/build-update-business-legal-status-variables.js'

describe('buildUpdateBusinessLegalStatusVariables', () => {
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateBusinessLegalStatusVariables(102111, '123456789')).toEqual({
      input: {
        sbi: '123456789',
        legalStatusCode: 102111
      }
    })
  })

  describe('when the legal status code is a string', () => {
    test('it converts the legal status code to a number', () => {
      expect(buildUpdateBusinessLegalStatusVariables('102111', '123456789')).toEqual({
        input: {
          sbi: '123456789',
          legalStatusCode: 102111
        }
      })
    })
  })
})
