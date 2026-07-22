// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { formatFullName } from '../../../src/utils/format-full-name.js'

describe('formatFullName', () => {
  test('it joins first, middle and last names', () => {
    expect(formatFullName({ first: 'John', middle: 'A', last: 'Doe' })).toEqual('John A Doe')
  })

  test('it omits a missing middle name', () => {
    expect(formatFullName({ first: 'John', middle: null, last: 'Doe' })).toEqual('John Doe')
  })
})
