// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { BUSINESS_EMAIL_ADDRESS } from '../../../src/constants/success-messages.js'

describe('success messages', () => {
  test('BUSINESS_EMAIL_ADDRESS has the expected value', () => {
    expect(BUSINESS_EMAIL_ADDRESS).toEqual('You have updated your business email address')
  })
})
