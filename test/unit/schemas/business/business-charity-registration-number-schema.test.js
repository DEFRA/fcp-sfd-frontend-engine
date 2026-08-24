// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { businessCharityRegistrationNumberSchema } from '../../../../src/schemas/business/business-charity-registration-number-schema.js'

describe('business charity registration number schema', () => {
  let payload
  let schema

  beforeEach(() => {
    schema = businessCharityRegistrationNumberSchema

    payload = {
      charityCommissionRegistrationNumber: '1234567'
    }
  })

  describe('when valid data is provided', () => {
    test('it confirms the data is valid for a 7 digit number', () => {
      const { error, value } = schema.validate(payload, { abortEarly: false })

      expect(error).toBeUndefined()
      expect(value).toEqual(payload)
    })

    test('it confirms the data is valid for an 8 digit number', () => {
      payload.charityCommissionRegistrationNumber = '12345678'

      const { error } = schema.validate(payload, { abortEarly: false })

      expect(error).toBeUndefined()
    })
  })

  describe('when invalid data is provided', () => {
    describe('because "charityCommissionRegistrationNumber" is missing', () => {
      beforeEach(() => {
        delete payload.charityCommissionRegistrationNumber
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Enter the charity commission registration number')
      })
    })

    describe('because "charityCommissionRegistrationNumber" is an empty string', () => {
      beforeEach(() => {
        payload.charityCommissionRegistrationNumber = ''
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Enter the charity commission registration number')
      })
    })

    describe('because "charityCommissionRegistrationNumber" is not 7 or 8 digits', () => {
      beforeEach(() => {
        payload.charityCommissionRegistrationNumber = '123456'
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Charity commission registration number must be 7 or 8 numbers')
      })
    })

    describe('because "charityCommissionRegistrationNumber" contains letters', () => {
      beforeEach(() => {
        payload.charityCommissionRegistrationNumber = 'AB12345'
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Charity commission registration number must be 7 or 8 numbers')
      })
    })

    describe('because "charityCommissionRegistrationNumber" contains invalid characters', () => {
      beforeEach(() => {
        payload.charityCommissionRegistrationNumber = '123-4567'
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Charity commission registration number must be 7 or 8 numbers')
      })
    })

    describe('because "charityCommissionRegistrationNumber" contains a control character', () => {
      beforeEach(() => {
        payload.charityCommissionRegistrationNumber = '1234567\x00'
      })

      test('it returns the expected error message', () => {
        const { error } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0].message).toBe('Charity commission registration number must only include numbers')
      })
    })
  })
})
