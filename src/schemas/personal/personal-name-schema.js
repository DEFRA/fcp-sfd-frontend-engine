import Joi from 'joi'
import {
  FIRST_NAME_MAX,
  LAST_NAME_MAX,
  MIDDLE_NAMES_MAX
} from '../../constants/validation-fields.js'
import { NO_CONTROL_CHARS_PATTERN } from '../../constants/patterns.js'

export const personalNameSchema = Joi.object({
  first: Joi.string()
    .trim()
    .required()
    .max(FIRST_NAME_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.empty': 'Enter first name',
      'string.max': `First name must be ${FIRST_NAME_MAX} characters or less`,
      'any.required': 'Enter first name',
      'string.pattern.base': 'First name must not contain invalid characters'
    }),
  last: Joi.string()
    .trim()
    .required()
    .max(LAST_NAME_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.empty': 'Enter last name',
      'string.max': `Last name must be ${LAST_NAME_MAX} characters or less`,
      'any.required': 'Enter last name',
      'string.pattern.base': 'Last name must not contain invalid characters'
    }),
  middle: Joi.string()
    .trim()
    .allow('')
    .max(MIDDLE_NAMES_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.max': `Middle names must be ${MIDDLE_NAMES_MAX} characters or less`,
      'string.pattern.base': 'Middle names must not contain invalid characters'
    })
})
