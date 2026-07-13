// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { mapBusinessDetails } from '../../../src/mappers/business-details-mapper.js'

describe('mapBusinessDetails', () => {
  let rawData

  beforeEach(() => {
    rawData = {
      business: {
        sbi: '106705779',
        info: {
          name: 'Acme Farms Ltd',
          vat: 'GB123456789',
          traderNumber: '123456',
          vendorNumber: '654321',
          legalStatus: { type: 'Sole Proprietorship' },
          type: { type: 'Not Specified' },
          address: {
            buildingNumberRange: '7',
            street: 'Test Street',
            city: 'London',
            postalCode: 'SW1A 1AA',
            country: 'United Kingdom',
            line1: null,
            uprn: null
          },
          email: { address: 'farm@example.com' },
          phone: { landline: '01234 567890', mobile: '07700 900000' }
        },
        countyParishHoldings: [{ cphNumber: '12/123/1234' }]
      }
    }
  })

  describe('when given valid raw DAL data', () => {
    test('it should map info fields correctly', () => {
      const result = mapBusinessDetails(rawData)

      expect(result.info.sbi).toBe('106705779')
      expect(result.info.businessName).toBe('Acme Farms Ltd')
      expect(result.info.vat).toBe('GB123456789')
      expect(result.info.traderNumber).toBe('123456')
      expect(result.info.vendorNumber).toBe('654321')
      expect(result.info.legalStatus).toBe('Sole Proprietorship')
      expect(result.info.type).toBe('Not Specified')
      expect(result.info.countyParishHoldingNumbers).toEqual([{ cphNumber: '12/123/1234' }])
    })

    test('it should map contact fields correctly', () => {
      const result = mapBusinessDetails(rawData)

      expect(result.contact.email).toBe('farm@example.com')
      expect(result.contact.landline).toBe('01234 567890')
      expect(result.contact.mobile).toBe('07700 900000')
    })

    test('it should map the address using the address mapper', () => {
      const result = mapBusinessDetails(rawData)

      expect(result.address).toBeDefined()
    })

    test('it should not include a customer property', () => {
      const result = mapBusinessDetails(rawData)

      expect(result.customer).toBeUndefined()
    })
  })

  describe('when optional DAL fields are absent', () => {
    beforeEach(() => {
      rawData.business.info.legalStatus = null
      rawData.business.info.type = null
      rawData.business.info.vat = null
      rawData.business.info.traderNumber = null
      rawData.business.info.vendorNumber = null
      rawData.business.countyParishHoldings = null
    })

    test('it should return null for nullable info fields', () => {
      const result = mapBusinessDetails(rawData)

      expect(result.info.legalStatus).toBeNull()
      expect(result.info.type).toBeNull()
      expect(result.info.vat).toBeNull()
      expect(result.info.traderNumber).toBeNull()
      expect(result.info.vendorNumber).toBeNull()
    })

    test('it should return an empty array for countyParishHoldingNumbers', () => {
      const result = mapBusinessDetails(rawData)

      expect(result.info.countyParishHoldingNumbers).toEqual([])
    })
  })

  describe('when value is null or an empty object', () => {
    test('it should not throw when value is null', () => {
      expect(() => mapBusinessDetails(null)).not.toThrow()
    })

    test('it should not throw when value is an empty object', () => {
      expect(() => mapBusinessDetails({})).not.toThrow()
    })

    test('it should return null for all nullable info fields', () => {
      const result = mapBusinessDetails(null)

      expect(result.info.businessName).toBeNull()
      expect(result.info.vat).toBeNull()
      expect(result.info.traderNumber).toBeNull()
      expect(result.info.vendorNumber).toBeNull()
      expect(result.info.legalStatus).toBeNull()
      expect(result.info.type).toBeNull()
    })

    test('it should return an empty array for countyParishHoldingNumbers', () => {
      const result = mapBusinessDetails(null)

      expect(result.info.countyParishHoldingNumbers).toEqual([])
    })

    test('it should return null for all contact fields', () => {
      const result = mapBusinessDetails(null)

      expect(result.contact.email).toBeNull()
      expect(result.contact.landline).toBeNull()
      expect(result.contact.mobile).toBeNull()
    })
  })
})
