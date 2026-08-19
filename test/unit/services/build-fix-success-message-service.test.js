// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { buildFixSuccessMessageService } from '../../../src/services/build-fix-success-message-service.js'

describe('buildFixSuccessMessageService', () => {
  describe('for personal details', () => {
    let personalDetails

    beforeEach(() => {
      personalDetails = {
        orderedSectionsToFix: []
      }
    })

    describe('when only one personal detail has changed', () => {
      test('returns a text message for name change', () => {
        personalDetails.orderedSectionsToFix = ['name']
        personalDetails.changePersonalName = { first: 'John', last: 'Doe' }
        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your full name'
        })
      })

      test('returns a text message for email change', () => {
        personalDetails.orderedSectionsToFix = ['email']
        personalDetails.changePersonalEmail = { personalEmail: 'test@email.com' }

        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your personal email address'
        })
      })

      test('returns a text message for date of birth change', () => {
        personalDetails.orderedSectionsToFix = ['dob']
        personalDetails.changePersonalDob = { day: '01', month: '01', year: '2000' }

        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your date of birth'
        })
      })

      test('returns a text message for address change', () => {
        personalDetails.orderedSectionsToFix = ['address']
        personalDetails.changePersonalAddress = { postcode: 'AB12 3CD' }

        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your personal address'
        })
      })
    })

    describe('when multiple personal details have changed', () => {
      beforeEach(() => {
        personalDetails.orderedSectionsToFix = ['email', 'address', 'phone']

        personalDetails.changePersonalEmail = { personalEmail: 'test@email.com' }
        personalDetails.changePersonalPhoneNumbers = { personalPhoneNumbers: '0123456789' }
        personalDetails.changePersonalAddress = { postcode: 'AB12 3CD' }
      })

      test('returns an html message', () => {
        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result.type).toBe('html')
      })

      test('includes the notification banner heading', () => {
        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result.value).toContain(
          '<h3 class="govuk-notification-banner__heading">'
        )
        expect(result.value).toContain('You have updated your:')
      })

      test('renders a bullet list with all changed fields in the ordered list', () => {
        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result.value).toContain('<ul class="govuk-list govuk-list--bullet">')
        expect(result.value).toContain('<li>personal email address</li>')
        expect(result.value).toContain('<li>personal phone numbers</li>')
        expect(result.value).toContain('<li>personal address</li>')
        expect(result.value).toContain('<li>personal email address</li><li>personal address</li><li>personal phone numbers</li>')
      })
    })

    describe('when no personal details have changed', () => {
      test('returns null', () => {
        const result = buildFixSuccessMessageService('personal', personalDetails)

        expect(result).toBeNull()
      })
    })
  })

  describe('for business details', () => {
    let businessDetails

    beforeEach(() => {
      businessDetails = {
        orderedSectionsToFix: []
      }
    })

    describe('when only one business detail has changed', () => {
      test('returns a text message for name change', () => {
        businessDetails.orderedSectionsToFix = ['name']
        businessDetails.changeBusinessName = { businessName: 'Test Business Ltd' }

        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your business name'
        })
      })

      test('returns a text message for email change', () => {
        businessDetails.orderedSectionsToFix = ['email']
        businessDetails.changeBusinessEmail = { businessEmail: 'info@test.com' }

        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your business email address'
        })
      })

      test('returns a text message for phone numbers change', () => {
        businessDetails.orderedSectionsToFix = ['phone']
        businessDetails.changeBusinessPhoneNumbers = {
          businessTelephone: '0123456789',
          businessMobile: '07123456789'
        }

        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your business phone numbers'
        })
      })

      test('returns a text message for VAT number change', () => {
        businessDetails.orderedSectionsToFix = ['vat']
        businessDetails.changeBusinessVat = { vatNumber: 'GB123456789' }

        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your business vat number'
        })
      })

      test('returns a text message for address change', () => {
        businessDetails.orderedSectionsToFix = ['address']
        businessDetails.changeBusinessAddress = { postcode: 'AB12 3CD' }

        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result).toEqual({
          type: 'text',
          value: 'You have updated your business address'
        })
      })
    })

    describe('when multiple business details have changed', () => {
      beforeEach(() => {
        businessDetails.orderedSectionsToFix = ['email', 'address', 'phone']

        businessDetails.changeBusinessEmail = { businessEmail: 'info@test.com' }
        businessDetails.changeBusinessPhoneNumbers = { businessTelephone: '0123456789' }
        businessDetails.changeBusinessAddress = { postcode: 'AB12 3CD' }
      })

      test('returns an html message', () => {
        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result.type).toBe('html')
      })

      test('includes the notification banner heading', () => {
        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result.value).toContain(
          '<h3 class="govuk-notification-banner__heading">'
        )
        expect(result.value).toContain('You have updated your:')
      })

      test('renders a bullet list with all changed fields in the ordered list', () => {
        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result.value).toContain('<ul class="govuk-list govuk-list--bullet">')
        expect(result.value).toContain('<li>business email address</li>')
        expect(result.value).toContain('<li>business phone numbers</li>')
        expect(result.value).toContain('<li>business address</li>')
        expect(result.value).toContain('<li>business email address</li><li>business address</li><li>business phone numbers</li>')
      })
    })

    describe('when no business details have changed', () => {
      test('returns null', () => {
        const result = buildFixSuccessMessageService('business', businessDetails)

        expect(result).toBeNull()
      })
    })
  })
})
