import { formatFullName } from './format-full-name.js'
import { formatValidationErrors } from './format-validation-errors.js'
import { buildUpdateBusinessEmailVariables } from './build-update-business-email-variables.js'
import { buildUpdateBusinessNameVariables } from './build-update-business-name-variables.js'
import { buildUpdateBusinessPhoneNumbersVariables } from './build-update-business-phone-numbers-variables.js'
import { buildUpdatePersonalDobVariables } from './build-update-personal-dob-variables.js'

export const utils = {
  formatFullName,
  formatValidationErrors,
  buildUpdateBusinessEmailVariables,
  buildUpdateBusinessNameVariables,
  buildUpdateBusinessPhoneNumbersVariables,
  buildUpdatePersonalDobVariables
}
