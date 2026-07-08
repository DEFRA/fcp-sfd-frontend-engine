import Joi from 'joi'
import { BUSINESS_NAME_MAX } from '../../constants/validation-fields.js'
import { NO_CONTROL_CHARS_PATTERN } from '../../constants/patterns.js'

export const businessNameSchema = Joi.object({
  businessName: Joi.string()
    .trim()
    .required()
    .max(BUSINESS_NAME_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.empty': 'Enter business name',
      'string.max': `Business name must be ${BUSINESS_NAME_MAX} characters or less`,
      'any.required': 'Enter business name',
      'string.pattern.base': 'Business name must not contain invalid characters'
    })
})
