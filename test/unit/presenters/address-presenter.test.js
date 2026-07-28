// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import {
  addressChangeLink,
  addressBackLink,
  formatDisplayAddress,
  formatOriginalAddress,
  formatChangedAddress,
  formatDisplayAddresses
} from '../../../src/presenters/address-presenter.js'

describe('addressPresenter', () => {
  describe('#addressChangeLink', () => {
    describe('when context is business', () => {
      describe('and postcodeLookup is true', () => {
        test('it should return the business address change route', () => {
          const result = addressChangeLink(true, 'business')

          expect(result).toEqual('/business-address-change')
        })
      })

      describe('and postcodeLookup is false', () => {
        test('it should return the business manual address entry route', () => {
          const result = addressChangeLink(false, 'business')

          expect(result).toEqual('/business-address-enter')
        })
      })
    })

    describe('when context is personal', () => {
      describe('and postcodeLookup is true', () => {
        test('it should return the personal address change route', () => {
          const result = addressChangeLink(true, 'personal')

          expect(result).toEqual('/account-address-change')
        })
      })

      describe('and postcodeLookup is false', () => {
        test('it should return the personal manual address entry route', () => {
          const result = addressChangeLink(false, 'personal')

          expect(result).toEqual('/account-address-enter')
        })
      })
    })
  })

  describe('#addressBackLink', () => {
    describe('when context is business', () => {
      describe('and postcodeLookup is true', () => {
        test('it should return an object pointing to the business address selection page', () => {
          const result = addressBackLink(true, 'business')

          expect(result).toEqual({ href: '/business-address-select' })
        })
      })

      describe('and postcodeLookup is false', () => {
        test('it should return an object pointing to the business manual address entry page', () => {
          const result = addressBackLink(false, 'business')

          expect(result).toEqual({ href: '/business-address-enter' })
        })
      })
    })

    describe('when context is personal', () => {
      describe('and postcodeLookup is true', () => {
        test('it should return an object pointing to the personal address selection page', () => {
          const result = addressBackLink(true, 'personal')

          expect(result).toEqual({ href: '/account-address-select' })
        })
      })

      describe('and postcodeLookup is false', () => {
        test('it should return an object pointing to the personal manual address entry page', () => {
          const result = addressBackLink(false, 'personal')

          expect(result).toEqual({ href: '/account-address-enter' })
        })
      })
    })
  })

  describe('#formatDisplayAddress', () => {
    let address

    beforeEach(() => {
      address = {
        lookup: {
          pafOrganisationName: 'THE COACH HOUSE',
          flatName: 'FLAT 1',
          buildingNumberRange: '7',
          buildingName: 'STOCKWELL HALL',
          street: 'HAREWOOD AVENUE',
          doubleDependentLocality: null,
          dependentLocality: null,
          county: 'Dorset',
          uprn: '12345'
        },
        manual: {
          line1: '76 Robinswood Road',
          line2: 'UPPER CHUTE',
          line3: 'Child Okeford',
          line4: null,
          line5: null
        },
        city: 'DARLINGTON',
        postcode: 'CO9 3LS',
        country: 'United Kingdom'
      }
    })

    describe('when the address is a lookup address', () => {
      test('it should combine building number range and street and include all lookup fields in order', () => {
        const result = formatDisplayAddress(address)

        expect(result).toStrictEqual([
          'THE COACH HOUSE',
          'FLAT 1',
          'STOCKWELL HALL',
          '7 HAREWOOD AVENUE',
          'DARLINGTON',
          'Dorset',
          'CO9 3LS',
          'United Kingdom'
        ])
      })

      test('it should leave street unchanged if building number range is missing', () => {
        address.lookup.buildingNumberRange = null
        const result = formatDisplayAddress(address)

        expect(result).toStrictEqual([
          'THE COACH HOUSE',
          'FLAT 1',
          'STOCKWELL HALL',
          'HAREWOOD AVENUE',
          'DARLINGTON',
          'Dorset',
          'CO9 3LS',
          'United Kingdom'
        ])
      })
    })

    describe('when the address is a manual address', () => {
      test('it should use manual lines in order, filtering out nulls, and append city, postcode, country', () => {
        address.lookup.uprn = null
        const result = formatDisplayAddress(address)

        expect(result).toStrictEqual([
          '76 Robinswood Road',
          'UPPER CHUTE',
          'Child Okeford',
          'DARLINGTON',
          'CO9 3LS',
          'United Kingdom'
        ])
      })

      test('it should handle optional line4 and line5 correctly', () => {
        address.lookup.uprn = null
        address.manual.line4 = 'Optional County'
        address.manual.line5 = null

        const result = formatDisplayAddress(address)

        expect(result).toStrictEqual([
          '76 Robinswood Road',
          'UPPER CHUTE',
          'Child Okeford',
          'DARLINGTON',
          'Optional County',
          'CO9 3LS',
          'United Kingdom'
        ])
      })
    })
  })

  describe('#formatOriginalAddress', () => {
    let originalAddress

    beforeEach(() => {
      originalAddress = {
        lookup: {},
        manual: {
          line1: '10 Skirbeck Way',
          line2: 'Lonely Lane',
          line3: 'Child Okeford',
          line4: 'Somerset',
          line5: null
        },
        city: 'Maidstone',
        postcode: 'SK22 1DL',
        country: 'United Kingdom'
      }
    })

    describe('when the original address has a UPRN (lookup address)', () => {
      beforeEach(() => {
        originalAddress.lookup = {
          uprn: '123456',
          flatName: 'Flat 1A',
          buildingName: 'Rosewood Court',
          buildingNumberRange: '120-124',
          street: 'High Street',
          doubleDependentLocality: null,
          dependentLocality: null,
          county: 'Somerset'
        }
      })

      test('it should format the lookup address correctly', () => {
        const result = formatOriginalAddress(originalAddress)

        expect(result).toEqual({
          address1: 'Flat 1A, Rosewood Court',
          address2: '120-124 High Street',
          address3: null,
          city: 'Maidstone',
          county: 'Somerset',
          country: 'United Kingdom',
          postcode: 'SK22 1DL'
        })
      })

      test('it should handle missing lookup fields gracefully', () => {
        originalAddress.lookup = { uprn: '123456' }
        const result = formatOriginalAddress(originalAddress)

        expect(result).toEqual({
          address1: null,
          address2: null,
          address3: null,
          city: 'Maidstone',
          county: null,
          country: 'United Kingdom',
          postcode: 'SK22 1DL'
        })
      })
    })

    describe('when the original address has no UPRN (manual address)', () => {
      beforeEach(() => {
        originalAddress.lookup.uprn = null
      })

      test('it should format the manual address correctly', () => {
        const result = formatOriginalAddress(originalAddress)

        expect(result).toEqual({
          address1: '10 Skirbeck Way',
          address2: 'Lonely Lane',
          address3: 'Child Okeford',
          city: 'Maidstone',
          county: 'Somerset',
          country: 'United Kingdom',
          postcode: 'SK22 1DL'
        })
      })

      test('it should handle missing manual lines gracefully', () => {
        originalAddress.manual = {}
        originalAddress.city = null
        const result = formatOriginalAddress(originalAddress)

        expect(result).toEqual({
          address1: null,
          address2: null,
          address3: null,
          city: null,
          county: null,
          country: 'United Kingdom',
          postcode: 'SK22 1DL'
        })
      })
    })
  })

  describe('#formatChangedAddress', () => {
    let changeBusinessAddress

    describe('when the changed address has a UPRN (lookup address)', () => {
      beforeEach(() => {
        changeBusinessAddress = {
          uprn: '123456',
          pafOrganisationName: 'Testing ltd',
          flatName: 'Flat 1A',
          buildingName: 'Rosewood Court',
          buildingNumberRange: '120-124',
          street: 'High Street',
          doubleDependentLocality: null,
          dependentLocality: null,
          city: 'Bristol',
          county: 'Somerset',
          postcode: 'BS1 2AB',
          country: 'United Kingdom'
        }
      })

      test('it should format the lookup address correctly', () => {
        const result = formatChangedAddress(changeBusinessAddress)

        expect(result).toEqual({
          address1: 'Testing ltd, Flat 1A, Rosewood Court',
          address2: '120-124 High Street',
          address3: null,
          city: 'Bristol',
          county: 'Somerset',
          country: 'United Kingdom',
          postcode: 'BS1 2AB'
        })
      })

      test('it should handle missing fields gracefully', () => {
        changeBusinessAddress = { uprn: '123456' }
        const result = formatChangedAddress(changeBusinessAddress)

        expect(result).toEqual({
          address1: null,
          address2: null,
          address3: null,
          city: null,
          county: null,
          country: null,
          postcode: null
        })
      })
    })

    describe('when the changed address has no UPRN (manual address)', () => {
      beforeEach(() => {
        changeBusinessAddress = {
          address1: 'A manual address',
          city: 'Bath',
          county: 'Somerset',
          postcode: 'BA1 1AA',
          country: 'United Kingdom'
        }
      })

      test('it should return the address as-is', () => {
        const result = formatChangedAddress(changeBusinessAddress)

        expect(result).toEqual(changeBusinessAddress)
      })
    })
  })

  describe('#formatDisplayAddresses', () => {
    let addresses
    let previouslyPickedAddress

    beforeEach(() => {
      addresses = [
        { uprn: '111', displayAddress: '1 Main Street, London, SW1A 1AA' },
        { uprn: '222', displayAddress: '2 High Road, Bristol, BS1 4ST' }
      ]
      previouslyPickedAddress = null
    })

    test('it should return formatted addresses with correct values and text', () => {
      const result = formatDisplayAddresses(addresses, previouslyPickedAddress)

      expect(result).toHaveLength(3)
      expect(result[1]).toEqual({
        value: '1111 Main Street, London, SW1A 1AA',
        text: '1 Main Street, London, SW1A 1AA',
        selected: false
      })
      expect(result[2]).toEqual({
        value: '2222 High Road, Bristol, BS1 4ST',
        text: '2 High Road, Bristol, BS1 4ST',
        selected: false
      })
    })

    test('it should prepend a summary row showing the correct number of addresses', () => {
      const result = formatDisplayAddresses(addresses, previouslyPickedAddress)

      expect(result[0]).toEqual({
        value: 'display',
        text: '2 addresses found',
        selected: true
      })
    })

    test('it should show "1 address found" if only one address exists', () => {
      const result = formatDisplayAddresses([addresses[0]], previouslyPickedAddress)

      expect(result[0]).toEqual({
        value: 'display',
        text: '1 address found',
        selected: true
      })
    })

    test('it should mark the previously picked address as selected', () => {
      previouslyPickedAddress = { uprn: '222', displayAddress: '2 High Road, Bristol, BS1 4ST' }

      const result = formatDisplayAddresses(addresses, previouslyPickedAddress)

      expect(result[2].selected).toEqual(true)
      expect(result[0].selected).toBe(false)
    })

    test('it should leave summary row selected if no address matches the previously picked address', () => {
      previouslyPickedAddress = { uprn: '999', displayAddress: 'Nonexistent Address' }

      const result = formatDisplayAddresses(addresses, previouslyPickedAddress)

      expect(result[0].selected).toBe(true)
      expect(result[1].selected).toBe(false)
      expect(result[2].selected).toBe(false)
    })
  })
})
