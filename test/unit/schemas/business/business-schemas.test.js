// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { businessSchemas } from '../../../../src/schemas/business/business-schemas.js'

// Test helpers
import { businessSbiSchema } from '../../../../src/schemas/business/business-sbi-schema.js'

describe('businessSchemas exports', () => {
  test('exports the SBI schema', () => {
    expect(businessSchemas.sbi).toBe(businessSbiSchema)
  })
})
