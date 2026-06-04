// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { customerCrnSchema } from '../../../../src/schemas/customer/customer-crn-schema.js'

describe('customerCrnSchema', () => {
  test('accepts a 10-digit numeric CRN', () => {
    const result = customerCrnSchema.validate({ crn: '1234567890' })

    expect(result.error).toBeUndefined()
  })

  test('rejects CRN values shorter than 10 digits', () => {
    const result = customerCrnSchema.validate({ crn: '123456789' })

    expect(result.error?.details[0].message).toBe('Enter the full CRN')
  })

  test('rejects CRN values longer than 10 digits', () => {
    const result = customerCrnSchema.validate({ crn: '12345678901' })

    expect(result.error?.details[0].message).toBe('Enter the full CRN')
  })

  test('rejects CRN values containing non-numeric characters', () => {
    const result = customerCrnSchema.validate({ crn: '123456789a' })

    expect(result.error?.details[0].message).toBe('Enter the full CRN')
  })

  test('accepts an empty CRN value', () => {
    const result = customerCrnSchema.validate({ crn: '' })

    expect(result.error).toBeUndefined()
  })

  test('accepts when CRN is not provided', () => {
    const result = customerCrnSchema.validate({})

    expect(result.error).toBeUndefined()
  })
})
