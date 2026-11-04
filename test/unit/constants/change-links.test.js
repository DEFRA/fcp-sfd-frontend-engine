// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import {
  INTERNAL_BUSINESS_CHANGE_LINKS,
  INTERNAL_PERSONAL_CHANGE_LINKS,
  EXTERNAL_BUSINESS_CHANGE_LINKS,
  EXTERNAL_PERSONAL_CHANGE_LINKS
} from '../../../src/constants/change-links.js'

const SBI = '106705779'
const CRN = '1100598138'

describe('Change links', () => {
  describe('INTERNAL_BUSINESS_CHANGE_LINKS', () => {
    test('builds the business name change link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessName(SBI)).toBe(`/business/${SBI}/name-change`)
    })

    test('builds the business address change link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessAddress(SBI)).toBe(`/business/${SBI}/address-change`)
    })

    test('builds the business phone change link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessPhone(SBI)).toBe(`/business/${SBI}/phone-numbers-change`)
    })

    test('builds the business email change link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessEmail(SBI)).toBe(`/business/${SBI}/email-change`)
    })

    test('builds the business VAT change link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessVat(SBI)).toBe(`/business/${SBI}/vat-registration-number-change`)
    })

    test('builds the business VAT remove link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessVatRemove(SBI)).toBe(`/business/${SBI}/vat-registration-remove`)
    })

    test('builds the business legal status change link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessLegalStatus(SBI)).toBe(`/business/${SBI}/legal-status-change`)
    })

    test('builds the business legal status registration number change link', () => {
      expect(INTERNAL_BUSINESS_CHANGE_LINKS.businessLegalStatusRegistrationNumber(SBI)).toBe(`/business/${SBI}/legal-status-enter`)
    })
  })

  describe('INTERNAL_PERSONAL_CHANGE_LINKS', () => {
    test('builds the personal name change link', () => {
      expect(INTERNAL_PERSONAL_CHANGE_LINKS.personalName(CRN)).toBe(`/customer/${CRN}/account-name-change`)
    })

    test('builds the personal address change link', () => {
      expect(INTERNAL_PERSONAL_CHANGE_LINKS.personalAddress(CRN)).toBe(`/customer/${CRN}/account-address-change`)
    })

    test('builds the personal phone change link', () => {
      expect(INTERNAL_PERSONAL_CHANGE_LINKS.personalPhone(CRN)).toBe(`/customer/${CRN}/account-phone-numbers-change`)
    })

    test('builds the personal email change link', () => {
      expect(INTERNAL_PERSONAL_CHANGE_LINKS.personalEmail(CRN)).toBe(`/customer/${CRN}/account-email-change`)
    })

    test('builds the personal date of birth change link', () => {
      expect(INTERNAL_PERSONAL_CHANGE_LINKS.personalDateOfBirth(CRN)).toBe(`/customer/${CRN}/account-date-of-birth-change`)
    })
  })

  describe('EXTERNAL_BUSINESS_CHANGE_LINKS', () => {
    test('exports the business change links', () => {
      expect(EXTERNAL_BUSINESS_CHANGE_LINKS).toEqual({
        businessName: '/business-name-change',
        businessAddress: '/business-address-change',
        businessPhone: '/business-phone-numbers-change',
        businessEmail: '/business-email-change',
        businessVat: '/business-vat-registration-number-change',
        businessVatRemove: '/business-vat-registration-remove',
        businessLegalStatus: '/business-legal-status-change',
        businessType: '/business-type-change',
        businessFixNameNoPermission: '/business-fix-name-no-permission'
      })
    })
  })

  describe('EXTERNAL_PERSONAL_CHANGE_LINKS', () => {
    test('exports the personal change links', () => {
      expect(EXTERNAL_PERSONAL_CHANGE_LINKS).toEqual({
        personalName: '/account-name-change',
        personalAddress: '/account-address-change',
        personalPhone: '/account-phone-numbers-change',
        personalEmail: '/account-email-change',
        personalDateOfBirth: '/account-date-of-birth-change'
      })
    })
  })
})
