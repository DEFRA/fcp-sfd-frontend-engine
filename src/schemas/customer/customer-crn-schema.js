import Joi from 'joi'

export const customerCrnSchema = Joi.object({
  crn: Joi.string()
    .pattern(/^\d{10}$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Enter the full CRN'
    })
})
