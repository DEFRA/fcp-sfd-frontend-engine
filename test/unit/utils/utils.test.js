// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { utils } from '../../../src/utils/utils.js'

// Test helpers
import { formatValidationErrors } from '../../../src/utils/format-validation-errors.js'
import { formatFullName } from '../../../src/utils/format-full-name.js'
import { buildUpdateBusinessEmailVariables } from '../../../src/utils/build-update-business-email-variables.js'

describe('utils exports', () => {
  test('exports formatValidationErrors', () => {
    expect(utils.formatValidationErrors).toBe(formatValidationErrors)
  })

  test('exports formatFullName', () => {
    expect(utils.formatFullName).toBe(formatFullName)
  })

  test('exports buildUpdateBusinessEmailVariables', () => {
    expect(utils.buildUpdateBusinessEmailVariables).toBe(buildUpdateBusinessEmailVariables)
  })
})
