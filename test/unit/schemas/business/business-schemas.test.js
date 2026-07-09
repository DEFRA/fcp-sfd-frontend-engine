// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { businessSchemas } from '../../../../src/schemas/business/business-schemas.js'

// Test helpers
import { businessSbiSchema } from '../../../../src/schemas/business/business-sbi-schema.js'
import { businessNameSchema } from '../../../../src/schemas/business/business-name-schema.js'
import { businessEmailSchema } from '../../../../src/schemas/business/business-email-schema.js'
import { businessPhoneSchema } from '../../../../src/schemas/business/business-phone-schema.js'
import { businessVatSchema } from '../../../../src/schemas/business/business-vat-schema.js'

describe('businessSchemas exports', () => {
  test('exports the SBI schema', () => {
    expect(businessSchemas.sbi).toBe(businessSbiSchema)
  })

  test('exports the name schema', () => {
    expect(businessSchemas.name).toBe(businessNameSchema)
  })

  test('exports the email schema', () => {
    expect(businessSchemas.email).toBe(businessEmailSchema)
  })

  test('exports the phone schema', () => {
    expect(businessSchemas.phone).toBe(businessPhoneSchema)
  })

  test('exports the vat schema', () => {
    expect(businessSchemas.vat).toBe(businessVatSchema)
  })

  test('exports the address schema', () => {
    expect(businessSchemas.address).toBeDefined()
  })
})
