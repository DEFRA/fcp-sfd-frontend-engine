// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { buildDateFromParts } from '../../../src/utils/build-date-from-parts.js'

describe('buildDateFromParts', () => {
  test('it zero pads single digit days and months', () => {
    expect(buildDateFromParts({ day: '5', month: '4', year: '1990' })).toEqual('1990-04-05')
  })

  test('it leaves two digit days and months untouched', () => {
    expect(buildDateFromParts({ day: '25', month: '12', year: '1990' })).toEqual('1990-12-25')
  })

  test('it accepts numeric parts', () => {
    expect(buildDateFromParts({ day: 5, month: 4, year: 1990 })).toEqual('1990-04-05')
  })

  test('it zero pads year values shorter than four digits', () => {
    expect(buildDateFromParts({ day: 5, month: 4, year: 90 })).toEqual('0090-04-05')
  })
})
