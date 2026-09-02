// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import {
  BUSINESS_ADDRESS,
  BUSINESS_CHARITY_REGISTRATION_NUMBER,
  BUSINESS_COMPANY_REGISTRATION_NUMBER,
  BUSINESS_EMAIL_ADDRESS,
  BUSINESS_LEGAL_STATUS,
  BUSINESS_NAME,
  BUSINESS_PHONE_NUMBERS,
  BUSINESS_VAT,
  BUSINESS_VAT_REMOVE,
  PERSONAL_ADDRESS,
  PERSONAL_DOB,
  PERSONAL_EMAIL_ADDRESS,
  PERSONAL_NAME,
  PERSONAL_PHONE_NUMBERS
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

  test('BUSINESS_VAT has the expected value', () => {
    expect(BUSINESS_VAT).toEqual('You have updated your VAT registration number')
  })

  test('BUSINESS_VAT_REMOVE has the expected value', () => {
    expect(BUSINESS_VAT_REMOVE).toEqual('You have removed your VAT registration number')
  })

  test('BUSINESS_ADDRESS has the expected value', () => {
    expect(BUSINESS_ADDRESS).toEqual('You have updated your business address')
  })

  test('BUSINESS_CHARITY_REGISTRATION_NUMBER has the expected value', () => {
    expect(BUSINESS_CHARITY_REGISTRATION_NUMBER).toEqual('You have updated your charity commission registration number')
  })

  test('BUSINESS_COMPANY_REGISTRATION_NUMBER has the expected value', () => {
    expect(BUSINESS_COMPANY_REGISTRATION_NUMBER).toEqual('You have updated your company registration number')
  })

  test('BUSINESS_LEGAL_STATUS has the expected value', () => {
    expect(BUSINESS_LEGAL_STATUS).toEqual('You have updated your business legal status')
  })

  test('PERSONAL_NAME has the expected value', () => {
    expect(PERSONAL_NAME).toEqual('You have updated your full name')
  })

  test('PERSONAL_EMAIL_ADDRESS has the expected value', () => {
    expect(PERSONAL_EMAIL_ADDRESS).toEqual('You have updated your personal email address')
  })

  test('PERSONAL_PHONE_NUMBERS has the expected value', () => {
    expect(PERSONAL_PHONE_NUMBERS).toEqual('You have updated your personal phone numbers')
  })

  test('PERSONAL_DOB has the expected value', () => {
    expect(PERSONAL_DOB).toEqual('You have updated your date of birth')
  })

  test('PERSONAL_ADDRESS has the expected value', () => {
    expect(PERSONAL_ADDRESS).toEqual('You have updated your personal address')
  })
})
