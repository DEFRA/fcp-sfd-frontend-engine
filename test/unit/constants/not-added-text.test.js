// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { NOT_ADDED_TEXT } from '../../../src/constants/not-added-text.js'

describe('NOT_ADDED_TEXT', () => {
  test('it is the text shown when a value has not been added', () => {
    expect(NOT_ADDED_TEXT).toBe('Not added')
  })
})
