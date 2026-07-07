// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { businessEmailSchema } from '../../../../src/schemas/business/business-email-schema.js'

describe('businessEmailSchema', () => {
  describe('when a valid email is provided', () => {
    test('it should pass validation', () => {
      const { error } = businessEmailSchema.validate({ businessEmail: 'farm@example.com' })

      expect(error).toBeUndefined()
    })
  })

  describe('when the email is empty', () => {
    test('it should fail with "Enter business email address"', () => {
      const { error } = businessEmailSchema.validate({ businessEmail: '' })

      expect(error.details[0].message).toBe('Enter business email address')
    })
  })

  describe('when the email is not a valid format', () => {
    test('it should fail with the email format message', () => {
      const { error } = businessEmailSchema.validate({ businessEmail: 'not-an-email' })

      expect(error.details[0].message).toBe('Enter an email address, like name@example.com')
    })
  })

  describe('when the email exceeds 254 characters', () => {
    test('it should fail with the max-length message', () => {
      const local = 'a'.repeat(244)
      const { error } = businessEmailSchema.validate({ businessEmail: `${local}@example.com` })

      expect(error.details[0].message).toBe('Business email address must be 254 characters or less')
    })
  })
})
