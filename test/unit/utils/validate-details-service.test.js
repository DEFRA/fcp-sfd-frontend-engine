// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { validateDetailsService } from '../../../src/utils/validate-details-service.js'
import { personalSchemas } from '../../../src/schemas/personal/personal-schemas.js'

describe('validateDetailsService', () => {
  let payload
  let schemas

  beforeEach(() => {
    schemas = [personalSchemas.name, personalSchemas.email, personalSchemas.phone]

    payload = {
      first: 'John',
      last: 'Doe',
      personalEmail: 'john@example.com',
      personalTelephone: '01234567890'
    }
  })

  describe('when valid data is provided', () => {
    test('returns isValid as true', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.isValid).toBe(true)
    })

    test('returns an empty sectionsNeedingUpdate array', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.sectionsNeedingUpdate).toEqual([])
    })
  })

  describe('when invalid data is provided', () => {
    beforeEach(() => {
      payload.first = ''
    })

    test('returns isValid as false', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.isValid).toBe(false)
    })

    test('returns the sections needing update', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.sectionsNeedingUpdate).toEqual(['name'])
    })
  })

  describe('when multiple schema errors map to the same section', () => {
    beforeEach(() => {
      payload.first = ''
      payload.last = ''
    })

    test('only returns the section once', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.sectionsNeedingUpdate).toEqual(['name'])
    })
  })

  describe('when multiple sections are invalid', () => {
    beforeEach(() => {
      payload.first = ''
      payload.personalEmail = 'not-an-email'
    })

    test('returns all affected sections', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.sectionsNeedingUpdate).toEqual(['email', 'name'])
    })
  })

  describe('when both telephone and mobile are missing', () => {
    beforeEach(() => {
      delete payload.personalTelephone
      delete payload.personalMobile
      schemas = [personalSchemas.phone]
    })

    test('maps the error to the phone section', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.sectionsNeedingUpdate).toContain('phone')
    })
  })

  describe('when only a telephone number is provided', () => {
    beforeEach(() => {
      delete payload.personalMobile
    })

    test('does not flag the phone section', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.sectionsNeedingUpdate).not.toContain('phone')
    })
  })

  describe('when only a mobile number is provided', () => {
    beforeEach(() => {
      delete payload.personalTelephone
      payload.personalMobile = '07123456789'
    })

    test('does not flag the phone section', () => {
      const result = validateDetailsService(schemas, payload)

      expect(result.sectionsNeedingUpdate).not.toContain('phone')
    })
  })
})
