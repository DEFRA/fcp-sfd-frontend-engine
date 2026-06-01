// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { utils } from '../../../src/utils/utils.js'

// Test helpers
import { formatValidationErrors } from '../../../src/utils/format-validation-errors'

describe('utils exports', () => {
  test('exports formatValidationErrors', () => {
    expect(utils.formatValidationErrors).toBe(formatValidationErrors)
  })
})
