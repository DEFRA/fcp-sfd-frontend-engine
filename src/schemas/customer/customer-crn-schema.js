import { Joi } from '../../utils/joi.js'

export const customerCrnSchema = Joi.object({
  crn: Joi.string()
    .trim()
    .pattern(/^\d{10}$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Enter the full CRN',
      'string.noControlChars': 'CRN must not contain invalid characters'
    })
})
