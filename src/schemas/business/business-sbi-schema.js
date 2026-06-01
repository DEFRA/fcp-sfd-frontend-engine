import Joi from 'joi'

export const businessSbiSchema = Joi.object({
  sbi: Joi.string()
    .pattern(/^\d{10}$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Enter a SBI number, like 1234567891'
    })
})
