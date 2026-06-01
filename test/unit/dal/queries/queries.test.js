// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { queries } from '../../../../src/dal/queries/queries.js'

// Test helpers
import { businessDetailsBySbi } from '../../../../src/dal/queries/business-details-by-sbi.js'

describe('queries exports', () => {
  test('exports businessDetailsBySbi', () => {
    expect(queries.businessDetailsBySbi).toBe(businessDetailsBySbi)
  })
})
