// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import {
  formatBackLink,
  formatNumber,
  formatDateInputValues,
  formatLongDate,
  formatLongDateFromParts,
  sortErrorsBySectionOrder
} from '../../../src/presenters/base-presenter.js'

describe('basePresenter', () => {
  describe('#formatBackLink', () => {
    let businessName

    describe('when the businessName property is less than 50 characters', () => {
      beforeEach(() => {
        businessName = 'Acme Farms Ltd'
      })

      test('it should return the text "Back to Acme Farms Ltd"', () => {
        const result = formatBackLink(businessName)
        expect(result).toEqual('Back to Acme Farms Ltd')
      })
    })

    describe('when the businessName property is greater than 50 characters', () => {
      beforeEach(() => {
        businessName = 'This is a very long business name that exceeds 50 characters'
      })

      test('it should return the text truncated with an ellipsis', () => {
        const result = formatBackLink(businessName)
        expect(result).toEqual('Back to This is a very long business name that exceeds 50 …')
      })
    })
  })

  describe('#formatNumber', () => {
    let payload
    let changedNumber
    let originalNumber

    describe('when provided with a payload, changeNumber and original number', () => {
      beforeEach(() => {
        payload = '01234 111111'
        changedNumber = '01111 111111'
        originalNumber = '02222 222222'
      })

      test('it should return the payload', () => {
        const result = formatNumber(payload, changedNumber, originalNumber)

        expect(result).toBe('01234 111111')
      })
    })

    describe('when provided with a changed number and an original number', () => {
      beforeEach(() => {
        payload = undefined
        changedNumber = '01111 111111'
        originalNumber = '02222 222222'
      })

      test('it should return the changed number', () => {
        const result = formatNumber(payload, changedNumber, originalNumber)

        expect(result).toBe('01111 111111')
      })
    })

    describe('when provided only with an original number', () => {
      beforeEach(() => {
        payload = undefined
        changedNumber = undefined
        originalNumber = '02222 222222'
      })

      test('it should return the original number', () => {
        const result = formatNumber(payload, changedNumber, originalNumber)

        expect(result).toBe('02222 222222')
      })
    })
  })

  describe('#formatDateInputValues', () => {
    let payloadDob
    let changedDob
    let originalDob

    beforeEach(() => {
      payloadDob = undefined
      changedDob = undefined
      originalDob = { day: 1, month: 5, year: 1990 }
    })

    describe('when provided with a payload', () => {
      beforeEach(() => {
        payloadDob = { day: '20', month: '10', year: '1997' }
      })

      test('it should return the day, month and year from the payload', () => {
        const result = formatDateInputValues(payloadDob, changedDob, originalDob)

        expect(result).toEqual({ day: '20', month: '10', year: '1997' })
      })
    })

    describe('when provided with an empty payload', () => {
      beforeEach(() => {
        payloadDob = {}
      })

      test('it should return empty strings for the day, month and year', () => {
        const result = formatDateInputValues(payloadDob, changedDob, originalDob)

        expect(result).toEqual({ day: '', month: '', year: '' })
      })
    })

    describe('when provided with a changed date of birth', () => {
      beforeEach(() => {
        changedDob = { day: '15', month: '11', year: '2000' }
      })

      test('it should return the day, month and year from the changed date of birth', () => {
        const result = formatDateInputValues(payloadDob, changedDob, originalDob)

        expect(result).toEqual({ day: '15', month: '11', year: '2000' })
      })
    })

    describe('when provided only with an original date of birth', () => {
      test('it should return the day, month and year from the original date of birth as strings', () => {
        const result = formatDateInputValues(payloadDob, changedDob, originalDob)

        expect(result).toEqual({ day: '1', month: '5', year: '1990' })
      })
    })

    describe('when the original date of birth values are null', () => {
      beforeEach(() => {
        originalDob = { day: null, month: null, year: null }
      })

      test('it should return empty strings for the day, month and year', () => {
        const result = formatDateInputValues(payloadDob, changedDob, originalDob)

        expect(result).toEqual({ day: '', month: '', year: '' })
      })
    })
  })

  describe('#sortErrorsBySectionOrder', () => {
    let errors
    let orderedSectionsToFix
    let SECTION_FIELD_ORDER

    beforeEach(() => {
      errors = {
        lastName: { message: 'Enter last name' },
        line1: { message: 'Enter address line 1' },
        firstName: { message: 'Enter first name' }
      }

      orderedSectionsToFix = ['name', 'address']

      SECTION_FIELD_ORDER = {
        name: ['firstName', 'lastName'],
        address: ['line1', 'line2']
      }
    })

    test('it should return errors sorted by section order and field order', () => {
      const result = sortErrorsBySectionOrder(errors, orderedSectionsToFix, SECTION_FIELD_ORDER)

      expect(result).toEqual([
        { field: 'firstName', message: 'Enter first name' },
        { field: 'lastName', message: 'Enter last name' },
        { field: 'line1', message: 'Enter address line 1' }
      ])
    })

    test('it should ignore fields that are not present in errors', () => {
      const result = sortErrorsBySectionOrder(errors, orderedSectionsToFix, SECTION_FIELD_ORDER)

      expect(result).not.toContainEqual({ field: 'line2', message: 'Enter address line 2' })
    })

    test('it should return an empty array when no errors are provided', () => {
      const result = sortErrorsBySectionOrder({}, orderedSectionsToFix, SECTION_FIELD_ORDER)

      expect(result).toEqual([])
    })

    test('it should handle sections that do not exist in SECTION_FIELD_ORDER', () => {
      orderedSectionsToFix = ['unknownSection']

      const result = sortErrorsBySectionOrder(errors, orderedSectionsToFix, SECTION_FIELD_ORDER)

      expect(result).toEqual([])
    })
  })

  describe('#formatLongDate', () => {
    let date

    describe('when provided with a valid ISO date string', () => {
      beforeEach(() => {
        date = '1990-04-05'
      })

      test('it should return the formatted date without a leading zero on the day', () => {
        const result = formatLongDate(date)

        expect(result).toEqual('5 April 1990')
      })
    })

    describe('when provided with a valid Date object', () => {
      beforeEach(() => {
        date = new Date('2021-09-12')
      })

      test('it should return the formatted date', () => {
        const result = formatLongDate(date)

        expect(result).toEqual('12 September 2021')
      })
    })

    describe('when provided with null', () => {
      beforeEach(() => {
        date = null
      })

      test('it should return null', () => {
        const result = formatLongDate(date)

        expect(result).toBeNull()
      })
    })

    describe('when provided with undefined', () => {
      beforeEach(() => {
        date = undefined
      })

      test('it should return null', () => {
        const result = formatLongDate(date)

        expect(result).toBeNull()
      })
    })

    describe('when provided with an empty string', () => {
      beforeEach(() => {
        date = ''
      })

      test('it should return null', () => {
        const result = formatLongDate(date)

        expect(result).toBeNull()
      })
    })

    describe('when provided with an invalid date string', () => {
      beforeEach(() => {
        date = 'not-a-date'
      })

      test('it should return null', () => {
        const result = formatLongDate(date)

        expect(result).toBeNull()
      })
    })
  })

  describe('#formatLongDateFromParts', () => {
    describe('when provided with valid date parts', () => {
      test('it should return the formatted date, zero padding single digit parts', () => {
        const result = formatLongDateFromParts({ day: '5', month: '4', year: '1990' })

        expect(result).toEqual('5 April 1990')
      })
    })

    describe('when the parts do not form a real date', () => {
      test('it should return null', () => {
        const result = formatLongDateFromParts({ day: null, month: null, year: null })

        expect(result).toBeNull()
      })
    })
  })
})
