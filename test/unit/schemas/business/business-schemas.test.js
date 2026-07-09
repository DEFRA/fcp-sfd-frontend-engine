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

  describe('details', () => {
    test('exports the name schema', () => {
      expect(businessSchemas.details.name).toBe(businessNameSchema)
    })

    test('exports the email schema', () => {
      expect(businessSchemas.details.email).toBe(businessEmailSchema)
    })

    test('exports the phone schema', () => {
      expect(businessSchemas.details.phone).toBe(businessPhoneSchema)
    })

    test('exports the vat schema', () => {
      expect(businessSchemas.details.vat).toBe(businessVatSchema)
    })

    test('exports the address schema', () => {
      expect(businessSchemas.details.address).toBeDefined()
    })
  })
})
