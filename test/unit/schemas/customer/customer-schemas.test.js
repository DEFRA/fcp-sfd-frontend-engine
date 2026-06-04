// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { customerSchemas } from '../../../../src/schemas/customer/customer-schemas.js'

// Test helpers
import { customerCrnSchema } from '../../../../src/schemas/customer/customer-crn-schema.js'

describe('customerSchemas exports', () => {
  test('exports the CRN schema', () => {
    expect(customerSchemas.crn).toBe(customerCrnSchema)
  })
})
