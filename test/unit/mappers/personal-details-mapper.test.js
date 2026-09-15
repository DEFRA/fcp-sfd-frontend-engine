// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Test helpers
import { getDalData, getMappedData } from '../../mocks/mock-personal-details.js'

// Thing under test
const { mapPersonalDetails } = await import('../../../src/mappers/personal-details-mapper.js')

// Helper to test synchronous error throwing
function expectToThrow (fn) {
  try {
    fn()
    throw new Error('Expected function to throw but it did not')
  } catch (err) {
    return err
  }
}

describe('personalDetailsMapper', () => {
  let dalData

  beforeEach(() => {
    dalData = getDalData()
  })

  describe('when given null or undefined input', () => {
    test('it should throw when value is null', () => {
      const error = expectToThrow(() => mapPersonalDetails(null))

      expect(error.message).toEqual('Personal details value cannot be null or undefined')
    })

    test('it should throw when value is undefined', () => {
      const error = expectToThrow(() => mapPersonalDetails(undefined))

      expect(error.message).toEqual('Personal details value cannot be null or undefined')
    })

    test('it should throw when customer object is missing', () => {
      const error = expectToThrow(() => mapPersonalDetails({}))

      expect(error.message).toEqual('Personal details value must contain a customer object')
    })

    test('it should throw when customer info is missing', () => {
      const error = expectToThrow(() => mapPersonalDetails({ customer: {} }))

      expect(error.message).toEqual('Customer must contain an info object')
    })
  })

  describe('when given valid raw DAL data', () => {
    describe('full mapping', () => {
      test('it should map the values to the correct format', () => {
        const result = mapPersonalDetails(dalData)

        expect(result).toEqual(getMappedData())
      })
    })

    describe('fullNameJoined', () => {
      test('it should filter out null or undefined middle names', () => {
        dalData.customer.info.name.middle = null
        const result = mapPersonalDetails(dalData)

        expect(result.fullNameJoined).toEqual('John Doe')
      })
    })

    describe('dateOfBirth', () => {
      test('it should return null for each part when date of birth does not exist', () => {
        dalData.customer.info.dateOfBirth = null
        const result = mapPersonalDetails(dalData)

        expect(result.dateOfBirth).toEqual({
          full: null,
          day: null,
          month: null,
          year: null
        })
      })
    })

    describe('handling missing nested objects', () => {
      test('it should handle missing name object gracefully', () => {
        dalData.customer.info.name = null
        const result = mapPersonalDetails(dalData)

        expect(result.userName).toBeNull()
        expect(result.fullName).toEqual({
          first: null,
          last: null,
          middle: null
        })
        expect(result.fullNameJoined).toEqual('')
      })

      test('it should handle missing address object gracefully', () => {
        dalData.customer.info.address = null
        expect(() => mapPersonalDetails(dalData)).not.toThrow()
      })

      test('it should handle missing email object gracefully', () => {
        dalData.customer.info.email = null
        const result = mapPersonalDetails(dalData)

        expect(result.email).toBeNull()
      })

      test('it should handle missing phone object gracefully', () => {
        dalData.customer.info.phone = null
        const result = mapPersonalDetails(dalData)

        expect(result.telephone).toBeNull()
        expect(result.mobile).toBeNull()
      })
    })

    describe('telephone', () => {
      test('it should map telephone as null when not provided', () => {
        dalData.customer.info.phone.landline = null
        const result = mapPersonalDetails(dalData)

        expect(result.telephone).toBeNull()
      })
    })

    describe('mobile', () => {
      test('it should map the mobile when provided', () => {
        dalData.customer.info.phone.mobile = '07700900123'
        const result = mapPersonalDetails(dalData)

        expect(result.mobile).toEqual('07700900123')
      })
    })
  })
})
