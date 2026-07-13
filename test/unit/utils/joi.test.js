// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { Joi } from '../../../src/utils/joi.js'

describe('Joi custom extension', () => {
  describe('automatic control character rejection', () => {
    describe('when a string is free of control characters', () => {
      test('it passes validation', () => {
        const { error } = Joi.string().validate('01234 Acme Farms (Ltd)')

        expect(error).toBeUndefined()
      })
    })

    describe('when a string contains a null character (0x00)', () => {
      test('it fails validation with the "string.noControlChars" type', () => {
        const { error } = Joi.string().validate('John\x00Doe')

        expect(error.details[0].type).toBe('string.noControlChars')
      })
    })

    describe('when a string contains a unit separator (0x1f)', () => {
      test('it fails validation', () => {
        const { error } = Joi.string().validate('10\x1fSomething')

        expect(error.details[0].type).toBe('string.noControlChars')
      })
    })

    describe('when a string contains a delete character (0x7f)', () => {
      test('it fails validation', () => {
        const { error } = Joi.string().validate('bad\x7fvalue')

        expect(error.details[0].type).toBe('string.noControlChars')
      })
    })

    describe('when a string contains a C1 control character (0x9f)', () => {
      test('it fails validation', () => {
        const { error } = Joi.string().validate('bad\x9fvalue')

        expect(error.details[0].type).toBe('string.noControlChars')
      })
    })

    describe('when a string contains characters above the C1 block', () => {
      test('it permits legitimate accented and symbol characters', () => {
        const { error } = Joi.string().validate('Café £5 €10 — O\u2019Brien')

        expect(error).toBeUndefined()
      })
    })

    describe('when no field-specific message is provided', () => {
      test('it falls back to the generic default message', () => {
        const { error } = Joi.string().validate('bad\x00value')

        expect(error.details[0].message).toBe('Field must not contain invalid characters')
      })
    })

    describe('when a field-specific message is provided', () => {
      test('it uses the overridden message', () => {
        const schema = Joi.object({
          businessName: Joi.string().messages({
            'string.noControlChars': 'Business name must not contain invalid characters'
          })
        })

        const { error } = schema.validate({ businessName: 'Acme\x07Farms' })

        expect(error.details[0].type).toBe('string.noControlChars')
        expect(error.details[0].message).toBe('Business name must not contain invalid characters')
      })
    })
  })

  describe('when an empty string is permitted', () => {
    test('it passes validation', () => {
      const { error } = Joi.string().allow('').validate('')

      expect(error).toBeUndefined()
    })
  })

  describe('base string rules', () => {
    describe('when the value exceeds the maximum length', () => {
      test('it still enforces the built-in "string.max" rule', () => {
        const { error } = Joi.string().max(3).validate('abcd')

        expect(error.details[0].type).toBe('string.max')
      })
    })
  })
})
