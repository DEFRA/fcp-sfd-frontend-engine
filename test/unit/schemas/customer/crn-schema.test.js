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

  test('rejects CRN values containing a control character', () => {
    const result = customerCrnSchema.validate({ crn: '123456\x00890' })

    expect(result.error?.details[0].message).toBe('CRN must not contain invalid characters')
  })

  test('trims leading and trailing whitespace from a valid CRN', () => {
    const result = customerCrnSchema.validate({ crn: '  1234567890  ' })

    expect(result.error).toBeUndefined()
    expect(result.value.crn).toBe('1234567890')
  })

  test('accepts a whitespace-only CRN by trimming it to an empty value', () => {
    const result = customerCrnSchema.validate({ crn: '   ' })

    expect(result.error).toBeUndefined()
    expect(result.value.crn).toBe('')
  })

  test('rejects a value that is still invalid after trimming', () => {
    const result = customerCrnSchema.validate({ crn: '  123456  ' })

    expect(result.error?.details[0].message).toBe('Enter the full CRN')
  })

  test('trims whitespace before applying the pattern validation', () => {
    // whitespace-padded value would fail the 10-digit pattern if validated before trimming
    const result = customerCrnSchema.validate({ crn: ' 1234567890 ' })

    expect(result.error).toBeUndefined()
    expect(result.value.crn).toBe('1234567890')
  })
})
