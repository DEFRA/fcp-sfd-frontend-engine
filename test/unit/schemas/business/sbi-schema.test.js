// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { businessSbiSchema } from '../../../../src/schemas/business/business-sbi-schema.js'

describe('businessSbiSchema', () => {
  test('accepts a 10-digit numeric SBI', () => {
    const result = businessSbiSchema.validate({ sbi: '1234567891' })

    expect(result.error).toBeUndefined()
  })

  test('rejects SBI values shorter than 10 digits', () => {
    const result = businessSbiSchema.validate({ sbi: '123456789' })

    expect(result.error?.details[0].message).toBe('Enter a SBI number, like 1234567891')
  })

  test('rejects SBI values longer than 10 digits', () => {
    const result = businessSbiSchema.validate({ sbi: '12345678912' })

    expect(result.error?.details[0].message).toBe('Enter a SBI number, like 1234567891')
  })

  test('rejects SBI values containing non-numeric characters', () => {
    const result = businessSbiSchema.validate({ sbi: '12345abcde' })

    expect(result.error?.details[0].message).toBe('Enter a SBI number, like 1234567891')
  })

  test('accepts an empty SBI value', () => {
    const result = businessSbiSchema.validate({ sbi: '' })

    expect(result.error).toBeUndefined()
  })

  test('accepts when SBI is not provided', () => {
    const result = businessSbiSchema.validate({})

    expect(result.error).toBeUndefined()
  })
})
