import Joi from 'joi'
import {
  ADDRESS_LINE_MAX,
  TOWN_CITY_MAX,
  COUNTY_MAX,
  POSTCODE_MAX,
  COUNTRY_MAX
} from '../../constants/validation-fields.js'
import { NO_CONTROL_CHARS_PATTERN } from '../../constants/patterns.js'

export const addressSchema = Joi.object({
  address1: Joi.string()
    .trim()
    .required()
    .max(ADDRESS_LINE_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.empty': 'Enter address line 1, typically the building and street',
      'string.max': `Address line 1 must be ${ADDRESS_LINE_MAX} characters or less`,
      'any.required': 'Enter address line 1, typically the building and street',
      'string.pattern.base': 'Address line 1 must not contain invalid characters'
    }),
  address2: Joi.string()
    .trim()
    .allow('')
    .max(ADDRESS_LINE_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.max': `Address line 2 must be ${ADDRESS_LINE_MAX} characters or less`,
      'string.pattern.base': 'Address line 2 must not contain invalid characters'
    }),
  address3: Joi.string()
    .trim()
    .allow('')
    .max(ADDRESS_LINE_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.max': `Address line 3 must be ${ADDRESS_LINE_MAX} characters or less`,
      'string.pattern.base': 'Address line 3 must not contain invalid characters'
    }),
  city: Joi.string()
    .trim()
    .required()
    .max(TOWN_CITY_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.empty': 'Enter town or city',
      'string.max': `Town or city must be ${TOWN_CITY_MAX} characters or less`,
      'any.required': 'Enter town or city',
      'string.pattern.base': 'Town or city must not contain invalid characters'
    }),
  county: Joi.string()
    .trim()
    .allow('')
    .max(COUNTY_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.max': `County must be ${COUNTY_MAX} characters or less`,
      'string.pattern.base': 'County must not contain invalid characters'
    }),
  postcode: Joi.string()
    .trim()
    .required()
    .max(POSTCODE_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'any.required': 'Enter a postal code or zip code',
      'string.empty': 'Enter a postal code or zip code',
      'string.max': `Postal code or zip code must be ${POSTCODE_MAX} characters or less`,
      'string.pattern.base': 'Postal code or zip code must not contain invalid characters'
    }),
  country: Joi.string()
    .trim()
    .required()
    .max(COUNTRY_MAX)
    .pattern(NO_CONTROL_CHARS_PATTERN)
    .messages({
      'string.empty': 'Enter a country',
      'string.max': `Country must be ${COUNTRY_MAX} characters or less`,
      'any.required': 'Enter a country',
      'string.pattern.base': 'Country must not contain invalid characters'
    })
})
