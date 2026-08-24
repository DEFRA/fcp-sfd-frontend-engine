import { Joi } from '../../utils/joi.js'

// Charity Commission registration numbers are 7 or 8 digits (England and Wales)
export const businessCharityRegistrationNumberSchema = Joi.object({
  charityCommissionRegistrationNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{7,8}$/)
    .messages({
      'string.empty': 'Enter the charity commission registration number',
      'any.required': 'Enter the charity commission registration number',
      'string.pattern.base': 'Charity commission registration number must be 7 or 8 numbers',
      'string.noControlChars': 'Charity commission registration number must only include letters and numbers'
    })
})
