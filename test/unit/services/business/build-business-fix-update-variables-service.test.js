// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { buildBusinessFixUpdateVariablesService } from '../../../../src/services/business/build-business-fix-update-variables-service.js'

describe('buildBusinessFixUpdateVariablesService', () => {
  let businessDetails

  beforeEach(() => {
    businessDetails = baseBusinessDetails()
    businessDetails.orderedSectionsToFix = []
  })

  describe('when no sections need updating', () => {
    test('returns object with only sbi', () => {
      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result).toEqual({ input: { sbi: '123456789' } })
    })
  })

  describe('when multiple sections are partially missing', () => {
    beforeEach(() => {
      businessDetails.orderedSectionsToFix = ['name', 'email', 'phone', 'vat', 'address']
      businessDetails.changeBusinessName = { businessName: 'Acme Farms Ltd' }
      businessDetails.changeBusinessEmail = { businessEmail: 'new.email@example.com' }
      businessDetails.changeBusinessPhoneNumbers = { businessTelephone: null, businessMobile: '07123456789' }
      businessDetails.changeBusinessVat = { vatNumber: '123456789' }
      businessDetails.changeBusinessAddress = {
        address1: '10 Downing St',
        city: 'London',
        postcode: 'SW1A 2AA',
        country: 'UK'
      }
    })

    test('builds input with defaults for missing fields', () => {
      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result.input).toEqual({
        sbi: '123456789',
        name: 'Acme Farms Ltd',
        email: { address: 'new.email@example.com' },
        phone: { landline: null, mobile: '07123456789' },
        vat: '123456789',
        address: {
          withoutUprn: {
            pafOrganisationName: null,
            buildingNumberRange: null,
            buildingName: null,
            flatName: null,
            street: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            uprn: null,
            county: null,
            line1: '10 Downing St',
            line2: null,
            line3: null,
            line4: null,
            line5: null,
            city: 'London',
            postalCode: 'SW1A 2AA',
            country: 'UK'
          }
        }
      })
    })
  })

  describe('when there are changes to name', () => {
    beforeEach(() => {
      businessDetails.orderedSectionsToFix = ['name']
      businessDetails.changeBusinessName = { businessName: 'Hadley Farms Ltd' }
    })

    test('builds name input', () => {
      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result.input).toEqual({
        sbi: '123456789',
        name: 'Hadley Farms Ltd'
      })
    })
  })

  describe('when there are changes to email', () => {
    beforeEach(() => {
      businessDetails.orderedSectionsToFix = ['email']
      businessDetails.changeBusinessEmail = { businessEmail: 'new.email@example.com' }
    })

    test('builds email input', () => {
      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result.input).toEqual({
        sbi: '123456789',
        email: { address: 'new.email@example.com' }
      })
    })
  })

  describe('when there are changes to phone', () => {
    beforeEach(() => {
      businessDetails.orderedSectionsToFix = ['phone']
      businessDetails.changeBusinessPhoneNumbers = {
        businessTelephone: '0123456789',
        businessMobile: '07999999999'
      }
    })

    test('builds phone input', () => {
      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result.input).toEqual({
        sbi: '123456789',
        phone: { landline: '0123456789', mobile: '07999999999' }
      })
    })

    describe('and businessMobile is missing', () => {
      beforeEach(() => {
        businessDetails.changeBusinessPhoneNumbers = { businessTelephone: '0123456789' }
      })

      test('it defaults the mobile to null', () => {
        const result = buildBusinessFixUpdateVariablesService(businessDetails)

        expect(result.input.phone).toEqual({ landline: '0123456789', mobile: null })
      })
    })
  })

  describe('when there are changes to vat', () => {
    beforeEach(() => {
      businessDetails.orderedSectionsToFix = ['vat']
      businessDetails.changeBusinessVat = { vatNumber: '123456789' }
    })

    test('builds vat input', () => {
      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result.input).toEqual({
        sbi: '123456789',
        vat: '123456789'
      })
    })

    test('defaults to an empty string when vatNumber is missing', () => {
      businessDetails.changeBusinessVat = {}

      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result.input.vat).toBe('')
    })
  })

  describe('when there are changes to address', () => {
    beforeEach(() => {
      businessDetails.orderedSectionsToFix = ['address']
      businessDetails.changeBusinessAddress = {
        address1: '1 New Road',
        address2: 'Flat 2',
        city: 'Bristol',
        county: 'Avon',
        postcode: 'BS1 1AA',
        country: 'UK'
      }
    })

    test('builds address input', () => {
      const result = buildBusinessFixUpdateVariablesService(businessDetails)

      expect(result.input).toEqual({
        sbi: '123456789',
        address: {
          withoutUprn: {
            pafOrganisationName: null,
            buildingNumberRange: null,
            buildingName: null,
            flatName: null,
            street: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            uprn: null,
            county: null,
            line1: '1 New Road',
            line2: 'Flat 2',
            line3: null,
            line4: 'Avon',
            line5: null,
            city: 'Bristol',
            postalCode: 'BS1 1AA',
            country: 'UK'
          }
        }
      })
    })
  })
})

const baseBusinessDetails = () => {
  return {
    info: { sbi: '123456789' },
    orderedSectionsToFix: []
  }
}
