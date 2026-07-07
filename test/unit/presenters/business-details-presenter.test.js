// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Things under test
import {
  getActionText,
  formatCph,
  formatCphText,
  formatBusinessAddress
} from '../../../src/presenters/business-details-presenter.js'

describe('businessDetailsPresenter helpers', () => {
  describe('#getActionText', () => {
    describe('when the value is truthy', () => {
      test('it should return "Change"', () => {
        expect(getActionText('Acme Farms')).toBe('Change')
        expect(getActionText(true)).toBe('Change')
      })
    })

    describe('when the value is falsy', () => {
      test('it should return "Add"', () => {
        expect(getActionText(null)).toBe('Add')
        expect(getActionText('')).toBe('Add')
        expect(getActionText(undefined)).toBe('Add')
        expect(getActionText(false)).toBe('Add')
      })
    })
  })

  describe('#formatCph', () => {
    describe('when CPH holdings are provided', () => {
      test('it should return an array of CPH number strings', () => {
        const result = formatCph([
          { cphNumber: '12/123/1234' },
          { cphNumber: '56/789/0123' }
        ])

        expect(result).toEqual(['12/123/1234', '56/789/0123'])
      })
    })

    describe('when some holdings have a null cphNumber', () => {
      test('it should filter them out', () => {
        const result = formatCph([
          { cphNumber: '12/123/1234' },
          { cphNumber: null },
          null
        ])

        expect(result).toEqual(['12/123/1234'])
      })
    })

    describe('when the array is empty', () => {
      test('it should return an empty array', () => {
        expect(formatCph([])).toEqual([])
      })
    })

    describe('when the value is null or undefined', () => {
      test('it should return an empty array', () => {
        expect(formatCph(null)).toEqual([])
        expect(formatCph(undefined)).toEqual([])
      })
    })
  })

  describe('#formatCphText', () => {
    describe('when the count is 1', () => {
      test('it should return the singular form', () => {
        expect(formatCphText(1)).toBe('County Parish Holding (CPH) number')
      })
    })

    describe('when the count is greater than 1', () => {
      test('it should return the plural form', () => {
        expect(formatCphText(2)).toBe('County Parish Holding (CPH) numbers')
        expect(formatCphText(10)).toBe('County Parish Holding (CPH) numbers')
      })
    })

    describe('when the count is 0', () => {
      test('it should return the plural form', () => {
        expect(formatCphText(0)).toBe('County Parish Holding (CPH) numbers')
      })
    })
  })

  describe('#formatBusinessAddress', () => {
    let address

    beforeEach(() => {
      address = {
        lookup: {
          uprn: '123456',
          buildingNumberRange: '7',
          street: 'Test Street',
          pafOrganisationName: null,
          flatName: null,
          buildingName: null,
          doubleDependentLocality: null,
          dependentLocality: null,
          county: 'Surrey'
        },
        manual: {},
        city: 'London',
        postcode: 'SW1A 1AA',
        country: 'United Kingdom'
      }
    })

    describe('when the address has a UPRN (lookup address)', () => {
      test('it should return an array of address lines', () => {
        const result = formatBusinessAddress(address)

        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBeGreaterThan(0)
        expect(result).toContain('7 Test Street')
      })
    })

    describe('when the address has a manual first line', () => {
      test('it should return an array of address lines', () => {
        address.lookup.uprn = null
        address.manual = { line1: '10 Farm Road', line2: null, line3: null, line4: null, line5: null }

        const result = formatBusinessAddress(address)

        expect(Array.isArray(result)).toBe(true)
        expect(result).toContain('10 Farm Road')
      })
    })

    describe('when the address has no UPRN and no manual first line', () => {
      test('it should return an empty array', () => {
        address.lookup.uprn = null
        address.manual = {}

        const result = formatBusinessAddress(address)

        expect(result).toEqual([])
      })
    })

    describe('when the address is null or undefined', () => {
      test('it should return an empty array', () => {
        expect(formatBusinessAddress(null)).toEqual([])
        expect(formatBusinessAddress(undefined)).toEqual([])
      })
    })
  })
})
