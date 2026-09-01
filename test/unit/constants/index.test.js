// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { constants } from '../../../src/constants/index.js'

// Test helpers
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  OK,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE,
  FOUND
} from '../../../src/constants/status-codes.js'

import {
  FIRST_NAME_MAX,
  LAST_NAME_MAX,
  MIDDLE_NAMES_MAX,
  BUSINESS_NAME_MAX,
  EMAIL_MAX,
  PHONE_NUMBER_MIN,
  PHONE_NUMBER_MAX,
  MAX_AGE_YEARS,
  ADDRESS_LINE_MAX,
  TOWN_CITY_MAX,
  COUNTY_MAX,
  COUNTRY_MAX,
  POSTCODE_MAX,
} from '../../../src/constants/validation-fields.js'

import { PHONE_NUMBER_PATTERN } from '../../../src/constants/patterns.js'
import { MONTH_MAP } from '../../../src/constants/month-map.js'
import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL_ADDRESS,
  BUSINESS_LEGAL_STATUS_MESSAGE,
  BUSINESS_NAME,
  BUSINESS_PHONE_NUMBERS,
  BUSINESS_VAT,
  BUSINESS_VAT_REMOVE,
  PERSONAL_ADDRESS,
  PERSONAL_DOB,
  PERSONAL_EMAIL_ADDRESS,
  PERSONAL_NAME,
  PERSONAL_PHONE_NUMBERS,
} from '../../../src/constants/success-messages.js'

describe('constants exports', () => {
  describe('statusCodes', () => {
    test('exports all HTTP status codes', () => {
      expect(constants.statusCodes.BAD_REQUEST).toBe(BAD_REQUEST)
      expect(constants.statusCodes.UNAUTHORIZED).toBe(UNAUTHORIZED)
      expect(constants.statusCodes.FORBIDDEN).toBe(FORBIDDEN)
      expect(constants.statusCodes.NOT_FOUND).toBe(NOT_FOUND)
      expect(constants.statusCodes.OK).toBe(OK)
      expect(constants.statusCodes.NO_CONTENT).toBe(NO_CONTENT)
      expect(constants.statusCodes.INTERNAL_SERVER_ERROR).toBe(INTERNAL_SERVER_ERROR)
      expect(constants.statusCodes.SERVICE_UNAVAILABLE).toBe(SERVICE_UNAVAILABLE)
      expect(constants.statusCodes.FOUND).toBe(FOUND)
    })
  })

  describe('validationFields', () => {
    test('exports all validation field constraints', () => {
      expect(constants.validationFields.FIRST_NAME_MAX).toBe(FIRST_NAME_MAX)
      expect(constants.validationFields.LAST_NAME_MAX).toBe(LAST_NAME_MAX)
      expect(constants.validationFields.MIDDLE_NAMES_MAX).toBe(MIDDLE_NAMES_MAX)
      expect(constants.validationFields.BUSINESS_NAME_MAX).toBe(BUSINESS_NAME_MAX)
      expect(constants.validationFields.EMAIL_MAX).toBe(EMAIL_MAX)
      expect(constants.validationFields.PHONE_NUMBER_MIN).toBe(PHONE_NUMBER_MIN)
      expect(constants.validationFields.PHONE_NUMBER_MAX).toBe(PHONE_NUMBER_MAX)
      expect(constants.validationFields.MAX_AGE_YEARS).toBe(MAX_AGE_YEARS)
      expect(constants.validationFields.ADDRESS_LINE_MAX).toBe(ADDRESS_LINE_MAX)
      expect(constants.validationFields.TOWN_CITY_MAX).toBe(TOWN_CITY_MAX)
      expect(constants.validationFields.COUNTY_MAX).toBe(COUNTY_MAX)
      expect(constants.validationFields.COUNTRY_MAX).toBe(COUNTRY_MAX)
      expect(constants.validationFields.POSTCODE_MAX).toBe(POSTCODE_MAX)
    })
  })

  describe('patterns', () => {
    test('exports phone number pattern', () => {
      expect(constants.patterns.PHONE_NUMBER_PATTERN).toBe(PHONE_NUMBER_PATTERN)
    })
  })

  describe('monthMap', () => {
    test('exports month map', () => {
      expect(constants.monthMap).toBe(MONTH_MAP)
    })
  })

  describe('successMessages', () => {
    test('exports business email success message', () => {
      expect(constants.successMessages.BUSINESS_EMAIL_ADDRESS).toBe(BUSINESS_EMAIL_ADDRESS)
    })

    test('exports business name success message', () => {
      expect(constants.successMessages.BUSINESS_NAME).toBe(BUSINESS_NAME)
    })

    test('exports business phone numbers success message', () => {
      expect(constants.successMessages.BUSINESS_PHONE_NUMBERS).toBe(BUSINESS_PHONE_NUMBERS)
    })

    test('exports business VAT success message', () => {
      expect(constants.successMessages.BUSINESS_VAT).toBe(BUSINESS_VAT)
    })

    test('exports business VAT remove success message', () => {
      expect(constants.successMessages.BUSINESS_VAT_REMOVE).toBe(BUSINESS_VAT_REMOVE)
    })

    test('exports business address success message', () => {
      expect(constants.successMessages.BUSINESS_ADDRESS).toBe(BUSINESS_ADDRESS)
    })

    test('exports business legal status success message', () => {
      expect(constants.successMessages.BUSINESS_LEGAL_STATUS).toBe(BUSINESS_LEGAL_STATUS_MESSAGE)
    })

    test('exports personal name success message', () => {
      expect(constants.successMessages.PERSONAL_NAME).toBe(PERSONAL_NAME)
    })

    test('exports personal email success message', () => {
      expect(constants.successMessages.PERSONAL_EMAIL_ADDRESS).toBe(PERSONAL_EMAIL_ADDRESS)
    })

    test('exports personal phone numbers success message', () => {
      expect(constants.successMessages.PERSONAL_PHONE_NUMBERS).toBe(PERSONAL_PHONE_NUMBERS)
    })

    test('exports personal date of birth success message', () => {
      expect(constants.successMessages.PERSONAL_DOB).toBe(PERSONAL_DOB)
    })

    test('exports personal address success message', () => {
      expect(constants.successMessages.PERSONAL_ADDRESS).toBe(PERSONAL_ADDRESS)
    })
  })
})
