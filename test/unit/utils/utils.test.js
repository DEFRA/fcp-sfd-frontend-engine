// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import { utils } from '../../../src/utils/utils.js'

// Test helpers
import { formatValidationErrors } from '../../../src/utils/format-validation-errors.js'
import { formatFullName } from '../../../src/utils/format-full-name.js'
import { buildUpdateBusinessAddressVariables } from '../../../src/utils/build-update-business-address-variables.js'
import { buildUpdateBusinessEmailVariables } from '../../../src/utils/build-update-business-email-variables.js'
import { buildUpdateBusinessLegalStatusVariables } from '../../../src/utils/build-update-business-legal-status-variables.js'
import { buildUpdateBusinessRegistrationNumbersVariables } from '../../../src/utils/build-update-business-registration-numbers-variables.js'
import { buildUpdateCustomerAddressVariables } from '../../../src/utils/build-update-customer-address-variables.js'
import { buildUpdateCustomerDobVariables } from '../../../src/utils/build-update-customer-dob-variables.js'
import { buildUpdateCustomerEmailVariables } from '../../../src/utils/build-update-customer-email-variables.js'
import { buildUpdateCustomerNameVariables } from '../../../src/utils/build-update-customer-name-variables.js'
import { buildUpdateCustomerPhoneVariables } from '../../../src/utils/build-update-customer-phone-variables.js'

describe('utils exports', () => {
  test('exports formatValidationErrors', () => {
    expect(utils.formatValidationErrors).toBe(formatValidationErrors)
  })

  test('exports formatFullName', () => {
    expect(utils.formatFullName).toBe(formatFullName)
  })

  test('exports buildUpdateBusinessEmailVariables', () => {
    expect(utils.buildUpdateBusinessEmailVariables).toBe(buildUpdateBusinessEmailVariables)
  })

  test('exports buildUpdateBusinessAddressVariables', () => {
    expect(utils.buildUpdateBusinessAddressVariables).toBe(buildUpdateBusinessAddressVariables)
  })

  test('exports buildUpdateBusinessLegalStatusVariables', () => {
    expect(utils.buildUpdateBusinessLegalStatusVariables).toBe(buildUpdateBusinessLegalStatusVariables)
  })

  test('exports buildUpdateBusinessRegistrationNumbersVariables', () => {
    expect(utils.buildUpdateBusinessRegistrationNumbersVariables).toBe(buildUpdateBusinessRegistrationNumbersVariables)
  })

  test('exports buildUpdateCustomerAddressVariables', () => {
    expect(utils.buildUpdateCustomerAddressVariables).toBe(buildUpdateCustomerAddressVariables)
  })

  test('exports buildUpdateCustomerDobVariables', () => {
    expect(utils.buildUpdateCustomerDobVariables).toBe(buildUpdateCustomerDobVariables)
  })

  test('exports buildUpdateCustomerEmailVariables', () => {
    expect(utils.buildUpdateCustomerEmailVariables).toBe(buildUpdateCustomerEmailVariables)
  })

  test('exports buildUpdateCustomerNameVariables', () => {
    expect(utils.buildUpdateCustomerNameVariables).toBe(buildUpdateCustomerNameVariables)
  })

  test('exports buildUpdateCustomerPhoneVariables', () => {
    expect(utils.buildUpdateCustomerPhoneVariables).toBe(buildUpdateCustomerPhoneVariables)
  })
})
