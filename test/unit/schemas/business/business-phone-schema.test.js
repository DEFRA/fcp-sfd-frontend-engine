// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { businessPhoneSchema } from '../../../../src/schemas/business/business-phone-schema.js'

describe('businessPhoneSchema', () => {
  describe('when a valid telephone number is provided', () => {
    test('it should pass validation', () => {
      const { error } = businessPhoneSchema.validate({ businessTelephone: '01234 567890' })

      expect(error).toBeUndefined()
    })
  })

  describe('when a valid mobile number is provided', () => {
    test('it should pass validation', () => {
      const { error } = businessPhoneSchema.validate({ businessMobile: '07700 900000' })

      expect(error).toBeUndefined()
    })
  })

  describe('when both telephone and mobile are provided', () => {
    test('it should pass validation', () => {
      const { error } = businessPhoneSchema.validate({
        businessTelephone: '01234 567890',
        businessMobile: '07700 900000'
      })

      expect(error).toBeUndefined()
    })
  })

  describe('when neither telephone nor mobile is provided', () => {
    test('it should fail with "Enter at least one phone number"', () => {
      const { error } = businessPhoneSchema.validate({}, { abortEarly: false })

      expect(error.details[0].message).toBe('Enter at least one phone number')
    })
  })

  describe('when the telephone number contains invalid characters', () => {
    test('it should fail with the pattern message', () => {
      const { error } = businessPhoneSchema.validate({ businessTelephone: 'abc12345678' })

      expect(error.details[0].message).toBe(
        'Business telephone number must only include numbers 0 to 9 and special characters such as spaces, brackets and +'
      )
    })
  })

  describe('when the telephone number is too short', () => {
    test('it should fail with the min-length message', () => {
      const { error } = businessPhoneSchema.validate({ businessTelephone: '12345678' })

      expect(error.details[0].message).toBe('Business telephone number must be 10 characters or more')
    })
  })

  describe('when the telephone number contains no digits', () => {
    test('it should fail with the pattern message', () => {
      const { error } = businessPhoneSchema.validate({ businessTelephone: '((((()))))' })

      expect(error.details[0].message).toBe(
        'Business telephone number must only include numbers 0 to 9 and special characters such as spaces, brackets and +'
      )
    })
  })

  describe('when the telephone number has leading and trailing whitespace', () => {
    test('it trims the whitespace and passes validation', () => {
      const { error, value } = businessPhoneSchema.validate({ businessTelephone: '  01234 567890  ' })

      expect(error).toBeUndefined()
      expect(value.businessTelephone).toBe('01234 567890')
    })
  })

  describe('when the telephone number contains only whitespace', () => {
    test('it is treated as empty and fails with "Enter at least one phone number"', () => {
      const { error } = businessPhoneSchema.validate({ businessTelephone: '          ' }, { abortEarly: false })

      expect(error.details[0].message).toBe('Enter at least one phone number')
    })
  })
})
