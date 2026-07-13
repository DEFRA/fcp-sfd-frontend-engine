// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { businessVatSchema } from '../../../../src/schemas/business/business-vat-schema.js'

describe('businessVatSchema', () => {
  describe('when a valid 9-digit VAT number is provided', () => {
    test('it should pass validation', () => {
      const { error } = businessVatSchema.validate({ vatNumber: '123456789' })

      expect(error).toBeUndefined()
    })
  })

  describe('when the VAT number is an empty string', () => {
    test('it should pass validation (field is optional)', () => {
      const { error } = businessVatSchema.validate({ vatNumber: '' })

      expect(error).toBeUndefined()
    })
  })

  describe('when the VAT number is omitted', () => {
    test('it should pass validation (field is optional)', () => {
      const { error } = businessVatSchema.validate({})

      expect(error).toBeUndefined()
    })
  })

  describe('when the VAT number does not match the 9-digit pattern', () => {
    test('it should fail with the pattern message', () => {
      const { error } = businessVatSchema.validate({ vatNumber: 'GB123456789' })

      expect(error.details[0].message).toBe('Enter a VAT registration number, like 123456789')
    })
  })

  describe('when the VAT number is fewer than 9 digits', () => {
    test('it should fail with the pattern message', () => {
      const { error } = businessVatSchema.validate({ vatNumber: '12345' })

      expect(error.details[0].message).toBe('Enter a VAT registration number, like 123456789')
    })
  })
})
