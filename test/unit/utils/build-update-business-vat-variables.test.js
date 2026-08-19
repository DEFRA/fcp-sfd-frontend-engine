// Test framework
import { describe, test, expect } from 'vitest'

// Things under test
import { buildUpdateBusinessVatVariables } from '../../../src/utils/build-update-business-vat-variables.js'

describe('buildUpdateBusinessVatVariables', () => [
  test('it builds the mutation variables in the expected shape', () => {
    expect(buildUpdateBusinessVatVariables('123456789', '123456789')).toEqual({
      input: {
        vat: '123456789',
        sbi: '123456789'
      }
    })
  })
])
