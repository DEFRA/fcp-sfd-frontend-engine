// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import {
  BUSINESS_EMAIL_ADDRESS,
  BUSINESS_NAME,
  BUSINESS_PHONE_NUMBERS
} from '../../../src/constants/success-messages.js'

describe('success messages', () => {
  test('BUSINESS_EMAIL_ADDRESS has the expected value', () => {
    expect(BUSINESS_EMAIL_ADDRESS).toEqual('You have updated your business email address')
  })

  test('BUSINESS_NAME has the expected value', () => {
    expect(BUSINESS_NAME).toEqual('You have updated your business name')
  })

  test('BUSINESS_PHONE_NUMBERS has the expected value', () => {
    expect(BUSINESS_PHONE_NUMBERS).toEqual('You have updated your business phone numbers')
  })
})
