// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { buildCustomerFixUpdateVariablesService } from '../../../../src/services/personal/build-customer-fix-update-variables-service.js'

describe('buildCustomerFixUpdateVariablesService', () => {
  let personalDetails

  beforeEach(() => {
    personalDetails = basePersonalDetails()
    personalDetails.orderedSectionsToFix = []
  })

  describe('when no sections need updating', () => {
    test('returns object with only crn', () => {
      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result).toEqual({ input: { crn: '123456789' } })
    })
  })

  describe('when multiple sections are partially missing', () => {
    beforeEach(() => {
      personalDetails.orderedSectionsToFix = ['name', 'email', 'phone', 'dob', 'address']
      personalDetails.changePersonalName = { first: 'Alice', last: 'Jones' }
      personalDetails.changePersonalEmail = { personalEmail: 'newEmail@example.com' }
      personalDetails.changePersonalPhoneNumbers = { personalTelephone: null, personalMobile: '07123456789' }
      personalDetails.changePersonalDob = { day: '15', month: '06', year: '1990' }
      personalDetails.changePersonalAddress = {
        address1: '10 Downing St',
        city: 'London',
        postcode: 'SW1A 2AA',
        country: 'UK'
      }
    })

    test('builds input with defaults for missing fields', () => {
      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input).toEqual({
        crn: '123456789',
        first: 'Alice',
        middle: null,
        last: 'Jones',
        email: { address: 'newEmail@example.com' },
        phone: { landline: null, mobile: '07123456789' },
        dateOfBirth: '1990-06-15',
        address: {
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
      })
    })
  })

  describe('when there are changes to name', () => {
    beforeEach(() => {
      personalDetails.orderedSectionsToFix = ['name']
      personalDetails.changePersonalName = { first: 'Janet', middle: null, last: 'Smith' }
    })

    test('builds name input', () => {
      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input).toEqual({
        crn: '123456789',
        first: 'Janet',
        middle: null,
        last: 'Smith'
      })
    })
  })

  describe('when there are changes to email', () => {
    beforeEach(() => {
      personalDetails.orderedSectionsToFix = ['email']
      personalDetails.changePersonalEmail = { personalEmail: 'new.email@example.com' }
    })

    test('builds email input', () => {
      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input).toEqual({
        crn: '123456789',
        email: { address: 'new.email@example.com' }
      })
    })
  })

  describe('when there are changes to phone', () => {
    beforeEach(() => {
      personalDetails.orderedSectionsToFix = ['phone']
      personalDetails.changePersonalPhoneNumbers = {
        personalTelephone: '0123456789',
        personalMobile: '07999999999'
      }
    })

    test('builds phone input', () => {
      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input).toEqual({
        crn: '123456789',
        phone: { landline: '0123456789', mobile: '07999999999' }
      })
    })
  })

  describe('when there are changes to date of birth', () => {
    beforeEach(() => {
      personalDetails.orderedSectionsToFix = ['dob']
      personalDetails.changePersonalDob = { day: '01', month: '12', year: '1985' }
    })

    test('builds dob input', () => {
      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input).toEqual({
        crn: '123456789',
        dateOfBirth: '1985-12-01'
      })
    })

    test('pads single digit day and month with a leading zero', () => {
      personalDetails.changePersonalDob = { day: '1', month: '2', year: '1985' }

      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input.dateOfBirth).toBe('1985-02-01')
    })
  })

  describe('when there are changes to address', () => {
    beforeEach(() => {
      personalDetails.orderedSectionsToFix = ['address']
      personalDetails.changePersonalAddress = {
        address1: '1 New Road',
        address2: 'Flat 2',
        city: 'Bristol',
        county: 'Avon',
        postcode: 'BS1 1AA',
        country: 'UK'
      }
    })

    test('builds address input', () => {
      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input).toEqual({
        crn: '123456789',
        address: {
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
      })
    })

    test('defaults missing optional fields to null', () => {
      personalDetails.changePersonalAddress = {
        address1: '1 New Road',
        city: 'Bristol',
        postcode: 'BS1 1AA',
        country: 'UK'
      }

      const result = buildCustomerFixUpdateVariablesService(personalDetails)

      expect(result.input.address).toEqual({
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
        line2: null,
        line3: null,
        line4: null,
        line5: null,
        city: 'Bristol',
        postalCode: 'BS1 1AA',
        country: 'UK'
      })
    })
  })
})

const basePersonalDetails = () => {
  return {
    crn: '123456789',
    orderedSectionsToFix: []
  }
}
