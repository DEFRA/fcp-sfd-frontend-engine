// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { formatDob } from '../../../src/utils/format-dob.js'

describe('formatDob', () => {
  describe('when given a valid date', () => {
    test('returns the formatted date and "Change" action', () => {
      const result = formatDob('1990-06-15')

      expect(result).toEqual({
        formattedDob: '15 June 1990',
        action: 'Change'
      })
    })

    test('handles dates with leading zeros', () => {
      const result = formatDob('1985-01-05')

      expect(result).toEqual({
        formattedDob: '5 January 1985',
        action: 'Change'
      })
    })

    test('handles dates at the beginning of the year', () => {
      const result = formatDob('2000-01-01')

      expect(result).toEqual({
        formattedDob: '1 January 2000',
        action: 'Change'
      })
    })

    test('handles dates at the end of the year', () => {
      const result = formatDob('2000-12-31')

      expect(result).toEqual({
        formattedDob: '31 December 2000',
        action: 'Change'
      })
    })
  })

  describe('when given an invalid date', () => {
    let futureDate

    beforeEach(() => {
      const nextYear = new Date().getFullYear() + 1
      futureDate = `${nextYear}-06-15`
    })

    test('returns "Not added" and "Add" action for invalid date string', () => {
      const result = formatDob('not-a-date')

      expect(result).toEqual({
        formattedDob: 'Not added',
        action: 'Add'
      })
    })

    test('returns "Not added" and "Add" action for future date', () => {
      const result = formatDob(futureDate)

      expect(result).toEqual({
        formattedDob: 'Not added',
        action: 'Add'
      })
    })
  })

  describe('when given a null or undefined date', () => {
    test('returns "Not added" and "Add" action for null', () => {
      const result = formatDob(null)

      expect(result).toEqual({
        formattedDob: 'Not added',
        action: 'Add'
      })
    })

    test('returns "Not added" and "Add" action for undefined', () => {
      const result = formatDob(undefined)

      expect(result).toEqual({
        formattedDob: 'Not added',
        action: 'Add'
      })
    })

    test('returns "Not added" and "Add" action for empty string', () => {
      const result = formatDob('')

      expect(result).toEqual({
        formattedDob: 'Not added',
        action: 'Add'
      })
    })
  })

  describe('when given a date that appears to be today or in the future', () => {
    let tomorrowStr

    beforeEach(() => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrowStr = tomorrow.toISOString().split('T')[0]
    })

    test('returns "Not added" and "Add" action when date is in the future', () => {
      const result = formatDob(tomorrowStr)

      expect(result).toEqual({
        formattedDob: 'Not added',
        action: 'Add'
      })
    })
  })
})
