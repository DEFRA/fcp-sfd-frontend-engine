// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Thing under test
import { personalSchemas } from '../../../../src/schemas/personal/personal-schemas.js'

// Test helpers
import { personalDobSchema } from '../../../../src/schemas/personal/personal-dob-schema.js'
import { personalNameSchema } from '../../../../src/schemas/personal/personal-name-schema.js'
import { personalPhoneSchema } from '../../../../src/schemas/personal/personal-phone-schema.js'
import { personalEmailSchema } from '../../../../src/schemas/personal/personal-email-schema.js'
import { addressSchema } from '../../../../src/schemas/address-schema.js'

describe('personal schemas', () => {
  test('exposes all personal detail schemas', () => {
    expect(personalSchemas).toHaveProperty('name')
    expect(personalSchemas).toHaveProperty('dob')
    expect(personalSchemas).toHaveProperty('address')
    expect(personalSchemas).toHaveProperty('phone')
    expect(personalSchemas).toHaveProperty('email')
  })

  test('each schema property is defined', () => {
    expect(personalSchemas.name).toBe(personalNameSchema)
    expect(personalSchemas.dob).toBe(personalDobSchema)
    expect(personalSchemas.address).toBe(addressSchema)
    expect(personalSchemas.phone).toBe(personalPhoneSchema)
    expect(personalSchemas.email).toBe(personalEmailSchema)
  })
})
