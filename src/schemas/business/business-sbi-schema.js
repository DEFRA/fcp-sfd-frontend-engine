import { Joi } from '../../utils/joi.js'

export const businessSbiSchema = Joi.object({
  sbi: Joi.string()
    .pattern(/^\d{9}$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Enter the full SBI',
      'string.noControlChars': 'SBI must not contain invalid characters'
    })
})
