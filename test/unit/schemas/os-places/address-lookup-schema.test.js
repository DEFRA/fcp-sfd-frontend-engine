// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { addressLookupSchema } from '../../../../src/schemas/os-places/address-lookup-schema.js'

describe('addressLookupSchema', () => {
  let payload
  let schema

  beforeEach(() => {
    schema = addressLookupSchema

    payload = {
      properties: {
        UPRN: '123456',
        ADDRESS: '10 Skirbeck Way, Lonely Lane',
        ORGANISATION_NAME: 'Acme Corp',
        DEPARTMENT_NAME: 'Sales',
        SUB_BUILDING_NAME: 'Flat 1',
        BUILDING_NAME: 'Block A',
        BUILDING_NUMBER: '10',
        DEPENDENT_THOROUGHFARE_NAME: 'Skirbeck Way',
        THOROUGHFARE_NAME: 'Lonely Lane',
        DOUBLE_DEPENDENT_LOCALITY: 'Suburbia',
        DEPENDENT_LOCALITY: 'Neighbourhood',
        POST_TOWN: 'Maidstone',
        POSTCODE: 'SK22 1DL',
        LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'Kent',
        COUNTRY_CODE: 'GB'
      }
    }
  })

  describe('when valid data is provided', () => {
    test('it confirms the data is valid', () => {
      const { error, value } = schema.validate(payload, { abortEarly: false })

      expect(error).toBeUndefined()
      expect(value).toEqual(payload)
    })
  })

  describe('when invalid data is provided', () => {
    describe('because "UPRN" is missing', () => {
      beforeEach(() => {
        delete payload.properties.UPRN
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(
          expect.objectContaining({
            message: '"properties.UPRN" is required',
            path: ['properties', 'UPRN'],
            type: 'any.required'
          })
        )
        expect(value).toEqual(payload)
      })
    })

    describe('because "ADDRESS" is missing', () => {
      beforeEach(() => {
        delete payload.properties.ADDRESS
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(
          expect.objectContaining({
            message: '"properties.ADDRESS" is required',
            path: ['properties', 'ADDRESS'],
            type: 'any.required'
          })
        )
        expect(value).toEqual(payload)
      })
    })

    describe('because "POST_TOWN" is missing', () => {
      beforeEach(() => {
        delete payload.properties.POST_TOWN
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(
          expect.objectContaining({
            message: '"properties.POST_TOWN" is required',
            path: ['properties', 'POST_TOWN'],
            type: 'any.required'
          })
        )
        expect(value).toEqual(payload)
      })
    })

    describe('because "POSTCODE" is missing', () => {
      beforeEach(() => {
        delete payload.properties.POSTCODE
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(
          expect.objectContaining({
            message: '"properties.POSTCODE" is required',
            path: ['properties', 'POSTCODE'],
            type: 'any.required'
          })
        )
        expect(value).toEqual(payload)
      })
    })

    describe('because "COUNTRY_CODE" is missing', () => {
      beforeEach(() => {
        delete payload.properties.COUNTRY_CODE
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(
          expect.objectContaining({
            message: '"properties.COUNTRY_CODE" is required',
            path: ['properties', 'COUNTRY_CODE'],
            type: 'any.required'
          })
        )
        expect(value).toEqual(payload)
      })
    })

    describe('because "properties" is missing', () => {
      beforeEach(() => {
        delete payload.properties
      })

      test('it fails validation', () => {
        const { error, value } = schema.validate(payload, { abortEarly: false })

        expect(error.details[0]).toEqual(
          expect.objectContaining({
            message: '"properties" is required',
            path: ['properties'],
            type: 'any.required'
          })
        )
        expect(value).toEqual(payload)
      })
    })
  })
})
