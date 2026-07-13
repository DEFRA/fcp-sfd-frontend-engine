// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { businessNameSchema } from '../../../../src/schemas/business/business-name-schema.js'

describe('businessNameSchema', () => {
  describe('when a valid business name is provided', () => {
    test('it should pass validation', () => {
      const { error } = businessNameSchema.validate({ businessName: 'Acme Farms Ltd' })

      expect(error).toBeUndefined()
    })
  })

  describe('when the business name is empty', () => {
    test('it should fail with "Enter business name"', () => {
      const { error } = businessNameSchema.validate({ businessName: '' })

      expect(error.details[0].message).toBe('Enter business name')
    })
  })

  describe('when the business name is missing', () => {
    test('it should fail with "Enter business name"', () => {
      const { error } = businessNameSchema.validate({})

      expect(error.details[0].message).toBe('Enter business name')
    })
  })

  describe('when the business name exceeds 160 characters', () => {
    test('it should fail with the max-length message', () => {
      const { error } = businessNameSchema.validate({ businessName: 'A'.repeat(161) })

      expect(error.details[0].message).toBe('Business name must be 160 characters or less')
    })
  })

  describe('when the business name is exactly 160 characters', () => {
    test('it should pass validation', () => {
      const { error } = businessNameSchema.validate({ businessName: 'A'.repeat(160) })

      expect(error).toBeUndefined()
    })
  })

  describe('when the business name has leading and trailing whitespace', () => {
    test('it trims the whitespace and confirms the data is valid', () => {
      const { error, value } = businessNameSchema.validate({ businessName: '  Acme Farms Ltd  ' })

      expect(error).toBeUndefined()
      expect(value.businessName).toBe('Acme Farms Ltd')
    })
  })

  describe('when the business name contains control characters', () => {
    test('it should fail with the pattern message', () => {
      const { error } = businessNameSchema.validate({ businessName: 'Acme\x07Farms' })

      expect(error.details[0].message).toBe('Business name must not contain invalid characters')
    })
  })
})
