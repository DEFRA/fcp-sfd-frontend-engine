// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { businessSbiSchema } from '../../../../src/schemas/business/business-sbi-schema.js'

describe('businessSbiSchema', () => {
  test('accepts a 9-digit numeric SBI', () => {
    const result = businessSbiSchema.validate({ sbi: '123456789' })

    expect(result.error).toBeUndefined()
  })

  test('rejects SBI values shorter than 9 digits', () => {
    const result = businessSbiSchema.validate({ sbi: '12345678' })

    expect(result.error?.details[0].message).toBe('Enter the full SBI')
  })

  test('rejects SBI values longer than 9 digits', () => {
    const result = businessSbiSchema.validate({ sbi: '1234567891' })

    expect(result.error?.details[0].message).toBe('Enter the full SBI')
  })

  test('rejects SBI values containing non-numeric characters', () => {
    const result = businessSbiSchema.validate({ sbi: '12345abcde' })

    expect(result.error?.details[0].message).toBe('Enter the full SBI')
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
