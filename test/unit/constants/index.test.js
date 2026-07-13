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
  SERVICE_UNAVAILABLE
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
})
