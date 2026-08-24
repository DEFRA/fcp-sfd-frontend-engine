import { Joi } from '../../utils/joi.js'

// Companies House registration numbers are either 8 digits, or 2 letters followed by 6 digits
export const businessCompanyRegistrationNumberSchema = Joi.object({
  companyRegistrationNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(\d{8}|[A-Za-z]{2}\d{6})$/)
    .messages({
      'string.empty': 'Enter the company registration number',
      'any.required': 'Enter the company registration number',
      'string.pattern.base': 'Company registration number must be 8 numbers, or 2 letters followed by 6 numbers',
      'string.noControlChars': 'Company registration number must not contain invalid characters'
    })
})
