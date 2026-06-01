// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { schemas } from '../../../src/schemas/schemas.js'

// Test helpers
import { businessSchemas } from '../../../src/schemas/business/business-schemas.js'

describe('schemas exports', () => {
  test('exports business schemas', () => {
    expect(schemas.business).toBe(businessSchemas)
  })
})
