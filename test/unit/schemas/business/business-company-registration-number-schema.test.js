// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { businessCompanyRegistrationNumberSchema } from '../../../../src/schemas/business/business-company-registration-number-schema.js'

describe('business company registration number schema', () => {
  let payload
  let schema

  beforeEach(() => {
    schema = businessCompanyRegistrationNumberSchema

    payload = {
      companyRegistrationNumber: '12345678'
    }
  })

  describe('when valid data is provided', () => {
    test('it confirms the data is valid for an 8 digit number', () => {
      const { error, value } = schema.validate(payload, { abortEarly: false })

      expect(error).toBeUndefined()
      expect(value).toEqual(payload)
    })

    test('it confirms the data is valid for 2 letters followed by 6 digits', () => {
      payload.companyRegistrationNumber = 'AB123456'

      const { error } = schema.validate(payload, { abortEarly: false })

      expect(error).toBeUndefined()
    })
  })

  describe('when invalid data is provided', () => {
    describe('because "companyRegistrationNumber" is missing', () => {
      beforeEach(() => {
        delete payload.companyRegistrationNumber
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Enter the company registration number')
      })
    })

    describe('because "companyRegistrationNumber" is an empty string', () => {
      beforeEach(() => {
        payload.companyRegistrationNumber = ''
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Enter the company registration number')
      })
    })

    describe('because "companyRegistrationNumber" does not match the expected format', () => {
      beforeEach(() => {
        payload.companyRegistrationNumber = 'ABC12345'
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Company registration number must be 8 numbers, or 2 letters followed by 6 numbers')
      })
    })
  })
})
