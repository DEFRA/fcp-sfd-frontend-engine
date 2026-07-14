// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { businessVatRemoveSchema } from '../../../../src/schemas/business/business-vat-remove-schema.js'

describe('business VAT remove schema', () => {
  let payload
  let schema

  beforeEach(() => {
    schema = businessVatRemoveSchema

    payload = {
      confirmRemove: 'yes'
    }
  })

  describe('when valid data is provided', () => {
    test('it confirms the data is valid when confirmRemove is "yes"', () => {
      const { error, value } = schema.validate(payload, { abortEarly: false })

      expect(error).toBeUndefined()
      expect(value).toEqual(payload)
    })

    test('it confirms the data is valid when confirmRemove is "no"', () => {
      payload.confirmRemove = 'no'
      const { error, value } = schema.validate(payload, { abortEarly: false })

      expect(error).toBeUndefined()
      expect(value).toEqual(payload)
    })
  })

  describe('when invalid data is provided', () => {
    describe('because "confirmRemove" is missing', () => {
      beforeEach(() => {
        delete payload.confirmRemove
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(expect.objectContaining({
          message: 'Select yes if you want to remove your VAT registration number',
          path: ['confirmRemove'],
          type: 'any.required'
        }))
        expect(value).toEqual(payload)
      })
    })

    describe('because "confirmRemove" is an invalid value', () => {
      beforeEach(() => {
        payload.confirmRemove = 'maybe'
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(expect.objectContaining({
          message: 'Select yes if you want to remove your VAT registration number',
          path: ['confirmRemove'],
          type: 'any.only'
        }))
        expect(value).toEqual(payload)
      })
    })
  })
})
